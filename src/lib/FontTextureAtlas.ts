import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { OpenTypeGlyph } from './types';

/**
 * Manages a texture atlas for font rendering in the ASCII rendering process.
 */
export class P5AsciifyFontTextureAtlas {

    /** Array of all characters in the font. */
    private _characters: string[];

    /** Array of `opentype.js` glyphs with unicode values, extended with r, g, and b properties for color. */
    private _characterGlyphs: OpenTypeGlyph[];

    /** Maximum width and height of the glyphs in the font. */
    private _maxGlyphDimensions: {
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
     * @param _font The font object to use for the texture atlas.
     * @param _fontSize The font size to use for the texture atlas.
     */
    constructor(
        private _p: p5,
        private _font: p5.Font,
        private _fontSize: number = 16
    ) {
        const glyphs = Object.values(this._font.font.glyphs.glyphs) as OpenTypeGlyph[];
        this._characters = glyphs
            .filter((glyph): glyph is OpenTypeGlyph => glyph.unicode !== undefined)
            .map(glyph => String.fromCharCode(glyph.unicode!));

        this._characterGlyphs = this._loadCharacterGlyphs();
        this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize);
        this._createTexture(this._fontSize);
    }

    /**
     * Loads all glyphs with unicode values from the font and assigns colors to them.
     * @returns An array of opentype.js glyphs, extended with r, g, and b properties for color.
     */
    private _loadCharacterGlyphs(): OpenTypeGlyph[] {
        return Object.values(this._font.font.glyphs.glyphs as OpenTypeGlyph[])
            .filter((glyph): glyph is OpenTypeGlyph => glyph.unicode !== undefined)
            .map((glyph, index) => {
                glyph.r = index % 256;
                glyph.g = Math.floor(index / 256) % 256;
                glyph.b = Math.floor(index / 65536);
                return glyph;
            });
    }

    /**
     * Calculates the maximum width and height of all the glyphs in the font.
     * @param fontSize - The font size to use for calculations.
     * @returns An object containing the maximum width and height of the glyphs.
     */
    private _getMaxGlyphDimensions(fontSize: number): { width: number; height: number } {
        return this._characterGlyphs.reduce<{ width: number; height: number }>(
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
     * Sets the font object and resets the whole atlas.
     * @param font - The new font object.
     */
    public setFontObject(font: p5.Font): void {
        this._font = font;
        this._characters = Object.values(this._font.font.glyphs.glyphs as OpenTypeGlyph[])
            .filter((glyph: OpenTypeGlyph) => glyph.unicode !== undefined)
            .map((glyph: OpenTypeGlyph) => String.fromCharCode(glyph.unicode));

        this._characterGlyphs = this._loadCharacterGlyphs();
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
        this._charsetCols = Math.ceil(Math.sqrt(this._characters.length));
        this._charsetRows = Math.ceil(this._characters.length / this._charsetCols);

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
        this._p.clear();
        this._p.textFont(this._font);
        this._p.fill(255);
        this._p.textSize(fontSize);
        this._p.textAlign(this._p.LEFT, this._p.TOP);
        this._p.noStroke();

        for (let i = 0; i < this._characterGlyphs.length; i++) {
            const col = i % this._charsetCols;
            const row = Math.floor(i / this._charsetCols);
            const x = this._maxGlyphDimensions.width * col - (this._maxGlyphDimensions.width * this._charsetCols) / 2;
            const y = this._maxGlyphDimensions.height * row - (this._maxGlyphDimensions.height * this._charsetRows) / 2;
            this._p.text(String.fromCharCode(this._characterGlyphs[i].unicode), x, y);
        }
    }

    /**
     * Gets an array of RGB colors for a given string or array of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws {@link P5AsciifyError} If a character is not found in the texture atlas.
     */
    public getCharsetColorArray(characters: string = ""): Array<[number, number, number]> {
        return Array.from(characters).map((char: string) => {
            const glyph = this._characterGlyphs.find(
                (glyph: OpenTypeGlyph) => glyph.unicodes.includes(char.codePointAt(0) as number)
            );

            if (!glyph) {
                throw new P5AsciifyError(`Could not find character in character set: ${char}`);
            }

            return [glyph.r as number, glyph.g as number, glyph.b as number];
        });
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters The string of characters to check.
     * @returns An array of unsupported characters. List is empty if all characters are supported.
     */
    public getUnsupportedCharacters(characters: string): string[] {
        return Array.from(
            new Set(
                Array.from(characters).filter(
                    (char: string) =>
                        !this._characterGlyphs.some((glyph: OpenTypeGlyph) =>
                            glyph.unicodes.includes(char.codePointAt(0) as number)
                        )
                )
            )
        );
    }

    /**
     * Validates a string of characters against the current font.
     * @param characters The string of characters to validate.
     * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
     */
    public validateCharacters(characters: string): void {
        const unsupportedChars: string[] = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
    }

    // Getters
    get maxGlyphDimensions(): { width: number; height: number } { return this._maxGlyphDimensions; }
    get texture(): p5.Framebuffer { return this._texture; }
    get characters(): string[] { return this._characters; }
    get charsetCols(): number { return this._charsetCols; }
    get charsetRows(): number { return this._charsetRows; }
    get fontSize(): number { return this._fontSize; }
}