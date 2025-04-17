import p5 from 'p5';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyFontManager } from './FontManager';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { SVGExportOptions } from './utils/SVGExporter';
/**
 * Manages a rendering pipeline for ASCII conversion, including font management, grid calculations, and ASCII renderers,
 * which is applied to the main p5.js canvas or a selected texture.
 *
 * Instances of this class are created and managed through the {@link p5asciify} object *(see {@link P5AsciifierManager})*.
 */
export declare class P5Asciifier {
    /** Manages the font and provides methods to access font properties. */
    private _fontManager;
    /** Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. */
    private _grid;
    /** Wraps around the user's `draw()` function to capture it's output for the ascii renderers to asciify. */
    private _captureFramebuffer;
    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    private _rendererManager;
    /** The font size for the ASCII renderers. */
    private _fontSize;
    /** The `p5.js` instance. */
    private _p;
    /**
     * Initializes the asciifier by setting the `p5.js` instance and loading the font manager with the default font.
     *
     * This method is called automatically when p5.js is initialized or a new `P5Asciifier` instance is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
     * @param p The p5.js instance of the sketch.
     * @param fontBase64 The base64 string of the font to use for ASCII conversion.
     *
     * @ignore
     */
    init(p: p5, baseFont: p5.Font): void;
    /**
     * Sets up the asciifier by initializing the font texture atlas, grid, and renderer manager.
     *
     * There is no need to call this method manually if the asciifier is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
     *
     * @ignore
     */
    setup(captureFramebuffer: p5.Framebuffer): void;
    /**
     * Renders the ASCII output to the canvas.
     *
     * Automatically called after the user's `draw()` function has finished when managed by the {@link P5AsciifierManager} instance {@link p5asciify}.
     *
     * @ignore
     */
    asciify(): void;
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
    fontSize(fontSize: number): void;
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
    renderers(): P5AsciifyRendererManager;
    /**
     * Sets the font for the ascii renderers in the rendering pipeline of the asciifier.
     * @param font The `p5.Font` object to use for ASCII rendering.
     * @param options An object containing options affecting what happens after the font is loaded.
     * @param options.updateCharacters If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer.
     *                                 This might throw an error if the new font does not contain the character sets used with the previous font.
     *                                 If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same.
     * @throws {@link P5AsciifyError} - If the font parameter is invalid.
     *
     * @example
     * ```javascript
     *  let font;
     *
     *  function preload() {
     *      // Load font during preload using p5.js `loadFont` function.
     *      font = loadFont('path/to/font.ttf');
     *  }
     *
     *  function setupAsciify() {
     *      // Set the font to the default asciifier instance.
     *      p5asciify.asciifier().font(font);
     *  }
     * ```
     */
    font(font: p5.Font, options?: {
        updateCharacters: boolean;
    }): void;
    /**
     * Sets the background color for the ascii renderers, occupying all the space not covered by cells in the grid.
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
    background(color: string | p5.Color | [number, number?, number?, number?]): void;
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
    gridDimensions(gridCols: number, gridRows: number): void;
    /**
     * Adjust the grid dimensions to be responsive to the canvas size or fixed.
     *
     * If `true`, the grid dimensions will be adjusted every time the canvas size changes to create a perfect grid on the x and y axes.
     *
     * If `false`, the grid dimensions will be fixed and not change when the canvas size changes.
     *
     * @param bool Determines if the grid dimensions should be responsive to the canvas size.
     */
    gridResponsive(bool?: boolean): void;
    /**
     * Saves the current ASCII output as an SVG file.
     * @param options The options for saving the SVG file.
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     *
     * @example
     * ```javascript
     * function drawAsciify() {
     *     // Save the ASCII output as an SVG file with default options
     *     if (frameCount === 60) {
     *         p5asciify.asciifier().saveSVG("asciify_output");
     *     }
     *
     *     // Save without cell background rectangles
     *     if (frameCount === 120) {
     *         p5asciify.asciifier().saveSVG({
     *             filename: "asciify_clean",
     *             includeBackgrounds: false
     *         });
     *     }
     * }
     * ```
     */
    saveSVG(options?: SVGExportOptions): void;
    /**
     * Generates the ASCII output as an array of string rows.
     * @returns Array of strings representing ASCII output.
     * @throws {@link P5AsciifyError} - If no renderer is available.
     */
    private _generateAsciiTextOutput;
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
    toString(): string;
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
    saveStrings(filename: string): void;
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
    fill(character: string): void;
    /**
     * Returns the {@link P5AsciifyGrid} instance, which contains information about grid properties, and methods to modify the grid.
     *
     * @example
     * ```javascript
     * let framebuffer;
     *
     * function setupAsciify() {
     *      // Can be useful to create a framebuffer with the same dimensions as the grid.
     *      framebuffer = createFramebuffer({
     *          width: p5asciify.asciifier().grid.cols,
     *          height: p5asciify.asciifier().grid.rows
     *      });
     * }
     * ```
     */
    get grid(): P5AsciifyGrid;
    /**
     * Returns the font manager, which manages the font and provides methods to access font properties like available characters and their corresponding rgb values,
     * and the texture containing all the characters in the font.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print all existing characters in the font to the console.
     *      console.log(p5asciify.asciifier().fontManager.characters);
     *  }
     * ```
     */
    get fontManager(): P5AsciifyFontManager;
    /**
     * Retrieves the framebuffer that contains the content to asciify.
     *
     * The returned framebuffer either contains everything drawn on the p5.js main canvas, or a custom framebuffer if set during initialization.
     *
     * @ignore
     */
    get captureFramebuffer(): p5.Framebuffer;
    /**
     * Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
     * Can also be used via the p5.js `texture()` function.
     *
     * @example
     * ```javascript
     *  // Draw something on the canvas to asciify.
     *  function draw() {
     *      background(0);
     *      fill(255);
     *      box(100);
     *  }
     *
     *  // Apply the asciified output as a texture to a 3D box.
     *  function drawAsciify() {
     *      orbitControl();
     *
     *      clear();
     *      texture(p5asciify.asciifier().texture);
     *      rotateX(frameCount * 0.01);
     *      rotateY(frameCount * 0.01);
     *      box(100);
     *  }
     * ```
     */
    get texture(): p5.Framebuffer;
}
