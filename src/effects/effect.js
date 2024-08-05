/**
 * @class P5AsciifyEffect
 * @description
 * The base class for all effects in the P5Asciify library.
 * Manages common properties and methods for effects such as shaders and enabling/disabling effects.
 */
class P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyEffect.
     * @param {string} name - The name of the effect.
     * @param {Object} shader - The shader to use for the effect.
     */
    constructor(name, shader) {
        this._name = name;
        this._shader = shader;
        this._enabled = true;
    }

    setup() {
        // Override this method in subclasses to set up the effect.
    }

    /**
     * Sets the shader uniforms for the effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        this._shader.setUniform('u_image', framebuffer);
    }

    /**
     * Gets the shader used by the effect.
     * @returns {Object} The shader object.
     */
    get shader() {
        return this._shader;
    }

    /**
     * Sets the shader for the effect.
     * @param {Object} shader - The new shader object.
     */
    set shader(shader) {
        this._shader = shader;
    }

    /**
     * Gets the name of the effect.
     * @returns {string} The name of the effect.
     */
    get name() {
        return this._name;
    }

    /**
     * Gets whether the effect is enabled.
     * @returns {boolean} True if the effect is enabled, false otherwise.
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * Sets whether the effect is enabled.
     * @param {boolean} enabled - True to enable the effect, false to disable it.
     */
    set enabled(enabled) {
        this._enabled = enabled;
    }
}

export default P5AsciifyEffect;