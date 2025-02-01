import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyFontManager } from './FontManager';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { P5AsciifyError } from './AsciifyError';

/**
 * The main class for the `p5.asciify` library, 
 * responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.
 */
export class P5Asciifier {

    /** Manages the font and provides methods to access font properties. */
    private _fontManager!: P5AsciifyFontManager;

    /** Contains texture with all glyphs of the font set in the font manager. */
    private _fontTextureAtlas!: P5AsciifyFontTextureAtlas;

    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    private _grid!: P5AsciifyGrid;

    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers to asciify. */
    private _sketchFramebuffer!: p5.Framebuffer;

    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    private _rendererManager!: P5AsciifyRendererManager;

    /** The `p5.js` instance. */
    private _p!: p5;

    /**
     * Used to pass the p5 instance to the `p5.asciify` library in `INSTANCE` mode.
     * @param p The p5 instance
     */
    public instance(p: p5): void {
        this._p = p;

        if (!p.preload) {
            p.preload = () => { };
        }
    }

    public init(p: p5, fontBase64: string): void {
        this._p = p;
        this._fontManager = new P5AsciifyFontManager(this._p, fontBase64);
    }

    /**
     * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
     * 
     * Is called automatically after the user's `setup()` function has finished.
     */
    public setup(fontSize: number = 16): void {
        this._fontTextureAtlas = new P5AsciifyFontTextureAtlas(
            this._p,
            this._fontManager,
            fontSize
        );

        this._grid = new P5AsciifyGrid(
            this._p,
            this._fontTextureAtlas.maxGlyphDimensions.width,
            this._fontTextureAtlas.maxGlyphDimensions.height
        );

        this._rendererManager = new P5AsciifyRendererManager(
            this._p,
            this._grid,
            this._fontTextureAtlas
        );

        if (!this._sketchFramebuffer) {
            this._sketchFramebuffer = this._p.createFramebuffer({
                depthFormat: this._p.UNSIGNED_INT,
                textureFiltering: this._p.NEAREST
            });
        }
    }

    /**
     * Renders the ASCII output to the canvas.
     * 
     * Does not need to be called manually, 
     * as the library automatically wraps the user's `draw()` function and calls this method.
     */
    public asciify(): void {
        this._p.clear();

        if (this._rendererManager.renderers.length > 0) {
            this._rendererManager.render(this._sketchFramebuffer);
            this._p.image(this._rendererManager.resultFramebuffer, -this._p.width / 2, -this._p.height / 2);
        } else {
            this._p.image(this._sketchFramebuffer, -this._p.width / 2, -this._p.height / 2);
        }
    }

    /**
     * Sets the font size for the ASCII renderers.
     * @param fontSize The font size to set.
     */
    public fontSize(fontSize: number): void {
        if (this._p._setupDone) {
            this._fontTextureAtlas.setFontSize(fontSize);
            this._grid.resizeCellPixelDimensions(
                this._fontTextureAtlas.maxGlyphDimensions.width,
                this._fontTextureAtlas.maxGlyphDimensions.height
            );

            this._rendererManager.resetRendererDimensions();
        }
    }

    /**
     * Returns the renderer manager, containing all ASCII renderers in the rendering loop.
     * @returns The renderer manager.
     */
    public renderers(): P5AsciifyRendererManager {
        return this._rendererManager;
    }

    /**
     * Sets the font for the ascii renderers.
     * @param font The font to use. Can be a path, base64 string, or p5.Font object.
     * @param options An object containing options affecting what happens after the font is loaded.
     * @throws {@link P5AsciifyError} - If the font parameter is invalid or the font fails to load.
     */
    public loadFont(
        font: string | p5.Font,
        options: { "updateCharacters": true },
        onSuccess?: () => void,
    ): void {
        this._fontManager.loadFont(font, () => {

            if (this._p._setupDone) {

                this._fontTextureAtlas.reset();

                this._grid.resizeCellPixelDimensions(
                    this._fontTextureAtlas.maxGlyphDimensions.width,
                    this._fontTextureAtlas.maxGlyphDimensions.height
                );

                // Only update characters if option is true
                if (options.updateCharacters) {
                    this._rendererManager.renderers.forEach(renderer =>
                        renderer.renderer.characters(renderer.renderer.options.characters as string)
                    );
                }
            }

            onSuccess?.();
        });
    }

    /**
     * Sets the background color for the ascii renderers. 
     * 
     * Covers all the transparent space, including the edges of the canvas, which might not be covered by the grid of characters.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     */
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        this._rendererManager.background(color as p5.Color);
    }

    /**
     * Generates the ASCII output as an array of string rows.
     * @returns Array of strings representing ASCII output.
     * @throws {@link P5AsciifyError} - If no renderer is available.
     */
    private _generateAsciiTextOutput(): string[] {
        const lastRenderer = this._rendererManager.lastRenderer;
        if (!lastRenderer) {
            throw new P5AsciifyError('No renderer available to generate ASCII output');
        }

        // Load pixels from character framebuffer
        lastRenderer.characterFramebuffer.loadPixels();
        const asciiPixels = lastRenderer.characterFramebuffer.pixels;

        // Get grid dimensions
        const w = this._grid.cols;
        const h = this._grid.rows;

        // Get characters array from font texture atlas
        const chars = this._fontManager.characters;

        // Build text content
        const lines: string[] = [];
        let idx = 0;

        for (let y = 0; y < h; y++) {
            let line = '';
            for (let x = 0; x < w; x++) {
                const pixelIdx = idx * 4;

                // Get character index from red and green channels
                const r = asciiPixels[pixelIdx];
                const g = asciiPixels[pixelIdx + 1];
                let charIndex = r + (g << 8);

                // Clamp character index
                if (charIndex >= chars.length) {
                    charIndex = chars.length - 1;
                }

                line += chars[charIndex];
                idx++;
            }
            lines.push(line);
        }

        return lines;
    }

    /**
     * Returns the current ASCII output as a string
     * @returns Multi-line string representation of the ASCII art
     * @throws {@link P5AsciifyError} - If no renderer is available
     */
    public toString(): string {
        return this._generateAsciiTextOutput().join('\n');
    }

    /**
     * Saves the ASCII output to a text file.
     * @param filename The filename to save the text file as. If not provided, a default filename is generated.
     * @throws {@link P5AsciifyError} - If no renderer is available to save ASCII output.
     */
    public saveStrings(filename: string): void {
        if (!filename) {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            filename = `asciify_output_${date}_${time}`;
        }

        this._p.saveStrings(this._generateAsciiTextOutput(), `${filename}.txt`);
    }

    /**
     * Sets the p5.js fill color to the color of the given character in the font texture atlas.
     * 
     * This is useful when drawing to a custom renderers `characterFramebuffer`, 
     * which is used to convert the pixel data to ASCII characters.
     * 
     * @param character The character to get the color for.
     */
    fill(character: string): void {
        this._p.fill(this._fontManager.glyphColor(character));
    }

    /**
     * Returns the grid, which contains the dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions.
     */
    get grid(): P5AsciifyGrid { return this._grid; }

    /**
     * Returns the font texture atlas, which contains the texture with all glyphs of the font set in the font manager.
     */
    get fontTextureAtlas(): P5AsciifyFontTextureAtlas { return this._fontTextureAtlas; }

    /**
     * Returns the font manager, which manages the font and provides methods to access font properties
     */
    get fontManager(): P5AsciifyFontManager { return this._fontManager; }

    /**
     * Returns the sketch framebuffer, which contains the output of the user's `draw()` function.
     */
    get sketchFramebuffer(): p5.Framebuffer { return this._sketchFramebuffer; }

    /**
     * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
     * Can also be used via the p5.js `texture()` function.
     */
    get texture(): p5.Framebuffer { return this._rendererManager.resultFramebuffer; }
}