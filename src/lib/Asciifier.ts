import p5 from 'p5';

import { P5AsciifyGrid } from './Grid';
import { P5AsciifyFontManager } from './FontManager';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { P5AsciifyAbstractFeatureRenderer2D } from './renderers/2d/feature/AbstractFeatureRenderer2D';
import { P5AsciifySVGExporter, SVGExportOptions } from './utils/export/SVGExporter';
import { JSONExportOptions, P5AsciifyJSONExporter } from './utils/export/JSONExporter';
import { P5AsciifyPluginRegistry } from './plugins/PluginRegistry';
import { detectP5Version, isP5AsyncCapable, isValidP5Color } from './utils';
import { errorHandler } from './errors';
import { P5AsciifyRenderer2D } from './renderers/2d';

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
    private _captureFramebuffer!: p5.Framebuffer | p5.Graphics;

    /** Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. */
    private _rendererManager!: P5AsciifyRendererManager;

    /** The font size for the ASCII renderers. */
    private _fontSize: number = 16;

    /** The background color for the ASCII output, which is used to fill the space not covered by cells in the grid. */
    private _backgroundColor: string | p5.Color | [number, number?, number?, number?] = "#000000";

    /** The `p5.js` instance. */
    private _p!: p5;

    /** Defines if the ASCII output should be rendered to the canvas or not. */
    private _renderToCanvas: boolean = true;

    /** The plugin registry instance. */
    private _pluginRegistry: P5AsciifyPluginRegistry;

    /** Indicates if the setup has been completed. */
    private _setupDone: boolean = false;

    /**
     * Creates a new instance of the `P5Asciifier` class.
     * @param pluginRegistry The plugin registry instance.
     * @ignore
     */
    constructor(pluginRegistry: P5AsciifyPluginRegistry) {
        this._pluginRegistry = pluginRegistry;
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
    public async init(p: p5): Promise<void> {
        this._p = p;
    }

    /**
     * Sets up the asciifier by initializing the font texture atlas, grid, and renderer manager.
     * 
     * There is no need to call this method manually if the asciifier is added through the {@link P5AsciifierManager} instance {@link p5asciify}.
     * 
     * @ignore
     */
    public async setup(captureFramebuffer: p5.Framebuffer | p5.Graphics, baseFont: p5.Font): Promise<void> {
        this._captureFramebuffer = captureFramebuffer;

        this._fontManager = new P5AsciifyFontManager(this._p, baseFont);

        if (isP5AsyncCapable(detectP5Version(this._p))) {
            await this._fontManager.setup(this._fontSize);
        } else {
            this._fontManager.setup(this._fontSize);
        }

        this._grid = new P5AsciifyGrid(
            this._captureFramebuffer,
            this._fontManager.maxGlyphDimensions.width,
            this._fontManager.maxGlyphDimensions.height,
        );

        this._rendererManager = new P5AsciifyRendererManager(
            this._p,
            this._captureFramebuffer,
            this._grid,
            this._fontManager,
            this._pluginRegistry,
        );

        this._setupDone = true;
    }

    /**
     * Renders the ASCII output to the canvas.
     * 
     * Automatically called after the user's `draw()` function has finished when managed by the {@link P5AsciifierManager} instance {@link p5asciify}.
     * 
     * @ignore
     */
    public asciify(): void {
        this._rendererManager.render(this._backgroundColor);

        if (this._renderToCanvas) {
            if (this._rendererManager.hasEnabledRenderers) {
                this._p.image(this._rendererManager.asciiDisplayRenderer.resultFramebuffer, -(this._p.width / 2) + this._grid.offsetX, -(this._p.height / 2) + this._grid.offsetY);
            } else {
                this._p.clear();
                this._p.image(this._captureFramebuffer, -(this._captureFramebuffer.width / 2), -(this._captureFramebuffer.height / 2));
            }
        }
    }

    /**
     * Sets the font size for the ASCII renderers of the asciifier.
     * @param fontSize The font size to set.
     * @throws If the font size is not a positive number.
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

        const isValid = errorHandler.validate(
            typeof fontSize === 'number' && fontSize > 0,
            `Invalid font size: ${fontSize}. Expected a positive number.`,
            { providedValue: fontSize, method: 'fontSize' }
        );

        if (!isValid || this._fontSize === fontSize) {
            return; // Early return if value is not valid or the same
        }

        if (this._setupDone) {
            this._fontSize = fontSize;
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
     *      defaultBrightnessRenderer.update({ invert: true });
     *  }
     * ```
     */
    public renderers(): P5AsciifyRendererManager {
        return this._rendererManager;
    }

    /**
     * Returns a specific renderer by name from the renderer manager.
     * @param name The name of the renderer to retrieve.
     * @returns The renderer instance if found, or null if not found.
     * 
     * @example
     * ```javascript
     * let brightnessRenderer;
     * 
     * function setupAsciify() {
     *     // Fetch the brightness renderer from the renderer manager.
     *     brightnessRenderer = p5asciify.asciifier().renderer("brightness");
     * 
     *     // Alternatively:
     *     // brightnessRenderer = p5asciifier.renderer("brightness");
     *     // brightnessRenderer = p5asciifier.renderers().get("brightness");
     *     // brightnessRenderer = p5asciify.asciifier().renderers().get("brightness");
     * }
     * ```
     */
    public renderer(name: string): P5AsciifyRenderer2D | null {
        return this._rendererManager.get(name);
    }


    /**
     * Sets the framebuffer or graphics object to capture for ASCII conversion.
     * 
     * Updates the capture source that will be processed by the ASCII rendering pipeline.
     * This allows switching between different rendering targets without recreating the asciifier.
     * 
     * @param captureFramebuffer - The framebuffer or graphics object to capture from.
     *                            Can be a p5.Framebuffer or p5.Graphics.
     */
    public setCaptureTexture(captureFramebuffer: p5.Framebuffer | p5.Graphics): void {
        // Early return if the framebuffer is the same
        if (this._captureFramebuffer === captureFramebuffer) {
            return;
        }

        this._captureFramebuffer = captureFramebuffer;

        // Reset grid dimensions based on new framebuffer
        this._grid.updateTexture(captureFramebuffer);
        this._rendererManager.setCaptureTexture(captureFramebuffer);
    }

    /**
     * Sets the font for the ascii renderers in the rendering pipeline of the asciifier.
     * @param font The `p5.Font` object to use for ASCII rendering.
     * @param options An object containing options affecting what happens after the font is loaded.
     * @param options.updateCharacters If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer.
     *                                 This might cause an error if the new font does not contain the character sets used with the previous font.
     *                                 If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same.
     * @throws If the font parameter is invalid.
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
    public font(
        font: p5.Font,
        options = { updateCharacters: true },
    ): void {
        // Early return if the font is the same
        if (this._fontManager.font === font) {
            return;
        }

        this._fontManager.loadFont(font);

        if (this._setupDone) {

            this._fontManager.reset();

            this._grid.resizeCellPixelDimensions(
                this._fontManager.maxGlyphDimensions.width,
                this._fontManager.maxGlyphDimensions.height
            );

            // Only update characters if option is true
            if (options.updateCharacters) {
                this._rendererManager.renderers.forEach(renderer => {
                    if (renderer.renderer instanceof P5AsciifyAbstractFeatureRenderer2D) {
                        renderer.renderer.characters(renderer.renderer.options.characters as string)
                    }
                }
                );
            }

            this._rendererManager.resetRendererDimensions();
        }
    }

    /**
     * Sets the background color for the resulting {@link texture} of the ASCII output, and the SVG export.
     * 
     * To make the background transparent, pass an appropriate color value with an alpha value of `0`.
     * 
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws If the color is not a string, array or `p5.Color`.
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
        const isValid = errorHandler.validate(
            typeof color === 'string' || Array.isArray(color) || isValidP5Color(this._p, color),
            `Invalid color type: ${typeof color}. Expected string, array or p5.Color.`,
            { providedValue: color, method: 'background' }
        );

        if (!isValid) {
            return; // Early return if the color is not valid
        }

        this._backgroundColor = color;
    }

    /**
     * Sets the grid dimensions for the ASCII renderers. 
     * Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.
     * 
     * To make the grid dimensions responsive to the canvas size again, use the {@link gridResponsive} method.
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
     */
    public gridDimensions(gridCols: number, gridRows: number) {

        // Early return if the grid dimensions are the same
        if (this._grid.cols === gridCols && this._grid.rows === gridRows) {
            return;
        }

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
     * Saves the current ASCII output as an SVG file.
     * @param options The options for saving the SVG file.
     * @throws If no renderer is available to fetch ASCII output from.
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
    public saveSVG(options: SVGExportOptions = {}): void {
        const svgExporter = new P5AsciifySVGExporter(this._p);
        svgExporter.saveSVG(
            this._rendererManager,
            this._grid,
            this._fontManager,
            this._backgroundColor as p5.Color,
            options
        );
    }

    /**
     * Returns the current ASCII output as an SVG string.
     * @param options Options for SVG generation (same as saveSVG options except filename)
     * @returns SVG string representation of the ASCII output
     * @throws If no renderer is available to fetch ASCII output from.
     * 
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Get the ASCII output as an SVG string
     *      if (frameCount === 60) {
     *          const svgString = p5asciify.asciifier().toSVG();
     *          console.log(svgString);
     *      }
     *      
     *      // Get SVG without background rectangles and in text mode
     *      if (frameCount === 120) {
     *          const svgString = p5asciify.asciifier().toSVG({
     *              includeBackgroundRectangles: false,
     *              drawMode: 'text'
     *          });
     *          console.log(svgString);
     *      }
     *  }
     * ```
     */
    public toSVG(options: Omit<SVGExportOptions, 'filename'> = {}): string {
        const svgExporter = new P5AsciifySVGExporter(this._p);
        return svgExporter.generateSVG(
            this._rendererManager,
            this._grid,
            this._fontManager,
            this._backgroundColor as p5.Color,
            options
        );
    }

    /**
     * Saves the current ASCII output as a JSON file.
     * @param options The options for saving the JSON file.
     * @throws If no renderer is available to fetch ASCII output from.
     */
    public saveJSON(options: JSONExportOptions = {}): void {
        const svgExporter = new P5AsciifyJSONExporter(this._p);
        svgExporter.saveJSON(
            this._rendererManager,
            this._grid,
            this._fontManager,
            options
        );
    }

    /**
     * Returns the current ASCII output as a JSON string.
     * @param options Options for JSON generation (same as saveJSON options except filename)
     * @returns JSON string representation of the ASCII output
     * @throws If no renderer is available to fetch ASCII output from.
     * 
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Get the ASCII output as a JSON string
     *      if (frameCount === 60) {
     *          const jsonString = p5asciify.asciifier().toJSON();
     *          console.log(jsonString);
     *      }
     *      
     *      // Get JSON without empty cells and without pretty printing
     *      if (frameCount === 120) {
     *          const compactJson = p5asciify.asciifier().toJSON({
     *              includeEmptyCells: false,
     *              prettyPrint: false
     *          });
     *          console.log(compactJson);
     *      }
     *  }
     * ```
     */
    public toJSON(options: Omit<JSONExportOptions, 'filename'> = {}): string {
        const jsonExporter = new P5AsciifyJSONExporter(this._p);
        return jsonExporter.generateJSON(
            this._rendererManager,
            this._grid,
            this._fontManager,
            options
        );
    }

    /**
     * Generates the ASCII output as an array of string rows.
     * @returns Array of strings representing ASCII output.
     * @throws If no renderer is available.
     */
    private _generateAsciiTextOutput(): string[] {
        const characterFramebuffer = this._rendererManager.characterFramebuffer;

        // Load pixels from character framebuffer
        characterFramebuffer.loadPixels();
        const asciiPixels = characterFramebuffer.pixels;

        // Get grid dimensions
        const w = this._grid.cols;
        const h = this._grid.rows;

        // Get characters array from font manager
        const characterObjects = this._fontManager.characters;

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
                if (charIndex >= characterObjects.length) {
                    charIndex = characterObjects.length - 1;
                }

                line += characterObjects[charIndex].character;
                idx++;
            }
            lines.push(line);
        }

        return lines;
    }

    /**
     * Returns the current ASCII output as a string.
     * @returns Multi-line string representation of the ASCII output.
     * @throws If no renderer is available to fetch ASCII output from.
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
     * @throws If no renderer is available to fetch ASCII output from.
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
     * Sets whether the ASCII output should be rendered to the canvas or not.
     * 
     * If this is set to `false`, the canvas will remain clear/empty until you start drawing stuff again in `drawAsciify()` after the `draw()`function finishes.
     * This is because `p5.asciify` wraps your `draw()` loop inside a framebuffer's `begin()` and `end()`.
     * 
     * By default, this is set to `true`, meaning the ASCII output will be rendered to the canvas **after** the `draw()` function ends, 
     * but before the `drawAsciify()` function is called.
     * 
     * @param bool `true` to render to the canvas, `false` to not render.
     */
    public renderToCanvas(bool: boolean): void {

        const isValid = errorHandler.validate(
            typeof bool === 'boolean',
            `Invalid type for renderToCanvas: ${typeof bool}. Expected boolean.`,
            { providedValue: bool, method: 'renderToCanvas' }
        );

        if (!isValid) {
            return; // Early return if the value is not valid
        }

        this._renderToCanvas = bool;
    }

    /**
     * Sets the background mode for the ASCII output.
     * 
     * If the mode is set to `fixed`, the background color set via {@link background} will be used for transparent cells.
     * 
     * If the mode is set to `sampled`, the background color will be sampled from the pixel data of the texture that is being captured.
     * 
     * @param mode The background mode to set. Can be either `"fixed"` or `"sampled"`.
     */
    public backgroundMode(mode: "fixed" | "sampled" = "fixed"): void {
        const isValid = errorHandler.validate(
            mode === "fixed" || mode === "sampled",
            `Invalid background mode: ${mode}. Expected "fixed" or "sampled".`,
            { providedValue: mode, method: 'backgroundMode' }
        );

        if (!isValid) {
            return; // Early return if the mode is not valid
        }

        this._rendererManager.asciiDisplayRenderer.backgroundMode(mode === "fixed" ? 0 : 1);
    }

    /**
     * Loads a JSON string or object and returns the framebuffers for the character, primary color, secondary color, transform, and rotation.
     * 
     * This method is useful for loading JSON exports from the {@link saveJSON} method in custom renderers.
     * The framebuffers match the dimensions of the grid defined in the JSON.
     * Each framebuffer contains the pixel data for the respective properties, 
     * which can be drawn to the respective custom renderers framebuffers via the `image()` function.
     * 
     * @param json The JSON string or object to load.
     * @returns An object containing the framebuffers for character, primary color, secondary color, transform, and rotation.
     * @throws If the JSON format is invalid or unsupported.
     */
    public loadJSON(json: string | object): {
        characterFramebuffer: p5.Framebuffer | null,
        primaryColorFramebuffer: p5.Framebuffer | null,
        secondaryColorFramebuffer: p5.Framebuffer | null,
        transformFramebuffer: p5.Framebuffer | null,
        rotationFramebuffer: p5.Framebuffer | null
    } {
        let jsonData;

        // Validate and parse JSON input
        const isValidInput = errorHandler.validate(
            json !== null && json !== undefined,
            'JSON input cannot be null or undefined.',
            { providedValue: json, method: 'loadJSON' }
        );

        if (!isValidInput) {
            return {
                characterFramebuffer: null,
                primaryColorFramebuffer: null,
                secondaryColorFramebuffer: null,
                transformFramebuffer: null,
                rotationFramebuffer: null
            };
        }

        try {
            jsonData = typeof json === 'string' ? JSON.parse(json) : json;
        } catch (e) {
            const isValidJson = errorHandler.validate(
                false,
                `Invalid JSON format: ${(e as Error).message}`,
                { providedValue: json, method: 'loadJSON' }
            );

            return {
                characterFramebuffer: null,
                primaryColorFramebuffer: null,
                secondaryColorFramebuffer: null,
                transformFramebuffer: null,
                rotationFramebuffer: null
            };
        }

        // Validate JSON structure
        const hasValidStructure = errorHandler.validate(
            jsonData && typeof jsonData === 'object' && jsonData.metadata && jsonData.cells,
            'Invalid JSON format: missing metadata or cells',
            { providedValue: jsonData, method: 'loadJSON' }
        );

        // Validate version
        const isValidVersion = errorHandler.validate(
            jsonData.metadata.version === "1.0",
            `Unsupported JSON version: ${jsonData.metadata.version}`,
            { providedValue: jsonData.metadata.version, method: 'loadJSON' }
        );

        if (!isValidVersion || !hasValidStructure) {
            return {
                characterFramebuffer: null,
                primaryColorFramebuffer: null,
                secondaryColorFramebuffer: null,
                transformFramebuffer: null,
                rotationFramebuffer: null
            };
        }

        // Get grid dimensions from JSON
        const gridSize = jsonData.metadata.gridSize;
        const cols = gridSize.cols;
        const rows = gridSize.rows;

        // Create new framebuffers with the dimensions from the JSON
        const fbSettings = {
            width: cols,
            height: rows,
            antialias: false,
            textureFiltering: this._p.NEAREST,
            depthFormat: this._p.UNSIGNED_INT,
        };

        const characterFramebuffer = this._p.createFramebuffer(fbSettings);
        const primaryColorFramebuffer = this._p.createFramebuffer(fbSettings);
        const secondaryColorFramebuffer = this._p.createFramebuffer(fbSettings);
        const transformFramebuffer = this._p.createFramebuffer(fbSettings);
        const rotationFramebuffer = this._p.createFramebuffer(fbSettings);

        // Helper function to set a pixel at specific coordinates
        const setPixel = (fb: p5.Framebuffer, x: number, y: number, color: any) => {
            fb.begin();
            this._p.push();
            this._p.noStroke();
            this._p.fill(color);

            // Calculate position in WebGL coordinates (center-based)
            const xPos = x - (cols / 2) + 0.5; // +0.5 centers in cell
            const yPos = y - (rows / 2) + 0.5; // +0.5 centers in cell

            this._p.rect(xPos, yPos, 1, 1);
            this._p.pop();
            fb.end();
        };

        // Process each cell in the JSON
        for (const cell of jsonData.cells) {
            // Skip invalid cells
            if (cell.x < 0 || cell.y < 0 || cell.x >= cols || cell.y >= rows) {
                continue;
            }

            // Set character data using the fontManager's glyphColor method
            if (cell.character) {
                const charColor = this._fontManager.glyphColor(cell.character);
                setPixel(characterFramebuffer, cell.x, cell.y, charColor);
            }

            // Set color data
            if (cell.color) {
                setPixel(primaryColorFramebuffer, cell.x, cell.y, cell.color);
            }

            // Set background color
            if (cell.backgroundColor) {
                setPixel(secondaryColorFramebuffer, cell.x, cell.y, cell.backgroundColor);
            }

            // Set rotation data (0, 90, 180, or 270 degrees)
            if (cell.rotation !== undefined) {
                let rotationValue;

                // Map rotation degrees to 0-255 value range
                const rotationNormalized = Math.round((cell.rotation % 360) * (255 / 360));
                rotationValue = `rgb(${rotationNormalized}%, 0%, 0%)`;

                setPixel(rotationFramebuffer, cell.x, cell.y, rotationNormalized);
            }

            // Set transform data (flipping and inversion)
            if (cell.flipHorizontal !== undefined || cell.flipVertical !== undefined || cell.inverted !== undefined) {
                const inverted = cell.inverted === true;
                const flipH = cell.flipHorizontal === true;
                const flipV = cell.flipVertical === true;

                setPixel(transformFramebuffer, cell.x, cell.y, [
                    inverted ? 255 : 0,
                    flipH ? 255 : 0,
                    flipV ? 255 : 0,
                    255
                ]);
            }
        }

        // Return all the framebuffers for use by the renderer
        return {
            characterFramebuffer,
            primaryColorFramebuffer,
            secondaryColorFramebuffer,
            transformFramebuffer,
            rotationFramebuffer
        };
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
     *      rect(0, 0, 10, 10);
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
     * Returns the {@link P5AsciifyGrid} instance, which contains information about grid properties.
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
    get grid(): P5AsciifyGrid { return this._grid; }

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
    get fontManager(): P5AsciifyFontManager { return this._fontManager; }

    /**
     * Retrieves the framebuffer that contains the content to asciify.
     * 
     * The returned framebuffer either contains everything drawn on the p5.js main canvas, or a custom framebuffer if set during initialization.
     * 
     * @ignore
     */
    get captureFramebuffer(): p5.Framebuffer | p5.Graphics { return this._captureFramebuffer; }

    /**
     * Returns the ASCII output texture as a `p5.Framebuffer`, which can be used for further processing or rendering.
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
    get texture(): p5.Framebuffer { return this._rendererManager.asciiDisplayRenderer.resultFramebuffer; }
}