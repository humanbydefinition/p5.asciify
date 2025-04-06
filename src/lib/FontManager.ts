import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { OpenTypeGlyph } from './types';

/**
 * Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.
 */
export class P5AsciifyFontManager {

    /** An array of supported characters in the font. */
    private _characters: string[] = [];

    /** An array of character glyphs with color assignments. */
    private _characterGlyphs: OpenTypeGlyph[] = [];

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
    private _textureColumns!: number;

    /** Number of rows in the texture. */
    private _textureRows!: number;

    /** Font size to use for the texture that contains all characters of the font. */
    private _fontSize: number = 16;

    /**
     * Creates a new `P5AsciifyFontManager` instance.
     * @param _p The p5 instance.
     * @param _font The font to use for ASCII rendering.
     */
    constructor(
        private _p: p5,
        private _font: p5.Font,
    ) {
        this._initializeGlyphsAndCharacters();
    }

    public setup(fontSize: number): void {
        this._fontSize = fontSize;
        this.reset();
    }

    /**
     * Initializes the character glyphs and characters array.
     */
    private _initializeGlyphsAndCharacters(): void {
        const glyphs = Object.values(this._font.font.glyphs.glyphs) as OpenTypeGlyph[];

        // Initialize characters array
        this._characters = glyphs
            .filter((glyph): glyph is OpenTypeGlyph => glyph.unicode !== undefined)
            .map(glyph => String.fromCharCode(glyph.unicode!));

        // Initialize character glyphs with color assignments
        this._characterGlyphs = Object.values(this._font.font.glyphs.glyphs as OpenTypeGlyph[])
            .filter((glyph): glyph is OpenTypeGlyph => glyph.unicode !== undefined)
            .map((glyph, index) => {
                glyph.r = index % 256;
                glyph.g = Math.floor(index / 256) % 256;
                glyph.b = Math.floor(index / 65536);
                return glyph;
            });
    }

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
    public loadFont(
        font: p5.Font,
    ): void {
        if (!(font instanceof p5.Font)) {
            throw new P5AsciifyError('Invalid font parameter. Expected a path, base64 string, blob URL, or p5.Font object.');
        }

        this._font = font;
        this._initializeGlyphsAndCharacters();
    }

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
     *      // Get the color of the character 'A'
     *      const color = p5asciify.asciifier().fontManager.glyphColor('A');
     *      console.log(color);
     *  }
     * ```
     */
    public glyphColor(char: string): [number, number, number] {
        const glyph = this._characterGlyphs.find(
            (glyph: OpenTypeGlyph) => glyph.unicodes.includes(char.codePointAt(0) as number)
        );

        if (!glyph) {
            throw new P5AsciifyError(`Could not find character in character set: ${char}`);
        }

        return [glyph.r as number, glyph.g as number, glyph.b as number];
    }

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
     * @ignore
     */
    public validateCharacters(characters: string): void {
        const unsupportedChars: string[] = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
    }

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
    public glyphColors(characters: string = ""): Array<[number, number, number]> {
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
         * Calculates the maximum width and height of all the glyphs in the font.
         * @param fontSize - The font size to use for calculations.
         * @returns An object containing the maximum width and height of the glyphs.
         */
    private _getMaxGlyphDimensions(fontSize: number): { width: number; height: number } {
        return this.characterGlyphs.reduce<{ width: number; height: number }>(
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
     * @ignore
     */
    public reset(): void {
        this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize);
        this._createTexture(this._fontSize);
    }

    /**
     * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
     * @param fontSize - The new font size.
     * @ignore
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
        this._textureColumns = Math.ceil(Math.sqrt(this.characters.length));
        this._textureRows = Math.ceil(this.characters.length / this._textureColumns);

        if (!this._texture) {
            this._texture = this._p.createFramebuffer({
                width: this._maxGlyphDimensions.width * this._textureColumns,
                height: this._maxGlyphDimensions.height * this._textureRows,
                depthFormat: this._p.UNSIGNED_INT,
                textureFiltering: this._p.NEAREST,
            });
        } else {
            this._texture.resize(this._maxGlyphDimensions.width * this._textureColumns, this._maxGlyphDimensions.height * this._textureRows);
        }

        this._texture.begin();
        this._p.clear();
        this._p.textFont(this._font);
        this._p.fill(255);
        this._p.textSize(fontSize);
        this._p.textAlign(this._p.LEFT, this._p.TOP);
        this._p.noStroke();

        for (let i = 0; i < this.characterGlyphs.length; i++) {
            const col = i % this._textureColumns;
            const row = Math.floor(i / this._textureColumns);
            const x = this._maxGlyphDimensions.width * col - (this._maxGlyphDimensions.width * this._textureColumns) / 2;
            const y = this._maxGlyphDimensions.height * row - (this._maxGlyphDimensions.height * this._textureRows) / 2;
            this._p.text(String.fromCharCode(this.characterGlyphs[i].unicode), x, y);
        }
        this._texture.end();
    }

    /**
     * Returns the maximum width and height found in all the glyphs in the font.
     */
    get maxGlyphDimensions(): { width: number; height: number } { return this._maxGlyphDimensions; }

    /**
     * Returns the texture containing all characters in the font.
     */
    get texture(): p5.Framebuffer { return this._texture; }

    /**
     * Returns the number of columns in the texture containing all characters in the font.
     */
    get textureColumns(): number { return this._textureColumns; }

    /**
     * Returns the number of rows in the texture containing all characters in the font.
     */
    get textureRows(): number { return this._textureRows; }

    /**
     * Returns the font size used for the texture atlas.
     */
    get fontSize(): number { return this._fontSize; }

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
    get font(): p5.Font { return this._font; }

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
    get characters(): string[] { return this._characters; }

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
    get characterGlyphs(): OpenTypeGlyph[] { return this._characterGlyphs; }
}