export default class TextAsciiRenderer {

    constructor(p5Instance, asciiFontTextureAtlas, grid, asciiCharacterFramebuffer, options) {
        this.p5 = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;
        this.grid = grid;
        this.asciiCharacterFramebuffer = asciiCharacterFramebuffer;
        this.options = options;

        this.textNodes = [];

        this.textAsciiRenderer = this.p5.createDiv('');
        this.textAsciiRenderer.style('position', 'absolute');
        this.textAsciiRenderer.style('top', '0');
        this.textAsciiRenderer.style('left', '0');
        this.textAsciiRenderer.style('width', '100%');
        this.textAsciiRenderer.style('height', '100%');
        this.textAsciiRenderer.style('font-family', 'monospace');
        this.textAsciiRenderer.style('font-size', `${this.options.fontSize}px`);
        this.textAsciiRenderer.style('line-height', '1');
        this.textAsciiRenderer.style('@font-face', `
            font-family: 'UrsaFont';
            src: url('UrsaFont.ttf') format('opentype');
        `);
        this.textAsciiRenderer.style('font-family', 'UrsaFont');
        this.textAsciiRenderer.style('display', 'flex');
        this.textAsciiRenderer.style('justify-content', 'center');
        this.textAsciiRenderer.style('align-items', 'center');
        this.textAsciiRenderer.style('background-color', 'black');
        this.textAsciiRenderer.style('color', 'white');

        // Create a container div for ASCII art
        const asciiArtContainer = this.p5.createDiv('');
        asciiArtContainer.class('ascii-art-container');
        asciiArtContainer.parent(this.textAsciiRenderer);

        this.asciiArtContainer = asciiArtContainer;

        this.initializeTextNodes();
    }

    initializeTextNodes() {
        // Clear existing text nodes
        this.textNodes = [];
        const asciiArtContainer = this.asciiArtContainer;

        // Clear the container's existing content
        asciiArtContainer.html('');

        const w = this.grid.cols;
        const h = this.grid.rows;

        for (let y = 0; y < h; y++) {
            const lineDiv = document.createElement('div');
            lineDiv.style.display = 'block';
            lineDiv.style.margin = '0';
            lineDiv.style.padding = '0';
            lineDiv.style.lineHeight = '1';
            lineDiv.style.fontFamily = 'inherit';
            lineDiv.style.fontSize = 'inherit';

            for (let x = 0; x < w; x++) {
                const textNode = document.createTextNode(' ');
                lineDiv.appendChild(textNode);
                this.textNodes.push(textNode);
            }
            asciiArtContainer.elt.appendChild(lineDiv);
        }
    }

    outputAsciiToHtml() {
        // Load pixel data from the framebuffer
        this.asciiCharacterFramebuffer.loadPixels();

        const w = this.grid.cols;
        const h = this.grid.rows;
        const asciiPixels = this.asciiCharacterFramebuffer.pixels;
        const chars = this.asciiFontTextureAtlas.characters; // Array of characters

        let textNodeIndex = 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = 4 * (x + y * w);

                // Get the character index from asciiCharacterFramebuffer
                const r = asciiPixels[idx];
                const g = asciiPixels[idx + 1];
                let bestCharIndex = r + g * 256;
                if (bestCharIndex >= chars.length) bestCharIndex = chars.length - 1;
                const ch = chars[bestCharIndex];

                // Update the corresponding text node's data
                this.textNodes[textNodeIndex].data = ch;
                textNodeIndex++;
            }
        }
    }
}
