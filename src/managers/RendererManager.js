import BrightnessAsciiRenderer from '../renderers/brightnessAsciiRenderer/BrightnessAsciiRenderer.js';
import AccurateAsciiRenderer from '../renderers/accurateAsciiRenderer/AccurateAsciiRenderer.js';
import CustomAsciiRenderer from '../renderers/customAsciiRenderer/CustomAsciiRenderer.js';
import EdgeAsciiRenderer from '../renderers/edgeAsciiRenderer/EdgeAsciiRenderer.js';
import TextAsciiRenderer from '../renderers/textAsciiRenderer/TextAsciiRenderer.js';

import P5AsciifyGrid from '../grid.js';

import {
    BRIGHTNESS_OPTIONS,
    ACCURATE_OPTIONS,
    GRADIENT_OPTIONS,
    EDGE_OPTIONS,
    CUSTOM_OPTIONS,
    TEXT_OPTIONS
} from '../constants/defaults.js';

import P5AsciifyCharacterSet from '../characterset.js';
import P5AsciifyGradientManager from './gradientmanager.js';
import GradientAsciiRenderer from '../renderers/gradientAsciiRenderer/GradientAsciiRenderer.js';

export class RendererManager {

    gradientManager = new P5AsciifyGradientManager();

    lastRenderer = null;

    setup(p5Instance, grid, fontTextureAtlas) {
        this.p = p5Instance;
        this.grid = grid;
        this.fontTextureAtlas = fontTextureAtlas;

        this.currentCanvasDimensions = {
            width: this.p.width,
            height: this.p.height
        }

        this.gradientCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p, asciiFontTextureAtlas: fontTextureAtlas, characters: BRIGHTNESS_OPTIONS.characters });
        this.gradientManager.setup(this.gradientCharacterSet);
        this.gradientRenderer = new GradientAsciiRenderer(this.p, this.grid, this.gradientCharacterSet, this.gradientManager, { ...GRADIENT_OPTIONS });

        this.renderers = [
            new BrightnessAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet({ p5Instance: this.p, asciiFontTextureAtlas: fontTextureAtlas, characters: BRIGHTNESS_OPTIONS.characters }), { ...BRIGHTNESS_OPTIONS }),
            new AccurateAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet({ p5Instance: this.p, asciiFontTextureAtlas: fontTextureAtlas, characters: ACCURATE_OPTIONS.characters }), { ...ACCURATE_OPTIONS }),
            new EdgeAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet({ p5Instance: this.p, asciiFontTextureAtlas: fontTextureAtlas, characters: EDGE_OPTIONS.characters }), { ...EDGE_OPTIONS }),
            new CustomAsciiRenderer(this.p, this.grid, new P5AsciifyCharacterSet({ p5Instance: this.p, asciiFontTextureAtlas: fontTextureAtlas, characters: BRIGHTNESS_OPTIONS.characters }), { ...CUSTOM_OPTIONS }),
        ]

        this.textAsciiRenderer = new TextAsciiRenderer(this.p, fontTextureAtlas, this.grid, this.fontBase64, this.fontFileType, { ...TEXT_OPTIONS });
    }

    render(inputFramebuffer, borderColor) {
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

        this.p.clear();
        this.p.background(borderColor);
        this.p.image(asciiOutput, -this.p.width / 2, -this.p.height / 2);

        if (this.textAsciiRenderer.options.enabled) {
            this.textAsciiRenderer.outputAsciiToHtml(this.lastRenderer);
        }

        this.checkCanvasDimensions();
    }

    checkCanvasDimensions() {
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