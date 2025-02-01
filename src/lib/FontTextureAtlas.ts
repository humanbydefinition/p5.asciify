import p5 from 'p5';
import { P5AsciifyFontManager } from './FontManager';

/**
 * Manages a texture atlas for font rendering in the ASCII rendering process.
 */
export class P5AsciifyFontTextureAtlas {

    /** Maximum width and height of the glyphs in the font. */
    private _maxGlyphDimensions!: {
        /** Maximum width fetched from all the glyphs in the font. */
        width: number;
        /** Maximum height fetched from all the glyphs in the font. */
        height: number
    };

    /** Texture containing all characters in the font. As square as possible. */
    private _texture!: p5.Framebuffer;

    /** Number of columns in the texture. */
    private _charsetCols!: number;

    /** Number of rows in the texture. */
    private _charsetRows!: number;

    /**
     * Creates a new `P5AsciifyFontTextureAtlas` instance.
     * @param _p The p5 instance.
     * @param _fontManager The font manager to use for the texture atlas.
     * @param _fontSize The font size to use for the texture atlas.
     */
    constructor(
        private _p: p5,
        private _fontManager: P5AsciifyFontManager,
        private _fontSize: number = 16
    ) {
        this.reset();
    }

    /**
     * Calculates the maximum width and height of all the glyphs in the font.
     * @param fontSize - The font size to use for calculations.
     * @returns An object containing the maximum width and height of the glyphs.
     */
    private _getMaxGlyphDimensions(fontSize: number): { width: number; height: number } {
        return this._fontManager.characterGlyphs.reduce<{ width: number; height: number }>(
            (maxDims, glyph) => {
                const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
                return {
                    width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                    height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1)),
                };
            },
            { width: 0, height: 0 }
        );
    }

    /**
     * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
     */
    public reset(): void {
        this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize);
        this._createTexture(this._fontSize);
    }

    /**
     * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
     * @param fontSize - The new font size.
     */
    public setFontSize(fontSize: number): void {
        this._fontSize = fontSize;
        this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize);
        this._createTexture(this._fontSize);
    }

    /**
     * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
     * @param fontSize - The font size to use for creating the texture.
     */
    private _createTexture(fontSize: number): void {
        this._charsetCols = Math.ceil(Math.sqrt(this._fontManager.characters.length));
        this._charsetRows = Math.ceil(this._fontManager.characters.length / this._charsetCols);

        if (!this._texture) {
            this._texture = this._p.createFramebuffer({
                width: this._maxGlyphDimensions.width * this._charsetCols,
                height: this._maxGlyphDimensions.height * this._charsetRows,
                depthFormat: this._p.UNSIGNED_INT,
                textureFiltering: this._p.NEAREST,
            });
        } else {
            this._texture.resize(this._maxGlyphDimensions.width * this._charsetCols, this._maxGlyphDimensions.height * this._charsetRows);
        }

        this._texture.begin();
        this._p.clear();
        this._drawCharacters(fontSize);
        this._texture.end();
    }

    /**
     * Draws characters onto the texture.
     * @param fontSize - The font size to use for drawing the characters on the texture.
     */
    private _drawCharacters(fontSize: number): void {
        this._p.textFont(this._fontManager.font);
        this._p.fill(255);
        this._p.textSize(fontSize);
        this._p.textAlign(this._p.LEFT, this._p.TOP);
        this._p.noStroke();

        for (let i = 0; i < this._fontManager.characterGlyphs.length; i++) {
            const col = i % this._charsetCols;
            const row = Math.floor(i / this._charsetCols);
            const x = this._maxGlyphDimensions.width * col - (this._maxGlyphDimensions.width * this._charsetCols) / 2;
            const y = this._maxGlyphDimensions.height * row - (this._maxGlyphDimensions.height * this._charsetRows) / 2;
            this._p.text(String.fromCharCode(this._fontManager.characterGlyphs[i].unicode), x, y);
        }
    }

    // Getters
    get maxGlyphDimensions(): { width: number; height: number } { return this._maxGlyphDimensions; }
    get texture(): p5.Framebuffer { return this._texture; }
    get charsetCols(): number { return this._charsetCols; }
    get charsetRows(): number { return this._charsetRows; }
    get fontSize(): number { return this._fontSize; }
    get fontManager(): P5AsciifyFontManager { return this._fontManager; }
}