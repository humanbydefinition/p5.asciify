import P5AsciifyEffect from './effect.js';

class P5AsciifyDistortionEffect extends P5AsciifyEffect {
    constructor({ shader, frequency, amplitude }) {
        super("distortion", shader);
        this._frequency = frequency;
        this._amplitude = amplitude;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_frequency', this._frequency);
        this._shader.setUniform('u_amplitude', this._amplitude);
        this._shader.setUniform('u_time', frameCount * 0.01);
    }

    set frequency(frequency) {
        this._frequency = frequency;
    }

    set amplitude(amplitude) {
        this._amplitude = amplitude;
    }

    get frequency() {
        return this._frequency;
    }

    get amplitude() {
        return this._amplitude;
    }
}

export default P5AsciifyDistortionEffect;