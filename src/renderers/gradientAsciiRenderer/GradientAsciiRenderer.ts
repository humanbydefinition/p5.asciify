import p5 from 'p5';
import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';

import grayscaleShader from './shaders/grayscale.frag';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';
import colorSampleShader from './shaders/colorSample.frag';
import vertexShader from '../../assets/shaders/vert/shader.vert';

import { P5AsciifyGradientManager } from '../../gradients/GradientManager';

interface GradientAsciiRendererOptions {
    enabled: boolean;
    characterColor: p5.Color;
    backgroundColor: p5.Color;
    characterColorMode: number;
    backgroundColorMode: number;
    invertMode: number;
    rotationAngle: number;
}

export default class GradientAsciiRenderer extends AsciiRenderer {
    private grayscaleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private asciiShader: p5.Shader;
    private grayscaleFramebuffer: p5.Framebuffer;
    private prevAsciiCharacterFramebuffer: p5.Framebuffer;
    private gradientManager: P5AsciifyGradientManager;

    constructor(
        p5Instance: p5,
        grid: P5AsciifyGrid,
        characterSet: P5AsciifyCharacterSet,
        gradientManager: P5AsciifyGradientManager,
        options: GradientAsciiRendererOptions
    ) {
        super(p5Instance, grid, characterSet, options);

        this._options.characterColor = this.p.color(this._options.characterColor);
        this._options.backgroundColor = this.p.color(this._options.backgroundColor);

        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p.createShader(vertexShader, grayscaleShader);
        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.asciiShader = this.p.createShader(vertexShader, asciiConversionShader);

        this.grayscaleFramebuffer = this.p.createFramebuffer({
            density: 1,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this.prevAsciiCharacterFramebuffer = this.p.createFramebuffer({
            density: 1,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevAsciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void {
        // Grayscale pass
        this.grayscaleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.grayscaleShader);
        this.grayscaleShader.setUniform('u_image', inputFramebuffer);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.grayscaleFramebuffer.end();

        // Initial ASCII character setup
        this.prevAsciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.prevAsciiCharacterFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.asciiCharacterFramebuffer.end();

        // Gradient passes
        for (const gradient of this.gradientManager._gradients) {
            if (gradient.enabled) {
                [this.prevAsciiCharacterFramebuffer, this.asciiCharacterFramebuffer] =
                    [this.asciiCharacterFramebuffer, this.prevAsciiCharacterFramebuffer];

                this.asciiCharacterFramebuffer.begin();
                this.p.clear();
                this.p.shader(gradient._shader);
                gradient.setUniforms(this.p, this.prevAsciiCharacterFramebuffer, this.grayscaleFramebuffer);
                this.p.rect(0, 0, this.grid.cols, this.grid.rows);
                this.asciiCharacterFramebuffer.end();
            }
        }

        // Color sample passes
        this.primaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer._options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
        this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.characterColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this._options.characterColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.primaryColorSampleFramebuffer.end();

        this.secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousRendererEnabled', previousAsciiRenderer._options.enabled);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.asciiCharacterFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this._options.backgroundColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.secondaryColorSampleFramebuffer.end();

        // Final output pass
        this._outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiShader);
        this.asciiShader.setUniform('u_layer', 2);
        this.asciiShader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.asciiShader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this.asciiShader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.asciiShader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
        this.asciiShader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.asciiShader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        if (!isFirstRenderer) {
            this.asciiShader.setUniform('u_prevAsciiTexture', previousAsciiRenderer._outputFramebuffer);
        }
        this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiShader.setUniform('u_invertMode', this._options.invertMode);
        this.asciiShader.setUniform('u_rotationAngle', this.p.radians(this._options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._outputFramebuffer.end();
    }
}