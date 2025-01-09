/**************************************************
 * Type Definitions & Imports
 **************************************************/

import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGrid } from '../../Grid';
import { AsciiRenderer } from '../AsciiRenderer';

interface TextAsciiRendererOptions {
  enabled: boolean;
  invertMode: boolean;
  characterColor: string;
  backgroundColor: string;
  characterColorMode: number;
  backgroundColorMode: number;
}

export default class TextAsciiRenderer {
  private p: p5;
  private asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
  private grid: P5AsciifyGrid;
  private options: TextAsciiRendererOptions;

  private fontBase64: string;
  private fontFileType: string;

  private backgroundColor: string = '';
  private foregroundColor: string = '';

  private styleEl: HTMLStyleElement | null = null;
  private textAsciiRenderer: p5.Element | null = null;
  private asciiArtContainer: p5.Element | null = null;

  // DOM references
  private lineDivs: HTMLDivElement[] = [];
  private charSpans: HTMLSpanElement[][] = [];

  // Internal caches of previously rendered data
  private previousTexts: Array<Array<string | null>> = [];
  private previousColors: Array<Array<string | null>> = [];
  private previousBgColors: Array<Array<string | null>> = [];

  constructor(
    p5Instance: p5,
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas,
    grid: P5AsciifyGrid,
    fontBase64: string,
    fontFileType: string,
    options: TextAsciiRendererOptions,
  ) {
    this.p = p5Instance;
    this.asciiFontTextureAtlas = asciiFontTextureAtlas;
    this.grid = grid;
    this.fontBase64 = fontBase64;
    this.fontFileType = fontFileType;
    this.options = options;

    this.updateColors();
    this.initFontFace();
    this.initMainContainer();
    this.initAsciiArtContainer();
    this.initCharacterGrids();
  }

  /**************************************************
   * Initialization Methods
   **************************************************/

  private initFontFace(): void {
    const fontName = 'AsciiFont';
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @font-face {
        font-family: '${fontName}';
        src: url(${this.fontBase64}) format('${this.fontFileType}');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(styleEl);
    this.styleEl = styleEl;
  }

  private initMainContainer(): void {
    const fontName = 'AsciiFont';
    // Create the container with p5's createDiv
    this.textAsciiRenderer = this.p.createDiv('');
    this.textAsciiRenderer.style('position', 'absolute');
    this.textAsciiRenderer.style('top', '0');
    this.textAsciiRenderer.style('left', '0');
    this.textAsciiRenderer.style('width', '100%');
    this.textAsciiRenderer.style('height', '100%');
    this.textAsciiRenderer.style('font-family', `'${fontName}', monospace`);
    this.textAsciiRenderer.style('font-size', `${this.asciiFontTextureAtlas.fontSize}px`);
    this.textAsciiRenderer.style('line-height', '1');
    this.textAsciiRenderer.style('display', 'flex');
    this.textAsciiRenderer.style('justify-content', 'center');
    this.textAsciiRenderer.style('align-items', 'center');
    this.textAsciiRenderer.style('white-space', 'pre');
    this.textAsciiRenderer.style('background-color', this.backgroundColor);
    this.textAsciiRenderer.style('color', this.foregroundColor);

    if (!this.options.enabled) {
      this.textAsciiRenderer.hide();
    }
  }

  private initAsciiArtContainer(): void {
    if (!this.textAsciiRenderer) return;
    // Create a sub-container for the ASCII art lines
    const asciiArtContainer = this.p.createDiv('');
    asciiArtContainer.class('ascii-art-container');
    asciiArtContainer.parent(this.textAsciiRenderer);
    this.asciiArtContainer = asciiArtContainer;
  }

  private initCharacterGrids(): void {
    this.initializeLineDivs();
    this.initializeCharSpans();
    this.initializePreviousColors();
  }

  /**************************************************
   * Color and Style Updates
   **************************************************/

  public updateOptions(options: Partial<TextAsciiRendererOptions>): void {
    this.options = { ...this.options, ...options };

    if (!this.p._setupDone) {
      return;
    }

    if (options?.characterColorMode !== undefined) {
      this.updateCharacterColorMode();
    }

    if (options?.characterColor !== undefined) {
      this.updateCharacterColor();
    }

    if (options?.backgroundColor !== undefined) {
      this.updateBackgroundColor();
    }

    if (options?.invertMode !== undefined) {
      this.updateInvertMode();
    }

    if (options?.enabled !== undefined) {
      this.toggleVisibility();
    }
  }

  public updateFont(fontBase64: string, fontFileType: string): void {
    this.fontBase64 = fontBase64;
    this.fontFileType = fontFileType;

    const fontName = 'AsciiFont';
    if (this.styleEl) {
      this.styleEl.textContent = `
        @font-face {
          font-family: '${fontName}';
          src: url(${this.fontBase64}) format('${this.fontFileType}');
          font-weight: normal;
          font-style: normal;
        }
      `;
    }

    this.textAsciiRenderer?.style('font-family', `'${fontName}', monospace`);
  }

  public updateColors(): void {
    // Switch foreground/background color depending on invertMode
    this.backgroundColor = this.options.invertMode
      ? this.options.characterColor
      : this.options.backgroundColor;
    this.foregroundColor = this.options.invertMode
      ? this.options.backgroundColor
      : this.options.characterColor;

    if (this.textAsciiRenderer) {
      this.textAsciiRenderer.style('background-color', this.backgroundColor);
      this.textAsciiRenderer.style('color', this.foregroundColor);
    }
  }

  public updateFontSize(): void {
    this.textAsciiRenderer?.style('font-size', `${this.asciiFontTextureAtlas.fontSize}px`);

    console.log("Font size updated to: ", this.asciiFontTextureAtlas.fontSize);

    this.updateDimensions();
  }

  public updateInvertMode(): void {
    this.updateColors();
    this.applyContainerStyles();

    // Force clearing per-character styles if both color modes are enabled
    // so that the next frame re-applies correct colors
    if (this.options.characterColorMode !== 0 && this.options.backgroundColorMode !== 0) {
      this.clearPerCharacterStyles();
    }
  }

  private applyContainerStyles(): void {
    this.textAsciiRenderer?.style('background-color', this.backgroundColor);
    this.textAsciiRenderer?.style('color', this.foregroundColor);
  }

  public updateCharacterColor(): void {
    this.updateColors();
    this.applyContainerStyles();
    if (this.options.characterColorMode !== 0) {
      this.clearPerCharacterStyles();
    }
  }

  public updateBackgroundColor(): void {
    this.updateColors();
    this.applyContainerStyles();
    if (this.options.characterColorMode !== 0) {
      this.clearPerCharacterStyles();
    }
  }

  public updateCharacterColorMode(): void {
    if (this.options.characterColorMode !== 0) {
      this.clearPerCharacterStyles();
    }
  }

  /**************************************************
   * DOM and Data Structures
   **************************************************/

  private initializeLineDivs(): void {
    if (!this.asciiArtContainer) return;
    this.lineDivs = [];
    this.asciiArtContainer.html(''); // Clear any previous content

    for (let y = 0; y < this.grid.rows; y++) {
      const lineDiv = document.createElement('div');
      lineDiv.style.margin = '0';
      lineDiv.style.padding = '0';
      lineDiv.style.lineHeight = '1';
      lineDiv.style.fontFamily = 'inherit';
      lineDiv.style.fontSize = 'inherit';

      this.lineDivs.push(lineDiv);
      this.asciiArtContainer.elt.appendChild(lineDiv);
    }
  }

  private initializeCharSpans(): void {
    this.charSpans = [];
    for (let y = 0; y < this.grid.rows; y++) {
      const rowSpans: HTMLSpanElement[] = [];
      const lineDiv = this.lineDivs[y];
      lineDiv.innerHTML = ''; // clear existing content for that line

      for (let x = 0; x < this.grid.cols; x++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = ' ';
        lineDiv.appendChild(charSpan);
        rowSpans.push(charSpan);
      }
      this.charSpans.push(rowSpans);
    }
  }

  private initializePreviousColors(): void {
    const w = this.grid.cols;
    const h = this.grid.rows;
    this.previousTexts = Array.from({ length: h }, () => Array(w).fill(null));
    this.previousColors = Array.from({ length: h }, () => Array(w).fill(null));
    this.previousBgColors = Array.from({ length: h }, () => Array(w).fill(null));
  }

  /**************************************************
   * Main Rendering Logic
   **************************************************/

  public outputAsciiToHtml(asciiRenderer: AsciiRenderer): void {
    // 1) Load ASCII character data
    asciiRenderer.asciiCharacterFramebuffer.loadPixels();
    const asciiPixels = asciiRenderer.asciiCharacterFramebuffer.pixels;

    // 2) Load color data if color mode requires it
    const primaryColorPixels = this.getPixelsIfModeEnabled(
      this.options.characterColorMode,
      asciiRenderer.primaryColorSampleFramebuffer,
    );
    const secondaryColorPixels = this.getPixelsIfModeEnabled(
      this.options.backgroundColorMode,
      asciiRenderer.secondaryColorSampleFramebuffer,
    );

    // 3) Iterate through each cell
    let idx = 0;
    for (let y = 0; y < this.grid.rows; y++) {
      const rowSpans = this.charSpans[y];
      for (let x = 0; x < this.grid.cols; x++) {
        const pixelIdx = idx * 4;
        const ch = this.getCharacterFromPixels(asciiPixels, pixelIdx);

        // Update charSpan text if needed
        const charSpan = rowSpans[x];
        this.updateCharSpanContent(x, y, ch, charSpan);

        // Apply per-character color mode
        if (this.options.characterColorMode === 0 && primaryColorPixels) {
          this.applyPrimaryColorMode(charSpan, x, y, primaryColorPixels, pixelIdx);
        } else {
          this.resetIfNotPrimaryMode(x, y, charSpan);
        }

        // Apply per-character background color mode
        if (this.options.backgroundColorMode === 0 && secondaryColorPixels) {
          this.applySecondaryColorMode(charSpan, x, y, secondaryColorPixels, pixelIdx);
        } else {
          this.resetIfNotSecondaryMode(x, y, charSpan);
        }

        // If no per-character color mode is active, ensure default color
        this.applyDefaultColorIfNeeded(x, y, charSpan);

        idx++;
      }
    }
  }

  private getPixelsIfModeEnabled(
    mode: number,
    framebuffer: p5.Framebuffer,
  ): Uint8ClampedArray | null {
    if (mode === 0) {
      framebuffer.loadPixels();
      return framebuffer.pixels;
    }
    return null;
  }

  private getCharacterFromPixels(asciiPixels: Uint8ClampedArray, pixelIdx: number): string {
    const chars = this.asciiFontTextureAtlas.characters;
    const r = asciiPixels[pixelIdx];
    const g = asciiPixels[pixelIdx + 1];

    // The shader logic apparently encodes the final character index in r + (g << 8)
    let bestCharIndex = r + (g << 8);
    if (bestCharIndex >= chars.length) {
      bestCharIndex = chars.length - 1;
    }
    return chars[bestCharIndex];
  }

  private updateCharSpanContent(
    x: number,
    y: number,
    ch: string,
    charSpan: HTMLSpanElement,
  ): void {
    if (this.previousTexts[y][x] !== ch) {
      charSpan.textContent = ch;
      this.previousTexts[y][x] = ch;
    }
  }

  /**************************************************
   * Color Application Helpers
   **************************************************/

  private applyPrimaryColorMode(
    charSpan: HTMLSpanElement,
    x: number,
    y: number,
    primaryColorPixels: Uint8ClampedArray,
    pixelIdx: number,
  ): void {
    const newColor = this.rgbFromPixels(primaryColorPixels, pixelIdx);
    if (this.options.invertMode) {
      // Invert: primary color -> background, foreground -> text
      this.updateBackgroundColorForCharSpan(x, y, charSpan, newColor);
      this.updateTextColorForCharSpan(x, y, charSpan, this.foregroundColor);
    } else {
      // Normal: primary color -> text
      this.updateTextColorForCharSpan(x, y, charSpan, newColor);
      this.clearBackgroundColorForCharSpan(x, y, charSpan);
    }
  }

  private applySecondaryColorMode(
    charSpan: HTMLSpanElement,
    x: number,
    y: number,
    secondaryColorPixels: Uint8ClampedArray,
    pixelIdx: number,
  ): void {
    const newColor = this.rgbFromPixels(secondaryColorPixels, pixelIdx);
    if (this.options.invertMode) {
      // Invert: secondary color -> text
      this.updateTextColorForCharSpan(x, y, charSpan, newColor);
      this.clearBackgroundColorForCharSpan(x, y, charSpan);
    } else {
      // Normal: secondary color -> background
      this.updateBackgroundColorForCharSpan(x, y, charSpan, newColor);
    }
  }

  private applyDefaultColorIfNeeded(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
  ): void {
    if (
      this.options.characterColorMode !== 0 &&
      this.previousColors[y][x] !== this.foregroundColor
    ) {
      this.updateTextColorForCharSpan(x, y, charSpan, this.foregroundColor);
    }
  }

  private resetIfNotPrimaryMode(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
  ): void {
    if (this.options.characterColorMode !== 0 && this.previousColors[y][x] !== null) {
      this.updateTextColorForCharSpan(x, y, charSpan, this.foregroundColor);
    }
  }

  private resetIfNotSecondaryMode(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
  ): void {
    if (this.options.backgroundColorMode !== 0 && this.previousBgColors[y][x] !== null) {
      this.clearBackgroundColorForCharSpan(x, y, charSpan);
    }
  }

  private clearPerCharacterStyles(): void {
    for (let y = 0; y < this.grid.rows; y++) {
      for (let x = 0; x < this.grid.cols; x++) {
        const charSpan = this.charSpans[y][x];
        this.resetCharSpanColors(x, y, charSpan);
      }
    }
  }

  /**************************************************
   * Style Update Utility Methods
   **************************************************/

  private rgbFromPixels(pixels: Uint8ClampedArray, pixelIdx: number): string {
    const r = pixels[pixelIdx];
    const g = pixels[pixelIdx + 1];
    const b = pixels[pixelIdx + 2];
    return `rgb(${r}, ${g}, ${b})`;
  }

  private updateTextColorForCharSpan(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
    color: string,
  ): void {
    if (this.previousColors[y][x] !== color) {
      charSpan.style.color = color;
      this.previousColors[y][x] = color;
    }
  }

  private updateBackgroundColorForCharSpan(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
    color: string,
  ): void {
    if (this.previousBgColors[y][x] !== color) {
      charSpan.style.backgroundColor = color;
      this.previousBgColors[y][x] = color;
    }
  }

  private clearBackgroundColorForCharSpan(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
  ): void {
    if (this.previousBgColors[y][x] !== null) {
      charSpan.style.backgroundColor = '';
      this.previousBgColors[y][x] = null;
    }
  }

  private resetCharSpanColors(
    x: number,
    y: number,
    charSpan: HTMLSpanElement,
  ): void {
    if (this.previousColors[y][x] !== null) {
      charSpan.style.color = '';
      this.previousColors[y][x] = null;
    }
    if (this.previousBgColors[y][x] !== null) {
      charSpan.style.backgroundColor = '';
      this.previousBgColors[y][x] = null;
    }
  }

  /**************************************************
   * Dimensions & Visibility
   **************************************************/

  public updateDimensions(): void {
    this.initializeLineDivs();
    this.initializeCharSpans();
    this.initializePreviousColors();
  }

  public toggleVisibility(): void {
    if (!this.textAsciiRenderer) return;
    if (this.options.enabled) {
      this.textAsciiRenderer.style('display', 'flex');
    } else {
      this.textAsciiRenderer.hide();
    }
  }
}
