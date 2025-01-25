import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyColorPalette } from '../ColorPalette';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { AsciiRendererOptions } from './types';
export declare const CUSTOM_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/**
 * Class for shader-based ASCII Renderers.
 */
export declare class P5AsciifyRenderer {
    protected p: p5;
    protected grid: P5AsciifyGrid;
    protected fontTextureAtlas: P5AsciifyFontTextureAtlas;
    protected _options: AsciiRendererOptions;
    characterColorPalette: P5AsciifyColorPalette;
    protected _primaryColorFramebuffer: p5.Framebuffer;
    protected _secondaryColorFramebuffer: p5.Framebuffer;
    protected _characterFramebuffer: p5.Framebuffer;
    protected _inversionFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;
    protected _shader: p5.Shader;
    constructor(p: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, _options?: AsciiRendererOptions);
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
    get outputFramebuffer(): p5.Framebuffer;
    get options(): AsciiRendererOptions;
    get primaryColorFramebuffer(): p5.Framebuffer;
    get secondaryColorFramebuffer(): p5.Framebuffer;
    get inversionFramebuffer(): p5.Framebuffer;
    get characterFramebuffer(): p5.Framebuffer;
}
