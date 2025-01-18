import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { SpiralGradientParams } from '../types';
/**
 * A spiral gradient that moves in a spiral pattern across the screen.
 */
export declare class P5AsciifySpiralGradient extends P5AsciifyGradient {
    protected p: p5;
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    protected _shader: p5.Shader;
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
    constructor(p: p5, _fontTextureAtlas: P5AsciifyFontTextureAtlas, _shader: p5.Shader, colors: [number, number, number][], brightnessStart: number, brightnessEnd: number, characters: string, params: SpiralGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
