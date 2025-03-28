import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt?raw';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils';
import { P5AsciifyGradientRenderer } from './renderers/gradient/GradientAsciiRenderer';

/**
 * The main instance of the `p5.asciify` library, which is used to access all of the library's functionality.
 */
export const p5asciify = new P5Asciifier();

// If in p5.js global mode, define a dummy preload function in case user doesn't provide one
if (typeof window !== 'undefined') {
  window.preload = function () { }; // Define empty preload function in case user doesn't provide one
  window.p5asciify = p5asciify;
}

/**
 * Extend the p5.asciify instance to the p5 instance and run the p5.asciify init method
 */
p5.prototype.registerMethod('init', function (this: p5) {
  this._incrementPreload();
  p5asciify.init(this, URSAFONT_BASE64);
});

/**
 * After the user's setup function is finished, run the p5.asciify setup
 */
p5.prototype.registerMethod('afterSetup', function (this: p5) {

  // Ensure WebGL renderer is used
  if (!(this._renderer.drawingContext instanceof WebGLRenderingContext ||
    this._renderer.drawingContext instanceof WebGL2RenderingContext)) {
    throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
  }

  // Ensure p5.js version is 1.8.0 or higher
  if (compareVersions(this.VERSION, "1.8.0") < 0) {
    throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to run.");
  }

  p5asciify.setup();

  if (this.setupAsciify) {
    this.setupAsciify();
  }
});

/**
 * Adds a pre-draw method to the p5.js instance which wraps the user draw loop in a framebuffer.
 */
p5.prototype.registerMethod("pre", function (this: p5): void {
  p5asciify.sketchFramebuffer.begin();
  this.clear();
  this.push();
});

/**
 * Adds a post-draw method to the p5.js instance which ends the framebuffer and calls the asciify method.
 */
p5.prototype.registerMethod("post", function (this: p5): void {
  this.pop();
  p5asciify.sketchFramebuffer.end();

  p5asciify.asciify();

  if (this.drawAsciify) {
    this.drawAsciify();
  }
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

/** Contains functionality relevant to the ASCII gradients, which are used exclusively by the {@link P5AsciifyGradientRenderer}. */
export * as gradients from './gradients';

export { P5Asciifier } from './Asciifier';
export { P5AsciifyError } from './AsciifyError';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
export { P5AsciifyGrid } from './Grid';
export { P5AsciifyFontManager } from './FontManager';
export * from './types';


