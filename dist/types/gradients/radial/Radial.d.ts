import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface RadialGradientParams {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
}
export declare class P5AsciifyRadialGradient extends P5AsciifyGradient {
    private _direction;
    private _centerX;
    private _centerY;
    private _radius;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: RadialGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    get direction(): number;
    set direction(value: number);
    get centerX(): number;
    set centerX(value: number);
    get centerY(): number;
    set centerY(value: number);
    get radius(): number;
    set radius(value: number);
}
