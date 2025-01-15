import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { ConicalGradientParams } from '../types';
/**
 * A conical gradient that moves in a conical pattern across the screen.
 */
export declare class P5AsciifyConicalGradient extends P5AsciifyGradient {
    centerX: number;
    centerY: number;
    speed: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: ConicalGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
