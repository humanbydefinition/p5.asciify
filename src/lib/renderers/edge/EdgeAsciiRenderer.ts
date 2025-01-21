import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyError } from '../../AsciifyError';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';

import { AsciiRendererOptions, AsciiRendererUserOptions } from '../types';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import inversionShader from './shaders/gridCellInversion.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import sobelShader from './shaders/sobel.frag';

import { generateSampleShader } from './shaders/shaderGenerators.min';

/**
 * An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.
 */
export class P5AsciifyEdgeRenderer extends P5AsciifyRenderer {
    private sobelShader: p5.Shader;
    private sampleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private inversionShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private sobelFramebuffer: p5.Framebuffer;
    private sampleFramebuffer: p5.Framebuffer;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas, options: AsciiRendererOptions) {
        super(p5Instance, grid, fontTextureAtlas, options);

        this.sobelShader = this.p.createShader(vertexShader, sobelShader);
        this.sampleShader = this.p.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.inversionShader = this.p.createShader(vertexShader, inversionShader);
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

    /**
     * Set the threshold value for the Sobel edge detection algorithm.
     * @param value The threshold value for the Sobel edge detection algorithm.
     * @throws {P5AsciifyError} If the value is not a valid number between 0 and 1.
     */
    sobelThreshold(value: number): void {
        if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
            throw new P5AsciifyError('Sobel threshold must be a valid number');
        }

        if (value < 0 || value > 1) {
            throw new P5AsciifyError('Sobel threshold must be between 0 and 1');
        }
    
        this._options.sobelThreshold = value;
    }

    /**
     * Set the sample threshold value for the edge detection algorithm.
     * @param value The sample threshold value for the edge detection algorithm.
     * @throws {P5AsciifyError} If the value is not a valid number greater than or equal to 0.
     */
    sampleThreshold(value: number): void {
        if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
            throw new P5AsciifyError('Sample threshold must be a valid number');
        }

        if (value < 0) {
            throw new P5AsciifyError('Sample threshold must be greater than or equal to 0');
        }
    
        this._options.sampleThreshold = value;
    }

    public update(newOptions: Partial<AsciiRendererUserOptions>): void {
        super.update(newOptions);

        if (newOptions.sobelThreshold !== undefined) {
            this.sobelThreshold(newOptions.sobelThreshold as number);
        }

        if (newOptions.sampleThreshold !== undefined) {
            this.sampleThreshold(newOptions.sampleThreshold as number);
        }
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void {
        // Sobel pass
        this.sobelFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.sobelShader);
        this.sobelShader.setUniform('u_texture', inputFramebuffer);
        this.sobelShader.setUniform('u_textureSize', [this.p.width, this.p.height]);
        this.sobelShader.setUniform('u_threshold', this._options.sobelThreshold as number);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.sobelFramebuffer.end();

        // Sample pass
        this.sampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.sampleShader);
        this.sampleShader.setUniform('u_imageSize', [this.p.width, this.p.height]);
        this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
        this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.sampleShader.setUniform('u_threshold', this.options.sampleThreshold as number);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.sampleFramebuffer.end();

        // Primary color pass
        this._primaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        }
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.characterColorMode as number);
        this.colorSampleShader.setUniform('u_staticColor', (this._options.characterColor as p5.Color)._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._primaryColorSampleFramebuffer.end();

        // Secondary color pass
        this._secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        }
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.backgroundColorMode as number);
        this.colorSampleShader.setUniform('u_staticColor', (this._options.backgroundColor as p5.Color)._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._secondaryColorSampleFramebuffer.end();

        // Inversion pass
        this._inversionFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.inversionShader);
        this.inversionShader.setUniform('u_invert', this.options.invertMode);
        this.inversionShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.inversionShader.setUniform('u_previousInversionTexture', previousAsciiRenderer.inversionFramebuffer);
        }
        this.inversionShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.p.rect(0, 0, this.p.width, this.p.height);

        this._inversionFramebuffer.end();

        // ASCII character pass
        this._asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        if (previousAsciiRenderer !== this) {
            this.asciiCharacterShader.setUniform('u_previousAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
        }
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this.characterSet.characters.length);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._asciiCharacterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}