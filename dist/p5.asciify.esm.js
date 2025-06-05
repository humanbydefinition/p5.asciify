var _A = Object.defineProperty;
var mA = (Q, A, e) => A in Q ? _A(Q, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : Q[A] = e;
var o = (Q, A, e) => mA(Q, typeof A != "symbol" ? A + "" : A, e);
import p from "p5";
class PA {
  /**
   * Create a new grid instance.
   * @param _texture The framebuffer for the asciifier, used to determine the grid dimensions.
   * @param _cellWidth The width of each cell in the grid.
   * @param _cellHeight The height of each cell in the grid.
   * @ignore
   */
  constructor(A, e, r) {
    /** The number of columns in the grid. */
    o(this, "_cols");
    /** The number of rows in the grid. */
    o(this, "_rows");
    /** The total width of the grid in pixels. */
    o(this, "_width");
    /** The total height of the grid in pixels. */
    o(this, "_height");
    /** The offset to the outer canvas on the x-axis when centering the grid. */
    o(this, "_offsetX");
    /** The offset to the outer canvas on the y-axis when centering the grid. */
    o(this, "_offsetY");
    /** Whether the grid dimensions are fixed, or responsive based on the canvas dimensions. */
    o(this, "_fixedDimensions", !1);
    this._texture = A, this._cellWidth = e, this._cellHeight = r, this.reset();
  }
  /**
   * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
   * @ignore
   */
  reset() {
    this._fixedDimensions || ([this._cols, this._rows] = [Math.floor(this._texture.width / this._cellWidth), Math.floor(this._texture.height / this._cellHeight)]), this._resizeGrid();
  }
  /**
   * Reset the total grid width & height, and the offset to the outer canvas.
   */
  _resizeGrid() {
    this._width = this._cols * this._cellWidth, this._height = this._rows * this._cellHeight, this._offsetX = Math.floor((this._texture.width - this._width) / 2), this._offsetY = Math.floor((this._texture.height - this._height) / 2);
  }
  /**
   * Re-assign the grid cell dimensions and `reset()` the grid.
   * @param newCellWidth The new cell width.
   * @param newCellHeight The new cell height.
   * @ignore
   */
  resizeCellPixelDimensions(A, e) {
    [this._cellWidth, this._cellHeight] = [A, e], this.reset();
  }
  /**
   * Re-assign the grid dimensions and resize the grid. 
   * 
   * Calling this method makes the grid dimensions fixed, meaning they will not automatically resize based on the canvas dimensions.
   * @param newCols The new number of columns.
   * @param newRows The new number of rows.
   * @ignore
   */
  resizeGridDimensions(A, e) {
    this._fixedDimensions = !0, [this._cols, this._rows] = [A, e], this._resizeGrid();
  }
  /**
   * Make the grid dimensions flexible again, and `reset()` the grid.
   * @ignore
   */
  resetGridDimensions() {
    this._fixedDimensions = !1, this.reset();
  }
  /**
   * Update the texture used by the grid, and reset the grid dimensions.
   * @param texture The new framebuffer texture to use for the grid.
   * @ignore
   */
  updateTexture(A) {
    this._texture = A, this._fixedDimensions ? this._resizeGrid() : this.reset();
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
  set fixedDimensions(A) {
    this._fixedDimensions = A;
  }
}
class g extends Error {
  /**
   * Create a new P5AsciifyError instance.
   * @param message The error message.
   */
  constructor(A) {
    super(A), this.name = "P5AsciifyError";
  }
}
const M = (Q, A) => {
  const [e, r] = [Q, A].map((t) => t.split(".").map(Number));
  for (let t = 0; t < Math.max(e.length, r.length); t++) {
    const i = e[t] ?? 0, s = r[t] ?? 0;
    if (i !== s) return i > s ? 1 : -1;
  }
  return 0;
};
class Z {
  /**
   * Creates a new SVG exporter.
   * @param p The p5.js instance
   */
  constructor(A) {
    /**
     * The p5.js instance.
     */
    o(this, "p");
    this.p = A;
  }
  /**
   * Generates the current ASCII output as an SVG string without downloading.
   * @param rendererManager The renderer manager containing framebuffers with ASCII data
   * @param grid The grid information for dimensions and cell sizes
   * @param fontManager The font manager with character data
   * @param backgroundColor The background color for the SVG
   * @param options Options for SVG generation (excludes filename)
   * @returns SVG string representation of the ASCII output
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   */
  generateSVG(A, e, r, t, i = {}) {
    const s = {
      includeBackgroundRectangles: !0,
      drawMode: "fill",
      strokeWidth: 1,
      ...i
    }, n = A.characterFramebuffer, E = A.primaryColorFramebuffer, h = A.secondaryColorFramebuffer, c = A.transformFramebuffer, l = A.rotationFramebuffer;
    n.loadPixels(), E.loadPixels(), h.loadPixels(), c.loadPixels(), l.loadPixels();
    const f = n.pixels, a = E.pixels, B = h.pixels, m = c.pixels, _ = l.pixels, P = e.cols, d = e.rows, F = e.cellWidth, C = e.cellHeight, I = e.width, Y = e.height, y = r.characters;
    let v = this.generateSVGHeader(I, Y);
    if (s.includeBackgroundRectangles) {
      const G = t, w = this.p.color(G), D = `rgba(${w._array[0] * 255},${w._array[1] * 255},${w._array[2] * 255},${w._array[3]})`;
      v += `
<rect width="${I}" height="${Y}" fill="${D}" />`;
    }
    v += `
<g id="ascii-cells">`;
    let u = 0;
    for (let G = 0; G < d; G++)
      for (let w = 0; w < P; w++) {
        const D = u * 4, z = f[D], k = f[D + 1];
        let b = z + (k << 8);
        b >= y.length && (b = y.length - 1);
        let U = {
          r: a[D],
          g: a[D + 1],
          b: a[D + 2],
          a: a[D + 3]
        }, H = {
          r: B[D],
          g: B[D + 1],
          b: B[D + 2],
          a: B[D + 3]
        };
        const O = m[D], $ = m[D + 1], j = m[D + 2], L = O === 255, aA = $ === 255, W = j === 255;
        if (L) {
          const DA = U;
          U = H, H = DA;
        }
        const K = _[D] * (360 / 256), X = w * F, CA = G * C;
        v += this.generateSVGCellContent(
          b,
          U,
          H,
          X,
          CA,
          F,
          C,
          K,
          aA,
          W,
          r,
          y[b],
          s
        ), u++;
      }
    return v += `
</g>
</svg>`, v;
  }
  /**
   * Exports the current ASCII output as an SVG file.
   * @param rendererManager The renderer manager containing framebuffers with ASCII data
   * @param grid The grid information for dimensions and cell sizes
   * @param fontManager The font manager with character data
   * @param options Options for SVG export or just the filename as a string for backward compatibility
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   */
  saveSVG(A, e, r, t, i) {
    if (!i.filename) {
      const n = /* @__PURE__ */ new Date(), E = n.toISOString().split("T")[0], h = n.toTimeString().split(" ")[0].replace(/:/g, "-");
      i.filename = `asciify_output_${E}_${h}`;
    }
    const s = this.generateSVG(A, e, r, t, i);
    this.downloadSVG(s, i.filename);
  }
  /**
   * Generates the SVG header content
   * @param width The width of the SVG
   * @param height The height of the SVG
   * @returns The SVG header content
   */
  generateSVGHeader(A, e) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${A}" height="${e}" viewBox="0 0 ${A} ${e}" 
     xmlns="http://www.w3.org/2000/svg" version="1.1">
<title>ascii art generated via p5.asciify</title>
<desc>ascii art visualization of a p5.js sketch</desc>`;
  }
  /**
   * Generates the SVG content for a single cell
   * @param charIndex The index of the character in the font atlas
   * @param primaryColor The foreground color for the cell
   * @param secondaryColor The background color for the cell
   * @param cellX The x position of the cell
   * @param cellY The y position of the cell
   * @param cellWidth The width of the cell
   * @param cellHeight The height of the cell
   * @param rotationAngle The rotation angle for the character
   * @param fontManager The font manager
   * @param char The characters object array
   * @param options The SVG export options
   * @returns The SVG content for the cell
   */
  generateSVGCellContent(A, e, r, t, i, s, n, E, h, c, l, f, a) {
    let B = "";
    if (a.includeBackgroundRectangles && r.a > 0) {
      const C = `rgba(${r.r},${r.g},${r.b},${r.a / 255})`;
      a.drawMode === "stroke" ? B += `
  <rect x="${t}" y="${i}" width="${s}" height="${n}" stroke="${C}" fill="none" stroke-width="${a.strokeWidth || 1}" />` : B += `
  <rect x="${t}" y="${i}" width="${s}" height="${n}" fill="${C}" />`;
    }
    const m = t + s / 2, _ = i + n / 2, P = `rgba(${e.r},${e.g},${e.b},${e.a / 255})`, d = [];
    if (h || c) {
      const C = h ? -1 : 1, I = c ? -1 : 1;
      d.push(`translate(${m} ${_})`), d.push(`scale(${C} ${I})`), d.push(`translate(${-m} ${-_})`);
    }
    E && d.push(`rotate(${E} ${m} ${_})`);
    const F = d.length ? ` transform="${d.join(" ")}"` : "";
    if (a.drawMode === "text") {
      const C = Math.min(s, n) * 0.8;
      B += `
  <text x="${m}" y="${_}" font-family="monospace" font-size="${C}px" fill="${P}" text-anchor="middle" dominant-baseline="middle"${F}>${this.escapeXml(f.character)}</text>`;
    } else {
      let C = 1;
      M(this.p.VERSION, "2.0.0") < 0 ? C = l.fontSize / l.font.font.unitsPerEm : C = l.fontSize / l.font.data.head.unitsPerEm;
      const I = t + (s - f.advanceWidth * C) / 2, Y = i + (n + l.fontSize * 0.7) / 2, u = f.getPath(I, Y, l.fontSize).toSVG().match(/d="([^"]+)"/);
      if (u && u[1]) {
        if (F && (B += `
  <g${F}>`), a.drawMode === "stroke") {
          const G = a.strokeWidth || 1, w = `path-${A}-${t}-${i}`.replace(/\./g, "-");
          B += `
    <path id="${w}" d="${u[1]}" stroke="${P}" stroke-width="${G}" fill="none" />`;
        } else
          B += `
    <path d="${u[1]}" fill="${P}" />`;
        F && (B += `
  </g>`);
      }
    }
    return B;
  }
  /**
   * Escapes special XML characters in a string
   * @param str The string to escape
   * @returns The escaped string
   */
  escapeXml(A) {
    return A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  /**
   * Creates a downloadable SVG file and initiates the download
   * @param svgContent The SVG content to download
   * @param filename The filename for the SVG file
   */
  downloadSVG(A, e) {
    const r = new Blob([A], { type: "image/svg+xml" }), t = URL.createObjectURL(r), i = document.createElement("a");
    i.href = t, i.download = `${e}.svg`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(t);
  }
}
class q {
  /**
   * Creates a new JSON exporter.
   * @param p The p5.js instance
   */
  constructor(A) {
    /**
     * The p5.js instance.
     */
    o(this, "p");
    this.p = A;
  }
  /**
   * Generates the current ASCII output as a JSON string without downloading.
   * @param rendererManager The renderer manager containing framebuffers with ASCII data
   * @param grid The grid information for dimensions and cell sizes
   * @param fontManager The font manager with character data
   * @param options Options for JSON generation (excludes filename)
   * @returns JSON string representation of the ASCII output
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   */
  generateJSON(A, e, r, t = {}) {
    const i = {
      includeEmptyCells: !0,
      prettyPrint: !0,
      ...t
    }, s = A.characterFramebuffer, n = A.primaryColorFramebuffer, E = A.secondaryColorFramebuffer, h = A.transformFramebuffer, c = A.rotationFramebuffer;
    s.loadPixels(), n.loadPixels(), E.loadPixels(), h.loadPixels(), c.loadPixels();
    const l = s.pixels, f = n.pixels, a = E.pixels, B = h.pixels, m = c.pixels, _ = e.cols, P = e.rows, d = r.characters, F = {
      version: "1.0",
      created: (/* @__PURE__ */ new Date()).toISOString(),
      gridSize: {
        cols: _,
        rows: P,
        cellWidth: e.cellWidth,
        cellHeight: e.cellHeight,
        width: e.width,
        height: e.height
      }
    }, C = [];
    let I = 0;
    for (let y = 0; y < P; y++)
      for (let v = 0; v < _; v++) {
        const u = I * 4, G = l[u], w = l[u + 1];
        let D = G + (w << 8);
        D >= d.length && (D = d.length - 1);
        const z = d[D];
        if (!i.includeEmptyCells && (z.character === " " || z.character === "")) {
          I++;
          continue;
        }
        let k = {
          r: f[u],
          g: f[u + 1],
          b: f[u + 2],
          a: f[u + 3]
        }, b = {
          r: a[u],
          g: a[u + 1],
          b: a[u + 2],
          a: a[u + 3]
        };
        const U = B[u], H = B[u + 1], O = B[u + 2], $ = U === 255, j = H === 255, L = O === 255;
        if ($) {
          const X = k;
          k = b, b = X;
        }
        const W = m[u] * (360 / 256), gA = this.rgbaToHex(
          k.r,
          k.g,
          k.b,
          k.a
        ), K = this.rgbaToHex(
          b.r,
          b.g,
          b.b,
          b.a
        );
        C.push({
          x: v,
          y,
          character: z.character,
          unicode: z.unicode,
          color: gA,
          backgroundColor: K,
          rotation: W,
          inverted: $,
          flipHorizontal: j,
          flipVertical: L
        }), I++;
      }
    return JSON.stringify(
      {
        metadata: F,
        cells: C
      },
      null,
      i.prettyPrint ? 2 : 0
    );
  }
  /**
   * Exports the current ASCII output as a JSON file.
   * @param rendererManager The renderer manager containing framebuffers with ASCII data
   * @param grid The grid information for dimensions and cell sizes
   * @param fontManager The font manager with character data
   * @param options Options for JSON export
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   */
  saveJSON(A, e, r, t = {}) {
    if (!t.filename) {
      const s = /* @__PURE__ */ new Date(), n = s.toISOString().split("T")[0], E = s.toTimeString().split(" ")[0].replace(/:/g, "-");
      t.filename = `asciify_output_${n}_${E}`;
    }
    const i = this.generateJSON(A, e, r, t);
    this.downloadJSON(i, t.filename);
  }
  /**
   * Converts RGBA values to a hex color string
   * @param r Red channel (0-255)
   * @param g Green channel (0-255)
   * @param b Blue channel (0-255)
   * @param a Alpha channel (0-255)
   * @returns Hex color string (e.g., "#RRGGBBAA")
   */
  rgbaToHex(A, e, r, t) {
    const i = (s) => {
      const n = Math.round(s).toString(16);
      return n.length === 1 ? "0" + n : n;
    };
    return `#${i(A)}${i(e)}${i(r)}${i(t)}`;
  }
  /**
   * Creates a downloadable JSON file and initiates the download
   * @param jsonContent The JSON content to download
   * @param filename The filename for the JSON file
   */
  downloadJSON(A, e) {
    const r = new Blob([A], { type: "application/json" }), t = URL.createObjectURL(r), i = document.createElement("a");
    i.href = t, i.download = `${e}.json`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(t);
  }
}
function hA(Q, A) {
  const e = Q.data.cmap;
  if (!e || !e.tables) return 0;
  for (const r of e.tables)
    if (r.format === 4) {
      for (let t = 0; t < r.startCount.length; t++)
        if (A >= r.startCount[t] && A <= r.endCount[t]) {
          if (r.idRangeOffset[t] === 0)
            return A + r.idDelta[t] & 65535;
          {
            const i = r.idRangeOffset[t] / 2 + (A - r.startCount[t]) - (r.startCount.length - t);
            if (i >= 0 && i < r.glyphIdArray.length) {
              const s = r.glyphIdArray[i];
              if (s !== 0)
                return s + r.idDelta[t] & 65535;
            }
          }
        }
    }
  return 0;
}
function V() {
  return {
    getBoundingBox: () => ({ x1: 0, y1: 0, x2: 0, y2: 0 }),
    toSVG: () => ""
  };
}
function lA(Q, A, e, r, t) {
  if (!A || !A.xs || A.xs.length === 0)
    return V();
  const i = t / Q.data.head.unitsPerEm;
  return {
    getBoundingBox: () => ({
      x1: e + A.xMin * i,
      y1: r + -A.yMax * i,
      // Flip Y coordinates (TTF uses Y-up)
      x2: e + A.xMax * i,
      y2: r + -A.yMin * i
      // Flip Y coordinates
    }),
    toSVG: () => cA(A, e, r, i)
  };
}
function cA(Q, A, e, r) {
  if (!Q || !Q.xs) return "";
  const { xs: t, ys: i, endPts: s, flags: n } = Q;
  if (!t || !i || !s || !n) return "";
  let E = "", h = 0;
  for (let c = 0; c < s.length; c++) {
    const l = s[c];
    if (!(l < h)) {
      if (l >= h) {
        const f = A + t[h] * r, a = e - i[h] * r;
        E += `M${f.toFixed(2)},${a.toFixed(2)}`;
        let B = h + 1;
        for (; B <= l; )
          if ((n[B] & 1) !== 0) {
            const _ = A + t[B] * r, P = e - i[B] * r;
            E += `L${_.toFixed(2)},${P.toFixed(2)}`, B++;
          } else {
            const _ = A + t[B] * r, P = e - i[B] * r;
            let d = B + 1 > l ? h : B + 1;
            if ((n[d] & 1) !== 0) {
              const C = A + t[d] * r, I = e - i[d] * r;
              E += `Q${_.toFixed(2)},${P.toFixed(2)} ${C.toFixed(2)},${I.toFixed(2)}`, B = d + 1;
            } else {
              const C = A + t[d] * r, I = e - i[d] * r, Y = (_ + C) / 2, y = (P + I) / 2;
              E += `Q${_.toFixed(2)},${P.toFixed(2)} ${Y.toFixed(2)},${y.toFixed(2)}`, B = d;
            }
          }
        E += "Z";
      }
      h = l + 1;
    }
  }
  return `<path d="${E}" />`;
}
const UA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  P5AsciifyJSONExporter: q,
  P5AsciifySVGExporter: Z,
  compareVersions: M,
  createEmptyPath: V,
  createGlyphPath: lA,
  getGlyphIndex: hA,
  glyphToSVGPath: cA
}, Symbol.toStringTag, { value: "Module" }));
class IA {
  /**
   * Creates a new `P5AsciifyFontManager` instance.
   * @param _p The p5 instance.
   * @param _font The font to use for ASCII rendering.
   * @ignore
   */
  constructor(A, e) {
    /** An array of supported characters in the font. */
    o(this, "_characters", []);
    /** Maximum width and height of the glyphs in the font. */
    o(this, "_maxGlyphDimensions");
    /** Texture containing all characters in the font. As square as possible. */
    o(this, "_texture");
    /** Number of columns in the texture. */
    o(this, "_textureColumns");
    /** Number of rows in the texture. */
    o(this, "_textureRows");
    /** Font size to use for the texture that contains all characters of the font. */
    o(this, "_fontSize", 16);
    this._p = A, this._font = e, this._initializeGlyphsAndCharacters();
  }
  /**
   * Sets up the font manager with the specified font size 
   * and initializes the texture containing all characters in the font.
   * @param fontSize The font size to use for the texture.
   * @ignore
   */
  async setup(A) {
    return this._fontSize = A, this.reset();
  }
  /**
   * Initializes the character glyphs and characters array.
   */
  _initializeGlyphsAndCharacters() {
    if (M(this._p.VERSION, "2.0.0") < 0) {
      const A = Object.values(this._font.font.glyphs.glyphs);
      this._characters = [], A.forEach((e, r) => {
        if (!e.unicode && (!e.unicodes || !e.unicodes.length))
          return;
        const t = this._characters.length, i = t % 256, s = Math.floor(t / 256) % 256, n = Math.floor(t / 65536), E = e.unicode ?? e.unicodes[0];
        this._characters.push({
          character: String.fromCodePoint(E),
          unicode: E,
          getPath: (h, c, l) => e.getPath(h, c, l),
          advanceWidth: e.advanceWidth,
          r: i,
          g: s,
          b: n
        });
      });
    } else {
      const A = [], e = /* @__PURE__ */ new Map();
      this._font.data.cmap.tables.forEach((t) => {
        if (t.format === 4)
          for (let i = 0; i < t.startCount.length; i++) {
            const s = t.startCount[i], n = t.endCount[i];
            if (!(s === 65535 && n === 65535))
              for (let E = s; E <= n; E++) {
                const h = String.fromCodePoint(E), c = hA(this._font, E);
                c && c > 0 && (A.push(h), e.set(h, c));
              }
          }
      });
      const r = [...new Set(A)];
      this._characters = r.map((t, i) => {
        const s = t.codePointAt(0), n = e.get(t);
        let E = 0;
        n !== void 0 && this._font.data.hmtx && this._font.data.hmtx.aWidth && (E = this._font.data.hmtx.aWidth[n]);
        const h = i % 256, c = Math.floor(i / 256) % 256, l = Math.floor(i / 65536);
        return {
          character: t,
          unicode: s,
          // Create a path generator for this glyph
          getPath: (f, a, B) => {
            if (n === void 0) return V();
            const m = this._font.data.glyf[n];
            return m ? lA(this._font, m, f, a, B) : V();
          },
          advanceWidth: E,
          r: h,
          g: c,
          b: l
        };
      });
    }
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
  loadFont(A) {
    if (!(A instanceof p.Font))
      throw new g("Invalid font parameter. Expected a path, base64 string, blob URL, or p5.Font object.");
    this._font = A, this._initializeGlyphsAndCharacters();
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
  glyphColor(A) {
    const e = this._characters.find(
      (r) => r.character === A
    );
    if (!e) {
      const r = A.codePointAt(0), t = r ? r.toString(16).padStart(4, "0") : "unknown";
      throw new g(`Could not find character in character set: ${A} (U+${t})`);
    }
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
   *      console.log(p5asciify.asciifier().fontManager.getUnsupportedCharacters(" .,ABC123"));
   *  }
   * ```
   */
  getUnsupportedCharacters(A) {
    return [...A].filter(
      (e) => !this._characters.some((r) => r.character === e)
    );
  }
  /**
   * Validates a string of characters against the current font.
   * @param characters The string of characters to validate.
   * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
   * @ignore
   */
  validateCharacters(A) {
    const e = this.getUnsupportedCharacters(A);
    if (e.length > 0)
      throw new g(`The following characters are not supported by the current font: [${e.join(", ")}].`);
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
  glyphColors(A = "") {
    return Array.from(A).map((e) => {
      const r = this._characters.find((t) => t.character === e);
      if (!r) {
        const t = e.codePointAt(0), i = t ? t.toString(16).padStart(4, "0") : "unknown";
        throw new g(`Could not find character in character set: ${e} (U+${i})`);
      }
      return [r.r, r.g, r.b];
    });
  }
  /**
       * Calculates the maximum width and height of all the glyphs in the font.
       * @param fontSize - The font size to use for calculations.
       * @returns An object containing the maximum width and height of the glyphs.
       */
  _getMaxGlyphDimensions(A) {
    this._p.textFont(this._font), this._p.textSize(A);
    let e = 0, r = 0;
    for (const t of this._characters) {
      const i = this._font.textBounds(t.character, 0, 0, A), s = i.h, n = i.w;
      e = Math.max(e, n), r = Math.max(r, s);
    }
    return {
      width: Math.ceil(e),
      height: Math.ceil(r)
    };
  }
  /**
   * Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.
   * @ignore
   */
  async reset() {
    return this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
   * @param fontSize - The new font size.
   * @ignore
   */
  async setFontSize(A) {
    return this._fontSize = A, this._maxGlyphDimensions = this._getMaxGlyphDimensions(this._fontSize), this._createTexture(this._fontSize);
  }
  /**
   * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
   * @param fontSize - The font size to use for creating the texture.
   */
  async _createTexture(A) {
    this._textureColumns = Math.ceil(Math.sqrt(this.characters.length)), this._textureRows = Math.ceil(this.characters.length / this._textureColumns), this._texture ? this._texture.resize(this._maxGlyphDimensions.width * this._textureColumns, this._maxGlyphDimensions.height * this._textureRows) : this._texture = this._p.createFramebuffer({
      width: this._maxGlyphDimensions.width * this._textureColumns,
      height: this._maxGlyphDimensions.height * this._textureRows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._texture.begin(), this._p.clear(), this._p.textFont(this._font), this._p.fill(255), this._p.textSize(A), this._p.textAlign(this._p.LEFT, this._p.TOP), this._p.noStroke();
    for (let e = 0; e < this._characters.length; e++) {
      const r = e % this._textureColumns, t = Math.floor(e / this._textureColumns), i = this._maxGlyphDimensions.width * r - this._maxGlyphDimensions.width * this._textureColumns / 2, s = this._maxGlyphDimensions.height * t - this._maxGlyphDimensions.height * this._textureRows / 2;
      this._p.text(this._characters[e].character, i, s);
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
   * An array of supported characters in the set font with additional information like unicode, and RGB color values.
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
}
class sA {
  /**
   * Constructs a new ASCII renderer instance. Called by derived classes.
   * @param _p The p5 instance.
   * @param _grid Grid object containing the relevant grid information.
   * @param initialFramebufferDimensions The initial framebuffer dimensions.
   * @param _fontManager The font manager instance containing the ASCII characters texture.
   * @param _options The options for the ASCII renderer.
   * @ignore
   */
  constructor(A, e, r, t, i, s) {
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    o(this, "_primaryColorFramebuffer");
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    o(this, "_secondaryColorFramebuffer");
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    o(this, "_characterFramebuffer");
    /** The transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     */
    o(this, "_transformFramebuffer");
    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    o(this, "_rotationFramebuffer");
    this._p = A, this._captureFramebuffer = e, this._grid = r, this.initialFramebufferDimensions = t, this._fontManager = i, this._options = s;
    const n = {
      density: 1,
      antialias: !1,
      width: t.width,
      height: t.height,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    };
    this._primaryColorFramebuffer = this._p.createFramebuffer(n), this._secondaryColorFramebuffer = this._p.createFramebuffer(n), this._transformFramebuffer = this._p.createFramebuffer(n), this._characterFramebuffer = this._p.createFramebuffer(n), this._rotationFramebuffer = this._p.createFramebuffer(n);
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
    (A == null ? void 0 : A.enabled) !== void 0 && this.enabled(A.enabled);
  }
  updateCaptureFramebuffer(A) {
    this._captureFramebuffer = A, this.resizeFramebuffers(), this.resetShaders();
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
  enabled(A) {
    if (A === void 0)
      return this._options.enabled;
    if (typeof A != "boolean")
      throw new g("Enabled must be a boolean.");
    if (this._options.enabled = A, !A) {
      const e = [
        this._primaryColorFramebuffer,
        this._secondaryColorFramebuffer,
        this._transformFramebuffer,
        this._rotationFramebuffer,
        this._characterFramebuffer
      ];
      for (const r of e)
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
   * Get the transform framebuffer, where each pixels color channel defines a different transformation:
   * - Red channel: Swap the character and background colors of the grid cells.
   * - Green channel: Flip the ASCII characters horizontally.
   * - Blue channel: Flip the ASCII characters vertically.
   * 
   * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
   * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
   * 
   * @example
   * ```javascript
   *  let characterFramebuffer;
   *  let primaryColorFramebuffer;
   *  let secondaryColorFramebuffer;
   *  let transformFramebuffer;
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
   *      transformFramebuffer = asciifier.renderers().get("custom2D").transformFramebuffer;
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
   *      // Swap the character and background colors of all grid cells,
   *      // and flip the ASCII characters horizontally.
   *      transformFramebuffer.begin();
   *      background(255, 255, 0); 
   *      transformFramebuffer.end();
   *  }
   * ```
   */
  get transformFramebuffer() {
    return this._transformFramebuffer;
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
   *      // Rotates all characters in the grid by X degrees. 
   *      // Utilize the red color channel for the rotation angle.
   *      rotationFramebuffer.begin();
   *      background('rgb(25%, 0%, 0%)'); // 25% of 360 degrees = 90 degrees
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
const AA = {
  /** Enable/disable the renderer */
  enabled: !1
};
class N extends sA {
  /**
   * Creates a new `"custom2D"` ASCII renderer instance.
   * @param _p The p5 instance.
   * @param _grid Grid object containing the relevant grid information.
   * @param _fontManager The font texture atlas containing the ASCII characters texture.
   * @param _options The options for the ASCII renderer.
   * @ignore
   */
  constructor(A, e, r, t, i = AA) {
    super(A, e, r, { width: r.cols, height: r.rows }, t, { ...AA, ...i });
  }
  resetShaders() {
  }
  /**
   * Resize the framebuffers to match the 2D grid size based on the number of rows and columns.
   * @ignore
   */
  resizeFramebuffers() {
    this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._transformFramebuffer.resize(this._grid.cols, this._grid.rows), this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows), this._characterFramebuffer.resize(this._grid.cols, this._grid.rows);
  }
}
class pA {
  /**
   * Create a new color palette instance.
   * @param _p The p5 instance.
   * @param _colors The colors to store in the palette as an array of `[r, g, b]` tuples.
   */
  constructor(A, e) {
    /** The framebuffer used to store the color palette. */
    o(this, "_framebuffer");
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
      const t = r < this._colors.length ? this._p.color(this._colors[r]) : this._p.color(0, 0, 0, 0), i = 4 * r;
      this._framebuffer.pixels[i] = this._p.red(t), this._framebuffer.pixels[i + 1] = this._p.green(t), this._framebuffer.pixels[i + 2] = this._p.blue(t), this._framebuffer.pixels[i + 3] = this._p.alpha(t);
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
   * Get the framebuffer containing the colors of the palette.
   */
  get framebuffer() {
    return this._framebuffer;
  }
}
class R extends N {
  /**
   * Creates a new feature-based 2D ASCII renderer instance.
   * @param p The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(e, r, t, i, s) {
    super(e, r, t, i, s);
    /** {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set. */
    o(this, "_characterColorPalette");
    this._characterColorPalette = new pA(this._p, this._fontManager.glyphColors(this._options.characters)), this.update(this._options);
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
  characters(e = "") {
    if (typeof e != "string")
      throw new g("Characters must be a string.");
    e !== this._options.characters && (this._fontManager.validateCharacters(e), this._characterColorPalette.setColors(this._fontManager.glyphColors(e)), this.resetShaders(), this._options.characters = e);
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
  invert(e) {
    if (typeof e != "boolean")
      throw new g("Invert mode must be a boolean.");
    this._options.invertMode = e;
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
  rotation(e) {
    if (typeof e != "number")
      throw new g("Rotation angle must be a number");
    e = e % 360, e < 0 && (e += 360);
    const r = e / 360, t = Math.round(r * 255);
    this._options.rotationAngle = this._p.color(t, 0, 0);
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
  characterColor(e) {
    if (!e || !(e instanceof p.Color))
      throw new g("Character color must be a valid p5.Color object");
    this._options.characterColor = e;
  }
  /**
   * Define whether to flip the ASCII characters horizontally.
   * @param flip Whether to flip the characters horizontally.
   * @throws {P5AsciifyError} If flip is not a boolean.
   */
  flipHorizontally(e) {
    if (typeof e != "boolean")
      throw new g("Flip horizontally must be a boolean");
    this._options.flipHorizontally = e;
  }
  /**
   * Define whether to flip the ASCII characters vertically.
   * @param flip Whether to flip the characters vertically.
   * @throws {P5AsciifyError} If flip is not a boolean.
   */
  flipVertically(e) {
    if (typeof e != "boolean")
      throw new g("Flip vertically must be a boolean");
    this._options.flipVertically = e;
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
  backgroundColor(e) {
    if (!e || !(e instanceof p.Color))
      throw new g("Background color must be a valid p5.Color object");
    this._options.backgroundColor = e;
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
  characterColorMode(e) {
    if (typeof e != "string")
      throw new g("Character color mode must be a string");
    if (e !== "sampled" && e !== "fixed")
      throw new g("Character color mode must be either 'sampled' or 'fixed'");
    e === "sampled" ? this._options.characterColorMode = 0 : e === "fixed" && (this._options.characterColorMode = 1);
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
  backgroundColorMode(e) {
    if (typeof e != "string")
      throw new g("Background color mode must be a string");
    if (e !== "sampled" && e !== "fixed")
      throw new g("Background color mode must be either 'sampled' or 'fixed'");
    e === "sampled" ? this._options.backgroundColorMode = 0 : e === "fixed" && (this._options.backgroundColorMode = 1);
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
    super.update(e), (e == null ? void 0 : e.enabled) !== void 0 && this.enabled(e.enabled), (e == null ? void 0 : e.characterColor) !== void 0 && (e.characterColor = this._p.color(e.characterColor), this.characterColor(e.characterColor)), (e == null ? void 0 : e.backgroundColor) !== void 0 && (e.backgroundColor = this._p.color(e.backgroundColor), this.backgroundColor(e.backgroundColor)), (e == null ? void 0 : e.characters) !== void 0 && this.characters(e.characters), (e == null ? void 0 : e.invertMode) !== void 0 && this.invert(e.invertMode), (e == null ? void 0 : e.rotationAngle) !== void 0 && this.rotation(e.rotationAngle), (e == null ? void 0 : e.characterColorMode) !== void 0 && this.characterColorMode(e.characterColorMode), (e == null ? void 0 : e.backgroundColorMode) !== void 0 && this.backgroundColorMode(e.backgroundColorMode), (e == null ? void 0 : e.flipHorizontally) !== void 0 && this.flipHorizontally(e.flipHorizontally), (e == null ? void 0 : e.flipVertically) !== void 0 && this.flipVertically(e.flipVertically);
  }
  /**
   * Get the {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set.
   */
  get characterColorPalette() {
    return this._characterColorPalette;
  }
}
var S = `precision mediump float;

attribute vec3 aPosition;\r
attribute vec2 aTexCoord;

varying vec2 v_texCoord;

void main() {\r
    vec4 positionVec4 = vec4(aPosition, 1.0);

    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    gl_Position = positionVec4;

    v_texCoord = aTexCoord;\r
}`, wA = `precision mediump float;

uniform sampler2D u_sketchTexture;             
uniform vec2 u_gridCellDimensions;             

void main() {\r
    
    vec2 cellCoord = floor(gl_FragCoord.xy);

    
    vec2 cellSizeInTexCoords = 1.0 / u_gridCellDimensions;

    
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    
    vec4 finalColor;

    finalColor = texture2D(u_sketchTexture, cellCenterTexCoord);

    
    gl_FragColor = finalColor;\r
}`, bA = `precision mediump float;

uniform sampler2D u_colorSampleFramebuffer;\r
uniform sampler2D u_charPaletteTexture;\r
uniform vec2 u_charPaletteSize;\r
uniform vec2 u_textureSize;\r
uniform ivec2 u_brightnessRange;

void main() {\r
    
    vec2 pos = (floor(gl_FragCoord.xy) + 0.5) / u_textureSize;\r
    \r
    
    vec4 inputColor = texture2D(u_colorSampleFramebuffer, pos);\r
    \r
    
    if (inputColor.a == 0.0) {\r
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\r
        return;\r
    }\r
    \r
    
    float brightness = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));\r
    \r
    
    float brightness255 = brightness * 255.0;\r
    \r
    
    if (brightness255 < float(u_brightnessRange.x) || brightness255 > float(u_brightnessRange.y)) {\r
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\r
        return;\r
    }\r
    \r
    
    float normalizedBrightness = (brightness255 - float(u_brightnessRange.x)) / \r
                               (float(u_brightnessRange.y) - float(u_brightnessRange.x));\r
    \r
    
    float index = clamp(floor(normalizedBrightness * u_charPaletteSize.x), 0.0, u_charPaletteSize.x - 1.0);\r
    \r
    
    vec3 charColor = texture2D(u_charPaletteTexture, vec2((index + 0.5) / u_charPaletteSize.x, 0.0)).rgb;\r
    gl_FragColor = vec4(charColor, inputColor.a);\r
}`;
const eA = {
  /** Enable/disable the renderer */
  enabled: !0,
  /** Characters used for brightness mapping (from darkest to brightest) */
  characters: " .:-=+*%@#",
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
  rotationAngle: 0,
  /** Flip the ASCII characters horizontally */
  flipHorizontally: !1,
  /** Flip the ASCII characters vertically */
  flipVertically: !1,
  /** Range of brightness values to map to ASCII characters */
  brightnessRange: [0, 255]
};
class oA extends R {
  /**
   * Creates a new `"brightness"` ASCII renderer instance.
   * @param p5Instance The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(e, r, t, i, s = eA) {
    super(e, r, t, i, { ...eA, ...s });
    o(this, "colorSampleShader");
    o(this, "asciiCharacterShader");
    o(this, "colorSampleFramebuffer");
    this.colorSampleShader = this._p.createShader(S, wA), this.asciiCharacterShader = this._p.createShader(S, bA), this.colorSampleFramebuffer = this._p.createFramebuffer({
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
  update(e) {
    super.update(e), e.brightnessRange !== void 0 && this.brightnessRange(e.brightnessRange);
  }
  /**
   * Sets the brightness range for the ASCII character mapping.
   * This range defines the minimum and maximum brightness values that will be mapped to ASCII characters.
   * 
   * If a pixel's brightness is not within the range, the corresponding cell will be left transparent,
   * rendering whatever is behind it, like the canvas bit or the set background color.
   * 
   * @example
   * ```javascript
   * function setupAsciify() {
   *      // Set the brightness range for the renderer
   *      p5asciify.renderers().get("brightness").brightnessRange([50, 200]);
   *  }
   * ```
   * 
   * @param range A tuple [min, max] representing the brightness range.
   * @throws {P5AsciifyError} If the start value is greater than the end value, or if the values are not within the range of 0 to 255.
   */
  brightnessRange(e) {
    const [r, t] = e;
    if (r < 0 || r > 255 || t < 0 || t > 255)
      throw new g("Brightness values must be between 0 and 255.");
    if (r > t)
      throw new g("Start value must be less than or equal to the end value.");
    this._options.brightnessRange = [r, t];
  }
  render() {
    this.colorSampleFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", this._captureFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this.colorSampleFramebuffer.width, this.colorSampleFramebuffer.height), this.colorSampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._options.characterColorMode === 1 ? this._p.background(this._options.characterColor) : (this._p.clear(), this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows)), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this._p.background(this._options.backgroundColor) : (this._p.clear(), this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows)), this._secondaryColorFramebuffer.end(), this._transformFramebuffer.begin(), this._p.background(this._options.invertMode ? 255 : 0, this._options.flipHorizontally ? 255 : 0, this._options.flipVertically ? 255 : 0), this._transformFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.background(this._options.rotationAngle), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_textureSize", [this._grid.cols, this._grid.rows]), this.asciiCharacterShader.setUniform("u_colorSampleFramebuffer", this.colorSampleFramebuffer), this.asciiCharacterShader.setUniform("u_charPaletteTexture", this._characterColorPalette.framebuffer), this.asciiCharacterShader.setUniform("u_charPaletteSize", [this._characterColorPalette.colors.length, 1]), this.asciiCharacterShader.setUniform("u_brightnessRange", this._options.brightnessRange), this._p.rect(0, 0, this._characterFramebuffer.width, this._characterFramebuffer.height), this._characterFramebuffer.end();
  }
}
var xA = `precision mediump float;

uniform sampler2D u_sketchTexture;\r
uniform sampler2D u_sampleTexture;             
uniform vec2 u_gridCellDimensions;             
uniform int u_sampleMode;                      
uniform vec4 u_staticColor;                    

void main() {\r
    
    vec2 cellCoord = floor(gl_FragCoord.xy);

    
    vec2 cellSizeInTexCoords = 1.0 / u_gridCellDimensions;

    
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    
    vec4 finalColor;

    vec4 sampleColor = texture2D(u_sampleTexture, cellCenterTexCoord);

    if(sampleColor != vec4(0.0, 0.0, 0.0, 0.0)) {\r
        if(u_sampleMode == 0) {\r
            
            finalColor = texture2D(u_sketchTexture, cellCenterTexCoord);\r
        } else {\r
            
            finalColor = u_staticColor;\r
        }\r
    } 

    
    gl_FragColor = finalColor;\r
}`, FA = `precision mediump float;

uniform sampler2D u_sampleTexture;\r
uniform vec2 u_gridCellDimensions;\r
uniform bool u_invert;\r
uniform bool u_flipH;\r
uniform bool u_flipV;\r
uniform vec3 u_compareColor;

void main() {\r
    
    vec2 cellCoord = floor(gl_FragCoord.xy);

    
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;

    
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    bool shouldInvert;

    
    shouldInvert = texture2D(u_sampleTexture, cellCenterTexCoord).rgb != u_compareColor;

    if(shouldInvert) {\r
        
        
        
        
        float r = u_invert ? 1.0 : 0.0;\r
        float g = u_flipH ? 1.0 : 0.0;\r
        float b = u_flipV ? 1.0 : 0.0;\r
        \r
        gl_FragColor = vec4(r, g, b, 1.0);\r
    } else {\r
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\r
    }\r
}`, yA = `precision mediump float;

uniform sampler2D u_sampleTexture;\r
uniform vec2 u_gridCellDimensions;\r
uniform vec3 u_rotationColor;\r
uniform vec3 u_compareColor;

void main() {\r
    
    vec2 cellCoord = floor(gl_FragCoord.xy);

    
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;

    
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    bool shouldRotate;

        
    shouldRotate = texture2D(u_sampleTexture, cellCenterTexCoord).rgb != u_compareColor;

    if(shouldRotate) {\r
        gl_FragColor = vec4(u_rotationColor, 1.0);\r
    } else {\r
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\r
    }\r
}`, vA = `precision mediump float;

uniform sampler2D u_sketchTexture;\r
uniform vec2 u_gridCellDimensions;

void main() {\r
    
    vec2 cellCoord = floor(gl_FragCoord.xy);\r
    \r
    
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;\r
    \r
    
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;\r
    \r
    
    gl_FragColor = texture2D(u_sketchTexture, cellCenterTexCoord);\r
}`, SA = `precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_texture;\r
uniform vec2 u_textureSize;\r
uniform float u_threshold;

uniform sampler2D u_colorPaletteTexture;

void main() {\r
    vec2 texelSize = 1.0 / u_textureSize;

    float kernelX[9];\r
    float kernelY[9];

    kernelX[0] = -1.0; kernelX[1] = 0.0; kernelX[2] = 1.0;\r
    kernelX[3] = -2.0; kernelX[4] = 0.0; kernelX[5] = 2.0;\r
    kernelX[6] = -1.0; kernelX[7] = 0.0; kernelX[8] = 1.0;

    kernelY[0] = -1.0; kernelY[1] = -2.0; kernelY[2] = -1.0;\r
    kernelY[3] = 0.0;  kernelY[4] = 0.0;  kernelY[5] = 0.0;\r
    kernelY[6] = 1.0;  kernelY[7] = 2.0;  kernelY[8] = 1.0;

    
    vec3 texColor[9];\r
    for(int i = 0; i < 3; i++) {\r
        for(int j = 0; j < 3; j++) {\r
            texColor[i * 3 + j] = texture2D(u_texture, v_texCoord + vec2(float(i - 1), float(j - 1)) * texelSize).rgb;\r
        }\r
    }

    vec3 sobelX = vec3(0.0);\r
    vec3 sobelY = vec3(0.0);\r
    for(int i = 0; i < 9; i++) {\r
        sobelX += kernelX[i] * texColor[i];\r
        sobelY += kernelY[i] * texColor[i];\r
    }

    vec3 sobel = sqrt(sobelX * sobelX + sobelY * sobelY);\r
    float intensity = length(sobel) / sqrt(3.0);\r
    \r
    vec4 edgeColor = vec4(0.0);\r
    \r
    if(intensity > u_threshold) {\r
        float angleDeg = degrees(atan(sobelY.r, sobelX.r));\r
        \r
        
        int charIndex = 0;\r
        \r
        if(angleDeg >= -22.5 && angleDeg < 22.5) charIndex = 0;\r
        else if(angleDeg >= 22.5 && angleDeg < 67.5) charIndex = 1;\r
        else if(angleDeg >= 67.5 && angleDeg < 112.5) charIndex = 2;\r
        else if(angleDeg >= 112.5 && angleDeg < 157.5) charIndex = 3;\r
        else if(angleDeg >= 157.5 || angleDeg < -157.5) charIndex = 4;\r
        else if(angleDeg >= -157.5 && angleDeg < -112.5) charIndex = 5;\r
        else if(angleDeg >= -112.5 && angleDeg < -67.5) charIndex = 6;\r
        else if(angleDeg >= -67.5 && angleDeg < -22.5) charIndex = 7;\r
        \r
        
        float paletteCoord = (float(charIndex) + 0.5) / 8.0;\r
        edgeColor = texture2D(u_colorPaletteTexture, vec2(paletteCoord, 0.5));\r
    }

    gl_FragColor = edgeColor;\r
}`;
const BA = (Q, A, e) => `
precision mediump float;uniform sampler2D u_image;uniform vec2 u_imageSize,u_gridCellDimensions;uniform int u_threshold;const vec3 i=vec3(0);vec3 f[${Q}];int u[${Q}];float r(float i){return floor(i+.5);}void main(){vec2 v=floor(gl_FragCoord.xy);ivec2 b=ivec2(v);v=u_imageSize/u_gridCellDimensions;b=ivec2(r(float(b.x)*v.x),r(float(b.y)*v.y));int m=0;for(int b=0;b<${Q};b++)f[b]=i,u[b]=0;for(int v=0;v<${e};v++)for(int r=0;r<${A};r++){ivec2 y=b+ivec2(r,v);if(y.x<0||y.y<0||y.x>=int(u_imageSize.x)||y.y>=int(u_imageSize.y))continue;vec3 e=texture2D(u_image,(vec2(y)+.5)/u_imageSize).xyz;if(length(e-i)<.001)continue;m++;bool x=false;for(int b=0;b<${Q};b++)if(length(e-f[b])<.001){u[b]++;x=true;break;}if(!x)for(int b=0;b<${Q};b++)if(u[b]==0){f[b]=e;u[b]=1;break;}}vec3 e=i;int x=0;for(int b=0;b<${Q};b++)if(u[b]>x)e=f[b],x=u[b];gl_FragColor=m<u_threshold?vec4(i,0):vec4(e,1);}
`, rA = {
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
  rotationAngle: 0,
  /** Flip the ASCII characters horizontally */
  flipHorizontally: !1,
  /** Flip the ASCII characters vertically */
  flipVertically: !1
};
class nA extends R {
  /**
   * Creates a new `"edge"` ASCII renderer instance.
   * @param p5Instance The p5 instance.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(e, r, t, i, s = rA) {
    super(e, r, t, i, { ...rA, ...s });
    o(this, "sobelShader");
    o(this, "sampleShader");
    o(this, "colorSampleShader");
    o(this, "transformShader");
    o(this, "rotationShader");
    o(this, "asciiCharacterShader");
    o(this, "sobelFramebuffer");
    o(this, "sampleFramebuffer");
    this.sobelShader = this._p.createShader(S, SA), this.sampleShader = this._p.createShader(S, BA(16, this._grid.cellHeight, this._grid.cellWidth)), this.colorSampleShader = this._p.createShader(S, xA), this.transformShader = this._p.createShader(S, FA), this.rotationShader = this._p.createShader(S, yA), this.asciiCharacterShader = this._p.createShader(S, vA), this.sobelFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._captureFramebuffer.width,
      height: this._captureFramebuffer.height,
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
    super.resizeFramebuffers(), this.sampleFramebuffer.resize(this._grid.cols, this._grid.rows), this.sobelFramebuffer.resize(this._captureFramebuffer.width, this._captureFramebuffer.height);
  }
  resetShaders() {
    this.sampleShader = this._p.createShader(S, BA(16, this._grid.cellHeight, this._grid.cellWidth));
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
  sobelThreshold(e) {
    if (typeof e != "number" || Number.isNaN(e) || !Number.isFinite(e))
      throw new g("Sobel threshold must be a valid number");
    if (e < 0 || e > 1)
      throw new g("Sobel threshold must be between 0 and 1");
    this._options.sobelThreshold = e;
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
  sampleThreshold(e) {
    if (typeof e != "number" || Number.isNaN(e) || !Number.isFinite(e))
      throw new g("Sample threshold must be a valid number");
    if (e < 0)
      throw new g("Sample threshold must be greater than or equal to 0");
    this._options.sampleThreshold = e;
  }
  update(e) {
    super.update(e), e.sobelThreshold !== void 0 && this.sobelThreshold(e.sobelThreshold), e.sampleThreshold !== void 0 && this.sampleThreshold(e.sampleThreshold);
  }
  render() {
    this.sobelFramebuffer.begin(), this._p.clear(), this._p.shader(this.sobelShader), this.sobelShader.setUniform("u_texture", this._captureFramebuffer), this.sobelShader.setUniform("u_textureSize", [this._captureFramebuffer.width, this._captureFramebuffer.height]), this.sobelShader.setUniform("u_threshold", this._options.sobelThreshold), this.sobelShader.setUniform("u_colorPaletteTexture", this._characterColorPalette.framebuffer), this.sobelShader.setUniform("u_totalChars", this._options.characters.length), this._p.rect(0, 0, this.sobelFramebuffer.width, this.sobelFramebuffer.height), this.sobelFramebuffer.end(), this.sampleFramebuffer.begin(), this._p.clear(), this._p.shader(this.sampleShader), this.sampleShader.setUniform("u_imageSize", [this._captureFramebuffer.width, this._captureFramebuffer.height]), this.sampleShader.setUniform("u_image", this.sobelFramebuffer), this.sampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.sampleShader.setUniform("u_threshold", this._options.sampleThreshold), this._p.rect(0, 0, this.sampleFramebuffer.width, this.sampleFramebuffer.height), this.sampleFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", this._captureFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.characterColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.characterColor._array), this._p.rect(0, 0, this._primaryColorFramebuffer.width, this._primaryColorFramebuffer.height), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._p.clear(), this._p.shader(this.colorSampleShader), this.colorSampleShader.setUniform("u_sketchTexture", this._captureFramebuffer), this.colorSampleShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.colorSampleShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this.colorSampleShader.setUniform("u_sampleMode", this._options.backgroundColorMode), this.colorSampleShader.setUniform("u_staticColor", this._options.backgroundColor._array), this._p.rect(0, 0, this._secondaryColorFramebuffer.width, this._secondaryColorFramebuffer.height), this._secondaryColorFramebuffer.end(), this._transformFramebuffer.begin(), this._p.clear(), this._p.shader(this.transformShader), this.transformShader.setUniform("u_invert", this._options.invertMode), this.transformShader.setUniform("u_flipH", this._options.flipHorizontally), this.transformShader.setUniform("u_flipV", this._options.flipVertically), this.transformShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.transformShader.setUniform("u_compareColor", [0, 0, 0]), this.transformShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._transformFramebuffer.width, this._transformFramebuffer.height), this._transformFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.clear(), this._p.shader(this.rotationShader), this.rotationShader.setUniform("u_rotationColor", this._options.rotationAngle._array), this.rotationShader.setUniform("u_sampleTexture", this.sampleFramebuffer), this.rotationShader.setUniform("u_compareColor", [0, 0, 0]), this.rotationShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._rotationFramebuffer.width, this._rotationFramebuffer.height), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this.asciiCharacterShader), this.asciiCharacterShader.setUniform("u_sketchTexture", this.sampleFramebuffer), this.asciiCharacterShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._p.rect(0, 0, this._characterFramebuffer.width, this._characterFramebuffer.height), this._characterFramebuffer.end();
  }
}
var MA = `precision mediump float;

uniform sampler2D u_characterTexture;\r
uniform vec2 u_charsetDimensions;

uniform sampler2D u_primaryColorTexture;\r
uniform sampler2D u_secondaryColorTexture;\r
uniform sampler2D u_transformTexture;\r
uniform sampler2D u_asciiCharacterTexture;\r
uniform sampler2D u_rotationTexture;

uniform sampler2D u_captureTexture;\r
uniform vec2 u_captureDimensions;\r
uniform int u_backgroundMode; 

uniform vec2 u_gridCellDimensions;\r
uniform vec2 u_gridPixelDimensions;

uniform float u_pixelRatio;

mat2 rotate2D(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}

void main() {\r
    
    vec2 logicalFragCoord = gl_FragCoord.xy / u_pixelRatio;

    
    vec2 adjustedCoord = (logicalFragCoord) / u_gridPixelDimensions;

    
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;\r
    vec2 cellCoord = floor(gridCoord);

    
    vec2 charIndexTexCoord = (cellCoord + vec2(0.5)) / u_gridCellDimensions;

    
    vec4 primaryColor = texture2D(u_primaryColorTexture, charIndexTexCoord);

    
    vec4 secondaryColor = texture2D(u_secondaryColorTexture, charIndexTexCoord);

    
    vec4 transformColor = texture2D(u_transformTexture, charIndexTexCoord);\r
    bool isInverted = transformColor.r > 0.5; 
    bool flipHorizontal = transformColor.g > 0.5; 
    bool flipVertical = transformColor.b > 0.5;   

    
    vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);

    if(encodedIndexVec.a < 0.01) {\r
        if(u_backgroundMode == 0) {\r
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\r
        } else if(u_backgroundMode == 1) {\r
            vec2 captureTexCoord = logicalFragCoord / u_captureDimensions;\r
            gl_FragColor = texture2D(u_captureTexture, captureTexCoord);\r
        }\r
        return;\r
    }

    
    int charIndex = int(encodedIndexVec.r * 255.0 + 0.5) + int(encodedIndexVec.g * 255.0 + 0.5) * 256;

    
    int charCol = charIndex - (charIndex / int(u_charsetDimensions.x)) * int(u_charsetDimensions.x);\r
    int charRow = charIndex / int(u_charsetDimensions.x);

    
    vec2 charCoord = vec2(float(charCol) / u_charsetDimensions.x, float(charRow) / u_charsetDimensions.y);

    
    vec4 rotationColor = texture2D(u_rotationTexture, charIndexTexCoord);

    
    float rotationAngle = rotationColor.r * 2.0 * 3.14159265359;

    
    vec2 fractionalPart = fract(gridCoord) - 0.5;

    
    if(flipHorizontal) {\r
        fractionalPart.x = -fractionalPart.x;\r
    }\r
    if(flipVertical) {\r
        fractionalPart.y = -fractionalPart.y;\r
    }

    
    fractionalPart = rotate2D(rotationAngle) * fractionalPart;\r
    fractionalPart += 0.5;

    
    vec2 cellMin = charCoord;\r
    vec2 cellMax = charCoord + vec2(1.0 / u_charsetDimensions.x, 1.0 / u_charsetDimensions.y);\r
    vec2 texCoord = charCoord + fractionalPart * vec2(1.0 / u_charsetDimensions.x, 1.0 / u_charsetDimensions.y);

    
    bool outsideBounds = any(lessThan(texCoord, cellMin)) || any(greaterThan(texCoord, cellMax));

    if(outsideBounds) {\r
        
        gl_FragColor = isInverted ? primaryColor : secondaryColor;\r
        return;\r
    }

    
    vec4 charTexel = texture2D(u_characterTexture, texCoord);

    
    bool isFullyWhite = all(greaterThanEqual(charTexel.rgb, vec3(0.99)));

    
    if(isInverted) {\r
        
        gl_FragColor = isFullyWhite ? secondaryColor : primaryColor;\r
    } else {\r
        
        gl_FragColor = isFullyWhite ? primaryColor : secondaryColor;\r
    }\r
}`;
class fA {
  /**
   * Creates a new `P5AsciifyDisplayRenderer` instance.
   * @param _p The p5 instance.
   * @param _grid The grid instance.
   * @param _fontManager The font texture atlas instance.
   * @ignore
   */
  constructor(A, e, r) {
    /** The asciified texture */
    o(this, "_resultFramebuffer");
    /** Final shader to render the ASCII output. */
    o(this, "_shader");
    /** Background mode: 0 for fixed background color, 1 for sampled background color */
    o(this, "_backgroundMode", 0);
    this._p = A, this._grid = e, this._fontManager = r, this._shader = this._p.createShader(S, MA), this._resultFramebuffer = this._p.createFramebuffer({
      width: this._grid.width,
      height: this._grid.height,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  /**
   * Renders the ASCII output to the result framebuffer.
   * @param characterFramebuffer The framebuffer containing the character indices.
   * @param primaryColorFramebuffer The framebuffer containing the primary color values.
   * @param secondaryColorFramebuffer The framebuffer containing the secondary color values.
   * @param transformFramebuffer The framebuffer containing the inversion values.
   * @param rotationFramebuffer The framebuffer containing the rotation values.
   * @ignore
   */
  render(A, e, r, t, i, s) {
    this._resultFramebuffer.begin(), this._p.clear(), this._p.shader(this._shader);
    const n = {
      u_pixelRatio: this._p.pixelDensity(),
      u_characterTexture: this._fontManager.texture,
      u_charsetDimensions: [this._fontManager.textureColumns, this._fontManager.textureRows],
      u_primaryColorTexture: e,
      u_secondaryColorTexture: r,
      u_transformTexture: t,
      u_rotationTexture: i,
      u_captureTexture: s,
      u_captureDimensions: [s.width, s.height],
      u_asciiCharacterTexture: A,
      u_gridPixelDimensions: [this._grid.width, this._grid.height],
      u_gridCellDimensions: [this._grid.cols, this._grid.rows],
      u_backgroundMode: this._backgroundMode || 0
      // Default to 0 (fixed background color)
    };
    for (const [E, h] of Object.entries(n))
      this._shader.setUniform(E, h);
    this._p.rect(0, 0, this._resultFramebuffer.width, this._resultFramebuffer.height), this._resultFramebuffer.end();
  }
  /**
   * Resizes the framebuffer to match the grid width/height.
   * @ignore
   */
  resizeFramebuffers() {
    this._resultFramebuffer.resize(this._grid.width, this._grid.height);
  }
  /**
   * Sets the background mode for the ASCII output.
   * @param mode - 0 for fixed background color, 1 for sampled background color.
   * @ignore
   */
  backgroundMode(A) {
    this._backgroundMode = A;
  }
  /**
   * Returns the framebuffer containing the final ASCII output.
   * @ignore
   */
  get resultFramebuffer() {
    return this._resultFramebuffer;
  }
}
const J = {
  brightness: oA,
  edge: nA,
  custom2D: N
};
class dA {
  /**
   * Creates a new ASCII renderer manager instance.
   * @param _p The p5 instance.
   * @param _grid The grid instance.
   * @param _fontManager The font texture atlas instance.
   * @ignore
   */
  constructor(A, e, r, t, i) {
    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    o(this, "_currentCanvasDimensions");
    /** The list of available renderers. */
    o(this, "_renderers");
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    o(this, "_primaryColorFramebuffer");
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    o(this, "_secondaryColorFramebuffer");
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    o(this, "_characterFramebuffer");
    /** The transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     */
    o(this, "_transformFramebuffer");
    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    o(this, "_rotationFramebuffer");
    o(this, "_asciiDisplayRenderer2D");
    /** Whether any renderers are enabled. */
    o(this, "_hasEnabledRenderers", !1);
    this._p = A, this._captureFramebuffer = e, this._grid = r, this._fontManager = t, this._pluginRegistry = i, this._currentCanvasDimensions = {
      width: this._captureFramebuffer.width,
      height: this._captureFramebuffer.height
    }, this._renderers = [
      { name: "custom2D", renderer: new N(this._p, this._captureFramebuffer, this._grid, this._fontManager) },
      { name: "edge", renderer: new nA(this._p, this._captureFramebuffer, this._grid, this._fontManager) },
      { name: "brightness", renderer: new oA(this._p, this._captureFramebuffer, this._grid, this._fontManager) }
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
    }), this._transformFramebuffer = this._p.createFramebuffer({
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
    }), this._asciiDisplayRenderer2D = new fA(this._p, this._grid, this._fontManager);
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
  render(A) {
    this._characterFramebuffer.draw(() => this._p.clear()), this._primaryColorFramebuffer.draw(() => this._p.clear()), this._secondaryColorFramebuffer.draw(() => this._p.clear()), this._transformFramebuffer.draw(() => this._p.clear()), this._rotationFramebuffer.draw(() => this._p.clear()), this._hasEnabledRenderers = !1;
    for (let e = this._renderers.length - 1; e >= 0; e--) {
      const r = this._renderers[e];
      if (r.renderer.options.enabled) {
        r.renderer instanceof R && r.renderer.render();
        const t = -this._grid.cols / 2, i = -this._grid.rows / 2;
        this._characterFramebuffer.draw(() => this._p.image(r.renderer.characterFramebuffer, t, i)), this._primaryColorFramebuffer.draw(() => this._p.image(r.renderer.primaryColorFramebuffer, t, i)), this._secondaryColorFramebuffer.draw(() => this._p.image(r.renderer.secondaryColorFramebuffer, t, i)), this._transformFramebuffer.draw(() => this._p.image(r.renderer.transformFramebuffer, t, i)), this._rotationFramebuffer.draw(() => this._p.image(r.renderer.rotationFramebuffer, t, i)), this._hasEnabledRenderers = !0;
      }
    }
    this._asciiDisplayRenderer2D.render(
      this._characterFramebuffer,
      this._primaryColorFramebuffer,
      this._secondaryColorFramebuffer,
      this._transformFramebuffer,
      this._rotationFramebuffer,
      this._captureFramebuffer
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
    (this._currentCanvasDimensions.width !== this._captureFramebuffer.width || this._currentCanvasDimensions.height !== this._captureFramebuffer.height) && (this._currentCanvasDimensions.width = this._captureFramebuffer.width, this._currentCanvasDimensions.height = this._captureFramebuffer.height, this._grid.reset(), this.resetRendererDimensions());
  }
  updateCaptureFramebuffer(A) {
    this._captureFramebuffer = A, this.resetRendererDimensions(), this._renderers.forEach((e) => {
      e.renderer.updateCaptureFramebuffer(A);
    });
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
    this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows), this._characterFramebuffer.resize(this._grid.cols, this._grid.rows), this._transformFramebuffer.resize(this._grid.cols, this._grid.rows), this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows), this._renderers.forEach((A) => {
      A.renderer.resizeFramebuffers(), A.renderer instanceof R && A.renderer.resetShaders();
    }), this._asciiDisplayRenderer2D.resizeFramebuffers();
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
   *      // Remove all existing default renderers provided by `p5.asciify`.
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
  add(A, e, r) {
    if (typeof A != "string" || A.trim() === "")
      throw new g("Renderer name must be a non-empty string");
    let t;
    const i = J[e];
    if (i)
      t = new i(this._p, this._captureFramebuffer, this._grid, this._fontManager, r);
    else {
      const s = this._pluginRegistry.get(e);
      s && (t = s.create(
        this._p,
        this._captureFramebuffer,
        this._grid,
        this._fontManager,
        r
      ));
    }
    if (!t) {
      const s = [
        ...Object.keys(J),
        ...this._pluginRegistry.getIds()
      ].join(", ");
      throw new g(
        `Invalid renderer type: ${e}. Valid types are: ${s}`
      );
    }
    return this._renderers.unshift({ name: A, renderer: t }), t;
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
  get(A) {
    var r;
    const e = (r = this._renderers.find((t) => t.name === A)) == null ? void 0 : r.renderer;
    if (!e)
      throw new g(
        `Renderer '${A}' not found. Available renderers: ${this._renderers.map((t) => t.name).join(", ")}`
      );
    return e;
  }
  /**
   * Gets a list of all available renderer types (built-in and plugins)
   * @returns An array of available renderer type IDs
   */
  getAvailableRendererTypes() {
    return [
      ...Object.keys(J),
      ...this._pluginRegistry.getIds()
    ];
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
  moveDown(A) {
    const e = this._getRendererIndex(A);
    if (e === -1)
      throw new g("Renderer not found.");
    if (e >= this._renderers.length - 1)
      throw new g("Renderer is already at the bottom of the list.");
    this.swap(A, this._renderers[e + 1].renderer);
  }
  /**
   * Moves a renderer up in the list of renderers, meaning it will be rendered later in the pipeline.
   * @param renderer The renderer to move up in the list.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Move the `"brightness"` renderer up in the list of renderers.
   *      p5asciify.asciifier().renderers().moveUp('brightness');
   * 
   *      // Alternatively, you can also pass the renderer instance itself.
   *  }
   * ```
   */
  moveUp(A) {
    const e = this._getRendererIndex(A);
    if (e === -1)
      throw new g("Renderer not found.");
    if (e <= 0)
      throw new g("Renderer is already at the top of the list.");
    this.swap(A, this._renderers[e - 1].renderer);
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
  remove(A) {
    const e = this._getRendererIndex(A);
    if (e === -1)
      throw new g("Renderer not found.");
    this._renderers.splice(e, 1);
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
   *      // Swap the positions of the `"brightness"` and `"edge"` renderers.
   *      p5asciify.asciifier().renderers().swap('brightness', 'edge');
   * 
   *      // Alternatively, you can also pass the renderer instances themselves.
   *  }
   * ```
   */
  swap(A, e) {
    const r = this._getRendererIndex(A), t = this._getRendererIndex(e);
    if (r === -1 || t === -1)
      throw new g("One or more renderers not found.");
    const i = this._renderers[r];
    this._renderers[r] = this._renderers[t], this._renderers[t] = i;
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
    this._renderers.forEach((A) => A.renderer.enabled(!0));
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
   *      p5asciify.asciifier().renderers().enabled(true);
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
   * Returns the primary color framebuffer,
   * which contains the primary color framebuffers of all renderers in the pipeline stacked on top of each other.
   * @ignore
   */
  get primaryColorFramebuffer() {
    return this._primaryColorFramebuffer;
  }
  /**
   * Returns the secondary color framebuffer,
   * which contains the secondary color framebuffers of all renderers in the pipeline stacked on top of each other.
   * @ignore
   */
  get secondaryColorFramebuffer() {
    return this._secondaryColorFramebuffer;
  }
  /**
   * Returns the inversion framebuffer,
   * which contains the inversion framebuffers of all renderers in the pipeline stacked on top of each other.
   * @ignore
   */
  get transformFramebuffer() {
    return this._transformFramebuffer;
  }
  /**
   * Returns the rotation framebuffer,
   * which contains the rotation framebuffers of all renderers in the pipeline stacked on top of each other.
   * @ignore
   */
  get rotationFramebuffer() {
    return this._rotationFramebuffer;
  }
  /**
   * Returns a boolean indicating whether any renderers are enabled in the pipeline.
   */
  get hasEnabledRenderers() {
    return this._hasEnabledRenderers;
  }
}
class QA {
  /**
   * Creates a new instance of the `P5Asciifier` class.
   * @param pluginRegistry The plugin registry instance.
   * @ignore
   */
  constructor(A) {
    /** Manages the font and provides methods to access font properties. */
    o(this, "_fontManager");
    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    o(this, "_grid");
    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers to asciify. */
    o(this, "_captureFramebuffer");
    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    o(this, "_rendererManager");
    /** The font size for the ASCII renderers. */
    o(this, "_fontSize", 16);
    /** The background color for the ASCII output, which is used to fill the space not covered by cells in the grid. */
    o(this, "_backgroundColor", "#000000");
    /** The `p5.js` instance. */
    o(this, "_p");
    /** Defines if the ASCII output should be rendered to the canvas or not. */
    o(this, "_renderToCanvas", !0);
    /** The plugin registry instance. */
    o(this, "_pluginRegistry");
    /** Indicates if the setup has been completed. */
    o(this, "_setupDone", !1);
    this._pluginRegistry = A;
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
  async init(A, e) {
    this._p = A, this._fontManager = new IA(A, e);
  }
  /**
   * Sets up the asciifier by initializing the font texture atlas, grid, and renderer manager.
   * 
   * There is no need to call this method manually if the asciifier is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
   * 
   * @ignore
   */
  async setup(A) {
    this._captureFramebuffer = A, M(this._p.VERSION, "2.0.0") < 0 ? this._fontManager.setup(this._fontSize) : await this._fontManager.setup(this._fontSize), this._grid = new PA(
      this._captureFramebuffer,
      this._fontManager.maxGlyphDimensions.width,
      this._fontManager.maxGlyphDimensions.height
    ), this._rendererManager = new dA(
      this._p,
      this._captureFramebuffer,
      this._grid,
      this._fontManager,
      this._pluginRegistry
    ), this._setupDone = !0;
  }
  /**
   * Renders the ASCII output to the canvas.
   * 
   * Automatically called after the user's `draw()` function has finished when managed by the {@link P5AsciifierManager} instance {@link p5asciify}.
   * 
   * @ignore
   */
  asciify() {
    this._rendererManager.render(this._captureFramebuffer), this._renderToCanvas && (this._rendererManager.hasEnabledRenderers ? (this._p.background(this._backgroundColor), this._p.image(this._rendererManager.asciiDisplayRenderer.resultFramebuffer, -(this._p.width / 2) + this._grid.offsetX, -(this._p.height / 2) + this._grid.offsetY)) : (this._p.clear(), this._p.image(this._captureFramebuffer, -(this._captureFramebuffer.width / 2), -(this._captureFramebuffer.height / 2))));
  }
  /**
   * Sets the font size for the ASCII renderers of the asciifier.
   * @param fontSize The font size to set.
   * @throws {@link P5AsciifyError} - If the font size is not a positive number.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the font size to 32 to use for all ASCII renderers of the asciifier.
   *      p5asciify.asciifier().fontSize(32);
   *  }
   * ```
   */
  fontSize(A) {
    if (typeof A != "number" || A <= 0)
      throw new g(`Invalid font size: ${A}. Expected a positive number.`);
    this._fontSize !== A && this._setupDone && (this._fontSize = A, this._fontManager.setFontSize(A), this._grid.resizeCellPixelDimensions(
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
  updateCaptureFramebuffer(A) {
    this._captureFramebuffer !== A && (this._captureFramebuffer = A, this._grid.updateTexture(A), this._rendererManager.updateCaptureFramebuffer(A));
  }
  /**
   * Sets the font for the ascii renderers in the rendering pipeline of the asciifier.
   * @param font The `p5.Font` object to use for ASCII rendering.
   * @param options An object containing options affecting what happens after the font is loaded.
   * @param options.updateCharacters If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer.
   *                                 This might cause an error if the new font does not contain the character sets used with the previous font.
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
  font(A, e = { updateCharacters: !0 }) {
    this._fontManager.font !== A && (this._fontManager.loadFont(A), this._setupDone && (this._fontManager.reset(), this._grid.resizeCellPixelDimensions(
      this._fontManager.maxGlyphDimensions.width,
      this._fontManager.maxGlyphDimensions.height
    ), e.updateCharacters && this._rendererManager.renderers.forEach(
      (r) => {
        r.renderer instanceof R && r.renderer.characters(r.renderer.options.characters);
      }
    ), this._rendererManager.resetRendererDimensions()));
  }
  /**
   * Sets the background color for the ascii renderers, occupying all the space not covered by cells in the grid. 
   * 
   * To make the background transparent, pass an appropriate color value with an alpha value of `0`.
   * 
   * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
   * @throws {@link P5AsciifyError} - If the color is not a string, array or `p5.Color`.
   * 
   * @example
   * ```javascript
   *  function setupAsciify() {
   *      // Set the background color to black.
   *      p5asciify.asciifier().background('#000000');
   *  }
   * ```
   */
  background(A) {
    if (typeof A != "string" && !Array.isArray(A) && !(A instanceof p.Color))
      throw new g(`Invalid color type: ${typeof A}. Expected string, array or p5.Color.`);
    this._backgroundColor = A;
  }
  /**
   * Sets the grid dimensions for the ASCII renderers. 
   * Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.
   * 
   * To make the grid dimensions responsive to the canvas size again, use the {@link gridResponsive} method.
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
   */
  gridDimensions(A, e) {
    this._grid.cols === A && this._grid.rows === e || (this._grid.resizeGridDimensions(A, e), this._rendererManager.resetRendererDimensions());
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
  gridResponsive(A = !0) {
    A ? this._grid.resetGridDimensions() : this._grid.fixedDimensions = !0;
  }
  /**
   * Saves the current ASCII output as an SVG file.
   * @param options The options for saving the SVG file.
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   * 
   * @example
   * ```javascript
   * function drawAsciify() {
   *     // Save the ASCII output as an SVG file with default options
   *     if (frameCount === 60) {
   *         p5asciify.asciifier().saveSVG("asciify_output");
   *     }
   *     
   *     // Save without cell background rectangles
   *     if (frameCount === 120) {
   *         p5asciify.asciifier().saveSVG({
   *             filename: "asciify_clean",
   *             includeBackgrounds: false
   *         });
   *     }
   * }
   * ```
   */
  saveSVG(A = {}) {
    new Z(this._p).saveSVG(
      this._rendererManager,
      this._grid,
      this._fontManager,
      this._backgroundColor,
      A
    );
  }
  /**
   * Returns the current ASCII output as an SVG string.
   * @param options Options for SVG generation (same as saveSVG options except filename)
   * @returns SVG string representation of the ASCII output
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   * 
   * @example
   * ```javascript
   *  function drawAsciify() {
   *      // Get the ASCII output as an SVG string
   *      if (frameCount === 60) {
   *          const svgString = p5asciify.asciifier().toSVG();
   *          console.log(svgString);
   *      }
   *      
   *      // Get SVG without background rectangles and in text mode
   *      if (frameCount === 120) {
   *          const svgString = p5asciify.asciifier().toSVG({
   *              includeBackgroundRectangles: false,
   *              drawMode: 'text'
   *          });
   *          console.log(svgString);
   *      }
   *  }
   * ```
   */
  toSVG(A = {}) {
    return new Z(this._p).generateSVG(
      this._rendererManager,
      this._grid,
      this._fontManager,
      this._backgroundColor,
      A
    );
  }
  /**
   * Saves the current ASCII output as a JSON file.
   * @param options The options for saving the JSON file.
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   */
  saveJSON(A = {}) {
    new q(this._p).saveJSON(
      this._rendererManager,
      this._grid,
      this._fontManager,
      A
    );
  }
  /**
   * Returns the current ASCII output as a JSON string.
   * @param options Options for JSON generation (same as saveJSON options except filename)
   * @returns JSON string representation of the ASCII output
   * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
   * 
   * @example
   * ```javascript
   *  function drawAsciify() {
   *      // Get the ASCII output as a JSON string
   *      if (frameCount === 60) {
   *          const jsonString = p5asciify.asciifier().toJSON();
   *          console.log(jsonString);
   *      }
   *      
   *      // Get JSON without empty cells and without pretty printing
   *      if (frameCount === 120) {
   *          const compactJson = p5asciify.asciifier().toJSON({
   *              includeEmptyCells: false,
   *              prettyPrint: false
   *          });
   *          console.log(compactJson);
   *      }
   *  }
   * ```
   */
  toJSON(A = {}) {
    return new q(this._p).generateJSON(
      this._rendererManager,
      this._grid,
      this._fontManager,
      A
    );
  }
  /**
   * Generates the ASCII output as an array of string rows.
   * @returns Array of strings representing ASCII output.
   * @throws {@link P5AsciifyError} - If no renderer is available.
   */
  _generateAsciiTextOutput() {
    const A = this._rendererManager.characterFramebuffer;
    if (!A)
      throw new g("No renderer available to generate ASCII output");
    A.loadPixels();
    const e = A.pixels, r = this._grid.cols, t = this._grid.rows, i = this._fontManager.characters, s = [];
    let n = 0;
    for (let E = 0; E < t; E++) {
      let h = "";
      for (let c = 0; c < r; c++) {
        const l = n * 4, f = e[l], a = e[l + 1];
        let B = f + (a << 8);
        B >= i.length && (B = i.length - 1), h += i[B].character, n++;
      }
      s.push(h);
    }
    return s;
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
  saveStrings(A) {
    if (!A) {
      const e = /* @__PURE__ */ new Date(), r = e.toISOString().split("T")[0], t = e.toTimeString().split(" ")[0].replace(/:/g, "-");
      A = `asciify_output_${r}_${t}`;
    }
    this._p.saveStrings(this._generateAsciiTextOutput(), `${A}.txt`);
  }
  /**
   * Sets whether the ASCII output should be rendered to the canvas or not.
   * 
   * If this is set to `false`, the canvas will remain clear/empty until you start drawing stuff again in `drawAsciify()` after the `draw()`function finishes.
   * This is because `p5.asciify` wraps your `draw()` loop inside a framebuffer's `begin()` and `end()`.
   * 
   * By default, this is set to `true`, meaning the ASCII output will be rendered to the canvas **after** the `draw()` function ends, 
   * but before the `drawAsciify()` function is called.
   * 
   * @param bool `true` to render to the canvas, `false` to not render.
   */
  renderToCanvas(A) {
    if (typeof A != "boolean")
      throw new g(`Invalid type for renderToCanvas: ${typeof A}. Expected boolean.`);
    this._renderToCanvas = A;
  }
  /**
   * Sets the background mode for the ASCII output.
   * 
   * If the mode is set to `fixed`, the background color set via {@link background} will be used for transparent cells.
   * 
   * If the mode is set to `sampled`, the background color will be sampled from the pixel data of the texture that is being captured.
   * 
   * @param mode The background mode to set. Can be either `"fixed"` or `"sampled"`.
   */
  backgroundMode(A = "fixed") {
    if (A !== "fixed" && A !== "sampled")
      throw new g(`Invalid background mode: ${A}. Expected "fixed" or "sampled".`);
    this._rendererManager.asciiDisplayRenderer.backgroundMode(A === "fixed" ? 0 : 1);
  }
  /**
   * Loads a JSON string or object and returns the framebuffers for the character, primary color, secondary color, transform, and rotation.
   * 
   * This method is useful for loading JSON exports from the {@link saveJSON} method in custom renderers.
   * The framebuffers match the dimensions of the grid defined in the JSON.
   * Each framebuffer contains the pixel data for the respective properties, 
   * which can be drawn to the respective custom renderers framebuffers via the `image()` function.
   * 
   * @param json The JSON string or object to load.
   * @returns An object containing the framebuffers for character, primary color, secondary color, transform, and rotation.
   * @throws {@link P5AsciifyError} - If the JSON format is invalid or unsupported.
   */
  loadJSON(A) {
    let e;
    try {
      e = typeof A == "string" ? JSON.parse(A) : A;
    } catch (a) {
      throw new g(`Invalid JSON format: ${a.message}`);
    }
    if (!e.metadata || !e.cells)
      throw new g("Invalid JSON format: missing metadata or cells");
    if (e.metadata.version !== "1.0")
      throw new g(`Unsupported JSON version: ${e.metadata.version}`);
    const r = e.metadata.gridSize, t = r.cols, i = r.rows, s = {
      width: t,
      height: i,
      antialias: !1,
      textureFiltering: this._p.NEAREST,
      depthFormat: this._p.UNSIGNED_INT
    }, n = this._p.createFramebuffer(s), E = this._p.createFramebuffer(s), h = this._p.createFramebuffer(s), c = this._p.createFramebuffer(s), l = this._p.createFramebuffer(s), f = (a, B, m, _) => {
      a.begin(), this._p.push(), this._p.noStroke(), this._p.fill(_);
      const P = B - t / 2 + 0.5, d = m - i / 2 + 0.5;
      this._p.rect(P, d, 1, 1), this._p.pop(), a.end();
    };
    for (const a of e.cells)
      if (!(a.x < 0 || a.y < 0 || a.x >= t || a.y >= i)) {
        if (a.character) {
          const B = this._fontManager.glyphColor(a.character);
          f(n, a.x, a.y, B);
        }
        if (a.color && f(E, a.x, a.y, a.color), a.backgroundColor && f(h, a.x, a.y, a.backgroundColor), a.rotation !== void 0) {
          const B = Math.round(a.rotation % 360 * 0.7083333333333334);
          f(l, a.x, a.y, B);
        }
        if (a.flipHorizontal !== void 0 || a.flipVertical !== void 0 || a.inverted !== void 0) {
          const B = a.inverted === !0, m = a.flipHorizontal === !0, _ = a.flipVertical === !0;
          f(c, a.x, a.y, [
            B ? 255 : 0,
            m ? 255 : 0,
            _ ? 255 : 0,
            255
          ]);
        }
      }
    return {
      characterFramebuffer: n,
      primaryColorFramebuffer: E,
      secondaryColorFramebuffer: h,
      transformFramebuffer: c,
      rotationFramebuffer: l
    };
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
   *      rect(0, 0, 10, 10);
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
   * Returns the {@link P5AsciifyGrid} instance, which contains information about grid properties.
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
   * Returns the ASCII output texture as a `p5.Framebuffer`, which can be used for further processing or rendering.
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
}
const x = class x {
  constructor() {
    o(this, "registeredHooks", /* @__PURE__ */ new Map());
    o(this, "p5AddonRegistered", !1);
    o(this, "hookHandlers", null);
    // Cache for user functions
    o(this, "_cachedSetupAsciifyFn", null);
    o(this, "_cachedDrawAsciifyFn", null);
    if (x._instance)
      throw new g("P5AsciifyHookManager is a singleton and cannot be instantiated multiple times.");
  }
  static getInstance() {
    return x._instance || (x._instance = new x()), x._instance;
  }
  /**
   * Initialize the hook manager with dependency injection
   * @param handlers The hook handlers that implement core functionality
   * @ignore
   */
  initialize(A) {
    this.hookHandlers = A, this._registerCoreHooks(), this._integrateWithP5();
  }
  /**
   * Register the core p5.asciify hooks using injected handlers
   * @private
   */
  _registerCoreHooks() {
    if (!this.hookHandlers)
      throw new g("Hook handlers must be provided before registering core hooks.");
    const A = this.hookHandlers, e = function() {
      return A.handleInit(this);
    };
    this.registerHook("init", e, !1);
    const r = function() {
      if (!(this._renderer.drawingContext instanceof WebGLRenderingContext || this._renderer.drawingContext instanceof WebGL2RenderingContext))
        throw new g("WebGL renderer is required for p5.asciify to run.");
      if (M(this.VERSION, "1.8.0") < 0)
        throw new g("p5.asciify requires p5.js v1.8.0 or higher to run.");
      if (M(this.VERSION, "2.0.0") >= 0)
        return (async () => {
          await A.handleSetup(this);
          const s = x.getInstance();
          s._cachedSetupAsciifyFn = this.setupAsciify || (this._isGlobal && typeof window < "u" && typeof window.setupAsciify == "function" ? window.setupAsciify : null), s._cachedDrawAsciifyFn = this.drawAsciify || (this._isGlobal && typeof window < "u" && typeof window.drawAsciify == "function" ? window.drawAsciify : null), typeof s._cachedSetupAsciifyFn == "function" && await s._cachedSetupAsciifyFn.call(this);
        })();
      {
        A.handleSetup(this);
        const s = x.getInstance();
        s._cachedSetupAsciifyFn = this.setupAsciify || (this._isGlobal && typeof window < "u" && typeof window.setupAsciify == "function" ? window.setupAsciify : null), s._cachedDrawAsciifyFn = this.drawAsciify || (this._isGlobal && typeof window < "u" && typeof window.drawAsciify == "function" ? window.drawAsciify : null), typeof s._cachedSetupAsciifyFn == "function" && s._cachedSetupAsciifyFn.call(this);
      }
    };
    this.registerHook("afterSetup", r, !1);
    const t = function() {
      A.handlePreDraw(this);
    };
    this.registerHook("pre", t, !1);
    const i = function() {
      A.handlePostDraw(this);
      const s = x.getInstance();
      typeof s._cachedDrawAsciifyFn == "function" && s._cachedDrawAsciifyFn.call(this);
    };
    this.registerHook("post", i, !1);
  }
  /**
   * Integrate with p5.js based on version
   * @private
   */
  _integrateWithP5() {
    typeof p > "u" || p.prototype && (M(p.prototype.VERSION, "2.0.0") >= 0 && typeof p.registerAddon == "function" ? this.p5AddonRegistered || (p.registerAddon(this._createP5Addon()), this.p5AddonRegistered = !0) : this._registerLegacyHooks());
  }
  /**
   * Create p5.js v2.0.0+ addon configuration
   * @private
   */
  _createP5Addon() {
    const A = this;
    return function(r, t, i) {
      i.presetup = async function() {
        const s = A.getHooks("init");
        for (const n of s)
          await n.fn.call(this);
      }, i.postsetup = async function() {
        const s = A.getHooks("afterSetup");
        for (const n of s)
          await n.fn.call(this);
      }, i.predraw = function() {
        const s = A.getHooks("pre");
        for (const n of s)
          n.fn.call(this);
      }, i.postdraw = function() {
        const s = A.getHooks("post");
        for (const n of s)
          n.fn.call(this);
      };
    };
  }
  /**
   * Register hooks with p5.js v1.x.x legacy system
   * @private
   */
  _registerLegacyHooks() {
    this.registeredHooks.forEach((A, e) => {
      A.registered || (p.prototype.registerMethod(e, A.proxyFn), A.registered = !0);
    });
  }
  /**
   * Register a hook function with proxy-based activation control
   * @param hookType The type of hook to register
   * @param fn The function to execute
   * @param isCore Whether this is a core hook (protected from deactivation)
   * @ignore
   */
  registerHook(A, e, r = !1) {
    if (this.registeredHooks.has(A))
      throw new g(`Hook '${A}' is already registered.`);
    const t = this, s = {
      originalFn: e,
      proxyFn: function() {
        const n = t.registeredHooks.get(A);
        if (n && n.active)
          return n.originalFn.call(this);
      },
      active: !0,
      // Start active by default
      isCore: r,
      registered: !1
    };
    this.registeredHooks.set(A, s);
  }
  /**
   * Activate a hook by setting its proxy to active
   * @param hookType The type of hook to activate
   */
  activateHook(A) {
    const e = this.registeredHooks.get(A);
    if (!e)
      throw new g(`Hook '${A}' not found.`);
    e.active = !0;
  }
  /**
   * Deactivate a hook by setting its proxy to inactive
   * @param hookType The type of hook to deactivate
   */
  deactivateHook(A) {
    const e = this.registeredHooks.get(A);
    if (!e)
      throw new g(`Hook '${A}' not found.`);
    if (e.isCore)
      throw new g(`Core hook '${A}' cannot be deactivated.`);
    e.active = !1;
  }
  /**
   * Check if a hook is currently active
   * @param hookType The type of hook to check
   * @returns Whether the hook is active
   */
  isHookActive(A) {
    const e = this.registeredHooks.get(A);
    return e ? e.active : !1;
  }
  /**
   * Get all hooks for a specific type (used internally by addon system)
   * @param hookType The type of hooks to retrieve
   * @returns Array of active hook functions
   * @ignore
   */
  getHooks(A) {
    const e = this.registeredHooks.get(A);
    return e && e.active ? [{ fn: e.originalFn }] : [];
  }
};
// Singleton pattern for easy access from addon config
o(x, "_instance", null);
let tA = x;
const EA = `data:font/truetype;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAABAAAgAQAAIAEAACABAAAAAQAAIAEAAAABAAAAAQAAIAEAAGABAAAAAQAAAAEAAAABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAEABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAQAAIAEAAAABAAAAAQAAAAEAACABAABAAQAAQAEAAEABAABAAQAAIAEAACABAAAAAQAAAAEAAAABAABAAQAAAAEAACABAAAAAQAAAAEAAIABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAYAEAAAABAAAAAQAAQAEAACABAAAAAQAAAAEAAAABAAAgAQAAIAEAACABAAAgAQAAIAEAAAABAABAAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAAAAAIAAAADAAAAFAADAAEAAASaAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAABwAAABIAAAAegAAALwAAADuAAAA9wAAARQAAAExAAABWgAAAW0AAAF7AAABhAAAAY0AAAGvAAAB0gAAAecAAAIOAAACNQAAAk8AAAJsAAACjgAAAqYAAALOAAAC5gAAAvQAAAMHAAADLgAAAzwAAANjAAADhQAAA6UAAAPCAAAD4AAAA/0AAAQaAAAEPAAABEwAAARrAAAEfgAABJEAAASpAAAE0AAABNsAAAT4AAAFFQAABS0AAAVDAAAFZQAABYcAAAWuAAAFvAAABc8AAAXnAAAGBAAABisAAAZDAAAGZQAABnMAAAaVAAAGowAABsUAAAbOAAAG3gAABvYAAAcMAAAHKQAABz8AAAdaAAAHbQAAB4oAAAedAAAHqwAAB8MAAAfgAAAH7gAACAsAAAgjAAAIOwAACFEAAAhsAAAIfAAACJkAAAi2AAAIzgAACOYAAAkDAAAJKgAACUIAAAlfAAAJfAAACYUAAAmiAAAJugAACdcAAAngAAAKBwAACi4AAApgAAAKeQAACokAAAq4AAAKwQAACs8AAArYAAAK8QAACw4AAAshAAALSAAAC1gAAAt1AAALjQAAC5sAAAu0AAALzQAAC9YAAAvhAAAL6gAAC/4AAAwRAAAMJAAADDQAAAxHAAAMUgAADGoAAAyCAAAMlwAADKUAAAy/AAAM0gAADN0AAAz8AAANDwAADSkAAA0yAAANTAAADVUAAA1jAAANfAAADYcAAA2VAAANqQAADcIAAA3mAAAN7wAADg4AAA4XAAAOQQAADloAAA5qAAAOcwAADoYAAA6PAAAOogAADrIAAA7FAAAPCwAADxsAAA8uAAAPRwAAD1AAAA+HAAAPoAAAD6kAAA/CAAAP3wAAD/wAABAZAAAQNgAAEE4AABBfAAAQlQAAEJ4AABCxAAAQugAAEOEAABEnAAARUwAAEWYAABF+AAARlgAAEbgAABJrAAASfgAAEpEAABKpAAASwQAAEswAABLcAAATCAAAExMAABMrAAATQwAAE1sAABNzAAATmgAAE8YAABPeAAAT5wAAE/AAABQSAAAUKgAAFEIAABRaAAAUYwAAFGwAABSOAAAUngAAFLsAABTYAAAU/wAAFSEAABVNAAAVZQAAFX0AABWVAAAVngAAFacAABXTAAAWBAAAFg0AABYvAAAWOgAAFkUAABZxAAAWhAAAFpIAABagAAAWrgAAFrwAABbVAAAW7QAAFxkAABd0AAAXzwAAF/wAABgUAAAYJQAAGC4AABhBAAAYXgAAGHEAABiYAAAYvAAAGOAAABkYAAAZPwAAGWYAABmNAAAZtAAAGdYAABn9AAAaEAAAGi0AAIBgACAAoAEAAADAAcAAAEBAQEBAQEBAYABAAAA/wAAAAEAAAD/AAQAAAD+AAAA/4AAAP8AAAAAAgEAAoADgAQAAAMABwAAAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8ABAAAAP6AAAABgAAA/oAAAAACAIAAgAQAA4AAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAABAAAAAIAAAP+AAAAAgAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAA/4AAAACAAQAAAACAAAADgAAA/4AAAACAAAD/gAAA/4AAAP8AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAABAAAAAIAAAP+A/wAAAAEAAAMAgACABAAEAAAbAB8AIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAABAAAAAIAAAP+AAAD/AAAA/4AAAP8AAAABAAAA/wAAAP+AAAAAgAAAAQD/gAAAAIAAAACAAAAAgAAABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAABQCAAIAEAAOAAAUAHQAjACkALwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAA/4AAAP+AAgABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r
`;
class uA {
  constructor() {
    // Map of plugin id to plugin instance
    o(this, "_plugins", /* @__PURE__ */ new Map());
  }
  /**
   * Registers a new renderer plugin.
   * @param plugin The renderer plugin to register
   * @throws {@link P5AsciifyError} - If a plugin with the same ID is already registered or conflicts with built-in renderers
   */
  register(A) {
    if (this._plugins.has(A.id))
      throw new g(`A plugin with ID '${A.id}' is already registered`);
    this._plugins.set(A.id, A);
  }
  /**
   * Check if a plugin with the given ID is registered
   * @param id Plugin ID to check
   * @returns True if the plugin exists, false otherwise
   */
  has(A) {
    return this._plugins.has(A);
  }
  /**
   * Get a plugin by its ID
   * @param id Plugin ID
   * @returns The plugin instance or undefined if not found
   */
  get(A) {
    return this._plugins.get(A);
  }
  /**
   * Unregister a plugin by its ID
   * @param id Plugin ID to remove
   * @returns True if the plugin was removed, false if it wasn't found
   */
  unregister(A) {
    return this._plugins.delete(A);
  }
  /**
   * Get all registered plugin IDs
   * @returns Array of plugin IDs
   */
  getIds() {
    return Array.from(this._plugins.keys());
  }
  /**
   * Get all registered plugins
   * @returns Array of plugin instances
   */
  getAll() {
    return Array.from(this._plugins.values());
  }
}
const T = class T {
  /**
   * Creates a new `P5AsciifierManager` instance.
   */
  constructor() {
    /** The p5.js instance used by the library. */
    o(this, "_p");
    /** The list of `P5Asciifier` instances managed by the library. */
    o(this, "_asciifiers");
    /** The base font used by the library. */
    o(this, "_baseFont");
    /** Contains the content that has been drawn to the `p5.js` canvas throughout the `draw()` loop. */
    o(this, "_sketchFramebuffer");
    /** The plugin registry instance. */
    o(this, "_pluginRegistry");
    /** The hook manager instance. */
    o(this, "_hookManager");
    o(this, "_setupDone", !1);
    if (T._instance)
      throw new g("P5AsciifierManager is a singleton and cannot be instantiated directly. Use P5AsciifierManager.getInstance() instead.");
    this._pluginRegistry = new uA(), this._asciifiers = [new QA(this._pluginRegistry)], this._hookManager = tA.getInstance(), this._hookManager.initialize(this);
  }
  /**
   * Gets the singleton instance of `P5AsciifierManager`.
   */
  static getInstance() {
    return T._instance || (T._instance = new T()), T._instance;
  }
  /**
   * Handle initialization hook
   * @ignore
   */
  async handleInit(A) {
    return await this.init(A);
  }
  /**
   * Handle setup hook
   * @ignore
   */
  async handleSetup(A) {
    return await this.setup();
  }
  /**
   * Handle pre-draw hook
   * @ignore
   */
  handlePreDraw(A) {
    this._sketchFramebuffer && (this._sketchFramebuffer.begin(), A.clear());
  }
  /**
   * Handle post-draw hook
   * @ignore
   */
  handlePostDraw(A) {
    this._sketchFramebuffer && (this._sketchFramebuffer.end(), this.asciify());
  }
  /**
   * Initializes the `p5.asciify` library by setting the `p5.js` instance.
   * 
   * For the provided {@link p5asciify} object this method is called automatically when the library is imported.
   * 
   * @param p The p5.js instance to use for the library.
   * @ignore
   */
  async init(A) {
    this._p = A, M(A.VERSION, "2.0.0") < 0 ? (A._isGlobal || (this._p.preload = () => {
    }), this._p._incrementPreload(), this._baseFont = A.loadFont(EA, (e) => {
      this._asciifiers.forEach((r) => {
        r.init(A, e);
      });
    })) : (this._baseFont = await this._p.loadFont(EA), await Promise.all(
      this._asciifiers.map((e) => e.init(A, this._baseFont))
    ));
  }
  /**
   * Sets up the `P5Asciifier` instances managed by the library.
   * 
   * For the provided {@link p5asciify} object this method is called automatically when the users `setup` function finished executing.
   * @ignore
   */
  async setup() {
    if (this._sketchFramebuffer = this._p.createFramebuffer({
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), M(this._p.VERSION, "2.0.0") < 0)
      for (const A of this._asciifiers)
        A.setup(this._sketchFramebuffer);
    else
      for (const A of this._asciifiers)
        await A.setup(this._sketchFramebuffer);
    this._setupDone = !0;
  }
  /**
   * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
   * 
   * For the provided {@link p5asciify} object this method is called automatically when the users `draw` function finished executing.
   * 
   * @ignore
   */
  asciify() {
    this._asciifiers.forEach((A) => {
      A.asciify();
    });
  }
  /**
   * Returns the `P5Asciifier` instance at the specified index.
   * 
   * When passing no arguments, the method returns the first `P5Asciifier` instance in the list, 
   * which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.
   * 
   * @param index The index of the `P5Asciifier` instance to return.
   * @returns The `P5Asciifier` instance at the specified index.
   * @throws {@link P5AsciifyError} If the index is out of bounds.
   */
  asciifier(A = 0) {
    if (A < 0 || A >= this._asciifiers.length)
      throw new g(`Invalid asciifier index: ${A}.`);
    return this._asciifiers[A];
  }
  /**
   * Adds a new `P5Asciifier` instance to the library.
   * @param framebuffer   The framebuffer to capture for ASCII conversion.
   *                      If not provided, the main canvas of the `p5.js` instance will be used.
   * @returns The newly created `P5Asciifier` instance.
   * @throws {@link P5AsciifyError} If the framebuffer is not an instance of `p5.Framebuffer`.
   */
  add(A) {
    if (!this._p)
      throw new g("Cannot add asciifier before initializing p5.asciify. Ensure p5.asciify is initialized first.");
    if (A !== void 0 && !(A instanceof p.Framebuffer))
      throw new g("Framebuffer must be an instance of p5.Framebuffer.");
    const e = new QA(this._pluginRegistry);
    return M(this._p.VERSION, "2.0.0") < 0 ? (e.init(this._p, this._baseFont), this._setupDone && e.setup(A || this._sketchFramebuffer), this._asciifiers.push(e), e) : (async () => (await e.init(this._p, this._baseFont), this._setupDone && this._sketchFramebuffer && await e.setup(A || this._sketchFramebuffer), this._asciifiers.push(e), e))();
  }
  /**
   * Removes a `P5Asciifier` instance.
   * @param indexOrAsciifier The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself.
   * @throws {@link P5AsciifyError} If the index is out of bounds or the specified asciifier is not found.
   */
  remove(A) {
    if (typeof A == "number") {
      const e = A;
      if (e < 0 || e >= this._asciifiers.length)
        throw new g(`Invalid asciifier index: ${e}.`);
      this._asciifiers.splice(e, 1);
    } else {
      const e = A, r = this._asciifiers.indexOf(e);
      if (r === -1)
        throw new g("The specified asciifier was not found.");
      this._asciifiers.splice(r, 1);
    }
  }
  /**
   * Register a new renderer plugin with p5.asciify
   * @param plugin The renderer plugin to register
   */
  registerPlugin(A) {
    this._pluginRegistry.register(A);
  }
  /**
   * Activate a registered hook
   * @param hookType The type of hook to activate
   */
  activateHook(A) {
    this._hookManager.activateHook(A);
  }
  /**
   * Deactivate a registered hook
   * @param hookType The type of hook to deactivate
   */
  deactivateHook(A) {
    this._hookManager.deactivateHook(A);
  }
  /**
   * Get the plugin registry
   * @returns The plugin registry instance
   */
  get pluginRegistry() {
    return this._pluginRegistry;
  }
  /**
   * Get the hook manager
   * @returns The hook manager instance
   */
  get hookManager() {
    return this._hookManager;
  }
  /**
   * Returns the list of `P5Asciifier` instances managed by the library.
   */
  get asciifiers() {
    return this._asciifiers;
  }
  /**
   * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
   * @ignore
   */
  get sketchFramebuffer() {
    return this._sketchFramebuffer;
  }
};
/** Singleton instance of the manager */
o(T, "_instance", null);
let iA = T;
const GA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BRIGHTNESS_DEFAULT_OPTIONS: eA,
  EDGE_DEFAULT_OPTIONS: rA,
  P5AsciifyAbstractFeatureRenderer2D: R,
  P5AsciifyBrightnessRenderer: oA,
  P5AsciifyEdgeRenderer: nA
}, Symbol.toStringTag, { value: "Module" })), kA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CUSTOM_DEFAULT_OPTIONS_2D: AA,
  P5AsciifyRenderer2D: N,
  feature: GA
}, Symbol.toStringTag, { value: "Module" })), HA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  P5AsciifyDisplayRenderer: fA,
  P5AsciifyRenderer: sA,
  P5AsciifyRendererManager: dA,
  RENDERER_TYPES: J,
  renderer2d: kA
}, Symbol.toStringTag, { value: "Module" })), NA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  P5AsciifyPluginRegistry: uA
}, Symbol.toStringTag, { value: "Module" })), TA = iA.getInstance(), YA = [
  ["_getImmediateModeShader", "_defaultImmediateModeShader"],
  ["_getNormalShader", "_defaultNormalShader"],
  ["_getColorShader", "_defaultColorShader"],
  ["_getPointShader", "_defaultPointShader"],
  ["_getLineShader", "_defaultLineShader"],
  ["_getFontShader", "_defaultFontShader"]
];
for (const [Q, A] of YA) {
  const e = p.RendererGL.prototype[Q];
  p.RendererGL.prototype[Q] = function() {
    return this[A] || (this[A] = e.call(this), this[A]._vertSrc = this[A]._vertSrc.replace(
      /mediump/g,
      "highp"
    ), this[A]._fragSrc = this[A]._fragSrc.replace(
      /mediump/g,
      "highp"
    )), this[A];
  };
}
typeof window < "u" && (window.p5asciify = TA, window.P5AsciifyAbstractFeatureRenderer2D = R, window.P5AsciifyRenderer2D = N, window.P5AsciifyRenderer = sA);
export {
  QA as P5Asciifier,
  iA as P5AsciifierManager,
  pA as P5AsciifyColorPalette,
  g as P5AsciifyError,
  IA as P5AsciifyFontManager,
  PA as P5AsciifyGrid,
  tA as P5AsciifyHookManager,
  TA as p5asciify,
  NA as plugins,
  HA as renderers,
  UA as utils
};
