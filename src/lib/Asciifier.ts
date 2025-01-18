import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { RendererManager } from './renderers/RendererManager';

/**
 * The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.
 */
export class P5Asciifier {
    public borderColor: string;
    private _fontSize: number;
    public rendererManager!: RendererManager;
    private _font!: p5.Font;
    private p!: p5;
    public asciiFontTextureAtlas!: P5AsciifyFontTextureAtlas;
    public grid!: P5AsciifyGrid;
    public sketchFramebuffer!: p5.Framebuffer;

    constructor() {
        this.borderColor = "#000000";
        this._fontSize = 16;
    }

    /**
     * Initialize the p5 instance for the Asciifier
     * @param p The p5 instance
     */
    public instance(p: p5, addDummyPreloadFunction: boolean = true): void {
        this.p = p;
        this.p.p5asciify = this;

        if (!p.preload && addDummyPreloadFunction) {
            p.preload = () => { };
        }
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

        this.rendererManager = new RendererManager(this.p, this.grid, this.asciiFontTextureAtlas);

        this.sketchFramebuffer = this.p.createFramebuffer({
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });
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

            this.rendererManager.resetRendererDimensions();
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
            this.rendererManager.renderers.forEach(renderer => renderer.characterSet.reset());

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