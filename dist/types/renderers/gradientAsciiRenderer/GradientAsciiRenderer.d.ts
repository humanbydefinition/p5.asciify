import p5 from 'p5';
import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import { P5AsciifyGradientManager } from '../../gradients/GradientManager';
/**
 * An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.
 */
export default class GradientAsciiRenderer extends AsciiRenderer {
    private grayscaleShader;
    private colorSampleShader;
    private asciiShader;
    private grayscaleFramebuffer;
    private prevAsciiCharacterFramebuffer;
    private gradientManager;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, gradientManager: P5AsciifyGradientManager, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;
}
