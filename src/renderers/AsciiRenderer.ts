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
export abstract class AsciiRenderer {
    protected p: p5;
    protected grid: P5AsciifyGrid;
    protected characterSet: P5AsciifyCharacterSet;
    protected _options: AsciiRendererOptions;

    protected primaryColorSampleFramebuffer: p5.Framebuffer;
    protected secondaryColorSampleFramebuffer: p5.Framebuffer;
    protected asciiCharacterFramebuffer: p5.Framebuffer;
    protected _outputFramebuffer: p5.Framebuffer;

    constructor(
        p5Instance: p5,
        grid: P5AsciifyGrid,
        characterSet: P5AsciifyCharacterSet,
        options: AsciiRendererOptions
    ) {
        if (new.target === AsciiRenderer) {
            throw new TypeError("Cannot construct AsciiRenderer instances directly");
        }

        this.p = p5Instance;
        this.grid = grid;
        this.characterSet = characterSet;
        this._options = options;

        this.primaryColorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this.secondaryColorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this.asciiCharacterFramebuffer = this.p.createFramebuffer({
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
        this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    /**
     * Resets shaders. To be implemented by subclasses.
     */
    protected resetShaders(): void {

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
     * Render ASCII based on the input framebuffer.
     * @param inputFramebuffer - The input framebuffer to base ASCII rendering on.
     */
    public abstract render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;

    // Getters
    get outputFramebuffer() { return this._outputFramebuffer; }
    get options() { return this._options; }
}