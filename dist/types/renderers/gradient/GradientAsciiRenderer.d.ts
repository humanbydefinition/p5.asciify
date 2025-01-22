import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { AsciiRendererOptions } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGradient } from '../../gradients/Gradient';
import { GradientType } from '../../gradients/types';
/** Default configuration options for gradient-based ASCII renderer */
export declare const GRADIENT_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
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
 * An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.
 */
export declare class P5AsciifyGradientRenderer extends P5AsciifyRenderer {
    private grayscaleShader;
    private colorSampleShader;
    private grayscaleFramebuffer;
    private inversionShader;
    private asciiCharacterShader;
    private prevAsciiGradientFramebuffer;
    private nextAsciiGradientFramebuffer;
    private gradientManager;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options?: AsciiRendererOptions);
    resizeFramebuffers(): void;
    add(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, options?: any): P5AsciifyGradient;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
