import p5 from 'p5';
import { OpenTypeGlyph, P5AsciifyCharacter } from './types';
import { detectP5Version, isP5AsyncCapable } from './utils';

import { createGlyphPath, getGlyphIndex, createEmptyPath } from './utils/fonts/TyprFontUtils';
import { errorHandler } from './errors';

/**
 * Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.
 */
export class P5AsciifyFontManager {

    /** An array of supported characters in the font. */
    private _characters: P5AsciifyCharacter[] = [];

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
     * @ignore
     */
    constructor(
        private _p: p5,
        private _font: p5.Font,
    ) {
        this._initializeGlyphsAndCharacters();
    }

    /**
     * Sets up the font manager with the specified font size 
     * and initializes the texture containing all characters in the font.
     * @param fontSize The font size to use for the texture.
     * @ignore
     */
    public async setup(fontSize: number): Promise<void> {
        this._fontSize = fontSize;
        return this.reset();
    }

    /**
     * Initializes the character glyphs and characters array.
     */
    private _initializeGlyphsAndCharacters(): void {

        if (isP5AsyncCapable(detectP5Version(this._p))) {
            // p5.js 2.0.0+ uses typr.js
            // Extract all supported character codes from the font's cmap table
            const characterList: string[] = [];
            const charToGlyphMap = new Map<string, number>(); // Map to track character to glyph index

            // Access the cmap tables that contain character to glyph mappings
            this._font.data.cmap.tables.forEach((table) => {
                if (table.format === 4) { // Format 4 tables contain character ranges
                    // Each pair of startCount and endCount defines a range of characters
                    for (let i = 0; i < table.startCount.length; i++) {
                        const start = table.startCount[i];
                        const end = table.endCount[i];

                        // Skip the 0xFFFF sentinel value at the end
                        if (start === 0xFFFF && end === 0xFFFF) continue;

                        // Add all characters in this range
                        for (let codePoint = start; codePoint <= end; codePoint++) {
                            const char = String.fromCodePoint(codePoint);

                            // Map the character to its glyph index using the font's mapping
                            const glyphIndex = getGlyphIndex(this._font, codePoint);

                            if (glyphIndex && glyphIndex > 0) {
                                characterList.push(char);
                                charToGlyphMap.set(char, glyphIndex);
                            }
                        }
                    }
                }
            });

            const uniqueChars = [...new Set(characterList)]; // Remove duplicates

            // Convert directly to the final format with all required properties
            this._characters = uniqueChars.map((char, index) => {
                const codePoint = char.codePointAt(0) as number;
                const glyphIndex = charToGlyphMap.get(char);

                // Get advance width from hmtx table
                let advanceWidth = 0;
                if (glyphIndex !== undefined && this._font.data.hmtx && this._font.data.hmtx.aWidth) {
                    advanceWidth = this._font.data.hmtx.aWidth[glyphIndex];
                }

                const r = index % 256;
                const g = Math.floor(index / 256) % 256;
                const b = Math.floor(index / 65536);

                return {
                    character: char,
                    unicode: codePoint,
                    // Create a path generator for this glyph
                    getPath: (x: number, y: number, fontSize: number) => {
                        if (glyphIndex === undefined) return createEmptyPath();

                        // Get the glyph data from the glyf table
                        const glyphData = this._font.data.glyf[glyphIndex];
                        if (!glyphData) return createEmptyPath();

                        // Create and return a path object with compatible interface
                        return createGlyphPath(this._font, glyphData, x, y, fontSize);
                    },
                    advanceWidth,
                    r, g, b
                };
            });
        } else {
            // p5.js versions before 2.0.0 use opentype.js
            const glyphs = Object.values(this._font.font.glyphs.glyphs) as OpenTypeGlyph[];
            this._characters = [];

            // Process all glyphs in a single loop
            glyphs.forEach((glyph, index) => {
                // Skip glyphs with no unicode information
                if ((!glyph.unicode && (!glyph.unicodes || !glyph.unicodes.length))) {
                    return;
                }

                // Calculate color values based on current array length
                const idx = this._characters.length;
                const r = idx % 256;
                const g = Math.floor(idx / 256) % 256;
                const b = Math.floor(idx / 65536);

                // Use either direct unicode or first value from unicodes array
                const unicode = glyph.unicode ?? glyph.unicodes![0];

                this._characters.push({
                    character: String.fromCodePoint(unicode),
                    unicode,
                    getPath: (x: number, y: number, fontSize: number) => glyph.getPath(x, y, fontSize),
                    advanceWidth: glyph.advanceWidth,
                    r, g, b
                });
            });
        }
    }

    /**
     * Loads a font for ASCII rendering.
     * 
     * Not intended to be called directly. Use {@link P5Asciifier}'s `font()` instead.
     * Otherwise, other parts of the library are not updated with the new font information.
     * 
     * @param font The p5.Font object to use for ASCII rendering.
     * @ignore
     */
    public loadFont(
        font: p5.Font,
    ): void {
        const isValidFont = errorHandler.validate(
            font && (font instanceof this._p.constructor.Font),
            'Invalid font parameter. Expected a p5.Font object.',
            { providedValue: font, method: 'loadFont' }
        );

        if (!isValidFont) {
            return; // Return early if validation fails
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
     * @throws If the character is not found in the font.
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
    public glyphColor(char: string): [number, number, number] {
        // Validate input parameter
        const isValidInput = errorHandler.validate(
            typeof char === 'string' && char.length > 0,
            'Character must be a non-empty string.',
            { providedValue: char, method: 'glyphColor' }
        );

        if (!isValidInput) {
            return [0, 0, 0]; // Return early if input validation fails
        }

        const charInfo = this._characters.find(
            c => c.character === char
        );

        // Validate character exists in font
        const characterExists = errorHandler.validate(
            charInfo !== undefined,
            (() => {
                const codePoint = char.codePointAt(0);
                const hexCode = codePoint ? codePoint.toString(16).padStart(4, '0') : 'unknown';
                return `Could not find character in character set: ${char} (U+${hexCode})`;
            })(),
            { providedValue: char, method: 'glyphColor' }
        );

        if (!characterExists) {
            return [0, 0, 0]; // Return early if character not found
        }

        return [charInfo!.r, charInfo!.g, charInfo!.b];
    }

    /**
     * Gets an array of RGB colors for a given string of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws If a character is not found in the fonts available characters.
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
    public glyphColors(characters: string | string[] = ""): Array<[number, number, number]> {
        // Validate input parameter
        const isValidInput = errorHandler.validate(
            typeof characters === 'string' || Array.isArray(characters),
            'Characters must be a string or array of strings.',
            { providedValue: characters, method: 'glyphColors' }
        );

        if (!isValidInput) {
            return [[0, 0, 0]]; // Return early if input validation fails
        }

        const results: Array<[number, number, number]> = [];

        for (const char of Array.from(characters)) {
            const color = this.glyphColor(char);
            results.push(color as [number, number, number]);
        }

        return results;
    }

    /**
         * Calculates the maximum width and height of all the glyphs in the font.
         * @param fontSize - The font size to use for calculations.
         * @returns An object containing the maximum width and height of the glyphs.
         */
    private _getMaxGlyphDimensions(fontSize: number): { width: number; height: number } {
        // Set the font and size for accurate measurements
        this._p.textFont(this._font);
        this._p.textSize(fontSize);

        // Calculate the maximum dimensions across all characters
        let maxWidth = 0;
        let maxHeight = 0;

        // Check each character's dimensions
        for (const char of this._characters) {
            // Get width of this character

            // For height, we can use textBounds which gives a more precise bounding box
            const bounds = this._font.textBounds(char.character, 0, 0, fontSize) as { h: number; w: number };
            const charHeight = bounds.h;
            const charWidth = bounds.w;

            // Update maximum dimensions
            maxWidth = Math.max(maxWidth, charWidth);
            maxHeight = Math.max(maxHeight, charHeight);
        }

        // Return ceiling values to ensure we have enough space
        return {
            width: Math.ceil(maxWidth),
            height: Math.ceil(maxHeight)
        };
    }

    /**
     * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
     * @ignore
     */
    public async reset(): Promise<void> {
        this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize);
        return this._createTexture(this._fontSize);
    }

    /**
     * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
     * @param fontSize - The new font size.
     * @ignore
     */
    public async setFontSize(fontSize: number): Promise<void> {
        this._fontSize = fontSize;
        this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize);
        return this._createTexture(this._fontSize);
    }

    /**
     * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
     * @param fontSize - The font size to use for creating the texture.
     */
    private async _createTexture(fontSize: number): Promise<void> {
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

        for (let i = 0; i < this._characters.length; i++) {
            const col = i % this._textureColumns;
            const row = Math.floor(i / this._textureColumns);
            const x = this._maxGlyphDimensions.width * col - (this._maxGlyphDimensions.width * this._textureColumns) / 2;
            const y = this._maxGlyphDimensions.height * row - (this._maxGlyphDimensions.height * this._textureRows) / 2;
            this._p.text(this._characters[i].character, x, y);
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
     * Returns the font size used for the texture containing all characters in the font.
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
     * An array of supported characters in the set font with additional information like unicode, and RGB color values.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print the supported characters in the font to the console
     *      console.log(p5asciify.asciifier().fontManager.characters);
     *  }
     * ```
     */
    get characters(): P5AsciifyCharacter[] { return this._characters; }
}