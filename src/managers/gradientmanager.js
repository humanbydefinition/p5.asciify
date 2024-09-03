import P5AsciifyLinearGradient from "../gradients/linear.js";
import P5AsciifyZigZagGradient from "../gradients/zigzag.js";
import P5AsciifySpiralGradient from "../gradients/spiral.js";
import P5AsciifyRadialGradient from "../gradients/radial.js";
import P5AsciifyConicalGradient from "../gradients/conical.js";
import P5AsciifyNoiseGradient from "../gradients/noise.js";

import vertexShader from '../shaders/vert/shader.vert';

import linearGradientShader from "../shaders/frag/gradients/linear.frag";
import zigzagGradientShader from "../shaders/frag/gradients/zigzag.frag";
import spiralGradientShader from "../shaders/frag/gradients/spiral.frag";
import radialGradientShader from "../shaders/frag/gradients/radial.frag";
import conicalGradientShader from "../shaders/frag/gradients/conical.frag";
import noiseGradientShader from "../shaders/frag/gradients/noise.frag";

class P5AsciifyGradientManager {

    gradientParams = {
        "linear": { direction: 1, angle: 0, speed: 0.01 },
        "zigzag": { direction: 1, angle: 0, speed: 0.01 },
        "spiral": { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
        "radial": { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
        "conical": { centerX: 0.5, centerY: 0.5, speed: 0.01 },
        "noise": { noiseScale: 0.1, speed: 0.01, direction: 1 },
    }

    gradientShaders = {
        "linear": linearGradientShader,
        "zigzag": zigzagGradientShader,
        "spiral": spiralGradientShader,
        "radial": radialGradientShader,
        "conical": conicalGradientShader,
        "noise": noiseGradientShader,
    }

    gradientConstructors = {
        "linear": ({ type, shader, params }) => new P5AsciifyLinearGradient({ type, shader, ...params }),
        "zigzag": ({ type, shader, params }) => new P5AsciifyZigZagGradient({ type, shader, ...params }),
        "spiral": ({ type, shader, params }) => new P5AsciifySpiralGradient({ type, shader, ...params }),
        "radial": ({ type, shader, params }) => new P5AsciifyRadialGradient({ type, shader, ...params }),
        "conical": ({ type, shader, params }) => new P5AsciifyConicalGradient({ type, shader, ...params }),
        "noise": ({ type, shader, params }) => new P5AsciifyNoiseGradient({ type, shader, ...params }),
    }

    _setupQueue = [];

    constructor(colorPalette) {
        this._gradients = [];
        this.colorPalette = colorPalette;
    }

    setup(gradientCharacterSet, p5Instance) {
        this.gradientCharacterSet = gradientCharacterSet;
        this.p5Instance = p5Instance;
        this.setupShaders();
        this.setupGradientQueue();
    }

    setupGradientQueue() {
        for (let gradientInstance of this._setupQueue) {
            this.gradientCharacterSet.appendCharacterSet(gradientInstance._palette);
            gradientInstance.setup(this.gradientShaders[gradientInstance.type], this.gradientCharacterSet.getCharsetColorArray(gradientInstance._palette));
        }
    }

    getGradientParams(gradientName, params) {
        return { ...this.gradientParams[gradientName], ...params };
    }

    addGradient(gradientName, brightnessStart, brightnessEnd, palette, params) {
        const mergedParams = this.getGradientParams(gradientName, { brightnessStart, brightnessEnd, colorPalette: this.colorPalette, palette, ...params });
        const gradient = this.gradientConstructors[gradientName]({ type: gradientName, shader: this.gradientShaders[gradientName], params: mergedParams });
        gradient.registerPaletteChangeCallback(this.handleGradientPaletteChange.bind(this));
        this._gradients.push(gradient);

        if (frameCount === 0) {
            this._setupQueue.push(gradient);
        } else {
            this.gradientCharacterSet.appendCharacterSet(palette);
            gradient.setup(this.gradientShaders[gradientName], this.gradientCharacterSet.getCharsetColorArray(palette));
        }

        return gradient;
    }

    handleGradientPaletteChange(gradient, characters) {

        if (frameCount === 0) {
            gradient._palette = characters;
        } else {
            this.gradientCharacterSet.appendCharacterSet(characters);
            gradient._palette = this.gradientCharacterSet.getCharsetColorArray(characters);
            gradient._colorPalette.removePalette(gradient.paletteId);
            gradient.paletteId = gradient._colorPalette.addPalette(gradient._palette);
        }
    }

    setupShaders() {
        for (let gradientName in this.gradientShaders) {
            this.gradientShaders[gradientName] = this.p5Instance.createShader(vertexShader, this.gradientShaders[gradientName]);
        }
    }
}

export default P5AsciifyGradientManager;