import P5AsciifyEffectManager from './managers/effectmanager.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';
import P5AsciifyColorPaletteManager from './managers/colorpalettemanager.js';

import P5AsciifyGradientManager from './managers/gradientmanager.js';

import BrightnessAsciiRenderer from './renderers/layer1/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import EdgeAsciiRenderer from './renderers/layer3/edgeAsciiRenderer/EdgeAsciiRenderer.js';
import AccurateAsciiRenderer from './renderers/layer1/accurateAsciiRenderer/AccurateAsciiRenderer.js';
import GradientAsciiRenderer from './renderers/layer2/gradientAsciiRenderer/GradientAsciiRenderer.js';
import CustomAsciiRenderer from './renderers/layer1/customAsciiRenderer/CustomAsciiRenderer.js';

import CubeAsciiRenderer3D from './renderers/layer4/cubeAsciiRenderer3D/CubeAsciiRenderer3D.js';

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

    asciiOptions = { // brightness and accurate options are the same, since only one of them can be enabled at a time
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

    colorPaletteManager = new P5AsciifyColorPaletteManager();
    customColorPaletteManager = new P5AsciifyColorPaletteManager();

    gradientManager = new P5AsciifyGradientManager(this.colorPaletteManager);

    preEffectManager = new P5AsciifyEffectManager(this.colorPaletteManager);
    afterEffectManager = new P5AsciifyEffectManager(this.colorPaletteManager);

    customPrimaryColorSampleFramebuffer = null;
    customSecondaryColorSampleFramebuffer = null;
    customAsciiCharacterFramebuffer = null;

    postSetupFunction = null;

    instance(p) {
        this.p5Instance = p;

        this.p5Instance.preload = () => { }; // Define a default preload function in case the user doesn't provide one
    }

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    setup() {
        this.p5Instance.pixelDensity(1);

        // In case the user didn't update in p5.js setup() function, we need to convert the color strings to p5.Color objects
        this.asciiOptions.characterColor = this.p5Instance.color(this.asciiOptions.characterColor);
        this.asciiOptions.backgroundColor = this.p5Instance.color(this.asciiOptions.backgroundColor);

        this.edgeOptions.characterColor = this.p5Instance.color(this.edgeOptions.characterColor);
        this.edgeOptions.backgroundColor = this.p5Instance.color(this.edgeOptions.backgroundColor);

        this.gradientOptions.characterColor = this.p5Instance.color(this.gradientOptions.characterColor);
        this.gradientOptions.backgroundColor = this.p5Instance.color(this.gradientOptions.backgroundColor);

        this.asciiCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, type: "ascii", font: this.font, characters: this.asciiOptions.characters, fontSize: this.commonOptions.fontSize });
        this.gradientCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, type: "gradient", font: this.font, characters: "", fontSize: this.commonOptions.fontSize });
        this.edgeCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

        this.grid = new P5AsciifyGrid(this.p5Instance, this.asciiCharacterSet.maxGlyphDimensions.width, this.asciiCharacterSet.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.colorPaletteManager.setup(this.p5Instance);
        this.customColorPaletteManager.setup(this.p5Instance);

        this.gradientManager.setup(this.gradientCharacterSet);

        this.preEffectManager.setup();
        this.afterEffectManager.setup();

        this.customPrimaryColorSampleFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.customSecondaryColorSampleFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.customAsciiCharacterFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

        this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.customAsciiRenderer = new CustomAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.customPrimaryColorSampleFramebuffer, this.customSecondaryColorSampleFramebuffer, this.customAsciiCharacterFramebuffer, this.asciiOptions);

        this.gradientRenderer = new GradientAsciiRenderer(this.p5Instance, this.grid, this.gradientCharacterSet, this.gradientManager, this.gradientOptions);

        this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeOptions);

        this.cubeAsciiRenderer3D = new CubeAsciiRenderer3D(this.p5Instance, this.grid, this.asciiCharacterSet, this.edgeRenderer, this.asciiOptions);

        this.asciiFramebufferDimensions = { width: this.p5Instance.width, height: this.p5Instance.height };

        this.sketchFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

        if (this.postSetupFunction) {
            this.postSetupFunction();
        }
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
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    asciify() {
        this.preEffectManager.render(this.sketchFramebuffer);

        let asciiOutput = this.preEffectManager.nextFramebuffer;

        let renderer;
        if (this.asciiOptions.renderMode === 'brightness') {
            renderer = this.brightnessRenderer;
        } else if (this.asciiOptions.renderMode === 'accurate') {
            renderer = this.accurateRenderer;
        } else if (this.asciiOptions.renderMode === 'custom') {
            renderer = this.customAsciiRenderer;
        }
        renderer.render(this.preEffectManager.nextFramebuffer);
        asciiOutput = renderer.getOutputFramebuffer();

        this.gradientRenderer.render(this.preEffectManager.nextFramebuffer, renderer);
        asciiOutput = this.gradientRenderer.getOutputFramebuffer();

        this.edgeRenderer.render(this.preEffectManager.nextFramebuffer, this.gradientRenderer);
        asciiOutput = this.edgeRenderer.getOutputFramebuffer();

        //this.cubeAsciiRenderer3D.render();
        //asciiOutput = this.cubeAsciiRenderer3D.getOutputFramebuffer();

        this.afterEffectManager.render(asciiOutput);

        this.p5Instance.clear();
        this.p5Instance.image(this.afterEffectManager.nextFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);

        // Draw the framerate in the bottom left corner
        this.p5Instance.push();
        const fpsText = `FPS:~${Math.ceil(Math.min(this.p5Instance.frameRate(), 60))}`;
        const padding = 5;
        const textX = -this.p5Instance.width / 2 + 10;
        const textY = this.p5Instance.height / 2 - 20;

        // Set text properties first to calculate width
        this.p5Instance.textFont(this.font);
        this.p5Instance.textSize(16);
        const textW = this.p5Instance.textWidth(fpsText);
        const textH = 16; // Approximate height based on textSize

        // Draw background rectangle
        this.p5Instance.fill(0);
        this.p5Instance.noStroke();
        this.p5Instance.rect(textX - padding,
            textY - textH - padding,
            textW + padding * 2,
            textH + padding * 2);

        // Draw text
        this.p5Instance.fill(255, 255, 0);
        this.p5Instance.textAlign(this.p5Instance.LEFT, this.p5Instance.BOTTOM);
        this.p5Instance.text(fpsText, textX, textY);
        this.p5Instance.pop();

        this.checkFramebufferDimensions();
    }

    /**
     * Sets the default options for the P5Asciify library.
     * @param {object} options 
     */
    setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions) {

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

        // If we are still in the users setup(), the characterset and grid have not been initialized yet.
        if (this.p5Instance.frameCount == 0) {
            return;
        }

        this.brightnessRenderer.updateOptions(asciiOptions);
        this.edgeRenderer.updateOptions(edgeOptions);
        this.accurateRenderer.updateOptions(asciiOptions);

        if (asciiOptions?.characters) {
            this.asciiCharacterSet.setCharacterSet(asciiOptions.characters);
            this.accurateRenderer.resetShaders();
        }

        if (edgeOptions?.characters) {
            this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
        }

        if (commonOptions?.fontSize) {
            this.asciiCharacterSet.setFontSize(commonOptions.fontSize);
            this.edgeCharacterSet.setFontSize(commonOptions.fontSize);
            this.grid.resizeCellPixelDimensions(this.asciiCharacterSet.maxGlyphDimensions.width, this.asciiCharacterSet.maxGlyphDimensions.height);

            this.brightnessRenderer.resizeFramebuffers();
            this.edgeRenderer.resizeFramebuffers();
            this.customAsciiRenderer.resizeFramebuffers();
            this.accurateRenderer.resizeFramebuffers();
            this.gradientRenderer.resizeFramebuffers();

            this.edgeRenderer.resetShaders();
            this.accurateRenderer.resetShaders();
        }

        if (asciiOptions?.renderMode) {
            this.gradientRenderer.setAsciiRenderer(asciiOptions.renderMode === 'brightness' ? this.brightnessRenderer : this.accurateRenderer);
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