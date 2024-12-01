import AsciiRenderer from '../../AsciiRenderer.js';

import { generateCharacterSelectionShader, generateBrightnessSampleShader, generateColorSampleShader } from './shaders/shaderGenerators.js';

import asciiConversionShader from '../../_common_shaders/asciiConversion.frag';
import brightnessSplitShader from './shaders/brightnessSplit.frag';

import vertexShader from '../../../assets/shaders/vert/shader.vert';

export default class AccurateAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, options) {
        super(p5Instance, grid, characterSet, options);

        this.characterSelectionShader = this.p5.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length));
        this.brightnessSampleShader = this.p5.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p5.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.brightnessSplitShader = this.p5.createShader(vertexShader, brightnessSplitShader);
        this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

        this.brightnessSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.brightnessSplitFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        super.resizeFramebuffers();
        this.brightnessSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    resetShaders() {
        this.characterSelectionShader = this.p5.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length));
        this.brightnessSampleShader = this.p5.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p5.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
    }

    render(inputFramebuffer) {

        if (!this.options.enabled) {
            this.outputFramebuffer = inputFramebuffer;
            return;
        }

        this.brightnessSampleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.brightnessSampleShader);
        this.brightnessSampleShader.setUniform('u_inputImage', inputFramebuffer);
        this.brightnessSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
        this.brightnessSampleShader.setUniform('u_gridCols', this.grid.cols);
        this.brightnessSampleShader.setUniform('u_gridRows', this.grid.rows);
        this.brightnessSampleShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.brightnessSampleFramebuffer.end();

        this.brightnessSplitFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.brightnessSplitShader);
        this.brightnessSplitShader.setUniform('u_inputImage', inputFramebuffer);
        this.brightnessSplitShader.setUniform('u_brightnessTexture', this.brightnessSampleFramebuffer);
        this.brightnessSplitShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
        this.brightnessSplitShader.setUniform('u_gridCols', this.grid.cols);
        this.brightnessSplitShader.setUniform('u_gridRows', this.grid.rows);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.brightnessSplitFramebuffer.end();

        this.primaryColorSampleFramebuffer.begin();
        if (this.options.characterColorMode === 1) {
            this.p5.background(this.options.characterColor);
        } else {
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.colorSampleShader.setUniform('u_colorRank', 1);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
        }
        this.primaryColorSampleFramebuffer.end();

        this.secondaryColorSampleFramebuffer.begin();
        if (this.options.backgroundColorMode === 1) {
            this.p5.background(this.options.backgroundColor);
        } else {
            this.p5.clear();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.colorSampleShader.setUniform('u_colorRank', 2);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
        }
        this.secondaryColorSampleFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.characterSelectionShader);
        this.characterSelectionShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.characterSelectionShader.setUniform('u_charsetCols', this.characterSet.asciiFontTextureAtlas.charsetCols);
        this.characterSelectionShader.setUniform('u_charsetRows', this.characterSet.asciiFontTextureAtlas.charsetRows);
        this.characterSelectionShader.setUniform('u_sketchTexture', this.brightnessSplitFramebuffer);
        this.characterSelectionShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.characterSelectionShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.asciiCharacterFramebuffer.end();

        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_layer', 1);
        this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetCols', this.characterSet.asciiFontTextureAtlas.charsetCols);
        this.shader.setUniform('u_charsetRows', this.characterSet.asciiFontTextureAtlas.charsetRows);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width * this.p5.pixelDensity(), this.grid.height * this.p5.pixelDensity()]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX * this.p5.pixelDensity(), this.grid.offsetY * this.p5.pixelDensity()]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
};