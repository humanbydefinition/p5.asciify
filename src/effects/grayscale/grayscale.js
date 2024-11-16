import P5AsciifyEffect from '../effect.js';

/**
 * @class P5AsciifyGrayscaleEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a grayscale effect for the P5Asciify library.
 * Applies a grayscale transformation to the given framebuffer.
 */
class P5AsciifyGrayscaleEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyGrayscaleEffect.
     * @param {Object} options - The options for the grayscale effect.
     * @param {Object} options.shader - The shader to use for the effect.
     */
    constructor({ shader }) {
        super("grayscale", shader);
    }
}

export default P5AsciifyGrayscaleEffect;
