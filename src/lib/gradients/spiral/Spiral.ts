import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';

export interface SpiralGradientParams {
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
}

export class P5AsciifySpiralGradient extends P5AsciifyGradient {
    public direction: number;
    public centerX: number;
    public centerY: number;
    public speed: number;
    public density: number;

    constructor(
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: SpiralGradientParams
    ) {
        super(brightnessStart, brightnessEnd, characters);
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