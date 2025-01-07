import p5 from 'p5';
import { validateOptions } from "../validators/OptionsValidator";
import { P5AsciifyGrid } from '../Grid';
import P5AsciifyCharacterSet from '../CharacterSet';

/**
 * Abstract class for ASCII Renderers.
 */
export abstract class AsciiRenderer {
    protected p: p5;
    protected grid: P5AsciifyGrid;
    protected characterSet: P5AsciifyCharacterSet;
    protected options: AsciiRendererOptions;

    protected primaryColorSampleFramebuffer: p5.RendererGL;
    protected secondaryColorSampleFramebuffer: p5.RendererGL;
    protected asciiCharacterFramebuffer: p5.RendererGL;
    protected outputFramebuffer: p5.RendererGL;

    /**
     * Constructor for AsciiRenderer.
     * @param p5Instance - The p5.js instance.
     * @param grid - The grid instance.
     * @param characterSet - The character set instance.
     * @param options - Renderer-specific options.
     */
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
        this.options = options;

        this.primaryColorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        }) as p5.RendererGL;

        this.secondaryColorSampleFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        }) as p5.RendererGL;

        this.asciiCharacterFramebuffer = this.p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        }) as p5.RendererGL;

        this.outputFramebuffer = this.p.createFramebuffer({
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        }) as p5.RendererGL;
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
    protected abstract resetShaders(): void;

    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    public updateOptions(newOptions: Partial<AsciiRendererOptions>): void {
        validateOptions(this.p, newOptions);

        this.options = {
            ...this.options,
            ...newOptions
        };

        // If we are still in the user's setup(), the characterSet and grid have not been initialized yet.
        if (!(this.p as any)._setupDone) { // Adjust based on actual p5 instance properties
            return;
        }

        if (newOptions?.characters) {
            this.characterSet.setCharacterSet(newOptions.characters);
            this.resetShaders();
        }

        /**
         * Uncomment and implement additional option handlers as needed.
         * 
         * if (newOptions?.characterColorMode !== undefined) {
         *     this.textAsciiRenderer.updateCharacterColorMode();
         * }
         * 
         * if (newOptions?.characterColor !== undefined) {
         *     this.textAsciiRenderer.updateCharacterColor();
         * }
         * 
         * if (newOptions?.backgroundColor !== undefined) {
         *     this.textAsciiRenderer.updateBackgroundColor();
         * }
         * 
         * if (newOptions?.invertMode !== undefined) {
         *     this.textAsciiRenderer.updateInvertMode();
         * }
         * 
         * if (newOptions?.enabled !== undefined) {
         *     this.textAsciiRenderer.toggleVisibility();
         * }
         */
    }

    /**
     * Render ASCII based on the input framebuffer.
     * @param inputFramebuffer - The input framebuffer to base ASCII rendering on.
     */
    public abstract render(inputFramebuffer: p5.RendererGL): void;

    /**
     * Get the framebuffer containing the ASCII-rendered output.
     * @returns The output framebuffer.
     */
    public getOutputFramebuffer(): p5.RendererGL {
        return this.outputFramebuffer;
    }
}