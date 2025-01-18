import { P5Asciifier } from './Asciifier';
/**
 * The main instance of the p5.asciify library, which is used to access all of the library's functionality.
 */
export declare const p5asciify: P5Asciifier;
export { P5Asciifier } from './Asciifier';
export { P5AsciifyError } from './AsciifyError';
export { P5AsciifyCharacterSet } from './CharacterSet';
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
export { BRIGHTNESS_DEFAULT_OPTIONS, ACCURATE_DEFAULT_OPTIONS, GRADIENT_DEFAULT_OPTIONS, EDGE_DEFAULT_OPTIONS, CUSTOM_DEFAULT_OPTIONS, DEFAULT_FONT_SIZE, DEFAULT_BACKGROUND_COLOR } from './defaults';
export { FONT_SIZE_LIMITS, EDGE_CHARACTER_LENGTH } from './constants';
