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
    private lastRenderer;
    private fontBase64;
    private fontFileType;
    constructor();
    /**
     * Sets up the renderer manager with the specified default options.
     * @param p5Instance The p5 instance
     * @param grid The grid instance
     * @param fontTextureAtlas The font texture atlas instance
     */
    setup(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas): void;
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
    get renderers(): AsciiRenderer[];
}
