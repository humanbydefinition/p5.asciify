var K = Object.defineProperty;
var L = (o, A, e) => A in o ? K(o, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[A] = e;
var i = (o, A, e) => L(o, typeof A != "symbol" ? A + "" : A, e);
import Q from "p5";
class W {
  /**
   * Creates a new `P5AsciifyFontTextureAtlas` instance.
   * @param _p The p5 instance.
   * @param _fontManager The font manager to use for the texture atlas.
   * @param _fontSize The font size to use for the texture atlas.
   */
  constructor(A, e, r = 16) {
    /** Maximum width and height of the glyphs in the font. */
    i(this, "_maxGlyphDimensions");
    /** Texture containing all characters in the font. As square as possible. */
    i(this, "_texture");
    /** Number of columns in the texture. */
    i(this, "_charsetCols");
    /** Number of rows in the texture. */
    i(this, "_charsetRows");
    this._p = A, this._fontManager = e, this._fontSize = r, this.reset();
  }
  /**
   * Calculates the maximum width and height of all the glyphs in the font.
   * @param fontSize - The font size to use for calculations.
   * @returns An object containing the maximum width and height of the glyphs.
   */
  _getMaxGlyphDimensions(A) {
    return this._fontManager.characterGlyphs.reduce(
      (e, r) => {
        const t = r.getPath(0, 0, A).getBoundingBox();
        return {
          width: Math.ceil(Math.max(e.width, t.x2 - t.x1)),
          height: Math.ceil(Math.max(e.height, t.y2 - t.y1))
        };
      },
      { width: 0, height: 0 }
    );
  }
  /**
   * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
   */
  reset() {
    this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
   * @param fontSize - The new font size.
   */
  setFontSize(A) {
    this._fontSize = A, this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
   * @param fontSize - The font size to use for creating the texture.
   */
  _createTexture(A) {
    this._charsetCols = Math.ceil(Math.sqrt(this._fontManager.characters.length)), this._charsetRows = Math.ceil(this._fontManager.characters.length / this._charsetCols), this._texture ? this._texture.resize(this._maxGlyphDimensions.width * this._charsetCols, this._maxGlyphDimensions.height * this._charsetRows) : this._texture = this._p.createFramebuffer({
      width: this._maxGlyphDimensions.width * this._charsetCols,
      height: this._maxGlyphDimensions.height * this._charsetRows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._texture.begin(), this._p.clear(), this._drawCharacters(A), this._texture.end();
  }
  /**
   * Draws characters onto the texture.
   * @param fontSize - The font size to use for drawing the characters on the texture.
   */
  _drawCharacters(A) {
    this._p.textFont(this._fontManager.font), this._p.fill(255), this._p.textSize(A), this._p.textAlign(this._p.LEFT, this._p.TOP), this._p.noStroke();
    for (let e = 0; e < this._fontManager.characterGlyphs.length; e++) {
      const r = e % this._charsetCols, t = Math.floor(e / this._charsetCols), s = this._maxGlyphDimensions.width * r - this._maxGlyphDimensions.width * this._charsetCols / 2, g = this._maxGlyphDimensions.height * t - this._maxGlyphDimensions.height * this._charsetRows / 2;
      this._p.text(String.fromCharCode(this._fontManager.characterGlyphs[e].unicode), s, g);
    }
  }
  /**
   * Returns the maximum width and height found for all the glyphs in the font.
   */
  get maxGlyphDimensions() {
    return this._maxGlyphDimensions;
  }
  /**
   * Returns the texture containing all characters in the font.
   */
  get texture() {
    return this._texture;
  }
  /**
   * Returns the number of columns in the texture containing all characters in the font.
   */
  get charsetCols() {
    return this._charsetCols;
  }
  /**
   * Returns the number of rows in the texture containing all characters in the font.
   */
  get charsetRows() {
    return this._charsetRows;
  }
  /**
   * Returns the font size used for the texture atlas.
   */
  get fontSize() {
    return this._fontSize;
  }
  /**
   * Returns the font manager used for the texture atlas.
   */
  get fontManager() {
    return this._fontManager;
  }
}
class V {
  /**
   * Create a new grid instance.
   * @param _p The p5 instance.
   * @param _cellWidth The width of each cell in the grid.
   * @param _cellHeight The height of each cell in the grid.
   */
  constructor(A, e, r) {
    /** The number of columns in the grid. */
    i(this, "_cols");
    /** The number of rows in the grid. */
    i(this, "_rows");
    /** The total width of the grid in pixels. */
    i(this, "_width");
    /** The total height of the grid in pixels. */
    i(this, "_height");
    /** The offset to the outer canvas on the x-axis when centering the grid. */
    i(this, "_offsetX");
    /** The offset to the outer canvas on the y-axis when centering the grid. */
    i(this, "_offsetY");
    this._p = A, this._cellWidth = e, this._cellHeight = r, this.reset();
  }
  /**
   * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
   */
  reset() {
    [this._cols, this._rows] = [Math.floor(this._p.width / this._cellWidth), Math.floor(this._p.height / this._cellHeight)], this._resizeGrid();
  }
  /**
   * Reset the total grid width & height, and the offset to the outer canvas.
   */
  _resizeGrid() {
    this._width = this._cols * this._cellWidth, this._height = this._rows * this._cellHeight, this._offsetX = Math.floor((this._p.width - this._width) / 2), this._offsetY = Math.floor((this._p.height - this._height) / 2);
  }
  /**
   * Re-assign the grid cell dimensions and `reset()` the grid.
   * @param newCellWidth The new cell width.
   * @param newCellHeight The new cell height.
   */
  resizeCellPixelDimensions(A, e) {
    [this._cellWidth, this._cellHeight] = [A, e], this.reset();
  }
  /**
   * Returns the width of each cell in the grid.
   */
  get cellWidth() {
    return this._cellWidth;
  }
  /**
   * Returns the height of each cell in the grid.
   */
  get cellHeight() {
    return this._cellHeight;
  }
  /**
   * Returns the number of columns in the grid.
   */
  get cols() {
    return this._cols;
  }
  /**
   * Returns the number of rows in the grid.
   */
  get rows() {
    return this._rows;
  }
  /**
   * Returns the total width of the grid.
   */
  get width() {
    return this._width;
  }
  /**
   * Returns the total height of the grid.
   */
  get height() {
    return this._height;
  }
  /**
   * Returns the offset to the outer canvas borders on the x-axis when centering the grid.
   */
  get offsetX() {
    return this._offsetX;
  }
  /**
   * Returns the offset to the outer canvas borders on the y-axis when centering the grid.
   */
  get offsetY() {
    return this._offsetY;
  }
}
class a extends Error {
  /**
   * Create a new P5AsciifyError instance.
   * @param message The error message.
   */
  constructor(A) {
    super(A), this.name = "P5AsciifyError";
  }
}
class Z {
  /**
   * Creates a new `P5AsciifyFontManager` instance.
   * @param _p The p5 instance.
   * @param fontSource The source to load the font from. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object.
   */
  constructor(A, e) {
    /** The font to use for ASCII rendering. */
    i(this, "_font");
    /** An array of supported characters in the font. */
    i(this, "_characters", []);
    /** An array of character glyphs with color assignments. */
    i(this, "_characterGlyphs", []);
    this._p = A, this.loadFont(e);
  }
  /**
   * Initializes the character glyphs and characters array.
   */
  _initializeGlyphsAndCharacters() {
    const A = Object.values(this._font.font.glyphs.glyphs);
    this._characters = A.filter((e) => e.unicode !== void 0).map((e) => String.fromCharCode(e.unicode)), this._characterGlyphs = Object.values(this._font.font.glyphs.glyphs).filter((e) => e.unicode !== void 0).map((e, r) => (e.r = r % 256, e.g = Math.floor(r / 256) % 256, e.b = Math.floor(r / 65536), e));
  }
  /**
   * Loads a font for ASCII rendering.
   * 
   * **Note: For proper library functionality, use `p5asciify.loadFont()` instead 
   * of accessing this method directly. Direct access may lead to inconsistent state 
   * as other components won't be automatically updated.**
   * 
   * @param font The font to load. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object.
   * @param onSuccess A callback function to call when the font is successfully loaded.
   * @throws {@link P5AsciifyError} If the font parameter is invalid or the font fails to load.
   */
  loadFont(A, e) {
    if (typeof A != "string" && !(A instanceof Q.Font))
      throw new a("Invalid font parameter. Expected a path, base64 string, blob URL, or p5.Font object.");
    if (typeof A == "string") {
      if (!this._isValidFontString(A))
        throw new a("Invalid font parameter. Expected .ttf, .otf file, or blob URL or base64 string.");
      this._p.loadFont(
        A,
        (r) => {
          this._font = r, this._initializeGlyphsAndCharacters(), this._p._decrementPreload(), e == null || e();
        },
        () => {
          throw new a(`Failed to load font from: ${A}`);
        }
      );
      return;
    }
    this._font = A, this._initializeGlyphsAndCharacters(), e == null || e();
  }
  /**
   * Checks if a font string is valid.
   * @param fontString The font string to check.
   * @returns True if the font string is valid, false otherwise.
   */
  _isValidFontString(A) {
    if (A.startsWith("blob:") || A.startsWith("data:"))
      return !0;
    const e = A.toLowerCase().split(".").pop();
    return e === "ttf" || e === "otf";
  }
  /**
   * Gets the color of a character in the font.
   * @param char The character to get the color for.
   * @returns An array containing the RGB color values for the character, 
   *          which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer` 
   *          to convert those pixels into the selected character.
   * @throws {@link P5AsciifyError} If the character is not found in the texture atlas.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Get the color of the character 'A'
   *      const color = p5asciify.fontManager.glyphColor('A');
   *      console.log(color);
   *  }
   * ```
   */
  glyphColor(A) {
    const e = this._characterGlyphs.find(
      (r) => r.unicodes.includes(A.codePointAt(0))
    );
    if (!e)
      throw new a(`Could not find character in character set: ${A}`);
    return [e.r, e.g, e.b];
  }
  /**
   * Returns an array of characters that are not supported by the current font.
   * @param characters The string of characters to check.
   * @returns An array of unsupported characters. List is empty if all characters are supported.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Print a list of potentially unsupported characters.
   *      console.log(p5asciify.fontManager.getUnsupportedCharacters(" .,ABC123"));
   *  }
   * ```
   */
  getUnsupportedCharacters(A) {
    return Array.from(
      new Set(
        Array.from(A).filter(
          (e) => !this._characterGlyphs.some(
            (r) => r.unicodes.includes(e.codePointAt(0))
          )
        )
      )
    );
  }
  /**
   * Validates a string of characters against the current font.
   * @param characters The string of characters to validate.
   * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Validate the characters 'ABC' (all supported)
   *      p5asciify.fontManager.validateCharacters('ABC');
   * 
   *      // Validate the characters 'ABC123' (unsupported characters '123')
   *      p5asciify.fontManager.validateCharacters('ABC123'); // -> Error
   *  }
   */
  validateCharacters(A) {
    const e = this.getUnsupportedCharacters(A);
    if (e.length > 0)
      throw new a(`The following characters are not supported by the current font: [${e.join(", ")}].`);
  }
  /**
   * Gets an array of RGB colors for a given string of characters.
   * @param characters - A string of characters.
   * @returns Array of RGB color values.
   * @throws {@link P5AsciifyError} If a character is not found in the fonts available characters.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Get the RGB colors for the characters 'ABC'
   *      const colors = p5asciify.fontManager.glyphColors('ABC');
   *      console.log(colors);
   *  }
   * ```
   */
  glyphColors(A = "") {
    return Array.from(A).map((e) => {
      const r = this._characterGlyphs.find(
        (t) => t.unicodes.includes(e.codePointAt(0))
      );
      if (!r)
        throw new a(`Could not find character in character set: ${e}`);
      return [r.r, r.g, r.b];
    });
  }
  /**
   * The `p5.Font` object used for ASCII rendering.
   * 
   * @example
   * ```javascript
   *  function drawAsciify() {
   *      // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
   *      textFont(p5asciify.fontManager.font);
   *      textSize(16);
   *      fill(255);
   *      text(frameRate() + " FPS", 10, 10);
   *  }
   * ```
   */
  get font() {
    return this._font;
  }
  /**
   * An array of supported characters in the set font.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Print the supported characters in the font
   *      console.log(p5asciify.fontManager.characters);
   *  }
   * ```
   */
  get characters() {
    return this._characters;
  }
  /**
   * An array of character glyphs in the set font with color assignments.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Print the character glyphs in the font
   *      console.log(p5asciify.fontManager.characterGlyphs);
   *  }
   * ```
   */
  get characterGlyphs() {
    return this._characterGlyphs;
  }
}
class U {
  /**
   * Create a new color palette instance.
   * @param _p The p5 instance.
   * @param _colors The colors to store in the palette.
   */
  constructor(A, e) {
    /** The framebuffer used to store the color palette. */
    i(this, "_framebuffer");
    this._p = A, this._colors = e;
    const r = Math.max(this._colors.length, 1);
    this._framebuffer = this._p.createFramebuffer({
      density: 1,
      width: r,
      height: 1,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._updateFramebuffer();
  }
  /**
   * Update the framebuffer with the currently selected colors.
   */
  _updateFramebuffer() {
    if (!this._framebuffer || !this._p) return;
    const A = Math.max(this._colors.length, 1);
    this._framebuffer.resize(A, 1), this._framebuffer.loadPixels();
    for (let r = 0; r < A; r++) {
      const t = r < this._colors.length ? this._p.color(this._colors[r]) : this._p.color(0, 0, 0, 0), s = 4 * r;
      this._framebuffer.pixels[s] = this._p.red(t), this._framebuffer.pixels[s + 1] = this._p.green(t), this._framebuffer.pixels[s + 2] = this._p.blue(t), this._framebuffer.pixels[s + 3] = this._p.alpha(t);
    }
    this._framebuffer.updatePixels();
  }
  /**
   * Sets the colors of the palette and updates the framebuffer.
   * @param newColors The new colors to set.
   */
  setColors(A) {
    this._colors = A, this._updateFramebuffer();
  }
  /**
   * Get the colors of the palette.
   */
  get colors() {
    return this._colors;
  }
  /**
   * Get the framebuffer of the palette.
   */
  get framebuffer() {
    return this._framebuffer;
  }
}
var B = "precision mediump float;attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}", $ = "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_inversionTexture;uniform sampler2D u_asciiCharacterTexture;uniform sampler2D u_rotationTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform vec2 u_resolution;uniform float u_pixelRatio;uniform sampler2D u_prevAsciiTexture;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 adjustedCoord=(logicalFragCoord-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);vec4 inversionColor=texture2D(u_inversionTexture,charIndexTexCoord);vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.rgba==vec4(0.0)){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=charIndex-(charIndex/int(u_charsetDimensions.x))*int(u_charsetDimensions.x);int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(float(charCol)/u_charsetDimensions.x,float(charRow)/u_charsetDimensions.y);vec4 rotationColor=texture2D(u_rotationTexture,charIndexTexCoord);float degrees=rotationColor.r*255.0+rotationColor.g*255.0;float rotationAngle=radians(degrees);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? secondaryColor : texture2D(u_characterTexture,texCoord);if(inversionColor==vec4(1.0)){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=vec4(primaryColor.rgb*charColor.rgb,charColor.a);gl_FragColor=mix(secondaryColor,finalColor,charColor.a);if(outsideBounds){gl_FragColor=inversionColor==vec4(1.0)? primaryColor : secondaryColor;}}";
const f = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
};
class E {
  /**
   * Creates a new ASCII renderer instance.
   * 
   * @remarks
   * This constructor is meant for internal use by the `p5.asciify` library.
   * 
   * To create renderers, use `p5asciify.renderers().add()`.
   * This will also return an instance of the renderer, which can be used to modify the renderer's properties.
   * Additionally, the renderer will also be added to the end of the rendering pipeline automatically.
   * 
   * @param _p The p5 instance.
   * @param _grid Grid object containing the relevant grid information.
   * @param _fontTextureAtlas The font texture atlas containing the ASCII characters texture.
   * @param _options The options for the ASCII renderer.
   */
  constructor(A, e, r, t = f) {
    /** The color palette containing colors that correspond to the defined character set. */
    i(this, "_characterColorPalette");
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    i(this, "_primaryColorFramebuffer");
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    i(this, "_secondaryColorFramebuffer");
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    i(this, "_characterFramebuffer");
    /** The inversion framebuffer, whose pixels define whether to swap the character and background colors. */
    i(this, "_inversionFramebuffer");
    i(this, "_rotationFramebuffer");
    /** The output framebuffer, where the final ASCII conversion is rendered. */
    i(this, "_outputFramebuffer");
    /** The shader used for the ASCII conversion. */
    i(this, "_shader");
    this._p = A, this._grid = e, this._fontTextureAtlas = r, this._options = t, this._options = { ...f, ...t }, this._characterColorPalette = new U(this._p, this._fontTextureAtlas.fontManager.glyphColors(this._options.characters)), this._primaryColorFramebuffer = this._p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._secondaryColorFramebuffer = this._p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._inversionFramebuffer = this._p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._characterFramebuffer = this._p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._rotationFramebuffer = this._p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._outputFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._shader = this._p.createShader(B, $), this.update(this._options);
  }
  /**
   * Resizes all framebuffers based on the grid dimensions.
   */
  resizeFramebuffers() {
    this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._inversionFramebuffer.resize(this._grid.cols, this._grid.rows), this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows), this._characterFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
  /**
   * Resets the shaders for the renderer.
   */
  resetShaders() {
  }
  /**
   * Updates renderer options.
   * @param newOptions - The new options to update.
   */
  update(A) {
    (A == null ? void 0 : A.enabled) !== void 0 && this.enabled(A.enabled), (A == null ? void 0 : A.characterColor) !== void 0 && (A.characterColor = this._p.color(A.characterColor), this.characterColor(A.characterColor)), (A == null ? void 0 : A.backgroundColor) !== void 0 && (A.backgroundColor = this._p.color(A.backgroundColor), this.backgroundColor(A.backgroundColor)), (A == null ? void 0 : A.characters) !== void 0 && this.characters(A.characters), (A == null ? void 0 : A.invertMode) !== void 0 && this.invert(A.invertMode), (A == null ? void 0 : A.rotationAngle) !== void 0 && this.rotation(A.rotationAngle), (A == null ? void 0 : A.characterColorMode) !== void 0 && this.characterColorMode(A.characterColorMode), (A == null ? void 0 : A.backgroundColorMode) !== void 0 && this.backgroundColorMode(A.backgroundColorMode);
  }
  /**
   * Convert and render the input framebuffer to ASCII.
   * @param inputFramebuffer - The input framebuffer to convert to ASCII.
   * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
   */
  render(A, e) {
    this._outputFramebuffer.begin(), this._p.clear(), this._p.shader(this._shader), this._shader.setUniform("u_pixelRatio", this._p.pixelDensity()), this._shader.setUniform("u_resolution", [this._p.width, this._p.height]), this._shader.setUniform("u_characterTexture", this._fontTextureAtlas.texture), this._shader.setUniform("u_charsetDimensions", [this._fontTextureAtlas.charsetCols, this._fontTextureAtlas.charsetRows]), this._shader.setUniform("u_primaryColorTexture", this._primaryColorFramebuffer), this._shader.setUniform("u_secondaryColorTexture", this._secondaryColorFramebuffer), this._shader.setUniform("u_inversionTexture", this._inversionFramebuffer), this._shader.setUniform("u_rotationTexture", this._rotationFramebuffer), this._shader.setUniform("u_asciiCharacterTexture", this._characterFramebuffer), e !== this ? this._shader.setUniform("u_prevAsciiTexture", e.outputFramebuffer) : this._shader.setUniform("u_prevAsciiTexture", A), this._shader.setUniform("u_gridPixelDimensions", [this._grid.width, this._grid.height]), this._shader.setUniform("u_gridOffsetDimensions", [this._grid.offsetX, this._grid.offsetY]), this._shader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._outputFramebuffer.end();
  }
  /**
   * Set the characters for the character set.
   * @param characters The characters to set for the character set.
   * @throws {P5AsciifyError} If characters is not a string.
   */
  characters(A = "") {
    if (typeof A != "string")
      throw new a("Characters must be a string.");
    this._fontTextureAtlas.fontManager.validateCharacters(A), this._characterColorPalette.setColors(this._fontTextureAtlas.fontManager.glyphColors(A)), this.resetShaders(), this._options.characters = A;
  }
  /**
   * Invert the colors of the ASCII character and cell background colors.
   * @param invert Whether to swap the colors.
   * @throws {P5AsciifyError} If invert is not a boolean.
   */
  invert(A) {
    if (typeof A != "boolean")
      throw new a("Invert mode must be a boolean.");
    this._options.invertMode = A;
  }
  /**
   * Define the rotation angle of all characters in the grid in degrees.
   * 
   * @remarks
   * Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.
   * 
   * @param angle The rotation angle in degrees.
   * @throws {P5AsciifyError} If angle is not a number.
   */
  rotation(A) {
    if (typeof A != "number")
      throw new a("Rotation angle must be a number");
    A = A % 360, A < 0 && (A += 360);
    const e = Math.min(255, Math.floor(A)), r = A > 255 ? Math.floor(A - 255) : 0;
    this._options.rotationAngle = this._p.color(e, r, 0);
  }
  /**
   * Set the color of the ASCII characters, used in the fixed color mode.
   * @param color The fixed color of the ASCII characters.
   * @throws {P5AsciifyError} If color is not a p5.Color object.
   */
  characterColor(A) {
    if (!A || !(A instanceof Q.Color))
      throw new a("Character color must be a valid p5.Color object");
    this._options.characterColor = A;
  }
  /**
   * Set the background color of the ASCII characters, used in the fixed color mode.
   * @param color The fixed color of the ASCII characters.
   */
  backgroundColor(A) {
    if (!A || !(A instanceof Q.Color))
      throw new a("Background color must be a valid p5.Color object");
    this._options.backgroundColor = A;
  }
  /**
   * Sets the color mode for ASCII characters.
   * @param mode The color mode ('sampled' or 'fixed')
   * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
   */
  characterColorMode(A) {
    if (typeof A != "string")
      throw new a("Character color mode must be a string");
    if (A !== "sampled" && A !== "fixed")
      throw new a("Character color mode must be either 'sampled' or 'fixed'");
    A === "sampled" ? this._options.characterColorMode = 0 : A === "fixed" && (this._options.characterColorMode = 1);
  }
  /**
   * Sets the color mode for the grid cell background.
   * @param mode The color mode ('sampled' or 'fixed')
   * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
   */
  backgroundColorMode(A) {
    if (typeof A != "string")
      throw new a("Background color mode must be a string");
    if (A !== "sampled" && A !== "fixed")
      throw new a("Background color mode must be either 'sampled' or 'fixed'");
    A === "sampled" ? this._options.backgroundColorMode = 0 : A === "fixed" && (this._options.backgroundColorMode = 1);
  }
  /**
   * Enable or disable the renderer.
   * @param enabled - Whether to enable or disable the renderer.
   * @throws {P5AsciifyError} If enabled is not a boolean.
   */
  enabled(A) {
    if (typeof A != "boolean")
      throw new a("Enabled must be a boolean.");
    if (this._options.enabled = A, !A) {
      const e = [
        this._primaryColorFramebuffer,
        this._secondaryColorFramebuffer,
        this._inversionFramebuffer,
        this._rotationFramebuffer,
        this._characterFramebuffer,
        this._outputFramebuffer
      ];
      for (const r of e)
        r.begin(), this._p.clear(), r.end();
    }
  }
  /**
   * Enable the renderer.
   */
  enable() {
    this.enabled(!0);
  }
  /**
   * Disable the renderer.
   */
  disable() {
    this.enabled(!1);
  }
  /**
   * Get the color palette object containing colors that correspond to the defined character set.
   * 
   * Not relevant for this base class, 
   * but used in derived classes for mapping brightness values to those colors for example, 
   * which are then translated to ASCII characters.
   */
  get characterColorPalette() {
    return this._characterColorPalette;
  }
  /**
   * Get the output framebuffer, where the final ASCII conversion is rendered.
   * 
   * Can also contain grid cells filled with ASCII characters by previous renderers.
   */
  get outputFramebuffer() {
    return this._outputFramebuffer;
  }
  get options() {
    return this._options;
  }
  get primaryColorFramebuffer() {
    return this._primaryColorFramebuffer;
  }
  get secondaryColorFramebuffer() {
    return this._secondaryColorFramebuffer;
  }
  get inversionFramebuffer() {
    return this._inversionFramebuffer;
  }
  get rotationFramebuffer() {
    return this._rotationFramebuffer;
  }
  get characterFramebuffer() {
    return this._characterFramebuffer;
  }
}
var P = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;uniform int u_shaderType;const int SHADER_BRIGHTNESS=0;const int SHADER_GRADIENT=1;const int SHADER_EDGE=2;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 finalColor;if(u_shaderType==SHADER_BRIGHTNESS){finalColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else if(u_shaderType==SHADER_GRADIENT){vec4 sampleColor=texture2D(u_sampleTexture,cellCenterTexCoord);vec4 referenceColor=texture2D(u_sampleReferenceTexture,cellCenterTexCoord);bool isMatchingSample=(sampleColor==referenceColor);if(isMatchingSample){finalColor=texture2D(u_previousColorTexture,cellCenterTexCoord);}else if(u_sampleMode==0){finalColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{finalColor=u_staticColor;}}else if(u_shaderType==SHADER_EDGE){vec4 sampleColor=texture2D(u_sampleTexture,cellCenterTexCoord);vec4 blackColor=vec4(0.0,0.0,0.0,1.0);bool isBlackSample=(sampleColor==blackColor);if(isBlackSample){finalColor=texture2D(u_previousColorTexture,cellCenterTexCoord);}else if(u_sampleMode==0){finalColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{finalColor=u_staticColor;}}else{finalColor=vec4(0.0,0.0,0.0,1.0);}gl_FragColor=finalColor;}", q = "precision mediump float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_textureSize;void main(){vec2 pos=(floor(gl_FragCoord.xy)+0.5)/u_textureSize;vec4 inputColor=texture2D(u_colorSampleFramebuffer,pos);if(inputColor.a==0.0){gl_FragColor=vec4(0.0,0.0,0.0,0.0);return;}float brightness=dot(inputColor.rgb,vec3(0.299,0.587,0.114));float index=clamp(floor(brightness*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);vec3 charColor=texture2D(u_charPaletteTexture,vec2((index+0.5)/u_charPaletteSize.x,0.0)).rgb;gl_FragColor=vec4(charColor,inputColor.a);}";
const C = {
  /** Enable/disable the renderer */
  enabled: !0,
  /** Characters used for brightness mapping (from darkest to brightest) */
  characters: "0123456789",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
  characterColor: "#FFFFFF",
  /** Character color mode */
  characterColorMode: "sampled",
  /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
  backgroundColor: "#000000",
  /** Background color mode */
  backgroundColorMode: "fixed",
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
};
class I extends E {
  constructor(e, r, t, s = C) {
    const g = { ...C, ...s };
    super(e, r, t, g);
    i(this, "colorSampleShader");
    i(this, "asciiCharacterShader");
    i(this, "colorSampleFramebuffer");
    this.colorSampleShader = this._p.createShader(B, P), this.asciiCharacterShader = this._p.createShader(B, q), this.colorSampleFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.colorSampleFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
  render(e, r) {
    this.colorSampleFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_shaderType", 0), this._p.rect(0, 0, this._p.width, this._p.height), this.colorSampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._options.characterColorMode === 1 ? this._p.background(this._options.characterColor) : (this._p.clear(), this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows)), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this._p.background(this._options.backgroundColor) : (this._p.clear(), this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows)), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._p.clear(), this._options.invertMode ? this._p.background(255) : this._p.background(0), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.clear(), this._p.background(this._options.rotationAngle), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_textureSize", [this._grid.cols, this._grid.rows]), this.asciiCharacterShader.setUniform("u_colorSampleFramebuffer", this.colorSampleFramebuffer), this.asciiCharacterShader.setUniform("u_charPaletteTexture", this._characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_charPaletteSize", [this._characterColorPalette.colors.length, 1]), this._p.rect(0, 0, this._p.width, this._p.height), this._characterFramebuffer.end(), super.render(e, r);
  }
}
const F = (o) => `
precision mediump float;uniform sampler2D u_characterTexture;uniform float u_charsetCols,u_charsetRows;uniform sampler2D u_sketchTexture;uniform vec2 u_gridPixelDimensions,u_gridCellDimensions;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;const float u=float(${o}),f=u*u;void main(){vec2 v=floor(floor(gl_FragCoord.xy).xy),r=u_gridPixelDimensions/u_gridCellDimensions,e=v*r/u_gridPixelDimensions;v=(v+vec2(1))*r/u_gridPixelDimensions-e;bool s=true;float k=1./u;for(int u=0;u<${o};u++){if(!s)break;for(int f=0;f<${o};f++){if(!s)break;vec2 r=vec2(float(f)+.5,float(u)+.5)*k;vec4 i=texture2D(u_sketchTexture,e+r*v);if(i.w>0.)s=false;}}if(s){gl_FragColor=vec4(0);return;}float i=1e20,g=0.,t=u_charPaletteSize.x;for(int u=0;u<1024;u++){if(float(u)>=t)break;vec2 s=vec2((float(u)+.5)/t,.5/u_charPaletteSize.y);vec4 r=texture2D(u_charPaletteTexture,s);float m=r.x*255.+r.y*255.*256.+r.z*255.*65536.,y=floor(m/u_charsetCols);s=vec2((m-u_charsetCols*y)/u_charsetCols,y/u_charsetRows);vec2 C=vec2(1./u_charsetCols,1./u_charsetRows);y=0.;for(int u=0;u<${o};u++)for(int f=0;f<${o};f++){vec2 r=vec2(float(f)+.5,float(u)+.5)*k;float m=texture2D(u_sketchTexture,e+r*v).x-texture2D(u_characterTexture,s+r*C).x;y+=m*m;}y/=f;if(y<i)i=y,g=m;}i=mod(g,256.);g=floor(g/256.);gl_FragColor=vec4(i/255.,g/255.,0,1);}
`, T = (o, A) => `
precision mediump float;uniform sampler2D u_inputImage;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows;const int u=${o},f=${A};void main(){vec2 v=floor(gl_FragCoord.xy),e=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));v*=e;float i=0.,t=float(u*f);for(int s=0;s<u;s++)for(int g=0;g<f;g++){vec2 m=clamp((v+(vec2(float(s),float(g))+.5)*(e/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 d=texture2D(u_inputImage,m);float t=.299*d.x+.587*d.y+.114*d.z;i+=t;}i/=t;gl_FragColor=vec4(vec3(i),1);}
`, y = (o, A, e) => `
precision mediump float;uniform sampler2D u_inputImage,u_inputImageBW;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows,u_colorRank;const int e=${o},u=${A},f=${e};void main(){vec2 i=floor(gl_FragCoord.xy),t=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));i*=t;vec2 k=(i+t*.5)/u_inputImageSize;vec4 v=texture2D(u_inputImage,k),c[e];float b[e];for(int i=0;i<e;i++)c[i]=vec4(0),b[i]=0.;for(int v=0;v<u;v++)for(int k=0;k<f;k++){vec2 s=clamp((i+(vec2(float(v),float(k))+.5)*(t/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 m=texture2D(u_inputImage,s),d=texture2D(u_inputImageBW,s);float r=step(.5,d.x);bool z=false;if(u_colorRank==1&&r>.5)z=true;else if(u_colorRank==2&&r<=.5)z=true;if(!z)continue;z=false;for(int i=0;i<e;i++)if(m.xyz==c[i].xyz){b[i]+=1.;z=true;break;}if(!z)for(int i=0;i<e;i++)if(b[i]==0.){c[i]=m;b[i]=1.;break;}}float z=0.;vec4 m=vec4(0);for(int i=0;i<e;i++){float u=b[i];vec4 k=c[i];if(u>z)z=u,m=k;}if(u_colorRank==2&&z==0.)m=v;gl_FragColor=vec4(m.xyz,1);}
`;
var AA = "precision mediump float;uniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;uniform float u_pixelRatio;const float EPSILON=0.01;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);vec2 imageTexCoord=logicalFragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);if(originalColor.a<EPSILON){gl_FragColor=vec4(0.0,0.0,0.0,0.0);return;}float gridX=floor(logicalFragCoord.x/cellWidth);float gridY=floor(logicalFragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue=brightnessDifference<-EPSILON ? 0.0 : 1.0;gl_FragColor=vec4(vec3(finalColorValue),1.0);}";
const D = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Characters used for pattern matching */
  characters: "0123456789",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
  characterColor: "#FFFFFF",
  /** Character color mode */
  characterColorMode: "sampled",
  /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
  backgroundColor: "#000000",
  /** Background color mode */
  backgroundColorMode: "fixed",
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
};
class w extends E {
  constructor(e, r, t, s = D) {
    const g = { ...D, ...s };
    super(e, r, t, g);
    i(this, "_characterSelectionShader");
    i(this, "_brightnessSampleShader");
    i(this, "_colorSampleShader");
    i(this, "_brightnessSplitShader");
    i(this, "_brightnessSampleFramebuffer");
    i(this, "_brightnessSplitFramebuffer");
    this._characterSelectionShader = this._p.createShader(B, F(this._fontTextureAtlas.fontSize)), this._brightnessSampleShader = this._p.createShader(B, T(this._grid.cellHeight, this._grid.cellWidth)), this._colorSampleShader = this._p.createShader(B, y(16, this._grid.cellHeight, this._grid.cellWidth)), this._brightnessSplitShader = this._p.createShader(B, AA), this._brightnessSampleFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._brightnessSplitFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this._brightnessSampleFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
  resetShaders() {
    this._characterSelectionShader = this._p.createShader(B, F(this._fontTextureAtlas.fontSize)), this._brightnessSampleShader = this._p.createShader(B, T(this._grid.cellHeight, this._grid.cellWidth)), this._colorSampleShader = this._p.createShader(B, y(16, this._grid.cellHeight, this._grid.cellWidth));
  }
  render(e, r) {
    this._brightnessSampleFramebuffer.begin(), this._p.clear(), this._p.shader(this._brightnessSampleShader), this._brightnessSampleShader.setUniform("u_inputImage", e), this._brightnessSampleShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._brightnessSampleShader.setUniform("u_gridCols", this._grid.cols), this._brightnessSampleShader.setUniform("u_gridRows", this._grid.rows), this._p.rect(0, 0, this._p.width, this._p.height), this._brightnessSampleFramebuffer.end(), this._brightnessSplitFramebuffer.begin(), this._p.clear(), this._p.shader(this._brightnessSplitShader), this._brightnessSplitShader.setUniform("u_inputImage", e), this._brightnessSplitShader.setUniform("u_brightnessTexture", this._brightnessSampleFramebuffer), this._brightnessSplitShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._brightnessSplitShader.setUniform("u_gridCols", this._grid.cols), this._brightnessSplitShader.setUniform("u_gridRows", this._grid.rows), this._brightnessSplitShader.setUniform("u_pixelRatio", this._p.pixelDensity()), this._p.rect(0, 0, this._p.width, this._p.height), this._brightnessSplitFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._options.characterColorMode === 1 ? this._p.background(this._options.characterColor) : (this._p.clear(), this._p.shader(this._colorSampleShader), this._colorSampleShader.setUniform("u_inputImage", e), this._colorSampleShader.setUniform("u_inputImageBW", this._brightnessSplitFramebuffer), this._colorSampleShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._colorSampleShader.setUniform("u_gridCols", this._grid.cols), this._colorSampleShader.setUniform("u_gridRows", this._grid.rows), this._colorSampleShader.setUniform("u_colorRank", 1), this._p.rect(0, 0, this._p.width, this._p.height)), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this._p.background(this._options.backgroundColor) : (this._p.clear(), this._p.shader(this._colorSampleShader), this._colorSampleShader.setUniform("u_inputImage", e), this._colorSampleShader.setUniform("u_inputImageBW", this._brightnessSplitFramebuffer), this._colorSampleShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._colorSampleShader.setUniform("u_gridCols", this._grid.cols), this._colorSampleShader.setUniform("u_gridRows", this._grid.rows), this._colorSampleShader.setUniform("u_colorRank", 2), this._p.rect(0, 0, this._p.width, this._p.height)), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._p.clear(), this._options.invertMode ? this._p.background(255) : this._p.background(0), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.clear(), this._p.background(this._options.rotationAngle), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this._characterSelectionShader), this._characterSelectionShader.setUniform("u_characterTexture", this._fontTextureAtlas.texture), this._characterSelectionShader.setUniform("u_charsetCols", this._fontTextureAtlas.charsetCols), this._characterSelectionShader.setUniform("u_charsetRows", this._fontTextureAtlas.charsetRows), this._characterSelectionShader.setUniform("u_charPaletteTexture", this._characterColorPalette.framebuffer), this._characterSelectionShader.setUniform("u_charPaletteSize", [this._characterColorPalette.colors.length, 1]), this._characterSelectionShader.setUniform("u_sketchTexture", this._brightnessSplitFramebuffer), this._characterSelectionShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._characterSelectionShader.setUniform("u_gridPixelDimensions", [this._grid.width, this._grid.height]), this._p.rect(0, 0, this._p.width, this._p.height), this._characterFramebuffer.end(), super.render(e, r);
  }
}
var Y = "precision mediump float;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform sampler2D u_previousInversionTexture;uniform vec2 u_gridCellDimensions;uniform bool u_invert;uniform bool u_useReferenceMode;uniform vec3 u_compareColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool shouldInvert;if(u_useReferenceMode){shouldInvert=texture2D(u_sampleTexture,cellCenterTexCoord)!=texture2D(u_sampleReferenceTexture,cellCenterTexCoord);}else{shouldInvert=texture2D(u_sampleTexture,cellCenterTexCoord).rgb!=u_compareColor;}if(shouldInvert){gl_FragColor=u_invert ? vec4(1.0): vec4(vec3(0.0),1.0);return;}else{gl_FragColor=texture2D(u_previousInversionTexture,cellCenterTexCoord);}}", k = "precision mediump float;uniform sampler2D u_sampleTexture;uniform sampler2D u_previousRotationTexture;uniform vec2 u_gridCellDimensions;uniform vec3 u_rotationColor;uniform bool u_useReferenceMode;uniform vec3 u_compareColor;uniform sampler2D u_sampleReferenceTexture;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool shouldRotate;if(u_useReferenceMode){shouldRotate=texture2D(u_sampleTexture,cellCenterTexCoord)!=texture2D(u_sampleReferenceTexture,cellCenterTexCoord);}else{shouldRotate=texture2D(u_sampleTexture,cellCenterTexCoord).rgb!=u_compareColor;}if(shouldRotate){gl_FragColor=vec4(u_rotationColor,1.0);}else{gl_FragColor=texture2D(u_previousRotationTexture,cellCenterTexCoord);}}", eA = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_previousAsciiCharacterTexture;uniform vec2 u_gridCellDimensions;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;if(texture2D(u_sketchTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0)){gl_FragColor=texture2D(u_previousAsciiCharacterTexture,cellCenterTexCoord);return;}gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}", rA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;uniform sampler2D u_colorPaletteTexture;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);vec4 edgeColor=vec4(0.0);if(intensity>u_threshold){float angleDeg=degrees(atan(sobelY.r,sobelX.r));int charIndex=0;if(angleDeg>=-22.5&&angleDeg<22.5)charIndex=0;else if(angleDeg>=22.5&&angleDeg<67.5)charIndex=1;else if(angleDeg>=67.5&&angleDeg<112.5)charIndex=2;else if(angleDeg>=112.5&&angleDeg<157.5)charIndex=3;else if(angleDeg>=157.5||angleDeg<-157.5)charIndex=4;else if(angleDeg>=-157.5&&angleDeg<-112.5)charIndex=5;else if(angleDeg>=-112.5&&angleDeg<-67.5)charIndex=6;else if(angleDeg>=-67.5&&angleDeg<-22.5)charIndex=7;float paletteCoord=(float(charIndex)+0.5)/8.0;edgeColor=texture2D(u_colorPaletteTexture,vec2(paletteCoord,0.5));}gl_FragColor=edgeColor;}";
const G = (o, A, e) => `
precision mediump float;uniform sampler2D u_image;uniform vec2 u_imageSize,u_gridCellDimensions;uniform int u_threshold;const vec3 i=vec3(0);const int e=${o},k=${A},s=${e};vec3 f[e];int u[e];float r(float i){return floor(i+.5);}void main(){vec2 v=floor(gl_FragCoord.xy);ivec2 b=ivec2(v);int y=b.x,c=b.y;v=u_imageSize/u_gridCellDimensions;b=ivec2(r(float(y)*v.x),r(float(c)*v.y));y=0;for(int v=0;v<e;v++)f[v]=i,u[v]=0;for(int v=0;v<s;v++)for(int c=0;c<k;c++){ivec2 r=b+ivec2(c,v);if(r.x<0||r.y<0||r.x>=int(u_imageSize.x)||r.y>=int(u_imageSize.y))continue;vec2 s=(vec2(r)+.5)/u_imageSize;vec3 t=texture2D(u_image,s).xyz;if(length(t-i)<.001)continue;y++;bool m=false;for(int v=0;v<e;v++)if(length(t-f[v])<.001){u[v]++;m=true;break;}if(!m)for(int v=0;v<e;v++)if(u[v]==0){f[v]=t;u[v]=1;break;}}vec3 m=i;c=0;for(int v=0;v<e;v++)if(u[v]>c)m=f[v],c=u[v];gl_FragColor=y<u_threshold?vec4(i,1):vec4(m,1);}
`, m = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Characters used for edge representation (8 characters for different angles) */
  characters: "-/|\\-/|\\",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
  characterColor: "#FFFFFF",
  /** Character color mode */
  characterColorMode: "sampled",
  /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
  backgroundColor: "#000000",
  /** Background color mode */
  backgroundColorMode: "fixed",
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Threshold for Sobel edge detection. Responsible for edge detection sensitivity */
  sobelThreshold: 0.5,
  /** Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it */
  sampleThreshold: 16,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
};
class x extends E {
  constructor(e, r, t, s = m) {
    const g = { ...m, ...s };
    super(e, r, t, g);
    i(this, "sobelShader");
    i(this, "sampleShader");
    i(this, "colorSampleShader");
    i(this, "inversionShader");
    i(this, "rotationShader");
    i(this, "asciiCharacterShader");
    i(this, "sobelFramebuffer");
    i(this, "sampleFramebuffer");
    this.sobelShader = this._p.createShader(B, rA), this.sampleShader = this._p.createShader(B, G(16, this._grid.cellHeight, this._grid.cellWidth)), this.colorSampleShader = this._p.createShader(B, P), this.inversionShader = this._p.createShader(B, Y), this.rotationShader = this._p.createShader(B, k), this.asciiCharacterShader = this._p.createShader(B, eA), this.sobelFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this.sampleFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.sampleFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
  resetShaders() {
    this.sampleShader = this._p.createShader(B, G(16, this._grid.cellHeight, this._grid.cellWidth));
  }
  /**
   * Set the threshold value for the Sobel edge detection algorithm.
   * @param value The threshold value for the Sobel edge detection algorithm.
   * @throws {P5AsciifyError} If the value is not a valid number between 0 and 1.
   */
  sobelThreshold(e) {
    if (typeof e != "number" || Number.isNaN(e) || !Number.isFinite(e))
      throw new a("Sobel threshold must be a valid number");
    if (e < 0 || e > 1)
      throw new a("Sobel threshold must be between 0 and 1");
    this._options.sobelThreshold = e;
  }
  /**
   * Set the sample threshold value for the edge detection algorithm.
   * @param value The sample threshold value for the edge detection algorithm.
   * @throws {P5AsciifyError} If the value is not a valid number greater than or equal to 0.
   */
  sampleThreshold(e) {
    if (typeof e != "number" || Number.isNaN(e) || !Number.isFinite(e))
      throw new a("Sample threshold must be a valid number");
    if (e < 0)
      throw new a("Sample threshold must be greater than or equal to 0");
    this._options.sampleThreshold = e;
  }
  update(e) {
    super.update(e), e.sobelThreshold !== void 0 && this.sobelThreshold(e.sobelThreshold), e.sampleThreshold !== void 0 && this.sampleThreshold(e.sampleThreshold);
  }
  render(e, r) {
    this.sobelFramebuffer.begin(), this._p.clear(), this._p.shader(this.sobelShader), this.sobelShader.setUniform("u_texture", e), this.sobelShader.setUniform("u_textureSize", [this._p.width, this._p.height]), this.sobelShader.setUniform("u_threshold", this._options.sobelThreshold), this.sobelShader.setUniform("u_colorPaletteTexture", this._characterColorPalette.framebuffer), this.sobelShader.setUniform("u_totalChars", this._options.characters.length), this._p.rect(0, 0, this._p.width, this._p.height), this.sobelFramebuffer.end(), this.sampleFramebuffer.begin(), this._p.clear(), this._p.shader(this.sampleShader), this.sampleShader.setUniform("u_imageSize", [this._p.width, this._p.height]), this.sampleShader.setUniform("u_image", this.sobelFramebuffer), this.sampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.sampleShader.setUniform("u_threshold", this._options.sampleThreshold), this._p.rect(0, 0, this._p.width, this._p.height), this.sampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.primaryColorFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.colorSampleShader.setUniform("u_shaderType", 2), this._p.rect(0, 0, this._p.width, this._p.height), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.secondaryColorFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.colorSampleShader.setUniform("u_shaderType", 2), this._p.rect(0, 0, this._p.width, this._p.height), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._p.clear(), this._p.shader(this.inversionShader), this.inversionShader.setUniform("u_invert", this._options.invertMode), this.inversionShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.inversionShader.setUniform("u_useReferenceMode", !1), this.inversionShader.setUniform("u_compareColor", [0, 0, 0]), r !== this && this.inversionShader.setUniform("u_previousInversionTexture", r.inversionFramebuffer), this.inversionShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.clear(), this._p.shader(this.rotationShader), this.rotationShader.setUniform("u_rotationColor", this._options.rotationAngle._array), this.rotationShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.rotationShader.setUniform("u_useReferenceMode", !1), this.rotationShader.setUniform("u_compareColor", [0, 0, 0]), r !== this && this.rotationShader.setUniform("u_previousRotationTexture", r.rotationFramebuffer), this.rotationShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_sketchTexture", this.sampleFramebuffer), r !== this && this.asciiCharacterShader.setUniform("u_previousAsciiCharacterTexture", r.characterFramebuffer), this.asciiCharacterShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._characterFramebuffer.end(), super.render(e, r);
  }
}
const u = (o, A, e, r) => {
  if (typeof o != "number" || o < A || o > e)
    throw new a(
      `Invalid ${r} value '${o}'. Expected a number between ${A} and ${e}.`
    );
}, tA = (o, A) => {
  const [e, r] = [o, A].map((t) => t.split(".").map(Number));
  for (let t = 0; t < Math.max(e.length, r.length); t++) {
    const s = e[t] ?? 0, g = r[t] ?? 0;
    if (s !== g) return s > g ? 1 : -1;
  }
  return 0;
};
class d {
  constructor(A, e, r, t, s, g) {
    /** The start brightness value of the gradient. Should be a value between 0 and 255. */
    i(this, "_brightnessStart");
    /** The end brightness value of the gradient. Should be a value between 0 and 255. */
    i(this, "_brightnessEnd");
    /** Whether the gradient is enabled. */
    i(this, "_enabled");
    /** The color palette for the gradient, corresponding to the characters. */
    i(this, "_palette");
    this.p = A, this._fontTextureAtlas = e, this._shader = r, this._characters = t, this._palette = new U(
      this.p,
      this._fontTextureAtlas.fontManager.glyphColors(this._characters)
    ), this._brightnessStart = Math.floor(s / 255 * 100) / 100, this._brightnessEnd = Math.ceil(g / 255 * 100) / 100, this._enabled = !0;
  }
  /**
   * Sets the uniforms for the gradient shader.
   * @param framebuffer - The framebuffer to use.
   * @param referenceFramebuffer - The reference framebuffer, which is used so two gradients cannot write onto the same pixels.
   */
  setUniforms(A, e) {
    this._shader.setUniform("textureID", A), this._shader.setUniform("originalTextureID", e), this._shader.setUniform("gradientTexture", this._palette.framebuffer), this._shader.setUniform("gradientTextureDimensions", [this._palette.colors.length, 1]), this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]), this._shader.setUniform("frameCount", this.p.frameCount);
  }
  /**
   * Sets the start brightness value.
   * @param value The brightness value to set.
   * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
   */
  brightnessStart(A) {
    u(A, 0, 255, "brightness start"), this._brightnessStart = A;
  }
  /**
   * Sets the end brightness value.
   * @param value The brightness value to set.
   * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
   */
  brightnessEnd(A) {
    u(A, 0, 255, "brightness start"), this._brightnessEnd = A;
  }
  /**
   * Sets the brightness range.
   * @param start The start brightness value.
   * @param end The end brightness value.
   * @throws P5AsciifyError If the start or end value is not a number or is not within the range [0, 255].
   */
  brightnessRange(A, e) {
    this.brightnessStart(A), this.brightnessEnd(e);
  }
  /**
   * Sets the characters to use for the gradient.
   * @param value The characters to use.
   * @throws P5AsciifyError If the string does contain characters that are not available in the font texture atlas.
   */
  characters(A) {
    if (typeof A != "string")
      throw new a("Characters must be a string.");
    this._fontTextureAtlas.fontManager.validateCharacters(A), this.palette.setColors(this._fontTextureAtlas.fontManager.glyphColors(A));
  }
  /**
   * Enables or disables the gradient.
   * @param value Whether to enable or disable the gradient.
   */
  enabled(A) {
    this._enabled = A;
  }
  /**
   * Enables the gradient.
   */
  enable() {
    this.enabled(!0);
  }
  /**
   * Disables the gradient.
   */
  disable() {
    this.enabled(!1);
  }
  // Getters
  get shader() {
    return this._shader;
  }
  get palette() {
    return this._palette;
  }
  get isEnabled() {
    return this._enabled;
  }
}
class z extends d {
  constructor(e, r, t, s, g, h, n) {
    super(e, r, t, s, g, h);
    i(this, "direction");
    i(this, "angle");
    i(this, "speed");
    i(this, "zigzag");
    this.p = e, this._fontTextureAtlas = r, this._shader = t, this._characters = s, this.direction = n.direction, this.angle = n.angle, this.speed = n.speed, this.zigzag = n.zigzag;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_gradientDirection", this.direction), this._shader.setUniform("u_angle", this.angle * Math.PI / 180), this._shader.setUniform("u_speed", this.speed), this._shader.setUniform("u_zigzag", this.zigzag);
  }
}
class R extends d {
  constructor(e, r, t, s, g, h, n) {
    super(e, r, t, s, g, h);
    i(this, "direction");
    i(this, "centerX");
    i(this, "centerY");
    i(this, "speed");
    i(this, "density");
    this.p = e, this._fontTextureAtlas = r, this._shader = t, this._characters = s, this.direction = n.direction, this.centerX = n.centerX, this.centerY = n.centerY, this.speed = n.speed, this.density = n.density;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_gradientDirection", this.direction), this._shader.setUniform("u_centerX", this.centerX), this._shader.setUniform("u_centerY", this.centerY), this._shader.setUniform("u_speed", this.speed), this._shader.setUniform("u_density", this.density);
  }
}
class N extends d {
  constructor(e, r, t, s, g, h, n) {
    super(e, r, t, s, g, h);
    i(this, "direction");
    i(this, "centerX");
    i(this, "centerY");
    i(this, "radius");
    this.p = e, this._fontTextureAtlas = r, this._shader = t, this._characters = s, this.direction = n.direction, this.centerX = n.centerX, this.centerY = n.centerY, this.radius = n.radius;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_gradientDirection", this.direction), this._shader.setUniform("u_centerX", this.centerX), this._shader.setUniform("u_centerY", this.centerY), this._shader.setUniform("u_radius", this.radius);
  }
}
class H extends d {
  constructor(e, r, t, s, g, h, n) {
    super(e, r, t, s, g, h);
    i(this, "centerX");
    i(this, "centerY");
    i(this, "speed");
    this.p = e, this._fontTextureAtlas = r, this._shader = t, this._characters = s, this.centerX = n.centerX, this.centerY = n.centerY, this.speed = n.speed;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_centerX", this.centerX), this._shader.setUniform("u_centerY", this.centerY), this._shader.setUniform("u_speed", this.speed);
  }
}
var iA = "precision mediump float;varying vec2 v_texCoord;uniform bool u_zigzag;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(originalTexColor.a>=0.01&&originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){float index;if(u_zigzag){vec2 coord=gl_FragCoord.xy;float posX=coord.x*cos(u_angle)-coord.y*sin(u_angle);float posY=coord.x*sin(u_angle)+coord.y*cos(u_angle);float direction=mod(floor(posY),2.0)==0.0 ? 1.0 :-1.0;index=mod(posX+float(frameCount)*u_speed*direction*u_gradientDirection,gradientTextureDimensions.x);}else{vec2 coord=floor(gl_FragCoord.xy);float pos=coord.x*cos(u_angle)+coord.y*sin(u_angle);index=mod(pos+float(frameCount)*u_gradientDirection*u_speed,gradientTextureDimensions.x);}index=floor(index);float texelPos=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPos,0.0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", sA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_centerX;uniform float u_centerY;uniform float u_speed;uniform float u_density;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(originalTexColor.a>=0.01&&originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_gradientDirection*u_speed;float index=mod((distance+adjustedAngle*u_density)*gradientTextureDimensions.x,gradientTextureDimensions.x);float normalizedIndex=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", oA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float u_radius;uniform int frameCount;uniform int u_gradientDirection;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(originalTexColor.a>=0.01&&originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float normalizedDistance=clamp(distance/u_radius,0.0,1.0);float index=normalizedDistance*(gradientTextureDimensions.x-1.0);float animatedIndex=mod(index+float(frameCount)*0.1*float(-u_gradientDirection),gradientTextureDimensions.x);float normalizedIndex=(floor(animatedIndex)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", aA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform int frameCount;uniform float u_speed;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 flippedTexCoord=vec2(v_texCoord.x,v_texCoord.y);vec4 texColor=texture2D(textureID,flippedTexCoord);vec4 originalTexColor=texture2D(originalTextureID,flippedTexCoord);if(originalTexColor.a>=0.01&&originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){vec2 relativePosition=flippedTexCoord-vec2(u_centerX,u_centerY);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_speed;float normalizedAngle=mod(adjustedAngle+3.14159265,2.0*3.14159265)/(2.0*3.14159265);float index=normalizedAngle*gradientTextureDimensions.x;float normalizedIndex=mod(floor(index)+0.5,gradientTextureDimensions.x)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}";
class X {
  constructor(A, e) {
    /** The default parameters for each gradient type. */
    i(this, "_gradientParams", {
      linear: { direction: 1, angle: 0, speed: 0.01, zigzag: !1 },
      spiral: { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
      radial: { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
      conical: { centerX: 0.5, centerY: 0.5, speed: 0.01 }
    });
    /** The shader sources for each gradient type. */
    i(this, "_gradientShaderSources", {
      linear: iA,
      spiral: sA,
      radial: oA,
      conical: aA
    });
    /** The gradient shaders. */
    i(this, "_gradientShaders", {});
    /** The gradient constructors. */
    i(this, "_gradientConstructors", {
      linear: (A, e, r, t, s, g, h) => new z(A, e, r, t, s, g, h),
      spiral: (A, e, r, t, s, g, h) => new R(A, e, r, t, s, g, h),
      radial: (A, e, r, t, s, g, h) => new N(A, e, r, t, s, g, h),
      conical: (A, e, r, t, s, g, h) => new H(A, e, r, t, s, g, h)
    });
    /** The list of gradients to render on the gradient ascii renderer. */
    i(this, "_gradients", []);
    this._p = A, this._fontTextureAtlas = e;
    for (const r of Object.keys(this._gradientShaderSources)) {
      const t = this._gradientShaderSources[r];
      this._gradientShaders[r] = this._p.createShader(B, t);
    }
  }
  /**
   * Add a gradient to the gradient manager.
   * @param gradientName The name of the gradient to add.
   * @param brightnessStart The start brightness of the gradient.
   * @param brightnessEnd The end brightness of the gradient.
   * @param characters The characters to use for the gradient.
   * @param options The parameters for the gradient.
   * @returns The gradient instance.
   */
  add(A, e, r, t, s) {
    if (typeof A != "string")
      throw new a("Gradient name must be a string");
    if (!this.gradientConstructors[A])
      throw new a(
        `Gradient '${A}' does not exist! Available gradients: ${Object.keys(this.gradientConstructors).join(", ")}`
      );
    if (typeof r != "number")
      throw new a("Brightness start value must be a number");
    if (typeof t != "number")
      throw new a("Brightness end value must be a number");
    if (u(r, 0, 255, "brightness start"), u(t, 0, 255, "brightness end"), typeof e != "string")
      throw new a("Characters must be a string");
    if (e.length === 0)
      throw new a("Characters string cannot be empty");
    if (!s || typeof s != "object" || Array.isArray(s))
      throw new a("User parameters must be an object");
    const g = Object.keys(this.gradientParams[A]), h = Object.keys(s).filter((c) => !g.includes(c));
    if (h.length > 0)
      throw new a(
        `Invalid parameter(s) for gradient '${A}': ${h.join(", ")}
Valid parameters are: ${g.join(", ")}`
      );
    const n = this._gradientConstructors[A](
      this._p,
      this._fontTextureAtlas,
      this._gradientShaders[A],
      e,
      r,
      t,
      { ...this._gradientParams[A], ...s }
    );
    return this._gradients.push(n), n;
  }
  /**
   * Remove a gradient from the gradient manager.
   * @param gradient The gradient to remove.
   */
  remove(A) {
    const e = this._gradients.indexOf(A);
    e > -1 && this._gradients.splice(e, 1);
  }
  // Getters
  get gradientParams() {
    return this._gradientParams;
  }
  get gradients() {
    return this._gradients;
  }
  get gradientConstructors() {
    return this._gradientConstructors;
  }
}
var gA = "precision mediump float;uniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);float luminance=0.299*color.r+0.587*color.g+0.114*color.b;color.rgb=vec3(luminance);gl_FragColor=color;}", nA = "precision mediump float;uniform sampler2D u_prevAsciiCharacterTexture;uniform sampler2D u_prevGradientTexture;uniform sampler2D u_nextGradientTexture;uniform vec2 u_resolution;void main(){vec2 uv=gl_FragCoord.xy/u_resolution;vec4 prevAscii=texture2D(u_prevAsciiCharacterTexture,uv);vec4 prevGradient=texture2D(u_prevGradientTexture,uv);vec4 nextGradient=texture2D(u_nextGradientTexture,uv);bool colorsMatch=prevGradient==nextGradient;gl_FragColor=colorsMatch ? prevAscii : nextGradient;}";
const p = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
  characterColor: "#FFFFFF",
  /** Character color mode */
  characterColorMode: "sampled",
  /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
  backgroundColor: "#000000",
  /** Background color mode */
  backgroundColorMode: "fixed",
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
};
class b extends E {
  constructor(e, r, t, s = p) {
    const g = { ...p, ...s };
    super(e, r, t, g);
    i(this, "grayscaleShader");
    i(this, "colorSampleShader");
    i(this, "grayscaleFramebuffer");
    i(this, "inversionShader");
    i(this, "rotationShader");
    i(this, "asciiCharacterShader");
    i(this, "prevAsciiGradientFramebuffer");
    i(this, "nextAsciiGradientFramebuffer");
    i(this, "gradientManager");
    this.gradientManager = new X(this._p, this._fontTextureAtlas), this.grayscaleShader = this._p.createShader(B, gA), this.colorSampleShader = this._p.createShader(B, P), this.inversionShader = this._p.createShader(B, Y), this.rotationShader = this._p.createShader(B, k), this.asciiCharacterShader = this._p.createShader(B, nA), this.grayscaleFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this.prevAsciiGradientFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this.nextAsciiGradientFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.grayscaleFramebuffer.resize(this._grid.cols, this._grid.rows), this.prevAsciiGradientFramebuffer.resize(this._grid.cols, this._grid.rows), this.nextAsciiGradientFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
  add(e, r, t, s, g = {}) {
    return this.gradientManager.add(e, s, r, t, g);
  }
  remove(e) {
    this.gradientManager.remove(e);
  }
  render(e, r) {
    this.grayscaleFramebuffer.begin(), this._p.clear(), this._p.shader(this.grayscaleShader), this.grayscaleShader.setUniform("u_image", e), this._p.rect(0, 0, this._p.width, this._p.height), this.grayscaleFramebuffer.end(), this.prevAsciiGradientFramebuffer.begin(), this._p.clear(), this._p.image(this.grayscaleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2), this.prevAsciiGradientFramebuffer.end(), this.nextAsciiGradientFramebuffer.begin(), this._p.clear(), this._p.image(this.grayscaleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2), this.nextAsciiGradientFramebuffer.end();
    for (const t of this.gradientManager.gradients)
      t.isEnabled && ([this.prevAsciiGradientFramebuffer, this.nextAsciiGradientFramebuffer] = [this.nextAsciiGradientFramebuffer, this.prevAsciiGradientFramebuffer], this.nextAsciiGradientFramebuffer.begin(), this._p.clear(), this._p.shader(t.shader), t.setUniforms(this.prevAsciiGradientFramebuffer, this.grayscaleFramebuffer), this._p.rect(0, 0, this._grid.cols, this._grid.rows), this.nextAsciiGradientFramebuffer.end());
    this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), r !== this && this.asciiCharacterShader.setUniform("u_prevAsciiCharacterTexture", r.characterFramebuffer), this.asciiCharacterShader.setUniform("u_prevGradientTexture", this.grayscaleFramebuffer), this.asciiCharacterShader.setUniform("u_nextGradientTexture", this.nextAsciiGradientFramebuffer), this.asciiCharacterShader.setUniform("u_resolution", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._grid.cols, this._grid.rows), this._characterFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.primaryColorFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.colorSampleShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.colorSampleShader.setUniform("u_shaderType", 1), this._p.rect(0, 0, this._p.width, this._p.height), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.secondaryColorFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.colorSampleShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.colorSampleShader.setUniform("u_shaderType", 1), this._p.rect(0, 0, this._p.width, this._p.height), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._p.clear(), this._p.shader(this.inversionShader), this.inversionShader.setUniform("u_invert", this._options.invertMode), this.inversionShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.inversionShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.inversionShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.inversionShader.setUniform("u_useReferenceMode", !0), r !== this && this.inversionShader.setUniform("u_previousInversionTexture", r.inversionFramebuffer), this._p.rect(0, 0, this._p.width, this._p.height), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.clear(), this._p.shader(this.rotationShader), this.rotationShader.setUniform("u_rotationColor", this._options.rotationAngle._array), this.rotationShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.rotationShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.rotationShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.rotationShader.setUniform("u_useReferenceMode", !0), r !== this && this.rotationShader.setUniform("u_previousRotationTexture", r.rotationFramebuffer), this._p.rect(0, 0, this._p.width, this._p.height), this._rotationFramebuffer.end(), super.render(e, r);
  }
}
const M = {
  brightness: I,
  accurate: w,
  gradient: b,
  edge: x,
  custom: E
};
class J {
  constructor(A, e, r) {
    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    i(this, "_currentCanvasDimensions");
    /** The list of available renderers. */
    i(this, "_renderers");
    /** The last renderer used in the rendering pipeline. */
    i(this, "lastRenderer");
    /** The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. */
    i(this, "_backgroundColor", "#000000");
    i(this, "_resultFramebuffer");
    this._p = A, this._grid = e, this._fontTextureAtlas = r, this._currentCanvasDimensions = {
      width: this._p.width,
      height: this._p.height
    }, this._renderers = [
      { name: "custom", renderer: new E(this._p, this._grid, r) },
      { name: "edge", renderer: new x(this._p, this._grid, r) },
      { name: "gradient", renderer: new b(this._p, this._grid, r) },
      { name: "accurate", renderer: new w(this._p, this._grid, r) },
      { name: "brightness", renderer: new I(this._p, this._grid, r) }
    ], this._resultFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this.lastRenderer = this._renderers[0].renderer;
  }
  /**
   * Renders the ASCII output to the result framebuffer.
   * 
   * **This method is called internally by the `p5asciify` instance every time the `draw()` function finishes.
   *  Should not be called manually, otherwise causing redundant computations.**
   * 
   * @param inputFramebuffer The input framebuffer to transform into ASCII.
   */
  render(A) {
    let e = A, r = this._renderers[0].renderer;
    this._resultFramebuffer.begin(), this._p.clear(), this._p.background(this._backgroundColor);
    for (let t = this._renderers.length - 1; t >= 0; t--) {
      const s = this._renderers[t];
      s.renderer.options.enabled && (s.renderer.render(A, r), e = s.renderer.outputFramebuffer, r = s.renderer, this.lastRenderer = s.renderer);
    }
    this._p.image(e, -this._p.width / 2, -this._p.height / 2), this._resultFramebuffer.end(), this.checkCanvasDimensions();
  }
  /**
   * Checks if the canvas dimensions have changed.
   * If they have, the grid is reset and the renderers are resized.
   */
  checkCanvasDimensions() {
    (this._currentCanvasDimensions.width !== this._p.width || this._currentCanvasDimensions.height !== this._p.height) && (this._currentCanvasDimensions.width = this._p.width, this._currentCanvasDimensions.height = this._p.height, this._grid.reset(), this.resetRendererDimensions());
  }
  /**
   * Resets the dimensions of all renderers.
   * 
   * This method is automatically triggered when:
   * - Font properties are modified
   * - Canvas dimensions change
   * 
   * These changes affect the grid dimensions, requiring renderer framebuffers to be resized
   * and certain shaders to be reinitialized. Should be redundant to call manually.
   */
  resetRendererDimensions() {
    this._renderers.forEach((A) => {
      A.renderer.resizeFramebuffers(), A.renderer.resetShaders();
    });
  }
  /**
   * Adds a new renderer to the list of renderers.
   * @param name The name of the renderer to add.
   * @param type The type of the renderer to add.
   * @param options The options to use for the renderer.
   * @returns The ASCII renderer instance that was added.
   * @throws {@link P5AsciifyError} - If the renderer name is an empty string or the renderer type is invalid.
   * 
   * @example
   * ```javascript
   * let brightnessAsciiRenderer;
   * 
   *  function setupAsciify() {
   *      // Clear all existing default renderers provided by `p5.asciify`.
   *      p5asciify.renderers().clear();
   * 
   *      // Add a new brightness renderer with custom options.
   *      brightnessAsciiRenderer = p5asciify.renderers().add('brightness', 'brightness', {
   *          enabled: true,
   *          characterColor: '#FF0000',
   *          backgroundColor: '#0000FF',
   *          characterColorMode: "fixed",
   *          backgroundColorMode: "fixed",
   *      });
   *  }
   * ```
   */
  add(A, e, r) {
    if (typeof A != "string" || A.trim() === "")
      throw new a("Renderer name must be a non-empty string");
    const t = M[e];
    if (!t)
      throw new a(
        `Invalid renderer type: ${e}. Valid types are: ${Object.keys(M).join(", ")}`
      );
    const s = new t(this._p, this._grid, this._fontTextureAtlas, r);
    return this._renderers.push({ name: A, renderer: s }), s;
  }
  /**
   * Gets the ASCII renderer instance with the given name.
   * @param rendererName The name of the renderer to get.
   * @returns The ASCII renderer instance with the given name.
   * 
   * @example
   * ```javascript
   *  let brightnessRenderer;
   * 
   *  function setupAsciify() {
   *      // Get the brightness renderer instance by name.
   *      brightnessRenderer = p5asciify.renderers().get('brightness');
   * 
   *      // Use the brightness renderer instance to modify its properties during run-time,
   *      // instead of constantly calling `p5asciify.renderers().get('brightness')`.
   *  }
   * ```
   */
  get(A) {
    var r;
    const e = (r = this._renderers.find((t) => t.name === A)) == null ? void 0 : r.renderer;
    if (!e)
      throw new a(
        `Renderer '${A}' not found. Available renderers: ${this._renderers.map((t) => t.name).join(", ")}`
      );
    return e;
  }
  /**
   * Moves a renderer down in the list of renderers, meaning it will be rendered later in the pipeline.
   * @param renderer The renderer to move down in the list.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Move the `"brightness"` renderer down in the list of renderers.
   *      p5asciify.renderers().moveDown('brightness');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   *  }
   * ```
   */
  moveDown(A) {
    const e = this._getRendererIndex(A);
    e <= 0 || this.swap(A, this._renderers[e + 1].renderer);
  }
  /**
   * Moves a renderer up in the list of renderers, meaning it will be rendered earlier in the pipeline.
   * @param renderer The renderer to move up in the list.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Move the `"accurate"` renderer up in the list of renderers.
   *      p5asciify.renderers().moveUp('accurate');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   *  }
   * ```
   */
  moveUp(A) {
    const e = this._getRendererIndex(A);
    e === -1 || e >= this._renderers.length - 1 || this.swap(A, this._renderers[e - 1].renderer);
  }
  /**
   * Removes a renderer from the list of renderers.
   * @param renderer The name of the renderer or the renderer instance itself.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Remove the `"brightness"` renderer from the list of renderers.
   *      p5asciify.renderers().remove('brightness');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   * }
   * ```
   */
  remove(A) {
    const e = this._getRendererIndex(A);
    if (e === -1)
      throw new a("Renderer not found.");
    this._renderers.splice(e, 1);
  }
  /**
   * Clears the list of renderers. 
   * Can be useful when you want to start fresh without the default renderers provided by `p5.asciify`.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Clear all existing renderers.
   *      p5asciify.renderers().clear();
   * 
   *     // With no renderers, you can add your own custom renderer.
   *     // Otherwise, `p5.asciify` will now render the input image without any ASCII effects.
   *  }
   * ```
   */
  clear() {
    this._renderers = [];
  }
  /**
   * Swaps the positions of two renderers in the renderer list.
   * @param renderer1 The name of the first renderer or the renderer instance itself.
   * @param renderer2 The name of the second renderer or the renderer instance itself.
   * @throws {@link P5AsciifyError} - If one or more renderers are not found.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Swap the positions of the `"brightness"` and `"accurate"` renderers.
   *      p5asciify.renderers().swap('brightness', 'accurate');
   * 
   *      // Alternatively, you can also pass the renderer instances themselves.
   *  }
   * ```
   */
  swap(A, e) {
    const r = this._getRendererIndex(A), t = this._getRendererIndex(e);
    if (r === -1 || t === -1)
      throw new a("One or more renderers not found.");
    const s = this._renderers[r];
    this._renderers[r] = this._renderers[t], this._renderers[t] = s, this.lastRenderer = this._renderers[0].renderer;
  }
  /**
   * Sets the background color for the ascii renderers. 
   * 
   * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
   * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
   * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the background color to black.
   *      p5asciify.renderers().background('#000000');
   * 
   *      // Alternatively, you can also use:
   *      p5asciify.background('#000000');
   *  }
   * ```
   */
  background(A) {
    if (typeof A != "string" && !Array.isArray(A) && !(A instanceof Q.Color))
      throw new a(`Invalid color type: ${typeof A}. Expected string, array or p5.Color.`);
    this._backgroundColor = A;
  }
  /**
   * Enables all renderers in the list of renderers at once,
   * effectively rendering the input image with all ASCII renderers applied.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *     // Enable all default renderers provided by `p5.asciify`.
   *      p5asciify.renderers().enable();
   *  }
   * ```
   */
  enable() {
    this._renderers.forEach((A) => A.renderer.enabled(!0));
  }
  /**
   * Disables all renderers in the list of renderers at once, 
   * effectively rendering the input image without any ASCII renderers applied.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Disable all renderers, effectively rendering the input image without any ASCII effects.
   *      p5asciify.renderers().disable();
   *  }
   * ```
   */
  disable() {
    this._renderers.forEach((A) => A.renderer.enabled(!1));
  }
  /**
   * Enables or disables all renderers in the list of renderers at once.
   * @param enabled Whether to enable or disable all renderers.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Enable all default renderers provided by `p5.asciify`.
   *      p5asciify.renderers().enabled(true);
   *  }
   * ```
   */
  enabled(A) {
    A ? this.enable() : this.disable();
  }
  /**
   * Gets the index of a renderer in the list of renderers.
   * @param renderer The renderer to get the index of.
   * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
   */
  _getRendererIndex(A) {
    return typeof A == "string" ? this._renderers.findIndex((e) => e.name === A) : this._renderers.findIndex((e) => e.renderer === A);
  }
  /**
   * Returns the list of available renderers.
   */
  get renderers() {
    return this._renderers;
  }
  /**
   * Returns the result framebuffer, which contains the final ASCII output.
   */
  get resultFramebuffer() {
    return this._resultFramebuffer;
  }
}
class BA {
  constructor() {
    /** Manages the font and provides methods to access font properties. */
    i(this, "_fontManager");
    /** Contains texture with all glyphs of the font set in the font manager. */
    i(this, "_fontTextureAtlas");
    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    i(this, "_grid");
    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers to asciify. */
    i(this, "_sketchFramebuffer");
    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    i(this, "_rendererManager");
    /** The font size for the ASCII renderers. */
    i(this, "_fontSize", 16);
    /** The `p5.js` instance. */
    i(this, "_p");
  }
  /**
   * Initializes the `p5.asciify` library by setting the `p5.js` instance and loading the font manager with the default font.
   * 
   * **This method is called automatically when p5.js is initialized and should not be called manually, 
   * otherwise causing unexpected behavior.**
   * 
   * @param p 
   * @param fontBase64 
   */
  init(A, e) {
    this._p = A, this._fontManager = new Z(this._p, e);
  }
  /**
   * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
   * 
   * **This method called automatically after the user's `setup()` function has finished. 
   * Calling this function manually would reset the library and previously made settings, which is rather redundant.**
   */
  setup() {
    this._fontTextureAtlas = new W(
      this._p,
      this._fontManager,
      this._fontSize
    ), this._grid = new V(
      this._p,
      this._fontTextureAtlas.maxGlyphDimensions.width,
      this._fontTextureAtlas.maxGlyphDimensions.height
    ), this._rendererManager = new J(
      this._p,
      this._grid,
      this._fontTextureAtlas
    ), this._sketchFramebuffer || (this._sketchFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }));
  }
  /**
   * Necessary to call in p5.js `INSTANCE` mode to ensure a `preload` function is defined.
   * Otherwise an empty `preload` method is defined, so the preload loop is executed and the font provided by `p5.asciify` is loaded properly.
   * @param p The p5.js instance to use for the library.
   * 
   * @example
   * ```javascript
   *  import p5 from 'p5';
   *  import { p5asciify } from '../../src/lib/index';
   * 
   *  const sketch = (p) => {
   *      p5asciify.instance(p);
   * 
   *      // ... your sketch code
   *  }
   * 
   * new p5(sketch);
   */
  instance(A) {
    A.preload || (A.preload = () => {
    });
  }
  /**
   * Renders the ASCII output to the canvas.
   * 
   * **This method is called automatically every time the user's `draw()` function has finished. Calling it manually is redundant and only causes useless computation.**
   */
  asciify() {
    this._p.clear(), this._rendererManager.renderers.length > 0 ? (this._rendererManager.render(this._sketchFramebuffer), this._p.image(this._rendererManager.resultFramebuffer, -this._p.width / 2, -this._p.height / 2)) : this._p.image(this._sketchFramebuffer, -this._p.width / 2, -this._p.height / 2);
  }
  /**
   * Sets the font size for the ASCII renderers.
   * @param fontSize The font size to set.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the font size to 32 to use for all ASCII renderers.
   *      p5asciify.fontSize(32);
   *  }
   * ```
   */
  fontSize(A) {
    this._fontSize = A, this._p._setupDone && (this._fontTextureAtlas.setFontSize(A), this._grid.resizeCellPixelDimensions(
      this._fontTextureAtlas.maxGlyphDimensions.width,
      this._fontTextureAtlas.maxGlyphDimensions.height
    ), this._rendererManager.resetRendererDimensions());
  }
  /**
   * Returns the renderer manager, containing all ASCII renderers in the rendering loop.
   * @returns The renderer manager.
   * 
   * @example
   * ```javascript
   *  let defaultBrightnessRenderer;
   * 
   *  function setupAsciify() {
   *      // Fetch the default brightness renderer from the renderer manager.
   *      defaultBrightnessRenderer = p5asciify.renderers().get("brightness");
   * 
   *      // Update any options for the renderer.
   *      defaultBrightnessRenderer.update({ invertMode: true, });
   *  }
   * ```
   */
  renderers() {
    return this._rendererManager;
  }
  /**
   * Sets the font for the ascii renderers.
   * @param font The font to use. Can be a path, base64 string, or p5.Font object.
   * @param options An object containing options affecting what happens after the font is loaded.
   * @param options.updateCharacters  If true, updates renderer character colors for ascii conversion with new font. 
   *                                  May throw an error if new font lacks set characters in renderers.
   *                                  If false, the character colors won't be updated, 
   *                                  potentially leading to incorrect ASCII conversion when not updated manually afterwards.
   * @param onSuccess A callback function to call after the font has been loaded and potential updates have been made.
   * @throws {@link P5AsciifyError} - If the font parameter is invalid or the font fails to load.
   * 
   * @example
   * ```javascript
   *  function preload() {
   *      // Load a custom font from a path
   *      p5asciify.loadFont('path/to/font.ttf', { updateCharacters: true }, () => {
   *          // Font loaded successfully
   *          console.log('Font loaded successfully');
   *      });
   * 
   *      // The second and third parameters are optional. When called during `preload`, 
   *      // the font will be loaded before `setup` begins, 
   *      // similar to how `loadFont` works in `p5.js`.
   *  }
   * ```
   */
  loadFont(A, e, r) {
    this._fontManager.loadFont(A, () => {
      this._p._setupDone && (this._fontTextureAtlas.reset(), this._grid.resizeCellPixelDimensions(
        this._fontTextureAtlas.maxGlyphDimensions.width,
        this._fontTextureAtlas.maxGlyphDimensions.height
      ), e.updateCharacters && this._rendererManager.renderers.forEach(
        (t) => t.renderer.characters(t.renderer.options.characters)
      ), this._rendererManager.resetRendererDimensions()), r == null || r();
    });
  }
  /**
   * Sets the background color for the ascii renderering. 
   * 
   * Covers all the transparent space, including the edges of the canvas, which might not be covered by the grid of characters.
   * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by `p5.js`.
   * @throws {@link P5AsciifyError} - If the passed color is invalid.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the background color to black.
   *      p5asciify.background("#000000");
   *  }
   * ```
   */
  background(A) {
    this._rendererManager.background(A);
  }
  /**
   * Generates the ASCII output as an array of string rows.
   * @returns Array of strings representing ASCII output.
   * @throws {@link P5AsciifyError} - If no renderer is available.
   */
  _generateAsciiTextOutput() {
    const A = this._rendererManager.lastRenderer;
    if (!A)
      throw new a("No renderer available to generate ASCII output");
    A.characterFramebuffer.loadPixels();
    const e = A.characterFramebuffer.pixels, r = this._grid.cols, t = this._grid.rows, s = this._fontManager.characters, g = [];
    let h = 0;
    for (let n = 0; n < t; n++) {
      let c = "";
      for (let S = 0; S < r; S++) {
        const v = h * 4, O = e[v], j = e[v + 1];
        let _ = O + (j << 8);
        _ >= s.length && (_ = s.length - 1), c += s[_], h++;
      }
      g.push(c);
    }
    return g;
  }
  /**
   * Returns the current ASCII output as a string.
   * @returns Multi-line string representation of the ASCII output.
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   * 
   * @example
   * ```javascript
   *  function drawAsciify() {
   *      // Print the ASCII output to the console.
   *      if (frameCount === 1101100011101010110111001100001) {
   *          console.log(p5asciify.toString());
   *      }
   *  }
   */
  toString() {
    return this._generateAsciiTextOutput().join(`
`);
  }
  /**
   * Saves the ASCII output to a text file.
   * @param filename The filename to save the text file as. If not provided, a default filename is used.
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   * 
   * @example
   * ```javascript
   * function drawAsciify() {
   *     // Save the ASCII output to a text file.
   *      if (frameCount === 11100110110111101101100) {
   *         p5asciify.saveStrings("ascii_output");
   *     }
   * }
   * ```
   */
  saveStrings(A) {
    if (!A) {
      const e = /* @__PURE__ */ new Date(), r = e.toISOString().split("T")[0], t = e.toTimeString().split(" ")[0].replace(/:/g, "-");
      A = `asciify_output_${r}_${t}`;
    }
    this._p.saveStrings(this._generateAsciiTextOutput(), `${A}.txt`);
  }
  /**
   * Sets the p5.js `fill()` color to the color of the given character in the font texture atlas.
   * 
   * This method can be useful when drawing to a custom renderers `characterFramebuffer`, 
   * which is used to convert the pixel data to ASCII characters.
   * 
   * @param character The character to get the color for.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   *      // Enable the default custom renderer
   *      p5asciify.renderers().get("custom").enable();
   *      
   *      // Assign the ascii renderer's character framebuffer to a global variable
   *      characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
   *      primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      p5asciify.fill("A");
   *      rect(0, 0, 100, 100);
   *      characterFramebuffer.end();
   * 
   *      // Makes all ascii characters on the grid white.
   *      primaryColorFramebuffer.begin();
   *      background(255);
   *      primaryColorFramebuffer.end();
   * 
   *      // Makes all cell background colors black.
   *      secondaryColorFramebuffer.begin();
   *      background(0);
   *      secondaryColorFramebuffer.end();
   *  }
   * ```
   */
  fill(A) {
    this._p.fill(this._fontManager.glyphColor(A));
  }
  /**
   * Returns the grid, which contains the dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions.
   * 
   * @example
   * ```javascript
   * let framebuffer;
   * 
   * function setupAsciify() {
   *      // Can be useful to create a framebuffer with the same dimensions as the grid.
   *      framebuffer = createFramebuffer({width: p5asciify.grid.cols, height: p5asciify.grid.rows});
   * }
   * ```
   */
  get grid() {
    return this._grid;
  }
  /**
   * Returns the font texture atlas, which contains the texture with all glyphs of the font set in the font manager.
   * 
   * @example
   * ```javascript
   *  function drawAsciify() {
   *      // Peek behind the curtain at the font texture atlas (you curious cat)
   *      clear(); 
   *      image(p5asciify.fontTextureAtlas.texture, -width / 2, -height / 2, width, height);
   *  }
   * ```
   */
  get fontTextureAtlas() {
    return this._fontTextureAtlas;
  }
  /**
   * Returns the font manager, which manages the font and provides methods to access font properties.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Print all existing characters in the font to the console.
   *      console.log(p5asciify.fontManager.characters);
   *  }
   * ```
   */
  get fontManager() {
    return this._fontManager;
  }
  /**
   * Returns the sketch framebuffer, which contains the output of the user's `draw()` function to asciify.
   * 
   * There is no real reason to access this in a `p5.js` sketch, but I'm happy to be proven wrong.
   */
  get sketchFramebuffer() {
    return this._sketchFramebuffer;
  }
  /**
   * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
   * Can also be used via the p5.js `texture()` function.
   * 
   * @example
   * ```javascript
   *  // Draw something on the canvas to asciify.
   *  function draw() {
   *      rotateX(frameCount * 0.01);
   *      rotateY(frameCount * 0.01);
   *      box(100);
   *  }
   * 
   *  function drawAsciify() {
   *      orbitControl();
   * 
   *      // Apply the asciified output as a texture to a 3D box.
   *      clear();
   *      texture(p5asciify.texture);
   *      box(100);
   *  }
   * ```
   */
  get texture() {
    return this._rendererManager.resultFramebuffer;
  }
}
const hA = `data:font/truetype;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAABAAAgAQAAIAEAACABAAAAAQAAIAEAAAABAAAAAQAAIAEAAGABAAAAAQAAAAEAAAABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAEABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAQAAIAEAAAABAAAAAQAAAAEAACABAABAAQAAQAEAAEABAABAAQAAIAEAACABAAAAAQAAAAEAAAABAABAAQAAAAEAACABAAAAAQAAAAEAAIABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAYAEAAAABAAAAAQAAQAEAACABAAAAAQAAAAEAAAABAAAgAQAAIAEAACABAAAgAQAAIAEAAAABAABAAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAAAAAIAAAADAAAAFAADAAEAAASaAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAABwAAABIAAAAegAAALwAAADuAAAA9wAAARQAAAExAAABWgAAAW0AAAF7AAABhAAAAY0AAAGvAAAB0gAAAecAAAIOAAACNQAAAk8AAAJsAAACjgAAAqYAAALOAAAC5gAAAvQAAAMHAAADLgAAAzwAAANjAAADhQAAA6UAAAPCAAAD4AAAA/0AAAQaAAAEPAAABEwAAARrAAAEfgAABJEAAASpAAAE0AAABNsAAAT4AAAFFQAABS0AAAVDAAAFZQAABYcAAAWuAAAFvAAABc8AAAXnAAAGBAAABisAAAZDAAAGZQAABnMAAAaVAAAGowAABsUAAAbOAAAG3gAABvYAAAcMAAAHKQAABz8AAAdaAAAHbQAAB4oAAAedAAAHqwAAB8MAAAfgAAAH7gAACAsAAAgjAAAIOwAACFEAAAhsAAAIfAAACJkAAAi2AAAIzgAACOYAAAkDAAAJKgAACUIAAAlfAAAJfAAACYUAAAmiAAAJugAACdcAAAngAAAKBwAACi4AAApgAAAKeQAACokAAAq4AAAKwQAACs8AAArYAAAK8QAACw4AAAshAAALSAAAC1gAAAt1AAALjQAAC5sAAAu0AAALzQAAC9YAAAvhAAAL6gAAC/4AAAwRAAAMJAAADDQAAAxHAAAMUgAADGoAAAyCAAAMlwAADKUAAAy/AAAM0gAADN0AAAz8AAANDwAADSkAAA0yAAANTAAADVUAAA1jAAANfAAADYcAAA2VAAANqQAADcIAAA3mAAAN7wAADg4AAA4XAAAOQQAADloAAA5qAAAOcwAADoYAAA6PAAAOogAADrIAAA7FAAAPCwAADxsAAA8uAAAPRwAAD1AAAA+HAAAPoAAAD6kAAA/CAAAP3wAAD/wAABAZAAAQNgAAEE4AABBfAAAQlQAAEJ4AABCxAAAQugAAEOEAABEnAAARUwAAEWYAABF+AAARlgAAEbgAABJrAAASfgAAEpEAABKpAAASwQAAEswAABLcAAATCAAAExMAABMrAAATQwAAE1sAABNzAAATmgAAE8YAABPeAAAT5wAAE/AAABQSAAAUKgAAFEIAABRaAAAUYwAAFGwAABSOAAAUngAAFLsAABTYAAAU/wAAFSEAABVNAAAVZQAAFX0AABWVAAAVngAAFacAABXTAAAWBAAAFg0AABYvAAAWOgAAFkUAABZxAAAWhAAAFpIAABagAAAWrgAAFrwAABbVAAAW7QAAFxkAABd0AAAXzwAAF/wAABgUAAAYJQAAGC4AABhBAAAYXgAAGHEAABiYAAAYvAAAGOAAABkYAAAZPwAAGWYAABmNAAAZtAAAGdYAABn9AAAaEAAAGi0AAIBgACAAoAEAAADAAcAAAEBAQEBAQEBAYABAAAA/wAAAAEAAAD/AAQAAAD+AAAA/4AAAP8AAAAAAgEAAoADgAQAAAMABwAAAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8ABAAAAP6AAAABgAAA/oAAAAACAIAAgAQAA4AAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAABAAAAAIAAAP+AAAAAgAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAA/4AAAACAAQAAAACAAAADgAAA/4AAAACAAAD/gAAA/4AAAP8AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAABAAAAAIAAAP+A/wAAAAEAAAMAgACABAAEAAAbAB8AIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAABAAAAAIAAAP+AAAD/AAAA/4AAAP8AAAABAAAA/wAAAP+AAAAAgAAAAQD/gAAAAIAAAACAAAAAgAAABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAABQCAAIAEAAOAAAUAHQAjACkALwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAA/4AAAP+AAgABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r
`, dA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ACCURATE_DEFAULT_OPTIONS: D,
  BRIGHTNESS_DEFAULT_OPTIONS: C,
  CUSTOM_DEFAULT_OPTIONS: f,
  EDGE_DEFAULT_OPTIONS: m,
  GRADIENT_DEFAULT_OPTIONS: p,
  P5AsciifyAccurateRenderer: w,
  P5AsciifyBrightnessRenderer: I,
  P5AsciifyEdgeRenderer: x,
  P5AsciifyGradientRenderer: b,
  P5AsciifyRenderer: E,
  P5AsciifyRendererManager: J
}, Symbol.toStringTag, { value: "Module" })), cA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  P5AsciifyConicalGradient: H,
  P5AsciifyGradient: d,
  P5AsciifyGradientManager: X,
  P5AsciifyLinearGradient: z,
  P5AsciifyRadialGradient: N,
  P5AsciifySpiralGradient: R
}, Symbol.toStringTag, { value: "Module" })), l = new BA();
typeof window < "u" && (window.preload = function() {
}, window.p5asciify = l);
Q.prototype.registerMethod("init", function() {
  this._incrementPreload(), l.init(this, hA);
});
Q.prototype.registerMethod("afterSetup", function() {
  if (!(this._renderer.drawingContext instanceof WebGLRenderingContext || this._renderer.drawingContext instanceof WebGL2RenderingContext))
    throw new a("WebGL renderer is required for p5.asciify to run.");
  if (tA(this.VERSION, "1.8.0") < 0)
    throw new a("p5.asciify requires p5.js v1.8.0 or higher to run.");
  l.setup(), this.setupAsciify && this.setupAsciify();
});
Q.prototype.registerMethod("pre", function() {
  l.sketchFramebuffer.begin(), this.clear(), this.push();
});
Q.prototype.registerMethod("post", function() {
  this.pop(), l.sketchFramebuffer.end(), l.asciify(), this.drawAsciify && this.drawAsciify();
});
const QA = [
  ["_getImmediateModeShader", "_defaultImmediateModeShader"],
  ["_getNormalShader", "_defaultNormalShader"],
  ["_getColorShader", "_defaultColorShader"],
  ["_getPointShader", "_defaultPointShader"],
  ["_getLineShader", "_defaultLineShader"],
  ["_getFontShader", "_defaultFontShader"]
];
for (const [o, A] of QA) {
  const e = Q.RendererGL.prototype[o];
  Q.RendererGL.prototype[o] = function() {
    return this[A] || (this[A] = e.call(this), this[A]._vertSrc = this[A]._vertSrc.replace(
      /mediump/g,
      "highp"
    ), this[A]._fragSrc = this[A]._fragSrc.replace(
      /mediump/g,
      "highp"
    )), this[A];
  };
}
export {
  BA as P5Asciifier,
  U as P5AsciifyColorPalette,
  a as P5AsciifyError,
  Z as P5AsciifyFontManager,
  W as P5AsciifyFontTextureAtlas,
  V as P5AsciifyGrid,
  cA as gradients,
  l as p5asciify,
  dA as renderers
};
