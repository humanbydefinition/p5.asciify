class P5AsciifyCharacterSet {
    constructor({ font, fontSize = 16, characters }) {
        this.font = font;
        this.fontSize = fontSize;
        this.characters = Array.from(characters);

        this.reset(true);
    }

    reset(init = false) {
        this.glyphs = Object.values(this.font.font.glyphs.glyphs);
        this.glyphs = this.glyphs.filter(glyph => glyph.unicode !== undefined);

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

        if (!init) {
            this.createTexture({ fontSize: 512 });
        }
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

    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
    }

    createTexture({ fontSize }) {
        // Calculate the number of columns and rows for the texture based on the number of characters
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);

        let dimensions = this.getMaxGlyphDimensions(fontSize); // Calculate the dimensions of the texture

        // Create a 2D texture for the characters
        this.texture = createGraphics(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        this.texture.pixelDensity(1);
        this.texture.textFont(this.font);
        this.texture.fill(255);
        this.texture.textSize(fontSize);
        this.texture.textAlign(LEFT, TOP);
        this.texture.noStroke();

        // Draw each character to to a cell/tile in the texture
        for (let i = 0; i < this.characters.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col;
            const y = dimensions.height * row;

            const character = this.characters[i];
            this.texture.text(character, x, y);
        }
    }
};