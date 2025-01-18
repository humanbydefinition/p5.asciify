import { P5Asciifier } from './Asciifier';

import { registerSetupMethods } from './modules/setup';
import { registerRenderingMethods } from './modules/rendering';

/**
 * The main instance of the p5.asciify library, which is used to access all of the library's functionality.
 */
export const p5asciify = new P5Asciifier();

// If in p5.js global mode, define a dummy preload function in case user doesn't provide one
if (typeof window !== 'undefined') {
  window.preload = function () { }; // Define empty preload function in case user doesn't provide one
  window.p5asciify = p5asciify;
}

// Register library methods to extend the p5 instance
registerSetupMethods(p5asciify);
registerRenderingMethods(p5asciify);

// Exports
export { P5Asciifier } from './Asciifier';
export { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
export { P5AsciifyGrid } from './Grid';
