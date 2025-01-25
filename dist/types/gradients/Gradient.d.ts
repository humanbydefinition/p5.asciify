import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
/**
 * Represents a gradient that can be applied to the gradient ascii renderer.
 */
export declare abstract class P5AsciifyGradient {
    /** The p5 instance. */
    protected p: p5;
    /** The font texture atlas instance. */
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    /** The gradient shader to use. */
    protected _shader: p5.Shader;
    /** The characters to use for the gradient. */
    protected _characters: string;
    /** The start brightness value of the gradient. Should be a value between 0 and 255. */
    protected _brightnessStart: number;
    /** The end brightness value of the gradient. Should be a value between 0 and 255. */
    protected _brightnessEnd: number;
    /** Whether the gradient is enabled. */
    private _enabled;
    /** The color palette for the gradient, corresponding to the characters. */
    protected _palette: P5AsciifyColorPalette;
    constructor(
    /** The p5 instance. */
    p: p5, 
    /** The font texture atlas instance. */
    _fontTextureAtlas: P5AsciifyFontTextureAtlas, 
    /** The gradient shader to use. */
    _shader: p5.Shader, 
    /** The characters to use for the gradient. */
    _characters: string, brightnessStart: number, brightnessEnd: number);
    /**
     * Sets the uniforms for the gradient shader.
     * @param framebuffer - The framebuffer to use.
     * @param referenceFramebuffer - The reference framebuffer, which is used so two gradients cannot write onto the same pixels.
     */
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    /**
     * Sets the start brightness value.
     * @param value The brightness value to set.
     * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
     */
    brightnessStart(value: number): void;
    /**
     * Sets the end brightness value.
     * @param value The brightness value to set.
     * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
     */
    brightnessEnd(value: number): void;
    /**
     * Sets the brightness range.
     * @param start The start brightness value.
     * @param end The end brightness value.
     * @throws P5AsciifyError If the start or end value is not a number or is not within the range [0, 255].
     */
    brightnessRange(start: number, end: number): void;
    /**
     * Sets the characters to use for the gradient.
     * @param value The characters to use.
     * @throws P5AsciifyError If the string does contain characters that are not available in the font texture atlas.
     */
    characters(value: string): void;
    /**
     * Enables or disables the gradient.
     * @param value Whether to enable or disable the gradient.
     */
    enabled(value: boolean): void;
    /**
     * Enables the gradient.
     */
    enable(): void;
    /**
     * Disables the gradient.
     */
    disable(): void;
    get shader(): p5.Shader;
    get palette(): P5AsciifyColorPalette;
    get isEnabled(): boolean;
}
