import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import { AsciiRendererOptions } from '../types';
/**
 * An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters.
 */
export declare class P5AsciifyAccurateRenderer extends P5AsciifyRenderer {
    private characterSelectionShader;
    private brightnessSampleShader;
    private colorSampleShader;
    private brightnessSplitShader;
    private brightnessSampleFramebuffer;
    private brightnessSplitFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
