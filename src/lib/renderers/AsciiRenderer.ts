import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyCharacterSet } from '../CharacterSet';
import { P5AsciifyError } from '../AsciifyError';

import { AsciiRendererOptions, AsciiRendererUserOptions } from './types';

import vertexShader from '../assets/shaders/vert/shader.vert';
import asciiConversionShader from './_common_shaders/asciiConversion.frag';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

/**
 * Abstract class for shader-based ASCII Renderers.
 */
export class P5AsciifyRenderer {

    public characterSet: P5AsciifyCharacterSet;
    protected _primaryColorSampleFramebuffer: p5.Framebuffer;
    protected _secondaryColorSampleFramebuffer: p5.Framebuffer;
    protected _asciiCharacterFramebuffer: p5.Framebuffer;
    protected _inversionFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;
    protected _shader: p5.Shader;

    constructor(
        protected p: p5,
        protected grid: P5AsciifyGrid,
        protected fontTextureAtlas: P5AsciifyFontTextureAtlas,
        protected _options: AsciiRendererOptions
    ) {
        if (this._options.characterColor) {
            this._options.characterColor = this.p.color(this._options.characterColor as string);
        }
        if (this._options.backgroundColor) {
            this._options.backgroundColor = this.p.color(this._options.backgroundColor as string);
        }

        this.characterSet = new P5AsciifyCharacterSet(this.p, this.fontTextureAtlas, this._options.characters);

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

        this._inversionFramebuffer = this.p.createFramebuffer({
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
        this._inversionFramebuffer.resize(this.grid.cols, this.grid.rows);
        this._asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    /**
     * Resets the shaders for the renderer.
     */
    public resetShaders(): void { return; }

    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    public update(newOptions: Partial<AsciiRendererUserOptions>): void {
        if (newOptions?.enabled !== undefined) {
            this.enabled(newOptions.enabled);
        }

        if (newOptions?.characterColor !== undefined) {
            newOptions.characterColor = this.p.color(newOptions.characterColor as string);
            this.characterColor(newOptions.characterColor as p5.Color);
        }

        if (newOptions?.backgroundColor !== undefined) {
            newOptions.backgroundColor = this.p.color(newOptions.backgroundColor as string);
            this.backgroundColor(newOptions.backgroundColor as p5.Color);
        }

        if(newOptions?.characters !== undefined) {
            this.characters(newOptions.characters);
        }

        if(newOptions?.invertMode !== undefined) {
            this.invert(newOptions.invertMode);
        }

        if(newOptions?.rotationAngle !== undefined) {
            this.rotation(newOptions.rotationAngle);
        }

        if(newOptions?.characterColorMode !== undefined) {
            this.characterColorMode(newOptions.characterColorMode as string);
        }

        if(newOptions?.backgroundColorMode !== undefined) {
            this.backgroundColorMode(newOptions.backgroundColorMode as string);
        }
    }

    /**
     * Convert and render the input framebuffer to ASCII.
     * @param inputFramebuffer - The input framebuffer to convert to ASCII.
     * @param previousAsciiRenderer - The previous ASCII renderer in the pipeline.
     */
    public render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void {
        this._outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this._shader);
        this._shader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this._shader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this._shader.setUniform('u_characterTexture', this.fontTextureAtlas.texture);
        this._shader.setUniform('u_charsetDimensions', [this.fontTextureAtlas.charsetCols, this.fontTextureAtlas.charsetRows]);
        this._shader.setUniform('u_primaryColorTexture', this._primaryColorSampleFramebuffer);
        this._shader.setUniform('u_secondaryColorTexture', this._secondaryColorSampleFramebuffer);
        this._shader.setUniform('u_inversionTexture', this._inversionFramebuffer);
        this._shader.setUniform('u_asciiCharacterTexture', this._asciiCharacterFramebuffer);
        if (previousAsciiRenderer !== this) {
            this._shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.outputFramebuffer);
        }
        this._shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this._shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this._shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this._shader.setUniform('u_rotationAngle', this.p.radians(this._options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._outputFramebuffer.end();
    }

    /**
     * Set the characters for the character set.
     * @param characters The characters to set for the character set.
     * @throws {P5AsciifyError} If characters is not a string.
     */
    public characters(characters: string): void {
        if (typeof characters !== 'string') {
            throw new P5AsciifyError('Characters must be a string.');
        }

        // Only update if characters are different
        if (this.characterSet.characters !== characters) {
            this.characterSet.setCharacterSet(characters);
            this.resetShaders();
        }
    }

    /**
     * Invert the colors of the ASCII character and cell background colors.
     * @param invert Whether to swap the colors.
     * @throws {P5AsciifyError} If invert is not a boolean.
     */
    public invert(invert: boolean): void {
        if (typeof invert !== 'boolean') {
            throw new P5AsciifyError('Invert mode must be a boolean.');
        }

        this._options.invertMode = invert;
    }

    /**
     * Define the rotation angle of all characters in the grid in degrees.
     * 
     * @remarks
     * Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.
     * 
     * @param angle The rotation angle in degrees.
     * @throws {P5AsciifyError} If angle is not a number.
     */
    public rotation(angle: number): void {
        if (typeof angle !== 'number') {
            throw new P5AsciifyError('Rotation angle must be a number.');
        }

        this._options.rotationAngle = angle;
    }

    /**
     * Set the color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     * @throws {P5AsciifyError} If color is not a p5.Color object.
     */
    public characterColor(color: p5.Color): void {
        if (!color || !(color instanceof p5.Color)) {
            throw new P5AsciifyError('Character color must be a valid p5.Color object');
        }

        this._options.characterColor = color;
    }

    /**
     * Set the background color of the ASCII characters, used in the fixed color mode.
     * @param color The fixed color of the ASCII characters.
     */
    public backgroundColor(color: p5.Color): void {
        if (!color || !(color instanceof p5.Color)) {
            throw new P5AsciifyError('Background color must be a valid p5.Color object');
        }

        this._options.backgroundColor = color;
    }

    /**
     * Sets the color mode for ASCII characters.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     */
    public characterColorMode(mode: string): void {
        if (typeof mode !== 'string') {
            throw new P5AsciifyError('Character color mode must be a string');
        }

        if (mode !== 'sampled' && mode !== 'fixed') {
            throw new P5AsciifyError("Character color mode must be either 'sampled' or 'fixed'");
        }

        if (mode === 'sampled') {
            this._options.characterColorMode = 0;
        } else if (mode === 'fixed') {
            this._options.characterColorMode = 1;
        }
    }

    /**
     * Sets the color mode for the grid cell background.
     * @param mode The color mode ('sampled' or 'fixed')
     * @throws {P5AsciifyError} If mode is not a string or not one of the allowed values ('sampled' or 'fixed')
     */
    public backgroundColorMode(mode: string): void {
        if (typeof mode !== 'string') {
            throw new P5AsciifyError('Background color mode must be a string');
        }

        if (mode !== 'sampled' && mode !== 'fixed') {
            throw new P5AsciifyError("Background color mode must be either 'sampled' or 'fixed'");
        }

        if (mode === 'sampled') {
            this._options.backgroundColorMode = 0;
        } else if (mode === 'fixed') {
            this._options.backgroundColorMode = 1;
        }
    }

    /**
     * Enable or disable the renderer.
     * @param enabled - Whether to enable or disable the renderer.
     * @throws {P5AsciifyError} If enabled is not a boolean.
     */
    public enabled(enabled: boolean): void {
        if (typeof enabled !== 'boolean') {
            throw new P5AsciifyError('Enabled must be a boolean.');
        }

        this._options.enabled = enabled;
    }

    /**
     * Enable the renderer.
     */
    public enable(): void {
        this.enabled(true);
    }

    /**
     * Disable the renderer.
     */
    public disable(): void {
        this.enabled(false);
    }

    // Getters
    get outputFramebuffer() { return this._outputFramebuffer; }
    get options() { return this._options; }
    get primaryColorSampleFramebuffer() { return this._primaryColorSampleFramebuffer; }
    get secondaryColorSampleFramebuffer() { return this._secondaryColorSampleFramebuffer; }
    get inversionFramebuffer() { return this._inversionFramebuffer; }
    get asciiCharacterFramebuffer() { return this._asciiCharacterFramebuffer; }
}