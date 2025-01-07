// colorpalette.js

/**
 * @class P5AsciifyColorPalette
 * @description Represents a single color palette with its own framebuffer
 */
class P5AsciifyColorPalette {
    /**
     * @param {Array} colors - An array of color values.
     */
    constructor(colors) {
        this.colors = colors;
        this.framebuffer = null;
        this.p5Instance = null;
    }

    /**
     * Initializes the palette's framebuffer using the provided p5 instance.
     * @param {Object} p5Instance - The p5.js instance.
     */
    setup(p5Instance) {
        this.p5Instance = p5Instance;
        // Ensure minimum width of 1 to prevent zero-sized framebuffer
        const width = Math.max(this.colors.length, 1);
        this.framebuffer = this.p5Instance.createFramebuffer({
            density: 1,
            width: width,
            height: 1,
            depthFormat: this.p5Instance.UNSIGNED_INT,
            textureFiltering: this.p5Instance.NEAREST
        });
        this.updateFramebuffer();
    }

    /**
     * Updates the framebuffer with the current colors.
     */
    updateFramebuffer() {
        if (!this.framebuffer || !this.p5Instance) return;

        const sw = Math.max(this.colors.length, 1);
        const sh = 1;

        this.framebuffer.resize(sw, sh);
        this.framebuffer.loadPixels();

        for (let lx = 0; lx < sw; lx++) {
            const color = lx < this.colors.length
                ? this.p5Instance.color(this.colors[lx])
                : this.p5Instance.color(0, 0, 0, 0);
            const index = 4 * lx;
            this.framebuffer.pixels[index] = this.p5Instance.red(color);
            this.framebuffer.pixels[index + 1] = this.p5Instance.green(color);
            this.framebuffer.pixels[index + 2] = this.p5Instance.blue(color);
            this.framebuffer.pixels[index + 3] = this.p5Instance.alpha(color);
        }
        this.framebuffer.updatePixels();
    }

    /**
     * Updates the palette's colors and refreshes the framebuffer.
     * @param {Array} newColors - The new array of colors.
     */
    setColors(newColors) {
        this.colors = newColors;
        this.updateFramebuffer();
    }

    /**
     * Retrieves the palette's framebuffer.
     * @returns {Object} The framebuffer associated with this palette.
     */
    getFramebuffer() {
        return this.framebuffer;
    }

    /**
     * Retrieves the palette's colors.
     * @returns {Array} The array of color values.
     */
    getColors() {
        return this.colors;
    }
}

export default P5AsciifyColorPalette;
