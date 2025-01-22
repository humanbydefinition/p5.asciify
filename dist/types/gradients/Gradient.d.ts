import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
/**
 * Represents a gradient that can be applied to the gradient ascii renderer.
 */
export declare abstract class P5AsciifyGradient {
    protected p: p5;
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    protected _shader: p5.Shader;
    protected _characters: string;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette: P5AsciifyColorPalette;
    constructor(p: p5, _fontTextureAtlas: P5AsciifyFontTextureAtlas, _shader: p5.Shader, _characters: string, brightnessStart: number, brightnessEnd: number);
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
    get shader(): p5.Shader;
    get palette(): P5AsciifyColorPalette;
}
