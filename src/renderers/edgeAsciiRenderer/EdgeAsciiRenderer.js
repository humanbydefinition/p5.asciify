// renderers/EdgeAsciiRenderer.js
import AsciiRenderer from '../AsciiRenderer.js';
import vertexShader from '../../assets/shaders/vert/shader.vert';
import asciiEdgeShader from './shaders/asciiEdge.frag';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

import sobelShader from './shaders/sobel.frag';

import { generateSampleShader } from './shaders/shaderGenerators.js';

export default class EdgeAsciiRenderer extends AsciiRenderer {

    constructor(p5Instance, grid, characterSet, asciiRenderer, options) {
        super(p5Instance, grid, characterSet, options);

        this.asciiRenderer = asciiRenderer;

        this.sobelShader = this.p5.createShader(vertexShader, sobelShader);
        this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p5.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p5.createShader(vertexShader, asciiCharacterShader);
        this.shader = this.p5.createShader(vertexShader, asciiEdgeShader);

        this.sobelFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.sampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });

        this.primaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.secondaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        this.asciiCharacterFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });


        this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
    }

    resizeFramebuffers() {
        this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    resetShaders() {
        this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
    }

    setAsciiRenderer(asciiRenderer) {
        this.asciiRenderer = asciiRenderer;
    }

    render(inputFramebuffer) {

        if (!this.options.enabled) {
            if (this.asciiRenderer.options.enabled) {
                this.outputFramebuffer = this.asciiRenderer.getOutputFramebuffer();
            } else {
                this.outputFramebuffer = inputFramebuffer;
            }
            return;
        }

        // Apply Sobel shader for edge detection
        this.sobelFramebuffer.begin();
        this.p5.shader(this.sobelShader);
        this.sobelShader.setUniform('u_texture', inputFramebuffer);
        this.sobelShader.setUniform('u_textureSize', [this.p5.width, this.p5.height]);
        this.sobelShader.setUniform('u_threshold', this.options.sobelThreshold);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.sobelFramebuffer.end();

        // Apply sample shader
        this.sampleFramebuffer.begin();
        this.p5.shader(this.sampleShader);
        this.sampleShader.setUniform('u_imageSize', [this.p5.width, this.p5.height]);
        this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
        this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.sampleShader.setUniform('u_threshold', this.options.sampleThreshold);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.sampleFramebuffer.end();

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
        this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.asciiCharacterFramebuffer.end();

        // Render ASCII using the edge shader
        this.outputFramebuffer.begin();
        this.p5.shader(this.shader);
        this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.texture);
        this.shader.setUniform('u_charsetCols', this.characterSet.charsetCols);
        this.shader.setUniform('u_charsetRows', this.characterSet.charsetRows);
        this.shader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.shader.setUniform('u_asciiBrightnessTexture', this.asciiRenderer.getOutputFramebuffer());
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_edgesTexture', this.sampleFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_brightnessEnabled', this.asciiRenderer.options.enabled);
        this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        this.outputFramebuffer.end();
    }
}
