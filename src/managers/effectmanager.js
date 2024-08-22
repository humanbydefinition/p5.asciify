import P5AsciifyBrightnessEffect from "../effects/brightness.js";
import P5AsciifyChromaticAberrationEffect from "../effects/chromaticaberration.js";
import P5AsciifyColorPaletteEffect from "../effects/colorpalette.js";
import P5AsciifyDistortionEffect from "../effects/distortion.js";
import P5AsciifyGrayscaleEffect from "../effects/grayscale.js";
import P5AsciifyInvertEffect from "../effects/invert.js";
import P5AsciifyKaleidoscopeEffect from "../effects/kaleidoscope.js";
import P5AsciifyRotateEffect from "../effects/rotate.js";

import kaleidoscopeShader from "../shaders/frag/kaleidoscope.frag";
import distortionShader from "../shaders/frag/distortion.frag";
import grayscaleShader from "../shaders/frag/grayscale.frag";
import invertShader from "../shaders/frag/invert.frag";
import chromaticAberrationShader from "../shaders/frag/chromaticaberration.frag";
import rotateShader from "../shaders/frag/rotate.frag";
import brightnessShader from "../shaders/frag/brightness.frag";
import colorPaletteShader from "../shaders/frag/colorpalette.frag";

import vertexShader from "../shaders/vert/shader.vert";

class P5AsciifyEffectManager {

    effectParams = {
        "kaleidoscope": { "segments": 2, "angle": 0.0 },
        "distortion": { "frequency": 0.1, "amplitude": 0.1 },
        "grayscale": {},
        "invert": {},
        "chromaticaberration": { "amount": 0.1, "angle": 0.0 },
        "rotate": { "angle": 0.0 },
        "brightness": { "brightness": 0.0 },
        "colorpalette": { "palette": ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"] },
    }

    effectShaders = {
        "kaleidoscope": kaleidoscopeShader,
        "distortion": distortionShader,
        "grayscale": grayscaleShader,
        "invert": invertShader,
        "chromaticaberration": chromaticAberrationShader,
        "rotate": rotateShader,
        "brightness": brightnessShader,
        "colorpalette": colorPaletteShader,
    }

    effectConstructors = {
        "kaleidoscope": ({ shader, params }) => new P5AsciifyKaleidoscopeEffect({ shader, ...params }),
        "distortion": ({ shader, params }) => new P5AsciifyDistortionEffect({ shader, ...params }),
        "grayscale": ({ shader, params }) => new P5AsciifyGrayscaleEffect({ shader, ...params }),
        "invert": ({ shader, params }) => new P5AsciifyInvertEffect({ shader, ...params }),
        "chromaticaberration": ({ shader, params }) => new P5AsciifyChromaticAberrationEffect({ shader, ...params }),
        "rotate": ({ shader, params }) => new P5AsciifyRotateEffect({ shader, ...params }),
        "brightness": ({ shader, params }) => new P5AsciifyBrightnessEffect({ shader, ...params }),
        "colorpalette": ({ shader, params }) => new P5AsciifyColorPaletteEffect({ shader, ...params, colorPalette: this.colorPalette }),
    }

    _setupQueue = [];

    constructor(colorPalette) {
        this.colorPalette = colorPalette;
        this._effects = [];
    }

    setup(p5Instance) {
        this.p5Instance = p5Instance;
        this.setupShaders();
        this.setupEffectQueue();
    }

    setupShaders() {
        for (let effectName in this.effectShaders) {
            this.effectShaders[effectName] = this.p5Instance.createShader(vertexShader, this.effectShaders[effectName]);
        }
    }

    setupEffectQueue() {
        for (let effectInstance of this._setupQueue) {
            effectInstance.setup();
            effectInstance.shader = this.effectShaders[effectInstance.name];
        }
    }

    addExistingEffectAtIndex(effectInstance, index) {
        effectInstance.shader = this.effectShaders[effectInstance.name];
        this._effects.splice(index, 0, effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }
    }

    getEffectIndex(effectInstance) {
        return this._effects.indexOf(effectInstance);
    }

    addEffect(effectName, userParams = {}) {

        const shader = frameCount === 0 ? null : this.effectShaders[effectName];
        const params = { ...this.effectParams[effectName], ...userParams };
        const effectInstance = this.effectConstructors[effectName]({ shader, params });
        this._effects.push(effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        } else {
            effectInstance.setup();
        }

        return effectInstance;
    }

    removeEffect(effectInstance) {
        this._effects.splice(this._effects.indexOf(effectInstance), 1);
    }

    hasEffect(effectInstance) {
        return this._effects.includes(effectInstance);
    }

    swapEffects(effectInstance1, effectInstance2) {
        const index1 = this._effects.indexOf(effectInstance1);
        const index2 = this._effects.indexOf(effectInstance2);

        // Swap the effects
        [this._effects[index1], this._effects[index2]] = [this._effects[index2], this._effects[index1]];
    }

    getEffects() {
        return this._effects;
    }
}

export default P5AsciifyEffectManager;