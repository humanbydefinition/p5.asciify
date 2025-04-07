import p5 from 'p5';
import { AbstractFeatureRenderer2D } from '../AbstractFeatureRenderer2D';
import { P5AsciifyGrid } from '../../../../Grid';
import { FeatureAsciiRendererOptions } from '../../../types';
import { P5AsciifyFontManager } from '../../../../FontManager';
/**
 * Default configuration options for `"accurate"` ASCII renderer.
 *
 * If there are options not provided during the creation of the renderer, the default options will be used.
 */
export declare const ACCURATE_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for pattern matching */
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
 * An ASCII renderer that attempts picking the most fitting ASCII representation to accurately represent the input sketch using the available ASCII characters.
 */
export declare class P5AsciifyAccurateRenderer extends AbstractFeatureRenderer2D {
    private _characterSelectionShader;
    private _brightnessSampleShader;
    private _colorSampleShader;
    private _brightnessSplitShader;
    private _brightnessSampleFramebuffer;
    private _brightnessSplitFramebuffer;
    /**
     * Creates a new `"accurate"` ASCII renderer instance.
     * @param p5Instance The p5 instance.
     * @param grid Grid object containing the relevant grid information.
     * @param fontManager The font texture atlas containing the ASCII characters texture.
     * @param options The options for the ASCII renderer.
     * @ignore
     */
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontManager: P5AsciifyFontManager, options?: FeatureAsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    render(inputFramebuffer: p5.Framebuffer): void;
}
