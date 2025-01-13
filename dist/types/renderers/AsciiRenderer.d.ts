import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyCharacterSet } from '../CharacterSet';
export interface AsciiRendererOptions {
    enabled: boolean;
    characters: string;
    characterColorMode: number;
    characterColor: p5.Color;
    backgroundColorMode: number;
    backgroundColor: p5.Color;
    invertMode: number;
    rotationAngle: number;
}
/**
 * Abstract class for shader-based ASCII Renderers.
 */
export declare abstract class AsciiRenderer<T extends AsciiRendererOptions = AsciiRendererOptions> {
    protected p: p5;
    protected grid: P5AsciifyGrid;
    characterSet: P5AsciifyCharacterSet;
    protected _options: T;
    protected _primaryColorSampleFramebuffer: p5.Framebuffer;
    protected _secondaryColorSampleFramebuffer: p5.Framebuffer;
    protected _asciiCharacterFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;
    protected _shader: p5.Shader;
    constructor(p: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, _options: T);
    /**
     * Resizes all framebuffers based on the grid dimensions.
     */
    resizeFramebuffers(): void;
    /**
     * Resets the shaders for the renderer.
     */
    resetShaders(): void;
    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    updateOptions(newOptions: Partial<AsciiRendererOptions>): void;
    /**
     * Convert and render the input framebuffer to ASCII.
     * @param inputFramebuffer - The input framebuffer to convert to ASCII.
     * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
     */
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void;
    get outputFramebuffer(): p5.Framebuffer;
    get options(): T;
    get primaryColorSampleFramebuffer(): p5.Framebuffer;
    get secondaryColorSampleFramebuffer(): p5.Framebuffer;
    get asciiCharacterFramebuffer(): p5.Framebuffer;
}
