import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyFontManager } from './FontManager';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { P5AsciifyError } from './AsciifyError';

/**
 * The main class for the `p5.asciify` library, 
 * responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.
 * 
 * @remarks
 * The `P5Asciifier` class is initialized without any parameters.
 * 
 * Once the `p5.js` instance is available, the `instance()` method is called automatically in `GLOBAL` mode to pass the `p5` instance to the library.
 * 
 * In `INSTANCE` mode, the `instance()` method must be called manually to pass the `p5` instance to the library.
 * 
 * After the users `setup()` function has finished, the Asciifier's `setup()` method 
 * is called automatically to fully initialize the library.
 * 
 * At this point, the `p5.asciify` is fully functional and ready to interact with.
 */
export class P5Asciifier {
    /** Contains texture with all glyphs of a given font.*/
    private _fontTextureAtlas!: P5AsciifyFontTextureAtlas;

    private _fontManager!: P5AsciifyFontManager;

    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    private _grid!: P5AsciifyGrid;

    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers. */
    private _sketchFramebuffer!: p5.Framebuffer;

    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    private _rendererManager!: P5AsciifyRendererManager;

    /** The `p5.js` instance. */
    private _p!: p5;

    /** The font to use for the ASCII rendering. */
    private _font!: p5.Font;

    /** The font size to use for the ASCII rendering. */
    private _fontSize: number = 16;

    /**
     * Creates a new instance of the `P5Asciifier` class.
     * 
     * By default, `p5.asciify` creates an initial instance without any parameters, 
     * since this instance is special, capturing whatever is being drawn to the p5.js canvas through hooks.
     * 
     * If the user wants to an instance of this class to apply to a given framebuffer,
     * all parameters must be provided to the constructor.
     * @param p 
     * @param sketchFramebuffer 
     * @param font 
     */
    constructor(p?: p5, sketchFramebuffer?: p5.Framebuffer, font?: p5.Font) {
        if (p !== undefined && !(p instanceof p5)) {
            throw new P5AsciifyError('First parameter must be a p5 instance');
        }

        if (sketchFramebuffer !== undefined && !(sketchFramebuffer instanceof p5.Framebuffer)) {
            throw new P5AsciifyError('Second parameter must be a p5.Framebuffer instance');
        }

        if (font !== undefined && !(font instanceof p5.Font)) {
            throw new P5AsciifyError('Third parameter must be a p5.Font instance');
        }

        if (p) {
            this.instance(p, false);
        }

        if (sketchFramebuffer) {
            this._sketchFramebuffer = sketchFramebuffer;
        }

        if (font) {
            this._fontManager = new P5AsciifyFontManager(this._p, font);
        }

        if (p && sketchFramebuffer && font) {
            this.setup();
        }
    }

    /**
     * Used to pass the p5 instance to the `p5.asciify` library. 
     * 
     * @remarks
     * This method is called automatically in `GLOBAL` mode. In `INSTANCE` mode, it must be called manually at the start of the sketch.
     * 
     * In `GLOBAL` mode, `addDummyPreloadFunction` is set to `false` to prevent the p5 instance from adding a dummy preload function,
     * which is already added to `window` by the library.
     * 
     * In `INSTANCE` mode, `addDummyPreloadFunction` is set to `true` to add a dummy preload function to the p5 instance directly.
     * 
     * A dummy `preload` function is necessary in case the user does not provide one, since `p5.asciify` relies on the benefits of the `preload` function.
     * 
     * The implementation and difference with dummy `preload` definitions for `GLOBAL` and `INSTANCE` modes is questionable, but I haven't found a better solution yet.
     * 
     * @param p The p5 instance
     * @param addDummyPreloadFunction Whether to add a dummy preload function to the p5 instance
     */
    public instance(p: p5, addDummyPreloadFunction: boolean = true): void {
        this._p = p;

        if (!p.preload && addDummyPreloadFunction) {
            p.preload = () => { };
        }
    }

    public init(p: p5, addDummyPreloadFunction: boolean = true, fontBase64: string): void {
        this.instance(p, addDummyPreloadFunction);
        this._fontManager = new P5AsciifyFontManager(this._p, fontBase64);
    }

    /**
     * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
     * 
     * Is called automatically after the user's `setup()` function has finished.
     */
    public setup(): void {

        this._fontTextureAtlas = new P5AsciifyFontTextureAtlas(
            this._p,
            this._fontManager,
            this._fontSize
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
     * Is called automatically every time the user's `draw()` function has finished.
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
     * @throws {@link P5AsciifyError} - If the font size is out of bounds.
     */
    public fontSize(fontSize: number): void {

        if (fontSize < 1 || fontSize > 128) {
            throw new P5AsciifyError(`Font size ${fontSize} is out of bounds. It should be between 1 and 128.`);
        }

        this._fontSize = fontSize;

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
     * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     */
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        this._rendererManager.background(color as p5.Color);
    }

    /**
     * Generates ASCII art representation as string array
     * @private
     * @returns Array of strings representing ASCII art lines
     * @throws {@link P5AsciifyError} - If no renderer is available
     */
    private _generateAsciiLines(): string[] {
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
        return this._generateAsciiLines().join('\n');
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

        this._p.saveStrings(this._generateAsciiLines(), `${filename}.txt`);
    }

    /**
     * Sets the p5.js fill color to the color of the given character in the font texture atlas.
     * 
     * This is useful when drawing to a renderers `characterFramebuffer`, which is used to generate the ASCII output.
     * 
     * @param character The character to get the color for.
     */
    fill(character: string): void {
        this._p.fill(this._fontManager.glyphColor(character));
    }

    // Getter
    get sketchFramebuffer(): p5.Framebuffer { return this._sketchFramebuffer; }
    get grid(): P5AsciifyGrid { return this._grid; }
    get fontTextureAtlas(): P5AsciifyFontTextureAtlas { return this._fontTextureAtlas; }

    /**
     * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
     * Can also be used via the `texture()` method.
     */
    get texture(): p5.Framebuffer { return this._rendererManager.resultFramebuffer; }
}