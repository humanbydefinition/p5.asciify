import AsciiRenderer from '../AsciiRenderer.js';

import grayscaleShader from '../../effects/grayscale/grayscale.frag';
import asciiShader from './shaders/asciiGradient.frag'

import vertexShader from '../../assets/shaders/vert/shader.vert';

export default class GradientAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, asciiRenderer, gradientManager, options) {
        super(p5Instance, grid, characterSet, options);

        this.asciiRenderer = asciiRenderer;
        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p5.createShader(vertexShader, grayscaleShader);
        this.asciiShader = this.p5.createShader(vertexShader, asciiShader);

        this.grayscaleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.prevGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.nextGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        
        this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.nextGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer) {

        this.grayscaleFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.grayscaleShader);
        this.grayscaleShader.setUniform('u_image', inputFramebuffer);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.grayscaleFramebuffer.end();

        this.nextGradientFramebuffer.begin();
        this.p5.clear();
        this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.nextGradientFramebuffer.end();

        this.prevGradientFramebuffer.begin();
        this.p5.clear();
        this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.prevGradientFramebuffer.end();

        for (let i = 0; i < this.gradientManager._gradients.length; i++) {
            const gradient = this.gradientManager._gradients[i];

            this.prevGradientFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(gradient._shader);
            gradient.setUniforms(this.nextGradientFramebuffer, this.grayscaleFramebuffer);
            this.p5.rect(0, 0, this.grid.cols, this.grid.rows);
            this.prevGradientFramebuffer.end();

            // Swap framebuffers for the next pass
            [this.nextGradientFramebuffer, this.prevGradientFramebuffer] = [this.prevGradientFramebuffer, this.nextGradientFramebuffer];
        }

        this.outputFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiShader);
        this.asciiShader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.asciiShader.setUniform('u_characterTexture', this.characterSet.texture);
        this.asciiShader.setUniform('u_charsetCols', this.characterSet.charsetCols);
        this.asciiShader.setUniform('u_charsetRows', this.characterSet.charsetRows);
        this.asciiShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.asciiShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.asciiShader.setUniform('u_gradientTexture', this.nextGradientFramebuffer);
        this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
        this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiRenderer.getOutputFramebuffer());
        this.asciiShader.setUniform('u_brightnessEnabled', this.asciiRenderer.options.enabled);
        this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiShader.setUniform('u_characterColor', this.options.characterColor);
        this.asciiShader.setUniform('u_characterColorMode', this.options.characterColorMode);
        this.asciiShader.setUniform('u_backgroundColor', this.options.backgroundColor);
        this.asciiShader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
        this.asciiShader.setUniform('u_invertMode', this.options.invertMode);
        this.asciiShader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }

    getOutputFramebuffer() {
        return this.outputFramebuffer;
    }
}