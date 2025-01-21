import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyGradientManager } from '../../gradients/GradientManager';
import { AsciiRendererOptions } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
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
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, gradientManager: P5AsciifyGradientManager, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
