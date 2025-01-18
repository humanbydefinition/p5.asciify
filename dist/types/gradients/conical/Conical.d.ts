import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGradient } from '../Gradient';
import { ConicalGradientParams } from '../types';
/**
 * A conical gradient that moves in a conical pattern across the screen.
 */
export declare class P5AsciifyConicalGradient extends P5AsciifyGradient {
    protected p: p5;
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    protected _shader: p5.Shader;
    centerX: number;
    centerY: number;
    speed: number;
    constructor(p: p5, _fontTextureAtlas: P5AsciifyFontTextureAtlas, _shader: p5.Shader, colors: [number, number, number][], brightnessStart: number, brightnessEnd: number, characters: string, params: ConicalGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
}
