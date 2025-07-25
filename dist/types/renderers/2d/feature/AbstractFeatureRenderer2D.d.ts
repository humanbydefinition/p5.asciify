import p5 from 'p5';
import { P5AsciifyGrid } from '../../../Grid';
import { P5AsciifyFontManager } from '../../../FontManager';
import { P5AsciifyRenderer2D } from '../AsciiRenderer2D';
import { FeatureAsciiRendererOptions } from '../../types';
import { P5AsciifyColorPalette } from '../../../ColorPalette';
/**
 * Abstract class for feature-based 2D ASCII renderers.
 */
export declare abstract class P5AsciifyAbstractFeatureRenderer2D<T extends FeatureAsciiRendererOptions = FeatureAsciiRendererOptions> extends P5AsciifyRenderer2D<T> {
    /** {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set. */
    protected _characterColorPalette: P5AsciifyColorPalette;
    /**
     * Creates a new feature-based 2D ASCII renderer instance.
     * @param p The p5 instance.
     * @param grid Grid object containing the relevant grid information.
     * @param fontManager The font texture atlas containing the ASCII characters texture.
     * @param options The options for the ASCII renderer.
     * @ignore
     */
    constructor(p: p5, captureFramebuffer: p5.Framebuffer | p5.Graphics, grid: P5AsciifyGrid, fontManager: P5AsciifyFontManager, options: T);
    /**
     * Set the characters for the character set.
     * @param characters The characters to set for the character set.
     * @throws If characters is not a string.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the character set to '.:-=+*#%@' for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").characters('.:-=+*#%@');
     *  }
     * ```
     */
    characters(characters: string): this;
    /**
     * Swap the colors of the ASCII character and cell background colors.
     * @param invert Whether to swap the colors.
     * @throws If invert is not a boolean.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable invert mode for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").invert(true);
     *  }
     * ```
     */
    invert(invert: boolean): this;
    /**
     * Resets relevant shaders for the renderer when certain options are updated.
     * @ignore
     */
    abstract resetShaders(): void;
    /**
     * Convert the input framebuffer into separate ASCII framebuffers based on pre-built renderer settings,
     * which are used by the final {@link P5AsciifyDisplayRenderer} to render the final ASCII output.
     * @ignore
     */
    abstract render(): void;
    /**
     * Define the rotation angle of all characters in the grid affected by the renderer in degrees.
     *
     * @remarks
     * Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Rotate all characters in the grid by 90 degrees for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").rotation(90);
     *  }
     * ```
     *
     * @param angle The rotation angle in degrees.
     * @throws If angle is not a number.
     */
    rotation(angle: number): this;
    /**
     * Set the color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws If color is not a p5.Color object.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *          // Set the character color to green for the brightness renderer.
     *      // (Is applied if the character color mode of this renderer is set to 'fixed')
     *      p5asciify.asciifier().renderers().get("brightness").characterColor(color(0, 255, 0));
     *  }
     * ```
     */
    characterColor(color: p5.Color): this;
    /**
     * Define whether to flip the ASCII characters horizontally.
     * @param flip Whether to flip the characters horizontally.
     * @throws If flip is not a boolean.
     */
    flipHorizontally(flip: boolean): this;
    /**
     * Define whether to flip the ASCII characters vertically.
     * @param flip Whether to flip the characters vertically.
     * @throws If flip is not a boolean.
     */
    flipVertically(flip: boolean): this;
    /**
     * Set the background color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws If color is not a p5.Color object.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the cell background color to red for the brightness renderer.
     *      // (Is applied if the background color mode of this renderer is set to 'fixed')
     *      p5asciify.asciifier().renderers().get("brightness").backgroundColor(color(255, 0, 0));
     *  }
     * ```
     */
    backgroundColor(color: p5.Color): this;
    /**
     * Sets the color mode for ASCII characters.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the character color mode to 'fixed' for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").characterColorMode('fixed');
     *  }
     * ```
     */
    characterColorMode(mode: string): this;
    /**
     * Sets the color mode for the grid cell background.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color mode to 'sampled' for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").backgroundColorMode('sampled');
     *  }
     * ```
     */
    backgroundColorMode(mode: string): this;
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
    update(newOptions: T): this;
    /**
     * Get the {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set.
     */
    get characterColorPalette(): P5AsciifyColorPalette;
}
