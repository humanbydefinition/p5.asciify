import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyColorPalette } from '../ColorPalette';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { AsciiRendererOptions } from './types';
/** Default configuration options for `"custom"` ASCII renderer */
export declare const CUSTOM_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/**
 * Base ASCII renderer class for custom shader-based ASCII Renderers.
 */
export declare class P5AsciifyRenderer {
    /** The p5 instance. */
    protected _p: p5;
    /** The grid to render the ASCII characters on. */
    protected _grid: P5AsciifyGrid;
    /** The font texture atlas containing the ASCII characters texture. */
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    /** The options for the ASCII renderer. */
    protected _options: AsciiRendererOptions;
    /** The color palette containing colors that correspond to the defined character set. */
    protected _characterColorPalette: P5AsciifyColorPalette;
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    protected _primaryColorFramebuffer: p5.Framebuffer;
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    protected _secondaryColorFramebuffer: p5.Framebuffer;
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    protected _characterFramebuffer: p5.Framebuffer;
    /** The inversion framebuffer, whose pixels define whether to swap the character and background colors. */
    protected _inversionFramebuffer: p5.Framebuffer;
    protected _rotationFramebuffer: p5.Framebuffer;
    /** The output framebuffer, where the final ASCII conversion is rendered. */
    protected _outputFramebuffer: p5.Framebuffer;
    /** The shader used for the ASCII conversion. */
    protected _shader: p5.Shader;
    /**
     * Creates a new `"custom"` ASCII renderer instance.
     *
     * @remarks
     * This constructor is meant for internal use by the `p5.asciify` library.
     *
     * To create renderers, use `p5asciify.renderers().add("name", "custom", { enabled: true });`.
     * This will also return an instance of the renderer, which can be used to modify the renderer's properties.
     * Additionally, the renderer will also be added to the end of the rendering pipeline automatically.
     *
     * @param _p The p5 instance.
     * @param _grid Grid object containing the relevant grid information.
     * @param _fontTextureAtlas The font texture atlas containing the ASCII characters texture.
     * @param _options The options for the ASCII renderer.
     */
    constructor(
    /** The p5 instance. */
    _p: p5, 
    /** The grid to render the ASCII characters on. */
    _grid: P5AsciifyGrid, 
    /** The font texture atlas containing the ASCII characters texture. */
    _fontTextureAtlas: P5AsciifyFontTextureAtlas, 
    /** The options for the ASCII renderer. */
    _options?: AsciiRendererOptions);
    /**
     * Resizes all framebuffers based on the grid dimensions.
     *
     * **It is redundant to call this method manually,
     * as it is done automatically by `p5.asciify` when the canvas is resized or the grid is updated.**
     */
    resizeFramebuffers(): void;
    /**
     * Resets the shaders for the renderer.
     *
     * Not relevant for this base class, but used in derived classes for reloading certain shaders with updated constants.
     *
     * **It is redundant to call this method manually,
     * as it is done automatically by `p5.asciify` when updating the font, font size, or other settings.**
     */
    resetShaders(): void;
    /**
     * Updates renderer options.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Update the brightness renderer options
     *      p5asciify.renderers().get("brightness").update({
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
     *
     * @param newOptions - The new options to update.
     */
    update(newOptions: Partial<AsciiRendererOptions>): void;
    /**
     * Convert and render the input framebuffer to ASCII.
     *
     * **This method is called automatically by the `P5AsciifyRendererManager` class
     * for each enabled renderer in the pipeline. Calling this method manually is redundant and causes unnecessary overhead.**
     *
     * @param inputFramebuffer - The input framebuffer to convert to ASCII.
     * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
     */
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
    /**
     * Set the characters for the character set.
     * @param characters The characters to set for the character set.
     * @throws {P5AsciifyError} If characters is not a string.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the character set to '.:-=+*#%@' for the brightness renderer.
     *      p5asciify.renderers().get("brightness").characters('.:-=+*#%@');
     *  }
     * ```
     */
    characters(characters?: string): void;
    /**
     * Invert the colors of the ASCII character and cell background colors.
     * @param invert Whether to swap the colors.
     * @throws {P5AsciifyError} If invert is not a boolean.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable invert mode for the brightness renderer.
     *      p5asciify.renderers().get("brightness").invert(true);
     *  }
     * ```
     */
    invert(invert: boolean): void;
    /**
     * Define the rotation angle of all characters in the grid in degrees.
     *
     * @remarks
     * Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Rotate all characters in the grid by 90 degrees for the brightness renderer.
     *      p5asciify.renderers().get("brightness").rotation(90);
     *  }
     * ```
     *
     * @param angle The rotation angle in degrees.
     * @throws {P5AsciifyError} If angle is not a number.
     */
    rotation(angle: number): void;
    /**
     * Set the color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws {P5AsciifyError} If color is not a p5.Color object.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
    *       // Set the character color to green for the brightness renderer.
     *      // (Is applied if the character color mode of this renderer is set to 'fixed')
     *      p5asciify.renderers().get("brightness").characterColor(color(0, 255, 0));
     *  }
     * ```
     */
    characterColor(color: p5.Color): void;
    /**
     * Set the background color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws {P5AsciifyError} If color is not a p5.Color object.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the cell background color to red for the brightness renderer.
     *      // (Is applied if the background color mode of this renderer is set to 'fixed')
     *      p5asciify.renderers().get("brightness").backgroundColor(color(255, 0, 0));
     *  }
     * ```
     */
    backgroundColor(color: p5.Color): void;
    /**
     * Sets the color mode for ASCII characters.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the character color mode to 'fixed' for the brightness renderer.
     *      p5asciify.renderers().get("brightness").characterColorMode('fixed');
     *  }
     * ```
     */
    characterColorMode(mode: string): void;
    /**
     * Sets the color mode for the grid cell background.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color mode to 'sampled' for the brightness renderer.
     *      p5asciify.renderers().get("brightness").backgroundColorMode('sampled');
     *  }
     * ```
     */
    backgroundColorMode(mode: string): void;
    /**
     * Enable or disable the renderer.
     * @param enabled - Whether to enable or disable the renderer.
     * @throws {P5AsciifyError} If enabled is not a boolean.
     *
     * @example
     * ```javascript
     *  function keyPressed() {
     *      if (key === 'd') {
     *          // Disable the brightness renderer
     *          p5asciify.renderers().get("brightness").enabled(false);
     *      } else if (key === 'e') {
     *          // Enable the brightness renderer
     *          p5asciify.renderers().get("brightness").enabled(true);
     *      }
     * }
     * ```
     */
    enabled(enabled: boolean): void;
    /**
     * Enable the renderer.
     *
     * @example
     * ```javascript
     *  function keyPressed() {
     *      if (key === 'd') {
     *          // Disable the brightness renderer
     *          p5asciify.renderers().get("brightness").disable();
     *      } else if (key === 'e') {
     *          // Enable the brightness renderer
     *          p5asciify.renderers().get("brightness").enable();
     *      }
     *  }
     * ```
     */
    enable(): void;
    /**
     * Disable the renderer.
     *
     * Disabling the renderer will clear all framebuffers,
     * and prevent the renderer being executed in the rendering pipeline.
     *
     * @example
     * ```javascript
     *  function keyPressed() {
     *      if (key === 'd') {
     *          // Disable the brightness renderer
     *          p5asciify.renderers().get("brightness").disable();
     *      } else if (key === 'e') {
     *          // Enable the brightness renderer
     *          p5asciify.renderers().get("brightness").enable();
     *      }
     *  }
     * ```
     */
    disable(): void;
    /**
     * Get the color palette object containing colors that correspond to the defined character set.
     *
     * Not relevant for this base class,
     * but used in derived classes for mapping brightness values to those colors for example,
     * which are then translated to ASCII characters.
     */
    get characterColorPalette(): P5AsciifyColorPalette;
    /**
     * Get the output framebuffer, where the final ASCII conversion is rendered.
     *
     * Can also contain grid cells filled with ASCII characters by previous renderers in the pipeline.
     */
    get outputFramebuffer(): p5.Framebuffer;
    /**
     * Get the set options for the ASCII renderer.
     *
     * **Do not modify directly, since some changes might not be reflected.
     * Use the `update()` method or the specific setter methods instead.**
     */
    get options(): AsciiRendererOptions;
    /**
     * Get the primary color framebuffer, whose pixels define the character colors of the grid cells.
     *
     * Subclasses write to this buffer automatically based on your settings.
     * In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.
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
     *      // Assign the ascii renderer's framebuffers to a global variable
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
    get primaryColorFramebuffer(): p5.Framebuffer;
    /**
     * Get the secondary color framebuffer, whose pixels define the background colors of the grid cells.
     *
     * Subclasses write to this buffer automatically based on your settings.
     * In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.
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
     *      // Assign the ascii renderer's framebuffers to a global variable
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
    get secondaryColorFramebuffer(): p5.Framebuffer;
    /**
     * Get the inversion framebuffer,
     * whose pixels define whether to swap the character and background colors of the grid cells.
     *
     * Subclasses write to this buffer automatically based on your settings.
     * In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.
     *
     * @example
     * ```javascript
     *  let characterFramebuffer;
     *  let primaryColorFramebuffer;
     *  let secondaryColorFramebuffer;
     *  let inversionFramebuffer;
     *
     *  function setup() {
     *      createCanvas(400, 400, WEBGL);
     *  }
     *
     *  function setupAsciify() {
     *      // Enable the default custom renderer
     *      p5asciify.renderers().get("custom").enable();
     *
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
     *      primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
     *      inversionFramebuffer = p5asciify.renderers().get("custom").inversionFramebuffer;
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
     *
     *      // Swap the character and background colors of all grid cells.
     *      inversionFramebuffer.begin();
     *      background(255); // WHITE = swap, BLACK = don't swap
     *      inversionFramebuffer.end();
     *  }
     * ```
     */
    get inversionFramebuffer(): p5.Framebuffer;
    /**
     * Get the rotation framebuffer, whose pixels define the rotation angle of each character in the grid.
     *
     * Subclasses write to this buffer automatically based on your settings.
     * In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.
     *
     * @example
     * ```javascript
     *  let characterFramebuffer;
     *  let primaryColorFramebuffer;
     *  let secondaryColorFramebuffer;
     *  let rotationFramebuffer;
     *
     *  function setup() {
     *      createCanvas(400, 400, WEBGL);
     *  }
     *
     *  function setupAsciify() {
     *      // Enable the default custom renderer
     *      p5asciify.renderers().get("custom").enable();
     *
     *      // Assign the ascii renderer's framebuffers to a global variable
     *      characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
     *      primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
     *      secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
     *      rotationFramebuffer = p5asciify.renderers().get("custom").rotationFramebuffer;
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
     *
     *      // Rotates all characters in the grid by 270 degrees.
     *      // Utilize the red and green channels for the rotation angle.
     *      rotationFramebuffer.begin();
     *      background(255, 15, 0); // a bit cheesy right now, but you get the idea.
     *      rotationFramebuffer.end();
     *  }
     * ```
     */
    get rotationFramebuffer(): p5.Framebuffer;
    /**
     * Get the character framebuffer, whose pixels define the ASCII characters to use in the grid cells.
     *
     * Subclasses write to this buffer automatically based on your settings.
     * In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.
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
     *      // Assign the ascii renderer's framebuffers to a global variable
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
    get characterFramebuffer(): p5.Framebuffer;
}
