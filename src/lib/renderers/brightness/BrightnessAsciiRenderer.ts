import p5 from 'p5';

import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';

import { AsciiRendererOptions } from '../types';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

/** Default configuration options for brightness-based ASCII renderer */
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

    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas,  options: AsciiRendererOptions = BRIGHTNESS_DEFAULT_OPTIONS) {
        const mergedOptions = { ...BRIGHTNESS_DEFAULT_OPTIONS, ...options };
        super(p5Instance, grid, fontTextureAtlas, mergedOptions);

        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p.createShader(vertexShader, asciiCharacterShader);

        this.colorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.colorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void {
        this.colorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.colorSampleFramebuffer.end();

        this._primaryColorSampleFramebuffer.begin();
        if (this._options.characterColorMode === 1) {
            this.p.background(this._options.characterColor as p5.Color);
        } else {
            this.p.clear();
            this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
        }
        this._primaryColorSampleFramebuffer.end();

        this._secondaryColorSampleFramebuffer.begin();
        if (this._options.backgroundColorMode === 1) {
            this.p.background(this._options.backgroundColor as p5.Color);
        } else {
            this.p.clear();
            this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
        }
        this._secondaryColorSampleFramebuffer.end();

        this._inversionFramebuffer.begin();
        this.p.clear();

        if (this._options.invertMode) {
            this.p.background(255);
        } else {
            this.p.background(0);
        }
        this._inversionFramebuffer.end();

        this._asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_textureSize', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_colorSampleFramebuffer', this.colorSampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteTexture', this.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteSize', [this.characterColorPalette.colors.length, 1]);

        this.p.rect(0, 0, this.p.width, this.p.height);
        this._asciiCharacterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}