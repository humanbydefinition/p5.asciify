import AsciiRenderer from '../../AsciiRenderer.js';

import grayscaleShader from './shaders/grayscale.frag';
import asciiConversionShader from '../../_common_shaders/asciiConversion.frag';

import colorSampleShader from './shaders/colorSample.frag';

import vertexShader from '../../../assets/shaders/vert/shader.vert';

export default class GradientAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, gradientManager, options) {
        super(p5Instance, grid, characterSet, options);

        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p5.createShader(vertexShader, grayscaleShader);

        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);

        this.asciiShader = this.p5.createShader(vertexShader, asciiConversionShader);

        this.grayscaleFramebuffer = this.p5.createFramebuffer({ density: 1, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.prevAsciiCharacterFramebuffer = this.p5.createFramebuffer({ density: 1, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        super.resizeFramebuffers();
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevAsciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer, previousAsciiRenderer) {

        this.grayscaleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.grayscaleShader);
        this.grayscaleShader.setUniform('u_image', inputFramebuffer);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.grayscaleFramebuffer.end();

        this.prevAsciiCharacterFramebuffer.begin();
        this.p5.clear();
        this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.prevAsciiCharacterFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p5.clear();
        this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.asciiCharacterFramebuffer.end();

        for (let i = 0; i < this.gradientManager._gradients.length; i++) {
            const gradient = this.gradientManager._gradients[i];

            if (gradient.enabled) {
                [this.prevAsciiCharacterFramebuffer, this.asciiCharacterFramebuffer] = [this.asciiCharacterFramebuffer, this.prevAsciiCharacterFramebuffer];

                this.asciiCharacterFramebuffer.begin();
                this.p5.clear();
                this.p5.shader(gradient._shader);
                gradient.setUniforms(this.p5, this.prevAsciiCharacterFramebuffer, this.grayscaleFramebuffer);
                this.p5.rect(0, 0, this.grid.cols, this.grid.rows);
                this.asciiCharacterFramebuffer.end();
            }
        }

        this.primaryColorSampleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
        this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
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
        this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.secondaryColorSampleFramebuffer.end();

        this.outputFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiShader);
        this.asciiShader.setUniform('u_layer', 2);
        this.asciiShader.setUniform('u_pixelRatio', this.p5.pixelDensity());
        this.asciiShader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.asciiShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.asciiShader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
        this.asciiShader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.asciiShader.setUniform('u_asciiBrightnessTexture', previousAsciiRenderer.getOutputFramebuffer());
        this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiShader.setUniform('u_invertMode', this.options.invertMode);
        this.asciiShader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }

    getOutputFramebuffer() {
        return this.outputFramebuffer;
    }
}