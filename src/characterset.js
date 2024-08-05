import P5AsciifyError from './errors.js';

/**
 * @class P5AsciifyCharacterSet
 * @description
 * A class that represents a character set for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all the characters in the character set.
 */
class P5AsciifyCharacterSet {
    /**
     * Sets up the character set with a specified font, characters, and font size.
     * @param {Object} options - The setup options.
     * @param {string} options.type - The type of character set to set up. (e.g. "brightness", "edge")
     * @param {Object} options.font - The font object to use.
     * @param {string} options.characters - The string of characters to include in the character set.
     * @param {number} options.fontSize - The font size to use.
     */
    setup({ type, font, characters, fontSize }) {
        this.type = type;
        this.font = font;
        this.fontSize = fontSize;

        this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);
        this.characters = this.validateCharacters(characters);
        this.characterGlyphs = this.loadCharacterGlyphs();

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

        this.createTexture(128);
    }

    loadCharacterGlyphs() {
        // Load glyphs with unicode
        let glyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);

        // Create a map for character positions
        let charPositionMap = new Map(this.characters.map((char, index) => [char, index]));

        // Filter and sort glyphs based on character positions
        let filteredGlyphs = glyphs
            .filter(glyph => glyph.unicodes.some(u => this.characters.includes(String.fromCharCode(u))))
            .sort((a, b) => charPositionMap.get(String.fromCharCode(a.unicodes[0])) - charPositionMap.get(String.fromCharCode(b.unicodes[0])));

        // Assign colors to the sorted glyphs
        filteredGlyphs.forEach((glyph, index) => {
            glyph.r = index % 256; 
            glyph.g = Math.floor(index / 256) % 256;
            glyph.b = Math.floor(index / 65536);
        });

        return filteredGlyphs;
    }

    /**
     * Calculates the maximum dimensions of glyphs in the whole font for a given font size.
     * @param {number} fontSize - The font size to use for calculations.
     * @returns {Object} An object containing the maximum width and height of the glyphs.
     */
    getMaxGlyphDimensions(fontSize) {
        return this.fontGlyphs.reduce((maxDims, glyph) => {
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
        this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);
        this.characterGlyphs = this.loadCharacterGlyphs();
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(128);
    }

    /**
     * Sets the characters to be used in the character set and creates a new texture.
     * @param {string} characters - The string of characters to set.
     */
    setCharacterSet(characters) {
        this.characters = this.validateCharacters(characters);
        this.characterGlyphs = this.loadCharacterGlyphs();
        this.createTexture(128);
    }

    /**
     * Sets a specific character at a given index in the character set and updates the texture.
     * @param {Object} options - The character options.
     * @param {string} options.character - The character to set.
     * @param {number} options.index - The index at which to set the character.
     */
    setCharacter({ character, index }) {
        this.characters[index] = character;
        this.characterGlyphs = this.loadCharacterGlyphs();
        this.createTexture(128);
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param {string} characters - The string of characters to check.
     * @returns {string[]} An array of unsupported characters.
     */
    getUnsupportedCharacters(characters) {
        return Array.from(new Set(Array.from(characters).filter(char =>
            !this.fontGlyphs.some(glyph => glyph.unicodes.includes(char.codePointAt(0)))
        )));
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
     * @param {number} fontSize - The font size to use for rendering the texture.
     */
    createTexture(fontSize) {
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);
        let dimensions = this.getMaxGlyphDimensions(fontSize);

        if (!this.texture) {
            this.texture = createFramebuffer({ format: FLOAT, width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();
        this.drawCharacters(fontSize, dimensions);
        this.texture.end();
    }

    /**
     * Validates a string of characters to ensure they are supported by the current font.
     * @param {string} characters 
     * @param {string} defaultCharacters 
     * @returns {string[]} The validated characters. If any characters are unsupported, the default characters are returned.
     */
    validateCharacters(characters) {
        let unsupportedChars = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following ${this.type} characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
        return Array.from(characters);
    }

    /**
     * 
     * @param {number} fontSize - The font size to use for drawing the characters on the texture.
     * @param {*} dimensions - The maximum dimensions of the glyphs.
     */
    drawCharacters(fontSize, dimensions) {
        clear();
        textFont(this.font);
        fill(255);
        textSize(fontSize);
        textAlign(LEFT, TOP);
        noStroke();

        for (let i = 0; i < this.characters.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col - ((dimensions.width * this.charsetCols) / 2);
            const y = dimensions.height * row - ((dimensions.height * this.charsetRows) / 2);
            text(this.characters[i], x, y);
        }
    }

    getCharsetColorArray(string) {
        let colorArray = [];
        for (let i = 0; i < string.length; i++) {
            let char = string.charAt(i);
            let glyph = this.characterGlyphs.find(glyph => glyph.unicodes.includes(char.codePointAt(0)));

            if (glyph) {
                colorArray.push([glyph.r, glyph.g, glyph.b]);
            } else {
                throw new Error("Could not find character in character set: " + char + ".");
            }
        }

        return colorArray;
    }

    appendCharacterSet(string) {
        // Create a Set from the existing characters to ensure uniqueness
        let uniqueCharacters = new Set(this.characters);

        // Add new characters to the Set
        for (let char of string) {
            uniqueCharacters.add(char);
        }

        // Convert the Set back to an array and update the characters list
        this.characters = Array.from(uniqueCharacters);

        this.characterGlyphs = this.loadCharacterGlyphs();

        // Recreate the texture with the updated characters list
        this.createTexture(128);
    }
}

export default P5AsciifyCharacterSet;