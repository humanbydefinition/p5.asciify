import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { validateSetup } from './validators/SetupValidator';
import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt?raw';

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
  validateSetup(this);
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

// Class exports
export { P5Asciifier } from './Asciifier';
export { P5AsciifyError } from './AsciifyError';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
export { P5AsciifyGrid } from './Grid';

export { P5AsciifyGradientManager } from './gradients/GradientManager';
export { P5AsciifyGradient } from './gradients/Gradient';
export { P5AsciifyConicalGradient } from './gradients/conical/Conical';
export { P5AsciifyLinearGradient } from './gradients/linear/Linear';
export { P5AsciifyRadialGradient } from './gradients/radial/Radial';
export { P5AsciifySpiralGradient } from './gradients/spiral/Spiral';

export { P5AsciifyRendererManager } from './renderers/RendererManager';
export { P5AsciifyRenderer } from './renderers/AsciiRenderer';
export { P5AsciifyAccurateRenderer } from './renderers/accurate/AccurateAsciiRenderer';
export { P5AsciifyBrightnessRenderer } from './renderers/brightness/BrightnessAsciiRenderer';
export { P5AsciifyEdgeRenderer } from './renderers/edge/EdgeAsciiRenderer';
export { P5AsciifyGradientRenderer } from './renderers/gradient/GradientAsciiRenderer';

// Constants and defaults
export {
  BRIGHTNESS_DEFAULT_OPTIONS,
  ACCURATE_DEFAULT_OPTIONS,
  GRADIENT_DEFAULT_OPTIONS,
  EDGE_DEFAULT_OPTIONS, CUSTOM_DEFAULT_OPTIONS,
  DEFAULT_FONT_SIZE,
  DEFAULT_BACKGROUND_COLOR
} from './defaults';

export {
  FONT_SIZE_LIMITS,
} from './constants';