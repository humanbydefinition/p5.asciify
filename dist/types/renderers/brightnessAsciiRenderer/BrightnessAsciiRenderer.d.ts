import p5 from 'p5';
import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export default class BrightnessAsciiRenderer extends AsciiRenderer {
    private colorSampleShader;
    private asciiCharacterShader;
    private colorSampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void;
}
