// renderers/BrightnessAsciiRenderer.js
import AsciiRenderer from '../AsciiRenderer.js';
import vertexShader from '../../assets/shaders/vert/shader.vert';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';

export default class CustomAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, options) {
        super(p5Instance, grid, characterSet, options);

        this.shader = this.p5.createShader(vertexShader, asciiConversionShader);
    }

    render(inputFramebuffer, previousAsciiRenderer) {

        this.outputFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_layer', 4);
        this.shader.setUniform('u_pixelRatio', this.p5.pixelDensity());
        this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiBrightnessTexture', previousAsciiRenderer.getOutputFramebuffer());
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', 0);
        this.shader.setUniform('u_rotationAngle', 0);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
}
