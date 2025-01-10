import p5 from 'p5';

import BrightnessAsciiRenderer from './brightnessAsciiRenderer/BrightnessAsciiRenderer';
import AccurateAsciiRenderer from './accurateAsciiRenderer/AccurateAsciiRenderer';
import CustomAsciiRenderer from './customAsciiRenderer/CustomAsciiRenderer';
import EdgeAsciiRenderer from './edgeAsciiRenderer/EdgeAsciiRenderer';
import TextAsciiRenderer from './textAsciiRenderer/TextAsciiRenderer';
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
    TEXT_OPTIONS
} from '../constants/defaults';

import { P5AsciifyCharacterSet } from '../CharacterSet';
import { P5AsciifyGradientManager } from '../gradients/GradientManager';

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export class RendererManager {
    private p!: p5;
    private grid: any;
    private fontTextureAtlas: any;
    private currentCanvasDimensions!: { width: number, height: number };
    private gradientCharacterSet!: P5AsciifyCharacterSet;
    private renderers!: AsciiRenderer[];
    private textAsciiRenderer!: TextAsciiRenderer;
    public gradientManager: P5AsciifyGradientManager;
    private lastRenderer!: AsciiRenderer;
    private fontBase64!: string;
    private fontFileType!: string;

    constructor() {
        this.gradientManager = new P5AsciifyGradientManager();
    }

    /**
     * Sets up the renderer manager with the specified default options.
     * @param p5Instance The p5 instance
     * @param grid The grid instance
     * @param fontTextureAtlas The font texture atlas instance
     */
    public setup(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas): void {
        this.p = p5Instance;
        this.grid = grid;
        this.fontTextureAtlas = fontTextureAtlas;

        this.currentCanvasDimensions = {
            width: this.p.width,
            height: this.p.height
        };

        this.gradientCharacterSet = new P5AsciifyCharacterSet(
            this.p,
            fontTextureAtlas,
            BRIGHTNESS_OPTIONS.characters
        );

        this.gradientManager.setup(this.fontTextureAtlas);

        this.renderers = [
            new BrightnessAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, BRIGHTNESS_OPTIONS.characters), { ...BRIGHTNESS_OPTIONS }),
            new AccurateAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, ACCURATE_OPTIONS.characters), { ...ACCURATE_OPTIONS }),
            new GradientAsciiRenderer(this.p, this.grid, this.gradientCharacterSet, this.gradientManager, { ...GRADIENT_OPTIONS }),
            new EdgeAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, EDGE_OPTIONS.characters), { ...EDGE_OPTIONS }),
            new CustomAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet(this.p, fontTextureAtlas, BRIGHTNESS_OPTIONS.characters), { ...CUSTOM_OPTIONS }),
        ];

        this.textAsciiRenderer = new TextAsciiRenderer(this.p, fontTextureAtlas, this.grid, this.fontBase64, this.fontFileType, { ...TEXT_OPTIONS });
    }

    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
     */
    public render(inputFramebuffer: any, borderColor: any): void {
        let asciiOutput = inputFramebuffer;
        let currentRenderer = this.renderers[0];
        let isFirst = true;

        for (const renderer of this.renderers) {
            if (renderer.options.enabled) {
                renderer.render(inputFramebuffer, currentRenderer, isFirst);
                asciiOutput = renderer.outputFramebuffer;
                currentRenderer = renderer;
                isFirst = false;
                this.lastRenderer = renderer;
            }
        }

        this.p.clear();
        this.p.background(borderColor);
        this.p.image(asciiOutput, -this.p.width / 2, -this.p.height / 2);

        if (this.textAsciiRenderer.options.enabled) {
            this.textAsciiRenderer.outputAsciiToHtml(this.lastRenderer);
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

            this.renderers.forEach(renderer => {
                renderer.resizeFramebuffers();
            });

            this.textAsciiRenderer.updateDimensions();
        }
    }
}