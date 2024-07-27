class P5Asciify {
    static config = {
        common: {
            fontSize: 16,
        },
        brightness: {
            enabled: true,
            characters: "0123456789",
            characterColor: [1.0, 1.0, 1.0],
            characterColorMode: 0,
            backgroundColor: [0.0, 0.0, 0.0],
            backgroundColorMode: 1,
            invertMode: false,
            rotationAngle: 0,
        },
        edge: {
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
    static asciiFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static sobelShader = null;
    static sobelFramebuffer = null;

    static sampleShader = null;
    static sampleFramebuffer = null;

    static font = null;
    static brightnessCharacterSet = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static edgeCharacterSet = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    static setup() {
        this.brightnessCharacterSet.setup({ font: this.font, characters: this.config.brightness.characters, fontSize: this.config.common.fontSize });
        this.edgeCharacterSet.setup({ font: this.font, characters: this.config.edge.characters, fontSize: this.config.common.fontSize });
        this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        this.colorPalette.setup();

        this.preEffectManager.setupShaders();
        this.preEffectManager.setupEffectQueue();

        this.afterEffectManager.setupShaders();
        this.afterEffectManager.setupEffectQueue();

        this.preEffectFramebuffer = createFramebuffer({ format: FLOAT });
        this.postEffectFramebuffer = createFramebuffer({ format: FLOAT });

        this.asciiShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.ASCII_FRAG_SHADER_CODE);
        this.asciiFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sobelShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.SOBEL_FRAG_SHADER_CODE);
        this.sobelFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sampleShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.SAMPLE_FRAG_SHADER_CODE);
        this.sampleFramebuffer = createFramebuffer({ format: this.FLOAT, width: this.grid.cols, height: this.grid.rows });

        this.asciiFramebufferDimensions = { width: this.asciiFramebuffer.width, height: this.asciiFramebuffer.height };

        pixelDensity(1);
    }

    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiFramebuffer.height;

            this.grid.reset();
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
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

        if (this.config.brightness.enabled) {
            this.asciiFramebuffer.begin();
            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.brightnessCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.brightnessCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.brightnessCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.brightnessCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.brightness.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.brightness.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.brightness.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.brightness.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.brightness.invertMode);
            this.asciiShader.setUniform('u_renderMode', 0);
            this.asciiShader.setUniform('u_brightnessEnabled', this.config.brightness.enabled);
            this.asciiShader.setUniform('u_rotationAngle', radians(this.config.brightness.rotationAngle));
            rect(0, 0, width, height);
            this.asciiFramebuffer.end();
        }

        if (this.config.edge.enabled) {
            this.sobelFramebuffer.begin();
            shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', this.preEffectFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [width, height]);
            this.sobelShader.setUniform('u_threshold', this.config.edge.sobelThreshold);
            rect(0, 0, width, height);
            this.sobelFramebuffer.end();

            this.sampleFramebuffer.begin();
            shader(this.sampleShader);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.config.edge.sampleThreshold);
            rect(0, 0, width, height);
            this.sampleFramebuffer.end();

            this.asciiFramebuffer.begin();
            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.edgeCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.edgeCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.edgeCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.edgeCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiFramebuffer);
            this.asciiShader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.edge.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.edge.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.edge.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.edge.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.edge.invertMode);
            this.asciiShader.setUniform('u_renderMode', 1);
            this.asciiShader.setUniform('u_brightnessEnabled', this.config.brightness.enabled);
            this.asciiShader.setUniform('u_rotationAngle', radians(this.config.edge.rotationAngle));
            rect(0, 0, width, height);
            this.asciiFramebuffer.end();
        }

        this.postEffectFramebuffer.begin();
        clear();
        if (this.config.brightness.enabled || this.config.edge.enabled) {
            image(this.asciiFramebuffer, -width / 2, -height / 2);
        } else {
            image(this.preEffectFramebuffer, -width / 2, -height / 2);
        }
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
            console.warn(`Warning: Deprecated options detected (${used_deprecated_parent_options.join(', ')}). Refer to the documentation for updated options. In v0.1.0, these options will be removed.`);

            // Move 'fontSize' to 'common' if it exists
            if ('fontSize' in options) {
                options.common = { fontSize: options.fontSize };
                delete options.fontSize;
            }

            // Move remaining options to 'brightnessAsciiShader'
            options.brightness = Object.assign({}, options);

            if (options.characterColor) {
                options.characterColor = P5AsciifyUtils.hexToShaderColor(options.characterColor);
            }
            if (options.backgroundColor) {
                options.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.backgroundColor);
            }

            // Remove deprecated options from the root level
            deprecated_parent_options.forEach(option => delete options[option]);
        }

        if (warn) {
            console.warn(`'P5Asciify.setDefaultOptions()' is deprecated. Use 'setAsciiOptions()' instead. P5Asciify.setDefaultOptions() will be removed in v0.1.0.`);
        }

        let brightnessCharactersUpdated = options.brightness && options.brightness.characters && options.brightness.characters !== this.config.brightness.characters;
        let edgeCharactersUpdated = options.edge && options.edge.characters && options.edge.characters !== this.config.edge.characters;
        let fontSizeUpdated = options.common && options.common.fontSize && options.common.fontSize !== this.config.common.fontSize;

        if (options.brightness) {
            if (options.brightness.characterColor) {
                options.brightness.characterColor = P5AsciifyUtils.hexToShaderColor(options.brightness.characterColor);
            }
            if (options.brightness.backgroundColor) {
                options.brightness.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.brightness.backgroundColor);
            }
        }

        if (options.edge) {
            if (options.edge.characterColor) {
                options.edge.characterColor = P5AsciifyUtils.hexToShaderColor(options.edge.characterColor);
            }

            if (options.edge.backgroundColor) {
                options.edge.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.edge.backgroundColor);
            }
        }

        const newConfig = P5AsciifyUtils.deepMerge({ ...this.config }, options);
        if (fontSizeUpdated && (options.common.fontSize > 512 || options.common.fontSize < 1)) {
            console.warn(`P5Asciify: Font size ${options.common.fontSize} is out of bounds. It should be between 1 and 512. Font size not updated.`);
            fontSizeUpdated = false;
            newConfig.common.fontSize = this.config.common.fontSize;
        }

        // If the edge characters contain more or less than 8 characters, do not update the character set

        if (edgeCharactersUpdated && options.edge.characters.length !== 8) {
            console.warn(`P5Asciify: The edge character set must contain exactly 8 characters. Character set not updated.`);
            edgeCharactersUpdated = false;
            newConfig.edge.characters = this.config.edge.characters;
        }

        if (frameCount == 0) { // If we are still in setup(), the characterset and grid have not been initialized yet
            this.config = newConfig;
            return;
        }

        if (brightnessCharactersUpdated) {
            const badCharacters = this.brightnessCharacterSet.getUnsupportedCharacters(options.brightness.characters);
            if (badCharacters.length === 0) {
                newConfig.brightness.characters = options.brightness.characters;
                this.brightnessCharacterSet.setCharacterSet(options.brightness.characters);
            } else {
                console.warn(`P5Asciify: The following brightness characters are not supported by the current font: [${Array.from(badCharacters).join(', ')}]. Character set not updated.`);
            }
        }

        if (edgeCharactersUpdated) {
            const badCharacters = this.edgeCharacterSet.getUnsupportedCharacters(options.edge.characters);
            if (badCharacters.length === 0) {
                newConfig.edge.characters = options.edge.characters;
                this.edgeCharacterSet.setCharacterSet(options.edge.characters);
            } else {
                console.warn(`P5Asciify: The following edge characters are not supported by the current font: [${Array.from(badCharacters).join(', ')}]. Character set not updated.`);
            }
        }

        this.config = newConfig;

        if (fontSizeUpdated) {
            this.brightnessCharacterSet.setFontSize(this.config.common.fontSize);
            this.edgeCharacterSet.setFontSize(this.config.common.fontSize);
            this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }
}
