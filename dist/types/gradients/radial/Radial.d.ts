import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface RadialGradientParams {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
}
export declare class P5AsciifyRadialGradient extends P5AsciifyGradient {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: RadialGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
