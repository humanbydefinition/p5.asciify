import p5 from 'p5';

/**
 * A 1D color palette for use with the P5Asciify library.
 */
export class P5AsciifyColorPalette {
    _colors: [number, number, number][];
    framebuffer!: p5.Framebuffer;
    p5Instance!: p5;

    constructor(colors: [number, number, number][]) {
        this._colors = colors;
    }

    /**
     * Setup the color palette with a p5 instance.
     * @param p5Instance The p5 instance to use for creating the framebuffer.
     */
    setup(p5Instance: p5): void {
        this.p5Instance = p5Instance;
        // Ensure minimum width of 1 to prevent zero-sized framebuffer
        const width = Math.max(this._colors.length, 1);
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
     * Update the framebuffer with the current colors.
     */
    updateFramebuffer(): void {
        if (!this.framebuffer || !this.p5Instance) return;

        const sw = Math.max(this._colors.length, 1);
        const sh = 1;

        this.framebuffer.resize(sw, sh);
        this.framebuffer.loadPixels();

        for (let lx = 0; lx < sw; lx++) {
            const color = lx < this._colors.length
                ? this.p5Instance.color(this._colors[lx])
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
     * Set the colors of the palette and update the framebuffer.
     * @param newColors The new colors to set.
     */
    setColors(newColors: [number, number, number][]): void {
        this._colors = newColors;
        this.updateFramebuffer();
    }

    // Getters
    get colors(): [number, number, number][] { return this._colors; }
}
