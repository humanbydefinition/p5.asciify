import P5AsciifyGradient from '../gradient.js';

class P5AsciifySpiralGradient extends P5AsciifyGradient {

    constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, centerX, centerY, speed, density}) {
        super(type, shader, true, brightnessStart, brightnessEnd, colorPalette, palette);

        this._direction = direction;
        this._centerX = centerX;
        this._centerY = centerY;
        this._speed = speed;
        this._density = density;
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this._direction);
        this._shader.setUniform('u_centerX', this._centerX);
        this._shader.setUniform('u_centerY', this._centerY);
        this._shader.setUniform('u_speed', this._speed);
        this._shader.setUniform('u_density', this._density);
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        this._direction = value;
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

    get density() {
        return this._density;
    }

    set density(value) {
        this._density = value;
    }
}

export default P5AsciifySpiralGradient;