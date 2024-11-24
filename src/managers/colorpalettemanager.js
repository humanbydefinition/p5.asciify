import P5AsciifyColorPalette from '../colorpalette.js';

/**
 * @class P5AsciifyColorPaletteManager
 * @description Manages multiple color palettes and their texture representation
 */
class P5AsciifyColorPaletteManager {
    constructor() {
        this.palettes = [];
        this.texture = null;
    }

    setup(p5Instance) {
        this.p5Instance = p5Instance;
        this.texture = this.p5Instance.createFramebuffer({ 
            width: 1, 
            height: 1,  
            depthFormat: this.p5Instance.UNSIGNED_INT, 
            textureFiltering: this.p5Instance.NEAREST 
        });

        if (this.palettes.length > 0) {
            this.updateTexture();
        }
    }

    addInstance(p5Instance) {
        this.p5Instance = p5Instance;
    }

    updateTexture() {
        const maxColors = Math.max(...this.palettes.map(p => p.colors.length), 1);
        this.texture.resize(maxColors, this.palettes.length);
        this.texture.loadPixels();

        this.palettes.forEach((palette, rowIndex) => {
            palette.rowIndex = rowIndex;
            const colors = palette.colors.map(c => this.p5Instance.color(c));

            // Fill colors
            colors.forEach((col, x) => {
                const index = (rowIndex * maxColors + x) * 4;
                this.texture.pixels[index] = this.p5Instance.red(col);
                this.texture.pixels[index + 1] = this.p5Instance.green(col);
                this.texture.pixels[index + 2] = this.p5Instance.blue(col);
                this.texture.pixels[index + 3] = this.p5Instance.alpha(col);
            });

            // Fill remaining pixels with transparency
            for (let x = colors.length; x < maxColors; x++) {
                const index = (rowIndex * maxColors + x) * 4;
                this.texture.pixels[index] = 0;
                this.texture.pixels[index + 1] = 0;
                this.texture.pixels[index + 2] = 0;
                this.texture.pixels[index + 3] = 0;
            }
        });

        this.texture.updatePixels();
    }

    addPalette(colors) {
        const palette = new P5AsciifyColorPalette(colors);
        this.palettes.push(palette);
        this.updateTexture();
        return palette;
    }

    removePalette(palette) {
        const index = this.palettes.indexOf(palette);
        if (index !== -1) {
            this.palettes.splice(index, 1);
            if (typeof frameCount !== 'undefined' && frameCount > 0) {
                this.updateTexture();
            }
        }
    }

    getPaletteRow(palette) {
        return palette.rowIndex;
    }

    getTexture() {
        return this.texture;
    }
}

export default P5AsciifyColorPaletteManager;