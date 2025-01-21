import p5 from 'p5';
/**
 * Creates a texture atlas containing all characters in a font, and provides utility methods for working with the atlas.
 */
export declare class P5AsciifyFontTextureAtlas {
    private p;
    private font;
    private _fontSize;
    /** Array of characters in the font. */
    private _characters;
    /** Array of `opentype.js` glyphs with unicode values, extended with r, g, and b properties for color. */
    private _characterGlyphs;
    /** Maximum width and height of the glyphs in the font. */
    private _maxGlyphDimensions;
    /** Texture containing all characters in the font. As square as possible. */
    private _texture;
    /** Number of columns in the texture. */
    private _charsetCols;
    /** Number of rows in the texture. */
    private _charsetRows;
    /**
     * Creates a new `P5AsciifyFontTextureAtlas` instance.
     * @param p The p5 instance.
     * @param font The font object to use for the texture atlas.
     * @param _fontSize The font size to use for the texture atlas.
     */
    constructor(p: p5, font: p5.Font, _fontSize: number);
    /**
     * Loads all glyphs with unicode values from the font and assigns colors to them.
     * @returns An array of opentype.js glyphs, extended with r, g, and b properties for color.
     */
    private _loadCharacterGlyphs;
    /**
     * Calculates the maximum width and height of the glyphs in the font.
     * @param fontSize - The font size to use for calculations.
     * @returns An object containing the maximum width and height of the glyphs.
     */
    private _getMaxGlyphDimensions;
    /**
     * Sets the font object and resets the whole atlas.
     * @param font - The new font object.
     */
    setFontObject(font: p5.Font): void;
    /**
     * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
     * @param fontSize - The new font size.
     */
    setFontSize(fontSize: number): void;
    /**
     * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
     * @param fontSize - The font size to use for creating the texture.
     */
    private _createTexture;
    /**
     * Draws characters onto the texture.
     * @param fontSize - The font size to use for drawing the characters on the texture.
     */
    private drawCharacters;
    /**
     * Gets an array of RGB colors for a given string or array of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws {@link P5AsciifyError} If a character is not found in the texture atlas.
     */
    getCharsetColorArray(characters?: string): Array<[number, number, number]>;
    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters The string of characters to check.
     * @returns An array of unsupported characters. List is empty if all characters are supported.
     */
    getUnsupportedCharacters(characters: string): string[];
    validateCharacters(characters: string): void;
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    get texture(): p5.Framebuffer;
    get characters(): string[];
    get charsetCols(): number;
    get charsetRows(): number;
    get fontSize(): number;
}
