import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { AsciiRendererOptions } from '../types';
/** Default configuration options for `"brightness"` ASCII renderer */
export declare const BRIGHTNESS_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: string;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
    characterColor: string;
    /** Character color mode */
    characterColorMode: string;
    /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
    backgroundColor: string;
    /** Background color mode */
    backgroundColorMode: string;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export declare class P5AsciifyBrightnessRenderer extends P5AsciifyRenderer {
    private colorSampleShader;
    private asciiCharacterShader;
    private colorSampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options?: AsciiRendererOptions);
    resizeFramebuffers(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
