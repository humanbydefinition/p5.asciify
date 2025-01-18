import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import { AsciiRendererOptions } from '../types';
/**
 * An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.
 */
export declare class P5AsciifyEdgeRenderer extends P5AsciifyRenderer<AsciiRendererOptions> {
    private sobelShader;
    private sampleShader;
    private colorSampleShader;
    private asciiCharacterShader;
    private sobelFramebuffer;
    private sampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    updateOptions(newOptions: Partial<AsciiRendererOptions>): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
