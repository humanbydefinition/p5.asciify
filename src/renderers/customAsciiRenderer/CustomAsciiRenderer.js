// renderers/BrightnessAsciiRenderer.js
import AsciiRenderer from '../AsciiRenderer.js';
import vertexShader from '../../assets/shaders/vert/shader.vert';
import asciiBrightnessShader from './shaders/asciiBrightness.frag';

export default class CustomAsciiRenderer extends AsciiRenderer {
    
    constructor(p5Instance, grid, characterSet, primaryColorSampleFramebuffer, secondaryColorFrameBuffer, asciiCharacterFramebuffer, options) {
        super(p5Instance, grid, characterSet, options);

        this.shader = this.p5.createShader(vertexShader, asciiBrightnessShader);

        this.primaryColorSampleFramebuffer = primaryColorSampleFramebuffer;
        this.secondaryColorSampleFramebuffer = secondaryColorFrameBuffer;
        this.asciiCharacterFramebuffer = asciiCharacterFramebuffer;

        this.outputFramebuffer = this.p5.createFramebuffer({  depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer) {
        if (!this.options.enabled) {
            this.outputFramebuffer = inputFramebuffer;
            return;
        }

        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_characterTexture', this.characterSet.texture);
        this.shader.setUniform('u_charsetCols', this.characterSet.charsetCols);
        this.shader.setUniform('u_charsetRows', this.characterSet.charsetRows);
        this.shader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.shader.setUniform('u_sketchTexture', inputFramebuffer);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_characterColor', this.options.characterColor);
        this.shader.setUniform('u_characterColorMode', this.options.characterColorMode);
        this.shader.setUniform('u_backgroundColor', this.options.backgroundColor);
        this.shader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
}
