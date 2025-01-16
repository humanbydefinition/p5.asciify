import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { RendererManager } from './renderers/RendererManager';
/**
 * The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.
 */
export declare class P5Asciifier {
    borderColor: string;
    private _fontSize;
    rendererManager: RendererManager;
    private _font;
    postSetupFunction: (() => void) | null;
    postDrawFunction: (() => void) | null;
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    grid: P5AsciifyGrid;
    sketchFramebuffer: p5.Framebuffer;
    constructor();
    /**
     * Initialize the p5 instance for the Asciifier
     * @param p The p5 instance
     */
    instance(p: p5, addDummyPreloadFunction?: boolean): void;
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
     * @param fontSize The font size to set
     */
    set fontSize(fontSize: number);
    /**
     * Sets the font for the ascii renderers
     * @param font The font to set
     */
    set font(font: p5.Font);
    get fontSize(): number;
    get font(): p5.Font;
}
