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
    protected _options: T;
    protected p: p5;
    grid: P5AsciifyGrid;
    characterSet: P5AsciifyCharacterSet;
    protected _primaryColorSampleFramebuffer: p5.Framebuffer;
    protected _secondaryColorSampleFramebuffer: p5.Framebuffer;
    protected _asciiCharacterFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: T);
    /**
     * Resizes all framebuffers based on the grid dimensions.
     */
    resizeFramebuffers(): void;
    /**
     * Resets shaders. To be implemented by subclasses.
     */
    resetShaders(): void;
    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    updateOptions(newOptions: Partial<AsciiRendererOptions>): void;
    /**
     * Render ASCII based on the input framebuffer.
     * @param inputFramebuffer - The input framebuffer to base ASCII rendering on.
     */
    abstract render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;
    get outputFramebuffer(): p5.Framebuffer;
    get options(): T;
    get primaryColorSampleFramebuffer(): p5.Framebuffer;
    get secondaryColorSampleFramebuffer(): p5.Framebuffer;
    get asciiCharacterFramebuffer(): p5.Framebuffer;
}
