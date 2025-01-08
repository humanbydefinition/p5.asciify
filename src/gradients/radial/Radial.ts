import p5 from 'p5';
import {P5AsciifyGradient} from '../Gradient';

interface RadialGradientParams {
    type: 'radial';
    shader: p5.Shader;
    brightnessStart: number;
    brightnessEnd: number;
    characters: string[];
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
}

export default class P5AsciifyRadialGradient extends P5AsciifyGradient {
    private _direction: number;
    private _centerX: number;
    private _centerY: number;
    private _radius: number;

    constructor({
        type,
        shader,
        brightnessStart,
        brightnessEnd,
        characters,
        direction,
        centerX,
        centerY,
        radius
    }: RadialGradientParams) {
        super(type, shader, brightnessStart, brightnessEnd, characters);
        this._direction = direction;
        this._centerX = centerX;
        this._centerY = centerY;
        this._radius = radius;
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
        this._shader.setUniform('u_radius', this._radius);
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

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
    }
}