import { P5Asciifier } from '../Asciifier.js';
import p5 from 'p5';

/**
 * Registers the `setAsciifyBorderColor`, `setAsciifyFontSize`, `setAsciifyPostSetupFunction`, and `setAsciifyPostDrawFunction` methods to the p5.js instance.
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
        p5asciify.fontSize = fontSize;
    };

    /**
     * Sets a function to be called after the p5.asciify setup is complete.
     * @param postSetupFunction The function to call after the p5.asciify setup.
     */
    p5.prototype.setAsciifyPostSetupFunction = function (this: p5, postSetupFunction: () => void): void {
        p5asciify.postSetupFunction = postSetupFunction;
    };

    /**
     * Sets a function to be called after the p5.asciify draw is complete.
     * @param postDrawFunction The function to call after the draw loop.
     */
    p5.prototype.setAsciifyPostDrawFunction = function (this: p5, postDrawFunction: () => void): void {
        p5asciify.postDrawFunction = postDrawFunction;
    };
}