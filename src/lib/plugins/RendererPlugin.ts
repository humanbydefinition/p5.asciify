import { P5AsciifyRenderer } from '../renderers/AsciiRenderer';
import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import { AsciiRendererOptions } from '../renderers/types';

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
    
    /** Creates a new instance of the plugin renderer */
    create(
        p: p5, 
        captureFramebuffer: p5.Framebuffer, 
        grid: P5AsciifyGrid, 
        fontManager: P5AsciifyFontManager, 
        options?: AsciiRendererOptions
    ): P5AsciifyRenderer;
}