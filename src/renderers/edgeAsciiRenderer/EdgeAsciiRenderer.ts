import p5 from 'p5';
import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';
import sobelShader from './shaders/sobel.frag';

import { generateSampleShader } from './shaders/shaderGenerators';

export default class EdgeAsciiRenderer extends AsciiRenderer {
    private sobelShader: p5.Shader;
    private sampleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private shader: p5.Shader;
    private sobelFramebuffer: p5.Framebuffer;
    private sampleFramebuffer: p5.Framebuffer;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions) {
        super(p5Instance, grid, characterSet, options);

        this.options.characterColor = this.p.color(this.options.characterColor);
        this.options.backgroundColor = this.p.color(this.options.backgroundColor);

        this.sobelShader = this.p.createShader(vertexShader, sobelShader);
        this.sampleShader = this.p.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p.createShader(vertexShader, asciiCharacterShader);
        this.shader = this.p.createShader(vertexShader, asciiConversionShader);

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

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void {
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
        this.primaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.characterColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.characterColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.primaryColorSampleFramebuffer.end();

        // Secondary color pass
        this.secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer.options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this.options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this.options.backgroundColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.secondaryColorSampleFramebuffer.end();

        // ASCII character pass
        this.asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_previousAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.asciiCharacterFramebuffer.end();

        // Final output pass
        this.outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.shader);
        this.shader.setUniform('u_layer', 3);
        this.shader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.shader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        if (!isFirstRenderer) {
            this.shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.getOutputFramebuffer());
        }
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_edgesTexture', this.sampleFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p.radians(this.options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.outputFramebuffer.end();
    }
}