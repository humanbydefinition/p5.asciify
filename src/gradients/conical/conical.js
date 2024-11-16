import P5AsciifyGradient from '../gradient.js';

class P5AsciifyConicalGradient extends P5AsciifyGradient {

    constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette,  centerX, centerY, speed}) {
        super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

        this._centerX = centerX;
        this._centerY = centerY;
        this._speed = speed;
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_centerX', this._centerX);
        this._shader.setUniform('u_centerY', this._centerY);
        this._shader.setUniform('u_speed', this._speed);
    }

    get centerX() {
        return this._centerX;
    }

    set centerX(value) {
        this._centerX = value;
    }

    get centerY() {
        return this._centerY;
    }

    set centerY(value) {
        this._centerY = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}

export default P5AsciifyConicalGradient;