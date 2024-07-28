import P5AsciifyEffect from './effect.js';

/**
 * @class P5AsciifyBrightnessEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a brightness effect for the P5Asciify library.
 * Adjusts the brightness of the given framebuffer.
 */
class P5AsciifyBrightnessEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyBrightnessEffect.
     * @param {Object} options - The options for the brightness effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.brightness - The brightness level to apply.
     */
    constructor({ shader, brightness }) {
        super("brightness", shader);
        this._brightness = brightness;
    }

    /**
     * Sets the shader uniforms for the brightness effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_brightness', this._brightness);
    }

    /**
     * Sets the brightness level.
     * @param {number} brightness - The new brightness level.
     */
    set brightness(brightness) {
        this._brightness = brightness;
    }

    /**
     * Gets the current brightness level.
     * @returns {number} The current brightness level.
     */
    get brightness() {
        return this._brightness;
    }
}

export default P5AsciifyBrightnessEffect;
