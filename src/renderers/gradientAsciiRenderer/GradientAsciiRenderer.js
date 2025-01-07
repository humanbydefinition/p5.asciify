import AsciiRenderer from '../AsciiRenderer.js';

import grayscaleShader from './shaders/grayscale.frag';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';

import colorSampleShader from './shaders/colorSample.frag';

import vertexShader from '../../assets/shaders/vert/shader.vert';

export default class GradientAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, gradientManager, options) {
        super(p5Instance, grid, characterSet, options);

        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p.createShader(vertexShader, grayscaleShader);

        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);

        this.asciiShader = this.p.createShader(vertexShader, asciiConversionShader);

        this.grayscaleFramebuffer = this.p.createFramebuffer({ density: 1, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });
        this.prevAsciiCharacterFramebuffer = this.p.createFramebuffer({ density: 1, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });
    }

    resizeFramebuffers() {
        super.resizeFramebuffers();
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevAsciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer, previousAsciiRenderer, isFirstRenderer) {

        this.grayscaleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.grayscaleShader);
        this.grayscaleShader.setUniform('u_image', inputFramebuffer);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.grayscaleFramebuffer.end();

        this.prevAsciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.prevAsciiCharacterFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.asciiCharacterFramebuffer.end();

        for (let i = 0; i < this.gradientManager._gradients.length; i++) {
            const gradient = this.gradientManager._gradients[i];

            if (gradient.enabled) {
                [this.prevAsciiCharacterFramebuffer, this.asciiCharacterFramebuffer] = [this.asciiCharacterFramebuffer, this.prevAsciiCharacterFramebuffer];

                this.asciiCharacterFramebuffer.begin();
                this.p.clear();
                this.p.shader(gradient._shader);
                gradient.setUniforms(this.p, this.prevAsciiCharacterFramebuffer, this.grayscaleFramebuffer);
                this.p.rect(0, 0, this.grid.cols, this.grid.rows);
                this.asciiCharacterFramebuffer.end();
            }
        }

        this.primaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
        this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.characterColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.characterColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.primaryColorSampleFramebuffer.end();

        this.secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.secondaryColorSampleFramebuffer.end();

        this.outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiShader);
        this.asciiShader.setUniform('u_layer', 2);
        this.asciiShader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.asciiShader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this.asciiShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.asciiShader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
        this.asciiShader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        if (!isFirstRenderer) {
            this.shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.getOutputFramebuffer());
        }
        this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiShader.setUniform('u_invertMode', this.options.invertMode);
        this.asciiShader.setUniform('u_rotationAngle', this.p.radians(this.options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.outputFramebuffer.end();
    }
}