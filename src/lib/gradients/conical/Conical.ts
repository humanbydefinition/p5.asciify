import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';

export interface ConicalGradientParams {
    centerX: number;
    centerY: number;
    speed: number;
}

export class P5AsciifyConicalGradient extends P5AsciifyGradient {
    private _centerX: number;
    private _centerY: number;
    private _speed: number;

    constructor(
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: ConicalGradientParams
    ) {
        super(brightnessStart, brightnessEnd, characters);
        this._centerX = params.centerX;
        this._centerY = params.centerY;
        this._speed = params.speed;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_centerX', this._centerX);
        this._shader.setUniform('u_centerY', this._centerY);
        this._shader.setUniform('u_speed', this._speed);
    }

    get centerX(): number {
        return this._centerX;
    }

    set centerX(value: number) {
        this._centerX = value;
    }

    get centerY(): number {
        return this._centerY;
    }

    set centerY(value: number) {
        this._centerY = value;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }
}