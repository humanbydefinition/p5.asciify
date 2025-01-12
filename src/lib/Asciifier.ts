import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyEventEmitter } from './EventEmitter';
import { RendererManager } from './renderers/RendererManager';

/**
 * The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.
 */
export class P5Asciifier {
    private borderColor: string;
    private _fontSize: number;
    public rendererManager: RendererManager;
    private _font!: p5.Font;
    private postSetupFunction: (() => void) | null;
    private postDrawFunction: (() => void) | null;
    private p!: p5;
    public asciiFontTextureAtlas!: P5AsciifyFontTextureAtlas;
    public grid!: P5AsciifyGrid;
    public eventEmitter: P5AsciifyEventEmitter;
    public sketchFramebuffer!: p5.Framebuffer;

    constructor() {
        this.borderColor = "#000000";
        this._fontSize = 16;
        this.rendererManager = new RendererManager();
        this.eventEmitter = new P5AsciifyEventEmitter();
        this.postSetupFunction = null;
        this.postDrawFunction = null;
    }

    /**
     * Initialize the p5 instance for the Asciifier
     * @param p The p5 instance
     */
    public instance(p: p5): void {
        this.p = p;

        if (!this.p.preload) {
            this.p.preload = () => { }; // Define a default preload function
        }

        this.rendererManager.gradientManager.addInstance(this.p);
    }

    /**
     * Adds the p5 instance in p5.js global mode. Is called automatically on init by p5.js.
     * Currently a bit confusing with the `instance()` method above, which is relevant for instance mode,
     * where the user has to call it manually.
     * @param p The p5 instance
     */
    public addP5Instance(p: p5): void {
        if (!this.p) {
            this.p = p;
        }

        this.rendererManager.gradientManager.addInstance(this.p);
    }

    /**
     * Sets up the P5Asciify library with the specified options
     */
    public setup(): void {
        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas(this.p, this._font, this._fontSize);

        this.grid = new P5AsciifyGrid(
            this.p,
            this.asciiFontTextureAtlas.maxGlyphDimensions.width,
            this.asciiFontTextureAtlas.maxGlyphDimensions.height
        );

        this.rendererManager.setup(this.p, this.grid, this.asciiFontTextureAtlas);

        this.sketchFramebuffer = this.p.createFramebuffer({
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        if (this.postSetupFunction) {
            this.postSetupFunction();
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library
     */
    public asciify(): void {
        this.rendererManager.render(this.sketchFramebuffer, this.borderColor);

        if (this.postDrawFunction) {
            this.postDrawFunction();
        }
    }

    /**
     * Sets the font size for the ascii renderers
     * @param fontSize The font size to set
     */
    set fontSize(fontSize: number) {
        this._fontSize = fontSize;

        if (this.p._setupDone) {
            this.asciiFontTextureAtlas.setFontSize(fontSize);
            this.grid.resizeCellPixelDimensions(
                this.asciiFontTextureAtlas.maxGlyphDimensions.width,
                this.asciiFontTextureAtlas.maxGlyphDimensions.height
            );

            this.rendererManager.renderers.forEach(renderer => renderer.resizeFramebuffers());

            this.rendererManager.renderers.forEach(renderer => renderer.resetShaders());
        }
    }

    /**
     * Sets the font for the ascii renderers
     * @param font The font to set
     */
    set font(font: p5.Font) {
        this._font = font;

        if (this.p._setupDone) {
            this.asciiFontTextureAtlas.setFontObject(font);
            this.rendererManager.renderers.forEach(renderer => renderer.characterSet.setCharacterSet(renderer.characterSet.characters));

            this.grid.resizeCellPixelDimensions(
                this.asciiFontTextureAtlas.maxGlyphDimensions.width,
                this.asciiFontTextureAtlas.maxGlyphDimensions.height
            );
        }
    }

    // Getters
    get fontSize(): number { return this._fontSize; }
    get font(): p5.Font { return this._font; }
}