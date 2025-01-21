import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { AsciiRendererOptions, AsciiRendererUserOptions } from '../types';
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
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options: AsciiRendererOptions);
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
    update(newOptions: Partial<AsciiRendererUserOptions>): void;
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void;
}
