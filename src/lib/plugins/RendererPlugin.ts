import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../managers/FontManager';
import { FeatureAsciiRendererOptions } from '../renderers/types';
import { P5AsciifyAbstractFeatureRenderer2D } from '../renderers/2d/feature';
import { P5AsciifyRenderer2D } from '../renderers/2d';
import { P5AsciifyRenderer } from '../renderers';

/**
 * Interface that all p5.asciify renderer plugins must implement.
 */
export interface P5AsciifyRendererPlugin {
    /** Unique identifier for the renderer type */
    readonly id: string;

    /** Human-readable name of the renderer */
    readonly name: string;
    
    /** Description of what the renderer does */
    readonly description: string;
    
    /** Version of the plugin */
    readonly version: string;

    /** Author of the plugin */
    readonly author: string;
    
    /**
     * Creates a new instance of the renderer.
     * @param p The p5 instance.
     * @param captureFramebuffer The framebuffer containing the content to asciify.
     * @param grid The grid to use for the asciification.
     * @param fontManager The font manager to use.
     * @param options Optional options for the renderer.
     * @returns A new instance of the renderer.
     */
    create(
        p: p5, 
        captureFramebuffer: p5.Framebuffer, 
        grid: P5AsciifyGrid, 
        fontManager: P5AsciifyFontManager, 
        options?: FeatureAsciiRendererOptions
    ): P5AsciifyAbstractFeatureRenderer2D | P5AsciifyRenderer2D | P5AsciifyRenderer;
}