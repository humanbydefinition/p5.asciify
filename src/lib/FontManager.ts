import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { OpenTypeGlyph, P5AsciifyCharacter } from './types';
import { compareVersions } from './utils';

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
        if (compareVersions(this._p.VERSION, "2.0.0") < 0) {
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
        } else {
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
                            const glyphIndex = this._getGlyphIndex(codePoint);
                            if (glyphIndex > 0) {
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
                        if (glyphIndex === undefined) return this._createEmptyPath();

                        // Get the glyph data from the glyf table
                        const glyphData = this._font.data.glyf[glyphIndex];
                        if (!glyphData) return this._createEmptyPath();

                        // Create and return a path object with compatible interface
                        return this._createGlyphPath(glyphData, x, y, fontSize);
                    },
                    advanceWidth,
                    r, g, b
                };
            });
        }
    }

    /**
     * Gets the glyph index for a given Unicode code point
     * @param codePoint The Unicode code point to look up
     * @returns The glyph index, or 0 if not found
     */
    private _getGlyphIndex(codePoint: number): number {
        // Access the cmap to translate from Unicode to glyph index
        const cmap = this._font.data.cmap;

        if (!cmap || !cmap.tables) return 0;

        // Try to find the code point in any of the cmap tables
        for (const table of cmap.tables) {
            if (table.format === 4) {
                for (let i = 0; i < table.startCount.length; i++) {
                    if (codePoint >= table.startCount[i] && codePoint <= table.endCount[i]) {
                        // Handle the mapping based on how the format 4 cmap works
                        if (table.idRangeOffset[i] === 0) {
                            return (codePoint + table.idDelta[i]) & 0xFFFF;
                        } else {
                            const idx = table.idRangeOffset[i] / 2 + (codePoint - table.startCount[i]) -
                                (table.startCount.length - i);
                            if (idx >= 0 && idx < table.glyphIdArray.length) {
                                const glyphId = table.glyphIdArray[idx];
                                if (glyphId !== 0) {
                                    return (glyphId + table.idDelta[i]) & 0xFFFF;
                                }
                            }
                        }
                    }
                }
            }
        }

        return 0; // Not found
    }

    /**
     * Creates an empty path object with the required interface
     */
    private _createEmptyPath(): { getBoundingBox(): { x1: number; y1: number; x2: number; y2: number }; toSVG(): string } {
        return {
            getBoundingBox: () => ({ x1: 0, y1: 0, x2: 0, y2: 0 }),
            toSVG: () => ""
        };
    }

    /**
     * Creates a path object for a glyph that implements the same interface as OpenType.js paths
     * @param glyphData The glyph data from the Typr.js glyf table
     * @param x The x position
     * @param y The y position
     * @param fontSize The font size
     * @returns A path object with getBoundingBox and toSVG methods
     */
    private _createGlyphPath(
        glyphData: any,
        x: number,
        y: number,
        fontSize: number
    ): { getBoundingBox(): { x1: number; y1: number; x2: number; y2: number }; toSVG(): string } {
        // If there's no glyph data or it's empty
        if (!glyphData || !glyphData.xs || glyphData.xs.length === 0) {
            return this._createEmptyPath();
        }

        // Scale factor based on font size and unitsPerEm
        const scale = fontSize / this._font.data.head.unitsPerEm;

        // Create a path object with the required interface
        return {
            getBoundingBox: () => {
                // Return a scaled bounding box
                return {
                    x1: x + (glyphData.xMin * scale),
                    y1: y + (-glyphData.yMax * scale),  // Flip Y coordinates (TTF uses Y-up)
                    x2: x + (glyphData.xMax * scale),
                    y2: y + (-glyphData.yMin * scale)   // Flip Y coordinates
                };
            },
            toSVG: () => {
                // Generate an SVG path string
                return this._glyphToSVGPath(glyphData, x, y, scale);
            }
        };
    }

    /**
     * Converts a glyph to an SVG path string
     * @param glyphData The glyph data
     * @param x The x position
     * @param y The y position
     * @param scale The scale factor
     * @returns SVG path string
     */
    private _glyphToSVGPath(glyphData: any, x: number, y: number, scale: number): string {
        if (!glyphData || !glyphData.xs) return "";

        const { xs, ys, endPts, flags } = glyphData;

        if (!xs || !ys || !endPts || !flags) return "";

        // SVG path format: <path d="...commands..." />
        let pathData = "";
        let startIndex = 0;

        // Process each contour in the glyph
        for (let i = 0; i < endPts.length; i++) {
            const endPt = endPts[i];
            if (endPt < startIndex) continue; // Invalid contour

            // Check if we have points in this contour
            if (endPt >= startIndex) {
                // Start the path at the first point
                const firstX = x + (xs[startIndex] * scale);
                const firstY = y - (ys[startIndex] * scale); // Flip Y coordinates
                pathData += `M${firstX.toFixed(2)},${firstY.toFixed(2)}`;

                // Process points in this contour
                let j = startIndex + 1;
                while (j <= endPt) {
                    // Check if current point is on curve or off curve (control point)
                    const isOnCurve = (flags[j] & 1) !== 0;

                    if (isOnCurve) {
                        // Add line to on-curve point
                        const currX = x + (xs[j] * scale);
                        const currY = y - (ys[j] * scale);
                        pathData += `L${currX.toFixed(2)},${currY.toFixed(2)}`;
                        j++;
                    } else {
                        // Handle quadratic bezier curve
                        // We need to find the next on-curve point to complete the curve
                        const ctrlX = x + (xs[j] * scale);
                        const ctrlY = y - (ys[j] * scale);

                        // Find next point (could be on-curve or another control point)
                        let nextJ = (j + 1 > endPt) ? startIndex : j + 1;
                        let nextIsOnCurve = (flags[nextJ] & 1) !== 0;

                        if (nextIsOnCurve) {
                            // Simple case: one control point followed by on-curve point
                            const nextX = x + (xs[nextJ] * scale);
                            const nextY = y - (ys[nextJ] * scale);
                            pathData += `Q${ctrlX.toFixed(2)},${ctrlY.toFixed(2)} ${nextX.toFixed(2)},${nextY.toFixed(2)}`;
                            j = nextJ + 1;
                        } else {
                            // Two consecutive off-curve points - implied on-curve point between them
                            const nextX = x + (xs[nextJ] * scale);
                            const nextY = y - (ys[nextJ] * scale);

                            // Calculate implied on-curve point (midpoint)
                            const impliedX = (ctrlX + nextX) / 2;
                            const impliedY = (ctrlY + nextY) / 2;

                            pathData += `Q${ctrlX.toFixed(2)},${ctrlY.toFixed(2)} ${impliedX.toFixed(2)},${impliedY.toFixed(2)}`;

                            // Make current point the next off-curve point
                            j = nextJ;
                        }
                    }
                }

                // Close the path
                pathData += "Z";
            }

            // Move to the next contour
            startIndex = endPt + 1;
        }

        // Return SVG path with proper formatting
        return `<path d="${pathData}" />`;
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
     *      // Get the RGB color of the character 'A'
     *      const color = p5asciify.asciifier().fontManager.glyphColor('A');
     *      console.log(color);
     *  }
     * ```
     */
    public glyphColor(char: string): [number, number, number] {
        // Handle multi-byte characters correctly
        const charInfo = this._characters.find(
            c => c.character === char
        );

        if (!charInfo) {
            const codePoint = char.codePointAt(0);
            const hexCode = codePoint ? codePoint.toString(16).padStart(4, '0') : 'unknown';
            throw new P5AsciifyError(`Could not find character in character set: ${char} (U+${hexCode})`);
        }

        return [charInfo.r, charInfo.g, charInfo.b];
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
        return [...characters].filter(
            (char: string) => !this._characters.some(c => c.character === char)
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
    public glyphColors(characters: string | string[] = ""): Array<[number, number, number]> {
        return Array.from(characters).map((char: string) => {
            const charInfo = this._characters.find(c => c.character === char);

            if (!charInfo) {
                const codePoint = char.codePointAt(0);
                const hexCode = codePoint ? codePoint.toString(16).padStart(4, '0') : 'unknown';
                throw new P5AsciifyError(`Could not find character in character set: ${char} (U+${hexCode})`);
            }

            return [charInfo.r, charInfo.g, charInfo.b];
        });
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