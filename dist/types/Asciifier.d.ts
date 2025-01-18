import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
import { P5AsciifyGrid } from './Grid';
import { RendererManager } from './renderers/RendererManager';
import { GradientType } from './gradients/types';
import { P5AsciifyGradient } from './gradients/Gradient';
/**
 * The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.
 */
export declare class P5Asciifier {
    private _borderColor;
    private _fontSize;
    rendererManager: RendererManager;
    private _font;
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    grid: P5AsciifyGrid;
    sketchFramebuffer: p5.Framebuffer;
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
     * Adds a new gradient to the renderer managers gradient manager, which will be rendered by the GradientAsciiRenderer.
     * @param gradientName The name of the gradient.
     * @param brightnessStart The brightness value at which the gradient starts.
     * @param brightnessEnd The brightness value at which the gradient ends.
     * @param characters The characters to use for the gradient.
     * @param userParams Optional parameters to pass to the gradient.
     */
    addAsciiGradient(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, userParams?: Record<string, any>): P5AsciifyGradient;
    /**
     * Sets the font size for the ascii renderers
     * @param fontSize The font size to set
     */
    set fontSize(fontSize: number);
    /**
     * Sets the font for the ascii renderers.
     * @param font The font to set.
     */
    set font(font: string | p5.Font);
    /**
     * Sets the border color for the ascii renderers.
     * @param color The color to set.
     * @throws {P5AsciifyError} If the color is not a string, array or p5.Color.
     */
    set borderColor(color: string | p5.Color | [number, number?, number?, number?]);
    get fontSize(): number;
    get font(): p5.Font;
    get borderColor(): string | p5.Color | [number, number?, number?, number?];
}
