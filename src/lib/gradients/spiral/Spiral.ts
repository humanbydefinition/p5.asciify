import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { SpiralGradientParams } from '../types';

/**
 * A spiral gradient that moves in a spiral pattern across the screen.
 */
export class P5AsciifySpiralGradient extends P5AsciifyGradient {
    public direction: number;
    public centerX: number;
    public centerY: number;
    public speed: number;
    public density: number;

    constructor(
        protected p: p5,
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,
        protected _shader: p5.Shader,
        protected _characters: string,
        brightnessStart: number,
        brightnessEnd: number,
        params: SpiralGradientParams
    ) {
        super(p, _fontTextureAtlas, _shader, _characters, brightnessStart, brightnessEnd,);
        this.direction = params.direction;
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.speed = params.speed;
        this.density = params.density;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this.direction);
        this._shader.setUniform('u_centerX', this.centerX);
        this._shader.setUniform('u_centerY', this.centerY);
        this._shader.setUniform('u_speed', this.speed);
        this._shader.setUniform('u_density', this.density);
    }
}