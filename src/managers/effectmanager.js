import P5AsciifyError from "../errors.js";
import P5AsciifyBrightnessEffect from "../effects/brightness.js";
import P5AsciifyChromaticAberrationEffect from "../effects/chromaticaberration.js";
import P5AsciifyColorPaletteEffect from "../effects/colorpalette.js";
import P5AsciifyDistortionEffect from "../effects/distortion.js";
import P5AsciifyGrayscaleEffect from "../effects/grayscale.js";
import P5AsciifyInvertEffect from "../effects/invert.js";
import P5AsciifyKaleidoscopeEffect from "../effects/kaleidoscope.js";
import P5AsciifyRotateEffect from "../effects/rotate.js";
import P5AsciifyColorPalette from "../colorpalette.js";

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

    colorPalette = new P5AsciifyColorPalette();

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
        "colorpalette": ({ shader, params }) => new P5AsciifyColorPaletteEffect({ shader, ...params, paletteBuffer: this.colorPalette }),
    }

    _setupQueue = [];

    constructor() {
        this._effects = [];
    }

    setup() {
        this.setupShaders();
        this.setupEffectQueue();
        this.colorPalette.setup();
    }

    setupShaders() {
        for (let effectName in this.effectShaders) {
            this.effectShaders[effectName] = createShader(vertexShader, this.effectShaders[effectName]);
        }
    }

    setupEffectQueue() {
        for (let effectInstance of this._setupQueue) {
            effectInstance.shader = this.effectShaders[effectInstance.name];

            if (effectInstance.name === "colorpalette") {
                effectInstance.paletteBuffer = this.colorPalette;
            }
        }
    }

    addExistingEffectAtIndex(effectInstance, index) {
        if (this.hasEffect(effectInstance)) {
            throw new P5AsciifyError(`Effect instance of type '${effectInstance.name}' already exists in the effect manager.`);
        }

        effectInstance.shader = this.effectShaders[effectInstance.name];
        this._effects.splice(index, 0, effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }
    }

    getEffectIndex(effectInstance) {
        const index = this._effects.indexOf(effectInstance);
        if (index === -1) {
            throw new P5AsciifyError(`Effect instance of type '${effectInstance.name}' does not exist in the effect manager.`);
        }
        return index;
    }

    addEffect(effectName, userParams = {}) {
        if (!this.effectConstructors[effectName]) {
            throw new P5AsciifyError(
                `Effect '${effectName}' does not exist! 
                Available effects: ${Object.keys(this.effectConstructors).join(", ")}`
            );
        }

        const validParams = Object.keys(this.effectParams[effectName]);
        const invalidKeys = Object.keys(userParams).filter(key => !Object.keys(this.effectParams[effectName]).includes(key));
        if (invalidKeys.length > 0) {
            throw new P5AsciifyError(
                `Invalid parameter(s) for effect '${effectName}': ${invalidKeys.join(", ")}
                Valid parameters are: ${validParams.join(", ")}`
            );
        }

        const shader = frameCount === 0 ? null : this.effectShaders[effectName];
        const params = { ...this.effectParams[effectName], ...userParams };
        const effectInstance = this.effectConstructors[effectName]({ shader, params });
        this._effects.push(effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }

        return effectInstance;
    }

    removeEffect(effectInstance) {
        const index = this._effects.indexOf(effectInstance);
        if (index > -1) {
            this._effects.splice(index, 1);
        } else {
            throw new P5AsciifyError(`Effect instance of type '${effectInstance.name}' cannot be removed because it does not exist in the effect manager.`);
        }
    }

    hasEffect(effectInstance) {
        return this._effects.includes(effectInstance);
    }

    swapEffects(effectInstance1, effectInstance2) {
        const index1 = this._effects.indexOf(effectInstance1);
        const index2 = this._effects.indexOf(effectInstance2);

        if (index1 === -1) {
            throw new P5AsciifyError(`First effect parameter of type '${effectInstance1.name}' cannot be swapped because it does not exist in the effect manager.`);
        }

        if (index2 === -1) {
            throw new P5AsciifyError(`Second effect parameter of type '${effectInstance2.name}' cannot be swapped because it does not exist in the effect manager.`);
        }

        // Swap the effects
        [this._effects[index1], this._effects[index2]] = [this._effects[index2], this._effects[index1]];
    }

    getEffects() {
        return this._effects;
    }
}

export default P5AsciifyEffectManager;