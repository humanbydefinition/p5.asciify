import p5 from 'p5';
import { validateOptions } from "../validators/OptionsValidator";
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyCharacterSet } from '../CharacterSet';

import { AsciiRendererOptions } from './types';

import vertexShader from '../assets/shaders/vert/shader.vert';
import asciiConversionShader from './_common_shaders/asciiConversion.frag';

/**
 * Abstract class for shader-based ASCII Renderers.
 */
export class AsciiRenderer<T extends AsciiRendererOptions = AsciiRendererOptions> {

    protected _primaryColorSampleFramebuffer: p5.Framebuffer;
    protected _secondaryColorSampleFramebuffer: p5.Framebuffer;
    protected _asciiCharacterFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;
    protected _shader: p5.Shader;

    constructor(
        protected p: p5,
        protected grid: P5AsciifyGrid,
        public characterSet: P5AsciifyCharacterSet,
        protected _options: T
    ) {

        this._primaryColorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this._secondaryColorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this._asciiCharacterFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this._outputFramebuffer = this.p.createFramebuffer({
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this._shader = this.p.createShader(vertexShader, asciiConversionShader);
    }

    /**
     * Resizes all framebuffers based on the grid dimensions.
     */
    public resizeFramebuffers(): void {
        this._primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this._secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this._asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    /**
     * Resets the shaders for the renderer.
     */
    public resetShaders(): void {

    }

    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    public updateOptions(newOptions: Partial<AsciiRendererOptions>): void {
        validateOptions(this.p, newOptions);

        this._options = {
            ...this._options,
            ...newOptions
        };

        if (!this.p._setupDone) {
            return;
        }

        if (newOptions?.characters) {
            this.characterSet.setCharacterSet(newOptions.characters);
            this.resetShaders();
        }
    }

    /**
     * Convert and render the input framebuffer to ASCII.
     * @param inputFramebuffer - The input framebuffer to convert to ASCII.
     * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
     */
    public render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void {
        this._outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this._shader);
        this._shader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this._shader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this._shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this._shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this._shader.setUniform('u_primaryColorTexture', this._primaryColorSampleFramebuffer);
        this._shader.setUniform('u_secondaryColorTexture', this._secondaryColorSampleFramebuffer);
        this._shader.setUniform('u_asciiCharacterTexture', this._asciiCharacterFramebuffer);
        if (previousAsciiRenderer !== this) {
            this._shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.outputFramebuffer);
        }
        this._shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this._shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this._shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this._shader.setUniform('u_invertMode', this._options.invertMode);
        this._shader.setUniform('u_rotationAngle', this.p.radians(this._options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._outputFramebuffer.end();
    }

    // Getters
    get outputFramebuffer() { return this._outputFramebuffer; }
    get options() { return this._options; }
    get primaryColorSampleFramebuffer() { return this._primaryColorSampleFramebuffer; }
    get secondaryColorSampleFramebuffer() { return this._secondaryColorSampleFramebuffer; }
    get asciiCharacterFramebuffer() { return this._asciiCharacterFramebuffer; }
}