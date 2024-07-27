import P5AsciifyEffect from './effect.js';

class P5AsciifyBrightnessEffect extends P5AsciifyEffect {
    constructor({ shader, brightness }) {
        super("brightness", shader);
        this._brightness = brightness;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_brightness', this._brightness);
    }

    set brightness(brightness) {
        this._brightness = brightness;
    }

    get brightness() {
        return this._brightness;
    }
}

export default P5AsciifyBrightnessEffect;