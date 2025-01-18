import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt?raw';
import p5 from 'p5';
import { P5Asciifier } from '../Asciifier';

/**
 * Registers font-related methods to p5.js: preloads UrsaFont and adds loadAsciiFont().
 */
export function registerFontMethods(p5asciify: P5Asciifier): void {

    /**
     * Preloads the default font `UrsaFont` to be used with this library.
     */
    p5.prototype.registerMethod("init", function (this: p5) {
        this._incrementPreload();
        p5asciify.font = URSAFONT_BASE64;
    });
}