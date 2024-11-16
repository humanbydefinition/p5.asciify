import P5AsciifyGradient from '../gradient.js';

class P5AsciifyRadialGradient extends P5AsciifyGradient {

    constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, centerX, centerY, radius}) {
        super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

        this._direction = direction;
        this._centerX = centerX;
        this._centerY = centerY;
        this._radius = radius;
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this._direction);
        this._shader.setUniform('u_centerX', this._centerX);
        this._shader.setUniform('u_centerY', this._centerY);
        this._shader.setUniform('u_radius', this._radius);
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

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }
}

export default P5AsciifyRadialGradient;