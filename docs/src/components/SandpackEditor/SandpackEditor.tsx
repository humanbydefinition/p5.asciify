import React, { useState, useRef, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { useColorMode } from '@docusaurus/theme-common';

// Outer component: sets up the provider context
export default function SandpackEditor({
  sketch = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(width/2, height/2, 100, 100);
}`,
  template = 'static',
  files = {},
  height = '500px',
  showNavigator = false,
  showLineNumbers = true,
}) {
  // Merge default files
  const defaultFiles = {
    "/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      canvas {
        display: block;
      }
    </style>
    <title>p5.asciify sketch</title>

    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.5/lib/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.10.0/dist/p5.asciify.umd.min.js"></script>
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
`,
      hidden: true
    },
    "/sketch.js": {
      code: sketch,
      active: true
    },
    ...files
  };

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <SandpackProvider
      files={defaultFiles}
      template={template}
      theme={isDark ? 'dark' : 'light'}
      options={{ showNavigator, showLineNumbers, autorun: true }}
    >
      <SandpackEditorInner
        height={height}
        showLineNumbers={showLineNumbers}
        isDark={isDark}
      />
    </SandpackProvider>
  );
}

// Inner component: safely uses Sandpack context and React Hooks
function SandpackEditorInner({ height, showLineNumbers, isDark }) {
  const { sandpack } = useSandpack();
  const [maximized, setMaximized] = useState(false);
  const [editorWidth, setEditorWidth] = useState(50);

  // refs for drag state + rAF
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMaximize = () => setMaximized((m) => !m);

  // Pointer‐down on grabber
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    draggingRef.current = true;
    // capture events even outside the element
    container.setPointerCapture(e.pointerId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      if (rafRef.current !== null) return;

      const rect = container.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.max(10, Math.min(90, pct));

      // schedule width update on next frame
      rafRef.current = requestAnimationFrame(() => {
        setEditorWidth(pct);
        rafRef.current = null;
      });
    };

    const endDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setMaximized((m) => m); // no-op state update to re-render grabber color
      container.releasePointerCapture(e.pointerId);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', endDrag);
      container.removeEventListener('pointercancel', endDrag);
    };
  }, []);

  const grabberStyle: React.CSSProperties = {
    flex: '0 0 auto',
    position: 'relative',
    width: '8px',
    background: draggingRef.current
      ? isDark ? '#555' : '#999'
      : isDark ? '#333' : '#ccc',
    cursor: 'col-resize',
    zIndex: 5,
  };

  const previewBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    background: isDark ? '#555' : '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '4px 8px',
    cursor: 'pointer',
  };

  return (
    <SandpackLayout
      style={{ height, width: '100%', borderRadius: 8, overflow: 'hidden' }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          userSelect: 'none',       // prevent text selection while dragging
        }}
      >
        {!maximized && (
          <div
            style={{
              width: `${editorWidth}%`,
              display: 'flex',
              flexDirection: 'column',
              transition: 'width 0.1s ease-out', // subtle animation on resize
            }}
          >
            <SandpackCodeEditor
              showLineNumbers={showLineNumbers}
              style={{ flex: 1, height: '100%' }}
            />
          </div>
        )}

        {/* Grabber */}
        {!maximized && (
          <div
            onPointerDown={onPointerDown}
            style={grabberStyle}
          />
        )}

        {/* Preview */}
        <div style={{ flex: 1, position: 'relative' }}>
          <button onClick={toggleMaximize} style={previewBtnStyle}>
            {maximized ? 'Show Editor' : 'Full Preview'}
          </button>
          <SandpackPreview
            style={{
              width: '100%',
              height: '100%',
              background: isDark ? '#1e1e1e' : '#fff',
            }}
          />
        </div>
      </div>
    </SandpackLayout>
  );
}