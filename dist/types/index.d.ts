import { P5AsciifierManager } from './AsciifierManager';
/**
 * Main instance of p5.asciify *({@link P5AsciifierManager})* providing full access to the library.
 */
export declare const p5asciify: P5AsciifierManager;
/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';
/** Contains utility functions and classes used by the `p5.asciify` library. */
export * as utils from './utils';
/** Contains plugin interfaces to implement against. */
export * as plugins from './plugins';
/** Contains error handling functionality and utilities. */
export * as errors from './errors';
export { P5AsciifierManager } from './AsciifierManager';
export { P5Asciifier } from './Asciifier';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyGrid } from './Grid';
export { P5AsciifyFontManager } from './FontManager';
export { P5AsciifyHookManager } from './HookManager';
export * from './types';
