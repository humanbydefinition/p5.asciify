import P5AsciifyEffect from './effect.js';

class P5AsciifyChromaticAberrationEffect extends P5AsciifyEffect {
    constructor({ shader, amount, angle }) {
        super("chromaticaberration", shader);
        this._amount = amount;
        this._angle = angle;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_aberrationAmount', this._amount);
        this._shader.setUniform('u_aberrationAngle', this._angle * Math.PI / 180);
    }

    set amount(amount) {
        this._amount = amount;
    }

    set angle(angle) {
        this._angle = angle;
    }

    get amount() {
        return this._amount;
    }

    get angle() {
        return this._angle;
    }
}

export default P5AsciifyChromaticAberrationEffect;