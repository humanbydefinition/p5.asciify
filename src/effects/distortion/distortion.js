import P5AsciifyEffect from '../effect.js';

/**
 * @class P5AsciifyDistortionEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a distortion effect for the P5Asciify library.
 * Applies a distortion effect to the given framebuffer.
 */
class P5AsciifyDistortionEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyDistortionEffect.
     * @param {Object} options - The options for the distortion effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.frequency - The frequency of the distortion effect.
     * @param {number} options.amplitude - The amplitude of the distortion effect.
     */
    constructor({ shader, frequency, amplitude }) {
        super("distortion", shader);
        this._frequency = frequency;
        this._amplitude = amplitude;
    }

    /**
     * Sets the shader uniforms for the distortion effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer, frameCount) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_frequency', this._frequency);
        this._shader.setUniform('u_amplitude', this._amplitude);
        this._shader.setUniform('u_time', frameCount * 0.01);
    }

    /**
     * Sets the frequency of the distortion effect.
     * @param {number} frequency - The new frequency of the distortion effect.
     */
    set frequency(frequency) {
        this._frequency = frequency;
    }

    /**
     * Sets the amplitude of the distortion effect.
     * @param {number} amplitude - The new amplitude of the distortion effect.
     */
    set amplitude(amplitude) {
        this._amplitude = amplitude;
    }

    /**
     * Gets the current frequency of the distortion effect.
     * @returns {number} The current frequency of the distortion effect.
     */
    get frequency() {
        return this._frequency;
    }

    /**
     * Gets the current amplitude of the distortion effect.
     * @returns {number} The current amplitude of the distortion effect.
     */
    get amplitude() {
        return this._amplitude;
    }
}

export default P5AsciifyDistortionEffect;
