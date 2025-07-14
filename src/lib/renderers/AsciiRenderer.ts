import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';

import { AsciiRendererOptions } from './types';
import { errorHandler } from '../errors';

/**
 * Abstract ASCII renderer base class that all custom and pre-built ASCII renderers extend from.
 */
export abstract class P5AsciifyRenderer<T extends AsciiRendererOptions = AsciiRendererOptions> {

    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    protected _primaryColorFramebuffer!: p5.Framebuffer;

    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    protected _secondaryColorFramebuffer!: p5.Framebuffer;

    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    protected _characterFramebuffer!: p5.Framebuffer;

    /** The transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     */
    protected _transformFramebuffer!: p5.Framebuffer;

    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    protected _rotationFramebuffer!: p5.Framebuffer;

    /**
     * Framebuffer settings used to configure all internal framebuffers for the renderer.
     * 
     * These settings are passed to `p5.createFramebuffer()` when creating or recreating framebuffers.
     * 
     * **Note:** The `width`, `height`, and `density` properties are managed internally and always match the grid size and pixel density.
     * 
     * Properties:
     * - `format` (number): Data format of the texture. Either `UNSIGNED_BYTE`, `FLOAT`, or `HALF_FLOAT`. Default is `UNSIGNED_BYTE`.
     * - `channels` (number): Whether to store `RGB` or `RGBA` color channels. Default is to match the main canvas, which is `RGBA`.
     * - `depth` (boolean): Whether to include a depth buffer. Default is `true`.
     * - `depthFormat` (number): Data format of depth information. Either `UNSIGNED_INT` or `FLOAT`. Default is `UNSIGNED_INT`.
     * - `stencil` (boolean): Whether to include a stencil buffer for masking. `depth` must be `true` for this feature to work. Defaults to the value of `depth` (which is `true`).
     * - `antialias` (boolean): Whether to perform anti-aliasing. If set to `true`, 2 samples will be used by default. The number of samples can also be set (e.g., 4). Default is `false`.
     * - `textureFiltering` (number): How to read values from the framebuffer. Either `LINEAR` (nearby pixels will be interpolated) or `NEAREST` (no interpolation). Default is `NEAREST`.
     * - `width` (number): Width of the framebuffer. Always matches the grid columns.
     * - `height` (number): Height of the framebuffer. Always matches the grid rows.
     * - `density` (number): Pixel density of the framebuffer. Always matches the main canvas pixel density.
     */
    protected _framebufferOptions: {
        /** Whether to perform anti-aliasing. If set to `true`, 2 samples will be used by default. The number of samples can also be set (e.g., 4). Default is `false`. */
        antialias?: boolean;

        /** How to read values from the framebuffer. Either `LINEAR` (nearby pixels will be interpolated) or `NEAREST` (no interpolation). Default is `NEAREST`. */
        textureFiltering?: any;

        /** Whether to include a depth buffer. Default is `true`. */
        depth?: boolean;

        /** The pixel density of the framebuffers. Always fixed to 1, since they are used for offscreen rendering. */
        density: number;

        /** Width of the framebuffer. Always matches the grid columns. */
        width: number;

        /** Height of the framebuffer. Always matches the grid rows. */
        height: number;

        /** Data format of depth information. Either `UNSIGNED_INT` or `FLOAT`. Default is `UNSIGNED_INT`. */
        depthFormat?: any;

        /** Data format of the texture. Either `UNSIGNED_BYTE`, `FLOAT`, or `HALF_FLOAT`. Default is `UNSIGNED_BYTE`. */
        format?: number;

        /** Whether to store `RGB` or `RGBA` color channels. Default is to match the main canvas, which is `RGBA`. */
        channels?: number;

        /** Whether to include a stencil buffer for masking. `depth` must be `true` for this feature to work. Defaults to the value of `depth` *(which is `true`)*. */
        stencil?: boolean;
    };

    /**
     * Constructs a new ASCII renderer instance. Called by derived classes.
     * @param _p The p5 instance.
     * @param _grid Grid object containing the relevant grid information.
     * @param _fontManager The font manager instance containing the ASCII characters texture.
     * @param _options The options for the ASCII renderer.
     * @ignore
     */
    constructor(
        protected _p: p5,
        protected _captureFramebuffer: p5.Framebuffer | p5.Graphics,
        protected _grid: P5AsciifyGrid,
        protected _fontManager: P5AsciifyFontManager,
        protected _options: T,
    ) {
        this._framebufferOptions = {
            antialias: false,
            textureFiltering: this._p.NEAREST,
            depthFormat: this._p.UNSIGNED_INT,
            density: 1,
            width: this._grid.cols,
            height: this._grid.rows,
        };

        this._recreateFramebuffers();
    }

    /**
     * Recreate all internal framebuffers used by the renderer.
     */
    protected _recreateFramebuffers(): void {
        const settings = {
            ...this._framebufferOptions,
            density: 1,
            width: this._grid.cols,
            height: this._grid.rows,
        };

        this._primaryColorFramebuffer = this._p.createFramebuffer(settings);
        this._secondaryColorFramebuffer = this._p.createFramebuffer(settings);
        this._transformFramebuffer = this._p.createFramebuffer(settings);
        this._characterFramebuffer = this._p.createFramebuffer(settings);
        this._rotationFramebuffer = this._p.createFramebuffer(settings);
    }

    /**
     * Resize the framebuffers to match the grid size.
     * @ignore
     */
    public abstract resizeFramebuffers(): void;

    /**
     * Reset the shaders used by the renderer.
     * @ignore
     */
    public abstract resetShaders(): void;

    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Update the brightness renderer options
     *      p5asciify.asciifier().renderers().get("brightness").update({
     *          enabled: true,
     *          characterColor: color(255, 0, 0),
     *          backgroundColor: color(0, 0, 255),
     *          characters: '.:-=+*#%@',
     *          invert: true,
     *          rotation: 90,
     *          // ...
     *      });
     *  }
     * ```
     */
    public update(newOptions: T): this {
        if (newOptions?.enabled !== undefined) {
            this.enabled(newOptions.enabled);
        }
        return this;
    }

    /**
     * Update the capture framebuffer used by the renderer.
     * @param newCaptureFramebuffer - The new capture framebuffer or graphics to use.
     * @ignore
     */
    public setCaptureTexture(newCaptureFramebuffer: p5.Framebuffer | p5.Graphics): this {
        this._captureFramebuffer = newCaptureFramebuffer;
        this.resizeFramebuffers();
        this.resetShaders();
        return this;
    }

    /**
     * Enable or disable the renderer.
     * @param enabled - Whether to enable or disable the renderer.
     * @returns The current/new state of the renderer.
     * @throws If the provided enabled value is not a boolean.
     * 
     * @example
     * ```javascript
     *  function keyPressed() {
     *      if (key === 'd') {
     *          // Disable the brightness renderer
     *          p5asciify.asciifier().renderers().get("brightness").enabled(false);
     *      } else if (key === 'e') {
     *          // Enable the brightness renderer
     *          p5asciify.asciifier().renderers().get("brightness").enabled(true);
     *      }
     *  }
     * ```
     */
    public enabled(enabled?: boolean): this {
        if (enabled === undefined) {
            return this;
        }

        const isValidType = errorHandler.validate(
            typeof enabled === 'boolean',
            'Enabled must be a boolean.',
            { providedValue: enabled, method: 'enabled' }
        );

        if (!isValidType) {
            return this;
        }

        this._options.enabled = enabled;

        if (!enabled) {
            const framebuffers = [
                this._primaryColorFramebuffer,
                this._secondaryColorFramebuffer,
                this._transformFramebuffer,
                this._rotationFramebuffer,
                this._characterFramebuffer
            ];

            for (const framebuffer of framebuffers) {
                framebuffer.draw(() => { this._p.clear(); });
            }
        }

        return this;
    }

    /**
     * Enable the renderer.
     * @returns The new state of the renderer.
     * 
     * @example
     * ```javascript
     *  function keyPressed() {
     *      if (key === 'd') {
     *          // Disable the brightness renderer
     *          p5asciify.asciifier().renderers().get("brightness").disable();
     *      } else if (key === 'e') {
     *          // Enable the brightness renderer
     *          p5asciify.asciifier().renderers().get("brightness").enable();
     *      }
     *  }
     * ```
     */
    public enable(): this {
        return this.enabled(true);
    }

    /**
     * Disable the renderer.
     * 
     * Disabling the renderer will clear all framebuffers, 
     * and prevent the renderer from being executed in the rendering pipeline.
     * 
     * @returns The new state of the renderer.
     * 
     * @example
     * ```javascript
     *  function keyPressed() {
     *      if (key === 'd') {
     *          // Disable the brightness renderer
     *          p5asciify.asciifier().renderers().get("brightness").disable();
     *      } else if (key === 'e') {
     *          // Enable the brightness renderer
     *          p5asciify.asciifier().renderers().get("brightness").enable();
     *      }
     *  }
     * ```
     */
    public disable(): this {
        return this.enabled(false);
    }

    /**
     * Get the set options for the ASCII renderer.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Get the brightness renderer options
     *      const brightnessOptions = p5asciify.asciifier().renderers().get("brightness").options();
     *      console.log(brightnessOptions);
     *  }
     * ```
     */
    get options() { return this._options; }


    /**
     * Get the primary color framebuffer, whose pixels define the character colors of the grid cells.
     * 
     * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
     * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
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
     *      // Get the asciifier instance
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Enable the default custom renderer
     *      asciifier.renderers().get("custom2D").enable();
     *      
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
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
    get primaryColorFramebuffer() { return this._primaryColorFramebuffer; }


    /**
     * Get the secondary color framebuffer, whose pixels define the background colors of the grid cells.
     * 
     * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
     * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
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
     *      // Get the asciifier instance
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Enable the default custom renderer
     *      asciifier.renderers().get("custom2D").enable();
     *      
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
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
    get secondaryColorFramebuffer() { return this._secondaryColorFramebuffer; }

    /**
     * Get the transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     * 
     * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
     * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
     * 
     * @example
     * ```javascript
     *  let characterFramebuffer;
     *  let primaryColorFramebuffer;
     *  let secondaryColorFramebuffer;
     *  let transformFramebuffer;
     * 
     *  let asciifier;
     * 
     *  function setup() {
     *      createCanvas(400, 400, WEBGL);
     *  }
     * 
     *  function setupAsciify() {
     * 
     *      // Get the asciifier instance
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Enable the default custom renderer
     *      asciifier.renderers().get("custom2D").enable();
     *      
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
     *      transformFramebuffer = asciifier.renderers().get("custom2D").transformFramebuffer;
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
     * 
     *      // Swap the character and background colors of all grid cells,
     *      // and flip the ASCII characters horizontally.
     *      transformFramebuffer.begin();
     *      background(255, 255, 0); 
     *      transformFramebuffer.end();
     *  }
     * ```
     */
    get transformFramebuffer() { return this._transformFramebuffer; }

    /**
     * Get the rotation framebuffer, whose pixels define the rotation angle of each character in the grid.
     * 
     * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
     * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
     * 
     * @example
     * ```javascript
     *  let characterFramebuffer;
     *  let primaryColorFramebuffer;
     *  let secondaryColorFramebuffer;
     *  let rotationFramebuffer;
     * 
     *  let asciifier;
     * 
     *  function setup() {
     *      createCanvas(400, 400, WEBGL);
     *  }
     * 
     *  function setupAsciify() {
     *      // Get the asciifier instance
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Enable the default custom renderer
     *      asciifier.renderers().get("custom2D").enable();
     *      
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
     *      rotationFramebuffer = asciifier.renderers().get("custom2D").rotationFramebuffer;
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
     * 
     *      // Rotates all characters in the grid by X degrees. 
     *      // Utilize the red color channel for the rotation angle.
     *      rotationFramebuffer.begin();
     *      background('rgb(25%, 0%, 0%)'); // 25% of 360 degrees = 90 degrees
     *      rotationFramebuffer.end();
     *  }
     * ```
     */
    get rotationFramebuffer() { return this._rotationFramebuffer; }


    /**
     * Get the framebuffer settings used to configure all internal framebuffers for the renderer.
     */
    get framebufferOptions() { return this._framebufferOptions; }

    /**
     * Get the character framebuffer, whose pixels define the ASCII characters to use in the grid cells.
     * 
     * Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
     * In `'custom2D'` renderers, you must write to it manually in your `draw()` function.
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
     *      // Get the asciifier instance
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Enable the default custom renderer
     *      asciifier.renderers().get("custom2D").enable();
     *      
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     *      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
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
    get characterFramebuffer() { return this._characterFramebuffer; }

    /**
     * Get the grid object containing the relevant grid information.
     * @ignore
     */
    get grid() { return this._grid; }
}