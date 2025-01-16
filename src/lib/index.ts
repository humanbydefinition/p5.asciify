import { P5Asciifier } from './Asciifier';

import { registerSetupMethods } from './modules/setup';
import { registerFontMethods } from './modules/fonts';
import { registerOptionsMethods } from './modules/options';
import { registerGradientMethods } from './modules/gradients';
import { registerRenderingMethods } from './modules/rendering';

// Initialize the P5Asciify library and export it as a default module
const p5asciify = new P5Asciifier();
export default p5asciify;

// If in p5.js global mode, define a dummy preload function in case user doesn't provide one
if (typeof window !== 'undefined') {
  window.preload = function () { }; // Define empty preload function in case user doesn't provide one
  window.p5asciify = p5asciify;
}

// Register library methods to extend the p5 instance
registerSetupMethods(p5asciify);
registerFontMethods(p5asciify);
registerOptionsMethods(p5asciify);
registerGradientMethods(p5asciify);
registerRenderingMethods(p5asciify);