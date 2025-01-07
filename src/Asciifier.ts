import P5AsciifyFontTextureAtlas from './fontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyEventEmitter } from './EventEmitter';
import { RendererManager } from './managers/RendererManager';
import p5 from 'p5';

export class Asciifier {
    private borderColor: string;
    private fontSize: number;
    private rendererManager: RendererManager;
    private font: p5.Font | null;
    private postSetupFunction: (() => void) | null;
    private postDrawFunction: (() => void) | null;
    private p: p5;
    private asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    private grid: P5AsciifyGrid;
    private events: P5AsciifyEventEmitter;
    private sketchFramebuffer: p5.Framebuffer;

    constructor() {
        this.borderColor = "#000000";
        this.fontSize = 16;
        this.rendererManager = new RendererManager();
        this.events = new P5AsciifyEventEmitter();
        this.font = null;
        this.postSetupFunction = null;
        this.postDrawFunction = null;
    }

    /**
     * Initialize the p5 instance for the Asciifier
     * @param p - The p5 instance
     */
    public instance(p: p5): void {
        this.p = p;
        this.p.preload = () => { }; // Define a default preload function
    }

    public addP5Instance(p: p5): void {
        this.p = p;
        this.rendererManager.gradientManager.addInstance(this.p);
    }

    /**
     * Sets up the P5Asciify library with the specified options
     */
    public setup(): void {
        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas({
            p5Instance: this.p,
            font: this.font,
            fontSize: this.fontSize
        });

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
}