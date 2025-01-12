import p5 from 'p5';
import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
interface EdgeAsciiRendererOptions extends AsciiRendererOptions {
    sobelThreshold: number;
    sampleThreshold: number;
}
export default class EdgeAsciiRenderer extends AsciiRenderer<EdgeAsciiRendererOptions> {
    private sobelShader;
    private sampleShader;
    private colorSampleShader;
    private asciiCharacterShader;
    private shader;
    private sobelFramebuffer;
    private sampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: EdgeAsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;
}
export {};
