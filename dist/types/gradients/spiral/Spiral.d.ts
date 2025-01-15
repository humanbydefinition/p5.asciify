import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { SpiralGradientParams } from '../types';
/**
 * A spiral gradient that moves in a spiral pattern across the screen.
 */
export declare class P5AsciifySpiralGradient extends P5AsciifyGradient {
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: SpiralGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
