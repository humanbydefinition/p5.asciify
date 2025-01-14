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
    private _direction: number;
    private _centerX: number;
    private _centerY: number;
    private _speed: number;
    private _density: number;

    constructor(
        shader: p5.Shader,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: SpiralGradientParams
    ) {
        super(shader, brightnessStart, brightnessEnd, characters);
        this._direction = params.direction;
        this._centerX = params.centerX;
        this._centerY = params.centerY;
        this._speed = params.speed;
        this._density = params.density;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this._direction);
        this._shader.setUniform('u_centerX', this._centerX);
        this._shader.setUniform('u_centerY', this._centerY);
        this._shader.setUniform('u_speed', this._speed);
        this._shader.setUniform('u_density', this._density);
    }

    get direction(): number {
        return this._direction;
    }

    set direction(value: number) {
        this._direction = value;
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

    get density(): number {
        return this._density;
    }

    set density(value: number) {
        this._density = value;
    }
}