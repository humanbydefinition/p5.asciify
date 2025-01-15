import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';

export interface LinearGradientParams {
    direction: number;
    angle: number;
    speed: number;
}

export class P5AsciifyLinearGradient extends P5AsciifyGradient {
    public direction: number;
    public angle: number;
    public speed: number;

    constructor(
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: LinearGradientParams
    ) {
        super(brightnessStart, brightnessEnd, characters);
        this.direction = params.direction;
        this.angle = params.angle;
        this.speed = params.speed;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this.direction);
        this._shader.setUniform('u_angle', (this.angle * Math.PI) / 180);
        this._shader.setUniform('u_speed', this.speed);
    }
}