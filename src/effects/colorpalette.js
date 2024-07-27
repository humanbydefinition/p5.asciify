import P5AsciifyEffect from './effect.js';

class P5AsciifyColorPaletteEffect extends P5AsciifyEffect {
    constructor({ shader, palette, paletteBuffer }) {
        super("colorpalette", shader);
        this._palette = palette;
        this.paletteBuffer = paletteBuffer;
        this._paletteId = this.paletteBuffer.addPalette(this._palette);
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_colorPalette', this.paletteBuffer.texture);
        this._shader.setUniform('u_colorPaletteRow', this._paletteId);
        this._shader.setUniform('u_colorPaletteDimensions', [this.paletteBuffer.texture.width, this.paletteBuffer.texture.height]);
        this._shader.setUniform('u_colorPaletteLength', this._palette.length);
    }

    set palette(palette) {
        this._palette = palette;
        this.paletteBuffer.setPaletteColors(this._paletteId, this._palette);
    }
}

export default P5AsciifyColorPaletteEffect;