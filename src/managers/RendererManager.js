import BrightnessAsciiRenderer from '../renderers/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import AccurateAsciiRenderer from '../renderers/accurateAsciiRenderer/AccurateAsciiRenderer.js';
import CustomAsciiRenderer from '../renderers/customAsciiRenderer/CustomAsciiRenderer.js';
import EdgeAsciiRenderer from '../renderers/edgeAsciiRenderer/EdgeAsciiRenderer.js';

import {
    COMMON_OPTIONS,
    ASCII_OPTIONS,
    GRADIENT_OPTIONS,
    EDGE_OPTIONS,
    CUSTOM_OPTIONS,
    TEXT_OPTIONS
} from '../constants/defaults.js';

import P5AsciifyCharacterSet from '../characterset.js';

export class RendererManager {

    lastRenderer = null;

    constructor(p5Instance, grid, fontTextureAtlas) {
        this.p5Instance = p5Instance;
        this.grid = grid;
        this.fontTextureAtlas = fontTextureAtlas;

        this.currentCanvasDimensions = {
            width: p5Instance.width,
            height: p5Instance.height
        }

        this.renderers = [
            new BrightnessAsciiRenderer(p5Instance, grid, new P5AsciifyCharacterSet({ p5Instance: p5Instance, asciiFontTextureAtlas: fontTextureAtlas, characters: ASCII_OPTIONS.characters }), { ...ASCII_OPTIONS }),
            //new AccurateAsciiRenderer(p5Instance, grid, new P5AsciifyCharacterSet({ p5Instance: p5Instance, asciiFontTextureAtlas: fontTextureAtlas, characters: ASCII_OPTIONS.characters }), { ...ASCII_OPTIONS }),
            new EdgeAsciiRenderer(p5Instance, grid, new P5AsciifyCharacterSet({ p5Instance: p5Instance, asciiFontTextureAtlas: fontTextureAtlas, characters: EDGE_OPTIONS.characters }), { ...EDGE_OPTIONS }),
            new CustomAsciiRenderer(p5Instance, grid, new P5AsciifyCharacterSet({ p5Instance: p5Instance, asciiFontTextureAtlas: fontTextureAtlas, characters: ASCII_OPTIONS.characters }), { ...CUSTOM_OPTIONS }),
        ]
    }

    render(inputFramebuffer) {
        let asciiOutput = inputFramebuffer;
        let currentRenderer = this.renderers[0];
        let isFirst = true;

        for (let renderer of this.renderers) {
            if (renderer.options.enabled) {
                renderer.render(inputFramebuffer, currentRenderer, isFirst);
                asciiOutput = renderer.getOutputFramebuffer();
                currentRenderer = renderer;
                isFirst = false;
                this.lastRenderer = renderer;
            }
        }

        this.p5Instance.clear();
        this.p5Instance.background(0);
        this.p5Instance.image(asciiOutput, -this.p5Instance.width / 2, -this.p5Instance.height / 2);

        this.checkCanvasDimensions();
    }

    checkCanvasDimensions() {
        if (this.currentCanvasDimensions.width !== this.p5Instance.width || this.currentCanvasDimensions.height !== this.p5Instance.height) {
            this.currentCanvasDimensions.width = this.p5Instance.width;
            this.currentCanvasDimensions.height = this.p5Instance.height;

            this.grid.reset();

            this.renderers.forEach(renderer => {
                renderer.resizeFramebuffers();
            });
        }
    }
}