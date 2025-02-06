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
    /**
     * Creates a new `"brightness"` ASCII renderer instance.
     *
     * @remarks
     * This constructor is meant for internal use by the `p5.asciify` library.
     *
     * To create renderers, use `p5asciify.renderers().add("name", "brightness", { enabled: true });`.
     * This will also return an instance of the renderer, which can be used to modify the renderer's properties.
     * Additionally, the renderer will also be added to the end of the rendering pipeline automatically.
     *
     * @param p5Instance The p5 instance.
     * @param grid Grid object containing the relevant grid information.
     * @param fontTextureAtlas The font texture atlas containing the ASCII characters texture.
     * @param options The options for the ASCII renderer.
     */
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options?: AsciiRendererOptions);
    resizeFramebuffers(): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
