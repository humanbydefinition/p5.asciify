import p5 from 'p5';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
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
export declare class P5Asciifier {
    /** Contains texture with all glyphs of a given font.*/
    private _fontTextureAtlas;
    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    private _grid;
    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers. */
    private _sketchFramebuffer;
    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    private _rendererManager;
    /** The `p5.js` instance. */
    private _p;
    /** The font to use for the ASCII rendering. */
    private _font;
    /** The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. */
    private _backgroundColor;
    /** The font size to use for the ASCII rendering. */
    private _fontSize;
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
    instance(p: p5, addDummyPreloadFunction?: boolean): void;
    /**
     * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
     *
     * Is called automatically after the user's `setup()` function has finished.
     */
    setup(): void;
    /**
     * Renders the ASCII output to the canvas.
     *
     * Is called automatically every time the user's `draw()` function has finished.
     */
    asciify(): void;
    /**
     * Sets the font size for the ASCII renderers.
     * @param fontSize The font size to set.
     * @throws {@link P5AsciifyError} - If the font size is out of bounds.
     */
    fontSize(fontSize: number): void;
    /**
     * Returns the renderer manager, containing all ASCII renderers in the rendering loop.
     * @returns The renderer manager.
     */
    renderers(): P5AsciifyRendererManager;
    /**
     * Sets the font for the ascii renderers.
     * @param font The font to use. Can be a path, base64 string, or p5.Font object.
     * @throws {@link P5AsciifyError} - If the font parameter is invalid or the font fails to load.
     */
    loadFont(font: string | p5.Font): void;
    /**
     * Sets the background color for the ascii renderers.
     *
     * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     */
    background(color: string | p5.Color | [number, number?, number?, number?]): void;
    get sketchFramebuffer(): p5.Framebuffer;
}
