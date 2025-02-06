import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { AsciiRendererOptions } from '../types';
/** Default configuration options for `"edge"` ASCII renderer */
export declare const EDGE_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for edge representation (8 characters for different angles) */
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
    /** Threshold for Sobel edge detection. Responsible for edge detection sensitivity */
    sobelThreshold: number;
    /** Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it */
    sampleThreshold: number;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/**
 * An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.
 */
export declare class P5AsciifyEdgeRenderer extends P5AsciifyRenderer {
    private sobelShader;
    private sampleShader;
    private colorSampleShader;
    private inversionShader;
    private rotationShader;
    private asciiCharacterShader;
    private sobelFramebuffer;
    private sampleFramebuffer;
    /**
     * Creates a new `"edge"` ASCII renderer instance.
     *
     * @remarks
     * This constructor is meant for internal use by the `p5.asciify` library.
     *
     * To create renderers, use `p5asciify.renderers().add("name", "edge", { enabled: true });`.
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
    resetShaders(): void;
    /**
     * Set the threshold value for the Sobel edge detection algorithm.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the threshold value for the Sobel edge detection algorithm
     *      p5asciify.renderers().get("edge").sobelThreshold(0.5);
     *  }
     * ```
     *
     * @param value The threshold value for the Sobel edge detection algorithm.
     * @throws {P5AsciifyError} If the value is not a valid number between 0 and 1.
     */
    sobelThreshold(value: number): void;
    /**
     * Set the sample threshold value for the edge detection algorithm.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the sample threshold value for the edge detection algorithm
     *      p5asciify.renderers().get("edge").sampleThreshold(32);
     *  }
     * ```
     *
     * @param value The sample threshold value for the edge detection algorithm.
     * @throws {P5AsciifyError} If the value is not a valid number greater than or equal to 0.
     */
    sampleThreshold(value: number): void;
    update(newOptions: Partial<AsciiRendererOptions>): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
