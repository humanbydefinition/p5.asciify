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
 * `p5.asciify` exports an instance `p5asciify` of this class, which is used to interact with the library.
 * 
 * Currently, this class is not designed to be instantiated by the user. Use the `p5asciify` instance exported by the library instead.
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

    /** The font size for the ASCII renderers. */
    private _fontSize: number = 16;

    /** The `p5.js` instance. */
    private _p!: p5;

    /**
     * Initializes the `p5.asciify` library by setting the `p5.js` instance and loading the font manager with the default font.
     * 
     * **This method is called automatically when p5.js is initialized and should not be called manually, 
     * otherwise causing unexpected behavior.**
     * 
     * @param p 
     * @param fontBase64 
     */
    public init(p: p5, fontBase64: string): void {
        this._p = p;
        this._fontManager = new P5AsciifyFontManager(this._p, fontBase64);
    }

    /**
     * Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.
     * 
     * **This method called automatically after the user's `setup()` function has finished. 
     * Calling this function manually would reset the library and previously made settings, which is rather redundant.**
     */
    public setup(): void {
        this._fontTextureAtlas = new P5AsciifyFontTextureAtlas(
            this._p,
            this._fontManager,
            this._fontSize,
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
     * Necessary to call in p5.js `INSTANCE` mode to ensure a `preload` function is defined,
     * otherwise defining a dummy `preload` function, so the preload loop is executed and the font provided by `p5.asciify` is loaded.
     * @param p The p5.js instance to use for the library.
     */
    public instance(p: p5): void {
        if (!p.preload) {
            p.preload = () => { };
        }
    }

    /**
     * Renders the ASCII output to the canvas.
     * 
     * **This method is called automatically every time the user's `draw()` function has finished. Calling it manually is redundant and only causes useless computation.**
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
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the font size to 32 to use for all ASCII renderers.
     *      p5asciify.fontSize(32);
     *  }
     * ```
     */
    public fontSize(fontSize: number): void {
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
     * 
     * @example
     * ```javascript
     *  let defaultBrightnessRenderer;
     * 
     *  function setupAsciify() {
     *      // Fetch the default brightness renderer from the renderer manager.
     *      defaultBrightnessRenderer = p5asciify.renderers().get("brightness");
     * 
     *      // Update any options for the renderer.
     *      defaultBrightnessRenderer.update({ invertMode: true, });
     *  }
     * ```
     */
    public renderers(): P5AsciifyRendererManager {
        return this._rendererManager;
    }

    /**
     * Sets the font for the ascii renderers.
     * @param font The font to use. Can be a path, base64 string, or p5.Font object.
     * @param options An object containing options affecting what happens after the font is loaded.
     * @param options.updateCharacters  If true, updates renderer character colors for ascii conversion with new font. 
     *                                  May throw an error if new font lacks set characters in renderers.
     *                                  If false, the character colors won't be updated, 
     *                                  potentially leading to incorrect ASCII conversion when not updated manually afterwards.
     * @param onSuccess A callback function to call after the font has been loaded and potential updates have been made.
     * @throws {@link P5AsciifyError} - If the font parameter is invalid or the font fails to load.
     * 
     * @example
     * ```javascript
     *  function preload() {
     *      // Load a custom font from a path
     *      p5asciify.loadFont('path/to/font.ttf', { updateCharacters: true }, () => {
     *          // Font loaded successfully
     *          console.log('Font loaded successfully');
     *      });
     * 
     *      // The second and third parameters are optional. When called during `preload`, 
     *      // the font will be loaded before `setup` begins, 
     *      // similar to how `loadFont` works in `p5.js`.
     *  }
     * ```
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

                this._rendererManager.resetRendererDimensions();
            }

            onSuccess?.();
        });
    }

    /**
     * Sets the background color for the ascii renderering. 
     * 
     * Covers all the transparent space, including the edges of the canvas, which might not be covered by the grid of characters.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by `p5.js`.
     * @throws {@link P5AsciifyError} - If the passed color is invalid.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color to black.
     *      p5asciify.background("#000000");
     *  }
     * ```
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
     * Returns the current ASCII output as a string.
     * @returns Multi-line string representation of the ASCII output.
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     * 
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Print the ASCII output to the console.
     *      if (frameCount === 1101100011101010110111001100001) {
     *          console.log(p5asciify.toString());
     *      }
     *  }
     */
    public toString(): string {
        return this._generateAsciiTextOutput().join('\n');
    }

    /**
     * Saves the ASCII output to a text file.
     * @param filename The filename to save the text file as. If not provided, a default filename is used.
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     * 
     * @example
     * ```javascript
     * function drawAsciify() {
     *     // Save the ASCII output to a text file.
     *      if (frameCount === 11100110110111101101100) {
     *         p5asciify.saveStrings("ascii_output");
     *     }
     * }
     * ```
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
     * Sets the p5.js `fill()` color to the color of the given character in the font texture atlas.
     * 
     * This method can be useful when drawing to a custom renderers `characterFramebuffer`, 
     * which is used to convert the pixel data to ASCII characters.
     * 
     * @param character The character to get the color for.
     * 
     * @example
     * ```javascript
     *  let characterFramebuffer;
     *  let primaryColorFramebuffer;
     *  let secondaryColorFramebuffer;
     * 
     *  function setup() {
     *      createCanvas(400, 400, WEBGL);
     *  }
     * 
     *  function setupAsciify() {
     *      // Enable the default custom renderer
     *      p5asciify.renderers().get("custom").enable();
     *      
     *      // Assign the ascii renderer's character framebuffer to a global variable
     *      characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
     *      primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
     *  }
     * 
     *  function draw() {
     *      // Draw a rectangle with the character 'A' to the character framebuffer
     *      characterFramebuffer.begin();
     *      clear();
     *      p5asciify.fill("A");
     *      rect(0, 0, 100, 100);
     *      characterFramebuffer.end();
     * 
     *      // Makes all ascii characters on the grid white.
     *      primaryColorFramebuffer.begin();
     *      background(255);
     *      primaryColorFramebuffer.end();
     * 
     *      // Makes all cell background colors black.
     *      secondaryColorFramebuffer.begin();
     *      background(0);
     *      secondaryColorFramebuffer.end();
     *  }
     * ```
     */
    fill(character: string): void {
        this._p.fill(this._fontManager.glyphColor(character));
    }

    /**
     * Returns the grid, which contains the dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions.
     * 
     * @example
     * ```javascript
     * let framebuffer;
     * 
     * function setupAsciify() {
     *      // Can be useful to create a framebuffer with the same dimensions as the grid.
     *      framebuffer = createFramebuffer({width: p5asciify.grid.cols, height: p5asciify.grid.rows});
     * }
     * ```
     */
    get grid(): P5AsciifyGrid { return this._grid; }

    /**
     * Returns the font texture atlas, which contains the texture with all glyphs of the font set in the font manager.
     * 
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Peek behind the curtain at the font texture atlas (you curious cat)
     *      clear(); 
     *      image(p5asciify.fontTextureAtlas.texture, -width / 2, -height / 2, width, height);
     *  }
     * ```
     */
    get fontTextureAtlas(): P5AsciifyFontTextureAtlas { return this._fontTextureAtlas; }

    /**
     * Returns the font manager, which manages the font and provides methods to access font properties.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print all existing characters in the font to the console.
     *      console.log(p5asciify.fontManager.characters);
     *  }
     * ```
     */
    get fontManager(): P5AsciifyFontManager { return this._fontManager; }

    /**
     * Returns the sketch framebuffer, which contains the output of the user's `draw()` function to asciify.
     * 
     * There is no real reason to access this in a `p5.js` sketch, but I'm happy to be proven wrong.
     */
    get sketchFramebuffer(): p5.Framebuffer { return this._sketchFramebuffer; }

    /**
     * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
     * Can also be used via the p5.js `texture()` function.
     * 
     * @example
     * ```javascript
     *  // Draw something on the canvas to asciify.
     *  function draw() {
     *      rotateX(frameCount * 0.01);
     *      rotateY(frameCount * 0.01);
     *      box(100);
     *  }
     * 
     *  function drawAsciify() {
     *      orbitControl();
     * 
     *      // Apply the asciified output as a texture to a 3D box.
     *      clear();
     *      texture(p5asciify.texture);
     *      box(100);
     *  }
     * ```
     */
    get texture(): p5.Framebuffer { return this._rendererManager.resultFramebuffer; }
}