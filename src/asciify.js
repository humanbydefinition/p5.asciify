class P5Asciify {
    static config = {
        common: {
            fontSize: 16,
        },
        brightnessAsciiShader: {
            enabled: true,
            characters: "0123456789",
            characterColor: [1.0, 1.0, 1.0],
            characterColorMode: 0,
            backgroundColor: [0.0, 0.0, 0.0],
            backgroundColorMode: 1,
            invertMode: false,
        },
        edgeAsciiShader: {
            enabled: true,
            characters: "-/|\\-/|\\",
            characterColor: [0.5, 0.5, 0.5],
            characterColorMode: 1,
            backgroundColor: [1.0, 1.0, 1.0],
            backgroundColorMode: 0,
            invertMode: true,
        }
    };

    static preEffectSetupQueue = [];
    static preEffectManager = new P5AsciifyEffectManager();

    static afterEffectSetupQueue = [];
    static afterEffectManager = new P5AsciifyEffectManager();

    static colorPalette = new P5AsciifyColorPalette();

    static preEffectFramebuffer = null;
    static postEffectFramebuffer = null;

    static asciiShader = null;
    static asciiBrightnessFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static sobelShader = null;
    static sobelFramebuffer = null;

    static sampleShader = null;
    static sampleFramebuffer = null;

    static asciiEdgeFramebuffer = null;

    static font = null;
    static brightnessCharacterSet = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static edgeCharacterSet = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    static setup() {
        this.brightnessCharacterSet.setup({ font: this.font, characters: this.config.brightnessAsciiShader.characters, fontSize: this.config.common.fontSize });
        this.edgeCharacterSet.setup({ font: this.font, characters: this.config.edgeAsciiShader.characters, fontSize: this.config.common.fontSize });
        this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        this.colorPalette.setup();

        this.preEffectManager.setupShaders();
        this.preEffectManager.setupEffectQueue();

        this.afterEffectManager.setupShaders();
        this.afterEffectManager.setupEffectQueue();

        this.preEffectFramebuffer = createFramebuffer({ format: FLOAT });
        this.postEffectFramebuffer = createFramebuffer({ format: FLOAT });

        this.asciiShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.ASCII_FRAG_SHADER_CODE);
        this.asciiBrightnessFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.asciiEdgeFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sobelShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.SOBEL_FRAG_SHADER_CODE);
        this.sobelFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sampleShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.SAMPLE_FRAG_SHADER_CODE);
        this.sampleFramebuffer = createFramebuffer({ format: this.FLOAT, width: this.grid.cols, height: this.grid.rows });

        this.asciiFramebufferDimensions = { width: this.asciiBrightnessFramebuffer.width, height: this.asciiBrightnessFramebuffer.height };

        pixelDensity(1);
    }

    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiBrightnessFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiBrightnessFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiBrightnessFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiBrightnessFramebuffer.height;

            this.grid.reset();
        }
    }

    static asciify() {

        this.preEffectFramebuffer.begin();
        clear();
        image(_renderer, -width / 2, -height / 2);
        this.preEffectFramebuffer.end();

        for (const effect of this.preEffectManager._effects) {
            if (effect.enabled) {
                this.preEffectFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.preEffectFramebuffer);
                rect(0, 0, width, height);
                this.preEffectFramebuffer.end();
            }
        }

        this.sobelFramebuffer.begin();
        shader(this.sobelShader);
        this.sobelShader.setUniform('u_texture', this.preEffectFramebuffer);
        this.sobelShader.setUniform('u_textureSize', [width, height]);
        this.sobelShader.setUniform('u_threshold', 0.01);
        rect(0, 0, width, height);
        this.sobelFramebuffer.end();

        this.sampleFramebuffer.begin();
        shader(this.sampleShader);
        this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
        this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.sampleShader.setUniform('u_threshold', 16);
        rect(0, 0, width, height);
        this.sampleFramebuffer.end();

        if (this.config.brightnessAsciiShader.enabled) {
            this.asciiBrightnessFramebuffer.begin();

            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.brightnessCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.brightnessCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.brightnessCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.brightnessCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.brightnessAsciiShader.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.brightnessAsciiShader.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.brightnessAsciiShader.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.brightnessAsciiShader.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.brightnessAsciiShader.invertMode);
            this.asciiShader.setUniform('u_renderMode', 0);
            rect(0, 0, width, height);

            this.asciiBrightnessFramebuffer.end();

            this.asciiEdgeFramebuffer.begin();

            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.edgeCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.edgeCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.edgeCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.edgeCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiBrightnessFramebuffer);
            this.asciiShader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.edgeAsciiShader.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.edgeAsciiShader.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.edgeAsciiShader.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.edgeAsciiShader.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.edgeAsciiShader.invertMode);
            this.asciiShader.setUniform('u_renderMode', 1);
            rect(0, 0, width, height);

            this.asciiEdgeFramebuffer.end();
        }

        this.postEffectFramebuffer.begin();
        clear();
        image(this.asciiEdgeFramebuffer, -width / 2, -height / 2);
        this.postEffectFramebuffer.end();

        for (const effect of this.afterEffectManager._effects) {
            if (effect.enabled) {
                this.postEffectFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.postEffectFramebuffer);
                rect(0, 0, width, height);
                this.postEffectFramebuffer.end();
            }
        }

        clear();
        image(this.postEffectFramebuffer, -width / 2, -height / 2);

        this.checkFramebufferDimensions();
    }

    static setDefaultOptions(options, warn = true) {

                // Define deprecated options
        let deprecated_parent_options = ['fontSize', 'enabled', 'characters', 'characterColor', 'characterColorMode', 'backgroundColor', 'backgroundColorMode', 'invertMode'];
        
        // Filter out the deprecated options used in the parent dictionary
        let used_deprecated_parent_options = deprecated_parent_options.filter(option => option in options);
        
        if (used_deprecated_parent_options.length > 0) {
            console.warn(`Warning: Deprecated options detected (${used_deprecated_parent_options.join(', ')}). Refer to the documentation for updated options.`);
        

            if (options.characterColor) {
                options.characterColor = P5AsciifyUtils.hexToShaderColor(options.characterColor);
            }
            if (options.backgroundColor) {
                options.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.backgroundColor);
            }

            // Move 'fontSize' to 'common' if it exists
            if ('fontSize' in options) {
                options.common = { fontSize: options.fontSize };
                delete options.fontSize;
            }
        
            // Move remaining options to 'brightnessAsciiShader'
            options.brightnessAsciiShader = { ...options };
        
            // Remove deprecated options from the root level
            deprecated_parent_options.forEach(option => delete options[option]);
        }

        console.log("options pre: ", options);

        if (warn) {
            console.warn(`'P5Asciify.setDefaultOptions()' is deprecated. Use 'setAsciiOptions()' instead. P5Asciify.setDefaultOptions() will be removed in v0.1.0.`);
        }

        const charactersUpdated = options.characters && options.characters !== this.config.characters;
        const fontSizeUpdated = options.fontSize && options.fontSize !== this.config.fontSize;

        if (options.characterColor) {
            options.characterColor = P5AsciifyUtils.hexToShaderColor(options.characterColor);
        }
        if (options.backgroundColor) {
            options.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.backgroundColor);
        }

        const newConfig = { ...this.config, ...options };
        if (fontSizeUpdated && (options.fontSize > 512 || options.fontSize < 1)) {
            console.warn(`P5Asciify: Font size ${options.fontSize} is out of bounds. It should be between 1 and 512. Font size not updated.`);
            delete newConfig.fontSize;
        }

        if (frameCount == 0) { // If we are still in setup(), the characterset and grid have not been initialized yet
            this.config = newConfig;
            console.log("config: ", this.config);
            return;
        }

        if (charactersUpdated) {
            const badCharacters = this.brightnessCharacterSet.getUnsupportedCharacters(options.characters);
            if (badCharacters.length === 0) {
                newConfig.characters = options.characters;
                this.brightnessCharacterSet.setCharacterSet(options.characters);
                console.log("P5Asciify: Character set updated.");
            } else {
                console.warn(`P5Asciify: The following characters are not supported by the current font: [${Array.from(badCharacters).join(', ')}]. Character set not updated.`);
            }
        }

        this.config = newConfig;
        



        if (fontSizeUpdated) {
            this.brightnessCharacterSet.setFontSize(this.config.fontSize);
            this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);
        }
    }
}
