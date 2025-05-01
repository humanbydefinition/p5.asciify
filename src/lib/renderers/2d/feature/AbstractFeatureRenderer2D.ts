import p5 from 'p5';
import { P5AsciifyGrid } from '../../../Grid';
import { P5AsciifyFontManager } from '../../../FontManager';
import { P5AsciifyRenderer2D } from '../AsciiRenderer2D';
import { FeatureAsciiRendererOptions } from '../../types';
import { P5AsciifyError } from '../../../AsciifyError';
import { P5AsciifyColorPalette } from '../../../ColorPalette';


/**
 * Abstract class for feature-based 2D ASCII renderers.
 */
export abstract class AbstractFeatureRenderer2D<T extends FeatureAsciiRendererOptions = FeatureAsciiRendererOptions> extends P5AsciifyRenderer2D<T> {

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
    constructor(
        p: p5,
        grid: P5AsciifyGrid,
        fontManager: P5AsciifyFontManager,
        options: T
    ) {
        super(p, grid, fontManager, options);

        this._characterColorPalette = new P5AsciifyColorPalette(this._p, this._fontManager.glyphColors(this._options.characters));

        this.update(this._options);
    }

    /**
     * Set the characters for the character set.
     * @param characters The characters to set for the character set.
     * @throws {P5AsciifyError} If characters is not a string.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the character set to '.:-=+*#%@' for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").characters('.:-=+*#%@');
     *  }
     * ```
     */
    public characters(characters: string = ""): void {
        if (typeof characters !== 'string') {
            throw new P5AsciifyError('Characters must be a string.');
        }

        this._fontManager.validateCharacters(characters);

        this._characterColorPalette.setColors(this._fontManager.glyphColors(characters));
        this.resetShaders();

        this._options.characters = characters;
    }

    /**
     * Swap the colors of the ASCII character and cell background colors.
     * @param invert Whether to swap the colors.
     * @throws {P5AsciifyError} If invert is not a boolean.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable invert mode for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").invert(true);
     *  }
     * ```
     */
    public invert(invert: boolean): void {
        if (typeof invert !== 'boolean') {
            throw new P5AsciifyError('Invert mode must be a boolean.');
        }

        this._options.invertMode = invert;
    }

    /**
     * Resets relevant shaders for the renderer when certain options are updated.
     * @ignore
     */
    public abstract resetShaders(): void;

    /**
     * Convert the input framebuffer into separate ASCII framebuffers based on pre-built renderer settings,
     * which are used by the final {@link P5AsciifyDisplayRenderer} to render the final ASCII output.
     * @param inputFramebuffer - The input framebuffer to convert to ASCII.
     * @ignore
     */
    abstract render(inputFramebuffer: p5.Framebuffer): void;

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
     * @throws {P5AsciifyError} If angle is not a number.
     */
    public rotation(angle: number): void {
        if (typeof angle !== 'number') {
            throw new P5AsciifyError('Rotation angle must be a number');
        }

        // Normalize angle to 0-360 range
        angle = angle % 360;
        if (angle < 0) angle += 360;

        // Map 0-360 degrees to 0-255 range for the red channel
        const normalizedValue = angle / 360;
        const red = Math.round(normalizedValue * 255);

        this._options.rotationAngle = this._p.color(red, 0, 0);
    }

    /**
     * Set the color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws {P5AsciifyError} If color is not a p5.Color object.
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
    public characterColor(color: p5.Color): void {
        if (!color || !(color instanceof p5.Color)) {
            throw new P5AsciifyError('Character color must be a valid p5.Color object');
        }

        this._options.characterColor = color;
    }

    /**
     * Define whether to flip the ASCII characters horizontally.
     * @param flip Whether to flip the characters horizontally.
     * @throws {P5AsciifyError} If flip is not a boolean.
     */
    public flipHorizontally(flip: boolean): void {
        if (typeof flip !== 'boolean') {
            throw new P5AsciifyError('Flip horizontally must be a boolean');
        }

        this._options.flipHorizontally = flip;
    }

    /**
     * Define whether to flip the ASCII characters vertically.
     * @param flip Whether to flip the characters vertically.
     * @throws {P5AsciifyError} If flip is not a boolean.
     */
    public flipVertically(flip: boolean): void {
        if (typeof flip !== 'boolean') {
            throw new P5AsciifyError('Flip vertically must be a boolean');
        }

        this._options.flipVertically = flip;
    }

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
     *      p5asciify.asciifier().renderers().get("brightness").backgroundColor(color(255, 0, 0));
     *  }
     * ```
     */
    public backgroundColor(color: p5.Color): void {
        if (!color || !(color instanceof p5.Color)) {
            throw new P5AsciifyError('Background color must be a valid p5.Color object');
        }

        this._options.backgroundColor = color;
    }

    /**
     * Sets the color mode for ASCII characters.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the character color mode to 'fixed' for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").characterColorMode('fixed');
     *  }
     * ```
     */
    public characterColorMode(mode: string): void {
        if (typeof mode !== 'string') {
            throw new P5AsciifyError('Character color mode must be a string');
        }

        if (mode !== 'sampled' && mode !== 'fixed') {
            throw new P5AsciifyError("Character color mode must be either 'sampled' or 'fixed'");
        }

        if (mode === 'sampled') {
            this._options.characterColorMode = 0;
        } else if (mode === 'fixed') {
            this._options.characterColorMode = 1;
        }
    }

    /**
     * Sets the color mode for the grid cell background.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color mode to 'sampled' for the brightness renderer.
     *      p5asciify.asciifier().renderers().get("brightness").backgroundColorMode('sampled');
     *  }
     * ```
     */
    public backgroundColorMode(mode: string): void {
        if (typeof mode !== 'string') {
            throw new P5AsciifyError('Background color mode must be a string');
        }

        if (mode !== 'sampled' && mode !== 'fixed') {
            throw new P5AsciifyError("Background color mode must be either 'sampled' or 'fixed'");
        }

        if (mode === 'sampled') {
            this._options.backgroundColorMode = 0;
        } else if (mode === 'fixed') {
            this._options.backgroundColorMode = 1;
        }
    }

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
        super.update(newOptions);

        if (newOptions?.enabled !== undefined) {
            this.enabled(newOptions.enabled);
        }

        if (newOptions?.characterColor !== undefined) {
            newOptions.characterColor = this._p.color(newOptions.characterColor as string);
            this.characterColor(newOptions.characterColor as p5.Color);
        }

        if (newOptions?.backgroundColor !== undefined) {
            newOptions.backgroundColor = this._p.color(newOptions.backgroundColor as string);
            this.backgroundColor(newOptions.backgroundColor as p5.Color);
        }

        if (newOptions?.characters !== undefined) {
            this.characters(newOptions.characters);
        }

        if (newOptions?.invertMode !== undefined) {
            this.invert(newOptions.invertMode);
        }

        if (newOptions?.rotationAngle !== undefined) {
            this.rotation(newOptions.rotationAngle as number);
        }

        if (newOptions?.characterColorMode !== undefined) {
            this.characterColorMode(newOptions.characterColorMode as string);
        }

        if (newOptions?.backgroundColorMode !== undefined) {
            this.backgroundColorMode(newOptions.backgroundColorMode as string);
        }

        if (newOptions?.flipHorizontally !== undefined) {
            this.flipHorizontally(newOptions.flipHorizontally);
        }

        if (newOptions?.flipVertically !== undefined) {
            this.flipVertically(newOptions.flipVertically);
        }
    }

    /**
     * Get the {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set.
     */
    get characterColorPalette() { return this._characterColorPalette; }
}