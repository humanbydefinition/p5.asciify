import p5 from 'p5';

import { P5AsciifyBrightnessRenderer } from './brightness/BrightnessAsciiRenderer';
import { P5AsciifyAccurateRenderer } from './accurate/AccurateAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './edge/EdgeAsciiRenderer';
import { P5AsciifyGradientRenderer } from './gradient/GradientAsciiRenderer';
import { P5AsciifyRenderer } from './AsciiRenderer';

import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { P5AsciifyError } from '../AsciifyError';

import { AsciiRendererOptions } from './types';

const RENDERER_TYPES = {
    'brightness': P5AsciifyBrightnessRenderer,
    'accurate': P5AsciifyAccurateRenderer,
    'gradient': P5AsciifyGradientRenderer,
    'edge': P5AsciifyEdgeRenderer,
    'custom': P5AsciifyRenderer
} as const;

type RendererType = keyof typeof RENDERER_TYPES;

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export class P5AsciifyRendererManager {

    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    private _currentCanvasDimensions: { width: number, height: number };

    /** The list of available renderers. */
    private _renderers: { name: string, renderer: P5AsciifyRenderer }[];

    /** The last renderer used in the rendering loop. */
    public lastRenderer: P5AsciifyRenderer;

    constructor(
        /** The p5 instance. */
        private _p: p5,

        /** The grid instance. */
        private _grid: P5AsciifyGrid,

        /** The font texture atlas instance. */
        private _fontTextureAtlas: P5AsciifyFontTextureAtlas
    ) {
        this._currentCanvasDimensions = {
            width: this._p.width,
            height: this._p.height
        };

        this._renderers = [
            { name: "custom", renderer: new P5AsciifyRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "edge", renderer: new P5AsciifyEdgeRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "gradient", renderer: new P5AsciifyGradientRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "accurate", renderer: new P5AsciifyAccurateRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "brightness", renderer: new P5AsciifyBrightnessRenderer(this._p, this._grid, _fontTextureAtlas) },
        ];

        this.lastRenderer = this._renderers[0].renderer;
    }

    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     */
    public render(inputFramebuffer: any): void {
        let asciiOutput = inputFramebuffer;

        let currentRenderer = this._renderers[0].renderer;

        for (let i = this._renderers.length - 1; i >= 0; i--) {
            const renderer = this._renderers[i];
            if (renderer.renderer.options.enabled) {
                renderer.renderer.render(inputFramebuffer, currentRenderer);
                asciiOutput = renderer.renderer.outputFramebuffer;
                currentRenderer = renderer.renderer;
                this.lastRenderer = renderer.renderer;
            }
        }

        this.checkCanvasDimensions();
    }

    /**
     * Continuously checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     */
    private checkCanvasDimensions(): void {
        if (this._currentCanvasDimensions.width !== this._p.width || this._currentCanvasDimensions.height !== this._p.height) {
            this._currentCanvasDimensions.width = this._p.width;
            this._currentCanvasDimensions.height = this._p.height;

            this._grid.reset();

            this.resetRendererDimensions();
        }
    }

    /**
     * Resets the dimensions of all renderers.
     */
    public resetRendererDimensions(): void {
        this._renderers.forEach(renderer => {
            renderer.renderer.resizeFramebuffers();
            renderer.renderer.resetShaders();
        });
    }

    /**
     * Adds a new renderer to the list of renderers.
     * @param name The name of the renderer to add.
     * @param type The type of the renderer to add.
     * @param options The options to use for the renderer.
     */
    public add(
        name: string,
        type: RendererType,
        options: AsciiRendererOptions
    ): P5AsciifyRenderer {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new P5AsciifyError('Renderer name must be a non-empty string');
        }

        const RendererClass = RENDERER_TYPES[type];
        if (!RendererClass) {
            throw new P5AsciifyError(
                `Invalid renderer type: ${type}. Valid types are: ${Object.keys(RENDERER_TYPES).join(', ')}`
            );
        }

        const renderer = new RendererClass(this._p, this._grid, this._fontTextureAtlas, options);

        this._renderers.push({ name, renderer });

        return renderer;
    }

    /**
     * Gets the ASCII renderer instance with the given name.
     * @param rendererName The name of the renderer to get.
     * @returns The ASCII renderer instance with the given name.
     */
    public get(rendererName: string): P5AsciifyRenderer {
        const renderer = this._renderers.find(r => r.name === rendererName)?.renderer;

        if (!renderer) {
            throw new P5AsciifyError(
                `Renderer '${rendererName}' not found. Available renderers: ${this._renderers.map(r => r.name).join(', ')}`
            );
        }

        return renderer;
    }

    /**
     * Moves a renderer up in the list of renderers.
     * @param renderer The renderer to move up in the list.
     */
    public moveDown(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);
        if (index <= 0) return;
        this.swap(renderer, this._renderers[index + 1].renderer);
    }

    /**
     * Moves a renderer down in the list of renderers.
     * @param renderer The renderer to move down in the list.
     */
    public moveUp(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);
        if (index === -1 || index >= this._renderers.length - 1) return;
        this.swap(renderer, this._renderers[index - 1].renderer);
    }

    /**
     * Removes a renderer from the list of renderers.
     * @param renderer The name of the renderer or the renderer instance itself.
     */
    public remove(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);
        if (index === -1) {
            throw new P5AsciifyError(`Renderer not found.`);
        }
        this._renderers.splice(index, 1);
    }

    /**
     * Clears the list of renderers.
     */
    public clear() {
        this._renderers = [];
    }

    /**
     * Swaps the positions of two renderers in the renderer list.
     * @param renderer1 The name of the first renderer or the renderer instance itself.
     * @param renderer2 The name of the second renderer or the renderer instance itself.
     */
    public swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void {
        const index1 = this._getRendererIndex(renderer1);
        const index2 = this._getRendererIndex(renderer2);

        if (index1 === -1 || index2 === -1) {
            throw new P5AsciifyError(`One or more renderers not found.`);
        }

        const temp = this._renderers[index1];
        this._renderers[index1] = this._renderers[index2];
        this._renderers[index2] = temp;

        this.lastRenderer = this._renderers[0].renderer;
    }

    /**
     * Gets the index of a renderer in the list of renderers.
     * @param renderer The renderer to get the index of.
     * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
     */
    private _getRendererIndex(renderer: string | P5AsciifyRenderer): number {
        if (typeof renderer === 'string') {
            return this._renderers.findIndex(r => r.name === renderer);
        }
        return this._renderers.findIndex(r => r.renderer === renderer);
    }

    // Getters
    get renderers(): { name: string, renderer: P5AsciifyRenderer }[] { return this._renderers; }
}