import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { AsciiRendererOptions } from '../types';
/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export declare class P5AsciifyBrightnessRenderer extends P5AsciifyRenderer {
    private colorSampleShader;
    private asciiCharacterShader;
    private colorSampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
