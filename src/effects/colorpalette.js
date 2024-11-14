import P5AsciifyEffect from './effect.js';
import P5AsciifyColorPalette from '../colorpalette.js';

/**
 * @class P5AsciifyColorPaletteEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a color palette effect for the P5Asciify library.
 * Applies a color palette to the given framebuffer.
 */
class P5AsciifyColorPaletteEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyColorPaletteEffect.
     * @param {Object} options - The options for the color palette effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {Array} options.palette - The array of colors for the palette.
     * @param {P5AsciifyColorPalette} options.paletteBuffer - The buffer to store the color palette.
     */
    constructor({ shader, palette, colorPalette }) {
        super("colorpalette", shader);
        this._palette = palette;
        this.colorPalette = colorPalette;
    }

    setup() {
        this._paletteId = this.colorPalette.addPalette(this._palette);
    }

    /**
     * Sets the shader uniforms for the color palette effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_resolution', [framebuffer.width, framebuffer.height]);
        this._shader.setUniform('u_colorPalette', this.colorPalette.texture);
        this._shader.setUniform('u_colorPaletteRow', this.colorPalette.getPaletteRow(this._paletteId));
        this._shader.setUniform('u_colorPaletteDimensions', [this.colorPalette.texture.width, this.colorPalette.texture.height]);
        this._shader.setUniform('u_colorPaletteLength', this._palette.length);
    }

    /**
     * Sets the color palette.
     * @param {Array} palette - The new array of colors for the palette.
     */
    set palette(palette) {
        this._palette = palette;
        this.colorPalette.setPaletteColors(this._paletteId, this._palette);
    }

    /**
     * Gets the current color palette.
     * @returns {Array} The current array of colors for the palette.
     */
    get palette() {
        return this._palette;
    }
}

export default P5AsciifyColorPaletteEffect;