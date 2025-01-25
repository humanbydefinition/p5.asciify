import p5 from 'p5';

/**
 * A 1D color palette stored in a framebuffer, which is used to pass colors to shaders.
 */
export class P5AsciifyColorPalette {

    /** The framebuffer used to store the color palette. */
    private _framebuffer: p5.Framebuffer;

    /**
     * Create a new color palette instance.
     * @param _p The p5 instance.
     * @param _colors The colors to store in the palette.
     */
    constructor(
        private _p: p5,
        private _colors: [number, number, number][]
    ) {
        const width = Math.max(this._colors.length, 1);
        this._framebuffer = this._p.createFramebuffer({
            density: 1,
            width: width,
            height: 1,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
        this._updateFramebuffer();
    }

    /**
     * Update the framebuffer with the currently selected colors.
     */
    private _updateFramebuffer(): void {
        if (!this._framebuffer || !this._p) return;

        const sw = Math.max(this._colors.length, 1);
        const sh = 1;

        this._framebuffer.resize(sw, sh);
        this._framebuffer.loadPixels();

        for (let lx = 0; lx < sw; lx++) {
            const color = lx < this._colors.length
                ? this._p.color(this._colors[lx])
                : this._p.color(0, 0, 0, 0);
            const index = 4 * lx;
            this._framebuffer.pixels[index] = this._p.red(color);
            this._framebuffer.pixels[index + 1] = this._p.green(color);
            this._framebuffer.pixels[index + 2] = this._p.blue(color);
            this._framebuffer.pixels[index + 3] = this._p.alpha(color);
        }
        this._framebuffer.updatePixels();
    }

    /**
     * Set the colors of the palette and update the framebuffer.
     * @param newColors The new colors to set.
     */
    public setColors(newColors: [number, number, number][]): void {
        this._colors = newColors;
        this._updateFramebuffer();
    }

    // Getters
    get colors(): [number, number, number][] { return this._colors; }
    get framebuffer(): p5.Framebuffer { return this._framebuffer; }
}
