import p5 from 'p5';
import { P5AsciifyGrid } from '../../../Grid';
import { P5AsciifyFontManager } from '../../../FontManager';
import { P5AsciifyRenderer2D } from '../AsciiRenderer2D';
import { FeatureAsciiRendererOptions } from '../../types';
import { P5AsciifyColorPalette } from '../../../ColorPalette';
import { errorHandler } from '../../../errors';
import { isValidP5Color } from '../../../utils';


/**
 * Abstract class for feature-based 2D ASCII renderers.
 */
export abstract class P5AsciifyAbstractFeatureRenderer2D<T extends FeatureAsciiRendererOptions = FeatureAsciiRendererOptions> extends P5AsciifyRenderer2D<T> {

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
        captureFramebuffer: p5.Framebuffer | p5.Graphics,
        grid: P5AsciifyGrid,
        fontManager: P5AsciifyFontManager,
        options: T
    ) {
        super(p, captureFramebuffer, grid, fontManager, options);

        this._characterColorPalette = new P5AsciifyColorPalette(this._p, this._fontManager.glyphColors(this._options.characters));

        this.update(this._options);
    }

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
    public characters(characters: string): this {
        const isValidType = errorHandler.validate(
            typeof characters === 'string',
            'Characters must be a string.',
            { providedValue: characters, method: 'characters' }
        );

        if (!isValidType || characters === this._options.characters) {
            return this;
        }

        this._characterColorPalette.setColors(this._fontManager.glyphColors(characters));
        this.resetShaders();

        this._options.characters = characters;
        return this;
    }

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
    public invert(invert: boolean): this {
        const isValidType = errorHandler.validate(
            typeof invert === 'boolean',
            'Invert mode must be a boolean.',
            { providedValue: invert, method: 'invert' }
        );

        if (!isValidType) {
            return this;
        }

        this._options.invertMode = invert;
        return this;
    }

    /**
     * Resets relevant shaders for the renderer when certain options are updated.
     * @ignore
     */
    public abstract resetShaders(): void;

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
    public rotation(angle: number): this {
        const isValidType = errorHandler.validate(
            typeof angle === 'number' && !isNaN(angle),
            'Rotation angle must be a valid number.',
            { providedValue: angle, method: 'rotation' }
        );

        if (!isValidType) {
            return this;
        }

        angle = angle % 360;
        if (angle < 0) angle += 360;

        const scaledAngle = (angle * 255) / 360;
        const red = Math.floor(scaledAngle);
        const green = Math.round((scaledAngle - red) * 255);

        this._options.rotationAngle = this._p.color(red, green, 0);
        return this;
    }

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
    public characterColor(color: p5.Color): this {
        const isValidType = errorHandler.validate(
            isValidP5Color(this._p, color),
            'Character color must be a valid p5.Color object.',
            { providedValue: color, method: 'characterColor' }
        );

        if (!isValidType) {
            return this;
        }

        this._options.characterColor = color;
        return this;
    }

    /**
     * Define whether to flip the ASCII characters horizontally.
     * @param flip Whether to flip the characters horizontally.
     * @throws If flip is not a boolean.
     */
    public flipHorizontally(flip: boolean): this {
        const isValidType = errorHandler.validate(
            typeof flip === 'boolean',
            'Flip horizontally must be a boolean.',
            { providedValue: flip, method: 'flipHorizontally' }
        );

        if (!isValidType) {
            return this;
        }

        this._options.flipHorizontally = flip;
        return this;
    }

    /**
     * Define whether to flip the ASCII characters vertically.
     * @param flip Whether to flip the characters vertically.
     * @throws If flip is not a boolean.
     */
    public flipVertically(flip: boolean): this {
        const isValidType = errorHandler.validate(
            typeof flip === 'boolean',
            'Flip vertically must be a boolean.',
            { providedValue: flip, method: 'flipVertically' }
        );

        if (!isValidType) {
            return this;
        }

        this._options.flipVertically = flip;
        return this;
    }

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
    public backgroundColor(color: p5.Color): this {
        const isValidType = errorHandler.validate(
            isValidP5Color(this._p, color),
            'Background color must be a valid p5.Color object.',
            { providedValue: color, method: 'backgroundColor' }
        );

        if (!isValidType) {
            return this;
        }

        this._options.backgroundColor = color;
        return this;
    }

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
    public characterColorMode(mode: string): this {
        const isValidType = errorHandler.validate(
            typeof mode === 'string',
            'Character color mode must be a string.',
            { providedValue: mode, method: 'characterColorMode' }
        );

        const isValidValue = errorHandler.validate(
            mode === 'sampled' || mode === 'fixed',
            "Character color mode must be either 'sampled' or 'fixed'.",
            { providedValue: mode, method: 'characterColorMode' }
        );

        if (!isValidType || !isValidValue) {
            return this;
        }

        if (mode === 'sampled') {
            this._options.characterColorMode = 0;
        } else if (mode === 'fixed') {
            this._options.characterColorMode = 1;
        }
        return this;
    }

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
    public backgroundColorMode(mode: string): this {
        const isValidType = errorHandler.validate(
            typeof mode === 'string',
            'Background color mode must be a string.',
            { providedValue: mode, method: 'backgroundColorMode' }
        );

        const isValidValue = errorHandler.validate(
            mode === 'sampled' || mode === 'fixed',
            "Background color mode must be either 'sampled' or 'fixed'.",
            { providedValue: mode, method: 'backgroundColorMode' }
        );

        if (!isValidType || !isValidValue) {
            return this;
        }

        if (mode === 'sampled') {
            this._options.backgroundColorMode = 0;
        } else if (mode === 'fixed') {
            this._options.backgroundColorMode = 1;
        }
        return this;
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
    public update(newOptions: T): this {
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

        return this;
    }

    /**
     * Get the {@link P5AsciifyColorPalette} object containing colors that correspond to the defined character set.
     */
    get characterColorPalette() { return this._characterColorPalette; }
}