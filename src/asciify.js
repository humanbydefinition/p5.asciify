import P5AsciifyFontTextureAtlas from './fontTextureAtlas.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';

import P5AsciifyEventEmitter from './eventemitter.js';

import P5AsciifyGradientManager from './managers/gradientmanager.js';

import BrightnessAsciiRenderer from './renderers/layer1/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import AccurateAsciiRenderer from './renderers/layer1/accurateAsciiRenderer/AccurateAsciiRenderer.js';
import CustomAsciiRenderer from './renderers/layer4/customAsciiRenderer/CustomAsciiRenderer.js';

import GradientAsciiRenderer from './renderers/layer2/gradientAsciiRenderer/GradientAsciiRenderer.js';

import EdgeAsciiRenderer from './renderers/layer3/edgeAsciiRenderer/EdgeAsciiRenderer.js';

import TextAsciiRenderer from './renderers/layer5/textAsciiRenderer/TextAsciiRenderer.js';

/**
 * @class P5Asciify
 * @description
 * The main class for the P5Asciify library, responsible for setting up and running the rendering pipeline.
 */
class P5Asciify {

    commonOptions = {
        fontSize: 16,
        gridDimensions: [0, 0],
        borderColor: "#000000",
    };

    asciiOptions = {
        renderMode: 'brightness',
        enabled: true,
        characters: "0123456789",
        characterColor: "#FFFFFF",
        characterColorMode: 0,
        backgroundColor: "#000000",
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
    };

    gradientOptions = {
        enabled: true,
        characterColor: "#FFFFFF",
        characterColorMode: 0,
        backgroundColor: "#000000",
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
    }

    edgeOptions = {
        enabled: false,
        characters: "-/|\\-/|\\",
        characterColor: "#FFFFFF",
        characterColorMode: 0,
        backgroundColor: "#000000",
        backgroundColorMode: 1,
        invertMode: false,
        sobelThreshold: 0.5,
        sampleThreshold: 16,
        rotationAngle: 0,
    };

    customOptions = {
        enabled: false,
    }

    textOptions = {
        enabled: false,
        characterColor: "#FFFFFF",
        characterColorMode: 0,
        backgroundColor: "#000000",
        backgroundColorMode: 1,
        invertMode: false,
    }

    gradientManager = new P5AsciifyGradientManager();

    postSetupFunction = null;
    postDrawFunction = null;

    instance(p) {
        this.p5Instance = p;

        this.p5Instance.preload = () => { }; // Define a default preload function in case the user doesn't provide one
    }

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    setup() {
        // In case the user didn't update in p5.js setup() function, we need to convert the color strings to p5.Color objects
        this.asciiOptions.characterColor = this.p5Instance.color(this.asciiOptions.characterColor);
        this.asciiOptions.backgroundColor = this.p5Instance.color(this.asciiOptions.backgroundColor);

        this.edgeOptions.characterColor = this.p5Instance.color(this.edgeOptions.characterColor);
        this.edgeOptions.backgroundColor = this.p5Instance.color(this.edgeOptions.backgroundColor);

        this.gradientOptions.characterColor = this.p5Instance.color(this.gradientOptions.characterColor);
        this.gradientOptions.backgroundColor = this.p5Instance.color(this.gradientOptions.backgroundColor);

        this.commonOptions.borderColor = this.p5Instance.color(this.commonOptions.borderColor);

        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas({ p5Instance: this.p5Instance, font: this.font, fontSize: this.commonOptions.fontSize });

        this.asciiCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, asciiFontTextureAtlas: this.asciiFontTextureAtlas, characters: this.asciiOptions.characters });
        this.edgeCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, asciiFontTextureAtlas: this.asciiFontTextureAtlas, characters: this.edgeOptions.characters });

        this.grid = new P5AsciifyGrid(this.p5Instance, this.asciiFontTextureAtlas.maxGlyphDimensions.width, this.asciiFontTextureAtlas.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.gradientManager.setup(this.asciiCharacterSet);

        this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.customAsciiRenderer = new CustomAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.customOptions);

        this.gradientRenderer = new GradientAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.gradientManager, this.gradientOptions);

        this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeOptions);

        this.textAsciiRenderer = new TextAsciiRenderer(this.p5Instance, this.asciiFontTextureAtlas, this.grid, this.fontBase64, this.fontFileType, this.textOptions);

        this.asciiRenderer = this.brightnessRenderer;
        if (this.asciiOptions.renderMode === 'accurate') {
            this.asciiRenderer = this.accurateRenderer;
        }

        this.renderingSteps = [
            {
                enabled: () => this.asciiOptions.enabled,
                renderer: () => this.asciiRenderer
            },
            {
                enabled: () => this.gradientOptions.enabled && this.gradientManager._gradients.length > 0,
                renderer: () => this.gradientRenderer
            },
            {
                enabled: () => this.edgeOptions.enabled,
                renderer: () => this.edgeRenderer
            },
            {
                enabled: () => this.customOptions.enabled,
                renderer: () => this.customAsciiRenderer
            }
        ];

        this.asciiFramebufferDimensions = { width: this.p5Instance.width, height: this.p5Instance.height };

        this.events = new P5AsciifyEventEmitter();

        this.sketchFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

        if (this.postSetupFunction) {
            this.postSetupFunction();
        }
    }

    emit(eventName, data) {
        this.events.emit(eventName, data);
    }

    on(eventName, callback) {
        this.events.on(eventName, callback);
    }

    off(eventName, callback) {
        this.events.off(eventName, callback);
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

            this.brightnessRenderer.resizeFramebuffers();
            this.edgeRenderer.resizeFramebuffers();
            this.customAsciiRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
            this.gradientRenderer.resizeFramebuffers();
            this.textAsciiRenderer.updateDimensions();
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    asciify() {
        // Initialize with base framebuffer
        let asciiOutput = this.sketchFramebuffer;
        let currentRenderer = this.asciiRenderer;

        // Execute each rendering step in sequence
        for (const step of this.renderingSteps) {
            if (step.enabled()) {
                const renderer = step.renderer();
                renderer.render(this.sketchFramebuffer, currentRenderer);
                asciiOutput = renderer.getOutputFramebuffer();
                currentRenderer = renderer;
            }
        }

        // Draw the final output
        this.p5Instance.clear();
        this.p5Instance.background(this.commonOptions.borderColor);
        this.p5Instance.image(asciiOutput, -this.p5Instance.width / 2, -this.p5Instance.height / 2);

        // Handle text rendering separately as it outputs to HTML
        if (this.textOptions.enabled) {
            this.textAsciiRenderer.outputAsciiToHtml(currentRenderer);
        }

        if (this.postDrawFunction) {
            this.postDrawFunction();
        }

        this.checkFramebufferDimensions();
    }

    /**
     * Sets the default options for the P5Asciify library.
     * @param {object} options 
     */
    setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions, customOptions, textOptions) {;

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

        this.gradientOptions = {
            ...this.gradientOptions,
            ...gradientOptions
        };

        this.customOptions = {
            ...this.customOptions,
            ...customOptions
        };

        this.textOptions = {
            ...this.textOptions,
            ...textOptions
        };

        // If we are still in the users setup(), the characterset and grid have not been initialized yet.
        if (!this.p5Instance._setupDone) {
            return;
        }

        this.brightnessRenderer.updateOptions(asciiOptions);
        this.accurateRenderer.updateOptions(asciiOptions);
        this.customAsciiRenderer.updateOptions(asciiOptions);
        this.gradientRenderer.updateOptions(gradientOptions);
        this.edgeRenderer.updateOptions(edgeOptions);
        this.textAsciiRenderer.updateOptions(textOptions);

        if (asciiOptions?.renderMode) {
            if (asciiOptions.renderMode === 'accurate') {
                this.asciiRenderer = this.accurateRenderer;
            } else {
                this.asciiRenderer = this.brightnessRenderer;
            }
        }

        if (asciiOptions?.characters) {
            this.asciiCharacterSet.setCharacterSet(asciiOptions.characters);
            this.accurateRenderer.resetShaders();
        }

        if (edgeOptions?.hasOwnProperty('characters')) {
            this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
        }

        if (textOptions?.hasOwnProperty('characterColorMode')) {
            this.textAsciiRenderer.updateCharacterColorMode();
        }

        if (textOptions?.hasOwnProperty('characterColor')) {
            this.textAsciiRenderer.updateCharacterColor();
        }

        if (textOptions?.hasOwnProperty('backgroundColor')) {
            this.textAsciiRenderer.updateBackgroundColor();
        }

        if (textOptions?.hasOwnProperty('invertMode')) {
            this.textAsciiRenderer.updateInvertMode();
        }

        if (textOptions?.hasOwnProperty('enabled')) {
            this.textAsciiRenderer.toggleVisibility();
        }

        if (commonOptions?.fontSize) {
            this.asciiFontTextureAtlas.setFontSize(commonOptions.fontSize);
            this.grid.resizeCellPixelDimensions(this.asciiFontTextureAtlas.maxGlyphDimensions.width, this.asciiFontTextureAtlas.maxGlyphDimensions.height);

            this.brightnessRenderer.resizeFramebuffers();
            this.edgeRenderer.resizeFramebuffers();
            this.customAsciiRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
            this.gradientRenderer.resizeFramebuffers();

            this.edgeRenderer.resetShaders();
            this.accurateRenderer.resetShaders();

            this.textAsciiRenderer.updateFontSize();
        }

        if (commonOptions?.gridDimensions) {
            if (commonOptions.gridDimensions[0] === 0 || commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
            } else {
                this.grid.resizeCellDimensions(commonOptions.gridDimensions[0], commonOptions.gridDimensions[1]);
            }
            this.brightnessRenderer.resizeFramebuffers();
            this.edgeRenderer.resizeFramebuffers();
            this.customAsciiRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
            this.gradientRenderer.resizeFramebuffers();
        }
    }
}

export default P5Asciify;