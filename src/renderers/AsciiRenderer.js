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
