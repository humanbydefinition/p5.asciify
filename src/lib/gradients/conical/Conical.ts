import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGradient } from '../Gradient';
import { ConicalGradientParams } from '../types';

/**
 * A conical gradient that moves in a conical pattern across the screen.
 */
export class P5AsciifyConicalGradient extends P5AsciifyGradient {
    public centerX: number;
    public centerY: number;
    public speed: number;

    constructor(
        protected p: p5,
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,
        protected _shader: p5.Shader,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: ConicalGradientParams
    ) {
        super(p, _fontTextureAtlas, _shader, brightnessStart, brightnessEnd, characters);
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.speed = params.speed;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_centerX', this.centerX);
        this._shader.setUniform('u_centerY', this.centerY);
        this._shader.setUniform('u_speed', this.speed);
    }
}