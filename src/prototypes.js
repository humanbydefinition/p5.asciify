window.preload = function () { }; // In case the user doesn't define a preload function, we need to define it here to avoid errors

/**
 * Preloads the default ASCII font for P5Asciify.
 * This function is registered as a method to be called before the preload phase of p5.js.
 */
p5.prototype.preloadAsciiFont = function () {
    this._incrementPreload();
    this.loadAsciiFont(P5AsciifyConstants.URSAFONT_BASE64);
}
p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

/**
 * Loads an ASCII font and sets it as the current font for P5Asciify.
 * @param {string} fontPath - The path to the ASCII font file.
 */
p5.prototype.loadAsciiFont = function (fontPath) {
    P5Asciify.font = this.loadFont(fontPath,
        () => { this._decrementPreload(); },
        () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${fontPath}'`); }
    );
};
p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);

/**
 * Sets up the P5Asciify renderer and checks for compatibility.
 * This function is registered as a method to be called after the setup phase of p5.js.
 */
p5.prototype.setupAsciifier = function () {

    if (this._renderer.drawingContext instanceof CanvasRenderingContext2D) {
        throw new P5AsciifyError("setupAsciifier() | WebGL renderer is required for P5Asciify to work.");
    }

    if (P5AsciifyUtils.compareVersions(this.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("P5Asciify requires p5.js v1.8.0 or higher to work.");
    }

    P5Asciify.characterset = new P5AsciifyCharacterSet({ font: P5Asciify.font, characters: P5Asciify.config.characters, fontSize: P5Asciify.config.fontSize });
    P5Asciify.grid = new P5AsciifyGrid({ cellWidth: P5Asciify.characterset.maxGlyphDimensions.width, cellHeight: P5Asciify.characterset.maxGlyphDimensions.height });

    P5Asciify.asciiShader = this.createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.ASCII_FRAG_SHADER_CODE);
    P5Asciify.asciiFramebuffer = createFramebuffer({ format: this.FLOAT });

    P5Asciify.asciiFramebufferDimensions = { width: P5Asciify.asciiFramebuffer.width, height: P5Asciify.asciiFramebuffer.height };

    P5Asciify.characterset.createTexture({ fontSize: 512 });

    this.pixelDensity(1);
}
p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

/**
 * Updates the current ASCII font used by P5Asciify.
 * @param {string} fontPath - The path to the new ASCII font file.
 */
p5.prototype.updateAsciiFont = function (fontPath) {
    P5Asciify.font = this.loadFont(
        fontPath,
        () => {
            P5Asciify.characterset.setFontObject(P5Asciify.font);
            P5Asciify.grid.resizeCellDimensions(P5Asciify.characterset.maxGlyphDimensions.width, P5Asciify.characterset.maxGlyphDimensions.height);
        },
        () => {
            throw new P5AsciifyError(`updateAsciiFont() | Failed to load font from path: '${fontPath}'`);
        }
    );
};

p5.prototype.preDrawAddPush = function () { this.push(); };
p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

p5.prototype.postDrawAddPop = function () { this.pop(); };
p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

/**
 * Renders the ASCII representation of the current sketch.
 * This function is registered as a method to be called after the draw phase of p5.js.
 */
p5.prototype.asciify = function () {

    if (!P5Asciify.config.enabled) return;

    P5Asciify.asciiFramebuffer.begin();

    this.shader(P5Asciify.asciiShader);
    P5Asciify.asciiShader.setUniform('u_characterTexture', P5Asciify.characterset.texture);
    P5Asciify.asciiShader.setUniform('u_charsetCols', P5Asciify.characterset.charsetCols);
    P5Asciify.asciiShader.setUniform('u_charsetRows', P5Asciify.characterset.charsetRows);
    P5Asciify.asciiShader.setUniform('u_totalChars', P5Asciify.characterset.characters.length);
    P5Asciify.asciiShader.setUniform('u_sketchTexture', this._renderer);
    P5Asciify.asciiShader.setUniform('u_gridPixelDimensions', [P5Asciify.grid.width, P5Asciify.grid.height]);
    P5Asciify.asciiShader.setUniform('u_gridOffsetDimensions', [P5Asciify.grid.offsetX, P5Asciify.grid.offsetY]);
    P5Asciify.asciiShader.setUniform('u_gridCellDimensions', [P5Asciify.grid.cols, P5Asciify.grid.rows]);
    P5Asciify.asciiShader.setUniform('u_characterColor', P5Asciify.config.characterColor);
    P5Asciify.asciiShader.setUniform('u_characterColorMode', P5Asciify.config.characterColorMode);
    P5Asciify.asciiShader.setUniform('u_backgroundColor', P5Asciify.config.backgroundColor);
    P5Asciify.asciiShader.setUniform('u_backgroundColorMode', P5Asciify.config.backgroundColorMode);
    P5Asciify.asciiShader.setUniform('u_invertMode', P5Asciify.config.invertMode);
    P5Asciify.asciiShader.setUniform('u_renderMode', 0);
    this.rect(0, 0, this.width, this.height);

    P5Asciify.asciiFramebuffer.end();

    this.clear();
    this.image(P5Asciify.asciiFramebuffer, -this.width / 2, -this.height / 2);

    P5Asciify.checkFramebufferDimensions();
};
p5.prototype.registerMethod("post", p5.prototype.asciify);