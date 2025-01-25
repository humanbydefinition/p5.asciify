import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { AsciiRendererOptions } from '../types';
/** Default configuration options for edge detection ASCII renderer */
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
    private asciiCharacterShader;
    private sobelFramebuffer;
    private sampleFramebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options?: AsciiRendererOptions);
    resizeFramebuffers(): void;
    resetShaders(): void;
    /**
     * Set the threshold value for the Sobel edge detection algorithm.
     * @param value The threshold value for the Sobel edge detection algorithm.
     * @throws {P5AsciifyError} If the value is not a valid number between 0 and 1.
     */
    sobelThreshold(value: number): void;
    /**
     * Set the sample threshold value for the edge detection algorithm.
     * @param value The sample threshold value for the edge detection algorithm.
     * @throws {P5AsciifyError} If the value is not a valid number greater than or equal to 0.
     */
    sampleThreshold(value: number): void;
    update(newOptions: Partial<AsciiRendererOptions>): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
