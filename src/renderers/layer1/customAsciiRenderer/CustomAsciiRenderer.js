// renderers/BrightnessAsciiRenderer.js
import AsciiRenderer from '../../AsciiRenderer.js';
import vertexShader from '../../../assets/shaders/vert/shader.vert';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';

export default class CustomAsciiRenderer extends AsciiRenderer {
    
    constructor(p5Instance, grid, characterSet, primaryColorSampleFramebuffer, secondaryColorFrameBuffer, asciiCharacterFramebuffer, options) {
        super(p5Instance, grid, characterSet, options);

        this.shader = this.p5.createShader(vertexShader, asciiConversionShader);

        this.primaryColorSampleFramebuffer = primaryColorSampleFramebuffer;
        this.secondaryColorSampleFramebuffer = secondaryColorFrameBuffer;
        this.asciiCharacterFramebuffer = asciiCharacterFramebuffer;
    }

    render(inputFramebuffer) {
        if (!this.options.enabled) {
            this.outputFramebuffer = inputFramebuffer;
            return;
        }

        if(this.options.characterColorMode === 1) {
            this.primaryColorSampleFramebuffer.begin();
            this.p5.background(this.options.characterColor);
            this.primaryColorSampleFramebuffer.end();
        }

        if(this.options.backgroundColorMode === 1) {
            this.secondaryColorSampleFramebuffer.begin();
            this.p5.background(this.options.backgroundColor);
            this.secondaryColorSampleFramebuffer.end();
        } else {
            this.secondaryColorSampleFramebuffer.begin();
            this.p5.clear();
            this.p5.image(this.primaryColorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
            this.secondaryColorSampleFramebuffer.end();
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
        this.shader.setUniform('u_characterColorMode', this.options.characterColorMode);
        this.shader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
}
