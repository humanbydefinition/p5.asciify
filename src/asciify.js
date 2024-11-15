import P5AsciifyEffectManager from './managers/effectmanager.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';
import P5AsciifyColorPalette from './colorpalette.js';

import BrightnessAsciiRenderer from './renderers/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import EdgeAsciiRenderer from './renderers/edgeAsciiRenderer/EdgeAsciiRenderer.js';
import AccurateAsciiRenderer from './renderers/accurateAsciiRenderer/AccurateAsciiRenderer.js';

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

    // brightness and accurate options are the same, since only one of them can be enabled at a time
    asciiOptions = {
        renderMode: 'brightness',
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

    asciiFramebufferDimensions = { width: 0, height: 0 };

    asciiCharacterSet = new P5AsciifyCharacterSet();
    edgeCharacterSet = new P5AsciifyCharacterSet();
    grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    instanceMode = false;

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

        this.asciiCharacterSet.setup({ p5Instance: this.p5Instance, type: "ascii", font: this.font, characters: this.asciiOptions.characters, fontSize: this.commonOptions.fontSize });
        this.edgeCharacterSet.setup({ p5Instance: this.p5Instance, type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

        this.grid.resizeCellPixelDimensions(this.asciiCharacterSet.maxGlyphDimensions.width, this.asciiCharacterSet.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.colorPalette.setup();

        this.preEffectManager.setup();
        this.afterEffectManager.setup();

        this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);

        let asciiRenderer = this.asciiOptions.renderMode === 'brightness' ? this.brightnessRenderer : this.accurateRenderer;
        this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, asciiRenderer, this.edgeOptions);

        this.asciiFramebufferDimensions = { width: this.p5Instance.width, height: this.p5Instance.height };

        this.initializeFramebuffers();
    }

    initializeFramebuffers() {
        this.sketchFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.preEffectPrevFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.preEffectNextFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.postEffectPrevFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.postEffectNextFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
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
            } else {
                this.grid._resizeGrid();
            }

            this.edgeRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
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

        // Select renderer based on renderMode
        if (this.asciiOptions.enabled) {
            if (this.asciiOptions.renderMode === 'accurate') {
                this.accurateRenderer.render(asciiOutput);
                asciiOutput = this.accurateRenderer.getOutputFramebuffer();
            } else { // Default to brightness
                this.brightnessRenderer.render(asciiOutput);
                asciiOutput = this.brightnessRenderer.getOutputFramebuffer();
            }
        }

        if (this.edgeOptions.enabled) {
            this.edgeRenderer.render(this.preEffectNextFramebuffer, this.asciiOptions.enabled);
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
    setDefaultOptions(asciiOptions, edgeOptions, commonOptions) {

        // The parameters are pre-processed, so we can just spread them into the class variables
        this.asciiOptions = {
            ...this.asciiOptions,
            ...asciiOptions
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

        this.brightnessRenderer.updateOptions(asciiOptions);
        this.edgeRenderer.updateOptions(edgeOptions);
        this.accurateRenderer.updateOptions(asciiOptions);

        if (asciiOptions?.characters) {
            this.asciiCharacterSet.setCharacterSet(asciiOptions.characters);
        }

        if (edgeOptions?.characters) {
            this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
        }

        if (commonOptions?.fontSize) {
            this.asciiCharacterSet.setFontSize(commonOptions.fontSize);
            this.edgeCharacterSet.setFontSize(commonOptions.fontSize);
            this.grid.resizeCellPixelDimensions(this.asciiCharacterSet.maxGlyphDimensions.width, this.asciiCharacterSet.maxGlyphDimensions.height);

            this.edgeRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
        }

        if (asciiOptions?.renderMode) {
            this.edgeRenderer.setAsciiRenderer(asciiOptions.renderMode === 'brightness' ? this.brightnessRenderer : this.accurateRenderer);
        }

        if (commonOptions?.gridDimensions) {
            if (commonOptions.gridDimensions[0] === 0 || commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
            } else {
                this.grid.resizeCellDimensions(commonOptions.gridDimensions[0], commonOptions.gridDimensions[1]);
            }
            this.edgeRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
        }
    }
}

export default P5Asciify;