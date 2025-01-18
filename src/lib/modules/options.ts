import { P5Asciifier } from '../Asciifier.js';
import { P5AsciifyError } from '../AsciifyError.js';
import { FONT_SIZE_LIMITS } from '../constants.js';
import p5 from 'p5';

/**
 * Registers the `setAsciifyBorderColor` and `setAsciifyFontSize` methods to the p5.js instance.
 */
export function registerOptionsMethods(p5asciify: P5Asciifier): void {

    /**
     * Sets the border color of rendered the ASCII result, which is not occupied by the possibly smaller ASCII grid width/height.
     * @param color The color of the border as a hex string.
     */
    p5.prototype.setAsciifyBorderColor = function (this: p5, color: string): void {
        p5asciify.borderColor = color;
    };

    /**
     * Sets the font size of the ASCII characters.
     * @param fontSize The font size to set.
     */
    p5.prototype.setAsciifyFontSize = function (this: p5, fontSize: number): void {

        if (fontSize < FONT_SIZE_LIMITS.MIN || fontSize > FONT_SIZE_LIMITS.MAX) {
            throw new P5AsciifyError(`Font size ${fontSize} is out of bounds. It should be between ${FONT_SIZE_LIMITS.MIN} and ${FONT_SIZE_LIMITS.MAX}.`);
        }

        p5asciify.fontSize = fontSize;
    };
}