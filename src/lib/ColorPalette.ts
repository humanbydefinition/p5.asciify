import p5 from 'p5';

/**
 * A 1D color palette for use with the P5Asciify library.
 */
export class P5AsciifyColorPalette {
    framebuffer: p5.Framebuffer;

    constructor(
        private p: p5,
        private _colors: [number, number, number][]
    ) {
        const width = Math.max(this._colors.length, 1);
        this.framebuffer = this.p.createFramebuffer({
            density: 1,
            width: width,
            height: 1,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });
        this.updateFramebuffer();
    }

    /**
     * Update the framebuffer with the current colors.
     */
    updateFramebuffer(): void {
        if (!this.framebuffer || !this.p) return;

        const sw = Math.max(this._colors.length, 1);
        const sh = 1;

        this.framebuffer.resize(sw, sh);
        this.framebuffer.loadPixels();

        for (let lx = 0; lx < sw; lx++) {
            const color = lx < this._colors.length
                ? this.p.color(this._colors[lx])
                : this.p.color(0, 0, 0, 0);
            const index = 4 * lx;
            this.framebuffer.pixels[index] = this.p.red(color);
            this.framebuffer.pixels[index + 1] = this.p.green(color);
            this.framebuffer.pixels[index + 2] = this.p.blue(color);
            this.framebuffer.pixels[index + 3] = this.p.alpha(color);
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
