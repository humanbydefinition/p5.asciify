import { Asciifier } from './Asciifier';

import { registerSetupMethods } from './modules/setup.ts';
import { registerFontMethods } from './modules/fonts.ts';
import { registerOptionsMethods } from './modules/options.ts';
import { registerGradientMethods } from './modules/gradients.ts';
import { registerRenderingMethods } from './modules/rendering.ts';

// Declare global window interface augmentation
declare global {
  interface Window {
    p5asciify?: Asciifier;
    preload?: () => void;
  }
}

// Initialize the P5Asciify library and export it as a default module
const p5asciify = new Asciifier();
export default p5asciify;

// Expose P5Asciify to the global scope if not in a module environment
if (typeof window !== 'undefined') {
  window.p5asciify = p5asciify;  // Expose p5asciify instance
  window.preload = function () { }; // Define empty preload function in case user doesn't provide one
}

registerSetupMethods(p5asciify);
registerFontMethods(p5asciify);
registerOptionsMethods(p5asciify);
registerGradientMethods(p5asciify);
registerRenderingMethods(p5asciify);