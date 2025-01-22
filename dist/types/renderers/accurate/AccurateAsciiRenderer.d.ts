import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { AsciiRendererOptions } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
/** Default configuration options for accurate ASCII renderer */
export declare const ACCURATE_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for pattern matching */
    characters: string;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: string;
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: number;
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: string;
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: number;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
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
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options?: AsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
