class P5Asciify {
    static config = {
        enabled: true,
        characters: "0123456789",
        fontSize: 16,
        characterColor: [1.0, 1.0, 1.0],
        characterColorMode: 0,
        backgroundColor: [0.0, 0.0, 0.0],
        backgroundColorMode: 1,
        invertMode: false
    };

    static preEffectSetupQueue = [];
    static preEffectManager = new P5AsciifyEffectManager();

    static afterEffectSetupQueue = [];
    static afterEffectManager = new P5AsciifyEffectManager();

    static colorPalette = new P5AsciifyColorPalette();

    static framebuffer = null;

    static asciiShader = null;
    static asciiFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static font = null;
    static characterset = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    static setup() {
        this.characterset.setup({ font: this.font, characters: this.config.characters, fontSize: this.config.fontSize });
        this.grid.resizeCellDimensions(this.characterset.maxGlyphDimensions.width, this.characterset.maxGlyphDimensions.height);

        this.colorPalette.setup();

        this.preEffectManager.setupShaders();
        this.preEffectManager.setupEffectQueue();

        this.afterEffectManager.setupShaders();
        this.afterEffectManager.setupEffectQueue();

        this.framebuffer = createFramebuffer({ format: FLOAT });

        this.asciiShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.ASCII_FRAG_SHADER_CODE);
        this.asciiFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.asciiFramebufferDimensions = { width: this.asciiFramebuffer.width, height: this.asciiFramebuffer.height };

        pixelDensity(1);
    }

    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiFramebuffer.height;

            this.grid.reset();
        }
    }

    static asciify() {

        this.framebuffer.begin();
        clear();
        image(_renderer, -width / 2, -height / 2);
        this.framebuffer.end();

        for (const effect of this.preEffectManager._effects) {
            if (effect.enabled) {
                this.framebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.framebuffer);
                rect(0, 0, width, height);
                this.framebuffer.end();
            }
        }

        if (this.config.enabled) {
            this.framebuffer.begin();

            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.characterset.texture);
            this.asciiShader.setUniform('u_charsetCols', this.characterset.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.characterset.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.characterset.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.framebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.invertMode);
            this.asciiShader.setUniform('u_renderMode', 0);
            rect(0, 0, width, height);

            this.framebuffer.end();
        }

        for (const effect of this.afterEffectManager._effects) {
            if (effect.enabled) {
                this.framebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.framebuffer);
                rect(0, 0, width, height);
                this.framebuffer.end();
            }
        }

        clear();
        image(this.framebuffer, -width / 2, -height / 2);

        this.checkFramebufferDimensions();
    }

    static setDefaultOptions(options, warn = true) {

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
            return;
        }

        if (charactersUpdated) {
            const badCharacters = this.characterset.getUnsupportedCharacters(options.characters);
            if (badCharacters.length === 0) {
                newConfig.characters = options.characters;
                this.characterset.setCharacterSet(options.characters);
                console.log("P5Asciify: Character set updated.");
            } else {
                console.warn(`P5Asciify: The following characters are not supported by the current font: [${Array.from(badCharacters).join(', ')}]. Character set not updated.`);
            }
        }

        this.config = newConfig;

        if (fontSizeUpdated) {
            this.characterset.setFontSize(this.config.fontSize);
            this.grid.resizeCellDimensions(this.characterset.maxGlyphDimensions.width, this.characterset.maxGlyphDimensions.height);
        }
    }
}
