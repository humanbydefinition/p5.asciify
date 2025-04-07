import p5 from 'p5';
import { P5AsciifierManager } from './AsciifierManager';
/**
 * Main instance of p5.asciify *({@link P5AsciifierManager})* providing full access to the library.
 */
export declare const p5asciify: P5AsciifierManager;
/**
 * Hook to initialize `p5.asciify` automatically during the `init` phase of the p5.js sketch.
 * @param p The p5 instance.
 * @ignore
 */
export declare const initHook: (p: p5) => void;
/**
 * Hook to fully setup `p5.asciify` automatically after the `setup()` method of the p5.js sketch.
 *
 * After the `p5.asciify` setup is complete, the `setupAsciify()` method is called if it exists in the sketch,
 * allowing the user to perform additional setup steps if needed.
 *
 * @param p The p5 instance.
 * @ignore
 */
export declare const afterSetupHook: (p: p5) => void;
/**
 * Hook to start capturing the content drawn to the `p5.js` canvas before the `draw()` method is called.
 *
 * This only applies to {@link P5Asciifier} instances with the `canvasFlag` set to `true`.
 *
 * @param p The p5 instance.
 * @ignore
 */
export declare const preDrawHook: (p: p5) => void;
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
export declare const postDrawHook: (p: p5) => void;
/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';
/**
 * Contains utility functions and classes used by the `p5.asciify` library.
 * @ignore
 */
export * as utils from './utils';
export { P5AsciifierManager } from './AsciifierManager';
export { P5AsciifyError } from './AsciifyError';
export { P5Asciifier } from './Asciifier';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyGrid } from './Grid';
export { P5AsciifyFontManager } from './FontManager';
export * from './types';
