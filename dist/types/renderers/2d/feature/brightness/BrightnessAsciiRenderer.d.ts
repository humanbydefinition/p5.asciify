import p5 from 'p5';
import { P5AsciifyAbstractFeatureRenderer2D } from '../AbstractFeatureRenderer2D';
import { P5AsciifyGrid } from '../../../../Grid';
import { P5AsciifyFontManager } from '../../../../FontManager';
import { BrightnessAsciiRendererOptions } from '../../../types';
/**
 * Default configuration options for `"brightness"` ASCII renderer.
 *
 * If there are options not provided during the creation of the renderer, the default options will be used.
 */
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
    /** Flip the ASCII characters horizontally */
    flipHorizontally: boolean;
    /** Flip the ASCII characters vertically */
    flipVertically: boolean;
    /** Range of brightness values to map to ASCII characters */
    brightnessRange: [number, number];
};
/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export declare class P5AsciifyBrightnessRenderer extends P5AsciifyAbstractFeatureRenderer2D<BrightnessAsciiRendererOptions> {
    private colorSampleShader;
    private asciiCharacterShader;
    private colorSampleFramebuffer;
    /**
     * Creates a new `"brightness"` ASCII renderer instance.
     * @param p5Instance The p5 instance.
     * @param grid Grid object containing the relevant grid information.
     * @param fontManager The font texture atlas containing the ASCII characters texture.
     * @param options The options for the ASCII renderer.
     * @ignore
     */
    constructor(p5Instance: p5, captureFramebuffer: p5.Framebuffer | p5.Graphics, grid: P5AsciifyGrid, fontManager: P5AsciifyFontManager, options?: BrightnessAsciiRendererOptions);
    resetShaders(): void;
    resizeFramebuffers(): void;
    update(newOptions: Partial<BrightnessAsciiRendererOptions>): void;
    /**
     * Sets the brightness range for the ASCII character mapping.
     * This range defines the minimum and maximum brightness values that will be mapped to ASCII characters.
     *
     * If a pixel's brightness is not within the range, the corresponding cell will be left transparent,
     * rendering whatever is behind it, like the canvas bit or the set background color.
     *
     * @example
     * ```javascript
     * function setupAsciify() {
     *      // Set the brightness range for the renderer
     *      p5asciify.renderers().get("brightness").brightnessRange([50, 200]);
     *  }
     * ```
     *
     * @param range A tuple [min, max] representing the brightness range.
     * @throws If the provided range is not an array of two numbers, or if the numbers are not within the valid range (0-255).
     */
    brightnessRange(range: [number, number]): void;
    render(): void;
}
