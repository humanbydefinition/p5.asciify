/**
 * @class P5AsciifyColorPalette
 * @description
 * A class that represents a color palette for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all color palettes.
 */
class P5AsciifyColorPalette {
    /**
     * Creates a new instance of the ColorPaletteTexture class.
     */
    constructor() {
        this.palettes = {};
        this.paletteRows = {};
        this.nextId = 0;
    }

    /**
     * Sets up the color palette with an initial texture.
     * This method should be called after the p5.js setup() function
     */
    setup() {
        this.texture = this.p5Instance.createFramebuffer({ width: 1, height: 1 });

        if (Object.keys(this.palettes).length > 0) {
            this.updateTexture();
        }
    }

    addInstance(p5Instance) {
        this.p5Instance = p5Instance;
    }

    /**
     * Updates the texture with the current palettes.
     */
    updateTexture() {
        let palettesArray = Object.values(this.palettes);
        let maxColors = palettesArray.reduce((max, colors) => Math.max(max, colors.length), 1);
        this.texture.resize(maxColors, palettesArray.length);

        this.texture.loadPixels();

        let rowIndex = 0;
        for (let id in this.palettes) {
            let colors = this.palettes[id].map(c => this.p5Instance.color(c)); // Convert to p5.Color objects
            this.paletteRows[id] = rowIndex; // Update the row index for the current palette
            for (let x = 0; x < colors.length; x++) {
                let index = (rowIndex * maxColors + x) * 4;
                let col = colors[x];
                this.texture.pixels[index] = this.p5Instance.red(col);
                this.texture.pixels[index + 1] = this.p5Instance.green(col);
                this.texture.pixels[index + 2] = this.p5Instance.blue(col);
                this.texture.pixels[index + 3] = this.p5Instance.alpha(col);
            }
            // Fill the rest of the row with transparent pixels if the palette is shorter
            for (let x = colors.length; x < maxColors; x++) {
                let index = (rowIndex * maxColors + x) * 4;
                this.texture.pixels[index] = 0;
                this.texture.pixels[index + 1] = 0;
                this.texture.pixels[index + 2] = 0;
                this.texture.pixels[index + 3] = 0;
            }
            rowIndex++;
        }
        this.texture.updatePixels();
    }

    /**
     * Adds a new color palette to the texture
     * @param {Array} colors - The array of colors to add
     * @returns The ID of the new palette
     */
    addPalette(colors) {
        const id = `palette-${this.nextId++}`;
        this.palettes[id] = colors;

        this.updateTexture();

        return id;
    }

    /**
     * Removes a color palette from the texture
     * @param {string} id - The ID of the palette to remove
     */
    removePalette(id) {
        if (this.palettes[id]) {
            delete this.palettes[id];
            delete this.paletteRows[id];
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Palette with ID ${id} does not exist`);
        }
    }

    /**
     * Sets the colors for a specific color palette
     * @param {string} id - The ID of the palette to update
     * @param {Array} colors - The new array of colors for the palette
     */
    setPaletteColors(id, colors) {
        if (this.palettes[id]) {
            this.palettes[id] = colors;
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Palette with ID ${id} does not exist`);
        }
    }

    /**
     * Gets the row index of a specific color palette
     * @param {string} id - The ID of the palette
     * @returns The row index of the palette, or -1 if the palette does not exist
     */
    getPaletteRow(id) {
        return this.paletteRows[id] !== undefined ? this.paletteRows[id] : -1;
    }
}

export default P5AsciifyColorPalette;