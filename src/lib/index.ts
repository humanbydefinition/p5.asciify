import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt?raw';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils';

/**
 * The main instance of the p5.asciify library, which is used to access all of the library's functionality.
 */
export const p5asciify = new P5Asciifier();

// If in p5.js global mode, define a dummy preload function in case user doesn't provide one
if (typeof window !== 'undefined') {
  window.preload = function () { }; // Define empty preload function in case user doesn't provide one
  window.p5asciify = p5asciify;
}

/**
 * Add `setupAsciify` function to p5 instance, which can be overridden by the user.
 * This function is called after the p5.asciify setup has been completed.
 */
p5.prototype.setupAsciify = function (): void { };

/**
 * Add `drawAsciify` function to p5 instance, which can be overridden by the user.
 * This function is called after the p5.asciify draw has been completed.
 */
p5.prototype.drawAsciify = function (): void { };

/**
 * Extend the p5.asciify instance to the p5 instance and run the p5.asciify init method
 */
p5.prototype.registerMethod('init', function (this: p5) {
  p5asciify.instance(this, false);

  this._incrementPreload();
  p5asciify.loadFont(URSAFONT_BASE64);
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
  this.setupAsciify();
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
  this.drawAsciify();
});

/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';

/** Contains functionality relevant to the ASCII gradients, which are used exclusively by the {@link P5AsciifyGradientRenderer}. */
export * as gradients from './gradients';

export { P5Asciifier } from './Asciifier';
export { P5AsciifyError } from './AsciifyError';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
export { P5AsciifyGrid } from './Grid';
export * from './utils';


