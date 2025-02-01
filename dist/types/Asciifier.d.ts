import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
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
    private _fontManager;
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
    /** The font size to use for the ASCII rendering. */
    private _fontSize;
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
    constructor(p?: p5, sketchFramebuffer?: p5.Framebuffer, font?: p5.Font);
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
    init(p: p5, addDummyPreloadFunction: boolean | undefined, fontBase64: string): void;
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
    loadFont(font: string | p5.Font, options: {
        "updateCharacters": true;
    }, onSuccess?: () => void): void;
    /**
     * Sets the background color for the ascii renderers.
     *
     * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     */
    background(color: string | p5.Color | [number, number?, number?, number?]): void;
    /**
     * Generates ASCII art representation as string array
     * @private
     * @returns Array of strings representing ASCII art lines
     * @throws {@link P5AsciifyError} - If no renderer is available
     */
    private _generateAsciiLines;
    /**
     * Returns the current ASCII output as a string
     * @returns Multi-line string representation of the ASCII art
     * @throws {@link P5AsciifyError} - If no renderer is available
     */
    toString(): string;
    /**
     * Saves the ASCII output to a text file.
     * @param filename The filename to save the text file as. If not provided, a default filename is generated.
     * @throws {@link P5AsciifyError} - If no renderer is available to save ASCII output.
     */
    saveStrings(filename: string): void;
    /**
     * Sets the p5.js fill color to the color of the given character in the font texture atlas.
     *
     * This is useful when drawing to a renderers `characterFramebuffer`, which is used to generate the ASCII output.
     *
     * @param character The character to get the color for.
     */
    fill(character: string): void;
    get sketchFramebuffer(): p5.Framebuffer;
    get grid(): P5AsciifyGrid;
    get fontTextureAtlas(): P5AsciifyFontTextureAtlas;
    /**
     * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
     * Can also be used via the `texture()` method.
     */
    get texture(): p5.Framebuffer;
}
