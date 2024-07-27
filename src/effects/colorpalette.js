import P5AsciifyEffect from './effect.js';

class P5AsciifyColorPaletteEffect extends P5AsciifyEffect {
    constructor({ shader, palette }) {
        super("colorpalette", shader);
        this._palette = palette;
        this._paletteId = P5Asciify.colorPalette.addPalette(this._palette);
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_colorPalette', P5Asciify.colorPalette.texture);
        this._shader.setUniform('u_colorPaletteRow', this._paletteId);
        this._shader.setUniform('u_colorPaletteDimensions', [P5Asciify.colorPalette.texture.width, P5Asciify.colorPalette.texture.height]);
        this._shader.setUniform('u_colorPaletteLength', this._palette.length);
    }

    set palette(palette) {
        this._palette = palette;
        P5Asciify.colorPalette.setPaletteColors(this._paletteId, this._palette);
    }
}

export default P5AsciifyColorPaletteEffect;