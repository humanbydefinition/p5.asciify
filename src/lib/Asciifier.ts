import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyEventEmitter } from './EventEmitter';
import { RendererManager } from './renderers/RendererManager';

export class P5Asciifier {
    private borderColor: string;
    private _fontSize: number;
    public rendererManager: RendererManager;
    private font!: p5.Font;
    private postSetupFunction: (() => void) | null;
    private postDrawFunction: (() => void) | null;
    private p!: p5;
    public asciiFontTextureAtlas!: P5AsciifyFontTextureAtlas;
    public grid!: P5AsciifyGrid;
    private events: P5AsciifyEventEmitter;
    public sketchFramebuffer!: p5.Framebuffer;

    constructor() {
        this.borderColor = "#000000";
        this._fontSize = 16;
        this.rendererManager = new RendererManager();
        this.events = new P5AsciifyEventEmitter();
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
        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas(this.p, this.font, this._fontSize);

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
     * Emit an event with data
     * @param eventName - Name of the event to emit
     * @param data - Data to pass with the event
     */
    public emit(eventName: string, data: any): void {
        this.events.emit(eventName, data);
    }

    /**
     * Register an event listener
     * @param eventName - Name of the event to listen for
     * @param callback - Callback function to execute
     */
    public on(eventName: string, callback: (data: any) => void): void {
        this.events.on(eventName, callback);
    }

    /**
     * Remove an event listener
     * @param eventName - Name of the event to remove
     * @param callback - Callback function to remove
     */
    public off(eventName: string, callback: (data: any) => void): void {
        this.events.off(eventName, callback);
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

    // Getters and setters
    get fontSize(): number { return this._fontSize; }

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
}