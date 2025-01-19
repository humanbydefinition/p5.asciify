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

import { P5AsciifyCharacterSet } from '../CharacterSet';
import { P5AsciifyGradientManager } from '../gradients/GradientManager';

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export class P5AsciifyRendererManager {
    private currentCanvasDimensions: { width: number, height: number };
    private _renderers: { name: string, renderer: P5AsciifyRenderer }[];
    public gradientManager: P5AsciifyGradientManager;
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

        this.gradientManager = new P5AsciifyGradientManager(p, this.fontTextureAtlas);

        this._renderers = [
            { name: "brightness", renderer: new P5AsciifyBrightnessRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, BRIGHTNESS_DEFAULT_OPTIONS.characters), BRIGHTNESS_DEFAULT_OPTIONS) },
            { name: "accurate", renderer: new P5AsciifyAccurateRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, ACCURATE_DEFAULT_OPTIONS.characters), ACCURATE_DEFAULT_OPTIONS) },
            { name: "gradient", renderer: new P5AsciifyGradientRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p,fontTextureAtlas,BRIGHTNESS_DEFAULT_OPTIONS.characters), this.gradientManager, GRADIENT_DEFAULT_OPTIONS) },
            { name: "edge", renderer: new P5AsciifyEdgeRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, EDGE_DEFAULT_OPTIONS.characters), EDGE_DEFAULT_OPTIONS) },
            { name: "custom", renderer: new P5AsciifyRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, BRIGHTNESS_DEFAULT_OPTIONS.characters), CUSTOM_DEFAULT_OPTIONS) },
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
     * Gets the ASCII renderer instance with the given name.
     * @param name The name of the renderer to get.
     * @returns The ASCII renderer instance with the given name.
     */
    public getRendererByName(name: string): P5AsciifyRenderer {
        const renderer = this._renderers.find(r => r.name === name)?.renderer;
        
        if (!renderer) {
            throw new P5AsciifyError(
                `Renderer '${name}' not found. Available renderers: ${this._renderers.map(r => r.name).join(', ')}`
            );
        }

        return renderer;
    }

    /**
     * Swaps the positions of two renderers in the renderer list.
     * @param renderer1 
     * @param renderer2 
     */
    public swapRenderers(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void {
        const renderer1Instance = typeof renderer1 === 'string' ? this.getRendererByName(renderer1) : renderer1;
        const renderer2Instance = typeof renderer2 === 'string' ? this.getRendererByName(renderer2) : renderer2;

        const renderer1Index = this._renderers.findIndex(r => r.renderer === renderer1Instance);
        const renderer2Index = this._renderers.findIndex(r => r.renderer === renderer2Instance);

        if (renderer1Index === -1 || renderer2Index === -1) {
            throw new P5AsciifyError(`One or more renderers not found.`);
        }

        const temp = this._renderers[renderer1Index];
        this._renderers[renderer1Index] = this._renderers[renderer2Index];
        this._renderers[renderer2Index] = temp;
    }

    // Getters and setters
    get renderers(): { name: string, renderer: P5AsciifyRenderer }[] { return this._renderers; }
}