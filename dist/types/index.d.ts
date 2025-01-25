import { P5Asciifier } from './Asciifier';
/**
 * The main instance of the p5.asciify library, which is used to access all of the library's functionality.
 */
export declare const p5asciify: P5Asciifier;
/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';
/** Contains functionality relevant to the ASCII gradients, which are used exclusively by the {@link P5AsciifyGradientRenderer}. */
export * as gradients from './gradients';
export { P5Asciifier } from './Asciifier';
export { P5AsciifyError } from './AsciifyError';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
export { P5AsciifyGrid } from './Grid';
export * from './types';
