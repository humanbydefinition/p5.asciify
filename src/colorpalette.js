/**
 * Represents a color palette texture.
 */
class P5AsciifyColorPalette {
    /**
     * Creates a new instance of the ColorPaletteTexture class.
     */
    constructor() {
        this.palettes = [];

    }

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
                this.texture.pixels[index + 3] = alpha(col); // Use alpha value from p5.Color object
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

    reset() {
        this.palettes = [];

        this.texture.resize(1, 1);

        this.texture.begin();
        clear();
        this.texture.end();
    }

    addPalette(colors) {
        this.palettes.push(colors);

        if (frameCount > 0) {
            this.updateTexture();
        }
        return this.palettes.length - 1;
    }

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