import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { NoiseGradientParams } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
/**
 * A noise gradient that moves in a noise pattern across the screen.
 */
export declare class P5AsciifyNoiseGradient extends P5AsciifyGradient {
    protected p: p5;
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    protected _shader: p5.Shader;
    direction: number;
    noiseScale: number;
    speed: number;
    constructor(p: p5, _fontTextureAtlas: P5AsciifyFontTextureAtlas, _shader: p5.Shader, colors: [number, number, number][], brightnessStart: number, brightnessEnd: number, characters: string, params: NoiseGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
