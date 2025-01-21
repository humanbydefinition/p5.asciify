var x = Object.defineProperty;
var b = (o, A, e) => A in o ? x(o, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[A] = e;
var t = (o, A, e) => b(o, typeof A != "symbol" ? A + "" : A, e);
import h from "p5";
class a extends Error {
  /**
   * Create a new P5AsciifyError instance.
   * @param message The error message.
   */
  constructor(A) {
    super(A), this.name = "P5AsciifyError";
  }
}
class v {
  /**
   * Creates a new `P5AsciifyFontTextureAtlas` instance.
   * @param p The p5 instance.
   * @param font The font object to use for the texture atlas.
   * @param _fontSize The font size to use for the texture atlas.
   */
  constructor(A, e, r) {
    /** Array of characters in the font. */
    t(this, "_characters");
    /** Array of `opentype.js` glyphs with unicode values, extended with r, g, and b properties for color. */
    t(this, "_characterGlyphs");
    /** Maximum width and height of the glyphs in the font. */
    t(this, "_maxGlyphDimensions");
    /** Texture containing all characters in the font. As square as possible. */
    t(this, "_texture");
    /** Number of columns in the texture. */
    t(this, "_charsetCols", 0);
    /** Number of rows in the texture. */
    t(this, "_charsetRows", 0);
    this.p = A, this.font = e, this._fontSize = r;
    const i = Object.values(this.font.font.glyphs.glyphs);
    this._characters = i.filter((s) => s.unicode !== void 0).map((s) => String.fromCharCode(s.unicode)), this._characterGlyphs = this._loadCharacterGlyphs(), this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Loads all glyphs with unicode values from the font and assigns colors to them.
   * @returns An array of opentype.js glyphs, extended with r, g, and b properties for color.
   */
  _loadCharacterGlyphs() {
    return Object.values(this.font.font.glyphs.glyphs).filter((A) => A.unicode !== void 0).map((A, e) => (A.r = e % 256, A.g = Math.floor(e / 256) % 256, A.b = Math.floor(e / 65536), A));
  }
  /**
   * Calculates the maximum width and height of the glyphs in the font.
   * @param fontSize - The font size to use for calculations.
   * @returns An object containing the maximum width and height of the glyphs.
   */
  _getMaxGlyphDimensions(A) {
    return this._characterGlyphs.reduce(
      (e, r) => {
        const i = r.getPath(0, 0, A).getBoundingBox();
        return {
          width: Math.ceil(Math.max(e.width, i.x2 - i.x1)),
          height: Math.ceil(Math.max(e.height, i.y2 - i.y1))
        };
      },
      { width: 0, height: 0 }
    );
  }
  /**
   * Sets the font object and resets the whole atlas.
   * @param font - The new font object.
   */
  setFontObject(A) {
    this.font = A, this._characters = Object.values(this.font.font.glyphs.glyphs).filter((e) => e.unicode !== void 0).map((e) => String.fromCharCode(e.unicode)), this._characterGlyphs = this._loadCharacterGlyphs(), this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
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
    this._charsetCols = Math.ceil(Math.sqrt(this._characters.length)), this._charsetRows = Math.ceil(this._characters.length / this._charsetCols), this._texture ? this._texture.resize(this._maxGlyphDimensions.width * this._charsetCols, this._maxGlyphDimensions.height * this._charsetRows) : this._texture = this.p.createFramebuffer({
      width: this._maxGlyphDimensions.width * this._charsetCols,
      height: this._maxGlyphDimensions.height * this._charsetRows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this._texture.begin(), this.p.clear(), this.drawCharacters(A), this._texture.end();
  }
  /**
   * Draws characters onto the texture.
   * @param fontSize - The font size to use for drawing the characters on the texture.
   */
  drawCharacters(A) {
    this.p.clear(), this.p.textFont(this.font), this.p.fill(255), this.p.textSize(A), this.p.textAlign(this.p.LEFT, this.p.TOP), this.p.noStroke();
    for (let e = 0; e < this._characterGlyphs.length; e++) {
      const r = e % this._charsetCols, i = Math.floor(e / this._charsetCols), s = this._maxGlyphDimensions.width * r - this._maxGlyphDimensions.width * this._charsetCols / 2, g = this._maxGlyphDimensions.height * i - this._maxGlyphDimensions.height * this._charsetRows / 2;
      this.p.text(String.fromCharCode(this._characterGlyphs[e].unicode), s, g);
    }
  }
  /**
   * Gets an array of RGB colors for a given string or array of characters.
   * @param characters - A string of characters.
   * @returns Array of RGB color values.
   * @throws {@link P5AsciifyError} If a character is not found in the texture atlas.
   */
  getCharsetColorArray(A) {
    return Array.from(A).map((e) => {
      const r = this._characterGlyphs.find(
        (i) => i.unicodes.includes(e.codePointAt(0))
      );
      if (!r)
        throw new a(`Could not find character in character set: ${e}`);
      return [r.r, r.g, r.b];
    });
  }
  /**
   * Returns an array of characters that are not supported by the current font.
   * @param characters The string of characters to check.
   * @returns An array of unsupported characters. List is empty if all characters are supported.
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
  // Getters
  get maxGlyphDimensions() {
    return this._maxGlyphDimensions;
  }
  get texture() {
    return this._texture;
  }
  get characters() {
    return this._characters;
  }
  get charsetCols() {
    return this._charsetCols;
  }
  get charsetRows() {
    return this._charsetRows;
  }
  get fontSize() {
    return this._fontSize;
  }
}
class S {
  /**
   * Create a new grid instance.
   * @param _p The p5 instance.
   * @param _cellWidth The width of each cell in the grid.
   * @param _cellHeight The height of each cell in the grid.
   */
  constructor(A, e, r) {
    /** The number of columns in the grid. */
    t(this, "_cols");
    /** The number of rows in the grid. */
    t(this, "_rows");
    /** The total width of the grid in pixels. */
    t(this, "_width");
    /** The total height of the grid in pixels. */
    t(this, "_height");
    /** The offset to the outer canvas on the x-axis when centering the grid. */
    t(this, "_offsetX");
    /** The offset to the outer canvas on the y-axis when centering the grid. */
    t(this, "_offsetY");
    this._p = A, this._cellWidth = e, this._cellHeight = r, this.reset();
  }
  /**
   * Reset the grid to the default number of columns and rows based on the current canvas, and `_cellWidth` and `_cellHeight`.
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
   * Re-assign the grid cell dimensions and reset the grid.
   * @param newCellWidth The new cell width.
   * @param newCellHeight The new cell height.
   */
  resizeCellPixelDimensions(A, e) {
    [this._cellWidth, this._cellHeight] = [A, e], this.reset();
  }
  // Getters
  get cellWidth() {
    return this._cellWidth;
  }
  get cellHeight() {
    return this._cellHeight;
  }
  get cols() {
    return this._cols;
  }
  get rows() {
    return this._rows;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get offsetX() {
    return this._offsetX;
  }
  get offsetY() {
    return this._offsetY;
  }
}
class w {
  /**
   * Create a new color palette instance.
   * @param p The p5 instance.
   * @param _colors The colors to store in the palette.
   */
  constructor(A, e) {
    /** The framebuffer used to store the color palette. */
    t(this, "framebuffer");
    this.p = A, this._colors = e;
    const r = Math.max(this._colors.length, 1);
    this.framebuffer = this.p.createFramebuffer({
      density: 1,
      width: r,
      height: 1,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.updateFramebuffer();
  }
  /**
   * Update the framebuffer with the currently selected colors.
   */
  updateFramebuffer() {
    if (!this.framebuffer || !this.p) return;
    const A = Math.max(this._colors.length, 1);
    this.framebuffer.resize(A, 1), this.framebuffer.loadPixels();
    for (let r = 0; r < A; r++) {
      const i = r < this._colors.length ? this.p.color(this._colors[r]) : this.p.color(0, 0, 0, 0), s = 4 * r;
      this.framebuffer.pixels[s] = this.p.red(i), this.framebuffer.pixels[s + 1] = this.p.green(i), this.framebuffer.pixels[s + 2] = this.p.blue(i), this.framebuffer.pixels[s + 3] = this.p.alpha(i);
    }
    this.framebuffer.updatePixels();
  }
  /**
   * Set the colors of the palette and update the framebuffer.
   * @param newColors The new colors to set.
   */
  setColors(A) {
    this._colors = A, this.updateFramebuffer();
  }
  // Getters
  get colors() {
    return this._colors;
  }
}
class F {
  /**
   * Create a new character set instance.
   * @param p The p5 instance.
   * @param asciiFontTextureAtlas The font texture atlas to reference for character colors.
   * @param characters The characters to use in the character set.
   */
  constructor(A, e, r = "") {
    /** The color palette for the character set. */
    t(this, "characterColorPalette");
    /** The list of individual characters in the character set. */
    t(this, "_characters");
    this.p = A, this.asciiFontTextureAtlas = e, this._characters = this.validateCharacters(r), this.characterColorPalette = new w(this.p, this.asciiFontTextureAtlas.getCharsetColorArray(this._characters));
  }
  /**
   * Validates the characters to ensure they are supported by the current font.
   * @param characters The characters to validate.
   * @returns The validated characters as a list of individual characters.
   * @throws {@link P5AsciifyError} If any characters are not supported by the set font.
   */
  validateCharacters(A) {
    const e = this.asciiFontTextureAtlas.getUnsupportedCharacters(A);
    if (e.length > 0)
      throw new a(`The following characters are not supported by the current font: [${e.join(", ")}].`);
    return A;
  }
  /**
   * Sets the characters to be used in the character set and updates the color palette texture.
   * @param characters The string of characters to use.
   */
  setCharacterSet(A) {
    this._characters = this.validateCharacters(A), this.characterColorPalette.setColors(this.asciiFontTextureAtlas.getCharsetColorArray(this._characters));
  }
  /**
   * Resets the character set colors. Gets called when the font atlas is updated with a new font.
   */
  reset() {
    this.characterColorPalette.setColors(this.asciiFontTextureAtlas.getCharsetColorArray(this._characters));
  }
  // Getters
  get characters() {
    return this._characters;
  }
}
var Q = "precision mediump float;attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}", T = "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_inversionTexture;uniform sampler2D u_asciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform float u_rotationAngle;uniform vec2 u_resolution;uniform float u_pixelRatio;uniform sampler2D u_prevAsciiTexture;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 adjustedCoord=(logicalFragCoord-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);vec4 inversionColor=texture2D(u_inversionTexture,charIndexTexCoord);vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.rgba==vec4(0.0)){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=charIndex-(charIndex/int(u_charsetDimensions.x))*int(u_charsetDimensions.x);int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(float(charCol)/u_charsetDimensions.x,float(charRow)/u_charsetDimensions.y);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? secondaryColor : texture2D(u_characterTexture,texCoord);if(inversionColor==vec4(1.0)){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=vec4(primaryColor.rgb*charColor.rgb,charColor.a);gl_FragColor=mix(secondaryColor,finalColor,charColor.a);if(outsideBounds){gl_FragColor=inversionColor==vec4(1.0)? primaryColor : secondaryColor;}}";
class l {
  constructor(A, e, r, i) {
    t(this, "characterSet");
    t(this, "_primaryColorSampleFramebuffer");
    t(this, "_secondaryColorSampleFramebuffer");
    t(this, "_asciiCharacterFramebuffer");
    t(this, "_inversionFramebuffer");
    t(this, "_outputFramebuffer");
    t(this, "_shader");
    this.p = A, this.grid = e, this.fontTextureAtlas = r, this._options = i, this._options.characterColor && (this._options.characterColor = this.p.color(this._options.characterColor)), this._options.backgroundColor && (this._options.backgroundColor = this.p.color(this._options.backgroundColor)), this.characterSet = new F(this.p, this.fontTextureAtlas, this._options.characters), this._primaryColorSampleFramebuffer = this.p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this._secondaryColorSampleFramebuffer = this.p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this._inversionFramebuffer = this.p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this._asciiCharacterFramebuffer = this.p.createFramebuffer({
      density: 1,
      antialias: !1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this._outputFramebuffer = this.p.createFramebuffer({
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this._shader = this.p.createShader(Q, T);
  }
  /**
   * Resizes all framebuffers based on the grid dimensions.
   */
  resizeFramebuffers() {
    this._primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows), this._secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows), this._inversionFramebuffer.resize(this.grid.cols, this.grid.rows), this._asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
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
    (A == null ? void 0 : A.enabled) !== void 0 && this.enabled(A.enabled), (A == null ? void 0 : A.characterColor) !== void 0 && (A.characterColor = this.p.color(A.characterColor), this.characterColor(A.characterColor)), (A == null ? void 0 : A.backgroundColor) !== void 0 && (A.backgroundColor = this.p.color(A.backgroundColor), this.backgroundColor(A.backgroundColor)), (A == null ? void 0 : A.characters) !== void 0 && this.characters(A.characters), (A == null ? void 0 : A.invertMode) !== void 0 && this.invert(A.invertMode), (A == null ? void 0 : A.rotationAngle) !== void 0 && this.rotation(A.rotationAngle), (A == null ? void 0 : A.characterColorMode) !== void 0 && this.characterColorMode(A.characterColorMode), (A == null ? void 0 : A.backgroundColorMode) !== void 0 && this.backgroundColorMode(A.backgroundColorMode);
  }
  /**
   * Convert and render the input framebuffer to ASCII.
   * @param inputFramebuffer - The input framebuffer to convert to ASCII.
   * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
   */
  render(A, e) {
    this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this._shader), this._shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this._shader.setUniform("u_resolution", [this.p.width, this.p.height]), this._shader.setUniform("u_characterTexture", this.fontTextureAtlas.texture), this._shader.setUniform("u_charsetDimensions", [this.fontTextureAtlas.charsetCols, this.fontTextureAtlas.charsetRows]), this._shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this._shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this._shader.setUniform("u_inversionTexture", this._inversionFramebuffer), this._shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), e !== this && this._shader.setUniform("u_prevAsciiTexture", e.outputFramebuffer), this._shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this._shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this._shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this._shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
  /**
   * Set the characters for the character set.
   * @param characters The characters to set for the character set.
   * @throws {P5AsciifyError} If characters is not a string.
   */
  characters(A) {
    if (typeof A != "string")
      throw new a("Characters must be a string.");
    this.characterSet.characters !== A && (this.characterSet.setCharacterSet(A), this.resetShaders());
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
      throw new a("Rotation angle must be a number.");
    this._options.rotationAngle = A;
  }
  /**
   * Set the color of the ASCII characters, used in the fixed color mode.
   * @param color The fixed color of the ASCII characters.
   * @throws {P5AsciifyError} If color is not a p5.Color object.
   */
  characterColor(A) {
    if (!A || !(A instanceof h.Color))
      throw new a("Character color must be a valid p5.Color object");
    this._options.characterColor = A;
  }
  /**
   * Set the background color of the ASCII characters, used in the fixed color mode.
   * @param color The fixed color of the ASCII characters.
   */
  backgroundColor(A) {
    if (!A || !(A instanceof h.Color))
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
    this._options.enabled = A;
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
  // Getters
  get outputFramebuffer() {
    return this._outputFramebuffer;
  }
  get options() {
    return this._options;
  }
  get primaryColorSampleFramebuffer() {
    return this._primaryColorSampleFramebuffer;
  }
  get secondaryColorSampleFramebuffer() {
    return this._secondaryColorSampleFramebuffer;
  }
  get inversionFramebuffer() {
    return this._inversionFramebuffer;
  }
  get asciiCharacterFramebuffer() {
    return this._asciiCharacterFramebuffer;
  }
}
var y = "precision mediump float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;void main(){vec2 logicalFragCoord=gl_FragCoord.xy;vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 sampledColor=texture2D(u_sketchTexture,cellCenterTexCoord);gl_FragColor=sampledColor;}", G = "precision mediump float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_textureSize;void main(){vec2 pos=(floor(gl_FragCoord.xy)+0.5)/u_textureSize;float brightness=dot(texture2D(u_colorSampleFramebuffer,pos).rgb,vec3(0.299,0.587,0.114));float index=clamp(floor(brightness*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);gl_FragColor=vec4(texture2D(u_charPaletteTexture,vec2((index+0.5)/u_charPaletteSize.x,0.0)).rgb,1.0);}";
class u extends l {
  constructor(e, r, i, s) {
    super(e, r, i, s);
    t(this, "colorSampleShader");
    t(this, "asciiCharacterShader");
    t(this, "colorSampleFramebuffer");
    this.colorSampleShader = this.p.createShader(Q, y), this.asciiCharacterShader = this.p.createShader(Q, G), this.colorSampleFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.colorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  render(e, r) {
    this.colorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.p.rect(0, 0, this.p.width, this.p.height), this.colorSampleFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this._options.characterColorMode === 1 ? this.p.background(this._options.characterColor) : (this.p.clear(), this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows)), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this.p.background(this._options.backgroundColor) : (this.p.clear(), this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows)), this._secondaryColorSampleFramebuffer.end(), this._inversionFramebuffer.begin(), this.p.clear(), this._options.invertMode ? this.p.background(255) : this.p.background(0), this._inversionFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_textureSize", [this.grid.cols, this.grid.rows]), this.asciiCharacterShader.setUniform("u_colorSampleFramebuffer", this.colorSampleFramebuffer), this.asciiCharacterShader.setUniform("u_charPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_charPaletteSize", [this.characterSet.characterColorPalette.colors.length, 1]), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), super.render(e, r);
  }
}
const D = (o) => `
precision mediump float;uniform sampler2D u_characterTexture;uniform float u_charsetCols,u_charsetRows;uniform sampler2D u_sketchTexture;uniform vec2 u_gridPixelDimensions,u_gridCellDimensions;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;const float u=float(${o}),f=u*u;void main(){vec2 v=floor(floor(gl_FragCoord.xy).xy),t=u_gridPixelDimensions/u_gridCellDimensions,e=v*t/u_gridPixelDimensions;t=(v+vec2(1))*t/u_gridPixelDimensions;v=t-e;float s=1e20,i=0.,r=1./u,y=u_charPaletteSize.x;for(int t=0;t<1024;t++){if(float(t)>=y)break;vec2 m=vec2((float(t)+.5)/y,.5/u_charPaletteSize.y);vec4 d=texture2D(u_charPaletteTexture,m);float g=d.x*255.,x=d.y*255.,c=d.z*255.;c=g+x*256.+c*65536.;x=floor(c/u_charsetCols);g=c-u_charsetCols*x;m=vec2(g/u_charsetCols,x/u_charsetRows);vec2 k=vec2(1./u_charsetCols,1./u_charsetRows);g=0.;for(int f=0;f<int(u);f++)for(int s=0;s<int(u);s++){vec2 t=vec2(float(s)+.5,float(f)+.5)*r,i=e+t*v;float x=texture2D(u_sketchTexture,i).x;t=m+t*k;float c=texture2D(u_characterTexture,t).x;x-=c;g+=x*x;}g/=f;if(g<s)s=g,i=c;}s=mod(i,256.);i=floor(i/256.);s/=255.;i/=255.;gl_FragColor=vec4(s,i,0,1);}
`, f = (o, A) => `
precision mediump float;uniform sampler2D u_inputImage;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows;const int u=${o},f=${A};void main(){vec2 v=floor(gl_FragCoord.xy),e=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));v*=e;float i=0.,t=float(u*f);for(int s=0;s<u;s++)for(int g=0;g<f;g++){vec2 m=clamp((v+(vec2(float(s),float(g))+.5)*(e/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 d=texture2D(u_inputImage,m);float t=.299*d.x+.587*d.y+.114*d.z;i+=t;}i/=t;gl_FragColor=vec4(vec3(i),1);}
`, m = (o, A, e) => `
precision mediump float;uniform sampler2D u_inputImage,u_inputImageBW;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows,u_colorRank;const int e=${o},u=${A},f=${e};void main(){vec2 i=floor(gl_FragCoord.xy),t=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));i*=t;vec2 k=(i+t*.5)/u_inputImageSize;vec4 v=texture2D(u_inputImage,k),c[e];float b[e];for(int i=0;i<e;i++)c[i]=vec4(0),b[i]=0.;for(int v=0;v<u;v++)for(int k=0;k<f;k++){vec2 s=clamp((i+(vec2(float(v),float(k))+.5)*(t/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 m=texture2D(u_inputImage,s),d=texture2D(u_inputImageBW,s);float r=step(.5,d.x);bool z=false;if(u_colorRank==1&&r>.5)z=true;else if(u_colorRank==2&&r<=.5)z=true;if(!z)continue;z=false;for(int i=0;i<e;i++)if(m.xyz==c[i].xyz){b[i]+=1.;z=true;break;}if(!z)for(int i=0;i<e;i++)if(b[i]==0.){c[i]=m;b[i]=1.;break;}}float z=0.;vec4 m=vec4(0);for(int i=0;i<e;i++){float u=b[i];vec4 k=c[i];if(u>z)z=u,m=k;}if(u_colorRank==2&&z==0.)m=v;gl_FragColor=vec4(m.xyz,1);}
`;
var M = "precision mediump float;uniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;uniform float u_pixelRatio;const float EPSILON=0.01;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);float gridX=floor(logicalFragCoord.x/cellWidth);float gridY=floor(logicalFragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;vec2 imageTexCoord=logicalFragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue;if(brightnessDifference<-EPSILON){finalColorValue=0.0;}else{finalColorValue=1.0;}gl_FragColor=vec4(vec3(finalColorValue),1.0);}";
class P extends l {
  constructor(e, r, i, s) {
    super(e, r, i, s);
    t(this, "characterSelectionShader");
    t(this, "brightnessSampleShader");
    t(this, "colorSampleShader");
    t(this, "brightnessSplitShader");
    t(this, "brightnessSampleFramebuffer");
    t(this, "brightnessSplitFramebuffer");
    this.characterSelectionShader = this.p.createShader(Q, D(this.fontTextureAtlas.fontSize)), this.brightnessSampleShader = this.p.createShader(Q, f(this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(Q, m(16, this.grid.cellHeight, this.grid.cellWidth)), this.brightnessSplitShader = this.p.createShader(Q, M), this.brightnessSampleFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.brightnessSplitFramebuffer = this.p.createFramebuffer({
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.brightnessSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  resetShaders() {
    this.characterSelectionShader = this.p.createShader(Q, D(this.fontTextureAtlas.fontSize)), this.brightnessSampleShader = this.p.createShader(Q, f(this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(Q, m(16, this.grid.cellHeight, this.grid.cellWidth));
  }
  render(e, r) {
    this.brightnessSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.brightnessSampleShader), this.brightnessSampleShader.setUniform("u_inputImage", e), this.brightnessSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.brightnessSampleShader.setUniform("u_gridCols", this.grid.cols), this.brightnessSampleShader.setUniform("u_gridRows", this.grid.rows), this.p.rect(0, 0, this.p.width, this.p.height), this.brightnessSampleFramebuffer.end(), this.brightnessSplitFramebuffer.begin(), this.p.clear(), this.p.shader(this.brightnessSplitShader), this.brightnessSplitShader.setUniform("u_inputImage", e), this.brightnessSplitShader.setUniform("u_brightnessTexture", this.brightnessSampleFramebuffer), this.brightnessSplitShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.brightnessSplitShader.setUniform("u_gridCols", this.grid.cols), this.brightnessSplitShader.setUniform("u_gridRows", this.grid.rows), this.brightnessSplitShader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.p.rect(0, 0, this.p.width, this.p.height), this.brightnessSplitFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this._options.characterColorMode === 1 ? this.p.background(this._options.characterColor) : (this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_inputImage", e), this.colorSampleShader.setUniform("u_inputImageBW", this.brightnessSplitFramebuffer), this.colorSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.colorSampleShader.setUniform("u_gridCols", this.grid.cols), this.colorSampleShader.setUniform("u_gridRows", this.grid.rows), this.colorSampleShader.setUniform("u_colorRank", 1), this.p.rect(0, 0, this.p.width, this.p.height)), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this.p.background(this._options.backgroundColor) : (this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_inputImage", e), this.colorSampleShader.setUniform("u_inputImageBW", this.brightnessSplitFramebuffer), this.colorSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.colorSampleShader.setUniform("u_gridCols", this.grid.cols), this.colorSampleShader.setUniform("u_gridRows", this.grid.rows), this.colorSampleShader.setUniform("u_colorRank", 2), this.p.rect(0, 0, this.p.width, this.p.height)), this._secondaryColorSampleFramebuffer.end(), this._inversionFramebuffer.begin(), this.p.clear(), this._options.invertMode ? this.p.background(255) : this.p.background(0), this._inversionFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.characterSelectionShader), this.characterSelectionShader.setUniform("u_characterTexture", this.fontTextureAtlas.texture), this.characterSelectionShader.setUniform("u_charsetCols", this.fontTextureAtlas.charsetCols), this.characterSelectionShader.setUniform("u_charsetRows", this.fontTextureAtlas.charsetRows), this.characterSelectionShader.setUniform("u_charPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.characterSelectionShader.setUniform("u_charPaletteSize", [this.characterSet.characterColorPalette.colors.length, 1]), this.characterSelectionShader.setUniform("u_sketchTexture", this.brightnessSplitFramebuffer), this.characterSelectionShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.characterSelectionShader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), super.render(e, r);
  }
}
var U = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isBlackSample=texture2D(u_sampleTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0);if(isBlackSample){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}", Y = "precision mediump float;uniform sampler2D u_sampleTexture;uniform sampler2D u_previousInversionTexture;uniform vec2 u_gridCellDimensions;uniform bool u_invert;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;if(!(texture2D(u_sampleTexture,cellCenterTexCoord).rgb==vec3(0.0))){if(u_invert){gl_FragColor=vec4(1.0);}else{gl_FragColor=vec4(vec3(0.0),1.0);}return;}else{gl_FragColor=texture2D(u_previousInversionTexture,cellCenterTexCoord);}}", k = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_colorPaletteTexture;uniform sampler2D u_previousAsciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform int u_totalChars;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;if(texture2D(u_sketchTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0)){gl_FragColor=texture2D(u_previousAsciiCharacterTexture,cellCenterTexCoord);return;}vec4 sketchColor=texture2D(u_sketchTexture,cellCenterTexCoord);float brightness=dot(sketchColor.rgb,vec3(0.299,0.587,0.114));int charIndex=int(brightness*float(u_totalChars));if(charIndex>u_totalChars-1){charIndex=u_totalChars-1;}float paletteCoord=(float(charIndex)+0.5)/float(u_totalChars);gl_FragColor=texture2D(u_colorPaletteTexture,vec2(paletteCoord,0.5));}", z = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);float angleDeg=degrees(atan(sobelY.r,sobelX.r));vec3 edgeColor=vec3(0.0);if(intensity>u_threshold){if(angleDeg>=-22.5&&angleDeg<22.5){edgeColor=vec3(0.1);}else if(angleDeg>=22.5&&angleDeg<67.5){edgeColor=vec3(0.2);}else if(angleDeg>=67.5&&angleDeg<112.5){edgeColor=vec3(0.3);}else if(angleDeg>=112.5&&angleDeg<157.5){edgeColor=vec3(0.4);}else if(angleDeg>=157.5||angleDeg<-157.5){edgeColor=vec3(0.6);}else if(angleDeg>=-157.5&&angleDeg<-112.5){edgeColor=vec3(0.7);}else if(angleDeg>=-112.5&&angleDeg<-67.5){edgeColor=vec3(0.8);}else if(angleDeg>=-67.5&&angleDeg<-22.5){edgeColor=vec3(0.9);}}gl_FragColor=vec4(edgeColor,1.0);}";
const p = (o, A, e) => `
precision mediump float;uniform sampler2D u_image;uniform vec2 u_imageSize,u_gridCellDimensions;uniform int u_threshold;const vec3 i=vec3(0);const int e=${o},k=${A},s=${e};vec3 f[e];int u[e];float r(float i){return floor(i+.5);}void main(){vec2 v=floor(gl_FragCoord.xy);ivec2 b=ivec2(v);int y=b.x,c=b.y;v=u_imageSize/u_gridCellDimensions;b=ivec2(r(float(y)*v.x),r(float(c)*v.y));y=0;for(int v=0;v<e;v++)f[v]=i,u[v]=0;for(int v=0;v<s;v++)for(int c=0;c<k;c++){ivec2 r=b+ivec2(c,v);if(r.x<0||r.y<0||r.x>=int(u_imageSize.x)||r.y>=int(u_imageSize.y))continue;vec2 s=(vec2(r)+.5)/u_imageSize;vec3 t=texture2D(u_image,s).xyz;if(length(t-i)<.001)continue;y++;bool m=false;for(int v=0;v<e;v++)if(length(t-f[v])<.001){u[v]++;m=true;break;}if(!m)for(int v=0;v<e;v++)if(u[v]==0){f[v]=t;u[v]=1;break;}}vec3 m=i;c=0;for(int v=0;v<e;v++)if(u[v]>c)m=f[v],c=u[v];gl_FragColor=y<u_threshold?vec4(i,1):vec4(m,1);}
`;
class I extends l {
  constructor(e, r, i, s) {
    super(e, r, i, s);
    t(this, "sobelShader");
    t(this, "sampleShader");
    t(this, "colorSampleShader");
    t(this, "inversionShader");
    t(this, "asciiCharacterShader");
    t(this, "sobelFramebuffer");
    t(this, "sampleFramebuffer");
    this.sobelShader = this.p.createShader(Q, z), this.sampleShader = this.p.createShader(Q, p(16, this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(Q, U), this.inversionShader = this.p.createShader(Q, Y), this.asciiCharacterShader = this.p.createShader(Q, k), this.sobelFramebuffer = this.p.createFramebuffer({
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.sampleFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  resetShaders() {
    this.sampleShader = this.p.createShader(Q, p(16, this.grid.cellHeight, this.grid.cellWidth));
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
    this.sobelFramebuffer.begin(), this.p.clear(), this.p.shader(this.sobelShader), this.sobelShader.setUniform("u_texture", e), this.sobelShader.setUniform("u_textureSize", [this.p.width, this.p.height]), this.sobelShader.setUniform("u_threshold", this._options.sobelThreshold), this.p.rect(0, 0, this.p.width, this.p.height), this.sobelFramebuffer.end(), this.sampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.sampleShader), this.sampleShader.setUniform("u_imageSize", [this.p.width, this.p.height]), this.sampleShader.setUniform("u_image", this.sobelFramebuffer), this.sampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.sampleShader.setUniform("u_threshold", this.options.sampleThreshold), this.p.rect(0, 0, this.p.width, this.p.height), this.sampleFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.primaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.secondaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._secondaryColorSampleFramebuffer.end(), this._inversionFramebuffer.begin(), this.p.clear(), this.p.shader(this.inversionShader), this.inversionShader.setUniform("u_invert", this.options.invertMode), this.inversionShader.setUniform("u_sampleTexture", this.sampleFramebuffer), r !== this && this.inversionShader.setUniform("u_previousInversionTexture", r.inversionFramebuffer), this.inversionShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.p.rect(0, 0, this.p.width, this.p.height), this._inversionFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_sketchTexture", this.sampleFramebuffer), this.asciiCharacterShader.setUniform("u_colorPaletteTexture", this.characterSet.characterColorPalette.framebuffer), r !== this && this.asciiCharacterShader.setUniform("u_previousAsciiCharacterTexture", r.asciiCharacterFramebuffer), this.asciiCharacterShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.asciiCharacterShader.setUniform("u_totalChars", this.characterSet.characters.length), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), super.render(e, r);
  }
}
var R = "precision mediump float;uniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);float luminance=0.299*color.r+0.587*color.g+0.114*color.b;color.rgb=vec3(luminance);gl_FragColor=color;}", N = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isMatchingSample=texture2D(u_sampleTexture,cellCenterTexCoord)==texture2D(u_sampleReferenceTexture,cellCenterTexCoord);if(isMatchingSample){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);return;}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}", X = "precision mediump float;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform sampler2D u_previousInversionTexture;uniform vec2 u_gridCellDimensions;uniform bool u_invert;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isMatchingSample=texture2D(u_sampleTexture,cellCenterTexCoord)==texture2D(u_sampleReferenceTexture,cellCenterTexCoord);if(!isMatchingSample){if(u_invert){gl_FragColor=vec4(1.0);}else{gl_FragColor=vec4(vec3(0.0),1.0);}return;}else{gl_FragColor=texture2D(u_previousInversionTexture,cellCenterTexCoord);}}", H = "precision mediump float;uniform sampler2D u_prevAsciiCharacterTexture;uniform sampler2D u_prevGradientTexture;uniform sampler2D u_nextGradientTexture;uniform vec2 u_resolution;void main(){vec2 uv=gl_FragCoord.xy/u_resolution;vec4 prevAscii=texture2D(u_prevAsciiCharacterTexture,uv);vec4 prevGradient=texture2D(u_prevGradientTexture,uv);vec4 nextGradient=texture2D(u_nextGradientTexture,uv);bool colorsMatch=prevGradient==nextGradient;gl_FragColor=colorsMatch ? prevAscii : nextGradient;}";
class _ extends l {
  constructor(e, r, i, s, g) {
    super(e, r, i, g);
    t(this, "grayscaleShader");
    t(this, "colorSampleShader");
    t(this, "grayscaleFramebuffer");
    t(this, "inversionShader");
    t(this, "asciiCharacterShader");
    t(this, "prevAsciiGradientFramebuffer");
    t(this, "nextAsciiGradientFramebuffer");
    t(this, "gradientManager");
    this.gradientManager = s, this.grayscaleShader = this.p.createShader(Q, R), this.colorSampleShader = this.p.createShader(Q, N), this.inversionShader = this.p.createShader(Q, X), this.asciiCharacterShader = this.p.createShader(Q, H), this.grayscaleFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.prevAsciiGradientFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.nextAsciiGradientFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows), this.prevAsciiGradientFramebuffer.resize(this.grid.cols, this.grid.rows), this.nextAsciiGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  render(e, r) {
    this.grayscaleFramebuffer.begin(), this.p.clear(), this.p.shader(this.grayscaleShader), this.grayscaleShader.setUniform("u_image", e), this.p.rect(0, 0, this.p.width, this.p.height), this.grayscaleFramebuffer.end(), this.prevAsciiGradientFramebuffer.begin(), this.p.clear(), this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2), this.prevAsciiGradientFramebuffer.end(), this.nextAsciiGradientFramebuffer.begin(), this.p.clear(), this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2), this.nextAsciiGradientFramebuffer.end();
    for (const i of this.gradientManager.gradients)
      i.enabled && ([this.prevAsciiGradientFramebuffer, this.nextAsciiGradientFramebuffer] = [this.nextAsciiGradientFramebuffer, this.prevAsciiGradientFramebuffer], this.nextAsciiGradientFramebuffer.begin(), this.p.clear(), this.p.shader(i.shader), i.setUniforms(this.prevAsciiGradientFramebuffer, this.grayscaleFramebuffer), this.p.rect(0, 0, this.grid.cols, this.grid.rows), this.nextAsciiGradientFramebuffer.end());
    this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), r !== this && this.asciiCharacterShader.setUniform("u_prevAsciiCharacterTexture", r.asciiCharacterFramebuffer), this.asciiCharacterShader.setUniform("u_prevGradientTexture", this.grayscaleFramebuffer), this.asciiCharacterShader.setUniform("u_nextGradientTexture", this.nextAsciiGradientFramebuffer), this.asciiCharacterShader.setUniform("u_resolution", [this.grid.cols, this.grid.rows]), this.p.rect(0, 0, this.grid.cols, this.grid.rows), this._asciiCharacterFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.primaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.colorSampleShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), r !== this && this.colorSampleShader.setUniform("u_previousColorTexture", r.secondaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.colorSampleShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._secondaryColorSampleFramebuffer.end(), this._inversionFramebuffer.begin(), this.p.clear(), this.p.shader(this.inversionShader), this.inversionShader.setUniform("u_invert", this._options.invertMode), this.inversionShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.inversionShader.setUniform("u_sampleTexture", this.nextAsciiGradientFramebuffer), this.inversionShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), r !== this && this.inversionShader.setUniform("u_previousInversionTexture", r.inversionFramebuffer), this.p.rect(0, 0, this.p.width, this.p.height), this._inversionFramebuffer.end(), super.render(e, r);
  }
}
const J = {
  /** Enable/disable the renderer */
  enabled: !0,
  /** Characters used for brightness mapping (from darkest to brightest) */
  characters: "0123456789",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
  characterColor: "#FFFFFF",
  /** Character color mode (0: `sampled`, 1: `fixed`) */
  characterColorMode: 0,
  /** Cell background color. Only used when `characterColorMode` is set to `1` */
  backgroundColor: "#000000",
  /** Background color mode (0: `sampled`, 1: `fixed`) */
  backgroundColorMode: 1,
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
}, O = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Characters used for pattern matching */
  characters: "0123456789",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
  characterColor: "#FFFFFF",
  /** Character color mode (0: `sampled`, 1: `fixed`) */
  characterColorMode: 0,
  /** Cell background color. Only used when `characterColorMode` is set to `1` */
  backgroundColor: "#000000",
  /** Background color mode (0: `sampled`, 1: `fixed`) */
  backgroundColorMode: 1,
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
}, j = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
  characterColor: "#FFFFFF",
  /** Character color mode (0: `sampled`, 1: `fixed`) */
  characterColorMode: 0,
  /** Cell background color. Only used when `characterColorMode` is set to `1` */
  backgroundColor: "#000000",
  /** Background color mode (0: `sampled`, 1: `fixed`) */
  backgroundColorMode: 1,
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
}, K = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Characters used for edge representation (8 characters for different angles) */
  characters: "-/|\\-/|\\",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
  characterColor: "#FFFFFF",
  /** Character color mode (0: `sampled`, 1: `fixed`) */
  characterColorMode: 0,
  /** Cell background color. Only used when `characterColorMode` is set to `1` */
  backgroundColor: "#000000",
  /** Background color mode (0: `sampled`, 1: `fixed`) */
  backgroundColorMode: 1,
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Threshold for Sobel edge detection. Responsible for edge detection sensitivity */
  sobelThreshold: 0.5,
  /** Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it */
  sampleThreshold: 16,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
}, L = {
  /** Enable/disable the renderer */
  enabled: !1,
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0
}, W = 16, Z = "#000000", d = (o, A, e, r) => {
  if (typeof o != "number" || o < A || o > e)
    throw new a(
      `Invalid ${r} value '${o}'. Expected a number between ${A} and ${e}.`
    );
}, V = (o, A) => {
  const [e, r] = [o, A].map((i) => i.split(".").map(Number));
  for (let i = 0; i < Math.max(e.length, r.length); i++) {
    const s = e[i] ?? 0, g = r[i] ?? 0;
    if (s !== g) return s > g ? 1 : -1;
  }
  return 0;
};
class C {
  constructor(A, e, r, i, s, g) {
    t(this, "_brightnessStart");
    t(this, "_brightnessEnd");
    t(this, "enabled");
    t(this, "_onPaletteChangeCallback");
    t(this, "_palette");
    this.p = A, this._fontTextureAtlas = e, this._shader = r, this._palette = new w(this.p, this._fontTextureAtlas.getCharsetColorArray(g)), this._brightnessStart = Math.floor(i / 255 * 100) / 100, this._brightnessEnd = Math.ceil(s / 255 * 100) / 100, this.enabled = !0;
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
  set brightnessStart(A) {
    d(A, 0, 255, "brightness start"), this._brightnessStart = A;
  }
  /**
   * Sets the end brightness value.
   * @param value The brightness value to set.
   * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
   */
  set brightnessEnd(A) {
    d(A, 0, 255, "brightness start"), this._brightnessEnd = A;
  }
  /**
   * Sets the characters to use for the gradient.
   * @param value The characters to use.
   * @throws P5AsciifyError If the string does contain characters that are not available in the font texture atlas.
   */
  set characters(A) {
    this.p._setupDone && this.palette.setColors(this._fontTextureAtlas.getCharsetColorArray(A));
  }
  // Getters
  get shader() {
    return this._shader;
  }
  get palette() {
    return this._palette;
  }
  get brightnessEnd() {
    return this._brightnessEnd;
  }
  get brightnessStart() {
    return this._brightnessStart;
  }
}
class $ extends C {
  constructor(e, r, i, s, g, E, B) {
    super(e, r, i, s, g, E);
    t(this, "direction");
    t(this, "angle");
    t(this, "speed");
    t(this, "zigzag");
    this.p = e, this._fontTextureAtlas = r, this._shader = i, this.direction = B.direction, this.angle = B.angle, this.speed = B.speed, this.zigzag = B.zigzag;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_gradientDirection", this.direction), this._shader.setUniform("u_angle", this.angle * Math.PI / 180), this._shader.setUniform("u_speed", this.speed), this._shader.setUniform("u_zigzag", this.zigzag);
  }
}
class q extends C {
  constructor(e, r, i, s, g, E, B) {
    super(e, r, i, s, g, E);
    t(this, "direction");
    t(this, "centerX");
    t(this, "centerY");
    t(this, "speed");
    t(this, "density");
    this.p = e, this._fontTextureAtlas = r, this._shader = i, this.direction = B.direction, this.centerX = B.centerX, this.centerY = B.centerY, this.speed = B.speed, this.density = B.density;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_gradientDirection", this.direction), this._shader.setUniform("u_centerX", this.centerX), this._shader.setUniform("u_centerY", this.centerY), this._shader.setUniform("u_speed", this.speed), this._shader.setUniform("u_density", this.density);
  }
}
class AA extends C {
  constructor(e, r, i, s, g, E, B) {
    super(e, r, i, s, g, E);
    t(this, "direction");
    t(this, "centerX");
    t(this, "centerY");
    t(this, "radius");
    this.p = e, this._fontTextureAtlas = r, this._shader = i, this.direction = B.direction, this.centerX = B.centerX, this.centerY = B.centerY, this.radius = B.radius;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_gradientDirection", this.direction), this._shader.setUniform("u_centerX", this.centerX), this._shader.setUniform("u_centerY", this.centerY), this._shader.setUniform("u_radius", this.radius);
  }
}
class eA extends C {
  constructor(e, r, i, s, g, E, B) {
    super(e, r, i, s, g, E);
    t(this, "centerX");
    t(this, "centerY");
    t(this, "speed");
    this.p = e, this._fontTextureAtlas = r, this._shader = i, this.centerX = B.centerX, this.centerY = B.centerY, this.speed = B.speed;
  }
  setUniforms(e, r) {
    super.setUniforms(e, r), this._shader.setUniform("u_centerX", this.centerX), this._shader.setUniform("u_centerY", this.centerY), this._shader.setUniform("u_speed", this.speed);
  }
}
var rA = "precision mediump float;varying vec2 v_texCoord;uniform bool u_zigzag;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(!(originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1])){gl_FragColor=texColor;return;}float index;if(u_zigzag){vec2 coord=gl_FragCoord.xy;float posX=coord.x*cos(u_angle)-coord.y*sin(u_angle);float posY=coord.x*sin(u_angle)+coord.y*cos(u_angle);float direction=mod(floor(posY),2.0)==0.0 ? 1.0 :-1.0;index=mod(posX+float(frameCount)*u_speed*direction*u_gradientDirection,gradientTextureDimensions.x);}else{vec2 coord=floor(gl_FragCoord.xy);float pos=coord.x*cos(u_angle)+coord.y*sin(u_angle);index=mod(pos+float(frameCount)*u_gradientDirection*u_speed,gradientTextureDimensions.x);}index=floor(index);float texelPos=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPos,0.0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}", tA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_centerX;uniform float u_centerY;uniform float u_speed;uniform float u_density;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_gradientDirection*u_speed;float index=mod((distance+adjustedAngle*u_density)*gradientTextureDimensions.x,gradientTextureDimensions.x);float normalizedIndex=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", iA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float u_radius;uniform int frameCount;uniform int u_gradientDirection;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float normalizedDistance=clamp(distance/u_radius,0.0,1.0);float index=normalizedDistance*(gradientTextureDimensions.x-1.0);float animatedIndex=mod(index+float(frameCount)*0.1*float(-u_gradientDirection),gradientTextureDimensions.x);float normalizedIndex=(floor(animatedIndex)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", sA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform int frameCount;uniform float u_speed;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 flippedTexCoord=vec2(v_texCoord.x,v_texCoord.y);vec4 texColor=texture2D(textureID,flippedTexCoord);vec4 originalTexColor=texture2D(originalTextureID,flippedTexCoord);if(originalTexColor.r>=u_brightnessRange[0]&&originalTexColor.r<=u_brightnessRange[1]){vec2 relativePosition=flippedTexCoord-vec2(u_centerX,u_centerY);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_speed;float normalizedAngle=mod(adjustedAngle+3.14159265,2.0*3.14159265)/(2.0*3.14159265);float index=normalizedAngle*gradientTextureDimensions.x;float normalizedIndex=mod(floor(index)+0.5,gradientTextureDimensions.x)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}";
class oA {
  constructor(A, e) {
    t(this, "_gradientParams", {
      linear: { direction: 1, angle: 0, speed: 0.01, zigzag: !1 },
      spiral: { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
      radial: { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
      conical: { centerX: 0.5, centerY: 0.5, speed: 0.01 }
    });
    t(this, "_gradientShaderSources", {
      linear: rA,
      spiral: tA,
      radial: iA,
      conical: sA
    });
    t(this, "_gradientShaders", {});
    t(this, "_gradientConstructors", {
      linear: (A, e, r, i, s, g, E) => new $(A, e, r, i, s, g, E),
      spiral: (A, e, r, i, s, g, E) => new q(A, e, r, i, s, g, E),
      radial: (A, e, r, i, s, g, E) => new AA(A, e, r, i, s, g, E),
      conical: (A, e, r, i, s, g, E) => new eA(A, e, r, i, s, g, E)
    });
    t(this, "_gradients", []);
    this._p = A, this._fontTextureAtlas = e;
    for (const r of Object.keys(this._gradientShaderSources)) {
      const i = this._gradientShaderSources[r];
      this._gradientShaders[r] = this._p.createShader(Q, i);
    }
  }
  /**
   * Add a gradient to the gradient manager.
   * @param gradientName The name of the gradient to add.
   * @param brightnessStart The start brightness of the gradient.
   * @param brightnessEnd The end brightness of the gradient.
   * @param characters The characters to use for the gradient.
   * @param params The parameters for the gradient.
   * @returns The gradient instance.
   */
  addGradient(A, e, r, i, s) {
    const g = this._gradientConstructors[A](
      this._p,
      this._fontTextureAtlas,
      this._gradientShaders[A],
      e,
      r,
      i,
      { ...this._gradientParams[A], ...s }
    );
    return this._gradients.push(g), g;
  }
  /**
   * Remove a gradient from the gradient manager.
   * @param gradient The gradient to remove.
   */
  removeGradient(A) {
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
class aA {
  constructor(A, e, r) {
    t(this, "currentCanvasDimensions");
    t(this, "_renderers");
    t(this, "gradientManager");
    t(this, "lastRenderer");
    this.p = A, this.grid = e, this.fontTextureAtlas = r, this.currentCanvasDimensions = {
      width: this.p.width,
      height: this.p.height
    }, this.gradientManager = new oA(A, this.fontTextureAtlas), this._renderers = [
      { name: "brightness", renderer: new u(this.p, this.grid, r, J) },
      { name: "accurate", renderer: new P(this.p, this.grid, r, O) },
      { name: "gradient", renderer: new _(this.p, this.grid, r, this.gradientManager, j) },
      { name: "edge", renderer: new I(this.p, this.grid, r, K) },
      { name: "custom", renderer: new l(this.p, this.grid, r, L) }
    ], this.lastRenderer = this._renderers[0].renderer;
  }
  /**
   * Renders the ASCII output to the canvas.
   * @param inputFramebuffer The input framebuffer to transform into ASCII.
   * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
   */
  render(A) {
    let e = this._renderers[0].renderer;
    for (const r of this._renderers)
      r.renderer.options.enabled && (r.renderer.render(A, e), r.renderer.outputFramebuffer, e = r.renderer, this.lastRenderer = r.renderer);
    this.checkCanvasDimensions();
  }
  /**
   * Continuously checks if the canvas dimensions have changed.
   * If they have, the grid is reset and the renderers are resized.
   */
  checkCanvasDimensions() {
    (this.currentCanvasDimensions.width !== this.p.width || this.currentCanvasDimensions.height !== this.p.height) && (this.currentCanvasDimensions.width = this.p.width, this.currentCanvasDimensions.height = this.p.height, this.grid.reset(), this.resetRendererDimensions());
  }
  /**
   * Resets the dimensions of all renderers.
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
   */
  add(A, e, r) {
    switch (e) {
      case "brightness":
        this._renderers.push({ name: A, renderer: new u(this.p, this.grid, this.fontTextureAtlas, r) });
        break;
      case "accurate":
        this._renderers.push({ name: A, renderer: new P(this.p, this.grid, this.fontTextureAtlas, r) });
        break;
      case "gradient":
        this._renderers.push({ name: A, renderer: new _(this.p, this.grid, this.fontTextureAtlas, this.gradientManager, r) });
        break;
      case "edge":
        this._renderers.push({ name: A, renderer: new I(this.p, this.grid, this.fontTextureAtlas, r) });
        break;
      case "custom":
        this._renderers.push({ name: A, renderer: new l(this.p, this.grid, this.fontTextureAtlas, r) });
        break;
      default:
        throw new a(`Invalid renderer type: ${e}`);
    }
  }
  /**
   * Gets the ASCII renderer instance with the given name.
   * @param name The name of the renderer to get.
   * @returns The ASCII renderer instance with the given name.
   */
  get(A) {
    var r;
    const e = (r = this._renderers.find((i) => i.name === A)) == null ? void 0 : r.renderer;
    if (!e)
      throw new a(
        `Renderer '${A}' not found. Available renderers: ${this._renderers.map((i) => i.name).join(", ")}`
      );
    return e;
  }
  /**
   * Moves a renderer up in the list of renderers.
   * @param renderer The renderer to move up in the list.
   */
  moveDown(A) {
    const e = this.getRendererIndex(A);
    e <= 0 || this.swap(A, this._renderers[e - 1].renderer);
  }
  /**
   * Moves a renderer down in the list of renderers.
   * @param renderer The renderer to move down in the list.
   */
  moveUp(A) {
    const e = this.getRendererIndex(A);
    e === -1 || e >= this._renderers.length - 1 || this.swap(A, this._renderers[e + 1].renderer);
  }
  /**
   * Removes a renderer from the list of renderers.
   * @param renderer The name of the renderer or the renderer instance itself.
   */
  remove(A) {
    const e = this.getRendererIndex(A);
    if (e === -1)
      throw new a("Renderer not found.");
    this._renderers.splice(e, 1);
  }
  /**
   * Clears the list of renderers.
   */
  clear() {
    this._renderers = [];
  }
  /**
   * Swaps the positions of two renderers in the renderer list.
   * @param renderer1 The name of the first renderer or the renderer instance itself.
   * @param renderer2 The name of the second renderer or the renderer instance itself.
   */
  swap(A, e) {
    const r = this.getRendererIndex(A), i = this.getRendererIndex(e);
    if (r === -1 || i === -1)
      throw new a("One or more renderers not found.");
    const s = this._renderers[r];
    this._renderers[r] = this._renderers[i], this._renderers[i] = s, this.lastRenderer = this._renderers[0].renderer;
  }
  /**
   * Gets the index of a renderer in the list of renderers.
   * @param renderer The renderer to get the index of.
   * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
   */
  getRendererIndex(A) {
    return typeof A == "string" ? this._renderers.findIndex((e) => e.name === A) : this._renderers.findIndex((e) => e.renderer === A);
  }
  // Getters
  get renderers() {
    return this._renderers;
  }
}
const c = {
  /** Minimum allowed font size in pixels */
  MIN: 1,
  /** Maximum allowed font size in pixels */
  MAX: 128
};
function gA(o, A, e, r, i, s) {
  if (typeof A != "string")
    throw new a("Gradient name must be a string");
  if (!o.gradientConstructors[A])
    throw new a(
      `Gradient '${A}' does not exist! Available gradients: ${Object.keys(o.gradientConstructors).join(", ")}`
    );
  if (typeof e != "number")
    throw new a("Brightness start value must be a number");
  if (typeof r != "number")
    throw new a("Brightness end value must be a number");
  if (d(e, 0, 255, "brightness start"), d(r, 0, 255, "brightness end"), typeof i != "string")
    throw new a("Characters must be a string");
  if (i.length === 0)
    throw new a("Characters string cannot be empty");
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new a("User parameters must be an object");
  const g = Object.keys(o.gradientParams[A]), E = Object.keys(s).filter((B) => !g.includes(B));
  if (E.length > 0)
    throw new a(
      `Invalid parameter(s) for gradient '${A}': ${E.join(", ")}
Valid parameters are: ${g.join(", ")}`
    );
}
class BA {
  constructor() {
    /** Contains texture with all glyphs of a given font.*/
    t(this, "asciiFontTextureAtlas");
    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font size. */
    t(this, "grid");
    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers. */
    t(this, "sketchFramebuffer");
    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    t(this, "rendererManager");
    /** The p5 instance. */
    t(this, "_p");
    /** The font to use for the ASCII rendering. */
    t(this, "_font");
    /** The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. */
    t(this, "_backgroundColor", Z);
    /** The font size to use for the ASCII rendering. */
    t(this, "_fontSize", W);
  }
  /**
   * Used to pass the p5 instance to the `p5.asciify` library. 
   * 
   * @remarks
   * This method is called automatically in `GLOBAL` mode. In `INSTANCE` mode, it must be called manually at the start of the sketch.
   * 
   * In `GLOBAL` mode, `addDummyPreloadFunction` is set to `false` to prevent the p5 instance from adding a dummy preload function,
   * which is already added to `window` by the library.
   * 
   * In `INSTANCE` mode, `addDummyPreloadFunction` is set to `true` to add a dummy preload function to the p5 instance directly.
   * 
   * A dummy `preload` function is necessary in case the user does not provide one, since `p5.asciify` relies on the benefits of the `preload` function.
   * 
   * The implementation and difference with dummy `preload` definitions for `GLOBAL` and `INSTANCE` modes is questionable, but I haven't found a better solution yet.
   * 
   * @param p The p5 instance
   * @param addDummyPreloadFunction Whether to add a dummy preload function to the p5 instance
   */
  instance(A, e = !0) {
    this._p = A, this._p.p5asciify = this, !A.preload && e && (A.preload = () => {
    });
  }
  /**
   * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
   * 
   * Is called automatically after the user's `setup()` function has finished.
   */
  setup() {
    this.asciiFontTextureAtlas = new v(
      this._p,
      this._font,
      this._fontSize
    ), this.grid = new S(
      this._p,
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ), this.rendererManager = new aA(
      this._p,
      this.grid,
      this.asciiFontTextureAtlas
    ), this.sketchFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  /**
   * Renders the ASCII output to the canvas.
   * 
   * Is called automatically every time the user's `draw()` function has finished.
   */
  asciify() {
    this.rendererManager.render(this.sketchFramebuffer), this._p.clear(), this._p.background(this._backgroundColor), this._p.image(this.rendererManager.lastRenderer.outputFramebuffer, -this._p.width / 2, -this._p.height / 2);
  }
  /**
   * Adds a new gradient to the renderer managers gradient manager, which will be rendered by the `GradientAsciiRenderer`.
   * @param gradientName The name of the gradient.
   * @param brightnessStart The brightness value at which the gradient starts.
   * @param brightnessEnd The brightness value at which the gradient ends.
   * @param characters The characters to use for the gradient.
   * @param userParams Optional parameters to pass to the gradient.
   */
  addAsciiGradient(A, e, r, i, s = {}) {
    return gA(
      this.rendererManager.gradientManager,
      A,
      e,
      r,
      i,
      s
    ), this.rendererManager.gradientManager.addGradient(
      A,
      e,
      r,
      i,
      s
    );
  }
  /**
   * Removes a gradient from the renderer managers gradient manager.
   * @param gradient The gradient to remove.
   */
  removeAsciiGradient(A) {
    this.rendererManager.gradientManager.removeGradient(A);
  }
  /**
   * Sets the font size for the ascii renderers.
   * @param fontSize The font size to set.
   * @throws {@link P5AsciifyError} - If the font size is out of bounds.
   */
  fontSize(A) {
    if (A < c.MIN || A > c.MAX)
      throw new a(`Font size ${A} is out of bounds. It should be between ${c.MIN} and ${c.MAX}.`);
    this._fontSize = A, this._p._setupDone && (this.asciiFontTextureAtlas.setFontSize(A), this.grid.resizeCellPixelDimensions(
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ), this.rendererManager.resetRendererDimensions());
  }
  renderers() {
    return this.rendererManager;
  }
  /**
   * Sets the font for the ascii renderers.
   * @param font The font to use. Can be a path, base64 string, or p5.Font object.
   * @throws {@link P5AsciifyError} - If the font parameter is invalid or the font fails to load.
   */
  loadFont(A) {
    if (typeof A != "string" && !(A instanceof h.Font))
      throw new a("Invalid font parameter. Expected a path, base64 string, or p5.Font object.");
    typeof A == "string" ? this._p.loadFont(
      A,
      (e) => {
        this._font = e, this._p._decrementPreload();
      },
      () => {
        throw new a(`Failed to load font from path: '${A}'`);
      }
    ) : this._font = A, this._p._setupDone && (this.asciiFontTextureAtlas.setFontObject(A), this.rendererManager.renderers.forEach((e) => e.renderer.characterSet.reset()), this.grid.resizeCellPixelDimensions(
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ));
  }
  /**
   * Sets the background color for the ascii renderers. 
   * 
   * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
   * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
   * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
   */
  background(A) {
    if (typeof A != "string" && !Array.isArray(A) && !(A instanceof h.Color))
      throw new a(`Invalid color type: ${typeof A}. Expected string, array or p5.Color.`);
    this._backgroundColor = A;
  }
}
function QA(o) {
  if (!(o._renderer.drawingContext instanceof WebGLRenderingContext || o._renderer.drawingContext instanceof WebGL2RenderingContext))
    throw new a("WebGL renderer is required for p5.asciify to run.");
  if (V(o.VERSION, "1.8.0") < 0)
    throw new a("p5.asciify requires p5.js v1.8.0 or higher to run.");
}
const EA = `data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
`, n = new BA();
typeof window < "u" && (window.preload = function() {
}, window.p5asciify = n);
h.prototype.setupAsciify = function() {
};
h.prototype.drawAsciify = function() {
};
h.prototype.registerMethod("init", function() {
  n.instance(this, !1), this._incrementPreload(), n.loadFont(EA);
});
h.prototype.registerMethod("afterSetup", function() {
  QA(this), n.setup(), this.setupAsciify();
});
h.prototype.registerMethod("pre", function() {
  n.sketchFramebuffer.begin(), this.clear(), this.push();
});
h.prototype.registerMethod("post", function() {
  this.pop(), n.sketchFramebuffer.end(), n.asciify(), this.drawAsciify();
});
export {
  O as ACCURATE_DEFAULT_OPTIONS,
  J as BRIGHTNESS_DEFAULT_OPTIONS,
  L as CUSTOM_DEFAULT_OPTIONS,
  Z as DEFAULT_BACKGROUND_COLOR,
  W as DEFAULT_FONT_SIZE,
  K as EDGE_DEFAULT_OPTIONS,
  c as FONT_SIZE_LIMITS,
  j as GRADIENT_DEFAULT_OPTIONS,
  BA as P5Asciifier,
  P as P5AsciifyAccurateRenderer,
  u as P5AsciifyBrightnessRenderer,
  F as P5AsciifyCharacterSet,
  w as P5AsciifyColorPalette,
  eA as P5AsciifyConicalGradient,
  I as P5AsciifyEdgeRenderer,
  a as P5AsciifyError,
  v as P5AsciifyFontTextureAtlas,
  C as P5AsciifyGradient,
  oA as P5AsciifyGradientManager,
  _ as P5AsciifyGradientRenderer,
  S as P5AsciifyGrid,
  $ as P5AsciifyLinearGradient,
  AA as P5AsciifyRadialGradient,
  l as P5AsciifyRenderer,
  aA as P5AsciifyRendererManager,
  q as P5AsciifySpiralGradient,
  n as p5asciify
};
