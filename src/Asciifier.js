import P5AsciifyFontTextureAtlas from './fontTextureAtlas.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';

import P5AsciifyEventEmitter from './eventemitter.js';

import P5AsciifyGradientManager from './managers/gradientmanager.js';
import { RendererManager } from './managers/RendererManager';

import BrightnessAsciiRenderer from './renderers/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import AccurateAsciiRenderer from './renderers/accurateAsciiRenderer/AccurateAsciiRenderer.js';
import CustomAsciiRenderer from './renderers/customAsciiRenderer/CustomAsciiRenderer.js';
import GradientAsciiRenderer from './renderers/gradientAsciiRenderer/GradientAsciiRenderer.js';
import EdgeAsciiRenderer from './renderers/edgeAsciiRenderer/EdgeAsciiRenderer.js';
import TextAsciiRenderer from './renderers/textAsciiRenderer/TextAsciiRenderer.js';

import {
    COMMON_OPTIONS,
    ASCII_OPTIONS,
    GRADIENT_OPTIONS,
    EDGE_OPTIONS,
    CUSTOM_OPTIONS,
    TEXT_OPTIONS
} from './constants/defaults.js';


class Asciifier {

    commonOptions = { ...COMMON_OPTIONS };
    asciiOptions = { ...ASCII_OPTIONS };
    gradientOptions = { ...GRADIENT_OPTIONS };
    edgeOptions = { ...EDGE_OPTIONS };
    customOptions = { ...CUSTOM_OPTIONS };
    textOptions = { ...TEXT_OPTIONS };

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

        this.rendererManager = new RendererManager(this.p5Instance, this.grid, this.asciiFontTextureAtlas);

        this.gradientManager.setup(this.asciiCharacterSet);

        this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.customAsciiRenderer = new CustomAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.customOptions);

        this.gradientRenderer = new GradientAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.gradientManager, this.gradientOptions);

        this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeOptions);

        this.textAsciiRenderer = new TextAsciiRenderer(this.p5Instance, this.asciiFontTextureAtlas, this.grid, this.fontBase64, this.fontFileType, this.textOptions);

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

            this.grid.reset();

            this.textAsciiRenderer.updateDimensions();
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    asciify() {
        this.rendererManager.render(this.sketchFramebuffer);

        // Handle text rendering separately as it outputs to HTML
        if (this.textOptions.enabled) {
            this.textAsciiRenderer.outputAsciiToHtml(this.rendererManager.lastRenderer);
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
    setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions, customOptions, textOptions) {
        

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
    }
}

export default Asciifier;