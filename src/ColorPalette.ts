import p5 from 'p5';

export class P5AsciifyColorPalette {
    colors: [number, number, number][];
    framebuffer: p5.Graphics | null;
    p5Instance: p5 | null;

    constructor(colors: [number, number, number][]) {
        this.colors = colors;
        this.framebuffer = null;
        this.p5Instance = null;
    }

    setup(p5Instance: p5): void {
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

    updateFramebuffer(): void {
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

    setColors(newColors: [number, number, number][]): void {
        this.colors = newColors;
        this.updateFramebuffer();
    }

    getFramebuffer(): p5.Graphics | null {
        return this.framebuffer;
    }

    getColors(): [number, number, number][] {
        return this.colors;
    }
}
