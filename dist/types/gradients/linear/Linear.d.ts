import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { LinearGradientParams } from '../types';
/**
 * A linear gradient that moves in a linear pattern across the screen.
 */
export declare class P5AsciifyLinearGradient extends P5AsciifyGradient {
    direction: number;
    angle: number;
    speed: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: LinearGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
