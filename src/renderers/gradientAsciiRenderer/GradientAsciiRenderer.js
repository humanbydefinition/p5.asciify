import AsciiRenderer from '../AsciiRenderer.js';

import grayscaleShader from '../../effects/grayscale/grayscale.frag';
import asciiShader from './shaders/asciiGradient.frag'

import colorSampleShader from './shaders/colorSample.frag';

import vertexShader from '../../assets/shaders/vert/shader.vert';

export default class GradientAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, asciiRenderer, gradientManager, options) {
        super(p5Instance, grid, characterSet, options);

        this.asciiRenderer = asciiRenderer;
        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p5.createShader(vertexShader, grayscaleShader);

        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);

        this.asciiShader = this.p5.createShader(vertexShader, asciiShader);

        this.grayscaleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.prevGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.nextGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        
        this.asciiCharacterFramebuffer = this.nextGradientFramebuffer;
        this.primaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.secondaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        
        this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.nextGradientFramebuffer.resize(this.grid.cols, this.grid.rows);

        this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    setAsciiRenderer(asciiRenderer) {
        this.asciiRenderer = asciiRenderer;
    }

    render(inputFramebuffer) {

        if (!this.options.enabled || this.gradientManager._gradients.length === 0) {
            if (this.asciiRenderer.options.enabled) {
                this.outputFramebuffer = this.asciiRenderer.getOutputFramebuffer();
            } else {
                this.outputFramebuffer = inputFramebuffer;
            }
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

                this.nextGradientFramebuffer.begin();
                this.p5.clear();
                this.p5.shader(gradient._shader);
                gradient.setUniforms(this.prevGradientFramebuffer, this.grayscaleFramebuffer);
                this.p5.rect(0, 0, this.grid.cols, this.grid.rows);
                this.nextGradientFramebuffer.end();

                // Swap framebuffers for the next pass
                [this.prevGradientFramebuffer, this.nextGradientFramebuffer] = [this.nextGradientFramebuffer, this.prevGradientFramebuffer];
            }
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

        this.outputFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiShader);
        this.asciiShader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.asciiShader.setUniform('u_characterTexture', this.characterSet.texture);
        this.asciiShader.setUniform('u_charsetCols', this.characterSet.charsetCols);
        this.asciiShader.setUniform('u_charsetRows', this.characterSet.charsetRows);
        this.asciiShader.setUniform('u_gradientTexture', this.prevGradientFramebuffer);
        this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
        this.asciiShader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiRenderer.getOutputFramebuffer());
        this.asciiShader.setUniform('u_brightnessEnabled', this.asciiRenderer.options.enabled);
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