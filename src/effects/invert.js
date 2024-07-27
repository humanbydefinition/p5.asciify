import P5AsciifyEffect from './effect.js';

class P5AsciifyInvertEffect extends P5AsciifyEffect {
    constructor({ shader }) {
        super("invert", shader);
    }
}

export default P5AsciifyInvertEffect;