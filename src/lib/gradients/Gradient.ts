import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { validateNumberInRange } from '../utils';
import { P5AsciifyError } from '../AsciifyError';

/**
 * Represents a gradient that can be applied to the gradient ascii renderer.
 */
export abstract class P5AsciifyGradient {

    /** The start brightness value of the gradient. Should be a value between 0 and 255. */
    protected _brightnessStart: number;

    /** The end brightness value of the gradient. Should be a value between 0 and 255. */
    protected _brightnessEnd: number;

    /** Whether the gradient is enabled. */
    private _enabled: boolean;

    /** The color palette for the gradient, corresponding to the characters. */
    protected _palette!: P5AsciifyColorPalette;

    constructor(
        /** The p5 instance. */
        protected p: p5,

        /** The font texture atlas instance. */
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,

        /** The gradient shader to use. */
        protected _shader: p5.Shader,

        /** The characters to use for the gradient. */
        protected _characters: string,

        brightnessStart: number,
        brightnessEnd: number,
    ) {
        this._palette = new P5AsciifyColorPalette(
            this.p,
            this._fontTextureAtlas.getCharsetColorArray(this._characters)
        );

        // Normalize brightness values to [0, 1]
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;

        this._enabled = true;
    }

    /**
     * Sets the uniforms for the gradient shader.
     * @param framebuffer - The framebuffer to use.
     * @param referenceFramebuffer - The reference framebuffer, which is used so two gradients cannot write onto the same pixels.
     */
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void {
        this._shader.setUniform("textureID", framebuffer);
        this._shader.setUniform("originalTextureID", referenceFramebuffer);
        this._shader.setUniform("gradientTexture", this._palette.framebuffer);
        this._shader.setUniform("gradientTextureDimensions", [this._palette.colors.length, 1]);
        this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
        this._shader.setUniform("frameCount", this.p.frameCount);
    }

    /**
     * Sets the start brightness value.
     * @param value The brightness value to set.
     * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
     */
    public brightnessStart(value: number) {
        validateNumberInRange(value, 0, 255, 'brightness start');
        this._brightnessStart = value;
    }

    /**
     * Sets the end brightness value.
     * @param value The brightness value to set.
     * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
     */
    public brightnessEnd(value: number) {
        validateNumberInRange(value, 0, 255, 'brightness start');
        this._brightnessEnd = value;
    }

    /**
     * Sets the brightness range.
     * @param start The start brightness value.
     * @param end The end brightness value.
     * @throws P5AsciifyError If the start or end value is not a number or is not within the range [0, 255].
     */
    public brightnessRange(start: number, end: number) {
        this.brightnessStart(start);
        this.brightnessEnd(end);
    }

    /**
     * Sets the characters to use for the gradient.
     * @param value The characters to use.
     * @throws P5AsciifyError If the string does contain characters that are not available in the font texture atlas.
     */
    public characters(value: string) {
        if (typeof value !== 'string') {
            throw new P5AsciifyError('Characters must be a string.');
        }

        this._fontTextureAtlas.validateCharacters(value);
        this.palette.setColors(this._fontTextureAtlas.getCharsetColorArray(value));
    }

    /**
     * Enables or disables the gradient.
     * @param value Whether to enable or disable the gradient.
     */
    public enabled(value: boolean) {
        this._enabled = value;
    }

    /**
     * Enables the gradient.
     */
    public enable() {
        this.enabled(true);
    }

    /**
     * Disables the gradient.
     */
    public disable() {
        this.enabled(false);
    }

    // Getters
    get shader(): p5.Shader { return this._shader; }
    get palette(): P5AsciifyColorPalette { return this._palette; }
    get isEnabled(): boolean { return this._enabled; }
}
