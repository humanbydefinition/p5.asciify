import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyError } from '../AsciifyError';
import { P5AsciifyFontManager } from '../FontManager';

import { AsciiRendererOptions } from './types';

/**
 * Abstract ASCII renderer base class that all custom and pre-built ASCII renderers extend from.
 */
export abstract class P5AsciifyRenderer<T extends AsciiRendererOptions = AsciiRendererOptions> {

    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    protected _primaryColorFramebuffer: p5.Framebuffer;

    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    protected _secondaryColorFramebuffer: p5.Framebuffer;

    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    protected _characterFramebuffer: p5.Framebuffer;

    /** The transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     */
    protected _transformFramebuffer: p5.Framebuffer;

    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    protected _rotationFramebuffer: p5.Framebuffer;

    /**
     * Constructs a new ASCII renderer instance. Called by derived classes.
     * @param _p The p5 instance.
     * @param _grid Grid object containing the relevant grid information.
     * @param initialFramebufferDimensions The initial framebuffer dimensions.
     * @param _fontManager The font manager instance containing the ASCII characters texture.
     * @param _options The options for the ASCII renderer.
     * @ignore
     */
    constructor(
        protected _p: p5,
        protected _grid: P5AsciifyGrid,
        protected initialFramebufferDimensions: {
            width: number,
            height: number
        },
        protected _fontManager: P5AsciifyFontManager,
        protected _options: T,
    ) {
        const framebufferSettings = {
            density: 1,
            antialias: false,
            width: initialFramebufferDimensions.width,
            height: initialFramebufferDimensions.height,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        };

        this._primaryColorFramebuffer = this._p.createFramebuffer(framebufferSettings);
        this._secondaryColorFramebuffer = this._p.createFramebuffer(framebufferSettings);
        this._transformFramebuffer = this._p.createFramebuffer(framebufferSettings);
        this._characterFramebuffer = this._p.createFramebuffer(framebufferSettings);
        this._rotationFramebuffer = this._p.createFramebuffer(framebufferSettings);
    }

    /**
     * Resize the framebuffers to match the grid size.
     * @ignore
     */
    public abstract resizeFramebuffers(): void;

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
     *          invertMode: true,
     *          rotationAngle: 90,
     *          // ...
     *      });
     *  }
     * ```
     */
    public update(newOptions: T): void {
        if (newOptions?.enabled !== undefined) {
            this.enabled(newOptions.enabled);
        }
    }

    /**
     * Enable or disable the renderer.
     * @param enabled - Whether to enable or disable the renderer.
     * @returns The current/new state of the renderer.
     * @throws {P5AsciifyError} If the provided enabled value is not a boolean.
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
    public enabled(enabled?: boolean): boolean {
        if (enabled === undefined) {
            return this._options.enabled as boolean;
        }

        if (typeof enabled !== 'boolean') {
            throw new P5AsciifyError('Enabled must be a boolean.');
        }

        this._options.enabled = enabled;

        if (!enabled) {
            const framebuffers = [
                this._primaryColorFramebuffer,
                this._secondaryColorFramebuffer,
                this._transformFramebuffer,
                this._rotationFramebuffer,
                this._characterFramebuffer
            ]

            for (const framebuffer of framebuffers) {
                framebuffer.draw(() => { this._p.clear(); });
            }
        }

        return this._options.enabled;
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
    public enable(): boolean {
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
    public disable(): boolean {
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
}