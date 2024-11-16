import P5AsciifyEffect from '../effect.js';

/**
 * @class P5AsciifyInvertEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents an invert color effect for the P5Asciify library.
 * Applies a color inversion to the given framebuffer.
 */
class P5AsciifyInvertEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyInvertEffect.
     * @param {Object} options - The options for the invert effect.
     * @param {Object} options.shader - The shader to use for the effect.
     */
    constructor({ shader }) {
        super("invert", shader);
    }
}

export default P5AsciifyInvertEffect;
