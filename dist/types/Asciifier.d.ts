import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { RendererManager } from './renderers/RendererManager';
export declare class P5Asciifier {
    private borderColor;
    private _fontSize;
    rendererManager: RendererManager;
    private font;
    private postSetupFunction;
    private postDrawFunction;
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    grid: P5AsciifyGrid;
    private events;
    sketchFramebuffer: p5.Framebuffer;
    constructor();
    /**
     * Initialize the p5 instance for the Asciifier
     * @param p The p5 instance
     */
    instance(p: p5): void;
    /**
     * Adds the p5 instance in p5.js global mode. Is called automatically on init by p5.js.
     * Currently a bit confusing with the `instance()` method above, which is relevant for instance mode,
     * where the user has to call it manually.
     * @param p The p5 instance
     */
    addP5Instance(p: p5): void;
    /**
     * Sets up the P5Asciify library with the specified options
     */
    setup(): void;
    /**
     * Emit an event with data
     * @param eventName - Name of the event to emit
     * @param data - Data to pass with the event
     */
    emit(eventName: string, data: any): void;
    /**
     * Register an event listener
     * @param eventName - Name of the event to listen for
     * @param callback - Callback function to execute
     */
    on(eventName: string, callback: (data: any) => void): void;
    /**
     * Remove an event listener
     * @param eventName - Name of the event to remove
     * @param callback - Callback function to remove
     */
    off(eventName: string, callback: (data: any) => void): void;
    /**
     * Runs the rendering pipeline for the P5Asciify library
     */
    asciify(): void;
    get fontSize(): number;
    set fontSize(fontSize: number);
}
