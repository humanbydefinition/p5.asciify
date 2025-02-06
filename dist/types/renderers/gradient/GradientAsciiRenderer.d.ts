import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { AsciiRendererOptions } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGradient } from '../../gradients/Gradient';
import { GradientType } from '../../gradients/types';
/** Default configuration options for `"gradient"` ASCII renderer */
export declare const GRADIENT_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
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
 * An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.
 */
export declare class P5AsciifyGradientRenderer extends P5AsciifyRenderer {
    private grayscaleShader;
    private colorSampleShader;
    private grayscaleFramebuffer;
    private inversionShader;
    private rotationShader;
    private asciiCharacterShader;
    private prevAsciiGradientFramebuffer;
    private nextAsciiGradientFramebuffer;
    private gradientManager;
    /**
     * Creates a new `"gradient"` ASCII renderer instance.
     *
     * @remarks
     * This constructor is meant for internal use by the `p5.asciify` library.
     *
     * To create renderers, use `p5asciify.renderers().add("name", "gradient", { enabled: true });`.
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
    /**
     * Adds a new gradient to the renderer.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable the default gradient renderer
     *      p5asciify.renderers().get("gradient").enable();
     *
     *      // Add a new gradient to the renderer, covering the entire brightness range (the whole canvas)
     *      p5asciify.renderers().get("gradient").add("linear", 0, 255, " .,:;i1tfLCG08@", { });
     *  }
     * ```
     *
     * @param gradientName The name of the gradient to add. Must be a valid gradient name.
     * @param brightnessStart The brightness value at which the gradient starts.
     * @param brightnessEnd The brightness value at which the gradient ends.
     * @param characters The characters to use for the gradient.
     * @param options Additional options for the gradient.
     * @returns The gradient instance that was added.
     */
    add(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, options?: any): P5AsciifyGradient;
    /**
     * Removes a gradient from the renderer.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable the default gradient renderer
     *      p5asciify.renderers().get("gradient").enable();
     *
     *      // Add a new gradient to the renderer, covering the entire brightness range (the whole canvas)
     *      const gradient = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .,:;i1tfLCG08@", { });
     *
     *      // Remove the gradient from the renderer
     *      p5asciify.renderers().get("gradient").remove(gradient);
     * }
     * ```
     *
     * @param gradientInstance The gradient instance to remove.
     */
    remove(gradientInstance: P5AsciifyGradient): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
