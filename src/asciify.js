

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

    static asciiShader = null;
    static asciiFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static font = null;
    static characterset = null;
    static grid = null;

    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiFramebuffer.height;

            this.grid.reset();

            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
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

        if (frameCount == 0) { // If we are still in setup(), the characterset and grid have not been initialized yet
            this.config = newConfig;
            return;   
        }

        if (charactersUpdated) {
            const badCharacters = this.characterset.getUnsupportedCharacters(options.characters);
            if (badCharacters.length === 0) {
                newConfig.characters = options.characters;
                this.characterset.setCharacterSet(options.characters);
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
