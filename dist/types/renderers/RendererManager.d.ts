import p5 from 'p5';
import { AsciiRenderer } from './AsciiRenderer';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { P5AsciifyGradientManager } from '../gradients/GradientManager';
/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export declare class RendererManager {
    private p;
    private grid;
    private fontTextureAtlas;
    private currentCanvasDimensions;
    private gradientCharacterSet;
    private _renderers;
    gradientManager: P5AsciifyGradientManager;
    lastRenderer: AsciiRenderer;
    constructor(p: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas);
    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
     */
    render(inputFramebuffer: any, borderColor: any): void;
    /**
     * Continuously checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     */
    private checkCanvasDimensions;
    /**
     * Resets the dimensions of all renderers.
     */
    resetRendererDimensions(): void;
    get renderers(): AsciiRenderer[];
}
