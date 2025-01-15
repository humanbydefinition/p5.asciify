import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface LinearGradientParams {
    direction: number;
    angle: number;
    speed: number;
}
export declare class P5AsciifyLinearGradient extends P5AsciifyGradient {
    direction: number;
    angle: number;
    speed: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: LinearGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
