import P5AsciifyEffectManager from './managers/effectmanager.js';
import P5AsciifyCharacterSet from './characterset.js';
import P5AsciifyGrid from './grid.js';
import P5AsciifyColorPalette from './colorpalette.js';

import vertexShader from './shaders/vert/shader.vert';
import asciiShader from './shaders/frag/ascii.frag';
import sobelShader from './shaders/frag/sobel.frag';
import sampleShader from './shaders/frag/sample.frag';

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

    asciiShader = null;
    asciiBrightnessFramebuffer = null;
    asciiEdgeFramebuffer = null;
    asciiFramebufferDimensions = { width: 0, height: 0 };

    sobelShader = null;
    sobelFramebuffer = null;

    sampleShader = null;
    sampleFramebuffer = null;

    font = null;
    brightnessCharacterSet = new P5AsciifyCharacterSet();
    edgeCharacterSet = new P5AsciifyCharacterSet();
    grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    instanceMode = false;

    p5Canvas = null;

    p5Instance = null;

    instance(p) {
        this.p5Instance = p;

        this.instanceMode = true;

        console.log("Setting up P5Asciify library with P5 instance: ", this.p5Instance);
    }

    load() {
        console.log("Loading P5Asciify library...");
    }

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    setup() {
        this.p5Instance.pixelDensity(1);

        this.sketchFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        console.log("this.font: ", this.font);

        this.brightnessCharacterSet.setup({ p5Instance: this.p5Instance, type: "brightness", font: this.font, characters: this.brightnessOptions.characters, fontSize: this.commonOptions.fontSize });
        this.edgeCharacterSet.setup({ p5Instance: this.p5Instance, type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

        this.grid.setup(this.p5Instance);

        this.grid.resizeCellPixelDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.colorPalette.setup(this.p5Instance);

        this.preEffectManager.setup(this.p5Instance);
        this.afterEffectManager.setup(this.p5Instance);

        this.preEffectPrevFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });
        this.preEffectNextFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.postEffectPrevFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });
        this.postEffectNextFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.asciiShader = this.p5Instance.createShader(vertexShader, asciiShader);
        this.asciiBrightnessFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });
        this.asciiEdgeFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.sobelShader = this.p5Instance.createShader(vertexShader, sobelShader);
        this.sobelFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT });

        this.sampleShader = this.p5Instance.createShader(vertexShader, sampleShader);
        this.sampleFramebuffer = this.p5Instance.createFramebuffer({ format: this.p5Instance.FLOAT, width: this.grid.cols, height: this.grid.rows });

        this.asciiFramebufferDimensions = { width: this.asciiBrightnessFramebuffer.width, height: this.asciiBrightnessFramebuffer.height };
    }

    /**
     * Checks if the dimensions of the ASCII framebuffer have changed and resets the grid if necessary.
     * This function is called every frame after the user's draw() function, 
     * since I am not aware of a better way to do this since there is no hook for when the canvas is resized.
     */
    checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiBrightnessFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiBrightnessFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiBrightnessFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiBrightnessFramebuffer.height;

            if (this.commonOptions.gridDimensions[0] === 0 || this.commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
                this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
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
                effect.setUniforms(this.preEffectPrevFramebuffer);
                this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
                this.preEffectNextFramebuffer.end();
            }
        }

        if (this.brightnessOptions.enabled) {
            this.asciiBrightnessFramebuffer.begin();
            this.p5Instance.shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.brightnessCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.brightnessCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.brightnessCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.brightnessCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectNextFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.brightnessOptions.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.brightnessOptions.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.brightnessOptions.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.brightnessOptions.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.brightnessOptions.invertMode);
            this.asciiShader.setUniform('u_renderMode', 0);
            this.asciiShader.setUniform('u_brightnessEnabled', this.brightnessOptions.enabled);
            this.asciiShader.setUniform('u_rotationAngle', this.p5Instance.radians(this.brightnessOptions.rotationAngle));
            this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
            this.asciiBrightnessFramebuffer.end();
        }

        if (this.edgeOptions.enabled) {
            this.sobelFramebuffer.begin();
            this.p5Instance.shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', this.preEffectNextFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [this.p5Instance.width, this.p5Instance.height]);
            this.sobelShader.setUniform('u_threshold', this.edgeOptions.sobelThreshold);
            this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
            this.sobelFramebuffer.end();

            this.sampleFramebuffer.begin();
            this.p5Instance.shader(this.sampleShader);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.edgeOptions.sampleThreshold);
            this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
            this.sampleFramebuffer.end();

            this.asciiEdgeFramebuffer.begin();
            this.p5Instance.shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.edgeCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.edgeCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.edgeCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.edgeCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectNextFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiBrightnessFramebuffer);
            this.asciiShader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.edgeOptions.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.edgeOptions.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.edgeOptions.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.edgeOptions.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.edgeOptions.invertMode);
            this.asciiShader.setUniform('u_renderMode', 1);
            this.asciiShader.setUniform('u_brightnessEnabled', this.brightnessOptions.enabled);
            this.asciiShader.setUniform('u_rotationAngle', this.p5Instance.radians(this.edgeOptions.rotationAngle));
            this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
            this.asciiEdgeFramebuffer.end();
        }

        this.postEffectNextFramebuffer.begin();
        this.p5Instance.clear(); // do not remove this, even though it's tempting
        if (this.edgeOptions.enabled) {
            this.p5Instance.image(this.asciiEdgeFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        } else if (this.brightnessOptions.enabled) {
            this.p5Instance.image(this.asciiBrightnessFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        } else {
            this.p5Instance.image(this.preEffectNextFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        }
        this.postEffectNextFramebuffer.end();

        this.postEffectPrevFramebuffer.begin();
        this.p5Instance.clear(); // do not remove this, even though it's tempting
        if (this.edgeOptions.enabled) {
            this.p5Instance.image(this.asciiEdgeFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        } else if (this.brightnessOptions.enabled) {
            this.p5Instance.image(this.asciiBrightnessFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        } else {
            this.p5Instance.image(this.preEffectNextFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
        }
        this.postEffectPrevFramebuffer.end();

        for (const effect of this.afterEffectManager._effects) {
            if (effect.enabled) {
                [this.postEffectPrevFramebuffer, this.postEffectNextFramebuffer] = [this.postEffectNextFramebuffer, this.postEffectPrevFramebuffer];
                this.postEffectNextFramebuffer.begin();
                this.p5Instance.shader(effect.shader);
                effect.setUniforms(this.postEffectPrevFramebuffer);
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
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        if (commonOptions?.gridDimensions) {
            if (commonOptions.gridDimensions[0] === 0 || commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
            } else {
                this.grid.resizeCellDimensions(commonOptions.gridDimensions[0], commonOptions.gridDimensions[1]);
            }
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }
}

export default P5Asciify;