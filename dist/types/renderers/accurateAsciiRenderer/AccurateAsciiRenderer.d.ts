import p5 from 'p5';
import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
interface AccurateAsciiRendererOptions {
    enabled: boolean;
    characters: string;
    characterColorMode: number;
    characterColor: p5.Color;
    backgroundColorMode: number;
    backgroundColor: p5.Color;
    invertMode: number;
    rotationAngle: number;
}
/**
 * An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters.
 */
export default class AccurateAsciiRenderer extends AsciiRenderer {
    private characterSelectionShader;
    private brightnessSampleShader;
    private colorSampleShader;
    private brightnessSplitShader;
    private brightnessSampleFramebuffer;
    private brightnessSplitFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AccurateAsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void;
}
export {};
