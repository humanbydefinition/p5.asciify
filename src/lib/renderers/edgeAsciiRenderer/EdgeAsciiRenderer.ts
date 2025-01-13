import p5 from 'p5';
import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import sobelShader from './shaders/sobel.frag';

import { generateSampleShader } from './shaders/shaderGenerators.min';

interface EdgeAsciiRendererOptions extends AsciiRendererOptions {
    sobelThreshold: number;
    sampleThreshold: number;
}

/**
 * An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.
 */
export default class EdgeAsciiRenderer extends AsciiRenderer<EdgeAsciiRendererOptions> {
    private sobelShader: p5.Shader;
    private sampleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private sobelFramebuffer: p5.Framebuffer;
    private sampleFramebuffer: p5.Framebuffer;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: EdgeAsciiRendererOptions) {
        super(p5Instance, grid, characterSet, options);

        this._options.characterColor = this.p.color(this._options.characterColor);
        this._options.backgroundColor = this.p.color(this._options.backgroundColor);

        this.sobelShader = this.p.createShader(vertexShader, sobelShader);
        this.sampleShader = this.p.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p.createShader(vertexShader, asciiCharacterShader);

        this.sobelFramebuffer = this.p.createFramebuffer({ 
            depthFormat: this.p.UNSIGNED_INT, 
            textureFiltering: this.p.NEAREST 
        });
        this.sampleFramebuffer = this.p.createFramebuffer({ 
            density: 1, 
            width: this.grid.cols, 
            height: this.grid.rows, 
            depthFormat: this.p.UNSIGNED_INT, 
            textureFiltering: this.p.NEAREST 
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    resetShaders(): void {
        this.sampleShader = this.p.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void {
        // Sobel pass
        this.sobelFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.sobelShader);
        this.sobelShader.setUniform('u_texture', inputFramebuffer);
        this.sobelShader.setUniform('u_textureSize', [this.p.width, this.p.height]);
        this.sobelShader.setUniform('u_threshold', this.options.sobelThreshold);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.sobelFramebuffer.end();

        // Sample pass
        this.sampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.sampleShader);
        this.sampleShader.setUniform('u_imageSize', [this.p.width, this.p.height]);
        this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
        this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.sampleShader.setUniform('u_threshold', this.options.sampleThreshold);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.sampleFramebuffer.end();

        // Primary color pass
        this._primaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.characterColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this._options.characterColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._primaryColorSampleFramebuffer.end();

        // Secondary color pass
        this._secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this._options.backgroundColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._secondaryColorSampleFramebuffer.end();

        // ASCII character pass
        this._asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_previousAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._asciiCharacterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}