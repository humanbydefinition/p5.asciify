(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('p5')) :
    typeof define === 'function' && define.amd ? define(['p5'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.P5Asciify = factory(global.p5));
})(this, (function (p5) { 'use strict';

    class P5AsciifyFontTextureAtlas {
        /**
         * Sets up the character set with a specified font, characters, and font size.
         * @param {Object} options - The setup options.
         * @param {string} options.type - The type of character set to set up. (e.g. "brightness", "edge")
         * @param {Object} options.font - The font object to use.
         * @param {string} options.characters - The string of characters to include in the character set.
         * @param {number} options.fontSize - The font size to use.
         */
        constructor({ p5Instance, font, fontSize }) {
            this.p5Instance = p5Instance;
            this.font = font;
            this.fontSize = fontSize;

            // Filter and get all valid glyphs
            this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs)
                .filter(glyph => glyph.unicode !== undefined);

            // Convert glyphs to actual characters using their unicode values
            this.characters = this.fontGlyphs
                .map(glyph => String.fromCharCode(glyph.unicode));

            this.characterGlyphs = this.loadCharacterGlyphs();
            this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
            this.createTexture(this.fontSize);
        }

        loadCharacterGlyphs() {
            // Load glyphs with unicode
            let glyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);

            // Create a map for character positions
            let charPositionMap = new Map(this.characters.map((char, index) => [char, index]));

            // Filter and sort glyphs based on character positions
            let filteredGlyphs = glyphs
                .filter(glyph => glyph.unicodes.some(u => this.characters.includes(String.fromCharCode(u))))
                .sort((a, b) => charPositionMap.get(String.fromCharCode(a.unicodes[0])) - charPositionMap.get(String.fromCharCode(b.unicodes[0])));

            // Assign colors to the sorted glyphs
            filteredGlyphs.forEach((glyph, index) => {
                glyph.r = index % 256;
                glyph.g = Math.floor(index / 256) % 256;
                glyph.b = Math.floor(index / 65536);
            });

            return filteredGlyphs;
        }

        /**
         * Calculates the maximum dimensions of glyphs in the whole font for a given font size.
         * @param {number} fontSize - The font size to use for calculations.
         * @returns {Object} An object containing the maximum width and height of the glyphs.
         */
        getMaxGlyphDimensions(fontSize) {
            return this.fontGlyphs.reduce((maxDims, glyph) => {
                const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
                return {
                    width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                    height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1))
                };
            }, { width: 0, height: 0 });
        }

        /**
         * Sets the font object and resets the character set.
         * @param {Object} font - The new font object.
         */
        setFontObject(font) {
            this.font = font;
            this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);

            // Convert glyphs to actual characters using their unicode values
            this.characters = this.fontGlyphs
                .map(glyph => String.fromCharCode(glyph.unicode));

            this.characterGlyphs = this.loadCharacterGlyphs();
            this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
            this.createTexture(this.fontSize);
        }

        /**
         * Sets the font size and updates the maximum glyph dimensions.
         * @param {number} fontSize - The new font size.
         */
        setFontSize(fontSize) {
            this.fontSize = fontSize;
            this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
            this.createTexture(this.fontSize);
        }

        /**
         * Creates a texture containing all characters in the character set, arranged in a 2d grid.
         * @param {number} fontSize - The font size to use for rendering the texture.
         */
        createTexture(fontSize) {
            this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
            this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);
            let dimensions = this.getMaxGlyphDimensions(fontSize);

            if (!this.texture) {
                this.texture = this.p5Instance.createFramebuffer({ width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
            } else {
                this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
            }

            this.texture.begin();
            this.drawCharacters(fontSize, dimensions);
            this.texture.end();
        }

        /**
         * 
         * @param {number} fontSize - The font size to use for drawing the characters on the texture.
         * @param {*} dimensions - The maximum dimensions of the glyphs.
         */
        drawCharacters(fontSize, dimensions) {
            this.p5Instance.clear();
            this.p5Instance.textFont(this.font);
            this.p5Instance.fill(255);
            this.p5Instance.textSize(fontSize);
            this.p5Instance.textAlign(this.p5Instance.LEFT, this.p5Instance.TOP);
            this.p5Instance.noStroke();

            for (let i = 0; i < this.characters.length; i++) {
                const col = i % this.charsetCols;
                const row = Math.floor(i / this.charsetCols);
                const x = dimensions.width * col - ((dimensions.width * this.charsetCols) / 2);
                const y = dimensions.height * row - ((dimensions.height * this.charsetRows) / 2);
                this.p5Instance.text(this.characters[i], x, y);
            }
        }
    }

    /**
     * @class P5AsciifyError
     * @extends {Error}
     * @description
     * Custom error class for the P5Asciify library.
     * Represents errors specific to the P5Asciify library.
     */
    class P5AsciifyError extends Error {
        /**
         * Creates an instance of P5AsciifyError.
         * @param {string} message - The error message.
         */
        constructor(message) {
            super(message);
            this.name = "P5AsciifyError";
        }
    }

    // colorpalette.js

    /**
     * @class P5AsciifyColorPalette
     * @description Represents a single color palette with its own framebuffer
     */
    class P5AsciifyColorPalette {
        /**
         * @param {Array} colors - An array of color values.
         */
        constructor(colors) {
            this.colors = colors;
            this.framebuffer = null;
            this.p5Instance = null;
        }

        /**
         * Initializes the palette's framebuffer using the provided p5 instance.
         * @param {Object} p5Instance - The p5.js instance.
         */
        setup(p5Instance) {
            this.p5Instance = p5Instance;
            // Ensure minimum width of 1 to prevent zero-sized framebuffer
            const width = Math.max(this.colors.length, 1);
            this.framebuffer = this.p5Instance.createFramebuffer({
                width: width,
                height: 1,
                depthFormat: this.p5Instance.UNSIGNED_INT,
                textureFiltering: this.p5Instance.NEAREST
            });
            this.updateFramebuffer();
        }

        /**
         * Updates the framebuffer with the current colors.
         */
        updateFramebuffer() {
            if (!this.framebuffer || !this.p5Instance) return;

            // Ensure minimum width of 1
            const sw = Math.max(this.colors.length, 1);
            const sh = 1;

            const density = this.p5Instance.pixelDensity();
            const dw = sw * density;
            const dh = sh * density;

            this.framebuffer.resize(sw, sh);
            this.framebuffer.loadPixels();

            for (let lx = 0; lx < sw; lx++) {
                let color;
                if (lx < this.colors.length) {
                    color = this.p5Instance.color(this.colors[lx]);
                } else {
                    color = this.p5Instance.color(0, 0, 0, 0);
                }
                for (let dx = 0; dx < density; dx++) {
                    const px = lx * density + dx;
                    for (let py = 0; py < dh; py++) {
                        const index = 4 * (py * dw + px);
                        this.framebuffer.pixels[index] = this.p5Instance.red(color);
                        this.framebuffer.pixels[index + 1] = this.p5Instance.green(color);
                        this.framebuffer.pixels[index + 2] = this.p5Instance.blue(color);
                        this.framebuffer.pixels[index + 3] = this.p5Instance.alpha(color);
                    }
                }
            }

            this.framebuffer.updatePixels();
        }

        /**
         * Updates the palette's colors and refreshes the framebuffer.
         * @param {Array} newColors - The new array of colors.
         */
        setColors(newColors) {
            this.colors = newColors;
            this.updateFramebuffer();
        }

        /**
         * Retrieves the palette's framebuffer.
         * @returns {Object} The framebuffer associated with this palette.
         */
        getFramebuffer() {
            return this.framebuffer;
        }

        /**
         * Retrieves the palette's colors.
         * @returns {Array} The array of color values.
         */
        getColors() {
            return this.colors;
        }
    }

    /**
     * @class P5AsciifyCharacterSet
     * @description
     * A class that represents a character set for the P5Asciify library.
     * It is responsible for maintaining a texture that contains all the characters in the character set.
     */
    class P5AsciifyCharacterSet {

        constructor({ p5Instance, asciiFontTextureAtlas, characters }) {
            this.p5Instance = p5Instance;
            this.asciiFontTextureAtlas = asciiFontTextureAtlas;

            this.characters = this.validateCharacters(characters);
            this.characterColors = this.getCharsetColorArray(this.characters);

            this.characterColorPalette = new P5AsciifyColorPalette(this.characterColors);
            this.characterColorPalette.setup(this.p5Instance);
        }

        /**
         * Validates a string of characters to ensure they are supported by the current font.
         * @param {string} characters 
         * @param {string} defaultCharacters 
         * @returns {string[]} The validated characters. If any characters are unsupported, the default characters are returned.
         */
        validateCharacters(characters) {
            let unsupportedChars = this.getUnsupportedCharacters(characters);
            if (unsupportedChars.length > 0) {
                throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
            }
            return Array.from(characters);
        }

        /**
         * Returns an array of characters that are not supported by the current font.
         * @param {string} characters - The string of characters to check.
         * @returns {string[]} An array of unsupported characters.
         */
        getUnsupportedCharacters(characters) {
            return Array.from(new Set(Array.from(characters).filter(char =>
                !this.asciiFontTextureAtlas.fontGlyphs.some(glyph => glyph.unicodes.includes(char.codePointAt(0)))
            )));
        }

        /**
         * Sets the characters to be used in the character set and creates a new texture.
         * @param {string} characters - The string of characters to set.
         */
        setCharacterSet(characters) {
            this.characters = this.validateCharacters(characters);
            this.characterColors = this.getCharsetColorArray(this.characters);
            this.characterColorPalette.setColors(this.characterColors);
        }

        /**
         * Gets an array of RGB colors for given characters or string
         * @param {string|string[]} input - Either a string or array of characters
         * @returns {Array<[number,number,number]>} Array of RGB color values
         * @throws {Error} If character is not found in the texture atlas
         */
        getCharsetColorArray(input) {
            const chars = Array.isArray(input) ? input : Array.from(input);
            
            return chars.map(char => {
                const glyph = this.asciiFontTextureAtlas.characterGlyphs.find(
                    glyph => glyph.unicodes.includes(char.codePointAt(0))
                );
        
                if (!glyph) {
                    throw new Error(`Could not find character in character set: ${char}`);
                }
        
                return [glyph.r, glyph.g, glyph.b];
            });
        }
    }

    /**
     * @class P5AsciifyGrid
     * @description
     * Represents a 2D grid for the P5Asciify library.
     * Handles the dimensions and resizing of the grid.
     */
    class P5AsciifyGrid {
        /**
         * Creates an instance of P5AsciifyGrid.
         * @param {Object} options - The grid options.
         * @param {number} options.cellWidth - The width of each cell in the grid.
         * @param {number} options.cellHeight - The height of each cell in the grid.
         */

        constructor(p5Instance, cellWidth, cellHeight) {
            this.p5Instance = p5Instance;
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;

            this.reset();
        }

        /**
         * Resets the grid dimensions based on the current cell width and height.
         * Calculates the number of columns and rows and resizes the grid accordingly.
         */
        reset() {
            let [cols, rows] = this._calculateGridCellDimensions();
            this.cols = cols;
            this.rows = rows;

            this._resizeGrid();
        }

        /**
         * Resizes the grid dimensions based on the current number of columns and rows, as well as the cell width and height.
         * Adjusts the grid's offset to center it within the given width and height in the ASCII shader.
         * @private
         */
        _resizeGrid() {
            this.width = this.cols * this.cellWidth;
            this.height = this.rows * this.cellHeight;

            this.offsetX = Math.floor((this.p5Instance.width - this.width) / 2);
            this.offsetY = Math.floor((this.p5Instance.height - this.height) / 2);
        }

        /**
         * Calculates the number of columns and rows for the grid based on the current cell dimensions.
         * @returns {number[]} An array containing the number of columns and rows.
         * @private
         */
        _calculateGridCellDimensions() {
            const cellsX = Math.floor(this.p5Instance.width / this.cellWidth);
            const cellsY = Math.floor(this.p5Instance.height / this.cellHeight);
            return [cellsX, cellsY];
        }

        /**
         * Resizes the dimensions of a grid cell in pixels.
         * Recalculates the number of columns and rows and resizes the grid accordingly.
         * @param {number} newCellWidth - The new width of each cell in the grid.
         * @param {number} newCellHeight - The new height of each cell in the grid.
         */
        resizeCellPixelDimensions(newCellWidth, newCellHeight) {
            this.cellWidth = newCellWidth;
            this.cellHeight = newCellHeight;

            this.reset();
        }

        resizeCellDimensions(numCols, numRows) {
            const [maxCols, maxRows] = this._calculateGridCellDimensions();
            if (numCols > maxCols || numRows > maxRows) {
                console.warn(`The defined grid dimensions exceed the maximum dimensions of the grid. The maximum dimensions for the given font(size) and sketch dimensions are ${maxCols} x ${maxRows}. Resetting to default dimensions.`);
                this.reset();
                return;
            }

            this.cols = numCols;
            this.rows = numRows;

            // Resize the grid based on new dimensions
            this._resizeGrid();
        }
    }

    class P5AsciifyGradient {
        constructor(type, shader, brightnessStart, brightnessEnd, characters) {
            this._type = type;
            this._shader = shader;

            // map brightness start from 0-255 to 0-1
            this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
            this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;

            this._characters = characters;

            this._enabled = true;

            this._onPaletteChangeCallback = null;
        }

        registerPaletteChangeCallback(callback) {
            this._onPaletteChangeCallback = callback;
        }

        setup(p5Instance, shader, colors) {
            this._shader = shader;
            this._palette = new P5AsciifyColorPalette(colors);
            this._palette.setup(p5Instance);
        }

        setUniforms(p5, framebuffer, referenceFramebuffer) {
            this._shader.setUniform("textureID", framebuffer);
            this._shader.setUniform("originalTextureID", referenceFramebuffer);
            this._shader.setUniform("gradientTexture", this._palette.framebuffer);
            this._shader.setUniform("gradientTextureDimensions", [this._palette.framebuffer.width, 1]);
            this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
            this._shader.setUniform("frameCount", p5.frameCount);
            this._shader.setUniform("u_pixelRatio", p5.pixelDensity());
        }

        set palette(value) {
            if (this._onPaletteChangeCallback) {
                this._onPaletteChangeCallback(this, value);
            }
        }

        get type() {
            return this._type;
        }

        get enabled() {
            return this._enabled;
        }

        set enabled(value) {
            this._enabled = value;
        }

        get brightnessStart() {
            return this._brightnessStart;
        }

        set brightnessStart(value) {
            this._brightnessStart = value;
        }

        get brightnessEnd() {
            return this._brightnessEnd;
        }

        set brightnessEnd(value) {
            this._brightnessEnd = value;
        }
    }

    class P5AsciifyLinearGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, characters, direction, angle, speed = 0.01}) {
            super(type, shader, brightnessStart, brightnessEnd, characters);

            this._direction = direction;
            this._angle = angle;
            this._speed = speed;
        }

        setUniforms(frameCount,framebuffer, referenceFramebuffer) {
            super.setUniforms(frameCount,framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_angle',  this._angle * Math.PI / 180);
            this._shader.setUniform('u_speed', this._speed);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get angle() {
            return this._angle;
        }

        set angle(value) {
            this._angle = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    class P5AsciifyZigZagGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, characters, direction, angle, speed = 0.01 }) {
            super(type, shader, brightnessStart, brightnessEnd, characters);

            this._direction = direction;
            this._angle = angle;
            this._speed = speed;
        }

        setUniforms(frameCount,framebuffer, referenceFramebuffer) {
            super.setUniforms(frameCount,framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_angle',  this._angle * Math.PI / 180);
            this._shader.setUniform('u_speed', this._speed);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get angle() {
            return this._angle;
        }

        set angle(value) {
            this._angle = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    class P5AsciifySpiralGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, characters, direction, centerX, centerY, speed, density}) {
            super(type, shader, brightnessStart, brightnessEnd, characters);

            this._direction = direction;
            this._centerX = centerX;
            this._centerY = centerY;
            this._speed = speed;
            this._density = density;
        }

        setUniforms(frameCount,framebuffer, referenceFramebuffer) {
            super.setUniforms(frameCount,framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_centerX', this._centerX);
            this._shader.setUniform('u_centerY', this._centerY);
            this._shader.setUniform('u_speed', this._speed);
            this._shader.setUniform('u_density', this._density);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get centerX() {
            return this._centerX;
        }

        set centerX(value) {
            this._centerX = value;
        }

        get centerY() {
            return this._centerY;
        }

        set centerY(value) {
            this._centerY = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }

        get density() {
            return this._density;
        }

        set density(value) {
            this._density = value;
        }
    }

    class P5AsciifyRadialGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, characters, direction, centerX, centerY, radius}) {
            super(type, shader, brightnessStart, brightnessEnd, characters);

            this._direction = direction;
            this._centerX = centerX;
            this._centerY = centerY;
            this._radius = radius;
        }

        setUniforms(frameCount,framebuffer, referenceFramebuffer) {
            super.setUniforms(frameCount,framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_centerX', this._centerX);
            this._shader.setUniform('u_centerY', this._centerY);
            this._shader.setUniform('u_radius', this._radius);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get centerX() {
            return this._centerX;
        }

        set centerX(value) {
            this._centerX = value;
        }

        get centerY() {
            return this._centerY;
        }

        set centerY(value) {
            this._centerY = value;
        }

        get radius() {
            return this._radius;
        }

        set radius(value) {
            this._radius = value;
        }
    }

    class P5AsciifyConicalGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, characters, centerX, centerY, speed}) {
            super(type, shader, brightnessStart, brightnessEnd, characters);

            this._centerX = centerX;
            this._centerY = centerY;
            this._speed = speed;
        }

        setUniforms(frameCount, framebuffer, referenceFramebuffer) {
            super.setUniforms(frameCount,framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_centerX', this._centerX);
            this._shader.setUniform('u_centerY', this._centerY);
            this._shader.setUniform('u_speed', this._speed);
        }

        get centerX() {
            return this._centerX;
        }

        set centerX(value) {
            this._centerX = value;
        }

        get centerY() {
            return this._centerY;
        }

        set centerY(value) {
            this._centerY = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    class P5AsciifyNoiseGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, characters, noiseScale, speed, direction }) {
            super(type, shader, brightnessStart, brightnessEnd, characters);

            this._direction = direction;
            this._noiseScale = noiseScale;
            this._speed = speed;
        }

        setUniforms(frameCount,framebuffer, referenceFramebuffer) {
            super.setUniforms(frameCount,framebuffer, referenceFramebuffer);
            this._shader.setUniform('direction', this._direction);
            this._shader.setUniform('noiseScale', this._noiseScale);
            this._shader.setUniform('u_speed', this._speed);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get noiseScale() {
            return this._noiseScale;
        }

        set noiseScale(value) {
            this._noiseScale = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    var vertexShader = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}"; // eslint-disable-line

    var linearGradientShader = "#version 100\nprecision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;uniform float u_pixelRatio;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange.x&&texColor.r<=u_brightnessRange.y&&texColor==originalTexColor){float position=logicalFragCoord.x*cos(u_angle)+logicalFragCoord.y*sin(u_angle);float index=mod(position+float(frameCount)*u_gradientDirection*u_speed,gradientTextureDimensions.x);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0.0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var zigzagGradientShader = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;uniform float u_pixelRatio;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;float positionX=logicalFragCoord.x*cos(u_angle)-logicalFragCoord.y*sin(u_angle);float positionY=logicalFragCoord.x*sin(u_angle)+logicalFragCoord.y*cos(u_angle);float rowIndex=floor(positionY);float direction=mod(rowIndex,2.0)==0.0 ? 1.0 :-1.0;float rowPosition=positionX;float adjustedSpeed=u_speed/u_pixelRatio;float index=mod(rowPosition+float(frameCount)*adjustedSpeed*direction*u_gradientDirection,gradientTextureDimensions.x);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var spiralGradientShader = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_centerX;uniform float u_centerY;uniform float u_speed;uniform float u_density;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_gradientDirection*u_speed;float index=mod((distance+adjustedAngle*u_density)*gradientTextureDimensions.x,gradientTextureDimensions.x);float normalizedIndex=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var radialGradientShader = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float u_radius;uniform int frameCount;uniform int u_gradientDirection;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float normalizedDistance=clamp(distance/u_radius,0.0,1.0);float index=normalizedDistance*(gradientTextureDimensions.x-1.0);float animatedIndex=mod(index+float(frameCount)*0.1*float(-u_gradientDirection),gradientTextureDimensions.x);float normalizedIndex=(floor(animatedIndex)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var conicalGradientShader = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform int frameCount;uniform float u_speed;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 flippedTexCoord=vec2(v_texCoord.x,v_texCoord.y);vec4 texColor=texture2D(textureID,flippedTexCoord);vec4 originalTexColor=texture2D(originalTextureID,flippedTexCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=flippedTexCoord-vec2(u_centerX,u_centerY);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_speed;float normalizedAngle=mod(adjustedAngle+3.14159265,2.0*3.14159265)/(2.0*3.14159265);float index=normalizedAngle*gradientTextureDimensions.x;float normalizedIndex=mod(floor(index)+0.5,gradientTextureDimensions.x)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var noiseGradientShader = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float noiseScale;uniform float u_speed;uniform float direction;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 directionVec=vec2(cos(radians(direction)),sin(radians(direction)));vec2 uv=v_texCoord*noiseScale+directionVec*float(frameCount)*u_speed*0.01;float noiseValue=snoise(uv);float normalizedNoiseValue=(noiseValue+1.0)/2.0;float index=normalizedNoiseValue*(gradientTextureDimensions.x-1.0);float texelPosition=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    class P5AsciifyGradientManager {

        gradientParams = {
            "linear": { direction: 1, angle: 0, speed: 0.01 },
            "zigzag": { direction: 1, angle: 0, speed: 0.01 },
            "spiral": { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
            "radial": { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
            "conical": { centerX: 0.5, centerY: 0.5, speed: 0.01 },
            "noise": { noiseScale: 0.1, speed: 0.01, direction: 1 },
        }

        gradientShaders = {
            "linear": linearGradientShader,
            "zigzag": zigzagGradientShader,
            "spiral": spiralGradientShader,
            "radial": radialGradientShader,
            "conical": conicalGradientShader,
            "noise": noiseGradientShader,
        }

        gradientConstructors = {
            "linear": ({ type, shader, params }) => new P5AsciifyLinearGradient({ type, shader, ...params }),
            "zigzag": ({ type, shader, params }) => new P5AsciifyZigZagGradient({ type, shader, ...params }),
            "spiral": ({ type, shader, params }) => new P5AsciifySpiralGradient({ type, shader, ...params }),
            "radial": ({ type, shader, params }) => new P5AsciifyRadialGradient({ type, shader, ...params }),
            "conical": ({ type, shader, params }) => new P5AsciifyConicalGradient({ type, shader, ...params }),
            "noise": ({ type, shader, params }) => new P5AsciifyNoiseGradient({ type, shader, ...params }),
        }

        _setupQueue = [];
        _gradients = [];

        setup(gradientCharacterSet) {
            this.gradientCharacterSet = gradientCharacterSet;
            this.setupShaders();
            this.setupGradientQueue();
        }

        addInstance(p5Instance) {
            this.p5Instance = p5Instance;
        }

        setupGradientQueue() {
            for (let gradientInstance of this._setupQueue) {
                gradientInstance.setup(this.p5Instance, this.gradientShaders[gradientInstance.type], this.gradientCharacterSet.getCharsetColorArray(gradientInstance._characters));
            }

            this._setupQueue = [];
        }

        getGradientParams(gradientName, params) {
            return { ...this.gradientParams[gradientName], ...params };
        }

        addGradient(gradientName, brightnessStart, brightnessEnd, characters, params) {
            const mergedParams = this.getGradientParams(gradientName, { brightnessStart, brightnessEnd, characters, ...params });
            const gradient = this.gradientConstructors[gradientName]({ type: gradientName, shader: this.gradientShaders[gradientName], params: mergedParams });
            gradient.registerPaletteChangeCallback(this.handleGradientPaletteChange.bind(this));

            
            this._gradients.push(gradient);

            if (frameCount === 0) {
                this._setupQueue.push(gradient);
            } else {
                gradient.setup(this.p5Instance, this.gradientShaders[gradientName], this.gradientCharacterSet.getCharsetColorArray(characters));
            }

            return gradient;
        }

        removeGradient(gradient) {
            const index = this._gradients.indexOf(gradient);
            if (index > -1) {
                this._gradients.splice(index, 1);
            }
        }

        handleGradientPaletteChange(gradient, characters) {
            if (frameCount === 0) {
                gradient._characters = characters;
            } else {
                gradient._palette.setColors(this.gradientCharacterSet.getCharsetColorArray(characters));
            }
        }

        setupShaders() {
            for (let gradientName in this.gradientShaders) {
                this.gradientShaders[gradientName] = this.p5Instance.createShader(vertexShader, this.gradientShaders[gradientName]);
            }
        }
    }

    // renderers/AsciiRenderer.js
    class AsciiRenderer {
        /**
         * Constructor for AsciiRenderer.
         * @param {Object} options - Renderer-specific options.
         * @param {P5} p5Instance - The p5.js instance.
         */
        constructor(p5Instance, grid, characterSet, options) {
            if (new.target === AsciiRenderer) {
                throw new TypeError("Cannot construct AsciiRenderer instances directly");
            }

            this.p5 = p5Instance;
            this.grid = grid;
            this.characterSet = characterSet;
            this.options = options;

            this.primaryColorSampleFramebuffer = this.p5.createFramebuffer({ antialias: false, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.secondaryColorSampleFramebuffer = this.p5.createFramebuffer({ antialias: false, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.asciiCharacterFramebuffer = this.p5.createFramebuffer({ antialias: false, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });

            this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        updateOptions(newOptions) {
            this.options = {
                ...this.options,
                ...newOptions
            };
        }

        /**
         * Render ASCII based on the input framebuffer.
         * @param {Framebuffer} inputFramebuffer - The input framebuffer to base ASCII rendering on.
         */
        render(inputFramebuffer) {
            throw new Error("Must implement render method");
        }

        /**
         * Get the framebuffer containing the ASCII-rendered output.
         * @returns {Framebuffer} The output framebuffer.
         */
        getOutputFramebuffer() {
            return this.outputFramebuffer;
        }
    }

    var asciiConversionShader = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_asciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform float u_rotationAngle;uniform int u_invertMode;uniform vec2 u_resolution;uniform float u_pixelRatio;uniform sampler2D u_asciiBrightnessTexture;uniform sampler2D u_gradientReferenceTexture;uniform sampler2D u_edgesTexture;uniform bool u_brightnessEnabled;uniform int u_layer;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 adjustedCoord=(logicalFragCoord-u_gridOffsetDimensions)/u_gridPixelDimensions;vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=secondaryColor;return;}vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);if(u_layer==2){vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);vec4 gradientReferenceColor=texture2D(u_gradientReferenceTexture,charIndexTexCoord);if(encodedIndexVec.rgb==gradientReferenceColor.rgb){if(u_brightnessEnabled){gl_FragColor=texture2D(u_asciiBrightnessTexture,logicalFragCoord/u_resolution);}else{gl_FragColor=secondaryColor;}return;}}else if(u_layer==3){vec4 edgeColor=texture2D(u_edgesTexture,charIndexTexCoord);if(edgeColor.rgb==vec3(0.0)){if(u_brightnessEnabled){gl_FragColor=texture2D(u_asciiBrightnessTexture,logicalFragCoord/u_resolution);}else{gl_FragColor=secondaryColor;}return;}}vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=charIndex-(charIndex/int(u_charsetDimensions.x))*int(u_charsetDimensions.x);int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(float(charCol)/u_charsetDimensions.x,float(charRow)/u_charsetDimensions.y);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? secondaryColor : texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=vec4(primaryColor.rgb*charColor.rgb,charColor.a);gl_FragColor=mix(secondaryColor,finalColor,charColor.a);if(outsideBounds){gl_FragColor=u_invertMode==1 ? primaryColor : secondaryColor;}}"; // eslint-disable-line

    var colorSampleShader$2 = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;uniform float u_pixelRatio;void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 sampledColor=texture2D(u_sketchTexture,cellCenterTexCoord);gl_FragColor=sampledColor;}"; // eslint-disable-line

    var asciiCharacterShader$1 = "#version 100\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_textureSize;uniform float u_pixelRatio;void main(){vec2 pos=(floor(gl_FragCoord.xy/u_pixelRatio)+0.5)/u_textureSize;float brightness=dot(texture2D(u_colorSampleFramebuffer,pos).rgb,vec3(0.299,0.587,0.114));float index=clamp(floor(brightness*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);gl_FragColor=vec4(texture2D(u_charPaletteTexture,vec2((index+0.5)/u_charPaletteSize.x,0.0)).rgb,1.0);}"; // eslint-disable-line

    class BrightnessAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, options) {
            super(p5Instance, grid, characterSet, options);

            this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader$2);
            this.asciiCharacterShader = this.p5.createShader(vertexShader, asciiCharacterShader$1);
            this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

            this.colorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            super.resizeFramebuffers();
            this.colorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        render(inputFramebuffer) {
            if (!this.options.enabled) {
                this.outputFramebuffer = inputFramebuffer;
                return;
            }

            this.colorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.colorSampleFramebuffer.end();

            this.primaryColorSampleFramebuffer.begin();
            if (this.options.characterColorMode === 1) {
                this.p5.background(this.options.characterColor);
            } else {
                this.p5.clear();
                this.p5.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
            }
            this.primaryColorSampleFramebuffer.end();

            this.secondaryColorSampleFramebuffer.begin();
            if (this.options.backgroundColorMode === 1) {
                this.p5.background(this.options.backgroundColor);
            } else {
                this.p5.clear();
                this.p5.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
            }
            this.secondaryColorSampleFramebuffer.end();

            this.asciiCharacterFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.asciiCharacterShader);
            this.asciiCharacterShader.setUniform('u_textureSize', [this.grid.cols, this.grid.rows]);
            this.asciiCharacterShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.asciiCharacterShader.setUniform('u_colorSampleFramebuffer', this.colorSampleFramebuffer);
            this.asciiCharacterShader.setUniform('u_charPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
            this.asciiCharacterShader.setUniform('u_charPaletteSize', [this.characterSet.characterColorPalette.framebuffer.width, 1]);

            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.asciiCharacterFramebuffer.end();

            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_layer', 1);
            this.shader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
            this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
            this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
            this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
            this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    const generateCharacterSelectionShader = (sampleSize, totalChars) => `
#version 100
precision mediump float;

// Uniforms for character texture and its grid dimensions
uniform sampler2D u_characterTexture;
uniform float u_charsetCols;
uniform float u_charsetRows;

// Uniforms for the sketch texture and grid configurations
uniform sampler2D u_sketchTexture;
uniform vec2 u_gridPixelDimensions;      // Size of the grid in logical pixels
uniform vec2 u_gridCellDimensions;       // Number of cells in the grid (columns, rows)

// New Uniform for Pixel Ratio
uniform float u_pixelRatio;

// Constants
const float TOTAL_CHARS = ${totalChars}.0;
const float SAMPLE_SIZE = ${sampleSize}.0;
const float SAMPLE_COUNT = ${sampleSize * sampleSize}.0;

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);

    // Compute the grid cell coordinate (integer)
    vec2 cellCoord = floor(logicalFragCoord.xy);

    // Compute the size of each cell in logical pixels
    vec2 cellSizeInPixels = u_gridPixelDimensions / u_gridCellDimensions;

    // Compute the range of the cell in texture coordinates (0 to 1)
    vec2 cellStartTexCoord = (cellCoord * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellEndTexCoord = ((cellCoord + vec2(1.0)) * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellSizeTexCoord = cellEndTexCoord - cellStartTexCoord;

    float minError = 1.0e20; // Initialize to a large value
    int bestCharIndex = 0;

    // Precompute reciprocal of sample size
    float invSampleSize = 1.0 / SAMPLE_SIZE;

    // Iterate over each character in the charset
    for (int charIndex = 0; charIndex < ${totalChars}; charIndex++) {
        // Early exit if charIndex exceeds TOTAL_CHARS
        if (float(charIndex) >= TOTAL_CHARS) {
            break;
        }

        float error = 0.0;

        // Compute character row and column
        float charRow = floor(float(charIndex) / u_charsetCols);
        float charCol = float(charIndex) - u_charsetCols * charRow;

        // Base texture coordinates for the character
        vec2 charBaseCoord = vec2(charCol / u_charsetCols, charRow / u_charsetRows);
        vec2 charSize = vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);

        // Iterate over each sample within the cell
        for (int dy = 0; dy < ${sampleSize}; dy++) {
            for (int dx = 0; dx < ${sampleSize}; dx++) {
                // Compute normalized sample offset
                vec2 sampleOffset = (vec2(float(dx) + 0.5, float(dy) + 0.5)) * invSampleSize;

                // Sample coordinates in the sketch texture
                vec2 sketchSampleCoord = cellStartTexCoord + sampleOffset * cellSizeTexCoord;
                float sketchPixel = texture2D(u_sketchTexture, sketchSampleCoord).r;

                // Sample coordinates in the character texture
                vec2 charSampleCoord = charBaseCoord + sampleOffset * charSize;
                float charPixel = texture2D(u_characterTexture, charSampleCoord).r;

                // Accumulate squared error
                float diff = sketchPixel - charPixel;
                error += diff * diff;
            }
        }

        // Normalize the error
        error /= SAMPLE_COUNT;

        // Update the best character index if a lower error is found
        if (error < minError) {
            minError = error;
            bestCharIndex = charIndex;
        }
    }

    // Encode the bestCharIndex into two channels: red and green
    float lowerByte = mod(float(bestCharIndex), 256.0);
    float upperByte = floor(float(bestCharIndex) / 256.0);

    float encodedR = lowerByte / 255.0;
    float encodedG = upperByte / 255.0;

    gl_FragColor = vec4(encodedR, encodedG, 0.0, 1.0);
}
`;


    const generateBrightnessSampleShader = (samplesPerRow, samplesPerColumn) => `
#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;
uniform vec2 u_inputImageSize;
uniform int u_gridCols;
uniform int u_gridRows;
uniform float u_pixelRatio;

// Constants
const int SAMPLES_PER_ROW = ${samplesPerRow};
const int SAMPLES_PER_COL = ${samplesPerColumn};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);
    
    // Calculate the size of each grid cell in logical pixels
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position in the input image
    vec2 inputGridPos = logicalFragCoord * cellSize;

    // Initialize brightness accumulator
    float brightnessSum = 0.0;

    // Total number of samples
    float totalSamples = float(SAMPLES_PER_ROW * SAMPLES_PER_COL);

    // Iterate over sample points within the grid cell
    for(int i = 0; i < SAMPLES_PER_ROW; i++) {
        for(int j = 0; j < SAMPLES_PER_COL; j++) {
            // Calculate normalized texture coordinates for the sample
            vec2 offset = (vec2(float(i), float(j)) + 0.5) * (cellSize / vec2(float(SAMPLES_PER_ROW), float(SAMPLES_PER_COL)));
            vec2 texCoord = (inputGridPos + offset) / u_inputImageSize;

            // Clamp texture coordinates to [0, 1] to prevent sampling outside the image
            texCoord = clamp(texCoord, 0.0, 1.0);

            // Sample the color from the input image
            vec4 sampledColor = texture2D(u_inputImage, texCoord);

            // Calculate brightness using luminance formula
            float brightness = 0.299 * sampledColor.r + 0.587 * sampledColor.g + 0.114 * sampledColor.b;

            // Accumulate brightness
            brightnessSum += brightness;
        }
    }

    // Compute average brightness
    float averageBrightness = brightnessSum / totalSamples;

    // Output the average brightness as a grayscale color with full opacity
    gl_FragColor = vec4(vec3(averageBrightness), 1.0);
}

`;

    const generateColorSampleShader = (numSlots, samplesPerRow, samplesPerColumn) => `
#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;        // Original input image
uniform sampler2D u_inputImageBW;      // Black and white image
uniform vec2 u_inputImageSize;         // Size of the input image (e.g., 800.0, 800.0)
uniform int u_gridCols;                // Number of grid columns (e.g., 100)
uniform int u_gridRows;                // Number of grid rows (e.g., 100)
uniform int u_colorRank;               // Color rank (e.g., 1 or 2)
uniform float u_pixelRatio;            // Device pixel ratio

// Constants
const int NUM_SLOTS = ${numSlots};
const int SAMPLES_PER_ROW = ${samplesPerRow};
const int SAMPLES_PER_COL = ${samplesPerColumn};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);

    // Calculate the size of each grid cell in logical pixels
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position in the input image
    vec2 inputGridPos = logicalFragCoord * cellSize;

    // Calculate the center texture coordinate for saving the initial pixel color
    vec2 centerOffset = cellSize * 0.5;
    vec2 centerTexCoord = (inputGridPos + centerOffset) / u_inputImageSize;
    vec4 savedColor = texture2D(u_inputImage, centerTexCoord);

    // Initialize color slots and counts
    vec4 colors[NUM_SLOTS];
    float counts[NUM_SLOTS];
    for(int i = 0; i < NUM_SLOTS; i++) {
        colors[i] = vec4(0.0);
        counts[i] = 0.0;
    }

    // Iterate over sample points within the grid cell
    for(int i = 0; i < SAMPLES_PER_ROW; i++) {
        for(int j = 0; j < SAMPLES_PER_COL; j++) {
            // Calculate normalized texture coordinates for the sample
            vec2 offset = (vec2(float(i), float(j)) + 0.5) * (cellSize / vec2(float(SAMPLES_PER_ROW), float(SAMPLES_PER_COL)));
            vec2 texCoord = (inputGridPos + offset) / u_inputImageSize;

            // Clamp texture coordinates to [0, 1] to prevent sampling outside the image
            texCoord = clamp(texCoord, 0.0, 1.0);

            // Sample the color from the input image
            vec4 sampledColor = texture2D(u_inputImage, texCoord);

            // Sample the corresponding pixel from the black and white image
            vec4 bwColor = texture2D(u_inputImageBW, texCoord);
            float isWhite = step(0.5, bwColor.r); // Assuming grayscale, check if red channel is >= 0.5

            // Determine if the current pixel should be considered based on u_colorRank
            bool shouldConsider = false;
            if(u_colorRank == 1 && isWhite > 0.5) {
                shouldConsider = true;
            }
            else if(u_colorRank == 2 && isWhite <= 0.5) {
                shouldConsider = true;
            }

            // Skip this pixel if it doesn't meet the criteria
            if(!shouldConsider) {
                continue;
            }

            // Find a matching color slot
            bool matched = false;
            for(int k = 0; k < NUM_SLOTS; k++) {
                if(sampledColor.rgb == colors[k].rgb) {
                    counts[k] += 1.0;
                    matched = true;
                    break;
                }
            }

            // Assign to a new slot if no match is found
            if(!matched) {
                for(int k = 0; k < NUM_SLOTS; k++) {
                    if(counts[k] == 0.0) {
                        colors[k] = sampledColor;
                        counts[k] = 1.0;
                        break;
                    }
                }
            }
        }
    }

    // Track the top color based on counts
    float topCount = 0.0;
    vec4 topColor = vec4(0.0);

    for(int k = 0; k < NUM_SLOTS; k++) {
        float currentCount = counts[k];
        vec4 currentColor = colors[k];

        if(currentCount > topCount) {
            topCount = currentCount;
            topColor = currentColor;
        }
    }

    // If u_colorRank is 2 and no pixels were considered, use the savedColor instead of black
    if(u_colorRank == 2 && topCount == 0.0) {
        topColor = savedColor;
    }

    // Output the color with full opacity
    gl_FragColor = vec4(topColor.rgb, 1.0);
}
`;

    var brightnessSplitShader = "#version 100\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;uniform float u_pixelRatio;const float EPSILON=0.01;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);float gridX=floor(logicalFragCoord.x/cellWidth);float gridY=floor(logicalFragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;vec2 imageTexCoord=logicalFragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue;if(brightnessDifference<-EPSILON){finalColorValue=0.0;}else{finalColorValue=1.0;}gl_FragColor=vec4(vec3(finalColorValue),1.0);}"; // eslint-disable-line

    class AccurateAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, options) {
            super(p5Instance, grid, characterSet, options);

            this.characterSelectionShader = this.p5.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length));
            this.brightnessSampleShader = this.p5.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
            this.colorSampleShader = this.p5.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
            this.brightnessSplitShader = this.p5.createShader(vertexShader, brightnessSplitShader);
            this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

            this.brightnessSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.brightnessSplitFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            super.resizeFramebuffers();
            this.brightnessSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        resetShaders() {
            this.characterSelectionShader = this.p5.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length));
            this.brightnessSampleShader = this.p5.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
            this.colorSampleShader = this.p5.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        }

        render(inputFramebuffer) {

            if (!this.options.enabled) {
                this.outputFramebuffer = inputFramebuffer;
                return;
            }

            this.brightnessSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.brightnessSampleShader);
            this.brightnessSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.brightnessSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.brightnessSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.brightnessSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.brightnessSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.brightnessSampleFramebuffer.end();

            this.brightnessSplitFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.brightnessSplitShader);
            this.brightnessSplitShader.setUniform('u_inputImage', inputFramebuffer);
            this.brightnessSplitShader.setUniform('u_brightnessTexture', this.brightnessSampleFramebuffer);
            this.brightnessSplitShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.brightnessSplitShader.setUniform('u_gridCols', this.grid.cols);
            this.brightnessSplitShader.setUniform('u_gridRows', this.grid.rows);
            this.brightnessSplitShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.brightnessSplitFramebuffer.end();

            this.primaryColorSampleFramebuffer.begin();
            if (this.options.characterColorMode === 1) {
                this.p5.background(this.options.characterColor);
            } else {
                this.p5.clear();
                this.p5.shader(this.colorSampleShader);
                this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
                this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
                this.colorSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
                this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
                this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
                this.colorSampleShader.setUniform('u_colorRank', 1);
                this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
                this.p5.rect(0, 0, this.p5.width, this.p5.height);
            }
            this.primaryColorSampleFramebuffer.end();

            this.secondaryColorSampleFramebuffer.begin();
            if (this.options.backgroundColorMode === 1) {
                this.p5.background(this.options.backgroundColor);
            } else {
                this.p5.clear();
                this.p5.shader(this.colorSampleShader);
                this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
                this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
                this.colorSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
                this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
                this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
                this.colorSampleShader.setUniform('u_colorRank', 2);
                this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
                this.p5.rect(0, 0, this.p5.width, this.p5.height);
            }
            this.secondaryColorSampleFramebuffer.end();

            this.asciiCharacterFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.characterSelectionShader);
            this.characterSelectionShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
            this.characterSelectionShader.setUniform('u_charsetCols', this.characterSet.asciiFontTextureAtlas.charsetCols);
            this.characterSelectionShader.setUniform('u_charsetRows', this.characterSet.asciiFontTextureAtlas.charsetRows);
            this.characterSelectionShader.setUniform('u_sketchTexture', this.brightnessSplitFramebuffer);
            this.characterSelectionShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.characterSelectionShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.characterSelectionShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.asciiCharacterFramebuffer.end();

            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_layer', 1);
            this.shader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
            this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
            this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
            this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
            this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    // renderers/BrightnessAsciiRenderer.js

    class CustomAsciiRenderer extends AsciiRenderer {
        
        constructor(p5Instance, grid, characterSet, primaryColorSampleFramebuffer, secondaryColorFrameBuffer, asciiCharacterFramebuffer, options) {
            super(p5Instance, grid, characterSet, options);

            this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

            this.primaryColorSampleFramebuffer = primaryColorSampleFramebuffer;
            this.secondaryColorSampleFramebuffer = secondaryColorFrameBuffer;
            this.asciiCharacterFramebuffer = asciiCharacterFramebuffer;
        }

        render(inputFramebuffer) {
            if (!this.options.enabled) {
                this.outputFramebuffer = inputFramebuffer;
                return;
            }

            if(this.options.characterColorMode === 1) {
                this.primaryColorSampleFramebuffer.begin();
                this.p5.background(this.options.characterColor);
                this.primaryColorSampleFramebuffer.end();
            }

            if(this.options.backgroundColorMode === 1) {
                this.secondaryColorSampleFramebuffer.begin();
                this.p5.background(this.options.backgroundColor);
                this.secondaryColorSampleFramebuffer.end();
            } 

            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_layer', 1);
            this.shader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
            this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
            this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
            this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
            this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    var grayscaleShader = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);float luminance=0.299*color.r+0.587*color.g+0.114*color.b;color.rgb=vec3(luminance);gl_FragColor=color;}"; // eslint-disable-line

    var colorSampleShader$1 = "#version 100\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_sketchTexture;uniform bool u_previousRendererEnabled;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;uniform float u_pixelRatio;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isMatchingSample=texture2D(u_sampleTexture,cellCenterTexCoord)==texture2D(u_sampleReferenceTexture,cellCenterTexCoord);if(isMatchingSample&&u_previousRendererEnabled){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);return;}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}"; // eslint-disable-line

    class GradientAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, gradientManager, options) {
            super(p5Instance, grid, characterSet, options);

            this.gradientManager = gradientManager;

            this.grayscaleShader = this.p5.createShader(vertexShader, grayscaleShader);

            this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader$1);

            this.asciiShader = this.p5.createShader(vertexShader, asciiConversionShader);

            this.grayscaleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.prevAsciiCharacterFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.asciiCharacterFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            super.resizeFramebuffers();
            this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.prevAsciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        render(inputFramebuffer, previousAsciiRenderer) {

            if (!this.options.enabled || this.gradientManager._gradients.length === 0) {
                if (previousAsciiRenderer.options.enabled) {
                    this.outputFramebuffer = previousAsciiRenderer.getOutputFramebuffer();
                } else {
                    this.outputFramebuffer = inputFramebuffer;
                }

                this.asciiCharacterFramebuffer.begin();
                this.p5.clear();
                this.p5.image(previousAsciiRenderer.asciiCharacterFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
                this.asciiCharacterFramebuffer.end();

                this.primaryColorSampleFramebuffer.begin();
                this.p5.clear();
                this.p5.image(previousAsciiRenderer.primaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
                this.primaryColorSampleFramebuffer.end();

                this.secondaryColorSampleFramebuffer.begin();
                this.p5.clear();
                this.p5.image(previousAsciiRenderer.secondaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
                this.secondaryColorSampleFramebuffer.end();

                return;
            }

            this.grayscaleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.grayscaleShader);
            this.grayscaleShader.setUniform('u_image', inputFramebuffer);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.grayscaleFramebuffer.end();

            this.prevAsciiCharacterFramebuffer.begin();
            this.p5.clear();
            this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.prevAsciiCharacterFramebuffer.end();

            this.asciiCharacterFramebuffer.begin();
            this.p5.clear();
            this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.asciiCharacterFramebuffer.end();

            for (let i = 0; i < this.gradientManager._gradients.length; i++) {
                const gradient = this.gradientManager._gradients[i];

                if (gradient.enabled) {
                    [this.prevAsciiCharacterFramebuffer, this.asciiCharacterFramebuffer] = [this.asciiCharacterFramebuffer, this.prevAsciiCharacterFramebuffer];

                    this.asciiCharacterFramebuffer.begin();
                    this.p5.clear();
                    this.p5.shader(gradient._shader);
                    gradient.setUniforms(this.p5, this.prevAsciiCharacterFramebuffer, this.grayscaleFramebuffer);
                    this.p5.rect(0, 0, this.grid.cols, this.grid.rows);
                    this.asciiCharacterFramebuffer.end();
                }
            }

            this.primaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
            this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
            this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.colorSampleShader.setUniform('u_sampleMode', this.options.characterColorMode);
            this.colorSampleShader.setUniform('u_staticColor', this.options.characterColor._array);
            this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.primaryColorSampleFramebuffer.end();

            this.secondaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
            this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
            this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
            this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.secondaryColorSampleFramebuffer.end();

            this.outputFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.asciiShader);
            this.asciiShader.setUniform('u_layer', 2);
            this.asciiShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.asciiShader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.asciiShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
            this.asciiShader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
            this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
            this.asciiShader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
            this.asciiShader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
            this.asciiShader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', previousAsciiRenderer.getOutputFramebuffer());
            this.asciiShader.setUniform('u_brightnessEnabled', previousAsciiRenderer.options.enabled);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_invertMode', this.options.invertMode);
            this.asciiShader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }

        getOutputFramebuffer() {
            return this.outputFramebuffer;
        }
    }

    var colorSampleShader = "#version 100\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_sketchTexture;uniform bool u_previousRendererEnabled;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;uniform float u_pixelRatio;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isBlackSample=texture2D(u_sampleTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0);if(isBlackSample&&u_previousRendererEnabled){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}"; // eslint-disable-line

    var asciiCharacterShader = "#version 100\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_sketchTexture;uniform sampler2D u_colorPaletteTexture;uniform sampler2D u_previousAsciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform int u_totalChars;uniform float u_pixelRatio;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;if(texture2D(u_sketchTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0)){gl_FragColor=texture2D(u_previousAsciiCharacterTexture,cellCenterTexCoord);return;}vec4 sketchColor=texture2D(u_sketchTexture,cellCenterTexCoord);float brightness=dot(sketchColor.rgb,vec3(0.299,0.587,0.114));int charIndex=int(brightness*float(u_totalChars));if(charIndex>u_totalChars-1){charIndex=u_totalChars-1;}float paletteCoord=(float(charIndex)+0.5)/float(u_totalChars);gl_FragColor=texture2D(u_colorPaletteTexture,vec2(paletteCoord,0.5));}"; // eslint-disable-line

    var sobelShader = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);float angleDeg=degrees(atan(sobelY.r,sobelX.r));vec3 edgeColor=vec3(0.0);if(intensity>u_threshold){if(angleDeg>=-22.5&&angleDeg<22.5){edgeColor=vec3(0.1);}else if(angleDeg>=22.5&&angleDeg<67.5){edgeColor=vec3(0.2);}else if(angleDeg>=67.5&&angleDeg<112.5){edgeColor=vec3(0.3);}else if(angleDeg>=112.5&&angleDeg<157.5){edgeColor=vec3(0.4);}else if(angleDeg>=157.5||angleDeg<-157.5){edgeColor=vec3(0.6);}else if(angleDeg>=-157.5&&angleDeg<-112.5){edgeColor=vec3(0.7);}else if(angleDeg>=-112.5&&angleDeg<-67.5){edgeColor=vec3(0.8);}else if(angleDeg>=-67.5&&angleDeg<-22.5){edgeColor=vec3(0.9);}}gl_FragColor=vec4(edgeColor,1.0);}"; // eslint-disable-line

    const generateSampleShader = (MAX_HISTOGRAM_SIZE, SAMPLES_PER_ROW, SAMPLES_PER_COL) => `
#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_image;
uniform vec2 u_imageSize;             // Size of the input image in logical pixels (width, height)
uniform vec2 u_gridCellDimensions;    // Number of cells in the grid (columns, rows)
uniform int u_threshold;              // Threshold for non-black pixel count
uniform float u_pixelRatio;           // Device pixel ratio

// Constants
const vec3 BLACK = vec3(0.0, 0.0, 0.0);
const int MAX_HISTOGRAM_SIZE = ${MAX_HISTOGRAM_SIZE};
const int SAMPLES_PER_ROW = ${SAMPLES_PER_ROW};
const int SAMPLES_PER_COL = ${SAMPLES_PER_COL};

// Histograms
vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
int countHistogram[MAX_HISTOGRAM_SIZE];

// Utility function for rounding
float roundFloat(float value) {
    return floor(value + 0.5);
}

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);
    
    // Retrieve grid cell indices
    ivec2 coords = ivec2(logicalFragCoord);
    int gridX = coords.x;
    int gridY = coords.y;

    // Compute the size of each grid cell in logical pixels
    vec2 cellSizeInPixels = u_imageSize / u_gridCellDimensions;

    // Calculate the origin of the cell in the image
    ivec2 cellOrigin = ivec2(roundFloat(float(gridX) * cellSizeInPixels.x), roundFloat(float(gridY) * cellSizeInPixels.y));
    int nonBlackCount = 0;

    // Initialize histograms
    for (int i = 0; i < MAX_HISTOGRAM_SIZE; i++) {
        colorHistogram[i] = BLACK;
        countHistogram[i] = 0;
    }

    // Iterate over the cell and populate the histograms
    for (int i = 0; i < SAMPLES_PER_COL; i++) {
        for (int j = 0; j < SAMPLES_PER_ROW; j++) {
            ivec2 pixelCoords = cellOrigin + ivec2(j, i); // Note: j corresponds to x, i to y
            
            // Check bounds
            if (pixelCoords.x < 0 || pixelCoords.y < 0 || 
                pixelCoords.x >= int(u_imageSize.x) || pixelCoords.y >= int(u_imageSize.y)) {
                continue;
            }
            
            // Normalize pixel coordinates for texture sampling
            vec2 normalizedCoords = (vec2(pixelCoords) + 0.5) / u_imageSize; // +0.5 for pixel center
            vec3 color = texture2D(u_image, normalizedCoords).rgb;

            // Ignore black pixels
            if (distance(color, BLACK) < 0.001) { // Using epsilon for comparison
                continue;
            }

            nonBlackCount++;

            // Check if the color already exists in the histogram
            bool found = false;
            for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
                if (distance(color, colorHistogram[k]) < 0.001) { // Using epsilon for comparison
                    countHistogram[k]++;
                    found = true;
                    break;
                }
            }

            // If the color was not found, add it to the histogram at the first available slot
            if (!found) {
                for (int m = 0; m < MAX_HISTOGRAM_SIZE; m++) {
                    if (countHistogram[m] == 0) {
                        colorHistogram[m] = color;
                        countHistogram[m] = 1;
                        break;
                    }
                }
            }
        }
    }

    vec3 mostFrequentColor = BLACK;
    int highestCount = 0;

    // Find the most frequent color
    for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
        if (countHistogram[k] > highestCount) {
            mostFrequentColor = colorHistogram[k];
            highestCount = countHistogram[k];
        }
    }

    // If the number of non-black pixels is below the threshold, output black; otherwise, output the most frequent color
    if (nonBlackCount < u_threshold) {
        gl_FragColor = vec4(BLACK, 1.0);
    } else {
        gl_FragColor = vec4(mostFrequentColor, 1.0);
    }
}

`;

    class EdgeAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, options) {
            super(p5Instance, grid, characterSet, options);

            this.sobelShader = this.p5.createShader(vertexShader, sobelShader);
            this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
            this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);
            this.asciiCharacterShader = this.p5.createShader(vertexShader, asciiCharacterShader);
            this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

            this.sobelFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.sampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            super.resizeFramebuffers();
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        resetShaders() {
            this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        }

        render(inputFramebuffer, previousAsciiRenderer) {

            if (!this.options.enabled) {
                if (previousAsciiRenderer.options.enabled) {
                    this.outputFramebuffer = previousAsciiRenderer.getOutputFramebuffer();
                } else {
                    this.outputFramebuffer = inputFramebuffer;
                }

                this.asciiCharacterFramebuffer.begin();
                this.p5.clear();
                this.p5.image(previousAsciiRenderer.asciiCharacterFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
                this.asciiCharacterFramebuffer.end();

                this.primaryColorSampleFramebuffer.begin();
                this.p5.clear();
                this.p5.image(previousAsciiRenderer.primaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
                this.primaryColorSampleFramebuffer.end();

                this.secondaryColorSampleFramebuffer.begin();
                this.p5.clear();
                this.p5.image(previousAsciiRenderer.secondaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
                this.secondaryColorSampleFramebuffer.end();

                return;
            }

            // Apply Sobel shader for edge detection
            this.sobelFramebuffer.begin();
            this.p5.shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', inputFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [this.p5.width, this.p5.height]);
            this.sobelShader.setUniform('u_threshold', this.options.sobelThreshold);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.sobelFramebuffer.end();

            // Apply sample shader
            this.sampleFramebuffer.begin();
            this.p5.shader(this.sampleShader);
            this.sampleShader.setUniform('u_imageSize', [this.p5.width, this.p5.height]);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.options.sampleThreshold);
            this.sampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.sampleFramebuffer.end();

            this.primaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
            this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.colorSampleShader.setUniform('u_sampleMode', this.options.characterColorMode);
            this.colorSampleShader.setUniform('u_staticColor', this.options.characterColor._array);
            this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.primaryColorSampleFramebuffer.end();

            this.secondaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
            this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
            this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
            this.colorSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.secondaryColorSampleFramebuffer.end();

            this.asciiCharacterFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.asciiCharacterShader);
            this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
            this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
            this.asciiCharacterShader.setUniform('u_previousAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
            this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
            this.asciiCharacterShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.asciiCharacterFramebuffer.end();

            // Render ASCII using the edge shader
            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_layer', 3);
            this.shader.setUniform('u_pixelRatio', this.p5.pixelDensity());
            this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
            this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
            this.shader.setUniform('u_asciiBrightnessTexture', previousAsciiRenderer.getOutputFramebuffer());
            this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
            this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
            this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
            this.shader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.shader.setUniform('u_brightnessEnabled', previousAsciiRenderer.options.enabled);
            this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    //import CubeAsciiRenderer3D from './renderers/layer4/cubeAsciiRenderer3D/CubeAsciiRenderer3D.js';

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

        postSetupFunction = null;
        postDrawFunction = null;

        instance(p) {
            this.p5Instance = p;

            this.p5Instance.preload = () => { }; // Define a default preload function in case the user doesn't provide one
        }

        /**
         * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
         */
        setup() {
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

            this.customPrimaryColorSampleFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
            this.customSecondaryColorSampleFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
            this.customAsciiCharacterFramebuffer = this.p5Instance.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

            this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
            this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
            this.customAsciiRenderer = new CustomAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.customPrimaryColorSampleFramebuffer, this.customSecondaryColorSampleFramebuffer, this.customAsciiCharacterFramebuffer, this.asciiOptions);

            this.gradientRenderer = new GradientAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.gradientManager, this.gradientOptions);

            this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeOptions);

            //this.cubeAsciiRenderer3D = new CubeAsciiRenderer3D(this.p5Instance, this.grid, this.edgeCharacterSet, this.edgeRenderer, this.asciiOptions);

            this.textAsciiRenderer = this.p5Instance.createDiv('');
            this.textAsciiRenderer.style('position', 'absolute');
            this.textAsciiRenderer.style('top', '0');
            this.textAsciiRenderer.style('left', '0');
            this.textAsciiRenderer.style('width', '100%');
            this.textAsciiRenderer.style('height', '100%');
            this.textAsciiRenderer.style('font-family', 'monospace');
            this.textAsciiRenderer.style('font-size', `${this.commonOptions.fontSize}px`);
            this.textAsciiRenderer.style('line-height', '1');
            this.textAsciiRenderer.style('@font-face', `
            font-family: 'UrsaFont';
            src: url('UrsaFont.ttf') format('opentype');
        `);
            this.textAsciiRenderer.style('font-family', 'UrsaFont');
            this.textAsciiRenderer.style('display', 'flex');
            this.textAsciiRenderer.style('justify-content', 'center');
            this.textAsciiRenderer.style('align-items', 'center');
            this.textAsciiRenderer.style('background-color', 'black');

            const styles = `
    .ascii-art {
        line-height: 1;
        color: #fff; /* Default text color */
        text-align: center; /* Center the text horizontally */
    }
`;

            if (!document.getElementById('p5-asciify-styles')) {
                const styleTag = document.createElement('style');
                styleTag.id = 'p5-asciify-styles';
                styleTag.innerHTML = styles;
                document.head.appendChild(styleTag);
            }

            // Set additional styles for textAsciiRenderer


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
            let asciiOutput = this.sketchFramebuffer;

            this.asciiRenderer.render(this.sketchFramebuffer);
            asciiOutput = this.asciiRenderer.getOutputFramebuffer();

            this.gradientRenderer.render(this.sketchFramebuffer, this.asciiRenderer);
            asciiOutput = this.gradientRenderer.getOutputFramebuffer();

            this.edgeRenderer.render(this.sketchFramebuffer, this.gradientRenderer);
            asciiOutput = this.edgeRenderer.getOutputFramebuffer();

            //this.cubeAsciiRenderer3D.render();
            //asciiOutput = this.cubeAsciiRenderer3D.getOutputFramebuffer();

            this.p5Instance.clear();
            this.p5Instance.image(asciiOutput, -this.p5Instance.width / 2, -this.p5Instance.height / 2, this.p5Instance.width, this.p5Instance.height);

            if (this.postDrawFunction) {
                this.postDrawFunction();
            }

            this.outputAsciiToHtml();

            this.checkFramebufferDimensions();
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
        
            // Use an array to build the HTML content for better performance
            const rows = [];
        
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
        
                    // Append the styled character
                    row += `<span style="color: rgb(${pr},${pg},${pb}); background-color: rgb(${sr},${sg},${sb});">${ch}</span>`;
                }
                rows.push(row);
            }
        
            // Join all rows with <br> to preserve line breaks
            const htmlContent = `<div class="ascii-art">${rows.join('<br>')}</div>`;
        
            // Update the HTML content without creating new elements
            this.textAsciiRenderer.html(htmlContent);
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
    }

    /**
     * @class P5AsciifyUtils
     * @description
     * A utility class for the P5Asciify library.
     * Provides static methods for various common tasks such as color conversion and version comparison.
     */
    class P5AsciifyUtils {

        /**
         * Compares two version strings.
         * @param {string} v1 - The first version string (e.g., "1.2.3").
         * @param {string} v2 - The second version string (e.g., "1.2.4").
         * @returns {number} 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
         */
        static compareVersions(v1, v2) {
            const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

            for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
                const [v1Part, v2Part] = [v1Parts[i] ?? 0, v2Parts[i] ?? 0];
                if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
            }

            return 0;
        }
    }

    var URSAFONT_BASE64 = "data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAABAAAgAQAAIAEAACABAAAAAQAAIAEAAAABAAAAAQAAIAEAAGABAAAAAQAAAAEAAAABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAEABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAQAAIAEAAAABAAAAAQAAAAEAACABAABAAQAAQAEAAEABAABAAQAAIAEAACABAAAAAQAAAAEAAAABAABAAQAAAAEAACABAAAAAQAAAAEAAIABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAYAEAAAABAAAAAQAAQAEAACABAAAAAQAAAAEAAAABAAAgAQAAIAEAACABAAAgAQAAIAEAAAABAABAAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAAAAAIAAAADAAAAFAADAAEAAASaAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAABwAAABIAAAAegAAALwAAADuAAAA9wAAARQAAAExAAABWgAAAW0AAAF7AAABhAAAAY0AAAGvAAAB0gAAAecAAAIOAAACNQAAAk8AAAJsAAACjgAAAqYAAALOAAAC5gAAAvQAAAMHAAADLgAAAzwAAANjAAADhQAAA6UAAAPCAAAD4AAAA/0AAAQaAAAEPAAABEwAAARrAAAEfgAABJEAAASpAAAE0AAABNsAAAT4AAAFFQAABS0AAAVDAAAFZQAABYcAAAWuAAAFvAAABc8AAAXnAAAGBAAABisAAAZDAAAGZQAABnMAAAaVAAAGowAABsUAAAbOAAAG3gAABvYAAAcMAAAHKQAABz8AAAdaAAAHbQAAB4oAAAedAAAHqwAAB8MAAAfgAAAH7gAACAsAAAgjAAAIOwAACFEAAAhsAAAIfAAACJkAAAi2AAAIzgAACOYAAAkDAAAJKgAACUIAAAlfAAAJfAAACYUAAAmiAAAJugAACdcAAAngAAAKBwAACi4AAApgAAAKeQAACokAAAq4AAAKwQAACs8AAArYAAAK8QAACw4AAAshAAALSAAAC1gAAAt1AAALjQAAC5sAAAu0AAALzQAAC9YAAAvhAAAL6gAAC/4AAAwRAAAMJAAADDQAAAxHAAAMUgAADGoAAAyCAAAMlwAADKUAAAy/AAAM0gAADN0AAAz8AAANDwAADSkAAA0yAAANTAAADVUAAA1jAAANfAAADYcAAA2VAAANqQAADcIAAA3mAAAN7wAADg4AAA4XAAAOQQAADloAAA5qAAAOcwAADoYAAA6PAAAOogAADrIAAA7FAAAPCwAADxsAAA8uAAAPRwAAD1AAAA+HAAAPoAAAD6kAAA/CAAAP3wAAD/wAABAZAAAQNgAAEE4AABBfAAAQlQAAEJ4AABCxAAAQugAAEOEAABEnAAARUwAAEWYAABF+AAARlgAAEbgAABJrAAASfgAAEpEAABKpAAASwQAAEswAABLcAAATCAAAExMAABMrAAATQwAAE1sAABNzAAATmgAAE8YAABPeAAAT5wAAE/AAABQSAAAUKgAAFEIAABRaAAAUYwAAFGwAABSOAAAUngAAFLsAABTYAAAU/wAAFSEAABVNAAAVZQAAFX0AABWVAAAVngAAFacAABXTAAAWBAAAFg0AABYvAAAWOgAAFkUAABZxAAAWhAAAFpIAABagAAAWrgAAFrwAABbVAAAW7QAAFxkAABd0AAAXzwAAF/wAABgUAAAYJQAAGC4AABhBAAAYXgAAGHEAABiYAAAYvAAAGOAAABkYAAAZPwAAGWYAABmNAAAZtAAAGdYAABn9AAAaEAAAGi0AAIBgACAAoAEAAADAAcAAAEBAQEBAQEBAYABAAAA/wAAAAEAAAD/AAQAAAD+AAAA/4AAAP8AAAAAAgEAAoADgAQAAAMABwAAAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8ABAAAAP6AAAABgAAA/oAAAAACAIAAgAQAA4AAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAABAAAAAIAAAP+AAAAAgAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAA/4AAAACAAQAAAACAAAADgAAA/4AAAACAAAD/gAAA/4AAAP8AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAABAAAAAIAAAP+A/wAAAAEAAAMAgACABAAEAAAbAB8AIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAABAAAAAIAAAP+AAAD/AAAA/4AAAP8AAAABAAAA/wAAAP+AAAAAgAAAAQD/gAAAAIAAAACAAAAAgAAABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAABQCAAIAEAAOAAAUAHQAjACkALwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAA/4AAAP+AAgABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r\n";

    const p5asciify = new P5Asciify();

    // Expose P5Asciify to the global scope if not in a module environment
    if (typeof window !== 'undefined' && !window.P5Asciify) {
        window.p5asciify = p5asciify;  // Expose p5asciify instance
        window.preload = function () { };
    }

    p5.prototype.setupP5Instance = function () {
        if (!p5asciify.p5Instance) {
            p5asciify.p5Instance = this;
        }

        p5asciify.gradientManager.addInstance(p5asciify.p5Instance);
    };
    p5.prototype.registerMethod("init", p5.prototype.setupP5Instance);

    /**
     * Preloads the ASCII font for the P5Asciify library.
     * This method increments the preload count and loads the font from a base64 encoded string.
     * If the font is successfully loaded, it assigns the font to P5Asciify.font.
     * If the font fails to load, it throws a P5AsciifyError.
     * Not intended to be called directly by the user, as it is performed automatically before preload.
     *
     * @function preloadAsciiFont
     * @memberof p5
     * @throws {P5AsciifyError} Throws an error if the font fails to load.
     */
    p5.prototype.preloadAsciiFont = function () {
        p5asciify.p5Instance._incrementPreload();
        p5asciify.font = p5asciify.p5Instance.loadFont(
            URSAFONT_BASE64,
            (loadedFont) => {
                p5asciify.font = loadedFont;
            },
            () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
        );
    };
    p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

    /**
     * Loads an ASCII font for the P5Asciify library.
     * This method sets the font for P5Asciify from a specified path or font object.
     * If a string path is provided, it loads the font from that path.
     * If a font object is provided, it directly sets the font.
     * After loading, it decrements the preload count and updates the character sets and grid dimensions.
     *
     * @function loadAsciiFont
     * @memberof p5
     * @param {string|Object} font - The path to the font file or the font object.
     * @throws {P5AsciifyError} Throws an error if the font fails to load or if the font parameter is invalid.
     * 
     * @example
     * Loading a font from a path
     * loadAsciiFont('path/to/font.ttf');
     *
     * @example
     * Loading a font from an object
     * const fontObject = ...; // Assume this is a valid font object
     * loadAsciiFont(fontObject);
     */
    p5.prototype.loadAsciiFont = function (font) {
        const setFont = (loadedFont) => {
            p5asciify.font = loadedFont;
            p5asciify.p5Instance._decrementPreload();
            if (p5asciify.p5Instance.frameCount > 0) {
                p5asciify.asciiFontTextureAtlas.setFontObject(loadedFont);
                p5asciify.grid.resizeCellPixelDimensions(
                    p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.width,
                    p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.height
                );

                p5asciify.asciiCharacterSet.setCharacterSet(p5asciify.asciiCharacterSet.characters);
                p5asciify.edgeCharacterSet.setCharacterSet(p5asciify.edgeCharacterSet.characters);
            }
        };

        if (typeof font === 'string') {
            p5asciify.p5Instance.loadFont(
                font,
                (loadedFont) => { setFont(loadedFont); },
                () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
            );
        } else if (typeof font === 'object') {
            setFont(font);
        } else {
            throw new P5AsciifyError(`loadAsciiFont() | Invalid font parameter. Expected a string or an object.`);
        }
    };
    p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);

    /**
     * Sets up the P5Asciify library for use with p5.js.
     * This method ensures that the WebGL renderer is being used and that the p5.js version is compatible.
     * If the requirements are met, it initializes the P5Asciify setup.
     * Not intended to be called directly by the user, as it is performed automatically after setup.
     *
     * @function setupAsciifier
     * @memberof p5
     * @throws {P5AsciifyError} Throws an error if the WebGL renderer is not used or if the p5.js version is below 1.8.0.
     * 
     * @example
     * Setting up the asciifier
     * p5.prototype.setupAsciifier();
     */
    p5.prototype.setupAsciifier = function () {

        if (p5asciify.p5Instance._setupDone) { // instance mode necessitates this check

            if (p5asciify.p5Instance._renderer.drawingContext instanceof CanvasRenderingContext2D) {
                throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
            }

            if (P5AsciifyUtils.compareVersions(p5asciify.p5Instance.VERSION, "1.8.0") < 0) {
                throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
            }

            p5asciify.setup();
        }
    };
    p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

    p5.prototype.resetAsciiGrid = function () {
        p5asciify.grid.reset();
        p5asciify.sampleFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
    };

    p5.prototype.setAsciifyPostSetupFunction = function (postSetupFunction) {
        p5asciify.postSetupFunction = postSetupFunction;
    };

    p5.prototype.setAsciifyPostDrawFunction = function (postDrawFunction) {
        p5asciify.postDrawFunction = postDrawFunction;
    };

    /**
     * Sets the default options for the P5Asciify library.
     *
     * @function setAsciiOptions
     * @memberof p5
     * @param {Object} options - An object containing the options to set for ASCII rendering.
     * 
     * @example
     * TODO: Add example
     */
    p5.prototype.setAsciiOptions = function (options) {
        const validOptions = ["common", "edge", "ascii", "gradient"];
        const unknownOptions = Object.keys(options).filter(option => !validOptions.includes(option));

        if (unknownOptions.length) {
            console.warn(`P5Asciify: Unknown options detected (${unknownOptions.join(', ')}). Refer to the documentation for valid options.`);
            unknownOptions.forEach(option => delete options[option]);
        }

        const VALID_RENDER_MODES = ['brightness', 'accurate', 'custom'];
        if (options?.ascii?.renderMode && !VALID_RENDER_MODES.includes(options.ascii.renderMode)) {
            console.warn(`P5Asciify: Invalid render mode '${options.ascii.renderMode}'. Defaulting to 'brightness'.`);
            options.ascii.renderMode = 'brightness';
        }

        const { ascii: asciiOptions, edge: edgeOptions, common: commonOptions, gradient: gradientOptions } = options;

        const colorOptions = [edgeOptions, asciiOptions, gradientOptions];
        colorOptions.forEach(opt => {
            if (opt?.characterColor) opt.characterColor = this.color(opt.characterColor);
            if (opt?.backgroundColor) opt.backgroundColor = this.color(opt.backgroundColor);
        });

        if (commonOptions?.fontSize && (commonOptions.fontSize < 1 || commonOptions.fontSize > 128)) {
            console.warn(`P5Asciify: Font size ${commonOptions.fontSize} is out of bounds. It should be between 1 and 128. Font size not updated.`);
            delete commonOptions.fontSize;
        }

        if (edgeOptions?.characters !== undefined && edgeOptions.characters.length !== 8) {
            console.warn(`P5Asciify: The edge character set must contain exactly 8 characters. Character set not updated.`);
            delete edgeOptions.characters;
        }

        p5asciify.setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions);
    };

    p5.prototype.addAsciiGradient = function (gradientName, brightnessStart, brightnessEnd, characters, userParams = {}) {

        if (!p5asciify.gradientManager.gradientConstructors[gradientName]) {
            throw new P5AsciifyError(`Gradient '${gradientName}' does not exist! Available gradients: ${Object.keys(P5Asciify.gradientManager.gradientConstructors).join(", ")}`);
        }

        if (typeof brightnessStart !== 'number' || brightnessStart < 0 || brightnessStart > 255) {
            throw new P5AsciifyError(`Invalid brightness start value '${brightnessStart}'. Expected a number between 0 and 255.`);
        }

        if (typeof brightnessEnd !== 'number' || brightnessEnd < 0 || brightnessEnd > 255) {
            throw new P5AsciifyError(`Invalid brightness end value '${brightnessEnd}'. Expected a number between 0 and 255.`);
        }

        if (typeof characters !== 'string') {
            throw new P5AsciifyError(`Invalid characters value '${characters}'. Expected a string.`);
        }

        // Check if the userParams exist and are valid
        const validParams = Object.keys(p5asciify.gradientManager.gradientParams[gradientName]);
        const invalidKeys = Object.keys(userParams).filter(key => !validParams.includes(key));
        if (invalidKeys.length > 0) {
            throw new P5AsciifyError(`Invalid parameter(s) for gradient '${gradientName}': ${invalidKeys.join(", ")}\nValid parameters are: ${validParams.join(", ")}`);
        }

        return p5asciify.gradientManager.addGradient(gradientName, brightnessStart, brightnessEnd, characters, userParams);
    };

    p5.prototype.removeAsciiGradient = function (gradientInstance) {
        p5asciify.gradientManager.removeGradient(gradientInstance);
    };

    /**
     * Adds a push() call before the user's draw() function in p5.js.
     * This method ensures that the drawing state is saved before any drawing operations.
     * Not intended to be called directly by the user, as it is performed automatically before draw.
     *
     * @function preDrawAddPush
     * @memberof p5
     * 
     * @example
     * Adding a push before draw
     * p5.prototype.preDrawAddPush();
     */
    p5.prototype.preDrawAddPush = function () {
        p5asciify.sketchFramebuffer.begin();
        p5asciify.p5Instance.push();
    };
    p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

    /**
     * Adds a pop() call after the user's draw() function in p5.js.
     * This method ensures that the drawing state is restored after all drawing operations.
     * Not intended to be called directly by the user, as it is performed automatically after draw.
     *
     * @function postDrawAddPop
     * @memberof p5
     */
    p5.prototype.postDrawAddPop = function () {
        p5asciify.p5Instance.pop();
        p5asciify.sketchFramebuffer.end();
    };
    p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

    /**
     * Applies the ASCII effect to the content drawn on the p5.js canvas.
     * This method calls the P5Asciify library to convert the canvas content into ASCII art after the user's draw() function is executed.
     * Not intended to be called directly by the user, as it is performed automatically after draw.
     *
     * @function asciify
     * @memberof p5
     */
    p5.prototype.asciify = function () { p5asciify.asciify(); };
    p5.prototype.registerMethod("post", p5.prototype.asciify);

    return p5asciify;

}));
