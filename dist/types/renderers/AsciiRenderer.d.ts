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
     * Creates a new ASCII renderer instance.
     *
     * @remarks
     * This constructor is meant for internal use by the `p5.asciify` library.
     *
     * To create renderers, use `p5asciify.renderers().add()`.
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
     */
    resizeFramebuffers(): void;
    /**
     * Resets the shaders for the renderer.
     */
    resetShaders(): void;
    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    update(newOptions: Partial<AsciiRendererOptions>): void;
    /**
     * Convert and render the input framebuffer to ASCII.
     * @param inputFramebuffer - The input framebuffer to convert to ASCII.
     * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
     */
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
    /**
     * Set the characters for the character set.
     * @param characters The characters to set for the character set.
     * @throws {P5AsciifyError} If characters is not a string.
     */
    characters(characters?: string): void;
    /**
     * Invert the colors of the ASCII character and cell background colors.
     * @param invert Whether to swap the colors.
     * @throws {P5AsciifyError} If invert is not a boolean.
     */
    invert(invert: boolean): void;
    /**
     * Define the rotation angle of all characters in the grid in degrees.
     *
     * @remarks
     * Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.
     *
     * @param angle The rotation angle in degrees.
     * @throws {P5AsciifyError} If angle is not a number.
     */
    rotation(angle: number): void;
    /**
     * Set the color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws {P5AsciifyError} If color is not a p5.Color object.
     */
    characterColor(color: p5.Color): void;
    /**
     * Set the background color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     */
    backgroundColor(color: p5.Color): void;
    /**
     * Sets the color mode for ASCII characters.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     */
    characterColorMode(mode: string): void;
    /**
     * Sets the color mode for the grid cell background.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     */
    backgroundColorMode(mode: string): void;
    /**
     * Enable or disable the renderer.
     * @param enabled - Whether to enable or disable the renderer.
     * @throws {P5AsciifyError} If enabled is not a boolean.
     */
    enabled(enabled: boolean): void;
    /**
     * Enable the renderer.
     */
    enable(): void;
    /**
     * Disable the renderer.
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
     * Can also contain grid cells filled with ASCII characters by previous renderers.
     */
    get outputFramebuffer(): p5.Framebuffer;
    get options(): AsciiRendererOptions;
    get primaryColorFramebuffer(): p5.Framebuffer;
    get secondaryColorFramebuffer(): p5.Framebuffer;
    get inversionFramebuffer(): p5.Framebuffer;
    get rotationFramebuffer(): p5.Framebuffer;
    get characterFramebuffer(): p5.Framebuffer;
}
