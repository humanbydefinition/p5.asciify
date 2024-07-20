class P5AsciifyCharacterSet {
    constructor({ font, fontSize = 16, characters }) {
        this.font = font;
        this.fontSize = fontSize;
        this.characters = Array.from(characters);

        this.reset();
    }

    reset() {
        this.glyphs = Object.values(this.font.font.glyphs.glyphs);
        this.glyphs = this.glyphs.filter(glyph => glyph.unicode !== undefined);

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

        this.createTexture({ fontSize: 512 });
    }

    getMaxGlyphDimensions(fontSize) {
        return this.glyphs.reduce((maxDims, glyph) => {
            const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
            return {
                width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1))
            };
        }, { width: 0, height: 0 });
    }

    setFontObject(font) {
        this.font = font;
        this.reset();
    }

    setCharacterSet(characters) {
        this.characters = Array.from(characters);
        this.createTexture({ fontSize: 512 });
    }

    setCharacter({ character, index }) {
        this.characters[index] = character;
        this.createTexture({ fontSize: 512 });
    }

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

    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
    }

    createTexture({ fontSize }) {
        // Calculate the number of columns and rows for the texture based on the number of characters
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);

        let dimensions = this.getMaxGlyphDimensions(fontSize); // Calculate the dimensions of the texture

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