import P5AsciifyEffect from './effect.js';

/**
 * @class P5AsciifyChromaticAberrationEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a chromatic aberration effect for the P5Asciify library.
 * Applies a chromatic aberration effect to the given framebuffer, simulating color separation.
 */
class P5AsciifyChromaticAberrationEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyChromaticAberrationEffect.
     * @param {Object} options - The options for the chromatic aberration effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.amount - The amount of chromatic aberration.
     * @param {number} options.angle - The angle of the chromatic aberration in degrees.
     */
    constructor({ shader, amount, angle }) {
        super("chromaticaberration", shader);
        this._amount = amount;
        this._angle = angle;
    }

    /**
     * Sets the shader uniforms for the chromatic aberration effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_aberrationAmount', this._amount);
        this._shader.setUniform('u_aberrationAngle', this._angle * Math.PI / 180);
    }

    /**
     * Sets the amount of chromatic aberration.
     * @param {number} amount - The new amount of chromatic aberration.
     */
    set amount(amount) {
        this._amount = amount;
    }

    /**
     * Sets the angle of chromatic aberration.
     * @param {number} angle - The new angle of chromatic aberration in degrees.
     */
    set angle(angle) {
        this._angle = angle;
    }

    /**
     * Gets the current amount of chromatic aberration.
     * @returns {number} The current amount of chromatic aberration.
     */
    get amount() {
        return this._amount;
    }

    /**
     * Gets the current angle of chromatic aberration.
     * @returns {number} The current angle of chromatic aberration in degrees.
     */
    get angle() {
        return this._angle;
    }
}

export default P5AsciifyChromaticAberrationEffect;
