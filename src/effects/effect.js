class P5AsciifyEffect {
    constructor(name, shader) {
        this._name = name;
        this._shader = shader;
        this._enabled = true;
    }

    setUniforms(framebuffer) {
        this._shader.setUniform('u_image', framebuffer);
    }

    get shader() {
        return this._shader;
    }

    set shader(shader) {
        this._shader = shader;
    }

    get name() {
        return this._name;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(enabled) {
        this._enabled = enabled;
    }
}