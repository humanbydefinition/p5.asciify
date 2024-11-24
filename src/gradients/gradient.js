

class P5AsciifyGradient {
    constructor(type, shader, brightnessStart, brightnessEnd, colorPaletteManager, palette) {
        this._type = type;
        this._shader = shader;

        // map brightness start from 0-255 to 0-1
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;
        this._colorPaletteManager = colorPaletteManager;
        this._palette = palette;

        this._enabled = true;

        this._onPaletteChangeCallback = null;
    }

    registerPaletteChangeCallback(callback) {
        this._onPaletteChangeCallback = callback;
    }

    setup(shader, palette) {
        this._shader = shader;
        this._palette = palette;
        this._colorPalette = this._colorPaletteManager.addPalette(this._palette);
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        this._shader.setUniform("textureID", framebuffer);
        this._shader.setUniform("originalTextureID", referenceFramebuffer);
        this._shader.setUniform("gradientTexture", this._colorPaletteManager.texture);
        this._shader.setUniform("gradientTextureRow", this._colorPalette.rowIndex);
        this._shader.setUniform("gradientTextureDimensions", [this._colorPaletteManager.texture.width, this._colorPaletteManager.texture.height]);
        this._shader.setUniform("gradientTextureLength", this._palette.length);
        this._shader.setUniform("u_brightnessStart", this._brightnessStart);
        this._shader.setUniform("u_brightnessEnd", this._brightnessEnd);
        this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
        this._shader.setUniform("frameCount", frameCount);
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