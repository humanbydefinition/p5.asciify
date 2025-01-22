import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { P5AsciifyError } from './AsciifyError';

/**
 * The main class for the `p5.asciify` library. 
 * 
 * Responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.
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
    public asciiFontTextureAtlas!: P5AsciifyFontTextureAtlas;

    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font size. */
    public grid!: P5AsciifyGrid;

    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers. */
    public sketchFramebuffer!: p5.Framebuffer;

    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    public rendererManager!: P5AsciifyRendererManager;

    /** The p5 instance. */
    private _p!: p5;

    /** The font to use for the ASCII rendering. */
    private _font!: p5.Font;

    /** The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. */
    private _backgroundColor: string | p5.Color | [number, number?, number?, number?] = "#000000";

    /** The font size to use for the ASCII rendering. */
    private _fontSize: number = 16;


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

    /**
     * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
     * 
     * Is called automatically after the user's `setup()` function has finished.
     */
    public setup(): void {
        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas(
            this._p,
            this._font,
            this._fontSize
        );

        this.grid = new P5AsciifyGrid(
            this._p,
            this.asciiFontTextureAtlas.maxGlyphDimensions.width,
            this.asciiFontTextureAtlas.maxGlyphDimensions.height
        );

        this.rendererManager = new P5AsciifyRendererManager(
            this._p,
            this.grid,
            this.asciiFontTextureAtlas
        );

        this.sketchFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
    }

    /**
     * Renders the ASCII output to the canvas.
     * 
     * Is called automatically every time the user's `draw()` function has finished.
     */
    public asciify(): void {
        this.rendererManager.render(this.sketchFramebuffer);

        this._p.clear();
        this._p.background(this._backgroundColor as p5.Color);
        this._p.image(this.rendererManager.lastRenderer.outputFramebuffer, -this._p.width / 2, -this._p.height / 2);
    }

    /**
     * Sets the font size for the ascii renderers.
     * @param fontSize The font size to set.
     * @throws {@link P5AsciifyError} - If the font size is out of bounds.
     */
    public fontSize(fontSize: number): void {

        if (fontSize < 1 || fontSize > 128) {
            throw new P5AsciifyError(`Font size ${fontSize} is out of bounds. It should be between 1 and 128.`);
        }

        this._fontSize = fontSize;

        if (this._p._setupDone) {
            this.asciiFontTextureAtlas.setFontSize(fontSize);
            this.grid.resizeCellPixelDimensions(
                this.asciiFontTextureAtlas.maxGlyphDimensions.width,
                this.asciiFontTextureAtlas.maxGlyphDimensions.height
            );

            this.rendererManager.resetRendererDimensions();
        }
    }

    /**
     * Returns the renderer manager, containing all ASCII renderers in the rendering loop.
     * @returns The renderer manager.
     */
    public renderers(): P5AsciifyRendererManager {
        return this.rendererManager;
    }

    /**
     * Sets the font for the ascii renderers.
     * @param font The font to use. Can be a path, base64 string, or p5.Font object.
     * @throws {@link P5AsciifyError} - If the font parameter is invalid or the font fails to load.
     */
    public loadFont(font: string | p5.Font) {
        if (typeof font !== 'string' && !(font instanceof p5.Font)) {
            throw new P5AsciifyError('Invalid font parameter. Expected a path, base64 string, or p5.Font object.');
        }

        if (typeof font === 'string') {
            this._p.loadFont(
                font,
                (loadedFont: p5.Font) => {
                    this._font = loadedFont;
                    this._p._decrementPreload();
                },
                () => { throw new P5AsciifyError(`Failed to load font from path: '${font}'`); }
            );
        } else {
            this._font = font;
        }

        if (this._p._setupDone) {
            this.asciiFontTextureAtlas.setFontObject(font as p5.Font);
            this.rendererManager.renderers.forEach(renderer => renderer.renderer.characters(renderer.renderer.options.characters as string));

            this.grid.resizeCellPixelDimensions(
                this.asciiFontTextureAtlas.maxGlyphDimensions.width,
                this.asciiFontTextureAtlas.maxGlyphDimensions.height
            );
        }
    }

    /**
     * Sets the background color for the ascii renderers. 
     * 
     * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     */
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        if (typeof color !== "string" && !Array.isArray(color) && !(color instanceof p5.Color)) {
            throw new P5AsciifyError(`Invalid color type: ${typeof color}. Expected string, array or p5.Color.`);
        }

        this._backgroundColor = color;
    }
}