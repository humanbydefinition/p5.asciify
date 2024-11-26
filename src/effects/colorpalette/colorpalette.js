import P5AsciifyEffect from '../effect.js';
import  P5AsciifyColorPalette  from '../../colorpalette.js';

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
    constructor({ shader, palette }) {
        super("colorpalette", shader);
        this._colors = palette;
    }

    setup(p5Instance) {
        this._palette = new P5AsciifyColorPalette(this._colors);
        this._palette.setup(p5Instance);
    }

    /**
     * Sets the shader uniforms for the color palette effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_resolution', [framebuffer.width, framebuffer.height]);
        this._shader.setUniform('u_colorPalette', this._palette.framebuffer);
        this._shader.setUniform('u_colorPaletteDimensions', [this._palette.framebuffer.width, 1]);
        this._shader.setUniform('u_colorPaletteLength', this._palette.length);
    }

    /**
     * Sets the color palette.
     * @param {Array} palette - The new array of colors for the palette.
     */
    set palette(palette) {
        this._colors = palette;
        this._palette.setColors(this._colors);
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