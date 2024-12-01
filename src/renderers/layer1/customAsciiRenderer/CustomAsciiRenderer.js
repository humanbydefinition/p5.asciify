// renderers/BrightnessAsciiRenderer.js
import AsciiRenderer from '../../AsciiRenderer.js';
import vertexShader from '../../../assets/shaders/vert/shader.vert';
import asciiConversionShader from '../../_common_shaders/asciiConversion.frag';

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
        } 

        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_layer', 1);
        this.shader.setUniform('u_resolution', [this.p5.width* this.p5.pixelDensity(), this.p5.height* this.p5.pixelDensity()]);
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
}
