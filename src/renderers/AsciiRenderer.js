// renderers/AsciiRenderer.js

import { validateOptions } from "../validators/OptionsValidator";

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

        this.p = p5Instance;
        this.grid = grid;
        this.characterSet = characterSet;
        this.options = options;

        this.primaryColorSampleFramebuffer = this.p.createFramebuffer({ density: 1, antialias: false, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });
        this.secondaryColorSampleFramebuffer = this.p.createFramebuffer({ density: 1, antialias: false, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });
        this.asciiCharacterFramebuffer = this.p.createFramebuffer({ density: 1, antialias: false, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });

        this.outputFramebuffer = this.p.createFramebuffer({ depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });
    }

    resizeFramebuffers() {
        this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    resetShaders() {
        
    }

    updateOptions(newOptions) {

        validateOptions(this.p, newOptions);

        this.options = {
            ...this.options,
            ...newOptions
        };

        // If we are still in the users setup(), the characterset and grid have not been initialized yet.
        if (!this.p._setupDone) {
            return;
        }

        if (newOptions?.characters) {
            this.characterSet.setCharacterSet(newOptions.characters);
            this.resetShaders();
        }

        /**

        if (newOptions?.hasOwnProperty('characterColorMode')) {
            this.textAsciiRenderer.updateCharacterColorMode();
        }

        if (newOptions?.hasOwnProperty('characterColor')) {
            this.textAsciiRenderer.updateCharacterColor();
        }

        if (newOptions?.hasOwnProperty('backgroundColor')) {
            this.textAsciiRenderer.updateBackgroundColor();
        }

        if (newOptions?.hasOwnProperty('invertMode')) {
            this.textAsciiRenderer.updateInvertMode();
        }

        if (newOptions?.hasOwnProperty('enabled')) {
            this.textAsciiRenderer.toggleVisibility();
        }

        **/
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
