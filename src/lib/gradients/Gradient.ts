import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { validateNumberInRange } from '../utils';

/**
 * Represents a gradient that can be applied to the gradient ascii renderer.
 */
export abstract class P5AsciifyGradient {
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    public enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette!: P5AsciifyColorPalette;

    constructor(
        protected p: p5, 
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas, 
        protected _shader: p5.Shader, 
        colors: [number, number, number][],
        brightnessStart: number,
        brightnessEnd: number,
        private _characters: string
    ) {
        this._palette = new P5AsciifyColorPalette(this.p, colors);

        // Normalize brightness values to [0, 1]
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;

        this.enabled = true;
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
    set brightnessStart(value: number) {
        validateNumberInRange(value, 0, 255, 'brightness start');
        this._brightnessStart = value;
    }

    /**
     * Sets the end brightness value.
     * @param value The brightness value to set.
     * @throws P5AsciifyError If the value is not a number or is not within the range [0, 255].
     */
    set brightnessEnd(value: number) {
        validateNumberInRange(value, 0, 255, 'brightness start');
        this._brightnessEnd = value;
    }

    /**
     * Sets the characters to use for the gradient.
     * @param value The characters to use.
     * @throws P5AsciifyError If the string does contain characters that are not available in the font texture atlas.
     */
    set characters(value: string) {
        this._characters = value;

        if (this.p._setupDone) {
            this.palette.setColors(this._fontTextureAtlas.getCharsetColorArray(value));
        }
    }

    // Getters
    get characters(): string { return this._characters; }
    get shader(): p5.Shader { return this._shader; }
    get palette(): P5AsciifyColorPalette { return this._palette; }
    get brightnessEnd(): number { return this._brightnessEnd; }
    get brightnessStart(): number { return this._brightnessStart; }
}
