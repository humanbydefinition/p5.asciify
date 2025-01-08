import p5 from 'p5';
import {P5AsciifyGradient} from '../Gradient';

interface LinearGradientParams {
    type: 'linear';
    shader: p5.Shader;
    brightnessStart: number;
    brightnessEnd: number;
    characters: string[];
    direction: number;
    angle: number;
    speed?: number;
}

export default class P5AsciifyLinearGradient extends P5AsciifyGradient {
    private _direction: number;
    private _angle: number;
    private _speed: number;

    constructor({
        type,
        shader,
        brightnessStart,
        brightnessEnd,
        characters,
        direction,
        angle,
        speed = 0.01,
    }: LinearGradientParams) {
        super(type, shader, brightnessStart, brightnessEnd, characters);
        this._direction = direction;
        this._angle = angle;
        this._speed = speed;
    }

    setUniforms(
        p: p5,
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(p, framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this._direction);
        this._shader.setUniform('u_angle', (this._angle * Math.PI) / 180);
        this._shader.setUniform('u_speed', this._speed);
    }

    get direction(): number {
        return this._direction;
    }

    set direction(value: number) {
        this._direction = value;
    }

    get angle(): number {
        return this._angle;
    }

    set angle(value: number) {
        this._angle = value;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }
}