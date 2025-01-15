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
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: SpiralGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
