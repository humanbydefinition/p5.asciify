import P5AsciifyEffect from '../effect.js';

class P5AsciifyCrtEffect extends P5AsciifyEffect {
 
    constructor({ shader, speedMultiplier }) {
        super("crt", shader);

        this._speedMultiplier = speedMultiplier;
    }

    /**
     * Sets the shader uniforms for the distortion effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer, frameCount) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('uResolution', [framebuffer.width, framebuffer.height]);
        this._shader.setUniform('uTime', frameCount * this._speedMultiplier);
    }

    get speedMultiplier() {
        return this._speedMultiplier;
    }

    set speedMultiplier(speedMultiplier) {
        this._speedMultiplier = speedMultiplier;
    }
}

export default P5AsciifyCrtEffect;
