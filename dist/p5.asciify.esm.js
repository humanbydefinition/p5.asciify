var T = Object.defineProperty;
var y = (s, A, e) => A in s ? T(s, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[A] = e;
var r = (s, A, e) => y(s, typeof A != "symbol" ? A + "" : A, e);
import g from "p5";
class l extends Error {
  constructor(A) {
    super(A), this.name = "P5AsciifyError";
  }
}
class U {
  constructor(A, e, t) {
    r(this, "_characters");
    r(this, "_characterGlyphs");
    r(this, "_maxGlyphDimensions");
    r(this, "_texture");
    r(this, "_charsetCols", 0);
    r(this, "_charsetRows", 0);
    this.p = A, this.font = e, this._fontSize = t;
    const i = Object.values(this.font.font.glyphs.glyphs);
    this._characters = i.filter((o) => o.unicode !== void 0).map((o) => String.fromCharCode(o.unicode)), this._characterGlyphs = this._loadCharacterGlyphs(), this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
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
      (e, t) => {
        const i = t.getPath(0, 0, A).getBoundingBox();
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
      const t = e % this._charsetCols, i = Math.floor(e / this._charsetCols), o = this._maxGlyphDimensions.width * t - this._maxGlyphDimensions.width * this._charsetCols / 2, a = this._maxGlyphDimensions.height * i - this._maxGlyphDimensions.height * this._charsetRows / 2;
      this.p.text(String.fromCharCode(this._characterGlyphs[e].unicode), o, a);
    }
  }
  /**
   * Gets an array of RGB colors for a given string or array of characters.
   * @param input - Either a string or array of characters
   * @returns Array of RGB color values
   * @throws P5AsciifyError If a character is not found in the texture atlas
   */
  getCharsetColorArray(A) {
    return (Array.isArray(A) ? A : Array.from(A)).map((t) => {
      const i = this._characterGlyphs.find(
        (o) => o.unicodes.includes(t.codePointAt(0))
      );
      if (!i)
        throw new l(`Could not find character in character set: ${t}`);
      return [i.r, i.g, i.b];
    });
  }
  /**
   * Returns an array of characters that are not supported by the current font.
   * @param characters - The string of characters to check.
   * @returns An array of unsupported characters.List is empty if all characters are supported.
   */
  getUnsupportedCharacters(A) {
    return Array.from(
      new Set(
        Array.from(A).filter(
          (e) => !this._characterGlyphs.some(
            (t) => t.unicodes.includes(e.codePointAt(0))
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
class M {
  constructor(A, e, t) {
    r(this, "_cols", 0);
    r(this, "_rows", 0);
    r(this, "_width", 0);
    r(this, "_height", 0);
    r(this, "_offsetX", 0);
    r(this, "_offsetY", 0);
    this.p = A, this._cellWidth = e, this._cellHeight = t, this.reset();
  }
  /**
   * Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.
   */
  reset() {
    [this._cols, this._rows] = this._calculateGridSize(), this._resizeGrid();
  }
  /**
   * Reset the total grid width/height and the offset to the outer canvas.
   */
  _resizeGrid() {
    this._width = this._cols * this._cellWidth, this._height = this._rows * this._cellHeight, this._offsetX = Math.floor((this.p.width - this._width) / 2), this._offsetY = Math.floor((this.p.height - this._height) / 2);
  }
  /**
   * Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.
   * @returns The number of columns and rows in the grid.
   */
  _calculateGridSize() {
    return [
      Math.floor(this.p.width / this._cellWidth),
      Math.floor(this.p.height / this._cellHeight)
    ];
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
class G {
  constructor() {
    r(this, "eventListeners");
    this.eventListeners = /* @__PURE__ */ new Map();
  }
  /**
   * Emit an event with a given name and data.
   * @param eventName Name of the event to emit. 
   * @param data Data to pass to the event listeners.
   */
  emit(A, e) {
    (this.eventListeners.get(A) || []).forEach((i) => i(e));
  }
  /**
   * Register a callback for a given event name.
   * @param eventName Name of the event to listen for.
   * @param callback Callback function to run when the event is emitted.
   */
  on(A, e) {
    var t;
    this.eventListeners.has(A) || this.eventListeners.set(A, []), (t = this.eventListeners.get(A)) == null || t.push(e);
  }
  /**
   * Remove a callback for a given event name.
   * @param eventName Name of the event to remove the callback from.
   * @param callback Callback function to remove.
   */
  off(A, e) {
    if (!this.eventListeners.has(A)) return;
    const t = this.eventListeners.get(A);
    t && this.eventListeners.set(
      A,
      t.filter((i) => i !== e)
    );
  }
}
const f = {
  MIN: 1,
  MAX: 128
};
function Y(s, A) {
  if (A != null && A.characterColor && (A.characterColor = s.color(A.characterColor)), A != null && A.backgroundColor && (A.backgroundColor = s.color(A.backgroundColor)), A != null && A.fontSize && (A.fontSize < f.MIN || A.fontSize > f.MAX))
    throw new l(`Font size ${A.fontSize} is out of bounds. It should be between ${f.MIN} and ${f.MAX}.`);
}
class B {
  constructor(A, e, t, i) {
    r(this, "_options");
    r(this, "p");
    r(this, "grid");
    r(this, "characterSet");
    r(this, "_primaryColorSampleFramebuffer");
    r(this, "_secondaryColorSampleFramebuffer");
    r(this, "_asciiCharacterFramebuffer");
    r(this, "_outputFramebuffer");
    if (new.target === B)
      throw new TypeError("Cannot construct AsciiRenderer instances directly");
    this.p = A, this.grid = e, this.characterSet = t, this._options = i, this._primaryColorSampleFramebuffer = this.p.createFramebuffer({
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
    });
  }
  /**
   * Resizes all framebuffers based on the grid dimensions.
   */
  resizeFramebuffers() {
    this._primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows), this._secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows), this._asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  /**
   * Resets shaders. To be implemented by subclasses.
   */
  resetShaders() {
  }
  /**
   * Updates renderer options.
   * @param newOptions - The new options to update.
   */
  updateOptions(A) {
    Y(this.p, A), this._options = {
      ...this._options,
      ...A
    }, this.p._setupDone && A != null && A.characters && (this.characterSet.setCharacterSet(A.characters), this.resetShaders());
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
  get asciiCharacterFramebuffer() {
    return this._asciiCharacterFramebuffer;
  }
}
var n = "precision mediump float;attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}", C = "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_asciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform float u_rotationAngle;uniform int u_invertMode;uniform vec2 u_resolution;uniform float u_pixelRatio;uniform sampler2D u_prevAsciiTexture;uniform sampler2D u_gradientReferenceTexture;uniform sampler2D u_edgesTexture;uniform int u_layer;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 adjustedCoord=(logicalFragCoord-u_gridOffsetDimensions)/u_gridPixelDimensions;vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(0);return;}vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);if(u_layer==2){vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);vec4 gradientReferenceColor=texture2D(u_gradientReferenceTexture,charIndexTexCoord);if(encodedIndexVec.rgb==gradientReferenceColor.rgb){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}}else if(u_layer==3){vec4 edgeColor=texture2D(u_edgesTexture,charIndexTexCoord);if(edgeColor.rgb==vec3(0.0)){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}}else if(u_layer==4){vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.rgba==vec4(0.0)){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}}vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=charIndex-(charIndex/int(u_charsetDimensions.x))*int(u_charsetDimensions.x);int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(float(charCol)/u_charsetDimensions.x,float(charRow)/u_charsetDimensions.y);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? secondaryColor : texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=vec4(primaryColor.rgb*charColor.rgb,charColor.a);gl_FragColor=mix(secondaryColor,finalColor,charColor.a);if(outsideBounds){gl_FragColor=u_invertMode==1 ? primaryColor : secondaryColor;}}", k = "precision mediump float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;void main(){vec2 logicalFragCoord=gl_FragCoord.xy;vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 sampledColor=texture2D(u_sketchTexture,cellCenterTexCoord);gl_FragColor=sampledColor;}", z = `#version 100
precision mediump float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_textureSize;void main(){vec2 pos=(floor(gl_FragCoord.xy)+0.5)/u_textureSize;float brightness=dot(texture2D(u_colorSampleFramebuffer,pos).rgb,vec3(0.299,0.587,0.114));float index=clamp(floor(brightness*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);gl_FragColor=vec4(texture2D(u_charPaletteTexture,vec2((index+0.5)/u_charPaletteSize.x,0.0)).rgb,1.0);}`;
class R extends B {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "colorSampleShader");
    r(this, "asciiCharacterShader");
    r(this, "shader");
    r(this, "colorSampleFramebuffer");
    this.colorSampleShader = this.p.createShader(n, k), this.asciiCharacterShader = this.p.createShader(n, z), this.shader = this.p.createShader(n, C), this.colorSampleFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    });
  }
  /**
   * Resize the framebuffers used by this renderer.
   */
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.colorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  /**
   * Compute and render the ASCII representation of the input framebuffer.
   * @param inputFramebuffer The input framebuffer to asciify.
   * @param previousAsciiRenderer The previous ASCII renderer that rendered the last iteration of the same frame.
   * @param isFirstRenderer Whether this is the first renderer in the chain.
   */
  render(e, t, i) {
    this.colorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.p.rect(0, 0, this.p.width, this.p.height), this.colorSampleFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this._options.characterColorMode === 1 ? this.p.background(this._options.characterColor) : (this.p.clear(), this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows)), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this.p.background(this._options.backgroundColor) : (this.p.clear(), this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows)), this._secondaryColorSampleFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_textureSize", [this.grid.cols, this.grid.rows]), this.asciiCharacterShader.setUniform("u_colorSampleFramebuffer", this.colorSampleFramebuffer), this.asciiCharacterShader.setUniform("u_charPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_charPaletteSize", [this.characterSet.characterColorPalette.colors.length, 1]), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 1), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), i || this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", this._options.invertMode), this.shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
const p = (s) => `
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

uniform sampler2D u_charPaletteTexture;
uniform vec2 u_charPaletteSize;          // Width = number of characters, Height = 1

// Constants
const float SAMPLE_SIZE = float(${s});
const float SAMPLE_COUNT = SAMPLE_SIZE * SAMPLE_SIZE;

void main() {
    // Adjust fragment coordinates to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);

    // Compute the grid cell coordinate
    vec2 cellCoord = floor(logicalFragCoord.xy);

    // Compute the size of each cell in logical pixels
    vec2 cellSizeInPixels = u_gridPixelDimensions / u_gridCellDimensions;

    // Compute the cell range in texture coordinates (0 to 1)
    vec2 cellStartTexCoord = (cellCoord * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellEndTexCoord = ((cellCoord + vec2(1.0)) * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellSizeTexCoord = cellEndTexCoord - cellStartTexCoord;

    float minError = 1.0e20; // Large initial value
    float bestCharIndex = 0.0;

    // Precompute reciprocal of sample size
    float invSampleSize = 1.0 / SAMPLE_SIZE;

    // Number of palette entries (characters considered)
    float paletteCount = u_charPaletteSize.x;

    // Iterate through all characters defined by the palette texture
    for (int i = 0; i < 1024; i++) {
        // Break out of the loop if we exceed the palette count
        if (float(i) >= paletteCount) {
            break;
        }

        // Sample the character palette texture to get encoded indices
        // Use a coordinate that reads the ith pixel from a 1D texture.
        // The palette is assumed to be in a single row: height = 1.
        // We sample at the center of the pixel: (i + 0.5) / paletteCount on the x-axis.
        vec2 paletteUV = vec2((float(i) + 0.5) / paletteCount, 0.5 / u_charPaletteSize.y);
        vec4 encoded = texture2D(u_charPaletteTexture, paletteUV);

        // Decode character index from the encoded RGB channels
        // Each channel is [0.0, 1.0], representing a byte [0, 255].
        float R = encoded.r * 255.0;
        float G = encoded.g * 255.0;
        float B = encoded.b * 255.0;

        float decodedCharIndex = R + G * 256.0 + B * 65536.0;

        // Compute character row and column in the character atlas
        float charRow = floor(decodedCharIndex / u_charsetCols);
        float charCol = decodedCharIndex - u_charsetCols * charRow;

        // Base texture coordinates for this character
        vec2 charBaseCoord = vec2(charCol / u_charsetCols, charRow / u_charsetRows);
        vec2 charSize = vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);

        float error = 0.0;

        // Compare the cell against this character using a grid of samples
        for (int dy = 0; dy < ${s}; dy++) {
            for (int dx = 0; dx < ${s}; dx++) {
                // Compute sample offset
                vec2 sampleOffset = vec2(float(dx) + 0.5, float(dy) + 0.5) * invSampleSize;

                // Sample from sketch texture
                vec2 sketchSampleCoord = cellStartTexCoord + sampleOffset * cellSizeTexCoord;
                float sketchPixel = texture2D(u_sketchTexture, sketchSampleCoord).r;

                // Sample from character texture
                vec2 charSampleCoord = charBaseCoord + sampleOffset * charSize;
                float charPixel = texture2D(u_characterTexture, charSampleCoord).r;

                // Accumulate squared difference
                float diff = sketchPixel - charPixel;
                error += diff * diff;
            }
        }

        // Normalize the error by the number of samples
        error /= SAMPLE_COUNT;

        // Keep track of the best matching character
        if (error < minError) {
            minError = error;
            bestCharIndex = decodedCharIndex;
        }
    }

    // Encode the bestCharIndex back into two channels (R and G) of the output
    float lowerByte = mod(bestCharIndex, 256.0);
    float upperByte = floor(bestCharIndex / 256.0);

    float encodedR = lowerByte / 255.0;
    float encodedG = upperByte / 255.0;

    gl_FragColor = vec4(encodedR, encodedG, 0.0, 1.0);
}
`, _ = (s, A) => `
#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;
uniform vec2 u_inputImageSize;
uniform int u_gridCols;
uniform int u_gridRows;

// Constants
const int SAMPLES_PER_ROW = ${s};
const int SAMPLES_PER_COL = ${A};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);
    
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

`, P = (s, A, e) => `
#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;        // Original input image
uniform sampler2D u_inputImageBW;      // Black and white image
uniform vec2 u_inputImageSize;         // Size of the input image (e.g., 800.0, 800.0)
uniform int u_gridCols;                // Number of grid columns (e.g., 100)
uniform int u_gridRows;                // Number of grid rows (e.g., 100)
uniform int u_colorRank;               // Color rank (e.g., 1 or 2)

// Constants
const int NUM_SLOTS = ${s};
const int SAMPLES_PER_ROW = ${A};
const int SAMPLES_PER_COL = ${e};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);

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
var O = `#version 100
precision mediump float;uniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;uniform float u_pixelRatio;const float EPSILON=0.01;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);float gridX=floor(logicalFragCoord.x/cellWidth);float gridY=floor(logicalFragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;vec2 imageTexCoord=logicalFragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue;if(brightnessDifference<-EPSILON){finalColorValue=0.0;}else{finalColorValue=1.0;}gl_FragColor=vec4(vec3(finalColorValue),1.0);}`;
class N extends B {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "characterSelectionShader");
    r(this, "brightnessSampleShader");
    r(this, "colorSampleShader");
    r(this, "brightnessSplitShader");
    r(this, "shader");
    r(this, "brightnessSampleFramebuffer");
    r(this, "brightnessSplitFramebuffer");
    this.characterSelectionShader = this.p.createShader(n, p(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length)), this.brightnessSampleShader = this.p.createShader(n, _(this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(n, P(16, this.grid.cellHeight, this.grid.cellWidth)), this.brightnessSplitShader = this.p.createShader(n, O), this.shader = this.p.createShader(n, C), this.brightnessSampleFramebuffer = this.p.createFramebuffer({
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
    this.characterSelectionShader = this.p.createShader(n, p(this.characterSet.asciiFontTextureAtlas.fontSize)), this.brightnessSampleShader = this.p.createShader(n, _(this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(n, P(16, this.grid.cellHeight, this.grid.cellWidth));
  }
  render(e, t, i) {
    this.brightnessSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.brightnessSampleShader), this.brightnessSampleShader.setUniform("u_inputImage", e), this.brightnessSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.brightnessSampleShader.setUniform("u_gridCols", this.grid.cols), this.brightnessSampleShader.setUniform("u_gridRows", this.grid.rows), this.p.rect(0, 0, this.p.width, this.p.height), this.brightnessSampleFramebuffer.end(), this.brightnessSplitFramebuffer.begin(), this.p.clear(), this.p.shader(this.brightnessSplitShader), this.brightnessSplitShader.setUniform("u_inputImage", e), this.brightnessSplitShader.setUniform("u_brightnessTexture", this.brightnessSampleFramebuffer), this.brightnessSplitShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.brightnessSplitShader.setUniform("u_gridCols", this.grid.cols), this.brightnessSplitShader.setUniform("u_gridRows", this.grid.rows), this.brightnessSplitShader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.p.rect(0, 0, this.p.width, this.p.height), this.brightnessSplitFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this._options.characterColorMode === 1 ? this.p.background(this._options.characterColor) : (this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_inputImage", e), this.colorSampleShader.setUniform("u_inputImageBW", this.brightnessSplitFramebuffer), this.colorSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.colorSampleShader.setUniform("u_gridCols", this.grid.cols), this.colorSampleShader.setUniform("u_gridRows", this.grid.rows), this.colorSampleShader.setUniform("u_colorRank", 1), this.p.rect(0, 0, this.p.width, this.p.height)), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this.p.background(this._options.backgroundColor) : (this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_inputImage", e), this.colorSampleShader.setUniform("u_inputImageBW", this.brightnessSplitFramebuffer), this.colorSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.colorSampleShader.setUniform("u_gridCols", this.grid.cols), this.colorSampleShader.setUniform("u_gridRows", this.grid.rows), this.colorSampleShader.setUniform("u_colorRank", 2), this.p.rect(0, 0, this.p.width, this.p.height)), this._secondaryColorSampleFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.characterSelectionShader), this.characterSelectionShader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.characterSelectionShader.setUniform("u_charsetCols", this.characterSet.asciiFontTextureAtlas.charsetCols), this.characterSelectionShader.setUniform("u_charsetRows", this.characterSet.asciiFontTextureAtlas.charsetRows), this.characterSelectionShader.setUniform("u_charPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.characterSelectionShader.setUniform("u_charPaletteSize", [this.characterSet.characterColorPalette.colors.length, 1]), this.characterSelectionShader.setUniform("u_sketchTexture", this.brightnessSplitFramebuffer), this.characterSelectionShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.characterSelectionShader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 1), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), i || this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", this._options.invertMode), this.shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
class X extends B {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "shader");
    this.shader = this.p.createShader(n, C);
  }
  render(e, t, i) {
    this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 4), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), i || this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", 0), this.shader.setUniform("u_rotationAngle", 0), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
var L = `#version 100
precision mediump float;uniform sampler2D u_sketchTexture;uniform bool u_previousRendererEnabled;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isBlackSample=texture2D(u_sampleTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0);if(isBlackSample&&u_previousRendererEnabled){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}`, H = `#version 100
precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_colorPaletteTexture;uniform sampler2D u_previousAsciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform int u_totalChars;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;if(texture2D(u_sketchTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0)){gl_FragColor=texture2D(u_previousAsciiCharacterTexture,cellCenterTexCoord);return;}vec4 sketchColor=texture2D(u_sketchTexture,cellCenterTexCoord);float brightness=dot(sketchColor.rgb,vec3(0.299,0.587,0.114));int charIndex=int(brightness*float(u_totalChars));if(charIndex>u_totalChars-1){charIndex=u_totalChars-1;}float paletteCoord=(float(charIndex)+0.5)/float(u_totalChars);gl_FragColor=texture2D(u_colorPaletteTexture,vec2(paletteCoord,0.5));}`, J = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);float angleDeg=degrees(atan(sobelY.r,sobelX.r));vec3 edgeColor=vec3(0.0);if(intensity>u_threshold){if(angleDeg>=-22.5&&angleDeg<22.5){edgeColor=vec3(0.1);}else if(angleDeg>=22.5&&angleDeg<67.5){edgeColor=vec3(0.2);}else if(angleDeg>=67.5&&angleDeg<112.5){edgeColor=vec3(0.3);}else if(angleDeg>=112.5&&angleDeg<157.5){edgeColor=vec3(0.4);}else if(angleDeg>=157.5||angleDeg<-157.5){edgeColor=vec3(0.6);}else if(angleDeg>=-157.5&&angleDeg<-112.5){edgeColor=vec3(0.7);}else if(angleDeg>=-112.5&&angleDeg<-67.5){edgeColor=vec3(0.8);}else if(angleDeg>=-67.5&&angleDeg<-22.5){edgeColor=vec3(0.9);}}gl_FragColor=vec4(edgeColor,1.0);}";
const I = (s, A, e) => `
#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_image;
uniform vec2 u_imageSize;             // Size of the input image in logical pixels (width, height)
uniform vec2 u_gridCellDimensions;    // Number of cells in the grid (columns, rows)
uniform int u_threshold;              // Threshold for non-black pixel count

// Constants
const vec3 BLACK = vec3(0.0, 0.0, 0.0);
const int MAX_HISTOGRAM_SIZE = ${s};
const int SAMPLES_PER_ROW = ${A};
const int SAMPLES_PER_COL = ${e};

// Histograms
vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
int countHistogram[MAX_HISTOGRAM_SIZE];

// Utility function for rounding
float roundFloat(float value) {
    return floor(value + 0.5);
}

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);
    
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
class j extends B {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "sobelShader");
    r(this, "sampleShader");
    r(this, "colorSampleShader");
    r(this, "asciiCharacterShader");
    r(this, "shader");
    r(this, "sobelFramebuffer");
    r(this, "sampleFramebuffer");
    this._options.characterColor = this.p.color(this._options.characterColor), this._options.backgroundColor = this.p.color(this._options.backgroundColor), this.sobelShader = this.p.createShader(n, J), this.sampleShader = this.p.createShader(n, I(16, this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(n, L), this.asciiCharacterShader = this.p.createShader(n, H), this.shader = this.p.createShader(n, C), this.sobelFramebuffer = this.p.createFramebuffer({
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
    this.sampleShader = this.p.createShader(n, I(16, this.grid.cellHeight, this.grid.cellWidth));
  }
  render(e, t, i) {
    this.sobelFramebuffer.begin(), this.p.clear(), this.p.shader(this.sobelShader), this.sobelShader.setUniform("u_texture", e), this.sobelShader.setUniform("u_textureSize", [this.p.width, this.p.height]), this.sobelShader.setUniform("u_threshold", this.options.sobelThreshold), this.p.rect(0, 0, this.p.width, this.p.height), this.sobelFramebuffer.end(), this.sampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.sampleShader), this.sampleShader.setUniform("u_imageSize", [this.p.width, this.p.height]), this.sampleShader.setUniform("u_image", this.sobelFramebuffer), this.sampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.sampleShader.setUniform("u_threshold", this.options.sampleThreshold), this.p.rect(0, 0, this.p.width, this.p.height), this.sampleFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousRendererEnabled", t.options.enabled), this.colorSampleShader.setUniform("u_previousColorTexture", t.primaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousRendererEnabled", t.options.enabled), this.colorSampleShader.setUniform("u_previousColorTexture", t.secondaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._secondaryColorSampleFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_sketchTexture", this.sampleFramebuffer), this.asciiCharacterShader.setUniform("u_colorPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_previousAsciiCharacterTexture", t.asciiCharacterFramebuffer), this.asciiCharacterShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.asciiCharacterShader.setUniform("u_totalChars", this.characterSet.characters.length), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 3), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), i || this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), this.shader.setUniform("u_edgesTexture", this.sampleFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", this._options.invertMode), this.shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
var W = "precision mediump float;uniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);float luminance=0.299*color.r+0.587*color.g+0.114*color.b;color.rgb=vec3(luminance);gl_FragColor=color;}", K = `#version 100
precision mediump float;uniform sampler2D u_sketchTexture;uniform bool u_previousRendererEnabled;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isMatchingSample=texture2D(u_sampleTexture,cellCenterTexCoord)==texture2D(u_sampleReferenceTexture,cellCenterTexCoord);if(isMatchingSample&&u_previousRendererEnabled){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);return;}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}`;
class Z extends B {
  constructor(e, t, i, o, a) {
    super(e, t, i, a);
    r(this, "grayscaleShader");
    r(this, "colorSampleShader");
    r(this, "asciiShader");
    r(this, "grayscaleFramebuffer");
    r(this, "prevAsciiCharacterFramebuffer");
    r(this, "gradientManager");
    this._options.characterColor = this.p.color(this._options.characterColor), this._options.backgroundColor = this.p.color(this._options.backgroundColor), this.gradientManager = o, this.grayscaleShader = this.p.createShader(n, W), this.colorSampleShader = this.p.createShader(n, K), this.asciiShader = this.p.createShader(n, C), this.grayscaleFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.prevAsciiCharacterFramebuffer = this.p.createFramebuffer({
      density: 1,
      width: this.grid.cols,
      height: this.grid.rows,
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows), this.prevAsciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
  }
  render(e, t, i) {
    this.grayscaleFramebuffer.begin(), this.p.clear(), this.p.shader(this.grayscaleShader), this.grayscaleShader.setUniform("u_image", e), this.p.rect(0, 0, this.p.width, this.p.height), this.grayscaleFramebuffer.end(), this.prevAsciiCharacterFramebuffer.begin(), this.p.clear(), this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2), this.prevAsciiCharacterFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2), this._asciiCharacterFramebuffer.end();
    for (const o of this.gradientManager.gradients)
      o.enabled && ([this.prevAsciiCharacterFramebuffer, this._asciiCharacterFramebuffer] = [this._asciiCharacterFramebuffer, this.prevAsciiCharacterFramebuffer], this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(o.shader), o.setUniforms(this.p, this.prevAsciiCharacterFramebuffer, this.grayscaleFramebuffer), this.p.rect(0, 0, this.grid.cols, this.grid.rows), this._asciiCharacterFramebuffer.end());
    this._primaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousRendererEnabled", t.options.enabled), this.colorSampleShader.setUniform("u_previousColorTexture", t.primaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this._asciiCharacterFramebuffer), this.colorSampleShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousRendererEnabled", t.options.enabled), this.colorSampleShader.setUniform("u_previousColorTexture", t.secondaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this._asciiCharacterFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._secondaryColorSampleFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiShader), this.asciiShader.setUniform("u_layer", 2), this.asciiShader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.asciiShader.setUniform("u_resolution", [this.p.width, this.p.height]), this.asciiShader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.asciiShader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.asciiShader.setUniform("u_gradientReferenceTexture", this.grayscaleFramebuffer), this.asciiShader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.asciiShader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.asciiShader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), i || this.asciiShader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.asciiShader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.asciiShader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.asciiShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.asciiShader.setUniform("u_invertMode", this._options.invertMode), this.asciiShader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
const m = {
  enabled: !0,
  characters: "0123456789",
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  rotationAngle: 0
}, x = {
  enabled: !1,
  characters: "0123456789",
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  rotationAngle: 0
}, V = {
  enabled: !1,
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  rotationAngle: 0
}, w = {
  enabled: !1,
  characters: "-/|\\-/|\\",
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  sobelThreshold: 0.5,
  sampleThreshold: 16,
  rotationAngle: 0
}, $ = {
  enabled: !1
};
class S {
  constructor(A) {
    r(this, "_colors");
    r(this, "framebuffer");
    r(this, "p5Instance");
    this._colors = A;
  }
  /**
   * Setup the color palette with a p5 instance.
   * @param p5Instance The p5 instance to use for creating the framebuffer.
   */
  setup(A) {
    this.p5Instance = A;
    const e = Math.max(this._colors.length, 1);
    this.framebuffer = this.p5Instance.createFramebuffer({
      density: 1,
      width: e,
      height: 1,
      depthFormat: this.p5Instance.UNSIGNED_INT,
      textureFiltering: this.p5Instance.NEAREST
    }), this.updateFramebuffer();
  }
  /**
   * Update the framebuffer with the current colors.
   */
  updateFramebuffer() {
    if (!this.framebuffer || !this.p5Instance) return;
    const A = Math.max(this._colors.length, 1);
    this.framebuffer.resize(A, 1), this.framebuffer.loadPixels();
    for (let t = 0; t < A; t++) {
      const i = t < this._colors.length ? this.p5Instance.color(this._colors[t]) : this.p5Instance.color(0, 0, 0, 0), o = 4 * t;
      this.framebuffer.pixels[o] = this.p5Instance.red(i), this.framebuffer.pixels[o + 1] = this.p5Instance.green(i), this.framebuffer.pixels[o + 2] = this.p5Instance.blue(i), this.framebuffer.pixels[o + 3] = this.p5Instance.alpha(i);
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
class u {
  constructor(A, e, t) {
    r(this, "_characters");
    r(this, "characterColors");
    r(this, "characterColorPalette");
    this.p = A, this.asciiFontTextureAtlas = e, this._characters = this.validateCharacters(t), this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters), this.characterColorPalette = new S(this.characterColors), this.characterColorPalette.setup(this.p);
  }
  /**
   * Validates the characters to ensure they are supported by the current font.
   * @param characters The characters to validate.
   * @returns The validated characters as a list of characters.
   * @throws {P5AsciifyError} If any characters are not supported by the font
   */
  validateCharacters(A) {
    const e = this.asciiFontTextureAtlas.getUnsupportedCharacters(A);
    if (e.length > 0)
      throw new l(`The following characters are not supported by the current font: [${e.join(", ")}].`);
    return Array.from(A);
  }
  /**
   * Sets the characters to be used in the character set and updates the texture.
   * @param characters The string of characters to use.
   */
  setCharacterSet(A) {
    this._characters = this.validateCharacters(A), this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters), this.characterColorPalette.setColors(this.characterColors);
  }
  // Getters
  get characters() {
    return this._characters;
  }
}
class Q {
  constructor(A, e, t, i) {
    r(this, "_brightnessStart");
    r(this, "_brightnessEnd");
    r(this, "_enabled");
    r(this, "_onPaletteChangeCallback");
    r(this, "_palette");
    this._shader = A, this.characters = i, this._brightnessStart = Math.floor(e / 255 * 100) / 100, this._brightnessEnd = Math.ceil(t / 255 * 100) / 100, this._enabled = !0;
  }
  registerPaletteChangeCallback(A) {
    this._onPaletteChangeCallback = A;
  }
  setup(A, e, t) {
    this._shader = e, this._palette = new S(t), this._palette.setup(A);
  }
  setUniforms(A, e, t) {
    this._shader.setUniform("textureID", e), this._shader.setUniform("originalTextureID", t), this._shader.setUniform("gradientTexture", this._palette.framebuffer), this._shader.setUniform("gradientTextureDimensions", [this._palette.colors.length, 1]), this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]), this._shader.setUniform("frameCount", A.frameCount);
  }
  set palette(A) {
    this._onPaletteChangeCallback && this._onPaletteChangeCallback(this, A);
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(A) {
    this._enabled = A;
  }
  get brightnessStart() {
    return this._brightnessStart;
  }
  set brightnessStart(A) {
    this._brightnessStart = A;
  }
  get brightnessEnd() {
    return this._brightnessEnd;
  }
  set brightnessEnd(A) {
    this._brightnessEnd = A;
  }
  get shader() {
    return this._shader;
  }
  get palette() {
    return this._palette;
  }
}
class q extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, o);
    r(this, "_direction");
    r(this, "_angle");
    r(this, "_speed");
    this._direction = a.direction, this._angle = a.angle, this._speed = a.speed;
  }
  setUniforms(e, t, i) {
    super.setUniforms(e, t, i), this._shader.setUniform("u_gradientDirection", this._direction), this._shader.setUniform("u_angle", this._angle * Math.PI / 180), this._shader.setUniform("u_speed", this._speed);
  }
  get direction() {
    return this._direction;
  }
  set direction(e) {
    this._direction = e;
  }
  get angle() {
    return this._angle;
  }
  set angle(e) {
    this._angle = e;
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    this._speed = e;
  }
}
class AA extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, o);
    r(this, "_direction");
    r(this, "_angle");
    r(this, "_speed");
    this._direction = a.direction, this._angle = a.angle, this._speed = a.speed ?? 0.01;
  }
  setUniforms(e, t, i) {
    super.setUniforms(e, t, i), this._shader.setUniform("u_gradientDirection", this._direction), this._shader.setUniform("u_angle", this._angle * Math.PI / 180), this._shader.setUniform("u_speed", this._speed);
  }
  get direction() {
    return this._direction;
  }
  set direction(e) {
    this._direction = e;
  }
  get angle() {
    return this._angle;
  }
  set angle(e) {
    this._angle = e;
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    this._speed = e;
  }
}
class eA extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, o);
    r(this, "_direction");
    r(this, "_centerX");
    r(this, "_centerY");
    r(this, "_speed");
    r(this, "_density");
    this._direction = a.direction, this._centerX = a.centerX, this._centerY = a.centerY, this._speed = a.speed, this._density = a.density;
  }
  setUniforms(e, t, i) {
    super.setUniforms(e, t, i), this._shader.setUniform("u_gradientDirection", this._direction), this._shader.setUniform("u_centerX", this._centerX), this._shader.setUniform("u_centerY", this._centerY), this._shader.setUniform("u_speed", this._speed), this._shader.setUniform("u_density", this._density);
  }
  get direction() {
    return this._direction;
  }
  set direction(e) {
    this._direction = e;
  }
  get centerX() {
    return this._centerX;
  }
  set centerX(e) {
    this._centerX = e;
  }
  get centerY() {
    return this._centerY;
  }
  set centerY(e) {
    this._centerY = e;
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    this._speed = e;
  }
  get density() {
    return this._density;
  }
  set density(e) {
    this._density = e;
  }
}
class tA extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, o);
    r(this, "_direction");
    r(this, "_centerX");
    r(this, "_centerY");
    r(this, "_radius");
    this._direction = a.direction, this._centerX = a.centerX, this._centerY = a.centerY, this._radius = a.radius;
  }
  setUniforms(e, t, i) {
    super.setUniforms(e, t, i), this._shader.setUniform("u_gradientDirection", this._direction), this._shader.setUniform("u_centerX", this._centerX), this._shader.setUniform("u_centerY", this._centerY), this._shader.setUniform("u_radius", this._radius);
  }
  get direction() {
    return this._direction;
  }
  set direction(e) {
    this._direction = e;
  }
  get centerX() {
    return this._centerX;
  }
  set centerX(e) {
    this._centerX = e;
  }
  get centerY() {
    return this._centerY;
  }
  set centerY(e) {
    this._centerY = e;
  }
  get radius() {
    return this._radius;
  }
  set radius(e) {
    this._radius = e;
  }
}
class rA extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, o);
    r(this, "_centerX");
    r(this, "_centerY");
    r(this, "_speed");
    this._centerX = a.centerX, this._centerY = a.centerY, this._speed = a.speed;
  }
  setUniforms(e, t, i) {
    super.setUniforms(e, t, i), this._shader.setUniform("u_centerX", this._centerX), this._shader.setUniform("u_centerY", this._centerY), this._shader.setUniform("u_speed", this._speed);
  }
  get centerX() {
    return this._centerX;
  }
  set centerX(e) {
    this._centerX = e;
  }
  get centerY() {
    return this._centerY;
  }
  set centerY(e) {
    this._centerY = e;
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    this._speed = e;
  }
}
class iA extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, o);
    r(this, "_direction");
    r(this, "_noiseScale");
    r(this, "_speed");
    this._direction = a.direction, this._noiseScale = a.noiseScale, this._speed = a.speed;
  }
  setUniforms(e, t, i) {
    super.setUniforms(e, t, i), this._shader.setUniform("direction", this._direction), this._shader.setUniform("noiseScale", this._noiseScale), this._shader.setUniform("u_speed", this._speed);
  }
  get direction() {
    return this._direction;
  }
  set direction(e) {
    this._direction = e;
  }
  get noiseScale() {
    return this._noiseScale;
  }
  set noiseScale(e) {
    this._noiseScale = e;
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    this._speed = e;
  }
}
var sA = `#version 100
precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy);vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange.x&&texColor.r<=u_brightnessRange.y&&texColor==originalTexColor){float position=logicalFragCoord.x*cos(u_angle)+logicalFragCoord.y*sin(u_angle);float index=mod(position+float(frameCount)*u_gradientDirection*u_speed,gradientTextureDimensions.x);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0.0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}`, oA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 logicalFragCoord=gl_FragCoord.xy;float positionX=logicalFragCoord.x*cos(u_angle)-logicalFragCoord.y*sin(u_angle);float positionY=logicalFragCoord.x*sin(u_angle)+logicalFragCoord.y*cos(u_angle);float rowIndex=floor(positionY);float direction=mod(rowIndex,2.0)==0.0 ? 1.0 :-1.0;float rowPosition=positionX;float index=mod(rowPosition+float(frameCount)*u_speed*direction*u_gradientDirection,gradientTextureDimensions.x);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", aA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_centerX;uniform float u_centerY;uniform float u_speed;uniform float u_density;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_gradientDirection*u_speed;float index=mod((distance+adjustedAngle*u_density)*gradientTextureDimensions.x,gradientTextureDimensions.x);float normalizedIndex=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", gA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float u_radius;uniform int frameCount;uniform int u_gradientDirection;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float normalizedDistance=clamp(distance/u_radius,0.0,1.0);float index=normalizedDistance*(gradientTextureDimensions.x-1.0);float animatedIndex=mod(index+float(frameCount)*0.1*float(-u_gradientDirection),gradientTextureDimensions.x);float normalizedIndex=(floor(animatedIndex)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", nA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform int frameCount;uniform float u_speed;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 flippedTexCoord=vec2(v_texCoord.x,v_texCoord.y);vec4 texColor=texture2D(textureID,flippedTexCoord);vec4 originalTexColor=texture2D(originalTextureID,flippedTexCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=flippedTexCoord-vec2(u_centerX,u_centerY);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_speed;float normalizedAngle=mod(adjustedAngle+3.14159265,2.0*3.14159265)/(2.0*3.14159265);float index=normalizedAngle*gradientTextureDimensions.x;float normalizedIndex=mod(floor(index)+0.5,gradientTextureDimensions.x)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", hA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float noiseScale;uniform float u_speed;uniform float direction;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 directionVec=vec2(cos(radians(direction)),sin(radians(direction)));vec2 uv=v_texCoord*noiseScale+directionVec*float(frameCount)*u_speed*0.01;float noiseValue=snoise(uv);float normalizedNoiseValue=(noiseValue+1.0)/2.0;float index=normalizedNoiseValue*(gradientTextureDimensions.x-1.0);float texelPosition=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}";
class lA {
  constructor() {
    r(this, "_gradientParams", {
      linear: { direction: 1, angle: 0, speed: 0.01 },
      zigzag: { direction: 1, angle: 0, speed: 0.01 },
      spiral: { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
      radial: { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
      conical: { centerX: 0.5, centerY: 0.5, speed: 0.01 },
      noise: { noiseScale: 0.1, speed: 0.01, direction: 1 }
    });
    r(this, "gradientShaders", {
      linear: sA,
      zigzag: oA,
      spiral: aA,
      radial: gA,
      conical: nA,
      noise: hA
    });
    r(this, "_gradientConstructors", {
      linear: (A, e, t, i, o) => new q(A, e, t, i, o),
      zigzag: (A, e, t, i, o) => new AA(A, e, t, i, o),
      spiral: (A, e, t, i, o) => new eA(A, e, t, i, o),
      radial: (A, e, t, i, o) => new tA(A, e, t, i, o),
      conical: (A, e, t, i, o) => new rA(A, e, t, i, o),
      noise: (A, e, t, i, o) => new iA(A, e, t, i, o)
    });
    r(this, "_setupQueue", []);
    r(this, "_gradients", []);
    r(this, "fontTextureAtlas");
    r(this, "p5Instance");
  }
  setup(A) {
    this.fontTextureAtlas = A, this.setupShaders(), this.setupGradientQueue();
  }
  addInstance(A) {
    this.p5Instance = A;
  }
  setupGradientQueue() {
    for (const { gradientInstance: A, type: e } of this._setupQueue)
      A.setup(
        this.p5Instance,
        this.gradientShaders[e],
        this.fontTextureAtlas.getCharsetColorArray(A.characters)
      );
    this._setupQueue = [];
  }
  getGradientParams(A, e) {
    return { ...this._gradientParams[A], ...e };
  }
  addGradient(A, e, t, i, o) {
    const a = this.getGradientParams(A, {
      brightnessStart: e,
      brightnessEnd: t,
      characters: i,
      ...o
    }), h = this._gradientConstructors[A](
      this.gradientShaders[A],
      e,
      t,
      i,
      a
    );
    return h.registerPaletteChangeCallback(this.handleGradientPaletteChange.bind(this)), this._gradients.push(h), this.p5Instance._setupDone ? h.setup(
      this.p5Instance,
      this.gradientShaders[A],
      this.fontTextureAtlas.getCharsetColorArray(i)
    ) : this._setupQueue.push({ gradientInstance: h, type: A }), h;
  }
  removeGradient(A) {
    const e = this._gradients.indexOf(A);
    e > -1 && this._gradients.splice(e, 1);
  }
  handleGradientPaletteChange(A, e) {
    this.p5Instance._setupDone ? A.palette.setColors(this.fontTextureAtlas.getCharsetColorArray(e)) : A.characters = e;
  }
  setupShaders() {
    for (const A in this.gradientShaders)
      this.gradientShaders[A] = this.p5Instance.createShader(
        n,
        this.gradientShaders[A]
      );
  }
  get gradientConstructors() {
    return this._gradientConstructors;
  }
  get gradientParams() {
    return this._gradientParams;
  }
  get gradients() {
    return this._gradients;
  }
}
class BA {
  constructor() {
    r(this, "p");
    r(this, "grid");
    r(this, "fontTextureAtlas");
    r(this, "currentCanvasDimensions");
    r(this, "gradientCharacterSet");
    r(this, "_renderers");
    r(this, "gradientManager");
    r(this, "lastRenderer");
    r(this, "fontBase64");
    r(this, "fontFileType");
    this.gradientManager = new lA();
  }
  /**
   * Sets up the renderer manager with the specified default options.
   * @param p5Instance The p5 instance
   * @param grid The grid instance
   * @param fontTextureAtlas The font texture atlas instance
   */
  setup(A, e, t) {
    this.p = A, this.grid = e, this.fontTextureAtlas = t, this.currentCanvasDimensions = {
      width: this.p.width,
      height: this.p.height
    }, this.gradientCharacterSet = new u(
      this.p,
      t,
      m.characters
    ), this.gradientManager.setup(this.fontTextureAtlas), this._renderers = [
      new R(this.p, this.grid, new u(this.p, t, m.characters), { ...m }),
      new N(this.p, this.grid, new u(this.p, t, x.characters), { ...x }),
      new Z(this.p, this.grid, this.gradientCharacterSet, this.gradientManager, { ...V }),
      new j(this.p, this.grid, new u(this.p, t, w.characters), { ...w }),
      new X(this.p, this.grid, new u(this.p, t, m.characters), { ...$ })
    ];
  }
  /**
   * Renders the ASCII output to the canvas.
   * @param inputFramebuffer The input framebuffer to transform into ASCII.
   * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
   */
  render(A, e) {
    let t = A, i = this._renderers[0], o = !0;
    for (const a of this._renderers)
      a.options.enabled && (a.render(A, i, o), t = a.outputFramebuffer, i = a, o = !1, this.lastRenderer = a);
    this.p.clear(), this.p.background(e), this.p.image(t, -this.p.width / 2, -this.p.height / 2), this.checkCanvasDimensions();
  }
  /**
   * Continuously checks if the canvas dimensions have changed.
   * If they have, the grid is reset and the renderers are resized.
   */
  checkCanvasDimensions() {
    (this.currentCanvasDimensions.width !== this.p.width || this.currentCanvasDimensions.height !== this.p.height) && (this.currentCanvasDimensions.width = this.p.width, this.currentCanvasDimensions.height = this.p.height, this.grid.reset(), this._renderers.forEach((A) => {
      A.resizeFramebuffers();
    }));
  }
  // Getters and setters
  get renderers() {
    return this._renderers;
  }
}
class EA {
  constructor() {
    r(this, "borderColor");
    r(this, "_fontSize");
    r(this, "rendererManager");
    r(this, "font");
    r(this, "postSetupFunction");
    r(this, "postDrawFunction");
    r(this, "p");
    r(this, "asciiFontTextureAtlas");
    r(this, "grid");
    r(this, "events");
    r(this, "sketchFramebuffer");
    this.borderColor = "#000000", this._fontSize = 16, this.rendererManager = new BA(), this.events = new G(), this.postSetupFunction = null, this.postDrawFunction = null;
  }
  /**
   * Initialize the p5 instance for the Asciifier
   * @param p The p5 instance
   */
  instance(A) {
    this.p = A, this.p.preload || (this.p.preload = () => {
    }), this.rendererManager.gradientManager.addInstance(this.p);
  }
  /**
   * Adds the p5 instance in p5.js global mode. Is called automatically on init by p5.js.
   * Currently a bit confusing with the `instance()` method above, which is relevant for instance mode,
   * where the user has to call it manually.
   * @param p The p5 instance
   */
  addP5Instance(A) {
    this.p || (this.p = A), this.rendererManager.gradientManager.addInstance(this.p);
  }
  /**
   * Sets up the P5Asciify library with the specified options
   */
  setup() {
    this.asciiFontTextureAtlas = new U(this.p, this.font, this._fontSize), this.grid = new M(
      this.p,
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ), this.rendererManager.setup(this.p, this.grid, this.asciiFontTextureAtlas), this.sketchFramebuffer = this.p.createFramebuffer({
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.postSetupFunction && this.postSetupFunction();
  }
  /**
   * Emit an event with data
   * @param eventName - Name of the event to emit
   * @param data - Data to pass with the event
   */
  emit(A, e) {
    this.events.emit(A, e);
  }
  /**
   * Register an event listener
   * @param eventName - Name of the event to listen for
   * @param callback - Callback function to execute
   */
  on(A, e) {
    this.events.on(A, e);
  }
  /**
   * Remove an event listener
   * @param eventName - Name of the event to remove
   * @param callback - Callback function to remove
   */
  off(A, e) {
    this.events.off(A, e);
  }
  /**
   * Runs the rendering pipeline for the P5Asciify library
   */
  asciify() {
    this.rendererManager.render(this.sketchFramebuffer, this.borderColor), this.postDrawFunction && this.postDrawFunction();
  }
  // Getters and setters
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(A) {
    this._fontSize = A, this.p._setupDone && (this.asciiFontTextureAtlas.setFontSize(A), this.grid.resizeCellPixelDimensions(
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ), this.rendererManager.renderers.forEach((e) => e.resizeFramebuffers()), this.rendererManager.renderers.forEach((e) => e.resetShaders()));
  }
}
function QA(s) {
  if (s._renderer.drawingContext instanceof CanvasRenderingContext2D)
    throw new l("WebGL renderer is required for p5.asciify to work.");
  function A(e, t) {
    const [i, o] = [e, t].map((a) => a.split(".").map(Number));
    for (let a = 0; a < Math.max(i.length, o.length); a++) {
      const h = i[a] ?? 0, E = o[a] ?? 0;
      if (h !== E) return h > E ? 1 : -1;
    }
    return 0;
  }
  if (A(s.VERSION, "1.8.0") < 0)
    throw new l("p5.asciify requires p5.js v1.8.0 or higher to work.");
}
function cA(s) {
  g.prototype.setupP5Instance = function() {
    s.addP5Instance(this);
  }, g.prototype.setupAsciifier = function() {
    QA(this), s.setup();
  }, g.prototype.registerMethod("init", g.prototype.setupP5Instance), g.prototype.registerMethod("afterSetup", g.prototype.setupAsciifier);
}
const D = `data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
`;
function dA(s) {
  g.prototype.preloadAsciiFont = function() {
    this._incrementPreload(), s.font = this.loadFont(
      D,
      (A) => {
        s.font = A, s.rendererManager.fontBase64 = `${D}`, s.rendererManager.fontFileType = "truetype";
      },
      () => {
        throw new l(`loadAsciiFont() | Failed to load font from path: '${D}'`);
      }
    );
  }, g.prototype.loadAsciiFont = function(A) {
    return new Promise((e, t) => {
      const i = async (o, a) => {
        s.font = o;
        try {
          const E = await (await fetch(a)).arrayBuffer(), b = btoa(
            new Uint8Array(E).reduce((v, F) => v + String.fromCharCode(F), "")
          );
          let d = "";
          a.toLowerCase().endsWith(".ttf") ? d = "truetype" : a.toLowerCase().endsWith(".otf") ? d = "opentype" : d = "truetype", s.rendererManager.fontBase64 = `data:font/${d};charset=utf-8;base64,${b}`, s.rendererManager.fontFileType = d;
        } catch (h) {
          console.error("Error converting font to Base64:", h);
        }
        if (this._setupDone)
          try {
            s.asciiFontTextureAtlas.setFontObject(o), s.rendererManager.renderers.forEach((h) => {
              h.characterSet.setCharacterSet(h.characterSet.characters);
            }), s.grid.resizeCellPixelDimensions(
              s.asciiFontTextureAtlas.maxGlyphDimensions.width,
              s.asciiFontTextureAtlas.maxGlyphDimensions.height
            );
          } catch (h) {
            return t(h);
          }
        this._decrementPreload(), s.emit("fontUpdated", {
          base64: s.rendererManager.fontBase64,
          fileType: s.rendererManager.fontFileType
        }), e();
      };
      typeof A == "string" ? this.loadFont(
        A,
        (o) => {
          i(o, A);
        },
        () => {
          t(new l(`loadAsciiFont() | Failed to load font from path: '${A}'`));
        }
      ) : t(new l("loadAsciiFont() | Invalid font parameter. Expected a string/path."));
    });
  }, g.prototype.registerMethod("beforePreload", g.prototype.preloadAsciiFont), g.prototype.registerPreloadMethod("loadAsciiFont", g.prototype);
}
function uA(s) {
  g.prototype.setAsciifyBorderColor = function(A) {
    s.borderColor = this.color(A);
  }, g.prototype.setAsciifyFontSize = function(A) {
    s.fontSize = A;
  }, g.prototype.setAsciifyPostSetupFunction = function(A) {
    s.postSetupFunction = A;
  }, g.prototype.setAsciifyPostDrawFunction = function(A) {
    s.postDrawFunction = A;
  };
}
function CA(s, A, e, t, i, o) {
  if (!s.gradientConstructors[A])
    throw new l(
      `Gradient '${A}' does not exist! Available gradients: ${Object.keys(s.gradientConstructors).join(", ")}`
    );
  if (typeof e != "number" || e < 0 || e > 255)
    throw new l(
      `Invalid brightness start value '${e}'. Expected a number between 0 and 255.`
    );
  if (typeof t != "number" || t < 0 || t > 255)
    throw new l(
      `Invalid brightness end value '${t}'. Expected a number between 0 and 255.`
    );
  if (typeof i != "string")
    throw new l(
      `Invalid characters value '${i}'. Expected a string.`
    );
  const a = Object.keys(s.gradientParams[A]), h = Object.keys(o).filter((E) => !a.includes(E));
  if (h.length > 0)
    throw new l(
      `Invalid parameter(s) for gradient '${A}': ${h.join(", ")}
Valid parameters are: ${a.join(", ")}`
    );
}
function fA(s) {
  g.prototype.addAsciiGradient = function(A, e, t, i, o = {}) {
    return CA(
      s.rendererManager.gradientManager,
      A,
      e,
      t,
      i,
      o
    ), s.rendererManager.gradientManager.addGradient(
      A,
      e,
      t,
      i,
      o
    );
  }, g.prototype.removeAsciiGradient = function(A) {
    s.rendererManager.gradientManager.removeGradient(A);
  };
}
function mA(s) {
  g.prototype.preDrawAddPush = function() {
    s.sketchFramebuffer.begin(), this.clear(), this.push();
  }, g.prototype.registerMethod("pre", g.prototype.preDrawAddPush), g.prototype.postDrawAddPop = function() {
    this.pop(), s.sketchFramebuffer.end();
  }, g.prototype.registerMethod("post", g.prototype.postDrawAddPop), g.prototype.asciify = function() {
    s.asciify();
  }, g.prototype.registerMethod("post", g.prototype.asciify);
}
const c = new EA();
typeof window < "u" && (window.p5asciify = c, window.preload = function() {
});
cA(c);
dA(c);
uA(c);
fA(c);
mA(c);
export {
  c as default
};
