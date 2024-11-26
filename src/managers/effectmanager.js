import P5AsciifyBrightnessEffect from "../effects/brightness/brightness.js";
import P5AsciifyChromaticAberrationEffect from "../effects/chromaticaberration/chromaticaberration.js";
import P5AsciifyColorPaletteEffect from "../effects/colorpalette/colorpalette.js";
import P5AsciifyDistortionEffect from "../effects/distortion/distortion.js";
import P5AsciifyGrayscaleEffect from "../effects/grayscale/grayscale.js";
import P5AsciifyInvertEffect from "../effects/invert/invert.js";
import P5AsciifyKaleidoscopeEffect from "../effects/kaleidoscope/kaleidoscope.js";
import P5AsciifyRotateEffect from "../effects/rotate/rotate.js";
import P5AsciifyCrtEffect from "../effects/crt/crt.js";

import kaleidoscopeShader from "../effects/kaleidoscope/kaleidoscope.frag";
import distortionShader from "../effects/distortion/distortion.frag";
import grayscaleShader from "../effects/grayscale/grayscale.frag";
import invertShader from "../effects/invert/invert.frag";
import chromaticAberrationShader from "../effects/chromaticaberration/chromaticaberration.frag";
import rotateShader from "../effects/rotate/rotate.frag";
import brightnessShader from "../effects/brightness/brightness.frag";
import colorPaletteShader from "../effects/colorpalette/colorpalette.frag";
import crtShader from "../effects/crt/crt.frag";

import vertexShader from "../assets/shaders/vert/shader.vert";

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
        "crt": { "speedMultiplier": 1.0 }
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
        "crt": crtShader
    }

    effectConstructors = {
        "kaleidoscope": ({ shader, params }) => new P5AsciifyKaleidoscopeEffect({ shader, ...params }),
        "distortion": ({ shader, params }) => new P5AsciifyDistortionEffect({ shader, ...params }),
        "grayscale": ({ shader, params }) => new P5AsciifyGrayscaleEffect({ shader, ...params }),
        "invert": ({ shader, params }) => new P5AsciifyInvertEffect({ shader, ...params }),
        "chromaticaberration": ({ shader, params }) => new P5AsciifyChromaticAberrationEffect({ shader, ...params }),
        "rotate": ({ shader, params }) => new P5AsciifyRotateEffect({ shader, ...params }),
        "brightness": ({ shader, params }) => new P5AsciifyBrightnessEffect({ shader, ...params }),
        "colorpalette": ({ shader, params }) => new P5AsciifyColorPaletteEffect({ shader, ...params }),
        "crt": ({ shader, params }) => new P5AsciifyCrtEffect({ shader, ...params })
    }

    _setupQueue = [];
    _effects = [];

    addInstance(p5Instance) {
        this.p5Instance = p5Instance;
    }

    setup() {
        this.prevFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        this.nextFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

        this.setupShaders();
        this.setupEffectQueue();
    }

    render(inputFramebuffer) {
        this.prevFramebuffer.begin();
        this.p5Instance.clear();
        this.p5Instance.image(inputFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2, this.p5Instance.width, this.p5Instance.height);
        this.prevFramebuffer.end();

        this.nextFramebuffer.begin();
        this.p5Instance.clear();
        this.p5Instance.image(inputFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2, this.p5Instance.width, this.p5Instance.height);
        this.nextFramebuffer.end();

        for (const effect of this._effects) {
            if (effect.enabled) {
                // Swap framebuffers only if the effect is enabled
                [this.prevFramebuffer, this.nextFramebuffer] = [this.nextFramebuffer, this.prevFramebuffer];

                this.nextFramebuffer.begin();
                this.p5Instance.shader(effect.shader);
                effect.setUniforms(this.prevFramebuffer, this.p5Instance.frameCount);
                this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
                this.nextFramebuffer.end();
            }
        }
    }

    setupShaders() {
        for (let effectName in this.effectShaders) {
            this.effectShaders[effectName] = this.p5Instance.createShader(vertexShader, this.effectShaders[effectName]);
        }
    }

    setupEffectQueue() {
        for (let effectInstance of this._setupQueue) {
            effectInstance.setup(this.p5Instance);
            effectInstance.shader = this.effectShaders[effectInstance.name];
        }

        this._setupQueue = [];
    }

    addExistingEffectAtIndex(effectInstance, index) {
        effectInstance.shader = this.effectShaders[effectInstance.name];
        this._effects.splice(index, 0, effectInstance);

        if (this.p5Instance.frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }
    }

    getEffectIndex(effectInstance) {
        return this._effects.indexOf(effectInstance);
    }

    addEffect(effectName, userParams = {}) {
        const shader = this.p5Instance.frameCount === 0 ? null : this.effectShaders[effectName];
        const params = { ...this.effectParams[effectName], ...userParams };
        const effectInstance = this.effectConstructors[effectName]({ shader, params });
        this._effects.push(effectInstance);

        if (this.p5Instance.frameCount === 0) {
            this._setupQueue.push(effectInstance);
        } else {
            effectInstance.setup(this.p5Instance);
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