// colorpalettemanager.js

import P5AsciifyColorPalette from '../colorpalette.js';

/**
 * @class P5AsciifyColorPaletteManager
 * @description Manages multiple color palettes and their consolidated framebuffer representation.
 */
class P5AsciifyColorPaletteManager {
    constructor() {
        this.palettes = [];
        this.texture = null;
        this.p5Instance = null;
    }

    /**
     * Initializes the manager and sets up the consolidated framebuffer.
     * @param {Object} p5Instance - The p5.js instance.
     */
    setup(p5Instance) {
        this.p5Instance = p5Instance;

        // Initialize framebuffers for all existing palettes
        this.palettes.forEach(palette => palette.setup(this.p5Instance));

        // Determine the maximum number of colors across all palettes
        const maxColors = this.getMaxColors();

        // Create the manager's framebuffer with width = maxColors and height = number of palettes
        this.texture = this.p5Instance.createFramebuffer({
            width: maxColors,
            height: Math.max(this.palettes.length, 1), // Ensure height is at least 1
            depthFormat: this.p5Instance.UNSIGNED_INT,
            textureFiltering: this.p5Instance.NEAREST
        });

        this.updateTexture();
    }

    /**
     * Determines the maximum number of colors among all palettes.
     * @returns {number} The maximum color count.
     */
    getMaxColors() {
        return Math.max(...this.palettes.map(p => p.getColors().length), 1);
    }

    /**
     * Updates the manager's framebuffer by stitching together all palettes' framebuffers.
     */
    updateTexture() {
        if (!this.texture || !this.p5Instance) return;

        const maxColors = this.getMaxColors();
        const numPalettes = this.palettes.length;

        // Resize the manager's framebuffer to accommodate all palettes
        this.texture.resize(maxColors, Math.max(numPalettes, 1));
        this.texture.loadPixels();

        // Iterate through each palette and copy its framebuffer data into the manager's framebuffer
        this.palettes.forEach((palette, rowIndex) => {
            const paletteFramebuffer = palette.getFramebuffer();
            if (!paletteFramebuffer) return;

            paletteFramebuffer.loadPixels();

            // Copy palette's pixels to the corresponding row in the manager's framebuffer
            for (let x = 0; x < palette.getColors().length; x++) {
                const managerIndex = (rowIndex * maxColors + x) * 4;
                const paletteIndex = x * 4;

                this.texture.pixels[managerIndex] = paletteFramebuffer.pixels[paletteIndex];
                this.texture.pixels[managerIndex + 1] = paletteFramebuffer.pixels[paletteIndex + 1];
                this.texture.pixels[managerIndex + 2] = paletteFramebuffer.pixels[paletteIndex + 2];
                this.texture.pixels[managerIndex + 3] = paletteFramebuffer.pixels[paletteIndex + 3];
            }

            // Fill remaining pixels in the row with transparency if the palette has fewer colors than maxColors
            for (let x = palette.getColors().length; x < maxColors; x++) {
                const managerIndex = (rowIndex * maxColors + x) * 4;
                this.texture.pixels[managerIndex] = 0;
                this.texture.pixels[managerIndex + 1] = 0;
                this.texture.pixels[managerIndex + 2] = 0;
                this.texture.pixels[managerIndex + 3] = 0;
            }
        });

        // If there are no palettes, ensure the framebuffer has at least one transparent pixel
        if (this.palettes.length === 0) {
            this.texture.pixels[0] = 0;
            this.texture.pixels[1] = 0;
            this.texture.pixels[2] = 0;
            this.texture.pixels[3] = 0;
        }

        this.texture.updatePixels();
    }

    /**
     * Adds a new palette to the manager.
     * @param {Array} colors - An array of color values for the new palette.
     * @returns {P5AsciifyColorPalette} The newly added palette instance.
     */
    addPalette(colors) {
        const palette = new P5AsciifyColorPalette(colors);
        this.palettes.push(palette);

        if (this.p5Instance) {
            palette.setup(this.p5Instance);
            this.updateTexture();
        }

        return palette;
    }

    /**
     * Removes a palette from the manager.
     * @param {P5AsciifyColorPalette} palette - The palette instance to remove.
     */
    removePalette(palette) {
        const index = this.palettes.indexOf(palette);
        if (index !== -1) {
            this.palettes.splice(index, 1);
            this.updateTexture();
        }
    }

    /**
     * Retrieves the row index of a specific palette within the manager's framebuffer.
     * @param {P5AsciifyColorPalette} palette - The palette instance.
     * @returns {number} The row index of the palette, or -1 if not found.
     */
    getPaletteRow(palette) {
        return this.palettes.indexOf(palette);
    }

    /**
     * Retrieves the consolidated framebuffer containing all palettes.
     * @returns {Object} The manager's framebuffer.
     */
    getTexture() {
        return this.texture;
    }
}

export default P5AsciifyColorPaletteManager;
