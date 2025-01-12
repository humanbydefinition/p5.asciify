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
    private shader;
    private colorSampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions);
    /**
     * Resize the framebuffers used by this renderer.
     */
    resizeFramebuffers(): void;
    /**
     * Compute and render the ASCII representation of the input framebuffer.
     * @param inputFramebuffer The input framebuffer to asciify.
     * @param previousAsciiRenderer The previous ASCII renderer that rendered the last iteration of the same frame.
     * @param isFirstRenderer Whether this is the first renderer in the chain.
     */
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;
}
