import p5 from 'p5';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyFontManager } from '../../FontManager';
import { P5AsciifyRenderer } from '../AsciiRenderer';
import { AsciiRendererOptions } from '../types';
/**
 * Default configuration options for `"custom2D"` ASCII renderer.
 *
 * If there are options not provided during the creation of the renderer, the default options will be used.
 */
export declare const CUSTOM_DEFAULT_OPTIONS_2D: {
    /** Enable/disable the renderer */
    enabled: boolean;
};
/**
 * ASCII renderer for custom 2D rendering.
 */
export declare class P5AsciifyRenderer2D<T extends AsciiRendererOptions = AsciiRendererOptions> extends P5AsciifyRenderer<T> {
    /**
     * Creates a new `"custom2D"` ASCII renderer instance.
     * @param _p The p5 instance.
     * @param _grid Grid object containing the relevant grid information.
     * @param _fontManager The font texture atlas containing the ASCII characters texture.
     * @param _options The options for the ASCII renderer.
     * @ignore
     */
    constructor(p: p5, captureFramebuffer: p5.Framebuffer, grid: P5AsciifyGrid, fontManager: P5AsciifyFontManager, options?: T);
    resetShaders(): void;
    /**
     * Resize the framebuffers to match the 2D grid size based on the number of rows and columns.
     * @ignore
     */
    resizeFramebuffers(): void;
}
