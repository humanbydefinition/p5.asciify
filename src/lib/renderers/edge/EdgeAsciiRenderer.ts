import p5 from 'p5';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyError } from '../../AsciifyError';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';

import { AsciiRendererOptions } from '../types';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import colorSampleShader from './shaders/colorSample.frag';
import inversionShader from './shaders/gridCellInversion.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import sobelShader from './shaders/sobel.frag';

import { generateSampleShader } from './shaders/shaderGenerators.min';

/** Default configuration options for edge detection ASCII renderer */
export const EDGE_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Characters used for edge representation (8 characters for different angles) */
    characters: "-/|\\-/|\\",
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
    characterColor: "#FFFFFF",
    /** Character color mode */
    characterColorMode:"sampled",
    /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
    backgroundColor: "#000000",
    /** Background color mode */
    backgroundColorMode: "fixed",
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Threshold for Sobel edge detection. Responsible for edge detection sensitivity */
    sobelThreshold: 0.5,
    /** Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it */
    sampleThreshold: 16,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
};

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

    constructor(
        p5Instance: p5,
        grid: P5AsciifyGrid,
        fontTextureAtlas: P5AsciifyFontTextureAtlas,
        options: AsciiRendererOptions = EDGE_DEFAULT_OPTIONS
    ) {
        const mergedOptions = { ...EDGE_DEFAULT_OPTIONS, ...options };
        super(p5Instance, grid, fontTextureAtlas, mergedOptions);

        this.sobelShader = this._p.createShader(vertexShader, sobelShader);
        this.sampleShader = this._p.createShader(vertexShader, generateSampleShader(16, this._grid.cellHeight, this._grid.cellWidth));
        this.colorSampleShader = this._p.createShader(vertexShader, colorSampleShader);
        this.inversionShader = this._p.createShader(vertexShader, inversionShader);
        this.asciiCharacterShader = this._p.createShader(vertexShader, asciiCharacterShader);

        this.sobelFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
        this.sampleFramebuffer = this._p.createFramebuffer({
            density: 1,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.sampleFramebuffer.resize(this._grid.cols, this._grid.rows);
    }

    resetShaders(): void {
        this.sampleShader = this._p.createShader(vertexShader, generateSampleShader(16, this._grid.cellHeight, this._grid.cellWidth));
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

    public update(newOptions: Partial<AsciiRendererOptions>): void {
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
        this._p.clear();
        this._p.shader(this.sobelShader);
        this.sobelShader.setUniform('u_texture', inputFramebuffer);
        this.sobelShader.setUniform('u_textureSize', [this._p.width, this._p.height]);
        this.sobelShader.setUniform('u_threshold', this._options.sobelThreshold as number);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this.sobelFramebuffer.end();

        // Sample pass
        this.sampleFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.sampleShader);
        this.sampleShader.setUniform('u_imageSize', [this._p.width, this._p.height]);
        this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
        this.sampleShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this.sampleShader.setUniform('u_threshold', this._options.sampleThreshold as number);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this.sampleFramebuffer.end();

        // Primary color pass
        this._primaryColorFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorFramebuffer);
        }
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.characterColorMode as number);
        this.colorSampleShader.setUniform('u_staticColor', (this._options.characterColor as p5.Color)._array);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._primaryColorFramebuffer.end();

        // Secondary color pass
        this._secondaryColorFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorFramebuffer);
        }
        this.colorSampleShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.backgroundColorMode as number);
        this.colorSampleShader.setUniform('u_staticColor', (this._options.backgroundColor as p5.Color)._array);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._secondaryColorFramebuffer.end();

        // Inversion pass
        this._inversionFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.inversionShader);
        this.inversionShader.setUniform('u_invert', this._options.invertMode);
        this.inversionShader.setUniform('u_sampleTexture', this.sampleFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.inversionShader.setUniform('u_previousInversionTexture', previousAsciiRenderer.inversionFramebuffer);
        }
        this.inversionShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this._p.rect(0, 0, this._p.width, this._p.height);

        this._inversionFramebuffer.end();

        // ASCII character pass
        this._characterFramebuffer.begin();
        this._p.clear();
        this._p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_sketchTexture', this.sampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_colorPaletteTexture', this._characterColorPalette.framebuffer);
        if (previousAsciiRenderer !== this) {
            this.asciiCharacterShader.setUniform('u_previousAsciiCharacterTexture', previousAsciiRenderer.characterFramebuffer);
        }
        this.asciiCharacterShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this.asciiCharacterShader.setUniform('u_totalChars', this._options.characters!.length);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._characterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}