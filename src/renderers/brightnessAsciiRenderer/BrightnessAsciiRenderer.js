// renderers/BrightnessAsciiRenderer.js
import AsciiRenderer from '../AsciiRenderer.js';
import vertexShader from '../../shaders/vert/shader.vert';
import asciiBrightnessShader from './shaders/asciiBrightness.frag';

export default class BrightnessAsciiRenderer extends AsciiRenderer {
    
    constructor(p5Instance, grid, characterSet, options) {
        super(p5Instance, grid, characterSet, options);

        this.shader = this.p5.createShader(vertexShader, asciiBrightnessShader);
        this.outputFramebuffer = this.p5.createFramebuffer({ antialias: false, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    render(inputFramebuffer) {
        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_characterTexture', this.characterSet.texture);
        this.shader.setUniform('u_charsetCols', this.characterSet.charsetCols);
        this.shader.setUniform('u_charsetRows', this.characterSet.charsetRows);
        this.shader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.shader.setUniform('u_sketchTexture', inputFramebuffer);
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
