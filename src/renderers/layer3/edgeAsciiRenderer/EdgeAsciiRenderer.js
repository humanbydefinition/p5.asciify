import AsciiRenderer from '../../AsciiRenderer.js';
import vertexShader from '../../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import asciiConversionShader from '../../_common_shaders/asciiConversion.frag';

import sobelShader from './shaders/sobel.frag';

import { generateSampleShader } from './shaders/shaderGenerators.js';

export default class EdgeAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, options) {
        super(p5Instance, grid, characterSet, options);

        this.sobelShader = this.p5.createShader(vertexShader, sobelShader);
        this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p5.createShader(vertexShader, asciiCharacterShader);
        this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

        this.sobelFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.sampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        super.resizeFramebuffers();
        this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    resetShaders() {
        this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
    }

    render(inputFramebuffer, previousAsciiRenderer) {

        if (!this.options.enabled) {
            if (previousAsciiRenderer.options.enabled) {
                this.outputFramebuffer = previousAsciiRenderer.getOutputFramebuffer();
            } else {
                this.outputFramebuffer = inputFramebuffer;
            }

            this.asciiCharacterFramebuffer.begin();
            this.p5.clear();
            this.p5.image(previousAsciiRenderer.asciiCharacterFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.asciiCharacterFramebuffer.end();

            this.primaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.image(previousAsciiRenderer.primaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.primaryColorSampleFramebuffer.end();

            this.secondaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.image(previousAsciiRenderer.secondaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.secondaryColorSampleFramebuffer.end();

            return;
        }

        // Apply Sobel shader for edge detection
        this.sobelFramebuffer.begin();
        this.p5.shader(this.sobelShader);
        this.sobelShader.setUniform('u_texture', inputFramebuffer);
        this.sobelShader.setUniform('u_textureSize', [this.p5.width, this.p5.height]);
        this.sobelShader.setUniform('u_threshold', this.options.sobelThreshold);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.sobelFramebuffer.end();

        // Apply sample shader
        this.sampleFramebuffer.begin();
        this.p5.shader(this.sampleShader);
        this.sampleShader.setUniform('u_imageSize', [this.p5.width, this.p5.height]);
        this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
        this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.sampleShader.setUniform('u_threshold', this.options.sampleThreshold);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.sampleFramebuffer.end();

        this.primaryColorSampleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.characterColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.characterColor._array);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.primaryColorSampleFramebuffer.end();

        this.secondaryColorSampleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.secondaryColorSampleFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_previousAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.asciiCharacterFramebuffer.end();

        // Render ASCII using the edge shader
        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_layer', 3);
        this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetCols', this.characterSet.asciiFontTextureAtlas.charsetCols);
        this.shader.setUniform('u_charsetRows', this.characterSet.asciiFontTextureAtlas.charsetRows);
        this.shader.setUniform('u_asciiBrightnessTexture', previousAsciiRenderer.getOutputFramebuffer());
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_edgesTexture', this.sampleFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_brightnessEnabled', previousAsciiRenderer.options.enabled);
        this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
}
