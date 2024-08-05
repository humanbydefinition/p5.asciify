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

    static commonOptions = {
        fontSize: 16,
    };

    static brightnessOptions = {
        enabled: true,
        characters: "0123456789",
        characterColor: [1.0, 1.0, 1.0],
        characterColorMode: 0,
        backgroundColor: [0.0, 0.0, 0.0],
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
    };

    static edgeOptions = {
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

    static colorPalette = new P5AsciifyColorPalette();

    static preEffectManager = new P5AsciifyEffectManager(this.colorPalette);

    static afterEffectManager = new P5AsciifyEffectManager(this.colorPalette);

    static sketchFramebuffer = null;

    static preEffectPrevFramebuffer = null;
    static preEffectNextFramebuffer = null;

    static postEffectPrevFramebuffer = null;
    static postEffectNextFramebuffer = null;

    static asciiShader = null;
    static asciiBrightnessFramebuffer = null;
    static asciiEdgeFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static sobelShader = null;
    static sobelFramebuffer = null;

    static sampleShader = null;
    static sampleFramebuffer = null;

    static font = null;
    static brightnessCharacterSet = new P5AsciifyCharacterSet();
    static edgeCharacterSet = new P5AsciifyCharacterSet();
    static grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    static p5Canvas = null;

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    static setup() {
        pixelDensity(1);

        this.sketchFramebuffer = createFramebuffer({ format: FLOAT });

        this.brightnessCharacterSet.setup({ type: "brightness", font: this.font, characters: this.brightnessOptions.characters, fontSize: this.commonOptions.fontSize });
        this.edgeCharacterSet.setup({ type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

        this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        this.colorPalette.setup();

        this.preEffectManager.setup();
        this.afterEffectManager.setup();

        this.preEffectPrevFramebuffer = createFramebuffer({ format: FLOAT });
        this.preEffectNextFramebuffer = createFramebuffer({ format: FLOAT });

        this.postEffectPrevFramebuffer = createFramebuffer({ format: FLOAT });
        this.postEffectNextFramebuffer = createFramebuffer({ format: FLOAT });

        this.grayscaleShader = this.preEffectManager.effectShaders["grayscale"];

        this.asciiShader = createShader(vertexShader, asciiShader);
        this.asciiBrightnessFramebuffer = createFramebuffer({ format: this.FLOAT });
        this.asciiEdgeFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sobelShader = createShader(vertexShader, sobelShader);
        this.sobelFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sampleShader = createShader(vertexShader, sampleShader);
        this.sampleFramebuffer = createFramebuffer({ format: this.FLOAT, width: this.grid.cols, height: this.grid.rows });

        this.asciiFramebufferDimensions = { width: this.asciiBrightnessFramebuffer.width, height: this.asciiBrightnessFramebuffer.height };
    }

    /**
     * Checks if the dimensions of the ASCII framebuffer have changed and resets the grid if necessary.
     * This function is called every frame after the user's draw() function, 
     * since I am not aware of a better way to do this since there is no hook for when the canvas is resized.
     */
    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiBrightnessFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiBrightnessFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiBrightnessFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiBrightnessFramebuffer.height;

            this.grid.reset();
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    static asciify() {
        this.preEffectNextFramebuffer.begin();
        clear(); // do not remove this, even though it's tempting
        image(this.sketchFramebuffer, -width / 2, -height / 2);
        this.preEffectNextFramebuffer.end();

        for (const effect of this.preEffectManager._effects) {
            [this.preEffectPrevFramebuffer, this.preEffectNextFramebuffer] = [this.preEffectNextFramebuffer, this.preEffectPrevFramebuffer];
            if (effect.enabled) {
                this.preEffectNextFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.preEffectPrevFramebuffer);
                rect(0, 0, width, height);
                this.preEffectNextFramebuffer.end();
            }
        }

        if (this.brightnessOptions.enabled) {
            this.asciiBrightnessFramebuffer.begin();
            shader(this.asciiShader);
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
            this.asciiShader.setUniform('u_rotationAngle', radians(this.brightnessOptions.rotationAngle));
            rect(0, 0, width, height);
            this.asciiBrightnessFramebuffer.end();
        }

        if (this.edgeOptions.enabled) {
            this.sobelFramebuffer.begin();
            shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', this.preEffectNextFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [width, height]);
            this.sobelShader.setUniform('u_threshold', this.edgeOptions.sobelThreshold);
            rect(0, 0, width, height);
            this.sobelFramebuffer.end();

            this.sampleFramebuffer.begin();
            shader(this.sampleShader);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.edgeOptions.sampleThreshold);
            rect(0, 0, width, height);
            this.sampleFramebuffer.end();

            this.asciiEdgeFramebuffer.begin();
            shader(this.asciiShader);
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
            this.asciiShader.setUniform('u_rotationAngle', radians(this.edgeOptions.rotationAngle));
            rect(0, 0, width, height);
            this.asciiEdgeFramebuffer.end();
        }

        this.postEffectNextFramebuffer.begin();
        clear(); // do not remove this, even though it's tempting
        if (this.edgeOptions.enabled) {
            image(this.asciiEdgeFramebuffer, -width / 2, -height / 2);
        } else if (this.brightnessOptions.enabled) {
            image(this.asciiBrightnessFramebuffer, -width / 2, -height / 2);
        } else {
            image(this.preEffectNextFramebuffer, -width / 2, -height / 2);
        }
        this.postEffectNextFramebuffer.end();

        for (const effect of this.afterEffectManager._effects) {
            [this.postEffectPrevFramebuffer, this.postEffectNextFramebuffer] = [this.postEffectNextFramebuffer, this.postEffectPrevFramebuffer];
            if (effect.enabled) {
                this.postEffectNextFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.postEffectPrevFramebuffer);
                rect(0, 0, width, height);
                this.postEffectNextFramebuffer.end();
            }
        }

        clear(); // do not remove this, even though it's tempting
        image(this.postEffectNextFramebuffer, -width / 2, -height / 2);
        this.checkFramebufferDimensions();
    }

    /**
     * Sets the default options for the P5Asciify library.
     * @param {object} options 
     */
    static setDefaultOptions(brightnessOptions, edgeOptions, commonOptions) {

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

        if (frameCount == 0) { // If we are still in the users setup(), the characterset and grid have not been initialized yet.
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
            this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }
}

export default P5Asciify;