// renderers/BrightnessAsciiRenderer.js
import AsciiRenderer from '../AsciiRenderer.js';
import vertexShader from '../../assets/shaders/vert/shader.vert';
import asciiBrightnessShader from './shaders/asciiBrightness.frag';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

export default class BrightnessAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, options) {
        super(p5Instance, grid, characterSet, options);

        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p5.createShader(vertexShader, asciiCharacterShader);
        this.shader = this.p5.createShader(vertexShader, asciiBrightnessShader);

        this.primaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.secondaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.asciiCharacterFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });

        this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
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

        this.asciiCharacterFramebuffer.begin();
        this.p5.clear();
        this.p5.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.asciiCharacterFramebuffer.end();

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
