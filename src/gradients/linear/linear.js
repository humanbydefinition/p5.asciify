import P5AsciifyGradient from '../gradient.js';

class P5AsciifyLinearGradient extends P5AsciifyGradient {

    constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, angle, speed = 0.01}) {
        super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

        this._direction = direction;
        this._angle = angle;
        this._speed = speed;
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this._direction);
        this._shader.setUniform('u_angle',  this._angle * Math.PI / 180);
        this._shader.setUniform('u_speed', this._speed);
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        this._direction = value;
    }

    get angle() {
        return this._angle;
    }

    set angle(value) {
        this._angle = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}

export default P5AsciifyLinearGradient;