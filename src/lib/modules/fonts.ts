import { P5AsciifyError } from "../AsciifyError.js";
import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt?raw';
import p5 from 'p5';
import { P5Asciifier } from '../Asciifier';

export function registerFontMethods(p5asciify: P5Asciifier): void {

    p5.prototype.preloadAsciiFont = function (this: p5): void {
        this._incrementPreload();
        this.loadAsciiFont(URSAFONT_BASE64);
    };

    p5.prototype.loadAsciiFont = function (this: p5, font: string | p5.Font): void {
        const setFont = (loadedFont: p5.Font) => {
            p5asciify.font = loadedFont;
            this._decrementPreload();
            p5asciify.eventEmitter.emit('fontUpdated', {});
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

    p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);
    p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);
}