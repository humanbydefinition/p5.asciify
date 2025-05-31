import p5 from 'p5';
import { P5AsciifierManager } from './AsciifierManager';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils/utils';
import { P5AsciifyAbstractFeatureRenderer2D } from './renderers/2d/feature';
import { P5AsciifyRenderer2D } from './renderers/2d';
import { P5AsciifyRenderer } from './renderers';

// Check if p5.js version is 1.8.0 or higher
if (typeof p5 !== 'undefined' && compareVersions(p5.prototype.VERSION, "1.8.0") < 0) {
  throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to run.");
}

/**
 * Main instance of p5.asciify *({@link P5AsciifierManager})* providing full access to the library.
 */
export const p5asciify = P5AsciifierManager.getInstance();

// p5.js v2.0.0+ compatibility using the new addon system
function p5AsciifyAddon(p5Core: any, fn: any, lifecycles: any) {

  // These will store references to user's functions once identified
  let cachedSetupAsciifyFn: (() => void | Promise<void>) | null = null;
  let cachedDrawAsciifyFn: (() => void | Promise<void>) | null = null;

  lifecycles.presetup = async function () { // `this` refers to the p5 instance
    await p5asciify.init(this);
  }

  // Register lifecycles for p5.js v2.0.0+
  lifecycles.postsetup = async function () { // `this` refers to the p5 instance
    try {
      // Ensure WebGL renderer is used
      if (!(this._renderer.drawingContext instanceof WebGLRenderingContext ||
        this._renderer.drawingContext instanceof WebGL2RenderingContext)) {
        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
      }

      // Wait for library's internal setup to complete
      await p5asciify.setup();

      // Find and cache setupAsciify function reference
      cachedSetupAsciifyFn = this.setupAsciify; // Check instance first (for instance mode)
      if (!cachedSetupAsciifyFn && this._isGlobal && typeof window !== 'undefined' && typeof window.setupAsciify === 'function') {
        // If in global mode and not on instance, check window.setupAsciify
        cachedSetupAsciifyFn = window.setupAsciify;
      }

      // Find and cache drawAsciify function reference
      cachedDrawAsciifyFn = this.drawAsciify; // Check instance first
      if (!cachedDrawAsciifyFn && this._isGlobal && typeof window !== 'undefined' && typeof window.drawAsciify === 'function') {
        // If in global mode and not on instance, check window.drawAsciify
        cachedDrawAsciifyFn = window.drawAsciify;
      }

      // Call setupAsciify if found
      if (typeof cachedSetupAsciifyFn === 'function') {
        // Call with the p5 instance as `this` context
        await cachedSetupAsciifyFn.call(this);
      }
    } catch (error) {
      console.error("Error during p5.asciify initialization:", error);
      throw new P5AsciifyError("Failed to initialize p5.asciify: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  lifecycles.predraw = function () { // `this` refers to the p5 instance
    p5asciify.sketchFramebuffer.begin();
    this.clear(); // `this.clear()` refers to p5 instance's clear method
  };

  lifecycles.postdraw = function () { // `this` refers to the p5 instance
    p5asciify.sketchFramebuffer.end();
    p5asciify.asciify();

    // Use the cached drawAsciify function
    if (typeof cachedDrawAsciifyFn === 'function') {
      // Call with the p5 instance as `this` context
      cachedDrawAsciifyFn.call(this);
    }
  };
}

/**
 * Hook to initialize `p5.asciify` automatically during the `init` phase of the p5.js sketch.
 * @param p The p5 instance.
 * @ignore
 */
export const initHook = (p: p5) => {
  p5asciify.init(p);
};

/**
 * Hook to fully setup `p5.asciify` automatically after the `setup()` method of the p5.js sketch.
 * 
 * After the `p5.asciify` setup is complete, the `setupAsciify()` method is called if it exists in the sketch,
 * allowing the user to perform additional setup steps if needed.
 * 
 * @param p The p5 instance.
 * @ignore
 */
export const afterSetupHook = (p: p5) => {
    // Ensure WebGL renderer is used
    if (!(p._renderer.drawingContext instanceof WebGLRenderingContext ||
      p._renderer.drawingContext instanceof WebGL2RenderingContext)) {
      throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
    }

    // Ensure p5.js version is 1.8.0 or higher
    if (compareVersions(p.VERSION, "1.8.0") < 0) {
      throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to run.");
    }

    p5asciify.setup();

    if (p.setupAsciify) {
      p.setupAsciify();
    }
};

/**
 * Hook to start capturing the content drawn to the `p5.js` canvas before the `draw()` method is called.
 * 
 * This only applies to {@link P5Asciifier} instances with the `canvasFlag` set to `true`.
 * 
 * @param p The p5 instance.
 * @ignore
 */
export const preDrawHook = (p: p5) => {
  p5asciify.sketchFramebuffer.begin();
  p.clear();
};

/**
 * Hook to end capturing the content drawn to the `p5.js` canvas after the `draw()` method is called.
 * 
 * This only applies to {@link P5Asciifier} instances with the `canvasFlag` set to `true`.
 * 
 * The `asciify()` method is then called to render the ASCII content to the canvas.
 * 
 * The `drawAsciify()` method finally called if it exists in the sketch, allowing the user to draw additional content on top of the ASCII rendering.
 * 
 * @param p The p5 instance.
 * @ignore
 */
export const postDrawHook = (p: p5) => {
  p5asciify.sketchFramebuffer.end();

  p5asciify.asciify();

  if (p.drawAsciify) {
    p.drawAsciify();
  }
};

// Register the addon for p5.js v2.0.0+ or use legacy hooks
if (typeof p5 !== 'undefined' && typeof p5.registerAddon === 'function') {
  p5.registerAddon(p5AsciifyAddon);
} else if (typeof p5 !== 'undefined') {
  // Legacy hooks for p5.js v1.8.0-1.x.x
  p5.prototype.registerMethod('init', function (this: p5) { initHook(this); });
  p5.prototype.registerMethod('afterSetup', function (this: p5) { afterSetupHook(this); });

  // Register the pre and post draw hooks
  p5.prototype.registerMethod('pre', function (this: p5) {
    preDrawHook(this);
  });

  p5.prototype.registerMethod('post', function (this: p5) {
    postDrawHook(this);
  });
}

/**
 * A fix for the p5.js shaders to use highp precision instead of mediump.
 * This is necessary for p5.asciify to work on Android devices.
 * Generally, this is fixed in p5.js v1.11.3, but this is a workaround for older versions.
 * As of now, p5.asciify supports p5.js v1.8.0 and higher.
 */
const shadersToReplace = [
  ['_getImmediateModeShader', '_defaultImmediateModeShader'],
  ['_getNormalShader', '_defaultNormalShader'],
  ['_getColorShader', '_defaultColorShader'],
  ['_getPointShader', '_defaultPointShader'],
  ['_getLineShader', '_defaultLineShader'],
  ['_getFontShader', '_defaultFontShader'],
]

for (const [method, cacheKey] of shadersToReplace) {
  const prevMethod = p5.RendererGL.prototype[method]
  p5.RendererGL.prototype[method] = function () {
    if (!this[cacheKey]) {
      this[cacheKey] = prevMethod.call(this)
      this[cacheKey]._vertSrc = this[cacheKey]._vertSrc.replace(
        /mediump/g,
        'highp',
      )
      this[cacheKey]._fragSrc = this[cacheKey]._fragSrc.replace(
        /mediump/g,
        'highp',
      )
    }

    return this[cacheKey]
  }
}

/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';

/** Contains utility functions and classes used by the `p5.asciify` library. */
export * as utils from './utils';

/** Contains plugin interfaces to implement against. */
export * as plugins from './plugins';

export { P5AsciifierManager } from './AsciifierManager';
export { P5AsciifyError } from './AsciifyError';
export { P5Asciifier } from './Asciifier';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyGrid } from './Grid';
export { P5AsciifyFontManager } from './FontManager';
export * from './types';

if (typeof window !== 'undefined') {
  window.p5asciify = p5asciify;
  window.preload = function () { };
  window.P5AsciifyAbstractFeatureRenderer2D = P5AsciifyAbstractFeatureRenderer2D;
  window.P5AsciifyRenderer2D = P5AsciifyRenderer2D;
  window.P5AsciifyRenderer = P5AsciifyRenderer;
}