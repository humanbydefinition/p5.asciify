import p5 from 'p5';
import { P5AsciifyRenderer } from './AsciiRenderer';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { AsciiRendererOptions } from './types';
/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export declare class P5AsciifyRendererManager {
    private p;
    private grid;
    private fontTextureAtlas;
    private currentCanvasDimensions;
    private _renderers;
    lastRenderer: P5AsciifyRenderer;
    constructor(p: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas);
    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
     */
    render(inputFramebuffer: any): void;
    /**
     * Continuously checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     */
    private checkCanvasDimensions;
    /**
     * Resets the dimensions of all renderers.
     */
    resetRendererDimensions(): void;
    /**
     * Adds a new renderer to the list of renderers.
     * @param name The name of the renderer to add.
     * @param type The type of the renderer to add.
     * @param options The options to use for the renderer.
     */
    add(name: string, type: string, options: AsciiRendererOptions): void;
    /**
     * Gets the ASCII renderer instance with the given name.
     * @param name The name of the renderer to get.
     * @returns The ASCII renderer instance with the given name.
     */
    get(rendererName: string): P5AsciifyRenderer;
    /**
     * Moves a renderer up in the list of renderers.
     * @param renderer The renderer to move up in the list.
     */
    moveDown(renderer: string | P5AsciifyRenderer): void;
    /**
     * Moves a renderer down in the list of renderers.
     * @param renderer The renderer to move down in the list.
     */
    moveUp(renderer: string | P5AsciifyRenderer): void;
    /**
     * Removes a renderer from the list of renderers.
     * @param renderer The name of the renderer or the renderer instance itself.
     */
    remove(renderer: string | P5AsciifyRenderer): void;
    /**
     * Clears the list of renderers.
     */
    clear(): void;
    /**
     * Swaps the positions of two renderers in the renderer list.
     * @param renderer1 The name of the first renderer or the renderer instance itself.
     * @param renderer2 The name of the second renderer or the renderer instance itself.
     */
    swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void;
    /**
     * Gets the index of a renderer in the list of renderers.
     * @param renderer The renderer to get the index of.
     * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
     */
    private getRendererIndex;
    get renderers(): {
        name: string;
        renderer: P5AsciifyRenderer;
    }[];
}
