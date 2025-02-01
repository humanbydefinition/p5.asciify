import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyError } from '../AsciifyError';
import { P5AsciifyColorPalette } from '../ColorPalette';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { AsciiRendererOptions } from './types';

import vertexShader from '../assets/shaders/vert/shader.vert';
import asciiConversionShader from './_common_shaders/asciiConversion.frag';

/** Default configuration options for custom ASCII renderer */
export const CUSTOM_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
};

/**
 * Class for shader-based ASCII Renderers.
 */
export class P5AsciifyRenderer {

    /** The color palette containing colors that correspond to the defined character set. */
    protected _characterColorPalette: P5AsciifyColorPalette;

    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    protected _primaryColorFramebuffer: p5.Framebuffer;

    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    protected _secondaryColorFramebuffer: p5.Framebuffer;

    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    protected _characterFramebuffer: p5.Framebuffer;

    /** The inversion framebuffer, whose pixels define whether to swap the character and background colors. */
    protected _inversionFramebuffer: p5.Framebuffer;

    protected _rotationFramebuffer: p5.Framebuffer;

    /** The output framebuffer, where the final ASCII conversion is rendered. */
    protected _outputFramebuffer: p5.Framebuffer;

    /** The shader used for the ASCII conversion. */
    protected _shader: p5.Shader;

    constructor(
        /** The p5 instance. */
        protected _p: p5,

        /** The grid to render the ASCII characters on. */
        protected _grid: P5AsciifyGrid,

        /** The font texture atlas containing the ASCII characters texture. */
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,

        /** The options for the ASCII renderer. */
        protected _options: AsciiRendererOptions = CUSTOM_DEFAULT_OPTIONS
    ) {
        this._options = { ...CUSTOM_DEFAULT_OPTIONS, ..._options };

        this._characterColorPalette = new P5AsciifyColorPalette(this._p, this._fontTextureAtlas.fontManager.glyphColors(this._options.characters));

        this._primaryColorFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._secondaryColorFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._inversionFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._characterFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._rotationFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._outputFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._shader = this._p.createShader(vertexShader, asciiConversionShader);

        this.update(this._options);
    }

    /**
     * Resizes all framebuffers based on the grid dimensions.
     */
    public resizeFramebuffers(): void {
        this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._inversionFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._characterFramebuffer.resize(this._grid.cols, this._grid.rows);
    }

    /**
     * Resets the shaders for the renderer.
     */
    public resetShaders(): void { return; }

    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    public update(newOptions: Partial<AsciiRendererOptions>): void {
        if (newOptions?.enabled !== undefined) {
            this.enabled(newOptions.enabled);
        }

        if (newOptions?.characterColor !== undefined) {
            newOptions.characterColor = this._p.color(newOptions.characterColor as string);
            this.characterColor(newOptions.characterColor as p5.Color);
        }

        if (newOptions?.backgroundColor !== undefined) {
            newOptions.backgroundColor = this._p.color(newOptions.backgroundColor as string);
            this.backgroundColor(newOptions.backgroundColor as p5.Color);
        }

        if (newOptions?.characters !== undefined) {
            this.characters(newOptions.characters);
        }

        if (newOptions?.invertMode !== undefined) {
            this.invert(newOptions.invertMode);
        }

        if (newOptions?.rotationAngle !== undefined) {
            this.rotation(newOptions.rotationAngle as number);
        }

        if (newOptions?.characterColorMode !== undefined) {
            this.characterColorMode(newOptions.characterColorMode as string);
        }

        if (newOptions?.backgroundColorMode !== undefined) {
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
        this._p.clear();
        this._p.shader(this._shader);
        this._shader.setUniform('u_pixelRatio', this._p.pixelDensity());
        this._shader.setUniform('u_resolution', [this._p.width, this._p.height]);
        this._shader.setUniform('u_characterTexture', this._fontTextureAtlas.texture);
        this._shader.setUniform('u_charsetDimensions', [this._fontTextureAtlas.charsetCols, this._fontTextureAtlas.charsetRows]);
        this._shader.setUniform('u_primaryColorTexture', this._primaryColorFramebuffer);
        this._shader.setUniform('u_secondaryColorTexture', this._secondaryColorFramebuffer);
        this._shader.setUniform('u_inversionTexture', this._inversionFramebuffer);
        this._shader.setUniform('u_rotationTexture', this._rotationFramebuffer);
        this._shader.setUniform('u_asciiCharacterTexture', this._characterFramebuffer);
        if (previousAsciiRenderer !== this) {
            this._shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.outputFramebuffer);
        } else {
            this._shader.setUniform('u_prevAsciiTexture', inputFramebuffer);
        }
        this._shader.setUniform('u_gridPixelDimensions', [this._grid.width, this._grid.height]);
        this._shader.setUniform('u_gridOffsetDimensions', [this._grid.offsetX, this._grid.offsetY]);
        this._shader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._outputFramebuffer.end();
    }

    /**
     * Set the characters for the character set.
     * @param characters The characters to set for the character set.
     * @throws {P5AsciifyError} If characters is not a string.
     */
    public characters(characters: string = ""): void {
        if (typeof characters !== 'string') {
            throw new P5AsciifyError('Characters must be a string.');
        }

        this._fontTextureAtlas.fontManager.validateCharacters(characters);

        this._characterColorPalette.setColors(this._fontTextureAtlas.fontManager.glyphColors(characters));
        this.resetShaders();

        this._options.characters = characters;
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
            throw new P5AsciifyError('Rotation angle must be a number');
        }

        // Normalize angle to 0-360 range
        angle = angle % 360;
        if (angle < 0) angle += 360;

        // Calculate red and green components
        const red = Math.min(255, Math.floor(angle));
        const green = angle > 255 ? Math.floor(angle - 255) : 0;

        this._options.rotationAngle = this._p.color(red, green, 0);
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

        if (!enabled) {
            // Clear all framebuffers
            const framebuffers = [
                this._primaryColorFramebuffer,
                this._secondaryColorFramebuffer,
                this._inversionFramebuffer,
                this._rotationFramebuffer,
                this._characterFramebuffer,
                this._outputFramebuffer
            ]

            for (const framebuffer of framebuffers) {
                framebuffer.begin();
                this._p.clear();
                framebuffer.end();
            }
        }
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
    get characterColorPalette() { return this._characterColorPalette; }
    get outputFramebuffer() { return this._outputFramebuffer; }
    get options() { return this._options; }
    get primaryColorFramebuffer() { return this._primaryColorFramebuffer; }
    get secondaryColorFramebuffer() { return this._secondaryColorFramebuffer; }
    get inversionFramebuffer() { return this._inversionFramebuffer; }
    get rotationFramebuffer() { return this._rotationFramebuffer; }
    get characterFramebuffer() { return this._characterFramebuffer; }
}