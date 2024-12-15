
class P5AsciifyFontTextureAtlas {
    /**
     * Sets up the character set with a specified font, characters, and font size.
     * @param {Object} options - The setup options.
     * @param {string} options.type - The type of character set to set up. (e.g. "brightness", "edge")
     * @param {Object} options.font - The font object to use.
     * @param {string} options.characters - The string of characters to include in the character set.
     * @param {number} options.fontSize - The font size to use.
     */
    constructor({ p5Instance, font, fontSize }) {
        this.p5Instance = p5Instance;
        this.font = font;
        this.fontSize = fontSize;

        this.characters = Object.values(this.font.font.glyphs.glyphs)
            .filter(glyph => glyph.unicode !== undefined)
            .map(glyph => String.fromCharCode(glyph.unicode));

        this.characterGlyphs = this.loadCharacterGlyphs();
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(this.fontSize);
    }

    loadCharacterGlyphs() {
        // Load glyphs with unicode
        let glyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);

        // Assign colors to the sorted glyphs
        glyphs.forEach((glyph, index) => {
            glyph.r = index % 256;
            glyph.g = Math.floor(index / 256) % 256;
            glyph.b = Math.floor(index / 65536);
        });

        return glyphs;
    }

    /**
     * Calculates the maximum dimensions of glyphs in the whole font for a given font size.
     * @param {number} fontSize - The font size to use for calculations.
     * @returns {Object} An object containing the maximum width and height of the glyphs.
     */
    getMaxGlyphDimensions(fontSize) {
        return this.characterGlyphs.reduce((maxDims, glyph) => {
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
        this.characters = Object.values(this.font.font.glyphs.glyphs)
            .filter(glyph => glyph.unicode !== undefined)
            .map(glyph => String.fromCharCode(glyph.unicode));

        this.characterGlyphs = this.loadCharacterGlyphs();
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(this.fontSize);
    }

    /**
     * Sets the font size and updates the maximum glyph dimensions.
     * @param {number} fontSize - The new font size.
     */
    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(this.fontSize);
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
            this.texture = this.p5Instance.createFramebuffer({ width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();
        this.drawCharacters(fontSize, dimensions);
        this.texture.end();
    }

    /**
     * 
     * @param {number} fontSize - The font size to use for drawing the characters on the texture.
     * @param {*} dimensions - The maximum dimensions of the glyphs.
     */
    drawCharacters(fontSize, dimensions) {
        this.p5Instance.clear();
        this.p5Instance.textFont(this.font);
        this.p5Instance.fill(255);
        this.p5Instance.textSize(fontSize);
        this.p5Instance.textAlign(this.p5Instance.LEFT, this.p5Instance.TOP);
        this.p5Instance.noStroke();

        for (let i = 0; i < this.characterGlyphs.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col - ((dimensions.width * this.charsetCols) / 2);
            const y = dimensions.height * row - ((dimensions.height * this.charsetRows) / 2);
            this.p5Instance.text(String.fromCharCode(this.characterGlyphs[i].unicode), x, y);
        }
    }
}

export default P5AsciifyFontTextureAtlas;