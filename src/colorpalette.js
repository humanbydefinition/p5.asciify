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
        this.palettes = [];
    }

    /**
     * Sets up the color palette with an initial texture.
     * This method should be called after the p5.js setup() function
     */
    setup() {
        this.texture = createFramebuffer({ width: 1, height: 1 });

        if (this.palettes.length > 0) {
            this.updateTexture();
        }
    }

    /**
     * Updates the texture with the current palettes.
     */
    updateTexture() {
        let maxColors = this.palettes.reduce((max, colors) => Math.max(max, colors.length), 1);
        this.texture.resize(maxColors, this.palettes.length);

        this.texture.loadPixels();

        for (let y = 0; y < this.palettes.length; y++) {
            let colors = this.palettes[y].map(c => color(c)); // Convert to p5.Color objects
            for (let x = 0; x < colors.length; x++) {
                let index = (y * maxColors + x) * 4;
                let col = colors[x];
                this.texture.pixels[index] = red(col);
                this.texture.pixels[index + 1] = green(col);
                this.texture.pixels[index + 2] = blue(col);
                this.texture.pixels[index + 3] = alpha(col);
            }
            // Fill the rest of the row with transparent pixels if the palette is shorter
            for (let x = colors.length; x < maxColors; x++) {
                let index = (y * maxColors + x) * 4;
                this.texture.pixels[index] = 0;
                this.texture.pixels[index + 1] = 0;
                this.texture.pixels[index + 2] = 0;
                this.texture.pixels[index + 3] = 0;
            }
        }
        this.texture.updatePixels();
    }

    /**
     * Adds a new color palette to the texture
     * @param {Array} colors - The array of colors to add
     * @returns The index of the new palette
     */
    addPalette(colors) {
        this.palettes.push(colors);

        if (frameCount > 0) {
            this.updateTexture();
        }

        return this.palettes.length - 1;
    }

    /**
     * Removes a color palette from the texture
     * @param {number} index - The index of the palette to remove
     */
    removePalette(index) {
        if (index >= 0 && index < this.palettes.length) {
            this.palettes.splice(index, 1);
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Index ${index} is out of range`);
        }
    }

    /**
     * Sets the colors for a specific color palette
     * @param {number} index - The index of the palette to update
     * @param {Array} colors - The new array of colors for the palette
     */
    setPaletteColors(index, colors) {
        if (index >= 0 && index < this.palettes.length) {
            this.palettes[index] = colors;
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Index ${index} is out of range`);
        }
    }
}

export default P5AsciifyColorPalette;