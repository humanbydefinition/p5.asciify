import { P5AsciifyError } from "../AsciifyError.js";
import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt?raw';
import p5 from 'p5';
import { P5Asciifier } from '../Asciifier';

export function registerFontMethods(p5asciify: P5Asciifier): void {

    p5.prototype.preloadAsciiFont = function (this: p5): void {
        this._incrementPreload();
        this.loadAsciiFont(URSAFONT_BASE64)
            .catch((error) => {
                throw new P5AsciifyError(`preloadAsciiFont() | Failed to load default font: ${error.message}`);
            });
    };

    p5.prototype.loadAsciiFont = function (this: p5, font: string | p5.Font): Promise<void> {
        return new Promise((resolve, reject) => {
            const setFont = async (loadedFont: p5.Font) => {
                p5asciify.font = loadedFont;
                this._decrementPreload();
                p5asciify.emit('fontUpdated', {});
                resolve();
            };

            if (typeof font === 'string') {
                this.loadFont(
                    font,
                    (loadedFont: p5.Font) => { setFont(loadedFont); },
                    () => { reject(new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`)); }
                );
            } else if (font instanceof p5.Font) {
                setFont(font);
            } else {
                reject(new P5AsciifyError('loadAsciiFont() | Invalid font parameter. Expected a path, base64 string, or p5.Font object.'));
            }
        });
    };

    p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);
    p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);
}