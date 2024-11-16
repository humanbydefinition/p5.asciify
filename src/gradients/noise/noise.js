import P5AsciifyGradient from '../gradient.js';

class P5AsciifyNoiseGradient extends P5AsciifyGradient {

    constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, noiseScale, speed, direction }) {
        super(type, shader, true, brightnessStart, brightnessEnd, colorPalette, palette);

        this._direction = direction;
        this._noiseScale = noiseScale;
        this._speed = speed;
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('direction', this._direction);
        this._shader.setUniform('noiseScale', this._noiseScale);
        this._shader.setUniform('u_speed', this._speed);
    }
}

export default P5AsciifyNoiseGradient;