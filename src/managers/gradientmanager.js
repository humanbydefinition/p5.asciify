import P5AsciifyLinearGradient from "../gradients/linear/Linear";
import P5AsciifyZigZagGradient from "../gradients/zigzag/ZigZag";
import P5AsciifySpiralGradient from "../gradients/spiral/Spiral";
import P5AsciifyRadialGradient from "../gradients/radial/Radial";
import P5AsciifyConicalGradient from "../gradients/conical/Conical";
import P5AsciifyNoiseGradient from "../gradients/noise/Noise";

import vertexShader from '../assets/shaders/vert/shader.vert';

import linearGradientShader from "../gradients/linear/linear.frag";
import zigzagGradientShader from "../gradients/zigzag/zigzag.frag";
import spiralGradientShader from "../gradients/spiral/spiral.frag";
import radialGradientShader from "../gradients/radial/radial.frag";
import conicalGradientShader from "../gradients/conical/conical.frag";
import noiseGradientShader from "../gradients/noise/noise.frag";

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
    _gradients = [];

    setup(fontTextureAtlas) {
        this.fontTextureAtlas = fontTextureAtlas;
        this.setupShaders();
        this.setupGradientQueue();
    }

    addInstance(p5Instance) {
        this.p5Instance = p5Instance;
    }

    setupGradientQueue() {
        for (let gradientInstance of this._setupQueue) {
            gradientInstance.setup(this.p5Instance, this.gradientShaders[gradientInstance.type], this.fontTextureAtlas.getCharsetColorArray(gradientInstance._characters));
        }

        this._setupQueue = [];
    }

    getGradientParams(gradientName, params) {
        return { ...this.gradientParams[gradientName], ...params };
    }

    addGradient(gradientName, brightnessStart, brightnessEnd, characters, params) {
        const mergedParams = this.getGradientParams(gradientName, { brightnessStart, brightnessEnd, characters, ...params });
        const gradient = this.gradientConstructors[gradientName]({ type: gradientName, shader: this.gradientShaders[gradientName], params: mergedParams });
        gradient.registerPaletteChangeCallback(this.handleGradientPaletteChange.bind(this));

        this._gradients.push(gradient);

        if (!this.p5Instance._setupDone) {
            this._setupQueue.push(gradient);
        } else {
            gradient.setup(this.p5Instance, this.gradientShaders[gradientName], this.fontTextureAtlas.getCharsetColorArray(characters));
        }

        return gradient;
    }

    removeGradient(gradient) {
        const index = this._gradients.indexOf(gradient);
        if (index > -1) {
            this._gradients.splice(index, 1);
        }
    }

    handleGradientPaletteChange(gradient, characters) {
        if (!this.p5Instance._setupDone) {
            gradient._characters = characters;
        } else {
            gradient._palette.setColors(this.fontTextureAtlas.getCharsetColorArray(characters));
        }
    }

    setupShaders() {
        for (let gradientName in this.gradientShaders) {
            this.gradientShaders[gradientName] = this.p5Instance.createShader(vertexShader, this.gradientShaders[gradientName]);
        }
    }
}

export default P5AsciifyGradientManager;