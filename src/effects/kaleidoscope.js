import P5AsciifyEffect from './effect.js';

/**
 * @class P5AsciifyKaleidoscopeEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a kaleidoscope effect for the P5Asciify library.
 * Applies a kaleidoscope transformation to the given framebuffer.
 */
class P5AsciifyKaleidoscopeEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyKaleidoscopeEffect.
     * @param {Object} options - The options for the kaleidoscope effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.segments - The number of segments for the kaleidoscope effect.
     * @param {number} options.angle - The angle of rotation for the kaleidoscope effect in degrees.
     */
    constructor({ shader, segments, angle }) {
        super("kaleidoscope", shader);
        this._segments = segments;
        this._angle = angle;
    }

    /**
     * Sets the shader uniforms for the kaleidoscope effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_segments', this._segments);
        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    /**
     * Sets the number of segments for the kaleidoscope effect.
     * @param {number} segments - The new number of segments.
     */
    set segments(segments) {
        this._segments = segments;
    }

    /**
     * Sets the angle of rotation for the kaleidoscope effect.
     * @param {number} angle - The new angle of rotation in degrees.
     */
    set angle(angle) {
        this._angle = angle;
    }

    /**
     * Gets the current number of segments for the kaleidoscope effect.
     * @returns {number} The current number of segments.
     */
    get segments() {
        return this._segments;
    }

    /**
     * Gets the current angle of rotation for the kaleidoscope effect.
     * @returns {number} The current angle of rotation in degrees.
     */
    get angle() {
        return this._angle;
    }
}

export default P5AsciifyKaleidoscopeEffect;
