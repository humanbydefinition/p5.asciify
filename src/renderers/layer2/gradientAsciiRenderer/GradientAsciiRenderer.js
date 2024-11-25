import AsciiRenderer from '../../AsciiRenderer.js';

import grayscaleShader from '../../../effects/grayscale/grayscale.frag';
import asciiShader from './shaders/asciiGradient.frag'

import colorSampleShader from './shaders/colorSample.frag';

import vertexShader from '../../../assets/shaders/vert/shader.vert';

export default class GradientAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, gradientManager, options) {
        super(p5Instance, grid, characterSet, options);

        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p5.createShader(vertexShader, grayscaleShader);

        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);

        this.asciiShader = this.p5.createShader(vertexShader, asciiShader);

        this.grayscaleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.prevGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.nextGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        
        this.asciiCharacterFramebuffer = this.nextGradientFramebuffer;
    }

    resizeFramebuffers() {
        super.resizeFramebuffers();
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.nextGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer, previousAsciiRenderer) {

        if (!this.options.enabled || this.gradientManager._gradients.length === 0) {
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

        this.grayscaleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.grayscaleShader);
        this.grayscaleShader.setUniform('u_image', inputFramebuffer);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.grayscaleFramebuffer.end();

        this.prevGradientFramebuffer.begin();
        this.p5.clear();
        this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.prevGradientFramebuffer.end();

        this.nextGradientFramebuffer.begin();
        this.p5.clear();
        this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.nextGradientFramebuffer.end();

        for (let i = 0; i < this.gradientManager._gradients.length; i++) {
            const gradient = this.gradientManager._gradients[i];

            if (gradient.enabled) {
                [this.prevGradientFramebuffer, this.nextGradientFramebuffer] = [this.nextGradientFramebuffer, this.prevGradientFramebuffer];

                this.nextGradientFramebuffer.begin();
                this.p5.clear();
                this.p5.shader(gradient._shader);
                gradient.setUniforms(this.prevGradientFramebuffer, this.grayscaleFramebuffer);
                this.p5.rect(0, 0, this.grid.cols, this.grid.rows);
                this.nextGradientFramebuffer.end();
            }
        }

        this.primaryColorSampleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.nextGradientFramebuffer);
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
        this.colorSampleShader.setUniform('u_sampleTexture', this.nextGradientFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.secondaryColorSampleFramebuffer.end();

        this.outputFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiShader);
        this.asciiShader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.asciiShader.setUniform('u_characterTexture', this.characterSet.texture);
        this.asciiShader.setUniform('u_charsetCols', this.characterSet.charsetCols);
        this.asciiShader.setUniform('u_charsetRows', this.characterSet.charsetRows);
        this.asciiShader.setUniform('u_gradientTexture', this.nextGradientFramebuffer);
        this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
        this.asciiShader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_asciiBrightnessTexture', previousAsciiRenderer.getOutputFramebuffer());
        this.asciiShader.setUniform('u_brightnessEnabled', previousAsciiRenderer.options.enabled);
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