import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface NoiseGradientParams {
    noiseScale: number;
    speed: number;
    direction: number;
}
export declare class P5AsciifyNoiseGradient extends P5AsciifyGradient {
    direction: number;
    noiseScale: number;
    speed: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: NoiseGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
