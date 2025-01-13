var F = Object.defineProperty;
var y = (s, A, e) => A in s ? F(s, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[A] = e;
var r = (s, A, e) => y(s, typeof A != "symbol" ? A + "" : A, e);
import g from "p5";
class n extends Error {
  constructor(A) {
    super(A), this.name = "P5AsciifyError";
  }
}
class T {
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
        throw new n(`Could not find character in character set: ${t}`);
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
class U {
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
const D = {
  MIN: 1,
  MAX: 128
};
function M(s, A) {
  if (A != null && A.characterColor && (A.characterColor = s.color(A.characterColor)), A != null && A.backgroundColor && (A.backgroundColor = s.color(A.backgroundColor)), A != null && A.fontSize && (A.fontSize < D.MIN || A.fontSize > D.MAX))
    throw new n(`Font size ${A.fontSize} is out of bounds. It should be between ${D.MIN} and ${D.MAX}.`);
}
class Q {
  constructor(A, e, t, i) {
    r(this, "_primaryColorSampleFramebuffer");
    r(this, "_secondaryColorSampleFramebuffer");
    r(this, "_asciiCharacterFramebuffer");
    r(this, "_outputFramebuffer");
    if (this.p = A, this.grid = e, this.characterSet = t, this._options = i, new.target === Q)
      throw new TypeError("Cannot construct AsciiRenderer instances directly");
    this._primaryColorSampleFramebuffer = this.p.createFramebuffer({
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
   * Resets the shaders for the renderer.
   */
  resetShaders() {
  }
  /**
   * Updates renderer options.
   * @param newOptions - The new options to update.
   */
  updateOptions(A) {
    M(this.p, A), this._options = {
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
var B = "precision mediump float;attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}", C = "precision mediump float;uniform sampler2D u_characterTexture;uniform vec2 u_charsetDimensions;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_asciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform float u_rotationAngle;uniform int u_invertMode;uniform vec2 u_resolution;uniform float u_pixelRatio;uniform sampler2D u_prevAsciiTexture;uniform sampler2D u_gradientReferenceTexture;uniform sampler2D u_edgesTexture;uniform int u_layer;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 logicalFragCoord=gl_FragCoord.xy/u_pixelRatio;vec2 adjustedCoord=(logicalFragCoord-u_gridOffsetDimensions)/u_gridPixelDimensions;vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 secondaryColor=texture2D(u_secondaryColorTexture,charIndexTexCoord);if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(0);return;}vec4 primaryColor=texture2D(u_primaryColorTexture,charIndexTexCoord);if(u_layer==2){vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);vec4 gradientReferenceColor=texture2D(u_gradientReferenceTexture,charIndexTexCoord);if(encodedIndexVec.rgb==gradientReferenceColor.rgb){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}}else if(u_layer==3){vec4 edgeColor=texture2D(u_edgesTexture,charIndexTexCoord);if(edgeColor.rgb==vec3(0.0)){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}}else if(u_layer==4){vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);if(encodedIndexVec.rgba==vec4(0.0)){gl_FragColor=texture2D(u_prevAsciiTexture,logicalFragCoord/u_resolution);return;}}vec4 encodedIndexVec=texture2D(u_asciiCharacterTexture,charIndexTexCoord);int charIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int charCol=charIndex-(charIndex/int(u_charsetDimensions.x))*int(u_charsetDimensions.x);int charRow=charIndex/int(u_charsetDimensions.x);vec2 charCoord=vec2(float(charCol)/u_charsetDimensions.x,float(charRow)/u_charsetDimensions.y);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetDimensions.x,1.0/u_charsetDimensions.y);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? secondaryColor : texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=vec4(primaryColor.rgb*charColor.rgb,charColor.a);gl_FragColor=mix(secondaryColor,finalColor,charColor.a);if(outsideBounds){gl_FragColor=u_invertMode==1 ? primaryColor : secondaryColor;}}", Y = "precision mediump float;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;void main(){vec2 logicalFragCoord=gl_FragCoord.xy;vec2 cellCoord=floor(logicalFragCoord);vec2 cellSizeInTexCoords=1.0/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;vec4 sampledColor=texture2D(u_sketchTexture,cellCenterTexCoord);gl_FragColor=sampledColor;}", z = "precision mediump float;uniform sampler2D u_colorSampleFramebuffer;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;uniform vec2 u_textureSize;void main(){vec2 pos=(floor(gl_FragCoord.xy)+0.5)/u_textureSize;float brightness=dot(texture2D(u_colorSampleFramebuffer,pos).rgb,vec3(0.299,0.587,0.114));float index=clamp(floor(brightness*u_charPaletteSize.x),0.0,u_charPaletteSize.x-1.0);gl_FragColor=vec4(texture2D(u_charPaletteTexture,vec2((index+0.5)/u_charPaletteSize.x,0.0)).rgb,1.0);}";
class k extends Q {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "colorSampleShader");
    r(this, "asciiCharacterShader");
    r(this, "shader");
    r(this, "colorSampleFramebuffer");
    this.colorSampleShader = this.p.createShader(B, Y), this.asciiCharacterShader = this.p.createShader(B, z), this.shader = this.p.createShader(B, C), this.colorSampleFramebuffer = this.p.createFramebuffer({
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
  render(e, t) {
    this.colorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.p.rect(0, 0, this.p.width, this.p.height), this.colorSampleFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this._options.characterColorMode === 1 ? this.p.background(this._options.characterColor) : (this.p.clear(), this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows)), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this.p.background(this._options.backgroundColor) : (this.p.clear(), this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows)), this._secondaryColorSampleFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_textureSize", [this.grid.cols, this.grid.rows]), this.asciiCharacterShader.setUniform("u_colorSampleFramebuffer", this.colorSampleFramebuffer), this.asciiCharacterShader.setUniform("u_charPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_charPaletteSize", [this.characterSet.characterColorPalette.colors.length, 1]), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 1), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), t !== this && this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", this._options.invertMode), this.shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
const _ = (s) => `
precision mediump float;uniform sampler2D u_characterTexture;uniform float u_charsetCols,u_charsetRows;uniform sampler2D u_sketchTexture;uniform vec2 u_gridPixelDimensions,u_gridCellDimensions;uniform sampler2D u_charPaletteTexture;uniform vec2 u_charPaletteSize;const float u=float(${s}),f=u*u;void main(){vec2 v=floor(floor(gl_FragCoord.xy).xy),t=u_gridPixelDimensions/u_gridCellDimensions,e=v*t/u_gridPixelDimensions;t=(v+vec2(1))*t/u_gridPixelDimensions;v=t-e;float s=1e20,i=0.,r=1./u,y=u_charPaletteSize.x;for(int t=0;t<1024;t++){if(float(t)>=y)break;vec2 m=vec2((float(t)+.5)/y,.5/u_charPaletteSize.y);vec4 d=texture2D(u_charPaletteTexture,m);float g=d.x*255.,x=d.y*255.,c=d.z*255.;c=g+x*256.+c*65536.;x=floor(c/u_charsetCols);g=c-u_charsetCols*x;m=vec2(g/u_charsetCols,x/u_charsetRows);vec2 k=vec2(1./u_charsetCols,1./u_charsetRows);g=0.;for(int f=0;f<int(u);f++)for(int s=0;s<int(u);s++){vec2 t=vec2(float(s)+.5,float(f)+.5)*r,i=e+t*v;float x=texture2D(u_sketchTexture,i).x;t=m+t*k;float c=texture2D(u_characterTexture,t).x;x-=c;g+=x*x;}g/=f;if(g<s)s=g,i=c;}s=mod(i,256.);i=floor(i/256.);s/=255.;i/=255.;gl_FragColor=vec4(s,i,0,1);}
`, P = (s, A) => `
precision mediump float;uniform sampler2D u_inputImage;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows;const int u=${s},f=${A};void main(){vec2 v=floor(gl_FragCoord.xy),e=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));v*=e;float i=0.,t=float(u*f);for(int s=0;s<u;s++)for(int g=0;g<f;g++){vec2 m=clamp((v+(vec2(float(s),float(g))+.5)*(e/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 d=texture2D(u_inputImage,m);float t=.299*d.x+.587*d.y+.114*d.z;i+=t;}i/=t;gl_FragColor=vec4(vec3(i),1);}
`, I = (s, A, e) => `
precision mediump float;uniform sampler2D u_inputImage,u_inputImageBW;uniform vec2 u_inputImageSize;uniform int u_gridCols,u_gridRows,u_colorRank;const int e=${s},u=${A},f=${e};void main(){vec2 i=floor(gl_FragCoord.xy),t=u_inputImageSize/vec2(float(u_gridCols),float(u_gridRows));i*=t;vec2 k=(i+t*.5)/u_inputImageSize;vec4 v=texture2D(u_inputImage,k),c[e];float b[e];for(int i=0;i<e;i++)c[i]=vec4(0),b[i]=0.;for(int v=0;v<u;v++)for(int k=0;k<f;k++){vec2 s=clamp((i+(vec2(float(v),float(k))+.5)*(t/vec2(float(u),float(f))))/u_inputImageSize,0.,1.);vec4 m=texture2D(u_inputImage,s),d=texture2D(u_inputImageBW,s);float r=step(.5,d.x);bool z=false;if(u_colorRank==1&&r>.5)z=true;else if(u_colorRank==2&&r<=.5)z=true;if(!z)continue;z=false;for(int i=0;i<e;i++)if(m.xyz==c[i].xyz){b[i]+=1.;z=true;break;}if(!z)for(int i=0;i<e;i++)if(b[i]==0.){c[i]=m;b[i]=1.;break;}}float z=0.;vec4 m=vec4(0);for(int i=0;i<e;i++){float u=b[i];vec4 k=c[i];if(u>z)z=u,m=k;}if(u_colorRank==2&&z==0.)m=v;gl_FragColor=vec4(m.xyz,1);}
`;
var R = "precision mediump float;uniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;uniform float u_pixelRatio;const float EPSILON=0.01;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy/u_pixelRatio);float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);float gridX=floor(logicalFragCoord.x/cellWidth);float gridY=floor(logicalFragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;vec2 imageTexCoord=logicalFragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue;if(brightnessDifference<-EPSILON){finalColorValue=0.0;}else{finalColorValue=1.0;}gl_FragColor=vec4(vec3(finalColorValue),1.0);}";
class O extends Q {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "characterSelectionShader");
    r(this, "brightnessSampleShader");
    r(this, "colorSampleShader");
    r(this, "brightnessSplitShader");
    r(this, "shader");
    r(this, "brightnessSampleFramebuffer");
    r(this, "brightnessSplitFramebuffer");
    this.characterSelectionShader = this.p.createShader(B, _(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length)), this.brightnessSampleShader = this.p.createShader(B, P(this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(B, I(16, this.grid.cellHeight, this.grid.cellWidth)), this.brightnessSplitShader = this.p.createShader(B, R), this.shader = this.p.createShader(B, C), this.brightnessSampleFramebuffer = this.p.createFramebuffer({
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
    this.characterSelectionShader = this.p.createShader(B, _(this.characterSet.asciiFontTextureAtlas.fontSize)), this.brightnessSampleShader = this.p.createShader(B, P(this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(B, I(16, this.grid.cellHeight, this.grid.cellWidth));
  }
  render(e, t) {
    this.brightnessSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.brightnessSampleShader), this.brightnessSampleShader.setUniform("u_inputImage", e), this.brightnessSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.brightnessSampleShader.setUniform("u_gridCols", this.grid.cols), this.brightnessSampleShader.setUniform("u_gridRows", this.grid.rows), this.p.rect(0, 0, this.p.width, this.p.height), this.brightnessSampleFramebuffer.end(), this.brightnessSplitFramebuffer.begin(), this.p.clear(), this.p.shader(this.brightnessSplitShader), this.brightnessSplitShader.setUniform("u_inputImage", e), this.brightnessSplitShader.setUniform("u_brightnessTexture", this.brightnessSampleFramebuffer), this.brightnessSplitShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.brightnessSplitShader.setUniform("u_gridCols", this.grid.cols), this.brightnessSplitShader.setUniform("u_gridRows", this.grid.rows), this.brightnessSplitShader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.p.rect(0, 0, this.p.width, this.p.height), this.brightnessSplitFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this._options.characterColorMode === 1 ? this.p.background(this._options.characterColor) : (this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_inputImage", e), this.colorSampleShader.setUniform("u_inputImageBW", this.brightnessSplitFramebuffer), this.colorSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.colorSampleShader.setUniform("u_gridCols", this.grid.cols), this.colorSampleShader.setUniform("u_gridRows", this.grid.rows), this.colorSampleShader.setUniform("u_colorRank", 1), this.p.rect(0, 0, this.p.width, this.p.height)), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this.p.background(this._options.backgroundColor) : (this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_inputImage", e), this.colorSampleShader.setUniform("u_inputImageBW", this.brightnessSplitFramebuffer), this.colorSampleShader.setUniform("u_inputImageSize", [this.p.width, this.p.height]), this.colorSampleShader.setUniform("u_gridCols", this.grid.cols), this.colorSampleShader.setUniform("u_gridRows", this.grid.rows), this.colorSampleShader.setUniform("u_colorRank", 2), this.p.rect(0, 0, this.p.width, this.p.height)), this._secondaryColorSampleFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.characterSelectionShader), this.characterSelectionShader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.characterSelectionShader.setUniform("u_charsetCols", this.characterSet.asciiFontTextureAtlas.charsetCols), this.characterSelectionShader.setUniform("u_charsetRows", this.characterSet.asciiFontTextureAtlas.charsetRows), this.characterSelectionShader.setUniform("u_charPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.characterSelectionShader.setUniform("u_charPaletteSize", [this.characterSet.characterColorPalette.colors.length, 1]), this.characterSelectionShader.setUniform("u_sketchTexture", this.brightnessSplitFramebuffer), this.characterSelectionShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.characterSelectionShader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 1), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), t !== this && this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", this._options.invertMode), this.shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
class X extends Q {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "shader");
    this.shader = this.p.createShader(B, C);
  }
  render(e, t) {
    this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 4), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), t !== this && this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", 0), this.shader.setUniform("u_rotationAngle", 0), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
var N = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isBlackSample=texture2D(u_sampleTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0);if(isBlackSample){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}", H = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_colorPaletteTexture;uniform sampler2D u_previousAsciiCharacterTexture;uniform vec2 u_gridCellDimensions;uniform int u_totalChars;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;if(texture2D(u_sketchTexture,cellCenterTexCoord)==vec4(vec3(0.0),1.0)){gl_FragColor=texture2D(u_previousAsciiCharacterTexture,cellCenterTexCoord);return;}vec4 sketchColor=texture2D(u_sketchTexture,cellCenterTexCoord);float brightness=dot(sketchColor.rgb,vec3(0.299,0.587,0.114));int charIndex=int(brightness*float(u_totalChars));if(charIndex>u_totalChars-1){charIndex=u_totalChars-1;}float paletteCoord=(float(charIndex)+0.5)/float(u_totalChars);gl_FragColor=texture2D(u_colorPaletteTexture,vec2(paletteCoord,0.5));}", J = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);float angleDeg=degrees(atan(sobelY.r,sobelX.r));vec3 edgeColor=vec3(0.0);if(intensity>u_threshold){if(angleDeg>=-22.5&&angleDeg<22.5){edgeColor=vec3(0.1);}else if(angleDeg>=22.5&&angleDeg<67.5){edgeColor=vec3(0.2);}else if(angleDeg>=67.5&&angleDeg<112.5){edgeColor=vec3(0.3);}else if(angleDeg>=112.5&&angleDeg<157.5){edgeColor=vec3(0.4);}else if(angleDeg>=157.5||angleDeg<-157.5){edgeColor=vec3(0.6);}else if(angleDeg>=-157.5&&angleDeg<-112.5){edgeColor=vec3(0.7);}else if(angleDeg>=-112.5&&angleDeg<-67.5){edgeColor=vec3(0.8);}else if(angleDeg>=-67.5&&angleDeg<-22.5){edgeColor=vec3(0.9);}}gl_FragColor=vec4(edgeColor,1.0);}";
const x = (s, A, e) => `
precision mediump float;uniform sampler2D u_image;uniform vec2 u_imageSize,u_gridCellDimensions;uniform int u_threshold;const vec3 i=vec3(0);const int e=${s},k=${A},s=${e};vec3 f[e];int u[e];float r(float i){return floor(i+.5);}void main(){vec2 v=floor(gl_FragCoord.xy);ivec2 b=ivec2(v);int y=b.x,c=b.y;v=u_imageSize/u_gridCellDimensions;b=ivec2(r(float(y)*v.x),r(float(c)*v.y));y=0;for(int v=0;v<e;v++)f[v]=i,u[v]=0;for(int v=0;v<s;v++)for(int c=0;c<k;c++){ivec2 r=b+ivec2(c,v);if(r.x<0||r.y<0||r.x>=int(u_imageSize.x)||r.y>=int(u_imageSize.y))continue;vec2 s=(vec2(r)+.5)/u_imageSize;vec3 t=texture2D(u_image,s).xyz;if(length(t-i)<.001)continue;y++;bool m=false;for(int v=0;v<e;v++)if(length(t-f[v])<.001){u[v]++;m=true;break;}if(!m)for(int v=0;v<e;v++)if(u[v]==0){f[v]=t;u[v]=1;break;}}vec3 m=i;c=0;for(int v=0;v<e;v++)if(u[v]>c)m=f[v],c=u[v];gl_FragColor=y<u_threshold?vec4(i,1):vec4(m,1);}
`;
class K extends Q {
  constructor(e, t, i, o) {
    super(e, t, i, o);
    r(this, "sobelShader");
    r(this, "sampleShader");
    r(this, "colorSampleShader");
    r(this, "asciiCharacterShader");
    r(this, "shader");
    r(this, "sobelFramebuffer");
    r(this, "sampleFramebuffer");
    this._options.characterColor = this.p.color(this._options.characterColor), this._options.backgroundColor = this.p.color(this._options.backgroundColor), this.sobelShader = this.p.createShader(B, J), this.sampleShader = this.p.createShader(B, x(16, this.grid.cellHeight, this.grid.cellWidth)), this.colorSampleShader = this.p.createShader(B, N), this.asciiCharacterShader = this.p.createShader(B, H), this.shader = this.p.createShader(B, C), this.sobelFramebuffer = this.p.createFramebuffer({
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
    this.sampleShader = this.p.createShader(B, x(16, this.grid.cellHeight, this.grid.cellWidth));
  }
  render(e, t) {
    this.sobelFramebuffer.begin(), this.p.clear(), this.p.shader(this.sobelShader), this.sobelShader.setUniform("u_texture", e), this.sobelShader.setUniform("u_textureSize", [this.p.width, this.p.height]), this.sobelShader.setUniform("u_threshold", this.options.sobelThreshold), this.p.rect(0, 0, this.p.width, this.p.height), this.sobelFramebuffer.end(), this.sampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.sampleShader), this.sampleShader.setUniform("u_imageSize", [this.p.width, this.p.height]), this.sampleShader.setUniform("u_image", this.sobelFramebuffer), this.sampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.sampleShader.setUniform("u_threshold", this.options.sampleThreshold), this.p.rect(0, 0, this.p.width, this.p.height), this.sampleFramebuffer.end(), this._primaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousColorTexture", t.primaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousColorTexture", t.secondaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._secondaryColorSampleFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_sketchTexture", this.sampleFramebuffer), this.asciiCharacterShader.setUniform("u_colorPaletteTexture", this.characterSet.characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_previousAsciiCharacterTexture", t.asciiCharacterFramebuffer), this.asciiCharacterShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.asciiCharacterShader.setUniform("u_totalChars", this.characterSet.characters.length), this.p.rect(0, 0, this.p.width, this.p.height), this._asciiCharacterFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.shader), this.shader.setUniform("u_layer", 3), this.shader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.shader.setUniform("u_resolution", [this.p.width, this.p.height]), this.shader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.shader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), t !== this && this.shader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.shader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.shader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.shader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), this.shader.setUniform("u_edgesTexture", this.sampleFramebuffer), this.shader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.shader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.shader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.shader.setUniform("u_invertMode", this._options.invertMode), this.shader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
var j = "precision mediump float;uniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);float luminance=0.299*color.r+0.587*color.g+0.114*color.b;color.rgb=vec3(luminance);gl_FragColor=color;}", L = "precision mediump float;uniform sampler2D u_sketchTexture;uniform sampler2D u_previousColorTexture;uniform sampler2D u_sampleTexture;uniform sampler2D u_sampleReferenceTexture;uniform vec2 u_gridCellDimensions;uniform int u_sampleMode;uniform vec4 u_staticColor;void main(){vec2 cellCoord=floor(gl_FragCoord.xy);vec2 cellSizeInTexCoords=vec2(1.0)/u_gridCellDimensions;vec2 cellCenterTexCoord=(cellCoord+vec2(0.5))*cellSizeInTexCoords;bool isMatchingSample=texture2D(u_sampleTexture,cellCenterTexCoord)==texture2D(u_sampleReferenceTexture,cellCenterTexCoord);if(isMatchingSample){gl_FragColor=texture2D(u_previousColorTexture,cellCenterTexCoord);return;}else if(u_sampleMode==0){gl_FragColor=texture2D(u_sketchTexture,cellCenterTexCoord);}else{gl_FragColor=u_staticColor;}}";
class V extends Q {
  constructor(e, t, i, o, a) {
    super(e, t, i, a);
    r(this, "grayscaleShader");
    r(this, "colorSampleShader");
    r(this, "asciiShader");
    r(this, "grayscaleFramebuffer");
    r(this, "prevAsciiCharacterFramebuffer");
    r(this, "gradientManager");
    this._options.characterColor = this.p.color(this._options.characterColor), this._options.backgroundColor = this.p.color(this._options.backgroundColor), this.gradientManager = o, this.grayscaleShader = this.p.createShader(B, j), this.colorSampleShader = this.p.createShader(B, L), this.asciiShader = this.p.createShader(B, C), this.grayscaleFramebuffer = this.p.createFramebuffer({
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
  render(e, t) {
    this.grayscaleFramebuffer.begin(), this.p.clear(), this.p.shader(this.grayscaleShader), this.grayscaleShader.setUniform("u_image", e), this.p.rect(0, 0, this.p.width, this.p.height), this.grayscaleFramebuffer.end(), this.prevAsciiCharacterFramebuffer.begin(), this.p.clear(), this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2), this.prevAsciiCharacterFramebuffer.end(), this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2), this._asciiCharacterFramebuffer.end();
    for (const i of this.gradientManager.gradients)
      i.enabled && ([this.prevAsciiCharacterFramebuffer, this._asciiCharacterFramebuffer] = [this._asciiCharacterFramebuffer, this.prevAsciiCharacterFramebuffer], this._asciiCharacterFramebuffer.begin(), this.p.clear(), this.p.shader(i.shader), i.setUniforms(this.p, this.prevAsciiCharacterFramebuffer, this.grayscaleFramebuffer), this.p.rect(0, 0, this.grid.cols, this.grid.rows), this._asciiCharacterFramebuffer.end());
    this._primaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousColorTexture", t.primaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this._asciiCharacterFramebuffer), this.colorSampleShader.setUniform("u_sampleReferenceTexture", this.grayscaleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._primaryColorSampleFramebuffer.end(), this._secondaryColorSampleFramebuffer.begin(), this.p.clear(), this.p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", e), this.colorSampleShader.setUniform("u_previousColorTexture", t.secondaryColorSampleFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this._asciiCharacterFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this.p.rect(0, 0, this.p.width, this.p.height), this._secondaryColorSampleFramebuffer.end(), this._outputFramebuffer.begin(), this.p.clear(), this.p.shader(this.asciiShader), this.asciiShader.setUniform("u_layer", 2), this.asciiShader.setUniform("u_pixelRatio", this.p.pixelDensity()), this.asciiShader.setUniform("u_resolution", [this.p.width, this.p.height]), this.asciiShader.setUniform("u_characterTexture", this.characterSet.asciiFontTextureAtlas.texture), this.asciiShader.setUniform("u_charsetDimensions", [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]), this.asciiShader.setUniform("u_gradientReferenceTexture", this.grayscaleFramebuffer), this.asciiShader.setUniform("u_primaryColorTexture", this._primaryColorSampleFramebuffer), this.asciiShader.setUniform("u_secondaryColorTexture", this._secondaryColorSampleFramebuffer), this.asciiShader.setUniform("u_asciiCharacterTexture", this._asciiCharacterFramebuffer), t !== this && this.asciiShader.setUniform("u_prevAsciiTexture", t.outputFramebuffer), this.asciiShader.setUniform("u_gridPixelDimensions", [this.grid.width, this.grid.height]), this.asciiShader.setUniform("u_gridOffsetDimensions", [this.grid.offsetX, this.grid.offsetY]), this.asciiShader.setUniform("u_gridCellDimensions", [this.grid.cols, this.grid.rows]), this.asciiShader.setUniform("u_invertMode", this._options.invertMode), this.asciiShader.setUniform("u_rotationAngle", this.p.radians(this._options.rotationAngle)), this.p.rect(0, 0, this.p.width, this.p.height), this._outputFramebuffer.end();
  }
}
const f = {
  enabled: !0,
  characters: "0123456789",
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  rotationAngle: 0
}, w = {
  enabled: !1,
  characters: "0123456789",
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  rotationAngle: 0
}, W = {
  enabled: !1,
  characterColor: "#FFFFFF",
  characterColorMode: 0,
  backgroundColor: "#000000",
  backgroundColorMode: 1,
  invertMode: !1,
  rotationAngle: 0
}, S = {
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
}, Z = {
  enabled: !1
};
class v {
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
    this.p = A, this.asciiFontTextureAtlas = e, this._characters = this.validateCharacters(t), this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters), this.characterColorPalette = new v(this.characterColors), this.characterColorPalette.setup(this.p);
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
      throw new n(`The following characters are not supported by the current font: [${e.join(", ")}].`);
    return Array.from(A);
  }
  /**
   * Sets the characters to be used in the character set and updates the texture.
   * @param characters The string of characters to use.
   */
  setCharacterSet(A) {
    this._characters = this.validateCharacters(A), this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters), this.characterColorPalette.setColors(this.characterColors);
  }
  /**
   * Resets the character set colors. Gets called when the font atlas is updated.
   */
  reset() {
    this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters), this.characterColorPalette.setColors(this.characterColors);
  }
  // Getters
  get characters() {
    return this._characters;
  }
}
class l {
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
    this._shader = e, this._palette = new v(t), this._palette.setup(A);
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
class $ extends l {
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
class q extends l {
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
class AA extends l {
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
class eA extends l {
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
class tA extends l {
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
class rA extends l {
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
var iA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 logicalFragCoord=floor(gl_FragCoord.xy);vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange.x&&texColor.r<=u_brightnessRange.y&&texColor==originalTexColor){float position=logicalFragCoord.x*cos(u_angle)+logicalFragCoord.y*sin(u_angle);float index=mod(position+float(frameCount)*u_gradientDirection*u_speed,gradientTextureDimensions.x);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0.0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", sA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 logicalFragCoord=gl_FragCoord.xy;float positionX=logicalFragCoord.x*cos(u_angle)-logicalFragCoord.y*sin(u_angle);float positionY=logicalFragCoord.x*sin(u_angle)+logicalFragCoord.y*cos(u_angle);float rowIndex=floor(positionY);float direction=mod(rowIndex,2.0)==0.0 ? 1.0 :-1.0;float rowPosition=positionX;float index=mod(rowPosition+float(frameCount)*u_speed*direction*u_gradientDirection,gradientTextureDimensions.x);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", oA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float u_gradientDirection;uniform float u_centerX;uniform float u_centerY;uniform float u_speed;uniform float u_density;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_gradientDirection*u_speed;float index=mod((distance+adjustedAngle*u_density)*gradientTextureDimensions.x,gradientTextureDimensions.x);float normalizedIndex=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", aA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float u_radius;uniform int frameCount;uniform int u_gradientDirection;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float normalizedDistance=clamp(distance/u_radius,0.0,1.0);float index=normalizedDistance*(gradientTextureDimensions.x-1.0);float animatedIndex=mod(index+float(frameCount)*0.1*float(-u_gradientDirection),gradientTextureDimensions.x);float normalizedIndex=(floor(animatedIndex)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", gA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform int frameCount;uniform float u_speed;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 flippedTexCoord=vec2(v_texCoord.x,v_texCoord.y);vec4 texColor=texture2D(textureID,flippedTexCoord);vec4 originalTexColor=texture2D(originalTextureID,flippedTexCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=flippedTexCoord-vec2(u_centerX,u_centerY);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_speed;float normalizedAngle=mod(adjustedAngle+3.14159265,2.0*3.14159265)/(2.0*3.14159265);float index=normalizedAngle*gradientTextureDimensions.x;float normalizedIndex=mod(floor(index)+0.5,gradientTextureDimensions.x)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}", BA = "precision mediump float;varying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float noiseScale;uniform float u_speed;uniform float direction;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 directionVec=vec2(cos(radians(direction)),sin(radians(direction)));vec2 uv=v_texCoord*noiseScale+directionVec*float(frameCount)*u_speed*0.01;float noiseValue=snoise(uv);float normalizedNoiseValue=(noiseValue+1.0)/2.0;float index=normalizedNoiseValue*(gradientTextureDimensions.x-1.0);float texelPosition=(floor(index)+0.5)/gradientTextureDimensions.x;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,0));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}";
class hA {
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
      linear: iA,
      zigzag: sA,
      spiral: oA,
      radial: aA,
      conical: gA,
      noise: BA
    });
    r(this, "_gradientConstructors", {
      linear: (A, e, t, i, o) => new $(A, e, t, i, o),
      zigzag: (A, e, t, i, o) => new q(A, e, t, i, o),
      spiral: (A, e, t, i, o) => new AA(A, e, t, i, o),
      radial: (A, e, t, i, o) => new eA(A, e, t, i, o),
      conical: (A, e, t, i, o) => new tA(A, e, t, i, o),
      noise: (A, e, t, i, o) => new rA(A, e, t, i, o)
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
        B,
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
class nA {
  constructor() {
    r(this, "p");
    r(this, "grid");
    r(this, "fontTextureAtlas");
    r(this, "currentCanvasDimensions");
    r(this, "gradientCharacterSet");
    r(this, "_renderers");
    r(this, "gradientManager");
    r(this, "lastRenderer");
    this.gradientManager = new hA();
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
      f.characters
    ), this.gradientManager.setup(this.fontTextureAtlas), this._renderers = [
      new k(this.p, this.grid, new u(this.p, t, f.characters), { ...f }),
      new O(this.p, this.grid, new u(this.p, t, w.characters), { ...w }),
      new V(this.p, this.grid, this.gradientCharacterSet, this.gradientManager, { ...W }),
      new K(this.p, this.grid, new u(this.p, t, S.characters), { ...S }),
      new X(this.p, this.grid, new u(this.p, t, f.characters), { ...Z })
    ];
  }
  /**
   * Renders the ASCII output to the canvas.
   * @param inputFramebuffer The input framebuffer to transform into ASCII.
   * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
   */
  render(A, e) {
    let t = A, i = this._renderers[0];
    for (const o of this._renderers)
      o.options.enabled && (o.render(A, i), t = o.outputFramebuffer, i = o, this.lastRenderer = o);
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
class QA {
  constructor() {
    r(this, "borderColor");
    r(this, "_fontSize");
    r(this, "rendererManager");
    r(this, "_font");
    r(this, "postSetupFunction");
    r(this, "postDrawFunction");
    r(this, "p");
    r(this, "asciiFontTextureAtlas");
    r(this, "grid");
    r(this, "eventEmitter");
    r(this, "sketchFramebuffer");
    this.borderColor = "#000000", this._fontSize = 16, this.rendererManager = new nA(), this.eventEmitter = new G(), this.postSetupFunction = null, this.postDrawFunction = null;
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
    this.asciiFontTextureAtlas = new T(this.p, this._font, this._fontSize), this.grid = new U(
      this.p,
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ), this.rendererManager.setup(this.p, this.grid, this.asciiFontTextureAtlas), this.sketchFramebuffer = this.p.createFramebuffer({
      depthFormat: this.p.UNSIGNED_INT,
      textureFiltering: this.p.NEAREST
    }), this.postSetupFunction && this.postSetupFunction();
  }
  /**
   * Runs the rendering pipeline for the P5Asciify library
   */
  asciify() {
    this.rendererManager.render(this.sketchFramebuffer, this.borderColor), this.postDrawFunction && this.postDrawFunction();
  }
  /**
   * Sets the font size for the ascii renderers
   * @param fontSize The font size to set
   */
  set fontSize(A) {
    this._fontSize = A, this.p._setupDone && (this.asciiFontTextureAtlas.setFontSize(A), this.grid.resizeCellPixelDimensions(
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ), this.rendererManager.renderers.forEach((e) => e.resizeFramebuffers()), this.rendererManager.renderers.forEach((e) => e.resetShaders()));
  }
  /**
   * Sets the font for the ascii renderers
   * @param font The font to set
   */
  set font(A) {
    this._font = A, this.p._setupDone && (this.asciiFontTextureAtlas.setFontObject(A), this.rendererManager.renderers.forEach((e) => e.characterSet.reset()), this.grid.resizeCellPixelDimensions(
      this.asciiFontTextureAtlas.maxGlyphDimensions.width,
      this.asciiFontTextureAtlas.maxGlyphDimensions.height
    ));
  }
  // Getters
  get fontSize() {
    return this._fontSize;
  }
  get font() {
    return this._font;
  }
}
function EA(s) {
  if (s._renderer.drawingContext instanceof CanvasRenderingContext2D)
    throw new n("WebGL renderer is required for p5.asciify to run.");
  function A(e, t) {
    const [i, o] = [e, t].map((a) => a.split(".").map(Number));
    for (let a = 0; a < Math.max(i.length, o.length); a++) {
      const h = i[a] ?? 0, d = o[a] ?? 0;
      if (h !== d) return h > d ? 1 : -1;
    }
    return 0;
  }
  if (A(s.VERSION, "1.8.0") < 0)
    throw new n("p5.asciify requires p5.js v1.8.0 or higher to run.");
}
function lA(s) {
  g.prototype.setupP5Instance = function() {
    s.addP5Instance(this);
  }, g.prototype.setupAsciifier = function() {
    EA(this), s.setup();
  }, g.prototype.registerMethod("init", g.prototype.setupP5Instance), g.prototype.registerMethod("afterSetup", g.prototype.setupAsciifier);
}
const cA = `data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
`;
function dA(s) {
  g.prototype.preloadAsciiFont = function() {
    this._incrementPreload(), this.loadAsciiFont(cA);
  }, g.prototype.loadAsciiFont = function(A) {
    const e = (t) => {
      s.font = t, this._decrementPreload(), s.eventEmitter.emit("fontUpdated", {});
    };
    if (typeof A == "string")
      this.loadFont(
        A,
        (t) => {
          e(t);
        },
        () => {
          throw new n(`loadAsciiFont() | Failed to load font from path: '${A}'`);
        }
      );
    else if (A instanceof g.Font)
      e(A);
    else
      throw new n("loadAsciiFont() | Invalid font parameter. Expected a path, base64 string, or p5.Font object.");
  }, g.prototype.registerMethod("beforePreload", g.prototype.preloadAsciiFont), g.prototype.registerPreloadMethod("loadAsciiFont", g.prototype);
}
function uA(s) {
  g.prototype.setAsciifyBorderColor = function(A) {
    s.borderColor = A;
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
    throw new n(
      `Gradient '${A}' does not exist! Available gradients: ${Object.keys(s.gradientConstructors).join(", ")}`
    );
  const a = (E, m, p, b) => {
    if (typeof E != "number" || E < m || E > p)
      throw new n(
        `Invalid ${b} value '${E}'. Expected a number between ${m} and ${p}.`
      );
  };
  if (a(e, 0, 255, "brightness start"), a(t, 0, 255, "brightness end"), typeof i != "string")
    throw new n(
      `Invalid characters value '${i}'. Expected a string.`
    );
  const h = Object.keys(s.gradientParams[A]), d = Object.keys(o).filter((E) => !h.includes(E));
  if (d.length > 0)
    throw new n(
      `Invalid parameter(s) for gradient '${A}': ${d.join(", ")}
Valid parameters are: ${h.join(", ")}`
    );
}
function DA(s) {
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
function fA(s) {
  g.prototype.preAsciifyDraw = function() {
    s.sketchFramebuffer.begin(), this.clear(), this.push();
  }, g.prototype.postAsciifyDraw = function() {
    this.pop(), s.sketchFramebuffer.end(), s.asciify();
  }, g.prototype.registerMethod("pre", g.prototype.preAsciifyDraw), g.prototype.registerMethod("post", g.prototype.postAsciifyDraw);
}
const c = new QA();
typeof window < "u" && (window.p5asciify = c, window.preload = function() {
});
lA(c);
dA(c);
uA(c);
DA(c);
fA(c);
export {
  c as default
};
