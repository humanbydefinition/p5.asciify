import p5 from 'p5';
import { OpenTypeGlyph } from './types';
/**
 * Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.
 */
export declare class P5AsciifyFontManager {
    private _p;
    /** The font to use for ASCII rendering. */
    private _font;
    /** An array of supported characters in the font. */
    private _characters;
    /** An array of character glyphs with color assignments. */
    private _characterGlyphs;
    /**
     * Creates a new `P5AsciifyFontManager` instance.
     * @param _p The p5 instance.
     * @param fontSource The source to load the font from. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object.
     */
    constructor(_p: p5, fontSource: string | p5.Font);
    /**
     * Initializes the character glyphs and characters array.
     */
    private _initializeGlyphsAndCharacters;
    /**
     * Loads a font for ASCII rendering.
     *
     * **Note: For proper library functionality, use `p5asciify.loadFont();` instead
     * of accessing this method directly. Direct access may lead to inconsistent state
     * as other dependent components won't be updated.**
     *
     * @param font The font to load. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object.
     * @param onSuccess A callback function to call when the font is successfully loaded.
     * @throws {@link P5AsciifyError} If the font parameter is invalid or the font fails to load.
     */
    loadFont(font: string | p5.Font, onSuccess?: () => void): void;
    /**
     * Checks if a font string is valid.
     * @param fontString The font string to check.
     * @returns True if the font string is valid, false otherwise.
     */
    private _isValidFontString;
    /**
     * Gets the color of a character in the font.
     * @param char The character to get the color for.
     * @returns An array containing the RGB color values for the character,
     *          which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer`
     *          to convert those pixels into the selected character.
     * @throws {@link P5AsciifyError} If the character is not found in the texture atlas.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Get the color of the character 'A'
     *      const color = p5asciify.fontManager.glyphColor('A');
     *      console.log(color);
     *  }
     * ```
     */
    glyphColor(char: string): [number, number, number];
    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters The string of characters to check.
     * @returns An array of unsupported characters. List is empty if all characters are supported.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print a list of potentially unsupported characters.
     *      console.log(p5asciify.fontManager.getUnsupportedCharacters(" .,ABC123"));
     *  }
     * ```
     */
    getUnsupportedCharacters(characters: string): string[];
    /**
     * Validates a string of characters against the current font.
     * @param characters The string of characters to validate.
     * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Validate the characters 'ABC' (all supported)
     *      p5asciify.fontManager.validateCharacters('ABC');
     *
     *      // Validate the characters 'ABC123' (unsupported characters '123')
     *      p5asciify.fontManager.validateCharacters('ABC123'); // -> Error
     *  }
     */
    validateCharacters(characters: string): void;
    /**
     * Gets an array of RGB colors for a given string of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws {@link P5AsciifyError} If a character is not found in the fonts available characters.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Get the RGB colors for the characters 'ABC'
     *      const colors = p5asciify.fontManager.glyphColors('ABC');
     *      console.log(colors);
     *  }
     * ```
     */
    glyphColors(characters?: string): Array<[number, number, number]>;
    /**
     * The `p5.Font` object used for ASCII rendering.
     *
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
     *      textFont(p5asciify.fontManager.font);
     *      textSize(16);
     *      fill(255);
     *      text(frameRate() + " FPS", 10, 10);
     *  }
     * ```
     */
    get font(): p5.Font;
    /**
     * An array of supported characters in the set font.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print the supported characters in the font
     *      console.log(p5asciify.fontManager.characters);
     *  }
     * ```
     */
    get characters(): string[];
    /**
     * An array of character glyphs in the set font with color assignments.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print the character glyphs in the font
     *      console.log(p5asciify.fontManager.characterGlyphs);
     *  }
     * ```
     */
    get characterGlyphs(): OpenTypeGlyph[];
}
