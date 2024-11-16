import P5AsciifyEffect from '../effect.js';

/**
 * @class P5AsciifyRotateEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a rotation effect for the P5Asciify library.
 * Applies a rotation transformation to the given framebuffer.
 */
class P5AsciifyRotateEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyRotateEffect.
     * @param {Object} options - The options for the rotation effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.angle - The angle of rotation in degrees.
     */
    constructor({ shader, angle }) {
        super("rotate", shader);
        this._angle = angle;
    }

    /**
     * Sets the shader uniforms for the rotation effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    /**
     * Sets the angle of rotation.
     * @param {number} angle - The new angle of rotation in degrees.
     */
    set angle(angle) {
        this._angle = angle;
    }

    /**
     * Gets the current angle of rotation.
     * @returns {number} The current angle of rotation in degrees.
     */
    get angle() {
        return this._angle;
    }
}

export default P5AsciifyRotateEffect;
