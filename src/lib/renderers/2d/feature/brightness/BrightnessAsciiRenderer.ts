import p5 from 'p5';

import { P5AsciifyAbstractFeatureRenderer2D } from '../AbstractFeatureRenderer2D';
import { P5AsciifyGrid } from '../../../../Grid';
import { P5AsciifyFontManager } from '../../../../FontManager';

import { BrightnessAsciiRendererOptions } from '../../../types';

import vertexShader from '../../../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import { errorHandler } from '../../../../errors';

/** 
 * Default configuration options for `"brightness"` ASCII renderer. 
 * 
 * If there are options not provided during the creation of the renderer, the default options will be used.
 */
export const BRIGHTNESS_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: true,
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: " .:-=+*%@#",
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
    characterColor: "#FFFFFF",
    /** Character color mode */
    characterColorMode: "sampled",
    /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
    backgroundColor: "#000000",
    /** Background color mode */
    backgroundColorMode: "fixed",
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
    /** Flip the ASCII characters horizontally */
    flipHorizontally: false,
    /** Flip the ASCII characters vertically */
    flipVertically: false,
    /** Range of brightness values to map to ASCII characters */
    brightnessRange: [0, 255] as [number, number],
};

/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export class P5AsciifyBrightnessRenderer extends P5AsciifyAbstractFeatureRenderer2D<BrightnessAsciiRendererOptions> {
    private colorSampleShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private colorSampleFramebuffer: p5.Framebuffer;

    /**
     * Creates a new `"brightness"` ASCII renderer instance.
     * @param p5Instance The p5 instance.
     * @param grid Grid object containing the relevant grid information.
     * @param fontManager The font texture atlas containing the ASCII characters texture.
     * @param options The options for the ASCII renderer.
     * @ignore
     */
    constructor(
        p5Instance: p5,
        captureFramebuffer: p5.Framebuffer | p5.Graphics,
        grid: P5AsciifyGrid,
        fontManager: P5AsciifyFontManager,
        options: BrightnessAsciiRendererOptions = BRIGHTNESS_DEFAULT_OPTIONS
    ) {
        super(p5Instance, captureFramebuffer, grid, fontManager, { ...BRIGHTNESS_DEFAULT_OPTIONS, ...options });

        this.colorSampleShader = this._p.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this._p.createShader(vertexShader, asciiCharacterShader);

        this.colorSampleFramebuffer = this._p.createFramebuffer({
            density: 1,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
    }

    resetShaders(): void { return; };

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.colorSampleFramebuffer.resize(this._grid.cols, this._grid.rows);
    }

    public update(newOptions: Partial<BrightnessAsciiRendererOptions>): void {
        super.update(newOptions);

        if (newOptions.brightnessRange !== undefined) {
            this.brightnessRange(newOptions.brightnessRange);
        }
    }

    /**
     * Sets the brightness range for the ASCII character mapping.
     * This range defines the minimum and maximum brightness values that will be mapped to ASCII characters.
     * 
     * If a pixel's brightness is not within the range, the corresponding cell will be left transparent,
     * rendering whatever is behind it, like the canvas bit or the set background color.
     * 
     * @example
     * ```javascript
     * function setupAsciify() {
     *      // Set the brightness range for the renderer
     *      p5asciify.renderers().get("brightness").brightnessRange([50, 200]);
     *  }
     * ```
     * 
     * @param range A tuple [min, max] representing the brightness range.
     * @throws If the provided range is not an array of two numbers, or if the numbers are not within the valid range (0-255).
     */
    public brightnessRange(range: [number, number]): void {

        // Ensure we have exactly 2 elements and they are numbers
        const isValidArray = errorHandler.validate(
            Array.isArray(range) && range.length === 2 &&
            typeof range[0] === 'number' && typeof range[1] === 'number' &&
            !isNaN(range[0]) && !isNaN(range[1]),
            'Brightness range must be an array with exactly two numbers.',
            { providedValue: range, method: 'brightnessRange' }
        );

        if (!isValidArray) {
            return;
        }

        const [start, end] = range;

        const isValidRange = errorHandler.validate(
            start >= 0 && start <= 255 && end >= 0 && end <= 255,
            'Brightness values must be between 0 and 255.',
            { providedValue: range, method: 'brightnessRange' }
        );

        const isValidOrder = errorHandler.validate(
            start <= end,
            'Start value must be less than or equal to the end value.',
            { providedValue: range, method: 'brightnessRange' }
        );

        if (!isValidRange || !isValidOrder) {
            return; // If validation fails, do not update the brightness range
        }

        this._options.brightnessRange = [start, end];
    }

    render(): void {
        this.colorSampleFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', this._captureFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this._p.rect(0, 0, this.colorSampleFramebuffer.width, this.colorSampleFramebuffer.height);
        this.colorSampleFramebuffer.end();

        this._primaryColorFramebuffer.begin();
        if (this._options.characterColorMode === 1) {
            this._p.background(this._options.characterColor as p5.Color);
        } else {
            this._p.clear();
            this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -(this._grid.rows) / 2, this._grid.cols, this._grid.rows);
        }
        this._primaryColorFramebuffer.end();

        this._secondaryColorFramebuffer.begin();
        if (this._options.backgroundColorMode === 1) {
            this._p.background(this._options.backgroundColor as p5.Color);
        } else {
            this._p.clear();
            this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -(this._grid.rows) / 2, this._grid.cols, this._grid.rows);
        }
        this._secondaryColorFramebuffer.end();

        this._transformFramebuffer.begin();
        this._p.background(this._options.invertMode ? 255 : 0, this._options.flipHorizontally ? 255 : 0, this._options.flipVertically ? 255 : 0);
        this._transformFramebuffer.end();

        this._rotationFramebuffer.begin();
        this._p.background(this._options.rotationAngle as p5.Color);
        this._rotationFramebuffer.end();

        this._characterFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_textureSize', [this._grid.cols, this._grid.rows]);
        this.asciiCharacterShader.setUniform('u_colorSampleFramebuffer', this.colorSampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteTexture', this._characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteSize', [this._characterColorPalette.colors.length, 1]);
        this.asciiCharacterShader.setUniform('u_brightnessRange', this._options.brightnessRange!);
        this._p.rect(0, 0, this._characterFramebuffer.width, this._characterFramebuffer.height);
        this._characterFramebuffer.end();
    }
}