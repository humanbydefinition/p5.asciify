/**
 * @module characterset
 * @description
 * A class that represents a character set for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all the characters in the character set.
 */
class P5AsciifyCharacterSet {

    /**
     * Sets up the character set with a specified font, characters, and font size.
     * @param {Object} options - The setup options.
     * @param {Object} options.font - The font object to use.
     * @param {string} options.characters - The string of characters to include in the character set.
     * @param {number} options.fontSize - The font size to use.
     */
    setup({ font, characters, fontSize }) {
        this.font = font;
        this.characters = Array.from(characters);
        this.fontSize = fontSize;
        this.reset();
    }

    /**
     * Resets the character set by reloading the glyphs and creating a new texture.
     */
    reset() {
        this.glyphs = Object.values(this.font.font.glyphs.glyphs);
        this.glyphs = this.glyphs.filter(glyph => glyph.unicode !== undefined);

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

        this.createTexture({ fontSize: 512 });
    }

    /**
     * Calculates the maximum dimensions of glyphs in the whole font for a given font size.
     * @param {number} fontSize - The font size to use for calculations.
     * @returns {Object} An object containing the maximum width and height of the glyphs.
     */
    getMaxGlyphDimensions(fontSize) {
        return this.glyphs.reduce((maxDims, glyph) => {
            const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
            return {
                width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1))
            };
        }, { width: 0, height: 0 });
    }

    /**
     * Sets the font object and resets the character set.
     * @param {Object} font - The new font object.
     */
    setFontObject(font) {
        this.font = font;
        this.reset();
    }

    /**
     * Sets the characters to be used in the character set and creates a new texture.
     * @param {string} characters - The string of characters to set.
     */
    setCharacterSet(characters) {
        this.characters = Array.from(characters);
        this.createTexture({ fontSize: 512 });
    }

    /**
     * Sets a specific character at a given index in the character set and updates the texture.
     * @param {Object} options - The character options.
     * @param {string} options.character - The character to set.
     * @param {number} options.index - The index at which to set the character.
     */
    setCharacter({ character, index }) {
        this.characters[index] = character;
        this.createTexture({ fontSize: 512 });
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param {string} characters - The string of characters to check.
     * @returns {string[]} An array of unsupported characters.
     */
    getUnsupportedCharacters(characters) {
        const badCharacters = new Set();

        for (const char of characters) {
            const charCode = char.codePointAt(0);
            const existsInFont = this.glyphs.some(glyph => glyph.unicodes.includes(charCode));
            if (!existsInFont) {
                badCharacters.add(char);
            }
        }

        return Array.from(badCharacters);
    }

    /**
     * Sets the font size and updates the maximum glyph dimensions.
     * @param {number} fontSize - The new font size.
     */
    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
    }

    /**
     * Creates a texture containing all characters in the character set, arranged in a 2d grid.
     * @param {Object} options - The texture creation options.
     * @param {number} options.fontSize - The font size to use for rendering the texture.
     */
    createTexture({ fontSize }) {
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);

        let dimensions = this.getMaxGlyphDimensions(fontSize);

        if (!this.texture) {
            this.texture = createFramebuffer({ format: FLOAT, width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();

        clear();
        textFont(this.font);
        fill(255);
        textSize(fontSize);
        textAlign(LEFT, TOP);
        noStroke();

        for (let i = 0; i < this.characters.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col;
            const y = dimensions.height * row;

            const character = this.characters[i];
            text(character, x - ((dimensions.width * this.charsetCols) / 2), y - ((dimensions.height * this.charsetRows) / 2));
        }

        this.texture.end();
    }
};

export default P5AsciifyCharacterSet;