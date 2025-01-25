import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGradient } from '../Gradient';
import { LinearGradientParams } from '../types';

/**
 * A linear gradient that moves in a linear pattern across the screen.
 */
export class P5AsciifyLinearGradient extends P5AsciifyGradient {
    public direction: number;
    public angle: number;
    public speed: number;
    public zigzag: boolean;

    constructor(
        protected p: p5,
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,
        protected _shader: p5.Shader,
        protected _characters: string,
        brightnessStart: number,
        brightnessEnd: number,
        params: LinearGradientParams
    ) {
        super(p, _fontTextureAtlas, _shader, _characters, brightnessStart, brightnessEnd,);
        this.direction = params.direction;
        this.angle = params.angle;
        this.speed = params.speed;
        this.zigzag = params.zigzag;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this.direction);
        this._shader.setUniform('u_angle', (this.angle * Math.PI) / 180);
        this._shader.setUniform('u_speed', this.speed);
        this._shader.setUniform('u_zigzag', this.zigzag);
    }
}