import p5 from 'p5';
import {P5AsciifyGradient} from '../Gradient';

interface SpiralGradientParams {
    type: 'spiral';
    shader: p5.Shader;
    brightnessStart: number;
    brightnessEnd: number;
    characters: string[];
    direction: number;
    centerX: number;
    centerY: number;
    speed?: number;
    density?: number;
}

export default class P5AsciifySpiralGradient extends P5AsciifyGradient {
    private _direction: number;
    private _centerX: number;
    private _centerY: number;
    private _speed: number;
    private _density: number;

    constructor({
        type,
        shader,
        brightnessStart,
        brightnessEnd,
        characters,
        direction,
        centerX,
        centerY,
        speed = 0.01,
        density = 0.01
    }: SpiralGradientParams) {
        super(type, shader, brightnessStart, brightnessEnd, characters);
        this._direction = direction;
        this._centerX = centerX;
        this._centerY = centerY;
        this._speed = speed;
        this._density = density;
    }

    setUniforms(
        p: p5,
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(p, framebuffer, referenceFramebuffer);
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