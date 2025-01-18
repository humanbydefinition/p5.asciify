import p5 from 'p5';

import BrightnessAsciiRenderer from './brightnessAsciiRenderer/BrightnessAsciiRenderer';
import AccurateAsciiRenderer from './accurateAsciiRenderer/AccurateAsciiRenderer';
import EdgeAsciiRenderer from './edgeAsciiRenderer/EdgeAsciiRenderer';
import GradientAsciiRenderer from './gradientAsciiRenderer/GradientAsciiRenderer';
import { AsciiRenderer } from './AsciiRenderer';

import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import {
    BRIGHTNESS_OPTIONS,
    ACCURATE_OPTIONS,
    GRADIENT_OPTIONS,
    EDGE_OPTIONS,
    CUSTOM_OPTIONS,
} from '../constants';

import { P5AsciifyCharacterSet } from '../CharacterSet';
import { P5AsciifyGradientManager } from '../gradients/GradientManager';

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export class RendererManager {
    private currentCanvasDimensions: { width: number, height: number };
    private gradientCharacterSet: P5AsciifyCharacterSet;
    private _renderers: AsciiRenderer[];
    public gradientManager: P5AsciifyGradientManager;
    public lastRenderer: AsciiRenderer;

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
        this.gradientCharacterSet = new P5AsciifyCharacterSet(
            this.p,
            fontTextureAtlas,
            BRIGHTNESS_OPTIONS.characters
        );

        this._renderers = [
            new BrightnessAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, BRIGHTNESS_OPTIONS.characters), { ...BRIGHTNESS_OPTIONS }),
            new AccurateAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, ACCURATE_OPTIONS.characters), { ...ACCURATE_OPTIONS }),
            new GradientAsciiRenderer(this.p, this.grid, this.gradientCharacterSet, this.gradientManager, { ...GRADIENT_OPTIONS }),
            new EdgeAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, EDGE_OPTIONS.characters), { ...EDGE_OPTIONS }),
            new AsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, BRIGHTNESS_OPTIONS.characters), { ...CUSTOM_OPTIONS }),
        ];

        this.lastRenderer = this._renderers[0];
    }

    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
     */
    public render(inputFramebuffer: any, borderColor: any): void {
        let asciiOutput = inputFramebuffer;
        let currentRenderer = this._renderers[0];

        for (const renderer of this._renderers) {
            if (renderer.options.enabled) {
                renderer.render(inputFramebuffer, currentRenderer);
                asciiOutput = renderer.outputFramebuffer;
                currentRenderer = renderer;
                this.lastRenderer = renderer;
            }
        }

        this.p.clear();
        this.p.background(borderColor);
        this.p.image(asciiOutput, -this.p.width / 2, -this.p.height / 2);

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
            renderer.resizeFramebuffers();
            renderer.resetShaders();
        });
    }

    // Getters and setters
    get renderers(): AsciiRenderer[] { return this._renderers; }
}