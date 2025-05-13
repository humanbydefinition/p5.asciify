import p5 from 'p5';
import { P5AsciifierManager } from './AsciifierManager';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils/utils';

/**
 * Main instance of p5.asciify *({@link P5AsciifierManager})* providing full access to the library.
 */
export const p5asciify = P5AsciifierManager.getInstance();

// Global mode: Expose p5asciify.
if (typeof window !== 'undefined') {
  window.p5asciify = p5asciify;
}

/**
 * Hook to initialize `p5.asciify` automatically during the `init` phase of the p5.js sketch.
 * @param p The p5 instance.
 * @ignore
 */
export const initHook = (p: p5) => {
  if (!p5asciify.hooksEnabled) return;  
  p5asciify.init(p);
};
p5.prototype.registerMethod('init', function (this: p5) { initHook(this); });


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
  if (!p5asciify.hooksEnabled) return;  

  setTimeout(() => {
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
  }, 0);
};
p5.prototype.registerMethod('afterSetup', function (this: p5) { afterSetupHook(this); });

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

// Register the pre and post draw hooks
p5.prototype.registerMethod('pre', function(this: p5) { 
  if (!p5asciify.hooksEnabled) return;
  preDrawHook(this); 
});

p5.prototype.registerMethod('post', function(this: p5) { 
  if (!p5asciify.hooksEnabled) return;
  postDrawHook(this); 
});

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