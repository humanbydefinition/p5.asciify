import p5 from 'p5';
import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import { AsciiRendererOptions } from '../types';
/**
 * An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.
 */
export default class EdgeAsciiRenderer extends AsciiRenderer<AsciiRendererOptions> {
    private sobelShader;
    private sampleShader;
    private colorSampleShader;
    private asciiCharacterShader;
    private sobelFramebuffer;
    private sampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void;
}
