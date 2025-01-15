import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface ZigZagGradientParams {
    direction: number;
    angle: number;
    speed?: number;
}
export declare class P5AsciifyZigZagGradient extends P5AsciifyGradient {
    private _direction;
    private _angle;
    private _speed;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: ZigZagGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    get direction(): number;
    set direction(value: number);
    get angle(): number;
    set angle(value: number);
    get speed(): number;
    set speed(value: number);
}
