import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface ConicalGradientParams {
    centerX: number;
    centerY: number;
    speed: number;
}
export declare class P5AsciifyConicalGradient extends P5AsciifyGradient {
    private _centerX;
    private _centerY;
    private _speed;
    constructor(shader: p5.Shader, brightnessStart: number, brightnessEnd: number, characters: string, params: ConicalGradientParams);
    setUniforms(p: p5, framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    get centerX(): number;
    set centerX(value: number);
    get centerY(): number;
    set centerY(value: number);
    get speed(): number;
    set speed(value: number);
}
