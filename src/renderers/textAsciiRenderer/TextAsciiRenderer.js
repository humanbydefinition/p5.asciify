export default class TextAsciiRenderer {
    constructor(p5Instance, asciiFontTextureAtlas, grid, fontBase64, fontFileType, options) {
        this.p5 = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;
        this.grid = grid;
        this.options = options;
        this.fontBase64 = fontBase64;
        this.fontFileType = fontFileType;

        this.updateColors();
        this.initFontFace();
        this.initMainContainer();
        this.initAsciiArtContainer();
        this.initCharacterGrids(); // Initializes lineDivs, charSpans, and previous colors
    }

    /* ---------------- Initialization Methods ---------------- */

    initFontFace() {
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

    initMainContainer() {
        const fontName = 'AsciiFont';
        this.textAsciiRenderer = this.p5.createDiv('');
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

    initAsciiArtContainer() {
        const asciiArtContainer = this.p5.createDiv('');
        asciiArtContainer.class('ascii-art-container');
        asciiArtContainer.parent(this.textAsciiRenderer);
        this.asciiArtContainer = asciiArtContainer;
    }

    initCharacterGrids() {
        this.initializeLineDivs();
        this.initializeCharSpans();
        this.initializePreviousColors();
    }

    /* ---------------- Color and Style Updates ---------------- */

    updateFont(fontBase64, fontFileType) {
        this.fontBase64 = fontBase64;
        this.fontFileType = fontFileType;

        const fontName = 'AsciiFont';
        this.styleEl.textContent = `
            @font-face {
                font-family: '${fontName}';
                src: url(${this.fontBase64}) format('${this.fontFileType}');
                font-weight: normal;
                font-style: normal;
            }
        `;
        this.textAsciiRenderer.style('font-family', `'${fontName}', monospace`);
    }

    updateColors() {
        this.backgroundColor = this.options.invertMode ? this.options.characterColor : this.options.backgroundColor;
        this.foregroundColor = this.options.invertMode ? this.options.backgroundColor : this.options.characterColor;

        if (this.textAsciiRenderer) {
            this.textAsciiRenderer.style('background-color', this.backgroundColor);
            this.textAsciiRenderer.style('color', this.foregroundColor);
        }
    }

    updateFontSize() {
        this.textAsciiRenderer.style('font-size', `${this.asciiFontTextureAtlas.fontSize}px`);
        this.updateDimensions();
    }

    updateInvertMode() {
        this.updateColors();
        this.applyContainerStyles();

        // The actual re-application of per-character styles happens on the next output cycle
        // So we typically just ensure we haven't left any invalid styles here.
        if (this.options.characterColorMode !== 0 && this.options.backgroundColorMode !== 0) {
            this.clearPerCharacterStyles();
        }
    }

    applyContainerStyles() {
        this.textAsciiRenderer.style('background-color', this.backgroundColor);
        this.textAsciiRenderer.style('color', this.foregroundColor);
    }

    updateOptions(options) {
        this.options = { ...this.options, ...options };
    }

    updateCharacterColor() {
        this.updateColors();
        this.applyContainerStyles();
        if (this.options.characterColorMode !== 0) this.clearPerCharacterStyles();
    }

    updateBackgroundColor() {
        this.updateColors();
        this.applyContainerStyles();
        if (this.options.characterColorMode !== 0) this.clearPerCharacterStyles();
    }

    updateCharacterColorMode() {
        if (this.options.characterColorMode !== 0) this.clearPerCharacterStyles();
    }

    /* ---------------- DOM and Data Structures ---------------- */

    initializeLineDivs() {
        this.lineDivs = [];
        this.asciiArtContainer.html('');
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

    initializeCharSpans() {
        this.charSpans = [];
        for (let y = 0; y < this.grid.rows; y++) {
            const rowSpans = [];
            const lineDiv = this.lineDivs[y];
            lineDiv.innerHTML = '';
            for (let x = 0; x < this.grid.cols; x++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = ' ';
                lineDiv.appendChild(charSpan);
                rowSpans.push(charSpan);
            }
            this.charSpans.push(rowSpans);
        }
    }

    initializePreviousColors() {
        const w = this.grid.cols;
        const h = this.grid.rows;
        this.previousTexts = Array.from({ length: h }, () => Array(w).fill(null));
        this.previousColors = Array.from({ length: h }, () => Array(w).fill(null));
        this.previousBgColors = Array.from({ length: h }, () => Array(w).fill(null));
    }

    /* ---------------- Main Rendering Logic ---------------- */

    outputAsciiToHtml(asciiRenderer) {
        asciiRenderer.asciiCharacterFramebuffer.loadPixels();
        const asciiPixels = asciiRenderer.asciiCharacterFramebuffer.pixels;

        const primaryColorPixels = this.getPixelsIfModeEnabled(this.options.characterColorMode, asciiRenderer.primaryColorSampleFramebuffer);
        const secondaryColorPixels = this.getPixelsIfModeEnabled(this.options.backgroundColorMode, asciiRenderer.secondaryColorSampleFramebuffer);

        let idx = 0;
        for (let y = 0; y < this.grid.rows; y++) {
            const rowSpans = this.charSpans[y];
            for (let x = 0; x < this.grid.cols; x++) {
                const pixelIdx = idx * 4;
                const ch = this.getCharacterFromPixels(asciiPixels, pixelIdx);

                const charSpan = rowSpans[x];
                this.updateCharSpanContent(x, y, ch, charSpan);

                // Apply character color mode
                if (this.options.characterColorMode === 0 && primaryColorPixels) {
                    this.applyPrimaryColorMode(charSpan, x, y, primaryColorPixels, pixelIdx);
                } else {
                    this.resetIfNotPrimaryMode(x, y, charSpan);
                }

                // Apply background color mode
                if (this.options.backgroundColorMode === 0 && secondaryColorPixels) {
                    this.applySecondaryColorMode(charSpan, x, y, secondaryColorPixels, pixelIdx);
                } else {
                    this.resetIfNotSecondaryMode(x, y, charSpan);
                }

                // If no per-char character color mode is active, ensure default text color
                this.applyDefaultColorIfNeeded(x, y, charSpan);

                idx++;
            }
        }
    }

    getPixelsIfModeEnabled(mode, framebuffer) {
        if (mode === 0) {
            framebuffer.loadPixels();
            return framebuffer.pixels;
        }
        return null;
    }

    getCharacterFromPixels(asciiPixels, pixelIdx) {
        const chars = this.asciiFontTextureAtlas.characters;
        const r = asciiPixels[pixelIdx];
        const g = asciiPixels[pixelIdx + 1];
        let bestCharIndex = r + (g << 8);
        if (bestCharIndex >= chars.length) bestCharIndex = chars.length - 1;
        return chars[bestCharIndex];
    }

    updateCharSpanContent(x, y, ch, charSpan) {
        if (this.previousTexts[y][x] !== ch) {
            charSpan.textContent = ch;
            this.previousTexts[y][x] = ch;
        }
    }

    /* ---------------- Color Application Helpers ---------------- */

    applyPrimaryColorMode(charSpan, x, y, primaryColorPixels, pixelIdx) {
        const newColor = this.rgbFromPixels(primaryColorPixels, pixelIdx);
        if (this.options.invertMode) {
            // Invert: primary color -> background, foregroundColor -> text
            this.updateBackgroundColorForCharSpan(x, y, charSpan, newColor);
            this.updateTextColorForCharSpan(x, y, charSpan, this.foregroundColor);
        } else {
            // Normal: primary color -> text
            this.updateTextColorForCharSpan(x, y, charSpan, newColor);
            this.clearBackgroundColorForCharSpan(x, y, charSpan);
        }
    }

    applySecondaryColorMode(charSpan, x, y, secondaryColorPixels, pixelIdx) {
        const newColor = this.rgbFromPixels(secondaryColorPixels, pixelIdx);
        if (this.options.invertMode) {
            // Invert: secondary color -> text
            this.updateTextColorForCharSpan(x, y, charSpan, newColor);
            // Clear background if previously set
            this.clearBackgroundColorForCharSpan(x, y, charSpan);
        } else {
            // Normal: secondary color -> background
            this.updateBackgroundColorForCharSpan(x, y, charSpan, newColor);
        }
    }

    applyDefaultColorIfNeeded(x, y, charSpan) {
        if (this.options.characterColorMode !== 0 && this.previousColors[y][x] !== this.foregroundColor) {
            this.updateTextColorForCharSpan(x, y, charSpan, this.foregroundColor);
        }
    }

    resetIfNotPrimaryMode(x, y, charSpan) {
        if (this.options.characterColorMode !== 0 && this.previousColors[y][x] !== null) {
            this.updateTextColorForCharSpan(x, y, charSpan, this.foregroundColor);
        }
    }

    resetIfNotSecondaryMode(x, y, charSpan) {
        if (this.options.backgroundColorMode !== 0 && this.previousBgColors[y][x] !== null) {
            this.clearBackgroundColorForCharSpan(x, y, charSpan);
        }
    }

    clearPerCharacterStyles() {
        for (let y = 0; y < this.grid.rows; y++) {
            for (let x = 0; x < this.grid.cols; x++) {
                const charSpan = this.charSpans[y][x];
                this.resetCharSpanColors(x, y, charSpan);
            }
        }
    }

    /* ---------------- Style Update Utility Methods ---------------- */

    rgbFromPixels(pixels, pixelIdx) {
        const r = pixels[pixelIdx];
        const g = pixels[pixelIdx + 1];
        const b = pixels[pixelIdx + 2];
        return `rgb(${r}, ${g}, ${b})`;
    }

    updateTextColorForCharSpan(x, y, charSpan, color) {
        if (this.previousColors[y][x] !== color) {
            charSpan.style.color = color;
            this.previousColors[y][x] = color;
        }
    }

    updateBackgroundColorForCharSpan(x, y, charSpan, color) {
        if (this.previousBgColors[y][x] !== color) {
            charSpan.style.backgroundColor = color;
            this.previousBgColors[y][x] = color;
        }
    }

    clearBackgroundColorForCharSpan(x, y, charSpan) {
        if (this.previousBgColors[y][x] !== null) {
            charSpan.style.backgroundColor = '';
            this.previousBgColors[y][x] = null;
        }
    }

    resetCharSpanColors(x, y, charSpan) {
        if (this.previousColors[y][x] !== null) {
            charSpan.style.color = '';
            this.previousColors[y][x] = null;
        }
        if (this.previousBgColors[y][x] !== null) {
            charSpan.style.backgroundColor = '';
            this.previousBgColors[y][x] = null;
        }
    }

    /* ---------------- Dimensions & Visibility ---------------- */

    updateDimensions() {
        this.initializeLineDivs();
        this.initializeCharSpans();
        this.initializePreviousColors();
    }

    toggleVisibility() {
        if (this.options.enabled) {
            this.textAsciiRenderer.style('display', 'flex');
        } else {
            this.textAsciiRenderer.hide();
        }
    }
}
