var R = Object.defineProperty;
var N = (s, e, A) => e in s ? R(s, e, { enumerable: !0, configurable: !0, writable: !0, value: A }) : s[e] = A;
var t = (s, e, A) => N(s, typeof e != "symbol" ? e + "" : e, A);
import E from "p5";
class H {
  /**
   * Create a new grid instance.
   * @param _p The p5 instance.
   * @param _cellWidth The width of each cell in the grid.
   * @param _cellHeight The height of each cell in the grid.
   * @ignore
   */
  constructor(e, A, r) {
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
    /** Whether the grid dimensions are fixed, or responsive based on the canvas dimensions. */
    t(this, "_fixedDimensions", !1);
    this._p = e, this._cellWidth = A, this._cellHeight = r, this.reset();
  }
  /**
   * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
   * @ignore
   */
  reset() {
    this._fixedDimensions || ([this._cols, this._rows] = [Math.floor(this._p.width / this._cellWidth), Math.floor(this._p.height / this._cellHeight)]), this._resizeGrid();
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
   * @ignore
   */
  resizeCellPixelDimensions(e, A) {
    [this._cellWidth, this._cellHeight] = [e, A], this.reset();
  }
  /**
   * Re-assign the grid dimensions and resize the grid. 
   * 
   * Calling this method makes the grid dimensions fixed, meaning they will not automatically resize based on the canvas dimensions.
   * @param newCols The new number of columns.
   * @param newRows The new number of rows.
   * @ignore
   */
  resizeGridDimensions(e, A) {
    this._fixedDimensions = !0, [this._cols, this._rows] = [e, A], this._resizeGrid();
  }
  /**
   * Make the grid dimensions flexible again, and `reset()` the grid.
   * @ignore
   */
  resetGridDimensions() {
    this._fixedDimensions = !1, this.reset();
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
  /** 
   * Returns `true` if the grid dimensions *(columns and rows)* are fixed, or `false` if they are responsive based on the canvas dimensions.
   */
  get fixedDimensions() {
    return this._fixedDimensions;
  }
  /**
   * Sets whether the grid dimensions *(columns and rows)* are fixed or responsive based on the canvas dimensions.
   * @param value `true` to make the grid dimensions fixed, or `false` to make them responsive.
   * @ignore
   */
  set fixedDimensions(e) {
    this._fixedDimensions = e;
  }
}
class o extends Error {
  /**
   * Create a new P5AsciifyError instance.
   * @param message The error message.
   */
  constructor(e) {
    super(e), this.name = "P5AsciifyError";
  }
}
class J {
  /**
   * Creates a new `P5AsciifyFontManager` instance.
   * @param _p The p5 instance.
   * @param _font The font to use for ASCII rendering.
   */
  constructor(e, A) {
    /** An array of supported characters in the font. */
    t(this, "_characters", []);
    /** An array of character glyphs with color assignments. */
    t(this, "_characterGlyphs", []);
    /** Maximum width and height of the glyphs in the font. */
    t(this, "_maxGlyphDimensions");
    /** Texture containing all characters in the font. As square as possible. */
    t(this, "_texture");
    /** Number of columns in the texture. */
    t(this, "_textureColumns");
    /** Number of rows in the texture. */
    t(this, "_textureRows");
    /** Font size to use for the texture that contains all characters of the font. */
    t(this, "_fontSize", 16);
    this._p = e, this._font = A, this._initializeGlyphsAndCharacters();
  }
  /**
   * Sets up the font manager with the specified font size 
   * and initializes the texture containing all characters in the font.
   * @param fontSize The font size to use for the texture.
   * @ignore
   */
  setup(e) {
    this._fontSize = e, this.reset();
  }
  /**
   * Initializes the character glyphs and characters array.
   */
  _initializeGlyphsAndCharacters() {
    const e = Object.values(this._font.font.glyphs.glyphs);
    this._characters = e.filter((A) => A.unicode !== void 0).map((A) => String.fromCharCode(A.unicode)), this._characterGlyphs = Object.values(this._font.font.glyphs.glyphs).filter((A) => A.unicode !== void 0).map((A, r) => (A.r = r % 256, A.g = Math.floor(r / 256) % 256, A.b = Math.floor(r / 65536), A));
  }
  /**
   * Loads a font for ASCII rendering.
   * 
   * Not intended to be called directly. Use {@link P5Asciifier}'s `font()` instead.
   * Otherwise, other parts of the library are not updated with the new font information.
   * 
   * @param font The p5.Font object to use for ASCII rendering.
   * @throws {@link P5AsciifyError} If the font parameter is invalid.
   * @ignore
   */
  loadFont(e) {
    if (!(e instanceof E.Font))
      throw new o("Invalid font parameter. Expected a path, base64 string, blob URL, or p5.Font object.");
    this._font = e, this._initializeGlyphsAndCharacters();
  }
  /**
   * Gets the color of a character in the font.
   * @param char The character to get the color for.
   * @returns An array containing the RGB color values for the character, 
   *          which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer` 
   *          to convert those pixels into the selected character.
   * @throws {@link P5AsciifyError} If the character is not found in the font.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Get the RGB color of the character 'A'
   *      const color = p5asciify.asciifier().fontManager.glyphColor('A');
   *      console.log(color);
   *  }
   * ```
   */
  glyphColor(e) {
    const A = this._characterGlyphs.find(
      (r) => r.unicodes.includes(e.codePointAt(0))
    );
    if (!A)
      throw new o(`Could not find character in character set: ${e}`);
    return [A.r, A.g, A.b];
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
   *      console.log(p5asciify.asciifier().fontManager.getUnsupportedCharacters(" .,ABC123"));
   *  }
   * ```
   */
  getUnsupportedCharacters(e) {
    return Array.from(
      new Set(
        Array.from(e).filter(
          (A) => !this._characterGlyphs.some(
            (r) => r.unicodes.includes(A.codePointAt(0))
          )
        )
      )
    );
  }
  /**
   * Validates a string of characters against the current font.
   * @param characters The string of characters to validate.
   * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
   * @ignore
   */
  validateCharacters(e) {
    const A = this.getUnsupportedCharacters(e);
    if (A.length > 0)
      throw new o(`The following characters are not supported by the current font: [${A.join(", ")}].`);
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
   *      const colors = p5asciify.asciifier().fontManager.glyphColors('ABC');
   *      console.log(colors);
   *  }
   * ```
   */
  glyphColors(e = "") {
    return Array.from(e).map((A) => {
      const r = this._characterGlyphs.find(
        (i) => i.unicodes.includes(A.codePointAt(0))
      );
      if (!r)
        throw new o(`Could not find character in character set: ${A}`);
      return [r.r, r.g, r.b];
    });
  }
  /**
       * Calculates the maximum width and height of all the glyphs in the font.
       * @param fontSize - The font size to use for calculations.
       * @returns An object containing the maximum width and height of the glyphs.
       */
  _getMaxGlyphDimensions(e) {
    return this.characterGlyphs.reduce(
      (A, r) => {
        const i = r.getPath(0, 0, e).getBoundingBox();
        return {
          width: Math.ceil(Math.max(A.width, i.x2 - i.x1)),
          height: Math.ceil(Math.max(A.height, i.y2 - i.y1))
        };
      },
      { width: 0, height: 0 }
    );
  }
  /**
   * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
   * @ignore
   */
  reset() {
    this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
   * @param fontSize - The new font size.
   * @ignore
   */
  setFontSize(e) {
    this._fontSize = e, this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
   * @param fontSize - The font size to use for creating the texture.
   */
  _createTexture(e) {
    this._textureColumns = Math.ceil(Math.sqrt(this.characters.length)), this._textureRows = Math.ceil(this.characters.length / this._textureColumns), this._texture ? this._texture.resize(this._maxGlyphDimensions.width * this._textureColumns, this._maxGlyphDimensions.height * this._textureRows) : this._texture = this._p.createFramebuffer({
      width: this._maxGlyphDimensions.width * this._textureColumns,
      height: this._maxGlyphDimensions.height * this._textureRows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._texture.begin(), this._p.clear(), this._p.textFont(this._font), this._p.fill(255), this._p.textSize(e), this._p.textAlign(this._p.LEFT, this._p.TOP), this._p.noStroke();
    for (let A = 0; A < this.characterGlyphs.length; A++) {
      const r = A % this._textureColumns, i = Math.floor(A / this._textureColumns), B = this._maxGlyphDimensions.width * r - this._maxGlyphDimensions.width * this._textureColumns / 2, g = this._maxGlyphDimensions.height * i - this._maxGlyphDimensions.height * this._textureRows / 2;
      this._p.text(String.fromCharCode(this.characterGlyphs[A].unicode), B, g);
    }
    this._texture.end();
  }
  /**
   * Returns the maximum width and height found in all the glyphs in the font.
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
  get textureColumns() {
    return this._textureColumns;
  }
  /**
   * Returns the number of rows in the texture containing all characters in the font.
   */
  get textureRows() {
    return this._textureRows;
  }
  /**
   * Returns the font size used for the texture containing all characters in the font.
   */
  get fontSize() {
    return this._fontSize;
  }
  /**
   * The `p5.Font` object used for ASCII rendering.
   * 
   * @example
   * ```javascript
   *  function drawAsciify() {
   *      // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
   *      textFont(p5asciify.asciifier().fontManager.font);
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
   *      // Print the supported characters in the font to the console
   *      console.log(p5asciify.asciifier().fontManager.characters);
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
   *      // Print the character glyph objects of the font to the console
   *      console.log(p5asciify.asciifier().fontManager.characterGlyphs);
   *  }
   * ```
   */
  get characterGlyphs() {
    return this._characterGlyphs;
  }
}
class G {
  /**
   * Constructs a new ASCII renderer instance. Called by derived classes.
   * @param _p The p5 instance.
   * @param _grid Grid object containing the relevant grid information.
   * @param initialFramebufferDimensions The initial framebuffer dimensions.
   * @param _fontManager The font manager instance containing the ASCII characters texture.
   * @param _options The options for the ASCII renderer.
   * @ignore
   */
  constructor(e, A, r, i, B) {
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    t(this, "_primaryColorFramebuffer");
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    t(this, "_secondaryColorFramebuffer");
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    t(this, "_characterFramebuffer");
    /** The inversion framebuffer, whose pixels define whether to swap the character and background colors. */
    t(this, "_inversionFramebuffer");
    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    t(this, "_rotationFramebuffer");
    this._p = e, this._grid = A, this.initialFramebufferDimensions = r, this._fontManager = i, this._options = B;
    const g = {
      density: 1,
      antialias: !1,
      width: r.width,
      height: r.height,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    };
    this._primaryColorFramebuffer = this._p.createFramebuffer(g), this._secondaryColorFramebuffer = this._p.createFramebuffer(g), this._inversionFramebuffer = this._p.createFramebuffer(g), this._characterFramebuffer = this._p.createFramebuffer(g), this._rotationFramebuffer = this._p.createFramebuffer(g);
  }
  /**
   * Updates renderer options.
   * @param newOptions - The new options to update.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Update the brightness renderer options
   *      p5asciify.asciifier().renderers().get("brightness").update({
   *          enabled: true,
   *          characterColor: color(255, 0, 0),
   *          backgroundColor: color(0, 0, 255),
   *          characters: '.:-=+*#%@',
   *          invertMode: true,
   *          rotationAngle: 90,
   *          // ...
   *      });
   *  }
   * ```
   */
  update(e) {
    (e == null ? void 0 : e.enabled) !== void 0 && this.enabled(e.enabled);
  }
  /**
   * Enable or disable the renderer.
   * @param enabled - Whether to enable or disable the renderer.
   * @returns The current/new state of the renderer.
   * @throws {P5AsciifyError} If the provided enabled value is not a boolean.
   * 
   * @example
   * ```javascript
   *  function keyPressed() {
   *      if (key === 'd') {
   *          // Disable the brightness renderer
   *          p5asciify.asciifier().renderers().get("brightness").enabled(false);
   *      } else if (key === 'e') {
   *          // Enable the brightness renderer
   *          p5asciify.asciifier().renderers().get("brightness").enabled(true);
   *      }
   *  }
   * ```
   */
  enabled(e) {
    if (e === void 0)
      return this._options.enabled;
    if (typeof e != "boolean")
      throw new o("Enabled must be a boolean.");
    if (this._options.enabled = e, !e) {
      const A = [
        this._primaryColorFramebuffer,
        this._secondaryColorFramebuffer,
        this._inversionFramebuffer,
        this._rotationFramebuffer,
        this._characterFramebuffer
      ];
      for (const r of A)
        r.draw(() => {
          this._p.clear();
        });
    }
    return this._options.enabled;
  }
  /**
   * Enable the renderer.
   * @returns The new state of the renderer.
   * 
   * @example
   * ```javascript
   *  function keyPressed() {
   *      if (key === 'd') {
   *          // Disable the brightness renderer
   *          p5asciify.asciifier().renderers().get("brightness").disable();
   *      } else if (key === 'e') {
   *          // Enable the brightness renderer
   *          p5asciify.asciifier().renderers().get("brightness").enable();
   *      }
   *  }
   * ```
   */
  enable() {
    return this.enabled(!0);
  }
  /**
   * Disable the renderer.
   * 
   * Disabling the renderer will clear all framebuffers, 
   * and prevent the renderer from being executed in the rendering pipeline.
   * 
   * @returns The new state of the renderer.
   * 
   * @example
   * ```javascript
   *  function keyPressed() {
   *      if (key === 'd') {
   *          // Disable the brightness renderer
   *          p5asciify.asciifier().renderers().get("brightness").disable();
   *      } else if (key === 'e') {
   *          // Enable the brightness renderer
   *          p5asciify.asciifier().renderers().get("brightness").enable();
   *      }
   *  }
   * ```
   */
  disable() {
    return this.enabled(!1);
  }
  /**
   * Get the set options for the ASCII renderer.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Get the brightness renderer options
   *      const brightnessOptions = p5asciify.asciifier().renderers().get("brightness").options();
   *      console.log(brightnessOptions);
   *  }
   * ```
   */
  get options() {
    return this._options;
  }
  /**
   * Get the primary color framebuffer, whose pixels define the character colors of the grid cells.
   * 
   * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
   * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   *  
   *  let asciifier;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   *      // Get the asciifier instance
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Enable the default custom renderer
   *      asciifier.renderers().get("custom2D").enable();
   *      
   *      // Assign the ascii renderer's framebuffers to a global variable
   *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
   *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      asciifier.fill("A");
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
  get primaryColorFramebuffer() {
    return this._primaryColorFramebuffer;
  }
  /**
   * Get the secondary color framebuffer, whose pixels define the background colors of the grid cells.
   * 
   * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
   * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   * 
   *  let asciifier;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   *      // Get the asciifier instance
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Enable the default custom renderer
   *      asciifier.renderers().get("custom2D").enable();
   *      
   *      // Assign the ascii renderer's framebuffers to a global variable
   *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
   *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      asciifier.fill("A");
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
  get secondaryColorFramebuffer() {
    return this._secondaryColorFramebuffer;
  }
  /**
   * Get the inversion framebuffer, 
   * whose pixels define whether to swap the character and background colors of the grid cells.
   * 
   * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
   * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   *  let inversionFramebuffer;
   * 
   *  let asciifier;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   * 
   *      // Get the asciifier instance
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Enable the default custom renderer
   *      asciifier.renderers().get("custom2D").enable();
   *      
   *      // Assign the ascii renderer's framebuffers to a global variable
   *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
   *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
   *      inversionFramebuffer = asciifier.renderers().get("custom2D").inversionFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      asciifier.fill("A");
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
   * 
   *      // Swap the character and background colors of all grid cells.
   *      inversionFramebuffer.begin();
   *      background(255); // WHITE = swap, BLACK = don't swap
   *      inversionFramebuffer.end();
   *  }
   * ```
   */
  get inversionFramebuffer() {
    return this._inversionFramebuffer;
  }
  /**
   * Get the rotation framebuffer, whose pixels define the rotation angle of each character in the grid.
   * 
   * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
   * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   *  let rotationFramebuffer;
   * 
   *  let asciifier;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   *      // Get the asciifier instance
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Enable the default custom renderer
   *      asciifier.renderers().get("custom2D").enable();
   *      
   *      // Assign the ascii renderer's framebuffers to a global variable
   *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
   *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
   *      rotationFramebuffer = asciifier.renderers().get("custom2D").rotationFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      asciifier.fill("A");
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
   * 
   *      // Rotates all characters in the grid by 270 degrees. 
   *      // Utilize the red and green channels for the rotation angle.
   *      rotationFramebuffer.begin();
   *      background(255, 15, 0); // a bit cheesy right now, but you get the idea.
   *      rotationFramebuffer.end();
   *  }
   * ```
   */
  get rotationFramebuffer() {
    return this._rotationFramebuffer;
  }
  /**
   * Get the character framebuffer, whose pixels define the ASCII characters to use in the grid cells.
   * 
   * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
   * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   * 
   *  let asciifier;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   *      // Get the asciifier instance
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Enable the default custom renderer
   *      asciifier.renderers().get("custom2D").enable();
   *      
   *      // Assign the ascii renderer's framebuffers to a global variable
   *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
   *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      asciifier.fill("A");
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
  get characterFramebuffer() {
    return this._characterFramebuffer;
  }
}
const D = {
  /** Enable/disable the renderer */
  enabled: !1
};
class C extends G {
  /**
   * Creates a new `"custom2D"` ASCII renderer instance.
   * @param _p The p5 instance.
   * @param _grid Grid object containing the relevant grid information.
   * @param _fontManager The font texture atlas containing the ASCII characters texture.
   * @param _options The options for the ASCII renderer.
   * @ignore
   */
  constructor(e, A, r, i = D) {
    super(e, A, { width: A.cols, height: A.rows }, r, { ...D, ...i });
  }
  /**
   * Resize the framebuffers to match the 2D grid size based on the number of rows and columns.
   * @ignore
   */
  resizeFramebuffers() {
    this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._inversionFramebuffer.resize(this._grid.cols, this._grid.rows), this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows), this._characterFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
}
class K {
  /**
   * Create a new color palette instance.
   * @param _p The p5 instance.
   * @param _colors The colors to store in the palette as an array of `[r, g, b]` tuples.
   */
  constructor(e, A) {
    /** The framebuffer used to store the color palette. */
    t(this, "_framebuffer");
    this._p = e, this._colors = A;
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
    const e = Math.max(this._colors.length, 1);
    this._framebuffer.resize(e, 1), this._framebuffer.loadPixels();
    for (let r = 0; r < e; r++) {
      const i = r < this._colors.length ? this._p.color(this._colors[r]) : this._p.color(0, 0, 0, 0), B = 4 * r;
      this._framebuffer.pixels[B] = this._p.red(i), this._framebuffer.pixels[B + 1] = this._p.green(i), this._framebuffer.pixels[B + 2] = this._p.blue(i), this._framebuffer.pixels[B + 3] = this._p.alpha(i);
    }
    this._framebuffer.updatePixels();
  }
  /**
   * Sets the colors of the palette and updates the framebuffer.
   * @param newColors The new colors to set.
   */
  setColors(e) {
    this._colors = e, this._updateFramebuffer();
  }
  /**
   * Get the colors of the palette.
   */
  get colors() {
    return this._colors;
  }
  /**
   * Get the framebuffer containing the colors of the palette.
   */
  get framebuffer() {
    return this._framebuffer;
  }
}
class h extends C {
  /**
   * Creates a new feature-based 2D ASCII renderer instance.
   * @param p The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(A, r, i, B) {
    super(A, r, i, B);
    /** {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set. */
    t(this, "_characterColorPalette");
    this._characterColorPalette = new K(this._p, this._fontManager.glyphColors(this._options.characters)), this.update(this._options);
  }
  /**
   * Set the characters for the character set.
   * @param characters The characters to set for the character set.
   * @throws {P5AsciifyError} If characters is not a string.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the character set to '.:-=+*#%@' for the brightness renderer.
   *      p5asciify.asciifier().renderers().get("brightness").characters('.:-=+*#%@');
   *  }
   * ```
   */
  characters(A = "") {
    if (typeof A != "string")
      throw new o("Characters must be a string.");
    this._fontManager.validateCharacters(A), this._characterColorPalette.setColors(this._fontManager.glyphColors(A)), this.resetShaders(), this._options.characters = A;
  }
  /**
   * Swap the colors of the ASCII character and cell background colors.
   * @param invert Whether to swap the colors.
   * @throws {P5AsciifyError} If invert is not a boolean.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Enable invert mode for the brightness renderer.
   *      p5asciify.asciifier().renderers().get("brightness").invert(true);
   *  }
   * ```
   */
  invert(A) {
    if (typeof A != "boolean")
      throw new o("Invert mode must be a boolean.");
    this._options.invertMode = A;
  }
  /**
   * Define the rotation angle of all characters in the grid affected by the renderer in degrees.
   * 
   * @remarks
   * Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Rotate all characters in the grid by 90 degrees for the brightness renderer.
   *      p5asciify.asciifier().renderers().get("brightness").rotation(90);
   *  }
   * ```
   * 
   * @param angle The rotation angle in degrees.
   * @throws {P5AsciifyError} If angle is not a number.
   */
  rotation(A) {
    if (typeof A != "number")
      throw new o("Rotation angle must be a number");
    A = A % 360, A < 0 && (A += 360);
    const r = Math.min(255, Math.floor(A)), i = A > 255 ? Math.floor(A - 255) : 0;
    this._options.rotationAngle = this._p.color(r, i, 0);
  }
  /**
   * Set the color of the ASCII characters, used in the fixed color mode.
   * @param color The fixed color of the ASCII characters.
   * @throws {P5AsciifyError} If color is not a p5.Color object.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *          // Set the character color to green for the brightness renderer.
   *      // (Is applied if the character color mode of this renderer is set to 'fixed')
   *      p5asciify.asciifier().renderers().get("brightness").characterColor(color(0, 255, 0));
   *  }
   * ```
   */
  characterColor(A) {
    if (!A || !(A instanceof E.Color))
      throw new o("Character color must be a valid p5.Color object");
    this._options.characterColor = A;
  }
  /**
   * Set the background color of the ASCII characters, used in the fixed color mode.
   * @param color The fixed color of the ASCII characters.
   * @throws {P5AsciifyError} If color is not a p5.Color object.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the cell background color to red for the brightness renderer. 
   *      // (Is applied if the background color mode of this renderer is set to 'fixed')
   *      p5asciify.asciifier().renderers().get("brightness").backgroundColor(color(255, 0, 0));
   *  }
   * ```
   */
  backgroundColor(A) {
    if (!A || !(A instanceof E.Color))
      throw new o("Background color must be a valid p5.Color object");
    this._options.backgroundColor = A;
  }
  /**
   * Sets the color mode for ASCII characters.
   * @param mode The color mode ('sampled' or 'fixed')
   * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the character color mode to 'fixed' for the brightness renderer.
   *      p5asciify.asciifier().renderers().get("brightness").characterColorMode('fixed');
   *  }
   * ```
   */
  characterColorMode(A) {
    if (typeof A != "string")
      throw new o("Character color mode must be a string");
    if (A !== "sampled" && A !== "fixed")
      throw new o("Character color mode must be either 'sampled' or 'fixed'");
    A === "sampled" ? this._options.characterColorMode = 0 : A === "fixed" && (this._options.characterColorMode = 1);
  }
  /**
   * Sets the color mode for the grid cell background.
   * @param mode The color mode ('sampled' or 'fixed')
   * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the background color mode to 'sampled' for the brightness renderer.
   *      p5asciify.asciifier().renderers().get("brightness").backgroundColorMode('sampled');
   *  }
   * ```
   */
  backgroundColorMode(A) {
    if (typeof A != "string")
      throw new o("Background color mode must be a string");
    if (A !== "sampled" && A !== "fixed")
      throw new o("Background color mode must be either 'sampled' or 'fixed'");
    A === "sampled" ? this._options.backgroundColorMode = 0 : A === "fixed" && (this._options.backgroundColorMode = 1);
  }
  /**
   * Updates renderer options.
   * @param newOptions - The new options to update.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Update the brightness renderer options
   *      p5asciify.asciifier().renderers().get("brightness").update({
   *          enabled: true,
   *          characterColor: color(255, 0, 0),
   *          backgroundColor: color(0, 0, 255),
   *          characters: '.:-=+*#%@',
   *          invertMode: true,
   *          rotationAngle: 90,
   *          // ...
   *      });
   *  }
   * ```
   */
  update(A) {
    super.update(A), (A == null ? void 0 : A.enabled) !== void 0 && this.enabled(A.enabled), (A == null ? void 0 : A.characterColor) !== void 0 && (A.characterColor = this._p.color(A.characterColor), this.characterColor(A.characterColor)), (A == null ? void 0 : A.backgroundColor) !== void 0 && (A.backgroundColor = this._p.color(A.backgroundColor), this.backgroundColor(A.backgroundColor)), (A == null ? void 0 : A.characters) !== void 0 && this.characters(A.characters), (A == null ? void 0 : A.invertMode) !== void 0 && this.invert(A.invertMode), (A == null ? void 0 : A.rotationAngle) !== void 0 && this.rotation(A.rotationAngle), (A == null ? void 0 : A.characterColorMode) !== void 0 && this.characterColorMode(A.characterColorMode), (A == null ? void 0 : A.backgroundColorMode) !== void 0 && this.backgroundColorMode(A.backgroundColorMode);
  }
  /**
   * Get the {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set.
   */
  get characterColorPalette() {
    return this._characterColorPalette;
  }
}
var Q = "precision mediump float;attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}", j = "precision mediump float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 finalColor;finalColor=texture2D(u_sketchTexture,cellCenterTexCoord);gl_FragColor=finalColor;}", L = "precision mediump float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_textureSize;void main(){vec2 pos=(floor(gl_FragCoord.xy)+0.5)/u_textureSize;vec4 inputColor=texture2D(u_colorSampleFramebuffer,pos);if(inputColor.a==0.0){gl_FragColor=vec4(0.0,0.0,0.0,0.0);return;}float brightness=dot(inputColor.rgb,vec3(0.299,0.587,0.114));float index=clamp(floor(brightness*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);vec3 charColor=texture2D(u_charPaletteTexture,vec2((index+0.5)/u_charPaletteSize.x,0.0)).rgb;gl_FragColor=vec4(charColor,inputColor.a);}";
const f = {
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
class m extends h {
  /**
   * Creates a new `"brightness"` ASCII renderer instance.
   * @param p5Instance The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(A, r, i, B = f) {
    super(A, r, i, { ...f, ...B });
    t(this, "colorSampleShader");
    t(this, "asciiCharacterShader");
    t(this, "colorSampleFramebuffer");
    this.colorSampleShader = this._p.createShader(Q, j), this.asciiCharacterShader = this._p.createShader(Q, L), this.colorSampleFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  resetShaders() {
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.colorSampleFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
  render(A) {
    this.colorSampleFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", A), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this.colorSampleFramebuffer.width, this.colorSampleFramebuffer.height), this.colorSampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._options.characterColorMode === 1 ? this._p.background(this._options.characterColor) : (this._p.clear(), this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows)), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this._p.background(this._options.backgroundColor) : (this._p.clear(), this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows)), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._options.invertMode ? this._p.background(255) : this._p.background(0), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.background(this._options.rotationAngle), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_textureSize", [this._grid.cols, this._grid.rows]), this.asciiCharacterShader.setUniform("u_colorSampleFramebuffer", this.colorSampleFramebuffer), this.asciiCharacterShader.setUniform("u_charPaletteTexture", this._characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_charPaletteSize", [this._characterColorPalette.colors.length, 1]), this._p.rect(0, 0, this._p.width, this._p.height), this._characterFramebuffer.end();
  }
}
const S = (s) => `
precision mediump float;uniform sampler2D u_characterTexture;uniform float u_charsetCols,u_charsetRows;uniform sampler2D u_sketchTexture;uniform vec2 u_gridPixelDimensions,u_gridCellDimensions;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;const float u=float(${s}),f=u*u;void main(){vec2 v=floor(floor(gl_FragCoord.xy).xy),r=u_gridPixelDimensions/u_gridCellDimensions,e=v*r/u_gridPixelDimensions;v=(v+vec2(1))*r/u_gridPixelDimensions-e;bool s=true;float k=1./u;for(int u=0;u<${s};u++){if(!s)break;for(int f=0;f<${s};f++){if(!s)break;vec2 r=vec2(float(f)+.5,float(u)+.5)*k;vec4 i=texture2D(u_sketchTexture,e+r*v);if(i.w>0.)s=false;}}if(s){gl_FragColor=vec4(0);return;}float i=1e20,g=0.,t=u_charPaletteSize.x;for(int u=0;u<1024;u++){if(float(u)>=t)break;vec2 s=vec2((float(u)+.5)/t,.5/u_charPaletteSize.y);vec4 r=texture2D(u_charPaletteTexture,s);float m=r.x*255.+r.y*255.*256.+r.z*255.*65536.,y=floor(m/u_charsetCols);s=vec2((m-u_charsetCols*y)/u_charsetCols,y/u_charsetRows);vec2 C=vec2(1./u_charsetCols,1./u_charsetRows);y=0.;for(int u=0;u<${s};u++)for(int f=0;f<${s};f++){vec2 r=vec2(float(f)+.5,float(u)+.5)*k;float m=texture2D(u_sketchTexture,e+r*v).x-texture2D(u_characterTexture,s+r*C).x;y+=m*m;}y/=f;if(y<i)i=y,g=m;}i=mod(g,256.);g=floor(g/256.);gl_FragColor=vec4(i/255.,g/255.,0,1);}
`, v = (s, e) => `
precision mediump float;uniform sampler2D u_inputImage;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows;const int u=${s},f=${e};void main(){vec2 v=floor(gl_FragCoord.xy),e=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));v*=e;float i=0.,t=float(u*f);for(int s=0;s<u;s++)for(int g=0;g<f;g++){vec2 m=clamp((v+(vec2(float(s),float(g))+.5)*(e/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 d=texture2D(u_inputImage,m);float t=.299*d.x+.587*d.y+.114*d.z;i+=t;}i/=t;gl_FragColor=vec4(vec3(i),1);}
`, F = (s, e, A) => `
precision mediump float;uniform sampler2D u_inputImage,u_inputImageBW;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows,u_colorRank;const int e=${s},u=${e},f=${A};void main(){vec2 i=floor(gl_FragCoord.xy),t=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));i*=t;vec2 k=(i+t*.5)/u_inputImageSize;vec4 v=texture2D(u_inputImage,k),c[e];float b[e];for(int i=0;i<e;i++)c[i]=vec4(0),b[i]=0.;for(int v=0;v<u;v++)for(int k=0;k<f;k++){vec2 s=clamp((i+(vec2(float(v),float(k))+.5)*(t/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 m=texture2D(u_inputImage,s),d=texture2D(u_inputImageBW,s);float r=step(.5,d.x);bool z=false;if(u_colorRank==1&&r>.5)z=true;else if(u_colorRank==2&&r<=.5)z=true;if(!z)continue;z=false;for(int i=0;i<e;i++)if(m.xyz==c[i].xyz){b[i]+=1.;z=true;break;}if(!z)for(int i=0;i<e;i++)if(b[i]==0.){c[i]=m;b[i]=1.;break;}}float z=0.;vec4 m=vec4(0);for(int i=0;i<e;i++){float u=b[i];vec4 k=c[i];if(u>z)z=u,m=k;}if(u_colorRank==2&&z==0.)m=v;gl_FragColor=vec4(m.xyz,1);}
`;
var O = "precision mediump float;uniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;uniform float u_pixelRatio;const float EPSILON=0.01;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);vec2 imageTexCoord=logicalFragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);if(originalColor.a<EPSILON){gl_FragColor=vec4(0.0,0.0,0.0,0.0);return;}float gridX=floor(logicalFragCoord.x/cellWidth);float gridY=floor(logicalFragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue=brightnessDifference<-EPSILON ? 0.0 : 1.0;gl_FragColor=vec4(vec3(finalColorValue),1.0);}";
const _ = {
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
class I extends h {
  /**
   * Creates a new `"accurate"` ASCII renderer instance.
   * @param p5Instance The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(A, r, i, B = _) {
    const g = { ..._, ...B };
    super(A, r, i, g);
    t(this, "_characterSelectionShader");
    t(this, "_brightnessSampleShader");
    t(this, "_colorSampleShader");
    t(this, "_brightnessSplitShader");
    t(this, "_brightnessSampleFramebuffer");
    t(this, "_brightnessSplitFramebuffer");
    this._characterSelectionShader = this._p.createShader(Q, S(this._fontManager.fontSize)), this._brightnessSampleShader = this._p.createShader(Q, v(this._grid.cellHeight, this._grid.cellWidth)), this._colorSampleShader = this._p.createShader(Q, F(16, this._grid.cellHeight, this._grid.cellWidth)), this._brightnessSplitShader = this._p.createShader(Q, O), this._brightnessSampleFramebuffer = this._p.createFramebuffer({
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
    this._characterSelectionShader = this._p.createShader(Q, S(this._fontManager.fontSize)), this._brightnessSampleShader = this._p.createShader(Q, v(this._grid.cellHeight, this._grid.cellWidth)), this._colorSampleShader = this._p.createShader(Q, F(16, this._grid.cellHeight, this._grid.cellWidth));
  }
  render(A) {
    this._brightnessSampleFramebuffer.begin(), this._p.clear(), this._p.shader(this._brightnessSampleShader), this._brightnessSampleShader.setUniform("u_inputImage", A), this._brightnessSampleShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._brightnessSampleShader.setUniform("u_gridCols", this._grid.cols), this._brightnessSampleShader.setUniform("u_gridRows", this._grid.rows), this._p.rect(0, 0, this._p.width, this._p.height), this._brightnessSampleFramebuffer.end(), this._brightnessSplitFramebuffer.begin(), this._p.clear(), this._p.shader(this._brightnessSplitShader), this._brightnessSplitShader.setUniform("u_inputImage", A), this._brightnessSplitShader.setUniform("u_brightnessTexture", this._brightnessSampleFramebuffer), this._brightnessSplitShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._brightnessSplitShader.setUniform("u_gridCols", this._grid.cols), this._brightnessSplitShader.setUniform("u_gridRows", this._grid.rows), this._brightnessSplitShader.setUniform("u_pixelRatio", this._p.pixelDensity()), this._p.rect(0, 0, this._p.width, this._p.height), this._brightnessSplitFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._options.characterColorMode === 1 ? this._p.background(this._options.characterColor) : (this._p.clear(), this._p.shader(this._colorSampleShader), this._colorSampleShader.setUniform("u_inputImage", A), this._colorSampleShader.setUniform("u_inputImageBW", this._brightnessSplitFramebuffer), this._colorSampleShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._colorSampleShader.setUniform("u_gridCols", this._grid.cols), this._colorSampleShader.setUniform("u_gridRows", this._grid.rows), this._colorSampleShader.setUniform("u_colorRank", 1), this._p.rect(0, 0, this._p.width, this._p.height)), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this._p.background(this._options.backgroundColor) : (this._p.clear(), this._p.shader(this._colorSampleShader), this._colorSampleShader.setUniform("u_inputImage", A), this._colorSampleShader.setUniform("u_inputImageBW", this._brightnessSplitFramebuffer), this._colorSampleShader.setUniform("u_inputImageSize", [this._p.width, this._p.height]), this._colorSampleShader.setUniform("u_gridCols", this._grid.cols), this._colorSampleShader.setUniform("u_gridRows", this._grid.rows), this._colorSampleShader.setUniform("u_colorRank", 2), this._p.rect(0, 0, this._p.width, this._p.height)), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._options.invertMode ? this._p.background(255) : this._p.background(0), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.background(this._options.rotationAngle), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this._characterSelectionShader), this._characterSelectionShader.setUniform("u_characterTexture", this._fontManager.texture), this._characterSelectionShader.setUniform("u_charsetCols", this._fontManager.textureColumns), this._characterSelectionShader.setUniform("u_charsetRows", this._fontManager.textureRows), this._characterSelectionShader.setUniform("u_charPaletteTexture", this._characterColorPalette.framebuffer), this._characterSelectionShader.setUniform("u_charPaletteSize", [this._characterColorPalette.colors.length, 1]), this._characterSelectionShader.setUniform("u_sketchTexture", this._brightnessSplitFramebuffer), this._characterSelectionShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._characterSelectionShader.setUniform("u_gridPixelDimensions", [this._grid.width, this._grid.height]), this._p.rect(0, 0, this._p.width, this._p.height), this._characterFramebuffer.end();
  }
}
var W = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 finalColor;vec4 sampleColor=texture2D(u_sampleTexture,cellCenterTexCoord);if(sampleColor!=vec4(0.0,0.0,0.0,0.0)){if(u_sampleMode==0){finalColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{finalColor=u_staticColor;}}gl_FragColor=finalColor;}", X = "precision mediump float;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform bool u_invert;uniform vec3 u_compareColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool shouldInvert;shouldInvert=texture2D(u_sampleTexture,cellCenterTexCoord).rgb!=u_compareColor;if(shouldInvert){gl_FragColor=u_invert ? vec4(1.0): vec4(vec3(0.0),1.0);return;}else{gl_FragColor=vec4(0.0);}}", V = "precision mediump float;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform vec3 u_rotationColor;uniform vec3 u_compareColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool shouldRotate;shouldRotate=texture2D(u_sampleTexture,cellCenterTexCoord).rgb!=u_compareColor;if(shouldRotate){gl_FragColor=vec4(u_rotationColor,1.0);}else{gl_FragColor=vec4(0.0,0.0,0.0,0.0);}}", Z = "precision mediump float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}", $ = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;uniform sampler2D u_colorPaletteTexture;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);vec4 edgeColor=vec4(0.0);if(intensity>u_threshold){float angleDeg=degrees(atan(sobelY.r,sobelX.r));int charIndex=0;if(angleDeg>=-22.5&&angleDeg<22.5)charIndex=0;else if(angleDeg>=22.5&&angleDeg<67.5)charIndex=1;else if(angleDeg>=67.5&&angleDeg<112.5)charIndex=2;else if(angleDeg>=112.5&&angleDeg<157.5)charIndex=3;else if(angleDeg>=157.5||angleDeg<-157.5)charIndex=4;else if(angleDeg>=-157.5&&angleDeg<-112.5)charIndex=5;else if(angleDeg>=-112.5&&angleDeg<-67.5)charIndex=6;else if(angleDeg>=-67.5&&angleDeg<-22.5)charIndex=7;float paletteCoord=(float(charIndex)+0.5)/8.0;edgeColor=texture2D(u_colorPaletteTexture,vec2(paletteCoord,0.5));}gl_FragColor=edgeColor;}";
const y = (s, e, A) => `
precision mediump float;uniform sampler2D u_image;uniform vec2 u_imageSize,u_gridCellDimensions;uniform int u_threshold;const vec3 i=vec3(0);vec3 f[${s}];int u[${s}];float r(float i){return floor(i+.5);}void main(){vec2 v=floor(gl_FragCoord.xy);ivec2 b=ivec2(v);v=u_imageSize/u_gridCellDimensions;b=ivec2(r(float(b.x)*v.x),r(float(b.y)*v.y));int m=0;for(int b=0;b<${s};b++)f[b]=i,u[b]=0;for(int v=0;v<${A};v++)for(int r=0;r<${e};r++){ivec2 y=b+ivec2(r,v);if(y.x<0||y.y<0||y.x>=int(u_imageSize.x)||y.y>=int(u_imageSize.y))continue;vec3 e=texture2D(u_image,(vec2(y)+.5)/u_imageSize).xyz;if(length(e-i)<.001)continue;m++;bool x=false;for(int b=0;b<${s};b++)if(length(e-f[b])<.001){u[b]++;x=true;break;}if(!x)for(int b=0;b<${s};b++)if(u[b]==0){f[b]=e;u[b]=1;break;}}vec3 e=i;int x=0;for(int b=0;b<${s};b++)if(u[b]>x)e=f[b],x=u[b];gl_FragColor=m<u_threshold?vec4(i,0):vec4(e,1);}
`, u = {
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
class p extends h {
  /**
   * Creates a new `"edge"` ASCII renderer instance.
   * @param p5Instance The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(A, r, i, B = u) {
    super(A, r, i, { ...u, ...B });
    t(this, "sobelShader");
    t(this, "sampleShader");
    t(this, "colorSampleShader");
    t(this, "inversionShader");
    t(this, "rotationShader");
    t(this, "asciiCharacterShader");
    t(this, "sobelFramebuffer");
    t(this, "sampleFramebuffer");
    this.sobelShader = this._p.createShader(Q, $), this.sampleShader = this._p.createShader(Q, y(16, this._grid.cellHeight, this._grid.cellWidth)), this.colorSampleShader = this._p.createShader(Q, W), this.inversionShader = this._p.createShader(Q, X), this.rotationShader = this._p.createShader(Q, V), this.asciiCharacterShader = this._p.createShader(Q, Z), this.sobelFramebuffer = this._p.createFramebuffer({
      density: 1,
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
    this.sampleShader = this._p.createShader(Q, y(16, this._grid.cellHeight, this._grid.cellWidth));
  }
  /**
   * Set the threshold value for the Sobel edge detection algorithm.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the threshold value for the Sobel edge detection algorithm
   *      p5asciify.renderers().get("edge").sobelThreshold(0.5);
   *  }
   * ```
   * 
   * @param value The threshold value for the Sobel edge detection algorithm.
   * @throws {P5AsciifyError} If the value is not a valid number between 0 and 1.
   */
  sobelThreshold(A) {
    if (typeof A != "number" || Number.isNaN(A) || !Number.isFinite(A))
      throw new o("Sobel threshold must be a valid number");
    if (A < 0 || A > 1)
      throw new o("Sobel threshold must be between 0 and 1");
    this._options.sobelThreshold = A;
  }
  /**
   * Set the sample threshold value for the edge detection algorithm.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the sample threshold value for the edge detection algorithm
   *      p5asciify.renderers().get("edge").sampleThreshold(32);
   *  }
   * ```
   * 
   * @param value The sample threshold value for the edge detection algorithm.
   * @throws {P5AsciifyError} If the value is not a valid number greater than or equal to 0.
   */
  sampleThreshold(A) {
    if (typeof A != "number" || Number.isNaN(A) || !Number.isFinite(A))
      throw new o("Sample threshold must be a valid number");
    if (A < 0)
      throw new o("Sample threshold must be greater than or equal to 0");
    this._options.sampleThreshold = A;
  }
  update(A) {
    super.update(A), A.sobelThreshold !== void 0 && this.sobelThreshold(A.sobelThreshold), A.sampleThreshold !== void 0 && this.sampleThreshold(A.sampleThreshold);
  }
  render(A) {
    this.sobelFramebuffer.begin(), this._p.clear(), this._p.shader(this.sobelShader), this.sobelShader.setUniform("u_texture", A), this.sobelShader.setUniform("u_textureSize", [this._p.width, this._p.height]), this.sobelShader.setUniform("u_threshold", this._options.sobelThreshold), this.sobelShader.setUniform("u_colorPaletteTexture", this._characterColorPalette.framebuffer), this.sobelShader.setUniform("u_totalChars", this._options.characters.length), this._p.rect(0, 0, this._p.width, this._p.height), this.sobelFramebuffer.end(), this.sampleFramebuffer.begin(), this._p.clear(), this._p.shader(this.sampleShader), this.sampleShader.setUniform("u_imageSize", [this._p.width, this._p.height]), this.sampleShader.setUniform("u_image", this.sobelFramebuffer), this.sampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.sampleShader.setUniform("u_threshold", this._options.sampleThreshold), this._p.rect(0, 0, this._p.width, this._p.height), this.sampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", A), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this._p.rect(0, 0, this._p.width, this._p.height), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", A), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this._p.rect(0, 0, this._p.width, this._p.height), this._secondaryColorFramebuffer.end(), this._inversionFramebuffer.begin(), this._p.clear(), this._p.shader(this.inversionShader), this.inversionShader.setUniform("u_invert", this._options.invertMode), this.inversionShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.inversionShader.setUniform("u_compareColor", [0, 0, 0]), this.inversionShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._inversionFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.clear(), this._p.shader(this.rotationShader), this.rotationShader.setUniform("u_rotationColor", this._options.rotationAngle._array), this.rotationShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.rotationShader.setUniform("u_compareColor", [0, 0, 0]), this.rotationShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_sketchTexture", this.sampleFramebuffer), this.asciiCharacterShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._p.width, this._p.height), this._characterFramebuffer.end();
  }
}
var q = "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_inversionTexture;uniform sampler2D u_asciiCharacterTexture;uniform sampler2D u_rotationTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform float u_pixelRatio;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 adjustedCoord=(logicalFragCoord-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);vec4 inversionColor=texture2D(u_inversionTexture,charIndexTexCoord);vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.r<0.01&&encodedIndexVec.g<0.01){gl_FragColor=vec4(0.0);return;}int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=charIndex-(charIndex/int(u_charsetDimensions.x))*int(u_charsetDimensions.x);int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(float(charCol)/u_charsetDimensions.x,float(charRow)/u_charsetDimensions.y);vec4 rotationColor=texture2D(u_rotationTexture,charIndexTexCoord);float degrees=rotationColor.r*255.0+rotationColor.g*255.0;float rotationAngle=radians(degrees);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? secondaryColor : texture2D(u_characterTexture,texCoord);if(inversionColor==vec4(1.0)){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=vec4(primaryColor.rgb*charColor.rgb,charColor.a);gl_FragColor=mix(secondaryColor,finalColor,charColor.a);if(outsideBounds){gl_FragColor=inversionColor==vec4(1.0)? primaryColor : secondaryColor;}}";
class T {
  /**
   * Creates a new `P5AsciifyDisplayRenderer` instance.
   * @param _p The p5 instance.
   * @param _grid The grid instance.
   * @param _fontManager The font texture atlas instance.
   * @ignore
   */
  constructor(e, A, r) {
    /** The asciified texture */
    t(this, "_resultFramebuffer");
    /** Final shader to render the ASCII output. */
    t(this, "_shader");
    /** The background color for the ASCII output. */
    t(this, "_backgroundColor", "#000000");
    this._p = e, this._grid = A, this._fontManager = r, this._shader = this._p.createShader(Q, q), this._resultFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  /**
   * Sets the background color for the ASCII output.
   * @param color The color to set as the background. Can be a string, p5.Color, or an array of RGBA values.
   * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
   * @ignore
   */
  background(e) {
    if (typeof e != "string" && !Array.isArray(e) && !(e instanceof E.Color))
      throw new o(`Invalid color type: ${typeof e}. Expected string, array or p5.Color.`);
    this._backgroundColor = e;
  }
  /**
   * Renders the ASCII output to the result framebuffer.
   * @param characterFramebuffer The framebuffer containing the character indices.
   * @param primaryColorFramebuffer The framebuffer containing the primary color values.
   * @param secondaryColorFramebuffer The framebuffer containing the secondary color values.
   * @param inversionFramebuffer The framebuffer containing the inversion values.
   * @param rotationFramebuffer The framebuffer containing the rotation values.
   * @ignore
   */
  render(e, A, r, i, B) {
    this._resultFramebuffer.begin(), this._p.background(this._backgroundColor), this._p.shader(this._shader);
    const g = {
      u_pixelRatio: this._p.pixelDensity(),
      u_characterTexture: this._fontManager.texture,
      u_charsetDimensions: [this._fontManager.textureColumns, this._fontManager.textureRows],
      u_primaryColorTexture: A,
      u_secondaryColorTexture: r,
      u_inversionTexture: i,
      u_rotationTexture: B,
      u_asciiCharacterTexture: e,
      u_gridPixelDimensions: [this._grid.width, this._grid.height],
      u_gridOffsetDimensions: [this._grid.offsetX, this._grid.offsetY],
      u_gridCellDimensions: [this._grid.cols, this._grid.rows]
    };
    for (const [l, c] of Object.entries(g))
      this._shader.setUniform(l, c);
    this._p.rect(0, 0, this._p.width, this._p.height), this._resultFramebuffer.end();
  }
  /**
   * Returns the framebuffer containing the final ASCII output.
   * @ignore
   */
  get resultFramebuffer() {
    return this._resultFramebuffer;
  }
}
const P = {
  brightness: m,
  accurate: I,
  edge: p,
  custom2D: C
};
class Y {
  /**
   * Creates a new ASCII renderer manager instance.
   * @param _p The p5 instance.
   * @param _grid The grid instance.
   * @param _fontManager The font texture atlas instance.
   * @ignore
   */
  constructor(e, A, r) {
    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    t(this, "_currentCanvasDimensions");
    /** The list of available renderers. */
    t(this, "_renderers");
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    t(this, "_primaryColorFramebuffer");
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    t(this, "_secondaryColorFramebuffer");
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    t(this, "_characterFramebuffer");
    /** The inversion framebuffer, whose pixels define whether to swap the character and background colors. */
    t(this, "_inversionFramebuffer");
    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    t(this, "_rotationFramebuffer");
    t(this, "_asciiDisplayRenderer2D");
    /** Whether any renderers are enabled. */
    t(this, "_hasEnabledRenderers", !1);
    this._p = e, this._grid = A, this._fontManager = r, this._currentCanvasDimensions = {
      width: this._p.width,
      height: this._p.height
    }, this._renderers = [
      { name: "custom2D", renderer: new C(this._p, this._grid, this._fontManager) },
      { name: "edge", renderer: new p(this._p, this._grid, this._fontManager) },
      { name: "accurate", renderer: new I(this._p, this._grid, this._fontManager) },
      { name: "brightness", renderer: new m(this._p, this._grid, this._fontManager) }
    ], this._primaryColorFramebuffer = this._p.createFramebuffer({
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
    }), this._asciiDisplayRenderer2D = new T(this._p, this._grid, this._fontManager);
  }
  /**
   * Runs all renderers in the pipeline, merging their framebuffers together,
   * and passing them to the ASCII display renderer for final rendering.
   * 
   * All {@link P5Asciifier} instances and their renderer managers call this method automatically 
   * after the user's `draw()` function when part of the {@link P5AsciifierManager} instance {@link p5asciify}.
   * 
   * @param inputFramebuffer The input framebuffer to transform into ASCII.
   * 
   * @ignore
   */
  render(e) {
    this._characterFramebuffer.draw(() => this._p.clear()), this._primaryColorFramebuffer.draw(() => this._p.clear()), this._secondaryColorFramebuffer.draw(() => this._p.clear()), this._inversionFramebuffer.draw(() => this._p.clear()), this._rotationFramebuffer.draw(() => this._p.clear()), this._hasEnabledRenderers = !1;
    for (let A = this._renderers.length - 1; A >= 0; A--) {
      const r = this._renderers[A];
      if (r.renderer.options.enabled) {
        r.renderer instanceof h && r.renderer.render(e);
        const i = -this._grid.cols / 2, B = -this._grid.rows / 2;
        this._characterFramebuffer.draw(() => this._p.image(r.renderer.characterFramebuffer, i, B)), this._primaryColorFramebuffer.draw(() => this._p.image(r.renderer.primaryColorFramebuffer, i, B)), this._secondaryColorFramebuffer.draw(() => this._p.image(r.renderer.secondaryColorFramebuffer, i, B)), this._inversionFramebuffer.draw(() => this._p.image(r.renderer.inversionFramebuffer, i, B)), this._rotationFramebuffer.draw(() => this._p.image(r.renderer.rotationFramebuffer, i, B)), this._hasEnabledRenderers = !0;
      }
    }
    this._asciiDisplayRenderer2D.render(
      this._characterFramebuffer,
      this._primaryColorFramebuffer,
      this._secondaryColorFramebuffer,
      this._inversionFramebuffer,
      this._rotationFramebuffer
    ), this.checkCanvasDimensions();
  }
  /**
   * Checks if the canvas dimensions have changed.
   * If they have, the grid is reset and the renderers are resized.
   * 
   * Is called automatically when {@link render} is called 
   * and the canvas dimensions are different to the previous {@link render} call.
   */
  checkCanvasDimensions() {
    (this._currentCanvasDimensions.width !== this._p.width || this._currentCanvasDimensions.height !== this._p.height) && (this._currentCanvasDimensions.width = this._p.width, this._currentCanvasDimensions.height = this._p.height, this._grid.reset(), this.resetRendererDimensions());
  }
  /**
   * Resets the dimensions of all renderers.
   * 
   * Is called automatically when {@link render} is called 
   * and the canvas dimensions are different to the previous {@link render} call.
   * 
   * @ignore
   */
  resetRendererDimensions() {
    this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._characterFramebuffer.resize(this._grid.cols, this._grid.rows), this._inversionFramebuffer.resize(this._grid.cols, this._grid.rows), this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows), this._renderers.forEach((e) => {
      e.renderer.resizeFramebuffers(), e.renderer instanceof h && e.renderer.resetShaders();
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
   *  let asciifier;
   *  let brightnessAsciiRenderer;
   * 
   *  function setupAsciify() {
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Clear all existing default renderers provided by `p5.asciify`.
   *      asciifier.renderers().clear();
   * 
   *      // Add a new brightness renderer with custom options.
   *      brightnessAsciiRenderer = asciifier.renderers().add('brightness', 'brightness', {
   *          enabled: true,
   *          characterColor: '#FF0000',
   *          backgroundColor: '#0000FF',
   *          characterColorMode: "fixed",
   *          backgroundColorMode: "fixed",
   *      });
   *  }
   * ```
   */
  add(e, A, r) {
    if (typeof e != "string" || e.trim() === "")
      throw new o("Renderer name must be a non-empty string");
    const i = P[A];
    if (!i)
      throw new o(
        `Invalid renderer type: ${A}. Valid types are: ${Object.keys(P).join(", ")}`
      );
    const B = new i(this._p, this._grid, this._fontManager, r);
    return this._renderers.push({ name: e, renderer: B }), B;
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
   *      brightnessRenderer = p5asciify.asciifier().renderers().get('brightness');
   * 
   *      // Use the brightness renderer instance to modify its properties during run-time,
   *      // instead of constantly calling `p5asciify.asciifier().renderers().get('brightness')`.
   *  }
   * ```
   */
  get(e) {
    var r;
    const A = (r = this._renderers.find((i) => i.name === e)) == null ? void 0 : r.renderer;
    if (!A)
      throw new o(
        `Renderer '${e}' not found. Available renderers: ${this._renderers.map((i) => i.name).join(", ")}`
      );
    return A;
  }
  /**
   * Moves a renderer down in the list of renderers, meaning it will be rendered earlier in the pipeline.
   * @param renderer The renderer to move down in the list.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Move the `"brightness"` renderer down in the list of renderers.
   *      p5asciify.asciifier().renderers().moveDown('brightness');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   *  }
   * ```
   */
  moveDown(e) {
    const A = this._getRendererIndex(e);
    if (A === -1)
      throw new o("Renderer not found.");
    if (A >= this._renderers.length - 1)
      throw new o("Renderer is already at the bottom of the list.");
    this.swap(e, this._renderers[A + 1].renderer);
  }
  /**
   * Moves a renderer up in the list of renderers, meaning it will be rendered later in the pipeline.
   * @param renderer The renderer to move up in the list.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Move the `"accurate"` renderer up in the list of renderers.
   *      p5asciify.asciifier().renderers().moveUp('accurate');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   *  }
   * ```
   */
  moveUp(e) {
    const A = this._getRendererIndex(e);
    if (A === -1)
      throw new o("Renderer not found.");
    if (A <= 0)
      throw new o("Renderer is already at the top of the list.");
    this.swap(e, this._renderers[A - 1].renderer);
  }
  /**
   * Removes a renderer from the list of renderers.
   * @param renderer The name of the renderer or the renderer instance itself.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Remove the `"brightness"` renderer from the list of renderers.
   *      p5asciify.asciifier().renderers().remove('brightness');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   * }
   * ```
   */
  remove(e) {
    const A = this._getRendererIndex(e);
    if (A === -1)
      throw new o("Renderer not found.");
    this._renderers.splice(A, 1);
  }
  /**
   * Clears the list of renderers. 
   * Can be useful when you want to start fresh without the default renderers provided by the library.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Clear all existing renderers.
   *      p5asciify.asciifier().renderers().clear();
   * 
   *     // With no renderers, you can add your own custom renderer.
   *     // Otherwise, `p5.asciify` will now render the input image without any ASCII conversion.
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
   *      p5asciify.asciifier().renderers().swap('brightness', 'accurate');
   * 
   *      // Alternatively, you can also pass the renderer instances themselves.
   *  }
   * ```
   */
  swap(e, A) {
    const r = this._getRendererIndex(e), i = this._getRendererIndex(A);
    if (r === -1 || i === -1)
      throw new o("One or more renderers not found.");
    const B = this._renderers[r];
    this._renderers[r] = this._renderers[i], this._renderers[i] = B;
  }
  /**
   * Enables all renderers in the list of renderers at once.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *     // Enable all default renderers provided by `p5.asciify`.
   *      p5asciify.asciifier().renderers().enable();
   *  }
   * ```
   */
  enable() {
    this._renderers.forEach((e) => e.renderer.enabled(!0));
  }
  /**
   * Disables all renderers in the list of renderers at once.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Disable all renderers in the list.
   *      p5asciify.asciifier().renderers().disable();
   *  }
   * ```
   */
  disable() {
    this._renderers.forEach((e) => e.renderer.enabled(!1));
  }
  /**
   * Enables or disables all renderers in the list of renderers at once.
   * @param enabled Whether to enable or disable all renderers.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Enable all default renderers provided by `p5.asciify`.
   *      p5asciify.asciifier().renderers().enabled(true);
   *  }
   * ```
   */
  enabled(e) {
    e ? this.enable() : this.disable();
  }
  /**
   * Gets the index of a renderer in the list of renderers.
   * @param renderer The renderer to get the index of.
   * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
   */
  _getRendererIndex(e) {
    return typeof e == "string" ? this._renderers.findIndex((A) => A.name === e) : this._renderers.findIndex((A) => A.renderer === e);
  }
  /**
   * Returns the list of renderers in the pipeline.
   * 
   * The first renderer in the list is executed last, and the last renderer in the list is executed first.
   */
  get renderers() {
    return this._renderers;
  }
  /**
   * Returns the {@link P5AsciifyDisplayRenderer} instance which performs the final ASCII conversion.
   */
  get asciiDisplayRenderer() {
    return this._asciiDisplayRenderer2D;
  }
  /**
   * Returns the primary color framebuffer, 
   * which contains the primary color framebuffers of all renderers in the pipeline stacked on top of each other.
   * @ignore
   */
  get characterFramebuffer() {
    return this._characterFramebuffer;
  }
  /**
   * Returns a boolean indicating whether any renderers are enabled in the pipeline.
   */
  get hasEnabledRenderers() {
    return this._hasEnabledRenderers;
  }
}
class M {
  /**
   * Creates a new `P5Asciifier` instance.
   * 
   * @param sketchFramebuffer If a `sketchFramebuffer` is provided, 
   *                          this framebuffer is used instead of the p5.js main canvas to capture the user's `draw()` function output.
   * @ignore
   */
  constructor(e) {
    /** Manages the font and provides methods to access font properties. */
    t(this, "_fontManager");
    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    t(this, "_grid");
    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers to asciify. */
    t(this, "_captureFramebuffer");
    /** Flag to determine if the p5.js canvas is used as the sketch framebuffer. Otherwise, a custom framebuffer is used. */
    t(this, "_canvasFlag", !0);
    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    t(this, "_rendererManager");
    /** The font size for the ASCII renderers. */
    t(this, "_fontSize", 16);
    /** The `p5.js` instance. */
    t(this, "_p");
    e && (this._captureFramebuffer = e, this._canvasFlag = !1);
  }
  /**
   * Initializes the asciifier by setting the `p5.js` instance and loading the font manager with the default font.
   * 
   * This method is called automatically when p5.js is initialized or a new `P5Asciifier` instance is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
   * @param p The p5.js instance of the sketch.
   * @param fontBase64 The base64 string of the font to use for ASCII conversion.
   * 
   * @ignore
   */
  init(e, A) {
    this._p = e, this._fontManager = new J(e, A);
  }
  /**
   * Sets up the asciifier by initializing the font texture atlas, grid, and renderer manager.
   * 
   * There is no need to call this method manually if the asciifier is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
   * 
   * @ignore
   */
  setup() {
    this._fontManager.setup(this._fontSize), this._grid = new H(
      this._p,
      this._fontManager.maxGlyphDimensions.width,
      this._fontManager.maxGlyphDimensions.height
    ), this._rendererManager = new Y(
      this._p,
      this._grid,
      this._fontManager
    ), this._captureFramebuffer || (this._captureFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }));
  }
  /**
   * Renders the ASCII output to the canvas.
   * 
   * Automatically called after the user's `draw()` function has finished when managed by the {@link P5AsciifierManager} instance {@link p5asciify}.
   * 
   * @ignore
   */
  asciify() {
    this._rendererManager.render(this._captureFramebuffer), this._rendererManager.hasEnabledRenderers ? (this._p.clear(), this._p.image(this._rendererManager.asciiDisplayRenderer.resultFramebuffer, -this._p.width / 2, -this._p.height / 2)) : (this._p.clear(), this._p.image(this._captureFramebuffer, -this._p.width / 2, -this._p.height / 2, this._p.width, this._p.height));
  }
  /**
   * Sets the font size for the ASCII renderers of the asciifier.
   * @param fontSize The font size to set.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the font size to 32 to use for all ASCII renderers of the asciifier.
   *      p5asciify.asciifier().fontSize(32);
   *  }
   * ```
   */
  fontSize(e) {
    this._fontSize = e, this._p._setupDone && (this._fontManager.setFontSize(e), this._grid.resizeCellPixelDimensions(
      this._fontManager.maxGlyphDimensions.width,
      this._fontManager.maxGlyphDimensions.height
    ), this._rendererManager.resetRendererDimensions());
  }
  /**
   * Returns the {@link P5AsciifyRendererManager}, containing all ASCII renderers in the rendering pipeline of the asciifier.
   * @returns The renderer manager.
   * 
   * @example
   * ```javascript
   *  let defaultBrightnessRenderer;
   * 
   *  function setupAsciify() {
   *      // Fetch the default brightness renderer from the renderer manager.
   *      defaultBrightnessRenderer = p5asciify.asciifier().renderers().get("brightness");
   * 
   *      // Update any options for the renderer.
   *      defaultBrightnessRenderer.update({ invertMode: true });
   *  }
   * ```
   */
  renderers() {
    return this._rendererManager;
  }
  /**
   * Sets the font for the ascii renderers in the rendering pipeline of the asciifier.
   * @param font The `p5.Font` object to use for ASCII rendering.
   * @param options An object containing options affecting what happens after the font is loaded.
   * @param options.updateCharacters If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer.
   *                                 This might throw an error if the new font does not contain the character sets used with the previous font.
   *                                 If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same.
   * @throws {@link P5AsciifyError} - If the font parameter is invalid.
   * 
   * @example
   * ```javascript
   *  let font;
   * 
   *  function preload() {
   *      // Load font during preload using p5.js `loadFont` function.
   *      font = loadFont('path/to/font.ttf');
   *  }
   * 
   *  function setupAsciify() {
   *      // Set the font to the default asciifier instance.
   *      p5asciify.asciifier().font(font);
   *  }
   * ```
   */
  font(e, A = { updateCharacters: !0 }) {
    this._fontManager.loadFont(e), this._p._setupDone && (this._fontManager.reset(), this._grid.resizeCellPixelDimensions(
      this._fontManager.maxGlyphDimensions.width,
      this._fontManager.maxGlyphDimensions.height
    ), A.updateCharacters && this._rendererManager.renderers.forEach(
      (r) => {
        r.renderer instanceof h && r.renderer.characters(r.renderer.options.characters);
      }
    ), this._rendererManager.resetRendererDimensions());
  }
  /**
   * Sets the background color for the ascii renderers, occupying all the space not covered by cells in the grid.
   * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
   * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the background color to black.
   *      p5asciify.asciifier().background('#000000');
   *  }
   * ```
   */
  background(e) {
    this._rendererManager.asciiDisplayRenderer.background(e);
  }
  /**
   * Sets the grid dimensions for the ASCII renderers. 
   * Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.
   * 
   * To make the grid responsive to the canvas size again, use the {@link gridResponsive} method.
   * 
   * @param gridCols The number of columns in the grid.
   * @param gridRows The number of rows in the grid.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the grid dimensions to 100 columns, 50 rows.
   *      p5asciify.asciifier().gridDimensions(100, 50);
   *  }
   * ```
   * 
   */
  gridDimensions(e, A) {
    this._grid.resizeGridDimensions(e, A), this._rendererManager.resetRendererDimensions();
  }
  /**
   * Adjust the grid dimensions to be responsive to the canvas size or fixed.
   * 
   * If `true`, the grid dimensions will be adjusted every time the canvas size changes to create a perfect grid on the x and y axes.
   * 
   * If `false`, the grid dimensions will be fixed and not change when the canvas size changes.
   * 
   * @param bool Determines if the grid dimensions should be responsive to the canvas size.
   */
  gridResponsive(e = !0) {
    e ? this._grid.resetGridDimensions() : this._grid.fixedDimensions = !0;
  }
  /**
   * Generates the ASCII output as an array of string rows.
   * @returns Array of strings representing ASCII output.
   * @throws {@link P5AsciifyError} - If no renderer is available.
   */
  _generateAsciiTextOutput() {
    const e = this._rendererManager.characterFramebuffer;
    if (!e)
      throw new o("No renderer available to generate ASCII output");
    e.loadPixels();
    const A = e.pixels, r = this._grid.cols, i = this._grid.rows, B = this._fontManager.characters, g = [];
    let l = 0;
    for (let c = 0; c < i; c++) {
      let w = "";
      for (let b = 0; b < r; b++) {
        const x = l * 4, z = A[x], U = A[x + 1];
        let d = z + (U << 8);
        d >= B.length && (d = B.length - 1), w += B[d], l++;
      }
      g.push(w);
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
   *          console.log(p5asciify.asciifier().toString());
   *      }
   *  }
   * ```
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
   *         p5asciify.asciifier().saveStrings("ascii_output");
   *     }
   * }
   * ```
   */
  saveStrings(e) {
    if (!e) {
      const A = /* @__PURE__ */ new Date(), r = A.toISOString().split("T")[0], i = A.toTimeString().split(" ")[0].replace(/:/g, "-");
      e = `asciify_output_${r}_${i}`;
    }
    this._p.saveStrings(this._generateAsciiTextOutput(), `${e}.txt`);
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
   *  let asciifier;
   * 
   *  function setup() {
   *      createCanvas(400, 400, WEBGL);
   *  }
   * 
   *  function setupAsciify() {
   *      asciifier = p5asciify.asciifier();
   * 
   *      // Enable the default custom renderer
   *      asciifier.renderers().get("custom").enable();
   *      
   *      // Assign the ascii renderer's character framebuffer to a global variable
   *      characterFramebuffer = asciifier.renderers().get("custom").characterFramebuffer;
   *      primaryColorFramebuffer = asciifier.renderers().get("custom").primaryColorFramebuffer;
   *      secondaryColorFramebuffer = asciifier.renderers().get("custom").secondaryColorFramebuffer;
   *  }
   * 
   *  function draw() {
   *      // Draw a rectangle with the character 'A' to the character framebuffer
   *      characterFramebuffer.begin();
   *      clear();
   *      asciifier.fill("A");
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
  fill(e) {
    this._p.fill(this._fontManager.glyphColor(e));
  }
  /**
   * Returns the {@link P5AsciifyGrid} instance, which contains information about grid properties, and methods to modify the grid.
   * 
   * @example
   * ```javascript
   * let framebuffer;
   * 
   * function setupAsciify() {
   *      // Can be useful to create a framebuffer with the same dimensions as the grid.
   *      framebuffer = createFramebuffer({
   *          width: p5asciify.asciifier().grid.cols, 
   *          height: p5asciify.asciifier().grid.rows
   *      });
   * }
   * ```
   */
  get grid() {
    return this._grid;
  }
  /**
   * Returns the font manager, which manages the font and provides methods to access font properties like available characters and their corresponding rgb values,
   * and the texture containing all the characters in the font.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Print all existing characters in the font to the console.
   *      console.log(p5asciify.asciifier().fontManager.characters);
   *  }
   * ```
   */
  get fontManager() {
    return this._fontManager;
  }
  /**
   * Retrieves the framebuffer that contains the content to asciify.
   * 
   * The returned framebuffer either contains everything drawn on the p5.js main canvas, or a custom framebuffer if set during initialization.
   * 
   * @ignore
   */
  get captureFramebuffer() {
    return this._captureFramebuffer;
  }
  /**
   * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
   * Can also be used via the p5.js `texture()` function.
   * 
   * @example
   * ```javascript
   *  // Draw something on the canvas to asciify.
   *  function draw() {
   *      background(0);
   *      fill(255);
   *      box(100);
   *  }
   * 
   *  // Apply the asciified output as a texture to a 3D box.
   *  function drawAsciify() {
   *      orbitControl();
   * 
   *      clear();
   *      texture(p5asciify.asciifier().texture);
   *      rotateX(frameCount * 0.01);
   *      rotateY(frameCount * 0.01);
   *      box(100);
   *  }
   * ```
   */
  get texture() {
    return this._rendererManager.asciiDisplayRenderer.resultFramebuffer;
  }
  /**
   * Returns the flag to determine if the `p5.js` canvas is used to asciify, or if a passed framebuffer is used to asciify instead.
   * 
   * Returns `true` if the p5.js canvas is used, otherwise `false`.
   * 
   * @ignore
   */
  get canvasFlag() {
    return this._canvasFlag;
  }
}
const AA = `data:font/truetype;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAABAAAgAQAAIAEAACABAAAAAQAAIAEAAAABAAAAAQAAIAEAAGABAAAAAQAAAAEAAAABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAEABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAQAAIAEAAAABAAAAAQAAAAEAACABAABAAQAAQAEAAEABAABAAQAAIAEAACABAAAAAQAAAAEAAAABAABAAQAAAAEAACABAAAAAQAAAAEAAIABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAYAEAAAABAAAAAQAAQAEAACABAAAAAQAAAAEAAAABAAAgAQAAIAEAACABAAAgAQAAIAEAAAABAABAAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAAAAAIAAAADAAAAFAADAAEAAASaAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAABwAAABIAAAAegAAALwAAADuAAAA9wAAARQAAAExAAABWgAAAW0AAAF7AAABhAAAAY0AAAGvAAAB0gAAAecAAAIOAAACNQAAAk8AAAJsAAACjgAAAqYAAALOAAAC5gAAAvQAAAMHAAADLgAAAzwAAANjAAADhQAAA6UAAAPCAAAD4AAAA/0AAAQaAAAEPAAABEwAAARrAAAEfgAABJEAAASpAAAE0AAABNsAAAT4AAAFFQAABS0AAAVDAAAFZQAABYcAAAWuAAAFvAAABc8AAAXnAAAGBAAABisAAAZDAAAGZQAABnMAAAaVAAAGowAABsUAAAbOAAAG3gAABvYAAAcMAAAHKQAABz8AAAdaAAAHbQAAB4oAAAedAAAHqwAAB8MAAAfgAAAH7gAACAsAAAgjAAAIOwAACFEAAAhsAAAIfAAACJkAAAi2AAAIzgAACOYAAAkDAAAJKgAACUIAAAlfAAAJfAAACYUAAAmiAAAJugAACdcAAAngAAAKBwAACi4AAApgAAAKeQAACokAAAq4AAAKwQAACs8AAArYAAAK8QAACw4AAAshAAALSAAAC1gAAAt1AAALjQAAC5sAAAu0AAALzQAAC9YAAAvhAAAL6gAAC/4AAAwRAAAMJAAADDQAAAxHAAAMUgAADGoAAAyCAAAMlwAADKUAAAy/AAAM0gAADN0AAAz8AAANDwAADSkAAA0yAAANTAAADVUAAA1jAAANfAAADYcAAA2VAAANqQAADcIAAA3mAAAN7wAADg4AAA4XAAAOQQAADloAAA5qAAAOcwAADoYAAA6PAAAOogAADrIAAA7FAAAPCwAADxsAAA8uAAAPRwAAD1AAAA+HAAAPoAAAD6kAAA/CAAAP3wAAD/wAABAZAAAQNgAAEE4AABBfAAAQlQAAEJ4AABCxAAAQugAAEOEAABEnAAARUwAAEWYAABF+AAARlgAAEbgAABJrAAASfgAAEpEAABKpAAASwQAAEswAABLcAAATCAAAExMAABMrAAATQwAAE1sAABNzAAATmgAAE8YAABPeAAAT5wAAE/AAABQSAAAUKgAAFEIAABRaAAAUYwAAFGwAABSOAAAUngAAFLsAABTYAAAU/wAAFSEAABVNAAAVZQAAFX0AABWVAAAVngAAFacAABXTAAAWBAAAFg0AABYvAAAWOgAAFkUAABZxAAAWhAAAFpIAABagAAAWrgAAFrwAABbVAAAW7QAAFxkAABd0AAAXzwAAF/wAABgUAAAYJQAAGC4AABhBAAAYXgAAGHEAABiYAAAYvAAAGOAAABkYAAAZPwAAGWYAABmNAAAZtAAAGdYAABn9AAAaEAAAGi0AAIBgACAAoAEAAADAAcAAAEBAQEBAQEBAYABAAAA/wAAAAEAAAD/AAQAAAD+AAAA/4AAAP8AAAAAAgEAAoADgAQAAAMABwAAAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8ABAAAAP6AAAABgAAA/oAAAAACAIAAgAQAA4AAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAABAAAAAIAAAP+AAAAAgAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAA/4AAAACAAQAAAACAAAADgAAA/4AAAACAAAD/gAAA/4AAAP8AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAABAAAAAIAAAP+A/wAAAAEAAAMAgACABAAEAAAbAB8AIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAABAAAAAIAAAP+AAAD/AAAA/4AAAP8AAAABAAAA/wAAAP+AAAAAgAAAAQD/gAAAAIAAAACAAAAAgAAABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAABQCAAIAEAAOAAAUAHQAjACkALwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAA/4AAAP+AAgABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r
`;
class eA {
  /**
   * Creates a new `P5AsciifierManager` instance.
   * @ignore
   */
  constructor() {
    /** The p5.js instance used by the library. */
    t(this, "_p");
    /** The list of `P5Asciifier` instances managed by the library. */
    t(this, "_asciifiers");
    /** The base font used by the library. */
    t(this, "_baseFont");
    /** Defines whether the hooks are enabled or not. */
    t(this, "_hooksEnabled", !0);
    this._asciifiers = [new M()];
  }
  /**
   * Initializes the `p5.asciify` library by setting the `p5.js` instance.
   * 
   * For the provided {@link p5asciify} object this method is called automatically when the library is imported.
   * 
   * @param p The p5.js instance to use for the library.
   * @ignore
   */
  init(e) {
    this._p = e, this._baseFont = e.loadFont(AA, (A) => {
      this._asciifiers.forEach((r) => {
        r.init(e, A);
      });
    });
  }
  /**
   * Sets up the `P5Asciifier` instances managed by the library.
   * 
   * For the provided {@link p5asciify} object this method is called automatically when the users `setup` function finished executing.
   * @ignore
   */
  setup() {
    this._asciifiers.forEach((e) => {
      e.setup();
    });
  }
  /**
   * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
   * 
   * For the provided {@link p5asciify} object this method is called automatically when the users `draw` function finished executing.
   * 
   * @ignore
   */
  asciify() {
    this._asciifiers.forEach((e) => {
      e.asciify();
    });
  }
  /**
   * Returns the `P5Asciifier` instance at the specified index.
   * 
   * By default, the method returns the first `P5Asciifier` instance in the list, 
   * which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.
   * 
   * @param index The index of the `P5Asciifier` instance to return.
   * @returns The `P5Asciifier` instance at the specified index.
   * @throws {@link P5AsciifyError} If the index is out of bounds.
   */
  asciifier(e = 0) {
    if (e < 0 || e >= this._asciifiers.length)
      throw new o(`Invalid asciifier index: ${e}.`);
    return this._asciifiers[e];
  }
  /**
   * Adds a new `P5Asciifier` instance to the library.
   * @param framebuffer   The framebuffer to capture for ASCII conversion.
   *                      If not provided, the main canvas of the `p5.js` instance will be used.
   * @returns The newly created `P5Asciifier` instance.
   * @throws {@link P5AsciifyError} If the framebuffer is not an instance of `p5.Framebuffer`.
   */
  add(e) {
    if (e !== void 0 && !(e instanceof E.Framebuffer))
      throw new o("Framebuffer must be an instance of p5.Framebuffer.");
    const A = new M(e);
    return A.init(this._p, this._baseFont), this._p._setupDone && A.setup(), this._asciifiers.push(A), A;
  }
  /**
   * Removes a `P5Asciifier` instance.
   * @param indexOrAsciifier The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself.
   * @throws {@link P5AsciifyError} If the index is out of bounds or the specified asciifier is not found.
   */
  remove(e) {
    if (typeof e == "number") {
      const A = e;
      if (A < 0 || A >= this._asciifiers.length)
        throw new o(`Invalid asciifier index: ${A}.`);
      this._asciifiers.splice(A, 1);
    } else {
      const A = e, r = this._asciifiers.indexOf(A);
      if (r === -1)
        throw new o("The specified asciifier was not found.");
      this._asciifiers.splice(r, 1);
    }
  }
  /**
   * Sets hooks status. This method should be called if you need to manually 
   * enable or disable the automatic pre/post draw hooks.
   * 
   * @param enabled Whether the hooks should be enabled
   * @ignore
   */
  setHooksEnabled(e) {
    this._hooksEnabled = e;
  }
  /**
   * Returns the list of `P5Asciifier` instances managed by the library.
   */
  get asciifiers() {
    return this._asciifiers;
  }
  /**
   * Returns `true` if the hooks are enabled, `false` otherwise.
   * @ignore
   */
  get hooksEnabled() {
    return this._hooksEnabled;
  }
}
const k = (s, e) => {
  const [A, r] = [s, e].map((i) => i.split(".").map(Number));
  for (let i = 0; i < Math.max(A.length, r.length); i++) {
    const B = A[i] ?? 0, g = r[i] ?? 0;
    if (B !== g) return B > g ? 1 : -1;
  }
  return 0;
}, rA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ACCURATE_DEFAULT_OPTIONS: _,
  AbstractFeatureRenderer2D: h,
  BRIGHTNESS_DEFAULT_OPTIONS: f,
  EDGE_DEFAULT_OPTIONS: u,
  P5AsciifyAccurateRenderer: I,
  P5AsciifyBrightnessRenderer: m,
  P5AsciifyEdgeRenderer: p
}, Symbol.toStringTag, { value: "Module" })), tA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CUSTOM_DEFAULT_OPTIONS_2D: D,
  P5AsciifyRenderer2D: C,
  feature: rA
}, Symbol.toStringTag, { value: "Module" })), aA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "2d": tA,
  P5AsciifyDisplayRenderer: T,
  P5AsciifyRenderer: G,
  P5AsciifyRendererManager: Y,
  RENDERER_TYPES: P
}, Symbol.toStringTag, { value: "Module" }));
class n {
  constructor(e, A, r, i) {
    t(this, "w");
    t(this, "x");
    t(this, "y");
    t(this, "z");
    this.w = e, this.x = A, this.y = r, this.z = i;
  }
  static angleAxis(e, A) {
    const r = e / 2, i = Math.sin(r);
    return new n(Math.cos(r), A[0] * i, A[1] * i, A[2] * i).normalize();
  }
  multiply(e) {
    const A = this.w * e.w - this.x * e.x - this.y * e.y - this.z * e.z, r = this.w * e.x + this.x * e.w + this.y * e.z - this.z * e.y, i = this.w * e.y - this.x * e.z + this.y * e.w + this.z * e.x, B = this.w * e.z + this.x * e.y - this.y * e.x + this.z * e.w;
    return new n(A, r, i, B);
  }
  normalize() {
    const e = Math.hypot(this.w, this.x, this.y, this.z);
    return e === 0 ? new n(1, 0, 0, 0) : new n(this.w / e, this.x / e, this.y / e, this.z / e);
  }
}
const hA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Quaternion: n,
  compareVersions: k
}, Symbol.toStringTag, { value: "Module" })), a = new eA();
typeof window < "u" && (window.p5asciify = a);
const iA = (s) => {
  a.hooksEnabled && a.init(s);
};
E.prototype.registerMethod("init", function() {
  iA(this);
});
const sA = (s) => {
  a.hooksEnabled && setTimeout(() => {
    if (!(s._renderer.drawingContext instanceof WebGLRenderingContext || s._renderer.drawingContext instanceof WebGL2RenderingContext))
      throw new o("WebGL renderer is required for p5.asciify to run.");
    if (k(s.VERSION, "1.8.0") < 0)
      throw new o("p5.asciify requires p5.js v1.8.0 or higher to run.");
    a.setup(), s.setupAsciify && s.setupAsciify();
  }, 0);
};
E.prototype.registerMethod("afterSetup", function() {
  sA(this);
});
const BA = (s) => {
  for (const e of a.asciifiers)
    e.canvasFlag && (e.captureFramebuffer.begin(), s.clear(), s.push());
}, oA = (s) => {
  for (const e of a.asciifiers)
    e.canvasFlag && (s.pop(), e.captureFramebuffer.end());
  a.asciify(), s.drawAsciify && s.drawAsciify();
};
E.prototype.registerMethod("pre", function() {
  a.hooksEnabled && BA(this);
});
E.prototype.registerMethod("post", function() {
  a.hooksEnabled && oA(this);
});
const gA = [
  ["_getImmediateModeShader", "_defaultImmediateModeShader"],
  ["_getNormalShader", "_defaultNormalShader"],
  ["_getColorShader", "_defaultColorShader"],
  ["_getPointShader", "_defaultPointShader"],
  ["_getLineShader", "_defaultLineShader"],
  ["_getFontShader", "_defaultFontShader"]
];
for (const [s, e] of gA) {
  const A = E.RendererGL.prototype[s];
  E.RendererGL.prototype[s] = function() {
    return this[e] || (this[e] = A.call(this), this[e]._vertSrc = this[e]._vertSrc.replace(
      /mediump/g,
      "highp"
    ), this[e]._fragSrc = this[e]._fragSrc.replace(
      /mediump/g,
      "highp"
    )), this[e];
  };
}
export {
  M as P5Asciifier,
  eA as P5AsciifierManager,
  K as P5AsciifyColorPalette,
  o as P5AsciifyError,
  J as P5AsciifyFontManager,
  H as P5AsciifyGrid,
  sA as afterSetupHook,
  iA as initHook,
  a as p5asciify,
  oA as postDrawHook,
  BA as preDrawHook,
  aA as renderers,
  hA as utils
};
