import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { RadialGradientParams } from '../types';
/**
 * A radial gradient that moves in a radial pattern across the screen.
 */
export declare class P5AsciifyRadialGradient extends P5AsciifyGradient {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: RadialGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
