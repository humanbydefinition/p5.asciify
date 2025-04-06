import p5 from 'p5';

import { P5AsciifyGrid } from './Grid';
import { P5AsciifyFontManager } from './FontManager';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { P5AsciifyError } from './AsciifyError';
import { AbstractFeatureRenderer2D } from './renderers/2d/feature/AbstractFeatureRenderer2D';

/**
 * Manages a rendering pipeline for ASCII conversion, including font management, grid calculations, and ASCII renderers, 
 * which is applied to the main p5.js canvas or a selected texture.
 * 
 * Instances of this class are created and managed through the {@link p5asciify} object *(see {@link P5AsciifierManager})*.
 */
export class P5Asciifier {

    /** Manages the font and provides methods to access font properties. */
    private _fontManager!: P5AsciifyFontManager;

    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    private _grid!: P5AsciifyGrid;

    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers to asciify. */
    private _captureFramebuffer!: p5.Framebuffer;

    /** Flag to determine if the p5.js canvas is used as the sketch framebuffer. Otherwise, a custom framebuffer is used. */
    private _canvasFlag: boolean = true;

    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    private _rendererManager!: P5AsciifyRendererManager;

    /** The font size for the ASCII renderers. */
    private _fontSize: number = 16;

    /** The `p5.js` instance. */
    private _p!: p5;

    /**
     * Creates a new `P5Asciifier` instance.
     * 
     * @param sketchFramebuffer If a `sketchFramebuffer` is provided, 
     *                          this framebuffer is used instead of the p5.js main canvas to capture the user's `draw()` function output.
     * @ignore
     */
    constructor(
        sketchFramebuffer?: p5.Framebuffer,
    ) {
        if (sketchFramebuffer) {
            this._captureFramebuffer = sketchFramebuffer;
            this._canvasFlag = false;
        }
    }

    /**
     * Initializes the asciifier by setting the `p5.js` instance and loading the font manager with the default font.
     * 
     * This method is called automatically when p5.js is initialized or a new `P5Asciifier` instance is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
     * @param p The p5.js instance of the sketch.
     * @param fontBase64 The base64 string of the font to use for ASCII conversion.
     * 
     * @ignore
     */
    public init(p: p5, baseFont: p5.Font): void {
        this._p = p;
        this._fontManager = new P5AsciifyFontManager(p, baseFont);
    }

    /**
     * Sets up the asciifier by initializing the font texture atlas, grid, and renderer manager.
     * 
     * There is no need to call this method manually if the asciifier is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
     * 
     * @ignore
     */
    public setup(): void {
        this._fontManager.setup(this._fontSize);

        this._grid = new P5AsciifyGrid(
            this._p,
            this._fontManager.maxGlyphDimensions.width,
            this._fontManager.maxGlyphDimensions.height,
        );

        this._rendererManager = new P5AsciifyRendererManager(
            this._p,
            this._grid,
            this._fontManager
        );

        if (!this._captureFramebuffer) {
            this._captureFramebuffer = this._p.createFramebuffer({
                depthFormat: this._p.UNSIGNED_INT,
                textureFiltering: this._p.NEAREST,
            });
        }
    }

    /**
     * Renders the ASCII output to the canvas.
     * 
     * Automatically called after the user's `draw()` function has finished when managed by the {@link P5AsciifierManager} instance {@link p5asciify}.
     * 
     * @ignore
     */
    public asciify(): void {
        this._rendererManager.render(this._captureFramebuffer);

        if (!this._rendererManager.hasEnabledRenderers) {
            this._p.clear();
            this._p.image(this._captureFramebuffer, -this._p.width / 2, -this._p.height / 2, this._p.width, this._p.height);
        } else {
            this._p.clear();
            this._p.image(this._rendererManager.asciiDisplayRenderer.resultFramebuffer, -this._p.width / 2, -this._p.height / 2);
        }
    }

    /**
     * Sets the font size for the ASCII renderers of the asciifier.
     * @param fontSize The font size to set.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the font size to 32 to use for all ASCII renderers of the asciifier.
     *      p5asciify.asciifier().fontSize(32);
     *  }
     * ```
     */
    public fontSize(fontSize: number): void {
        this._fontSize = fontSize;

        if (this._p._setupDone) {
            this._fontManager.setFontSize(fontSize);
            this._grid.resizeCellPixelDimensions(
                this._fontManager.maxGlyphDimensions.width,
                this._fontManager.maxGlyphDimensions.height
            );

            this._rendererManager.resetRendererDimensions();
        }
    }

    /**
     * Returns the {@link P5AsciifyRendererManager}, containing all ASCII renderers in the rendering pipeline of the asciifier.
     * @returns The renderer manager.
     * 
     * @example
     * ```javascript
     *  let defaultBrightnessRenderer;
     * 
     *  function setupAsciify() {
     *      // Fetch the default brightness renderer from the renderer manager.
     *      defaultBrightnessRenderer = p5asciify.asciifier().renderers().get("brightness");
     * 
     *      // Update any options for the renderer.
     *      defaultBrightnessRenderer.update({ invertMode: true });
     *  }
     * ```
     */
    public renderers(): P5AsciifyRendererManager {
        return this._rendererManager;
    }

    /**
     * Sets the font for the ascii renderers in the rendering pipeline of the asciifier.
     * @param font The `p5.Font` object to use for ASCII rendering.
     * @param options An object containing options affecting what happens after the font is loaded.
     * @param options.updateCharacters If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer.
     *                                 This might throw an error if the new font does not contain the characters of the previous font.
     *                                 If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same.
     * @throws {@link P5AsciifyError} - If the font parameter is invalid.
     * 
     * @example
     * ```javascript
     *  let font;
     * 
     *  function preload() {
     *      // Load font during preload using p5.js loadFont function.
     *      font = loadFont('path/to/font.ttf');
     *  }
     * 
     *  function setupAsciify() {
     *      // Set the font to the loaded font.
     *      p5asciify.asciifier().font(font);
     *  }
     * ```
     */
    public font(
        font: p5.Font,
        options = { updateCharacters: true },
    ): void {
        this._fontManager.loadFont(font);

        if (this._p._setupDone) {

            this._fontManager.reset();

            this._grid.resizeCellPixelDimensions(
                this._fontManager.maxGlyphDimensions.width,
                this._fontManager.maxGlyphDimensions.height
            );

            // Only update characters if option is true
            if (options.updateCharacters) {
                this._rendererManager.renderers.forEach(renderer => {
                    if (renderer.renderer instanceof AbstractFeatureRenderer2D) {
                        renderer.renderer.characters(renderer.renderer.options.characters as string)
                    }
                }
                );
            }

            this._rendererManager.resetRendererDimensions();
        }
    }

    /**
     * Sets the background color for the ascii renderers, occupying all the space not covered by voxels in the grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color to black.
     *      p5asciify.asciifier().background('#000000');
     *  }
     * ```
     */
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        this._rendererManager.asciiDisplayRenderer.background(color);
    }

    /**
     * Sets the grid dimensions for the ASCII renderers. 
     * Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.
     * 
     * To make the grid responsive to the canvas size again, use the {@link gridResponsive} method.
     * 
     * @param gridCols The number of columns in the grid.
     * @param gridRows The number of rows in the grid.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the grid dimensions to 100 columns, 50 rows.
     *      p5asciify.asciifier().gridDimensions(100, 50);
     *  }
     * ```
     * 
     */
    public gridDimensions(gridCols: number, gridRows: number) {
        this._grid.resizeGridDimensions(gridCols, gridRows);
        this._rendererManager.resetRendererDimensions();
    }

    /**
     * Adjust the grid dimensions to be responsive to the canvas size or fixed.
     * 
     * If `true`, the grid dimensions will be adjusted every time the canvas size changes to create a perfect grid on the x and y axes.
     * 
     * If `false`, the grid dimensions will be fixed and not change when the canvas size changes.
     * 
     * @param bool Determines if the grid dimensions should be responsive to the canvas size.
     */
    public gridResponsive(bool: boolean = true) {
        if (bool) {
            this._grid.resetGridDimensions();
        } else {
            this._grid.fixedDimensions = true;
        }
    }

    /**
     * Generates the ASCII output as an array of string rows.
     * @returns Array of strings representing ASCII output.
     * @throws {@link P5AsciifyError} - If no renderer is available.
     */
    private _generateAsciiTextOutput(): string[] {
        const characterFramebuffer = this._rendererManager.characterFramebuffer;
        if (!characterFramebuffer) {
            throw new P5AsciifyError('No renderer available to generate ASCII output');
        }

        // Load pixels from character framebuffer
        characterFramebuffer.loadPixels();
        const asciiPixels = characterFramebuffer.pixels;

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
     *          console.log(p5asciify.asciifier().toString());
     *      }
     *  }
     * ```
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
     *         p5asciify.asciifier().saveStrings("ascii_output");
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
     *  let asciifier;
     * 
     *  function setup() {
     *      createCanvas(400, 400, WEBGL);
     *  }
     * 
     *  function setupAsciify() {
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Enable the default custom renderer
     *      asciifier.renderers().get("custom").enable();
     *      
     *      // Assign the ascii renderer's character framebuffer to a global variable
     *      characterFramebuffer = asciifier.renderers().get("custom").characterFramebuffer;
     *      primaryColorFramebuffer = asciifier.renderers().get("custom").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = asciifier.renderers().get("custom").secondaryColorFramebuffer;
     *  }
     * 
     *  function draw() {
     *      // Draw a rectangle with the character 'A' to the character framebuffer
     *      characterFramebuffer.begin();
     *      clear();
     *      asciifier.fill("A");
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
     * Returns the {@link P5AsciifyGrid} instance, which contains information about grid properties, and methods to modify the grid.
     * 
     * @example
     * ```javascript
     * let framebuffer;
     * 
     * function setupAsciify() {
     *      // Can also be useful to create a framebuffer with the same dimensions as the grid.
     * 
     *      framebuffer = createFramebuffer({
     *          width: p5asciify.asciifier().grid.cols, 
     *          height: p5asciify.asciifier().grid.rows
     *      });
     * }
     * ```
     */
    get grid(): P5AsciifyGrid { return this._grid; }

    /**
     * Returns the font manager, which manages the font and provides methods to access font properties like available characters and their corresponding rgb values.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print all existing characters in the font to the console.
     *      console.log(p5asciify.asciifier().fontManager.characters);
     *  }
     * ```
     */
    get fontManager(): P5AsciifyFontManager { return this._fontManager; }

    /**
     * Retrieves the framebuffer that contains the content to asciify.
     * 
     * The returned framebuffer either contains everything drawn on the p5.js main canvas, or a custom framebuffer if set during initialization.
     */
    get captureFramebuffer(): p5.Framebuffer { return this._captureFramebuffer; }

    /**
     * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
     * Can also be used via the p5.js `texture()` function.
     * 
     * @example
     * ```javascript
     *  // Draw something on the canvas to asciify.
     *  function draw() {
     *      box(100);
     *  }
     * 
     *  function drawAsciify() {
     *      orbitControl();
     * 
     *      // Apply the asciified output as a texture to a 3D box.
     *      clear();
     *      texture(p5asciify.asciifier().texture);
     *      rotateX(frameCount * 0.01);
     *      rotateY(frameCount * 0.01);
     *      box(100);
     *  }
     * ```
     */
    get texture(): p5.Framebuffer { return this._rendererManager.asciiDisplayRenderer.resultFramebuffer; }

    /**
     * Returns the flag to determine if the p5.js canvas is being recorded into a framebuffer to asciify,
     * or if a custom framebuffer is being used instead.
     * 
     * Returns `true` if the p5.js canvas is used, otherwise `false`.
     */
    get canvasFlag(): boolean { return this._canvasFlag; }
}