import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
/**
 * Represents a gradient that can be applied to the gradient ascii renderer.
 */
export declare class P5AsciifyGradient {
    private _characters;
    protected _p: p5;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette: P5AsciifyColorPalette;
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    protected _shader: p5.Shader;
    constructor(brightnessStart: number, brightnessEnd: number, _characters: string);
    /**
     * Sets up the gradient with the necessary p5 instance, font texture atlas, shader, and colors.
     * @param p5Instance The p5 instance to use.
     * @param fontTextureAtlas The font texture atlas to use.
     * @param shader The shader to use.
     * @param colors The colors to use for the gradient, which correspond to the characters in the font texture atlas.
     */
    setup(p5Instance: p5, fontTextureAtlas: P5AsciifyFontTextureAtlas, shader: p5.Shader, colors: [number, number, number][]): void;
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
    set brightnessStart(value: number);
    /**
     * Sets the end brightness value.
     * @param value The brightness value to set.
     * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
     */
    set brightnessEnd(value: number);
    /**
     * Sets the characters to use for the gradient.
     * @param value The characters to use.
     * @throws P5AsciifyError If the string does contain characters that are not available in the font texture atlas.
     */
    set characters(value: string);
    get characters(): string;
    get shader(): p5.Shader;
    get palette(): P5AsciifyColorPalette;
    get brightnessEnd(): number;
    get brightnessStart(): number;
}
