import P5AsciifyEffect from './effect.js';

class P5AsciifyKaleidoscopeEffect extends P5AsciifyEffect {
    constructor({ shader, segments, angle }) {
        super("kaleidoscope", shader);
        this._segments = segments;
        this._angle = angle;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_segments', this._segments);
        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    set segments(segments) {
        this._segments = segments;
    }

    set angle(angle) {
        this._angle = angle;
    }

    get segments() {
        return this._segments;
    }

    get angle() {
        return this._angle;
    }
}

export default P5AsciifyKaleidoscopeEffect;