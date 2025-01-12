import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyEventEmitter } from './EventEmitter';
import { RendererManager } from './renderers/RendererManager';
export declare class P5Asciifier {
    private borderColor;
    private _fontSize;
    rendererManager: RendererManager;
    private _font;
    private postSetupFunction;
    private postDrawFunction;
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    grid: P5AsciifyGrid;
    eventEmitter: P5AsciifyEventEmitter;
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
     * Runs the rendering pipeline for the P5Asciify library
     */
    asciify(): void;
    /**
     * Sets the font size for the ascii renderers
     */
    set fontSize(fontSize: number);
    /**
     * Sets the font for the ascii renderers
     */
    set font(font: p5.Font);
    get fontSize(): number;
    get font(): p5.Font;
}
