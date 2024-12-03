export default class TextAsciiRenderer {
    constructor(p5Instance, asciiFontTextureAtlas, grid, asciiRenderer, options) {
        this.p5 = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;
        this.grid = grid;
        this.asciiRenderer = asciiRenderer;
        this.options = options;

        // Store references to line divs and character spans
        this.lineDivs = [];
        this.charSpans = []; // 2D array: [row][col] = span

        // Create the main container for ASCII art
        this.textAsciiRenderer = this.p5.createDiv('');
        this.textAsciiRenderer.style('position', 'absolute');
        this.textAsciiRenderer.style('top', '0');
        this.textAsciiRenderer.style('left', '0');
        this.textAsciiRenderer.style('width', '100%');
        this.textAsciiRenderer.style('height', '100%');
        this.textAsciiRenderer.style('font-family', 'UrsaFont, monospace');
        this.textAsciiRenderer.style('font-size', `${this.asciiFontTextureAtlas.fontSize}px`);
        this.textAsciiRenderer.style('line-height', '1');
        this.textAsciiRenderer.style('display', 'flex');
        this.textAsciiRenderer.style('justify-content', 'center');
        this.textAsciiRenderer.style('align-items', 'center');
        this.textAsciiRenderer.style('white-space', 'pre');
        this.textAsciiRenderer.style('background-color', this.options.backgroundColor);
        this.textAsciiRenderer.style('color', this.options.characterColor);

        // Create a container div for ASCII art
        const asciiArtContainer = this.p5.createDiv('');
        asciiArtContainer.class('ascii-art-container');
        asciiArtContainer.parent(this.textAsciiRenderer);

        this.asciiArtContainer = asciiArtContainer;

        this.initializeLineDivs();
        this.initializeCharSpans();
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
            this.lineDivs.push(lineDiv);
            asciiArtContainer.elt.appendChild(lineDiv);
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
                    // Get the primary color from primaryColorPixels
                    const colorR = primaryColorPixels[pixelIdx];
                    const colorG = primaryColorPixels[pixelIdx + 1];
                    const colorB = primaryColorPixels[pixelIdx + 2];

                    // Update color if changed
                    const newColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
                    if (charSpan.style.color !== newColor) {
                        charSpan.style.color = newColor;
                    }
                } 

                idx++;
            }
        }
    }

    updateDimensions() {
        this.initializeLineDivs();
        this.initializeCharSpans();
    }
}
