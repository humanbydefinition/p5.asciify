import p5 from 'p5';

import { P5AsciifyBrightnessRenderer } from './brightness/BrightnessAsciiRenderer';
import { P5AsciifyAccurateRenderer } from './accurate/AccurateAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './edge/EdgeAsciiRenderer';
import { P5AsciifyGradientRenderer } from './gradient/GradientAsciiRenderer';
import { P5AsciifyRenderer } from './AsciiRenderer';

import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { P5AsciifyError } from '../AsciifyError';

import {
    BRIGHTNESS_DEFAULT_OPTIONS,
    ACCURATE_DEFAULT_OPTIONS,
    GRADIENT_DEFAULT_OPTIONS,
    EDGE_DEFAULT_OPTIONS,
    CUSTOM_DEFAULT_OPTIONS,
} from '../defaults';

import { AsciiRendererOptions } from './types';

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export class P5AsciifyRendererManager {
    private currentCanvasDimensions: { width: number, height: number };
    private _renderers: { name: string, renderer: P5AsciifyRenderer }[];
    public lastRenderer: P5AsciifyRenderer;

    constructor(
        private p: p5,
        private grid: P5AsciifyGrid,
        private fontTextureAtlas: P5AsciifyFontTextureAtlas
    ) {
        this.currentCanvasDimensions = {
            width: this.p.width,
            height: this.p.height
        };

        this._renderers = [
            { name: "brightness", renderer: new P5AsciifyBrightnessRenderer(this.p, this.grid, fontTextureAtlas, BRIGHTNESS_DEFAULT_OPTIONS) },
            { name: "accurate", renderer: new P5AsciifyAccurateRenderer(this.p, this.grid, fontTextureAtlas, ACCURATE_DEFAULT_OPTIONS) },
            { name: "gradient", renderer: new P5AsciifyGradientRenderer(this.p, this.grid, fontTextureAtlas, GRADIENT_DEFAULT_OPTIONS) },
            { name: "edge", renderer: new P5AsciifyEdgeRenderer(this.p, this.grid, fontTextureAtlas, EDGE_DEFAULT_OPTIONS) },
            { name: "custom", renderer: new P5AsciifyRenderer(this.p, this.grid, fontTextureAtlas, CUSTOM_DEFAULT_OPTIONS) },
        ];

        this.lastRenderer = this._renderers[0].renderer;
    }

    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
     */
    public render(inputFramebuffer: any): void {
        let asciiOutput = inputFramebuffer;
        let currentRenderer = this._renderers[0].renderer;

        for (const renderer of this._renderers) {
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
        if (this.currentCanvasDimensions.width !== this.p.width || this.currentCanvasDimensions.height !== this.p.height) {
            this.currentCanvasDimensions.width = this.p.width;
            this.currentCanvasDimensions.height = this.p.height;

            this.grid.reset();

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
    public add(name: string, type: string, options: AsciiRendererOptions): void {
        switch (type) {
            case "brightness":
                this._renderers.push({ name, renderer: new P5AsciifyBrightnessRenderer(this.p, this.grid, this.fontTextureAtlas, options) });
                break;
            case "accurate":
                this._renderers.push({ name, renderer: new P5AsciifyAccurateRenderer(this.p, this.grid, this.fontTextureAtlas, options) });
                break;
            case "gradient":
                this._renderers.push({ name, renderer: new P5AsciifyGradientRenderer(this.p, this.grid, this.fontTextureAtlas, options) });
                break;
            case "edge":
                this._renderers.push({ name, renderer: new P5AsciifyEdgeRenderer(this.p, this.grid, this.fontTextureAtlas, options) });
                break;
            case "custom":
                this._renderers.push({ name, renderer: new P5AsciifyRenderer(this.p, this.grid, this.fontTextureAtlas, options) });
                break;
            default:
                throw new P5AsciifyError(`Invalid renderer type: ${type}`);
        }
    }

    /**
     * Gets the ASCII renderer instance with the given name.
     * @param name The name of the renderer to get.
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
        const index = this.getRendererIndex(renderer);
        if (index <= 0) return;
        this.swap(renderer, this._renderers[index - 1].renderer);
    }

    /**
     * Moves a renderer down in the list of renderers.
     * @param renderer The renderer to move down in the list.
     */
    public moveUp(renderer: string | P5AsciifyRenderer): void {
        const index = this.getRendererIndex(renderer);
        if (index === -1 || index >= this._renderers.length - 1) return;
        this.swap(renderer, this._renderers[index + 1].renderer);
    }

    /**
     * Removes a renderer from the list of renderers.
     * @param renderer The name of the renderer or the renderer instance itself.
     */
    public remove(renderer: string | P5AsciifyRenderer): void {
        const index = this.getRendererIndex(renderer);
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
        const index1 = this.getRendererIndex(renderer1);
        const index2 = this.getRendererIndex(renderer2);

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
    private getRendererIndex(renderer: string | P5AsciifyRenderer): number {
        if (typeof renderer === 'string') {
            return this._renderers.findIndex(r => r.name === renderer);
        }
        return this._renderers.findIndex(r => r.renderer === renderer);
    }

    // Getters
    get renderers(): { name: string, renderer: P5AsciifyRenderer }[] { return this._renderers; }
}