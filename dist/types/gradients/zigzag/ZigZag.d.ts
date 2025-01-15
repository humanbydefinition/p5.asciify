import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { ZigZagGradientParams } from '../types';
/**
 * A zigzag gradient that moves in a zigzag pattern across the screen.
 * Each row/column moves in the opposite direction of the previous row/column.
 */
export declare class P5AsciifyZigZagGradient extends P5AsciifyGradient {
    direction: number;
    angle: number;
    speed: number;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: ZigZagGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
