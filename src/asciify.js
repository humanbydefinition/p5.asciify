import P5AsciifyEffectManager from './managers/effectmanager.js';
import P5AsciifyFontTextureAtlas from './fontTextureAtlas.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';

import P5AsciifyGradientManager from './managers/gradientmanager.js';

import BrightnessAsciiRenderer from './renderers/layer1/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import AccurateAsciiRenderer from './renderers/layer1/accurateAsciiRenderer/AccurateAsciiRenderer.js';
import CustomAsciiRenderer from './renderers/layer1/customAsciiRenderer/CustomAsciiRenderer.js';

import GradientAsciiRenderer from './renderers/layer2/gradientAsciiRenderer/GradientAsciiRenderer.js';

import EdgeAsciiRenderer from './renderers/layer3/edgeAsciiRenderer/EdgeAsciiRenderer.js';

import CubeAsciiRenderer3D from './renderers/layer4/cubeAsciiRenderer3D/CubeAsciiRenderer3D.js';

import P5AsciifyUtils from './utils.js';

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

    gradientManager = new P5AsciifyGradientManager();

    preEffectManager = new P5AsciifyEffectManager();
    afterEffectManager = new P5AsciifyEffectManager();

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

        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas({ p5Instance: this.p5Instance, font: this.font, fontSize: this.commonOptions.fontSize });

        this.asciiCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, asciiFontTextureAtlas: this.asciiFontTextureAtlas, characters: this.asciiOptions.characters });
        this.edgeCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, asciiFontTextureAtlas: this.asciiFontTextureAtlas, characters: this.edgeOptions.characters });

        this.grid = new P5AsciifyGrid(this.p5Instance, this.asciiFontTextureAtlas.maxGlyphDimensions.width, this.asciiFontTextureAtlas.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.gradientManager.setup(this.asciiCharacterSet);

        this.preEffectManager.setup();
        this.afterEffectManager.setup();

        this.customPrimaryColorSampleFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.customSecondaryColorSampleFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.customAsciiCharacterFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

        this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
        this.customAsciiRenderer = new CustomAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.customPrimaryColorSampleFramebuffer, this.customSecondaryColorSampleFramebuffer, this.customAsciiCharacterFramebuffer, this.asciiOptions);

        this.gradientRenderer = new GradientAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.gradientManager, this.gradientOptions);

        this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeOptions);

        this.cubeAsciiRenderer3D = new CubeAsciiRenderer3D(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeRenderer, this.asciiOptions);

        this.asciiRenderer = this.brightnessRenderer;
        if (this.asciiOptions.renderMode === 'accurate') {
            this.asciiRenderer = this.accurateRenderer;
        } else if (this.asciiOptions.renderMode === 'custom') {
            this.asciiRenderer = this.customAsciiRenderer;
        }

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

        this.asciiRenderer.render(this.preEffectManager.nextFramebuffer);
        asciiOutput = this.asciiRenderer.getOutputFramebuffer();

        this.gradientRenderer.render(this.preEffectManager.nextFramebuffer, this.asciiRenderer);
        asciiOutput = this.gradientRenderer.getOutputFramebuffer();

        this.edgeRenderer.render(this.preEffectManager.nextFramebuffer, this.gradientRenderer);
        asciiOutput = this.edgeRenderer.getOutputFramebuffer();

        //this.cubeAsciiRenderer3D.render();
        //asciiOutput = this.cubeAsciiRenderer3D.getOutputFramebuffer();

        this.afterEffectManager.render(asciiOutput);

        this.p5Instance.clear();
        this.p5Instance.image(this.afterEffectManager.nextFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);

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
        this.accurateRenderer.updateOptions(asciiOptions);
        this.customAsciiRenderer.updateOptions(asciiOptions);
        this.gradientRenderer.updateOptions(gradientOptions);
        this.edgeRenderer.updateOptions(edgeOptions);


        if (asciiOptions?.renderMode) {
            if (asciiOptions.renderMode === 'accurate') {
                this.asciiRenderer = this.accurateRenderer;
            } else if (asciiOptions.renderMode === 'custom') {
                this.asciiRenderer = this.customAsciiRenderer;
            } else {
                this.asciiRenderer = this.brightnessRenderer;
            }
        }

        if (asciiOptions?.characters) {
            this.asciiCharacterSet.setCharacterSet(asciiOptions.characters);
            this.accurateRenderer.resetShaders();
        }

        if (edgeOptions?.characters) {
            this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
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

    outputAsciiToHtml() {
        // Load pixel data from the framebuffers
        this.edgeRenderer.asciiCharacterFramebuffer.loadPixels();
        this.edgeRenderer.primaryColorSampleFramebuffer.loadPixels();
        this.edgeRenderer.secondaryColorSampleFramebuffer.loadPixels();

        const w = this.grid.cols;
        const h = this.grid.rows;
        const asciiPixels = this.edgeRenderer.asciiCharacterFramebuffer.pixels;
        const primaryPixels = this.edgeRenderer.primaryColorSampleFramebuffer.pixels;
        const secondaryPixels = this.edgeRenderer.secondaryColorSampleFramebuffer.pixels;

        const chars = this.asciiFontTextureAtlas.characters; // Array of characters

        // Define the CSS styles
        const styles = `
            @font-face {
                font-family: 'C64ProMono';
                src: url('C64_Pro_Mono-STYLE.otf') format('opentype');
            }
    
            body {
                font-family: 'C64ProMono', monospace;
                font-size: ${this.commonOptions.fontSize}px;
                margin: 0;
                padding: 0;
                background-color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
            }
        `;

        // Initialize the HTML with the DOCTYPE, html tag, and head section
        let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>ASCII Art</title>
        <style>
            ${styles}
        </style>
    </head>
    <body>
        <div>
    `;

        // Iterate through each row and column to build the ASCII art
        for (let y = 0; y < h; y++) {
            let row = '';
            for (let x = 0; x < w; x++) {
                const idx = 4 * (x + y * w);

                // Get the character index from asciiCharacterFramebuffer
                const r = asciiPixels[idx];
                const g = asciiPixels[idx + 1];
                let bestCharIndex = r + g * 256;
                if (bestCharIndex >= chars.length) bestCharIndex = chars.length - 1;
                const ch = chars[bestCharIndex];

                // Get the primary color (character color)
                const pr = primaryPixels[idx];
                const pg = primaryPixels[idx + 1];
                const pb = primaryPixels[idx + 2];

                // Get the secondary color (background color)
                const sr = secondaryPixels[idx];
                const sg = secondaryPixels[idx + 1];
                const sb = secondaryPixels[idx + 2];

                // Build the HTML span with direct RGB values
                row += `<span style="color: rgb(${pr}, ${pg}, ${pb}); background-color: rgb(${sr}, ${sg}, ${sb});">${ch}</span>`;
            }
            html += row + '\n';
        }

        // Close the div, body, and html tags
        html += `
        </div>
    </body>
    </html>
    `;

        // Output the complete HTML
        console.log(html);
    }


}

export default P5Asciify;