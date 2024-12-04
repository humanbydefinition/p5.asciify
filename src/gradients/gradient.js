import P5AsciifyColorPalette from "../colorpalette.js";

class P5AsciifyGradient {
    constructor(type, shader, brightnessStart, brightnessEnd, characters) {
        this._type = type;
        this._shader = shader;

        // map brightness start from 0-255 to 0-1
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;

        this._characters = characters;

        this._enabled = true;

        this._onPaletteChangeCallback = null;
    }

    registerPaletteChangeCallback(callback) {
        this._onPaletteChangeCallback = callback;
    }

    setup(p5Instance, shader, colors) {
        this._shader = shader;
        this._palette = new P5AsciifyColorPalette(colors);
        this._palette.setup(p5Instance);
    }

    setUniforms(p5, framebuffer, referenceFramebuffer) {
        this._shader.setUniform("textureID", framebuffer);
        this._shader.setUniform("originalTextureID", referenceFramebuffer);
        this._shader.setUniform("gradientTexture", this._palette.framebuffer);
        this._shader.setUniform("gradientTextureDimensions", [this._palette.framebuffer.width, 1]);
        this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
        this._shader.setUniform("frameCount", p5.frameCount);
        this._shader.setUniform("u_pixelRatio", 1);
    }

    set palette(value) {
        if (this._onPaletteChangeCallback) {
            this._onPaletteChangeCallback(this, value);
        }
    }

    get type() {
        return this._type;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    get brightnessStart() {
        return this._brightnessStart;
    }

    set brightnessStart(value) {
        this._brightnessStart = value;
    }

    get brightnessEnd() {
        return this._brightnessEnd;
    }

    set brightnessEnd(value) {
        this._brightnessEnd = value;
    }
}

export default P5AsciifyGradient;