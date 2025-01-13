import p5 from 'p5';

import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

/**
 * ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.
 */
export default class BrightnessAsciiRenderer extends AsciiRenderer {
    private colorSampleShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private colorSampleFramebuffer: p5.Framebuffer;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions) {
        super(p5Instance, grid, characterSet, options);

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

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void {
        this.colorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.colorSampleFramebuffer.end();

        this._primaryColorSampleFramebuffer.begin();
        if (this._options.characterColorMode === 1) {
            this.p.background(this._options.characterColor);
        } else {
            this.p.clear();
            this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
        }
        this._primaryColorSampleFramebuffer.end();

        this._secondaryColorSampleFramebuffer.begin();
        if (this._options.backgroundColorMode === 1) {
            this.p.background(this._options.backgroundColor);
        } else {
            this.p.clear();
            this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
        }
        this._secondaryColorSampleFramebuffer.end();

        this._asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_textureSize', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_colorSampleFramebuffer', this.colorSampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteSize', [this.characterSet.characterColorPalette.colors.length, 1]);

        this.p.rect(0, 0, this.p.width, this.p.height);
        this._asciiCharacterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}