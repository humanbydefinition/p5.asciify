import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface ZigZagGradientParams {
    direction: number;
    angle: number;
    speed?: number;
}
export declare class P5AsciifyZigZagGradient extends P5AsciifyGradient {
    direction: number;
    angle: number;
    speed: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: ZigZagGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
