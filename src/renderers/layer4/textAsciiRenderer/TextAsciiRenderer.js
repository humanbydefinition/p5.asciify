export default class TextAsciiRenderer {
    constructor(p5Instance, asciiFontTextureAtlas, grid, asciiRenderer, fontBase64, fontFileType, options) {
        this.p5 = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;
        this.grid = grid;
        this.asciiRenderer = asciiRenderer;
        this.options = options;
        this.fontBase64 = fontBase64;   // Base64 encoded font data (without data: prefix)
        this.fontFileType = fontFileType; // 'truetype' or 'opentype'

        this.updateColors();

        // Create a style element for @font-face
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

        // Create main container
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

        const asciiArtContainer = this.p5.createDiv('');
        asciiArtContainer.class('ascii-art-container');
        asciiArtContainer.parent(this.textAsciiRenderer);

        this.asciiArtContainer = asciiArtContainer;

        this.initializeLineDivs();
        this.initializeCharSpans();
    }

    updateFont(fontBase64, fontFileType) {
        this.fontBase64 = fontBase64;
        this.fontFileType = fontFileType;

        // Update the @font-face rule in the stored style element
        const fontName = 'AsciiFont';
        this.styleEl.textContent = `
            @font-face {
                font-family: '${fontName}';
                src: url(${this.fontBase64}) format('${this.fontFileType}');
                font-weight: normal;
                font-style: normal;
            }
        `;

        // Update the font-family style to ensure the new font is applied
        this.textAsciiRenderer.style('font-family', `'${fontName}', monospace`);

        // Optionally, update font size if necessary
        this.updateFontSize();
    }


    updateColors() {
        // Compute background and foreground colors based on invertMode
        this.backgroundColor = this.options.invertMode ? this.options.characterColor : this.options.backgroundColor;
        this.foregroundColor = this.options.invertMode ? this.options.backgroundColor : this.options.characterColor;

        if (this.textAsciiRenderer) {
            // Update the main container's background and text colors
            this.textAsciiRenderer.style('background-color', this.backgroundColor);
            this.textAsciiRenderer.style('color', this.foregroundColor);
        }
    }

    initializeLineDivs() {
        // Clear existing lineDivs
        this.lineDivs = [];
        const asciiArtContainer = this.asciiArtContainer;

        // Clear the container's existing content
        asciiArtContainer.html('');

        const h = this.grid.rows;

        for (let y = 0; y < h; y++) {
            const lineDiv = document.createElement('div');
            lineDiv.style.margin = '0';
            lineDiv.style.padding = '0';
            lineDiv.style.lineHeight = '1';
            lineDiv.style.fontFamily = 'inherit';
            lineDiv.style.fontSize = 'inherit';

            this.lineDivs.push(lineDiv);
            asciiArtContainer.elt.appendChild(lineDiv);
        }
    }

    toggleVisibility() {
        if (this.options.enabled) {
            this.textAsciiRenderer.style('display', 'flex');
        } else {
            this.textAsciiRenderer.hide();

            console.log("Hiding textAsciiRenderer");

        }
    }

    initializeCharSpans() {
        // Initialize the 2D array for character spans
        this.charSpans = [];
        const w = this.grid.cols;
        const h = this.grid.rows;

        for (let y = 0; y < h; y++) {
            const rowSpans = [];
            const lineDiv = this.lineDivs[y];
            // Clear any existing spans
            lineDiv.innerHTML = '';

            for (let x = 0; x < w; x++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = ' '; // Initialize with space
                lineDiv.appendChild(charSpan);
                rowSpans.push(charSpan);
            }

            this.charSpans.push(rowSpans);
        }
    }

    outputAsciiToHtml() {
        // Load pixel data from the asciiCharacterFramebuffer
        this.asciiRenderer.asciiCharacterFramebuffer.loadPixels();

        const w = this.grid.cols;
        const h = this.grid.rows;
        const asciiPixels = this.asciiRenderer.asciiCharacterFramebuffer.pixels;
        const chars = this.asciiFontTextureAtlas.characters; // Array of characters

        let idx = 0; // Index into pixels

        // Only load primaryColorPixels if per-character coloring is enabled
        let primaryColorPixels = null;
        if (this.options.characterColorMode === 0) {
            this.asciiRenderer.primaryColorSampleFramebuffer.loadPixels();
            primaryColorPixels = this.asciiRenderer.primaryColorSampleFramebuffer.pixels;
        }

        for (let y = 0; y < h; y++) {
            const rowSpans = this.charSpans[y];
            for (let x = 0; x < w; x++) {
                const pixelIdx = idx * 4;

                // Get the character index from asciiRenderer
                const r = asciiPixels[pixelIdx];
                const g = asciiPixels[pixelIdx + 1];
                let bestCharIndex = r + (g << 8); // Equivalent to r + g * 256
                if (bestCharIndex >= chars.length) bestCharIndex = chars.length - 1;
                const ch = chars[bestCharIndex];

                const charSpan = rowSpans[x];
                // Update character if changed
                if (charSpan.textContent !== ch) {
                    charSpan.textContent = ch;
                }

                if (this.options.characterColorMode === 0) {
                    // Sample color for each character
                    const colorR = primaryColorPixels[pixelIdx];
                    const colorG = primaryColorPixels[pixelIdx + 1];
                    const colorB = primaryColorPixels[pixelIdx + 2];

                    const newColor = `rgb(${colorR}, ${colorG}, ${colorB})`;

                    if (this.options.invertMode) {
                        // In invert mode, set per-character background color
                        if (charSpan.dataset.bgColor !== newColor) {
                            charSpan.style.backgroundColor = newColor;
                            charSpan.dataset.bgColor = newColor;
                        }
                        // Set text color to foregroundColor
                        if (charSpan.style.color !== this.foregroundColor) {
                            charSpan.style.color = this.foregroundColor;
                        }
                    } else {
                        // In normal mode, set per-character text color
                        if (charSpan.dataset.color !== newColor) {
                            charSpan.style.color = newColor;
                            charSpan.dataset.color = newColor;
                        }
                        // Clear per-character background color
                        if (charSpan.style.backgroundColor) {
                            charSpan.style.backgroundColor = '';
                            delete charSpan.dataset.bgColor;
                        }
                    }
                }

                idx++;
            }
        }
    }

    updateFontSize() {
        // Update the font size style of the renderer
        this.textAsciiRenderer.style('font-size', `${this.asciiFontTextureAtlas.fontSize}px`);

        this.updateDimensions();
    }


    updateInvertMode() {
        // Update colors based on new invertMode
        this.updateColors();

        // Update container styles
        this.textAsciiRenderer.style('background-color', this.backgroundColor);
        this.textAsciiRenderer.style('color', this.foregroundColor);

        // If per-character coloring is enabled, we need to update per-character styles
        if (this.options.characterColorMode === 0) {
            const w = this.grid.cols;
            const h = this.grid.rows;

            for (let y = 0; y < h; y++) {
                const rowSpans = this.charSpans[y];
                for (let x = 0; x < w; x++) {
                    const charSpan = rowSpans[x];
                    // Swap per-character styles
                    if (this.options.invertMode) {
                        // Move color to backgroundColor
                        if (charSpan.dataset.color) {
                            charSpan.style.backgroundColor = charSpan.dataset.color;
                            charSpan.dataset.bgColor = charSpan.dataset.color;
                            charSpan.style.color = this.foregroundColor;
                            delete charSpan.style.color;
                            delete charSpan.dataset.color;
                        }
                    } else {
                        // Move backgroundColor to color
                        if (charSpan.dataset.bgColor) {
                            charSpan.style.color = charSpan.dataset.bgColor;
                            charSpan.dataset.color = charSpan.dataset.bgColor;
                            charSpan.style.backgroundColor = '';
                            delete charSpan.dataset.bgColor;
                        }
                    }
                }
            }
        } else {
            // If per-character coloring is not enabled, ensure styles are cleared
            this.clearPerCharacterStyles();
        }
    }

    updateOptions(options) {
        this.options = {
            ...this.options,
            ...options,
        }
    }

    updateCharacterColor() {
        // Update colors based on new characterColor
        this.updateColors();

        // Update container styles
        this.textAsciiRenderer.style('background-color', this.backgroundColor);
        this.textAsciiRenderer.style('color', this.foregroundColor);

        // If per-character coloring is not enabled, ensure per-character styles are cleared
        if (this.options.characterColorMode !== 0) {
            this.clearPerCharacterStyles();
        }
    }

    updateBackgroundColor() {
        // Update colors based on new backgroundColor
        this.updateColors();

        // Update container styles
        this.textAsciiRenderer.style('background-color', this.backgroundColor);
        this.textAsciiRenderer.style('color', this.foregroundColor);

        // If per-character coloring is not enabled, ensure per-character styles are cleared
        if (this.options.characterColorMode !== 0) {
            this.clearPerCharacterStyles();
        }
    }

    updateCharacterColorMode() {
        // If per-character coloring is disabled, clear per-character styles
        if (this.options.characterColorMode !== 0) {
            this.clearPerCharacterStyles();
        }
    }

    clearPerCharacterStyles() {
        // Clear per-character styles
        const w = this.grid.cols;
        const h = this.grid.rows;

        for (let y = 0; y < h; y++) {
            const rowSpans = this.charSpans[y];
            for (let x = 0; x < w; x++) {
                const charSpan = rowSpans[x];
                if (charSpan.style.color) {
                    charSpan.style.color = '';
                    delete charSpan.dataset.color;
                }
                if (charSpan.style.backgroundColor) {
                    charSpan.style.backgroundColor = '';
                    delete charSpan.dataset.bgColor;
                }
            }
        }
    }

    updateDimensions() {
        this.initializeLineDivs();
        this.initializeCharSpans();
    }
}
