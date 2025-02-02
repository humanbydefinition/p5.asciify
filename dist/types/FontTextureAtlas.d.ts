import p5 from 'p5';
import { P5AsciifyFontManager } from './FontManager';
/**
 * Manages a texture atlas for font rendering in the ASCII rendering process.
 * The atlas creates an optimized GPU-friendly texture containing all required glyphs
 * arranged in a square grid layout.
 *
 * **Note: Modify font properties through the `p5asciify` instance methods rather than
 * directly, as this ensures proper synchronization with dependent components.**
 */
export declare class P5AsciifyFontTextureAtlas {
    private _p;
    private _fontManager;
    private _fontSize;
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
     * @param _p The p5 instance.
     * @param _fontManager The font manager to use for the texture atlas.
     * @param _fontSize The font size to use for the texture atlas.
     */
    constructor(_p: p5, _fontManager: P5AsciifyFontManager, _fontSize?: number);
    /**
     * Calculates the maximum width and height of all the glyphs in the font.
     * @param fontSize - The font size to use for calculations.
     * @returns An object containing the maximum width and height of the glyphs.
     */
    private _getMaxGlyphDimensions;
    /**
     * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
     */
    reset(): void;
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
    private _drawCharacters;
    /**
     * Returns the maximum width and height found for all the glyphs in the font.
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
    get charsetCols(): number;
    /**
     * Returns the number of rows in the texture containing all characters in the font.
     */
    get charsetRows(): number;
    /**
     * Returns the font size used for the texture atlas.
     */
    get fontSize(): number;
    /**
     * Returns the font manager used for the texture atlas.
     */
    get fontManager(): P5AsciifyFontManager;
}
