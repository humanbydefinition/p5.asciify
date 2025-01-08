import p5 from 'p5';
import {P5AsciifyGradient} from '../Gradient';

interface NoiseGradientParams {
    type: 'noise';
    shader: p5.Shader;
    brightnessStart: number;
    brightnessEnd: number;
    characters: string[];
    noiseScale: number;
    speed: number;
    direction: number;
}

export default class P5AsciifyNoiseGradient extends P5AsciifyGradient {
    private _direction: number;
    private _noiseScale: number;
    private _speed: number;

    constructor({
        type,
        shader,
        brightnessStart,
        brightnessEnd,
        characters,
        noiseScale,
        speed,
        direction
    }: NoiseGradientParams) {
        super(type, shader, brightnessStart, brightnessEnd, characters);
        this._direction = direction;
        this._noiseScale = noiseScale;
        this._speed = speed;
    }

    setUniforms(
        p: p5,
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(p, framebuffer, referenceFramebuffer);
        this._shader.setUniform('direction', this._direction);
        this._shader.setUniform('noiseScale', this._noiseScale);
        this._shader.setUniform('u_speed', this._speed);
    }

    get direction(): number {
        return this._direction;
    }

    set direction(value: number) {
        this._direction = value;
    }

    get noiseScale(): number {
        return this._noiseScale;
    }

    set noiseScale(value: number) {
        this._noiseScale = value;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }
}