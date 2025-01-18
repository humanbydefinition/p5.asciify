import p5 from 'p5';

import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { P5AsciifyRendererManager } from './renderers/RendererManager';
import { P5AsciifyError } from './AsciifyError';
import { FONT_SIZE_LIMITS } from './constants';
import { GradientType } from './gradients/types';
import { validateGradientParams } from './validators/GradientValidator';
import { P5AsciifyGradient } from './gradients/Gradient';

/**
 * The main class for the p5.asciify library. 
 * This class is responsible for setting up the library, and managing its properties.
 * 
 * @remarks
 * The P5Asciifier class is initialized without any parameters.
 * 
 * Once the p5.js instance is available, the instance() method is called automatically 
 * to pass the p5 instance to the Asciifier.
 * 
 * After the users `setup()` function has finished, the Asciifier's `setup()` method 
 * is called automatically to fully initialize the library.
 * 
 * At this point, the p5.asciify is fully functional and ready to interact with.
 */
export class P5Asciifier {
    private _borderColor!: string | p5.Color | [number, number?, number?, number?];
    private _fontSize!: number;
    public rendererManager!: P5AsciifyRendererManager;
    private _font!: p5.Font;
    private p!: p5;
    public asciiFontTextureAtlas!: P5AsciifyFontTextureAtlas;
    public grid!: P5AsciifyGrid;
    public sketchFramebuffer!: p5.Framebuffer;

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
        this._borderColor = "#000000";
        this._fontSize = 16;

        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas(this.p, this._font, this._fontSize);

        this.grid = new P5AsciifyGrid(
            this.p,
            this.asciiFontTextureAtlas.maxGlyphDimensions.width,
            this.asciiFontTextureAtlas.maxGlyphDimensions.height
        );

        this.rendererManager = new P5AsciifyRendererManager(this.p, this.grid, this.asciiFontTextureAtlas);

        this.sketchFramebuffer = this.p.createFramebuffer({
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });
    }

    /**
     * Adds a new gradient to the renderer managers gradient manager, which will be rendered by the GradientAsciiRenderer.
     * @param gradientName The name of the gradient.
     * @param brightnessStart The brightness value at which the gradient starts.
     * @param brightnessEnd The brightness value at which the gradient ends.
     * @param characters The characters to use for the gradient.
     * @param userParams Optional parameters to pass to the gradient.
     */
    public addAsciiGradient(
        gradientName: GradientType,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        userParams: Record<string, any> = {}
    ): P5AsciifyGradient {
        validateGradientParams(
            this.rendererManager.gradientManager,
            gradientName,
            brightnessStart,
            brightnessEnd,
            characters,
            userParams
        );

        return this.rendererManager.gradientManager.addGradient(
            gradientName,
            brightnessStart,
            brightnessEnd,
            characters,
            userParams
        );
    }

    /**
     * Sets the font size for the ascii renderers
     * @param fontSize The font size to set
     */
    set fontSize(fontSize: number) {

        if (fontSize < FONT_SIZE_LIMITS.MIN || fontSize > FONT_SIZE_LIMITS.MAX) {
            throw new P5AsciifyError(`Font size ${fontSize} is out of bounds. It should be between ${FONT_SIZE_LIMITS.MIN} and ${FONT_SIZE_LIMITS.MAX}.`);
        }

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
     * Sets the font for the ascii renderers.
     * @param font The font to set.
     */
    set font(font: string | p5.Font) {
        if (typeof font !== 'string' && !(font instanceof p5.Font)) {
            throw new P5AsciifyError('Invalid font parameter. Expected a path, base64 string, or p5.Font object.');
        }

        if (typeof font === 'string') {
            this.p.loadFont(
                font,
                (loadedFont: p5.Font) => {
                    this._font = loadedFont;
                    this.p._decrementPreload();
                },
                () => { throw new P5AsciifyError(`Failed to load font from path: '${font}'`); }
            );
        } else {
            this._font = font;
        }

        if (this.p._setupDone) {
            this.asciiFontTextureAtlas.setFontObject(font as p5.Font);
            this.rendererManager.renderers.forEach(renderer => renderer.characterSet.reset());

            this.grid.resizeCellPixelDimensions(
                this.asciiFontTextureAtlas.maxGlyphDimensions.width,
                this.asciiFontTextureAtlas.maxGlyphDimensions.height
            );
        }
    }

    /**
     * Sets the border color for the ascii renderers.
     * @param color The color to set.
     * @throws {P5AsciifyError} If the color is not a string, array or p5.Color.
     */
    set borderColor(color: string | p5.Color | [number, number?, number?, number?]) {
        if (typeof color !== "string" && !Array.isArray(color) && !(color instanceof p5.Color)) {
            throw new P5AsciifyError(`Invalid color type: ${typeof color}. Expected string, array or p5.Color.`);
        }

        this._borderColor = color;
    }

    // Getters
    get fontSize(): number { return this._fontSize; }
    get font(): p5.Font { return this._font; }
    get borderColor(): string | p5.Color | [number, number?, number?, number?] { return this._borderColor; }
}