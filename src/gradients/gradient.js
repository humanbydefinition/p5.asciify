

class P5AsciifyGradient {
    constructor(type, shader, shaderActive, brightnessStart, brightnessEnd, colorPalette, palette) {
        this._type = type;
        this._shader = shader;
        this._shaderActive = shaderActive;

        // map brightness start from 0-255 to 0-1
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;
        this._colorPalette = colorPalette;
        this._palette = palette;

        this._onPaletteChangeCallback = null;
    }

    registerPaletteChangeCallback(callback) {
        this._onPaletteChangeCallback = callback;
    }

    setup(shader, palette) {
        this._shader = shader;
        this._palette = palette;
        this.paletteId = this._colorPalette.addPalette(this._palette);
    }

    setUniforms(framebuffer, referenceFramebuffer) {
        this._shader.setUniform("textureID", framebuffer);
        this._shader.setUniform("originalTextureID", referenceFramebuffer);
        this._shader.setUniform("gradientTexture", this._colorPalette.texture);
        this._shader.setUniform("gradientTextureRow", this._colorPalette.getPaletteRow(this.paletteId));
        this._shader.setUniform("gradientTextureDimensions", [this._colorPalette.texture.width, this._colorPalette.texture.height]);
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
}

export default P5AsciifyGradient;