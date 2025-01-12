import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface SpiralGradientParams {
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
}
export declare class P5AsciifySpiralGradient extends P5AsciifyGradient {
    private _direction;
    private _centerX;
    private _centerY;
    private _speed;
    private _density;
    constructor(shader: p5.Shader, brightnessStart: number, brightnessEnd: number, characters: string, params: SpiralGradientParams);
    setUniforms(p: p5, framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    get direction(): number;
    set direction(value: number);
    get centerX(): number;
    set centerX(value: number);
    get centerY(): number;
    set centerY(value: number);
    get speed(): number;
    set speed(value: number);
    get density(): number;
    set density(value: number);
}
