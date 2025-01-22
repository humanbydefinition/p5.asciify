import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { AsciiRendererOptions } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGradient } from '../../gradients/Gradient';
import { GradientType } from '../../gradients/types';
/**
 * An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.
 */
export declare class P5AsciifyGradientRenderer extends P5AsciifyRenderer {
    private grayscaleShader;
    private colorSampleShader;
    private grayscaleFramebuffer;
    private inversionShader;
    private asciiCharacterShader;
    private prevAsciiGradientFramebuffer;
    private nextAsciiGradientFramebuffer;
    private gradientManager;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    add(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, options?: any): P5AsciifyGradient;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
