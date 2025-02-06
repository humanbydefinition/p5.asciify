import p5 from 'p5';

import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';

import { AsciiRendererOptions } from '../types';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from '../_common_shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

/** Default configuration options for `"brightness"` ASCII renderer */
export const BRIGHTNESS_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: true,
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: "0123456789",
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
};

/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export class P5AsciifyBrightnessRenderer extends P5AsciifyRenderer {
    private colorSampleShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private colorSampleFramebuffer: p5.Framebuffer;

    /**
     * Creates a new `"brightness"` ASCII renderer instance.
     * 
     * @remarks
     * This constructor is meant for internal use by the `p5.asciify` library.
     * 
     * To create renderers, use `p5asciify.renderers().add("name", "brightness", { enabled: true });`.
     * This will also return an instance of the renderer, which can be used to modify the renderer's properties.
     * Additionally, the renderer will also be added to the end of the rendering pipeline automatically.
     * 
     * @param p5Instance The p5 instance.
     * @param grid Grid object containing the relevant grid information.
     * @param fontTextureAtlas The font texture atlas containing the ASCII characters texture.
     * @param options The options for the ASCII renderer.
     */
    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options: AsciiRendererOptions = BRIGHTNESS_DEFAULT_OPTIONS) {
        const mergedOptions = { ...BRIGHTNESS_DEFAULT_OPTIONS, ...options };
        super(p5Instance, grid, fontTextureAtlas, mergedOptions);

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

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.colorSampleFramebuffer.resize(this._grid.cols, this._grid.rows);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void {
        this.colorSampleFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this.colorSampleShader.setUniform('u_shaderType', 0);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this.colorSampleFramebuffer.end();

        this._primaryColorFramebuffer.begin();
        if (this._options.characterColorMode === 1) {
            this._p.background(this._options.characterColor as p5.Color);
        } else {
            this._p.clear();
            this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows);
        }
        this._primaryColorFramebuffer.end();

        this._secondaryColorFramebuffer.begin();
        if (this._options.backgroundColorMode === 1) {
            this._p.background(this._options.backgroundColor as p5.Color);
        } else {
            this._p.clear();
            this._p.image(this.colorSampleFramebuffer, -this._grid.cols / 2, -this._grid.rows / 2, this._grid.cols, this._grid.rows);
        }
        this._secondaryColorFramebuffer.end();

        this._inversionFramebuffer.begin();
        this._p.clear();

        if (this._options.invertMode) {
            this._p.background(255);
        } else {
            this._p.background(0);
        }
        this._inversionFramebuffer.end();

        this._rotationFramebuffer.begin();
        this._p.clear();
        this._p.background(this._options.rotationAngle as p5.Color);
        this._rotationFramebuffer.end();

        this._characterFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_textureSize', [this._grid.cols, this._grid.rows]);
        this.asciiCharacterShader.setUniform('u_colorSampleFramebuffer', this.colorSampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteTexture', this._characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteSize', [this._characterColorPalette.colors.length, 1]);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._characterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}