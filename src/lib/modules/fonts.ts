import { P5AsciifyError } from "../AsciifyError.js";
import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt?raw';
import p5 from 'p5';
import { P5Asciifier } from '../Asciifier';

/**
 * Registers the `preloadAsciiFont` and `loadAsciiFont` methods to the p5.js instance.
 */
export function registerFontMethods(p5asciify: P5Asciifier): void {

    /**
     * Preloads the default font `UrsaFont` to be used with this library.
     */
    p5.prototype.preloadAsciiFont = function (this: p5): void {
        this._incrementPreload();
        this.loadAsciiFont(URSAFONT_BASE64);
    };

    /**
     * Loads a custom font to be used with this library.
     * @param font The path to the font file, a base64 string, or a p5.Font object.
     */
    p5.prototype.loadAsciiFont = function (this: p5, font: string | p5.Font): void {
        const setFont = (loadedFont: p5.Font) => {
            p5asciify.font = loadedFont;
            this._decrementPreload();
        };
    
        if (typeof font === 'string') {
            this.loadFont(
                font,
                (loadedFont: p5.Font) => { setFont(loadedFont); },
                () => { 
                    throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`);
                }
            );
        } else if (font instanceof p5.Font) {
            setFont(font);
        } else {
            throw new P5AsciifyError('loadAsciiFont() | Invalid font parameter. Expected a path, base64 string, or p5.Font object.');
        }
    };
    p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);

    /**
     * Preloads the default font `UrsaFont` to be used with this library.
     */
    p5.prototype.registerMethod("init", function(this: p5) {
        this._incrementPreload();
        this.loadAsciiFont(URSAFONT_BASE64);
    });
}