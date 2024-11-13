import P5AsciifyEffectManager from './managers/effectmanager.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';
import P5AsciifyColorPalette from './colorpalette.js';

import BrightnessAsciiRenderer from './renderers/BrightnessAsciiRenderer.js';
import EdgeAsciiRenderer from './renderers/EdgeAsciiRenderer.js';

/**
 * @class P5Asciify
 * @description
 * The main class for the P5Asciify library, responsible for setting up and running the rendering pipeline.
 */
class P5Asciify {

    commonOptions = {
        fontSize: 16,
        gridDimensions: [0, 0],
    };

    brightnessOptions = {
        enabled: true,
        characters: "0123456789",
        characterColor: [1.0, 1.0, 1.0],
        characterColorMode: 0,
        backgroundColor: [0.0, 0.0, 0.0],
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
    };

    edgeOptions = {
        enabled: false,
        characters: "-/|\\-/|\\",
        characterColor: [1.0, 1.0, 1.0],
        characterColorMode: 0,
        backgroundColor: [0.0, 0.0, 0.0],
        backgroundColorMode: 1,
        invertMode: false,
        sobelThreshold: 0.5,
        sampleThreshold: 16,
        rotationAngle: 0,
    };

    colorPalette = new P5AsciifyColorPalette();

    preEffectManager = new P5AsciifyEffectManager(this.colorPalette);

    afterEffectManager = new P5AsciifyEffectManager(this.colorPalette);

    sketchFramebuffer = null;

    preEffectPrevFramebuffer = null;
    preEffectNextFramebuffer = null;

    postEffectPrevFramebuffer = null;
    postEffectNextFramebuffer = null;

    asciiFramebufferDimensions = { width: 0, height: 0 };

    font = null;
    brightnessCharacterSet = new P5AsciifyCharacterSet();
    edgeCharacterSet = new P5AsciifyCharacterSet();
    grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    instanceMode = false;

    p5Canvas = null;

    p5Instance = null;

    brightnessRenderer = null;
    edgeRenderer = null;

    instance(p) {
        this.p5Instance = p;
        this.instanceMode = true;

        this.p5Instance.preload = () => { }; // Define a default preload function if one isn't provided
    }

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    setup() {
        this.p5Instance.pixelDensity(1);

        this.sketchFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.brightnessCharacterSet.setup({ p5Instance: this.p5Instance, type: "brightness", font: this.font, characters: this.brightnessOptions.characters, fontSize: this.commonOptions.fontSize });
        this.edgeCharacterSet.setup({ p5Instance: this.p5Instance, type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

        this.grid.resizeCellPixelDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.colorPalette.setup();

        this.preEffectManager.setup();
        this.afterEffectManager.setup();

        this.preEffectPrevFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });
        this.preEffectNextFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.postEffectPrevFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });
        this.postEffectNextFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.brightnessCharacterSet, this.brightnessOptions);

        this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.brightnessRenderer, this.edgeOptions);

        this.asciiFramebufferDimensions = { width: this.p5Instance.width, height: this.p5Instance.height };
    }

    /**
     * Checks if the dimensions of the ASCII framebuffer have changed and resets the grid if necessary.
     * This function is called every frame after the user's draw() function, 
     * since I am not aware of a better way to do this since there is no hook for when the canvas is resized.
     */
    checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.p5Instance.width || this.asciiFramebufferDimensions.height !== this.p5Instance.height) {
            this.asciiFramebufferDimensions.width = this.p5Instance.width;
            this.asciiFramebufferDimensions.height = this.p5Instance.height;

            if (this.commonOptions.gridDimensions[0] === 0 || this.commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
                this.edgeRenderer.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            } else {
                this.grid._resizeGrid();
            }
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    asciify() {
        // Initial rendering to preEffectNextFramebuffer
        this.preEffectNextFramebuffer.begin();
        this.p5Instance.clear(); // do not remove this, even though it's tempting
        this.p5Instance.image(this.sketchFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        this.preEffectNextFramebuffer.end();

        // Copy preEffectNextFramebuffer to preEffectPrevFramebuffer
        this.preEffectPrevFramebuffer.begin();
        this.p5Instance.clear(); // do not remove this, even though it's tempting
        this.p5Instance.image(this.sketchFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        this.preEffectPrevFramebuffer.end();

        for (const effect of this.preEffectManager._effects) {
            if (effect.enabled) {
                // Swap framebuffers only if the effect is enabled
                [this.preEffectPrevFramebuffer, this.preEffectNextFramebuffer] = [this.preEffectNextFramebuffer, this.preEffectPrevFramebuffer];

                this.preEffectNextFramebuffer.begin();
                this.p5Instance.shader(effect.shader);
                effect.setUniforms(this.preEffectPrevFramebuffer, this.p5Instance.frameCount);
                this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
                this.preEffectNextFramebuffer.end();
            }
        }

        let asciiOutput = this.preEffectNextFramebuffer;

        if (this.brightnessOptions.enabled) {
            this.brightnessRenderer.render(asciiOutput);
            asciiOutput = this.brightnessRenderer.getOutputFramebuffer();
        }

        if (this.edgeOptions.enabled) {
            this.edgeRenderer.render(this.preEffectNextFramebuffer, this.brightnessOptions.enabled);
            asciiOutput = this.edgeRenderer.getOutputFramebuffer();
        }

        this.postEffectNextFramebuffer.begin();
        this.p5Instance.clear();
        this.p5Instance.image(asciiOutput, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        this.postEffectNextFramebuffer.end();

        this.postEffectPrevFramebuffer.begin();
        this.p5Instance.clear();
        this.p5Instance.image(asciiOutput, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        this.postEffectPrevFramebuffer.end();

        for (const effect of this.afterEffectManager._effects) {
            if (effect.enabled) {
                [this.postEffectPrevFramebuffer, this.postEffectNextFramebuffer] = [this.postEffectNextFramebuffer, this.postEffectPrevFramebuffer];
                this.postEffectNextFramebuffer.begin();
                this.p5Instance.shader(effect.shader);
                effect.setUniforms(this.postEffectPrevFramebuffer, this.p5Instance.frameCount);
                this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
                this.postEffectNextFramebuffer.end();
            }
        }

        this.p5Instance.clear(); // do not remove this, even though it's tempting
        this.p5Instance.image(this.postEffectNextFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        this.checkFramebufferDimensions();
    }

    /**
     * Sets the default options for the P5Asciify library.
     * @param {object} options 
     */
    setDefaultOptions(brightnessOptions, edgeOptions, commonOptions) {

        // The parameters are pre-processed, so we can just spread them into the class variables
        this.brightnessOptions = {
            ...this.brightnessOptions,
            ...brightnessOptions
        };
        this.edgeOptions = {
            ...this.edgeOptions,
            ...edgeOptions
        };
        this.commonOptions = {
            ...this.commonOptions,
            ...commonOptions
        };

        if (this.p5Instance.frameCount == 0) { // If we are still in the users setup(), the characterset and grid have not been initialized yet.
            return;
        }

        this.brightnessRenderer.updateOptions(brightnessOptions);
        this.edgeRenderer.updateOptions(edgeOptions);

        if (brightnessOptions?.characters) {
            this.brightnessCharacterSet.setCharacterSet(brightnessOptions.characters);
        }

        if (edgeOptions?.characters) {
            this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
        }

        if (commonOptions?.fontSize) {
            this.brightnessCharacterSet.setFontSize(commonOptions.fontSize);
            this.edgeCharacterSet.setFontSize(commonOptions.fontSize);
            this.grid.resizeCellPixelDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);
            this.edgeRenderer.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        if (commonOptions?.gridDimensions) {
            if (commonOptions.gridDimensions[0] === 0 || commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
            } else {
                this.grid.resizeCellDimensions(commonOptions.gridDimensions[0], commonOptions.gridDimensions[1]);
            }
            this.edgeRenderer.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }
}

export default P5Asciify;