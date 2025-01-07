import p5 from 'p5';

import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';

import { generateCharacterSelectionShader, generateBrightnessSampleShader, generateColorSampleShader } from './shaders/shaderGenerators';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';
import brightnessSplitShader from './shaders/brightnessSplit.frag';
import vertexShader from '../../assets/shaders/vert/shader.vert';

export default class AccurateAsciiRenderer extends AsciiRenderer {
    private characterSelectionShader: p5.Shader;
    private brightnessSampleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private brightnessSplitShader: p5.Shader;
    private shader: p5.Shader;
    private brightnessSampleFramebuffer: p5.Framebuffer;
    private brightnessSplitFramebuffer: p5.Framebuffer;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions) {
        super(p5Instance, grid, characterSet, options);

        this.characterSelectionShader = this.p.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length));
        this.brightnessSampleShader = this.p.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.brightnessSplitShader = this.p.createShader(vertexShader, brightnessSplitShader);
        this.shader = this.p.createShader(vertexShader, asciiConversionShader);

        this.brightnessSampleFramebuffer = this.p.createFramebuffer({ 
            density: 1, 
            width: this.grid.cols, 
            height: this.grid.rows, 
            depthFormat: this.p.UNSIGNED_INT, 
            textureFiltering: this.p.NEAREST 
        });
        this.brightnessSplitFramebuffer = this.p.createFramebuffer({ 
            depthFormat: this.p.UNSIGNED_INT, 
            textureFiltering: this.p.NEAREST 
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.brightnessSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    resetShaders(): void {
        this.characterSelectionShader = this.p.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.asciiFontTextureAtlas.fontSize, this.characterSet.characters.length));
        this.brightnessSampleShader = this.p.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void {
        // Brightness sample pass
        this.brightnessSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.brightnessSampleShader);
        this.brightnessSampleShader.setUniform('u_inputImage', inputFramebuffer);
        this.brightnessSampleShader.setUniform('u_inputImageSize', [this.p.width, this.p.height]);
        this.brightnessSampleShader.setUniform('u_gridCols', this.grid.cols);
        this.brightnessSampleShader.setUniform('u_gridRows', this.grid.rows);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.brightnessSampleFramebuffer.end();

        // Brightness split pass
        this.brightnessSplitFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.brightnessSplitShader);
        this.brightnessSplitShader.setUniform('u_inputImage', inputFramebuffer);
        this.brightnessSplitShader.setUniform('u_brightnessTexture', this.brightnessSampleFramebuffer);
        this.brightnessSplitShader.setUniform('u_inputImageSize', [this.p.width, this.p.height]);
        this.brightnessSplitShader.setUniform('u_gridCols', this.grid.cols);
        this.brightnessSplitShader.setUniform('u_gridRows', this.grid.rows);
        this.brightnessSplitShader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.brightnessSplitFramebuffer.end();

        // Primary color sample pass
        this.primaryColorSampleFramebuffer.begin();
        if (this.options.characterColorMode === 1) {
            this.p.background(this.options.characterColor);
        } else {
            this.p.clear();
            this.p.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageSize', [this.p.width, this.p.height]);
            this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.colorSampleShader.setUniform('u_colorRank', 1);
            this.p.rect(0, 0, this.p.width, this.p.height);
        }
        this.primaryColorSampleFramebuffer.end();

        // Secondary color sample pass
        this.secondaryColorSampleFramebuffer.begin();
        if (this.options.backgroundColorMode === 1) {
            this.p.background(this.options.backgroundColor);
        } else {
            this.p.clear();
            this.p.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageSize', [this.p.width, this.p.height]);
            this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.colorSampleShader.setUniform('u_colorRank', 2);
            this.p.rect(0, 0, this.p.width, this.p.height);
        }
        this.secondaryColorSampleFramebuffer.end();

        // ASCII character pass
        this.asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.characterSelectionShader);
        this.characterSelectionShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.characterSelectionShader.setUniform('u_charsetCols', this.characterSet.asciiFontTextureAtlas.charsetCols);
        this.characterSelectionShader.setUniform('u_charsetRows', this.characterSet.asciiFontTextureAtlas.charsetRows);
        this.characterSelectionShader.setUniform('u_charPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.characterSelectionShader.setUniform('u_charPaletteSize', [this.characterSet.characterColorPalette.framebuffer.width, 1]);
        this.characterSelectionShader.setUniform('u_sketchTexture', this.brightnessSplitFramebuffer);
        this.characterSelectionShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.characterSelectionShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.asciiCharacterFramebuffer.end();

        // Final output pass
        this.outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.shader);
        this.shader.setUniform('u_layer', 1);
        this.shader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.shader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        if (!isFirstRenderer) {
            this.shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.getOutputFramebuffer());
        }
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p.radians(this.options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.outputFramebuffer.end();
    }
}