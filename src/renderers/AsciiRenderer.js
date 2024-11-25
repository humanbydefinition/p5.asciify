// renderers/AsciiRenderer.js
export default class AsciiRenderer {
    /**
     * Constructor for AsciiRenderer.
     * @param {Object} options - Renderer-specific options.
     * @param {P5} p5Instance - The p5.js instance.
     */
    constructor(p5Instance, grid, characterSet, options) {
        if (new.target === AsciiRenderer) {
            throw new TypeError("Cannot construct AsciiRenderer instances directly");
        }
        
        this.p5 = p5Instance;
        this.grid = grid;
        this.characterSet = characterSet;
        this.options = options;

        this.primaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.secondaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.asciiCharacterFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });

        this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    updateOptions(newOptions) {
        this.options = {
            ...this.options,
            ...newOptions
        };
    }

    /**
     * Render ASCII based on the input framebuffer.
     * @param {Framebuffer} inputFramebuffer - The input framebuffer to base ASCII rendering on.
     */
    render(inputFramebuffer) {
        throw new Error("Must implement render method");
    }

    /**
     * Get the framebuffer containing the ASCII-rendered output.
     * @returns {Framebuffer} The output framebuffer.
     */
    getOutputFramebuffer() {
        return this.outputFramebuffer;
    }
}
