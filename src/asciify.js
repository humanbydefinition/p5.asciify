

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

    static shader = null;

    static framebuffer = null;
    static bufferDimensions = { width: 0, height: 0 };

    static font = null;
    static characterset = null;
    static grid = null;

    static checkFramebufferDimensions() {
        if (this.bufferDimensions.width !== this.framebuffer.width || this.bufferDimensions.height !== this.framebuffer.height) {
            this.bufferDimensions.width = this.framebuffer.width;
            this.bufferDimensions.height = this.framebuffer.height;

            this.grid.reset();
        }
    }

    static setDefaultOptions(options) {
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

        this.config = newConfig;

        if (charactersUpdated) {
            this.characterset.setCharacterSet(this.config.characters);
        }

        if (fontSizeUpdated) {
            this.characterset.setFontSize(this.config.fontSize);
            this.grid.resizeCellDimensions(this.characterset.maxGlyphDimensions.width, this.characterset.maxGlyphDimensions.height);
        }
    }
}

