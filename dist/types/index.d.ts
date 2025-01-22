import { P5Asciifier } from './Asciifier';
/**
 * The main instance of the p5.asciify library, which is used to access all of the library's functionality.
 */
export declare const p5asciify: P5Asciifier;
export { P5Asciifier } from './Asciifier';
export { P5AsciifyError } from './AsciifyError';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
export { P5AsciifyGrid } from './Grid';
export * from './types';
export { P5AsciifyGradientManager } from './gradients/GradientManager';
export { P5AsciifyGradient } from './gradients/Gradient';
export { P5AsciifyConicalGradient } from './gradients/conical/Conical';
export { P5AsciifyLinearGradient } from './gradients/linear/Linear';
export { P5AsciifyRadialGradient } from './gradients/radial/Radial';
export { P5AsciifySpiralGradient } from './gradients/spiral/Spiral';
export * from './gradients/types';
export { P5AsciifyRendererManager } from './renderers/RendererManager';
export { P5AsciifyRenderer, CUSTOM_DEFAULT_OPTIONS } from './renderers/AsciiRenderer';
export { P5AsciifyAccurateRenderer, ACCURATE_DEFAULT_OPTIONS } from './renderers/accurate/AccurateAsciiRenderer';
export { P5AsciifyBrightnessRenderer, BRIGHTNESS_DEFAULT_OPTIONS } from './renderers/brightness/BrightnessAsciiRenderer';
export { P5AsciifyEdgeRenderer, EDGE_DEFAULT_OPTIONS } from './renderers/edge/EdgeAsciiRenderer';
export { P5AsciifyGradientRenderer, GRADIENT_DEFAULT_OPTIONS } from './renderers/gradient/GradientAsciiRenderer';
export * from './renderers/types';
export { compareVersions, validateNumberInRange } from './utils';
