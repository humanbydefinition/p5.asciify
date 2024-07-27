import P5AsciifyEffect from './effect.js';

class P5AsciifyGrayscaleEffect extends P5AsciifyEffect {
    constructor({ shader }) {
        super("grayscale", shader);
    }
}

export default P5AsciifyGrayscaleEffect;