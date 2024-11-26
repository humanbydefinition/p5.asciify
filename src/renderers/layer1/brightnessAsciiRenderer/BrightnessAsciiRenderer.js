import AsciiRenderer from '../../AsciiRenderer.js';

import vertexShader from '../../../assets/shaders/vert/shader.vert';
import asciiConversionShader from '../../_common_shaders/asciiConversion.frag';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

export default class BrightnessAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, options) {
        super(p5Instance, grid, characterSet, options);

        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p5.createShader(vertexShader, asciiCharacterShader);
        this.shader = this.p5.createShader(vertexShader, asciiConversionShader);
    }

    render(inputFramebuffer) {
        if (!this.options.enabled) {
            this.outputFramebuffer = inputFramebuffer;
            return;
        }

        this.primaryColorSampleFramebuffer.begin();
        if (this.options.characterColorMode === 1) {
            this.p5.background(this.options.characterColor);
        } else {
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
        }
        this.primaryColorSampleFramebuffer.end();

        this.secondaryColorSampleFramebuffer.begin();
        if (this.options.backgroundColorMode === 1) {
            this.p5.background(this.options.backgroundColor);
        } else {
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
        }
        this.secondaryColorSampleFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.asciiCharacterFramebuffer.end();

        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_layer', 1);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetCols', this.characterSet.asciiFontTextureAtlas.charsetCols);
        this.shader.setUniform('u_charsetRows', this.characterSet.asciiFontTextureAtlas.charsetRows);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
}