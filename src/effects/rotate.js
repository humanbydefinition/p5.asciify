class P5AsciifyRotateEffect extends P5AsciifyEffect {
    constructor({ shader, angle }) {
        super("rotate", shader);
        this._angle = angle;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    set angle(angle) {
        this._angle = angle;
    }

    get angle() {
        return this._angle;
    }
}