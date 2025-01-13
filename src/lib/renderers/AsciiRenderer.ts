import p5 from 'p5';
import { validateOptions } from "../validators/OptionsValidator";
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyCharacterSet } from '../CharacterSet';

export interface AsciiRendererOptions {
    enabled: boolean;
    characters: string;
    characterColorMode: number;
    characterColor: p5.Color;
    backgroundColorMode: number;
    backgroundColor: p5.Color;
    invertMode: number;
    rotationAngle: number;
}

/**
 * Abstract class for shader-based ASCII Renderers.
 */
export abstract class AsciiRenderer<T extends AsciiRendererOptions = AsciiRendererOptions> {

    protected _primaryColorSampleFramebuffer: p5.Framebuffer;
    protected _secondaryColorSampleFramebuffer: p5.Framebuffer;
    protected _asciiCharacterFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;

    constructor(
        private p: p5,
        private grid: P5AsciifyGrid,
        public characterSet: P5AsciifyCharacterSet,
        private _options: T
    ) {
        if (new.target === AsciiRenderer) {
            throw new TypeError("Cannot construct AsciiRenderer instances directly");
        }

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
     */
    public abstract render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;

    // Getters
    get outputFramebuffer() { return this._outputFramebuffer; }
    get options() { return this._options; }
    get primaryColorSampleFramebuffer() { return this._primaryColorSampleFramebuffer; }
    get secondaryColorSampleFramebuffer() { return this._secondaryColorSampleFramebuffer; }
    get asciiCharacterFramebuffer() { return this._asciiCharacterFramebuffer; }
}