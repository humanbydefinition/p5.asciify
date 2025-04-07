import p5 from 'p5';
import { OpenTypeGlyph } from './types';
/**
 * Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.
 */
export declare class P5AsciifyFontManager {
    private _p;
    private _font;
    /** An array of supported characters in the font. */
    private _characters;
    /** An array of character glyphs with color assignments. */
    private _characterGlyphs;
    /** Maximum width and height of the glyphs in the font. */
    private _maxGlyphDimensions;
    /** Texture containing all characters in the font. As square as possible. */
    private _texture;
    /** Number of columns in the texture. */
    private _textureColumns;
    /** Number of rows in the texture. */
    private _textureRows;
    /** Font size to use for the texture that contains all characters of the font. */
    private _fontSize;
    /**
     * Creates a new `P5AsciifyFontManager` instance.
     * @param _p The p5 instance.
     * @param _font The font to use for ASCII rendering.
     */
    constructor(_p: p5, _font: p5.Font);
    /**
     * Sets up the font manager with the specified font size
     * and initializes the texture containing all characters in the font.
     * @param fontSize The font size to use for the texture.
     * @ignore
     */
    setup(fontSize: number): void;
    /**
     * Initializes the character glyphs and characters array.
     */
    private _initializeGlyphsAndCharacters;
    /**
     * Loads a font for ASCII rendering.
     *
     * Not intended to be called directly. Use {@link P5Asciifier}'s `font()` instead.
     * Otherwise, other parts of the library are not updated with the new font information.
     *
     * @param font The p5.Font object to use for ASCII rendering.
     * @throws {@link P5AsciifyError} If the font parameter is invalid.
     * @ignore
     */
    loadFont(font: p5.Font): void;
    /**
     * Gets the color of a character in the font.
     * @param char The character to get the color for.
     * @returns An array containing the RGB color values for the character,
     *          which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer`
     *          to convert those pixels into the selected character.
     * @throws {@link P5AsciifyError} If the character is not found in the font.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Get the RGB color of the character 'A'
     *      const color = p5asciify.asciifier().fontManager.glyphColor('A');
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
     *      console.log(p5asciify.asciifier().fontManager.getUnsupportedCharacters(" .,ABC123"));
     *  }
     * ```
     */
    getUnsupportedCharacters(characters: string): string[];
    /**
     * Validates a string of characters against the current font.
     * @param characters The string of characters to validate.
     * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
     * @ignore
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
     *      const colors = p5asciify.asciifier().fontManager.glyphColors('ABC');
     *      console.log(colors);
     *  }
     * ```
     */
    glyphColors(characters?: string): Array<[number, number, number]>;
    /**
         * Calculates the maximum width and height of all the glyphs in the font.
         * @param fontSize - The font size to use for calculations.
         * @returns An object containing the maximum width and height of the glyphs.
         */
    private _getMaxGlyphDimensions;
    /**
     * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
     * @ignore
     */
    reset(): void;
    /**
     * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
     * @param fontSize - The new font size.
     * @ignore
     */
    setFontSize(fontSize: number): void;
    /**
     * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
     * @param fontSize - The font size to use for creating the texture.
     */
    private _createTexture;
    /**
     * Returns the maximum width and height found in all the glyphs in the font.
     */
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    /**
     * Returns the texture containing all characters in the font.
     */
    get texture(): p5.Framebuffer;
    /**
     * Returns the number of columns in the texture containing all characters in the font.
     */
    get textureColumns(): number;
    /**
     * Returns the number of rows in the texture containing all characters in the font.
     */
    get textureRows(): number;
    /**
     * Returns the font size used for the texture containing all characters in the font.
     */
    get fontSize(): number;
    /**
     * The `p5.Font` object used for ASCII rendering.
     *
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
     *      textFont(p5asciify.asciifier().fontManager.font);
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
     *      // Print the supported characters in the font to the console
     *      console.log(p5asciify.asciifier().fontManager.characters);
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
     *      // Print the character glyph objects of the font to the console
     *      console.log(p5asciify.asciifier().fontManager.characterGlyphs);
     *  }
     * ```
     */
    get characterGlyphs(): OpenTypeGlyph[];
}
