import p5 from 'p5';
import { P5AsciifyBrightnessRenderer } from './brightness/BrightnessAsciiRenderer';
import { P5AsciifyAccurateRenderer } from './accurate/AccurateAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './edge/EdgeAsciiRenderer';
import { P5AsciifyGradientRenderer } from './gradient/GradientAsciiRenderer';
import { P5AsciifyRenderer } from './AsciiRenderer';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { AsciiRendererOptions } from './types';
declare const RENDERER_TYPES: {
    readonly brightness: typeof P5AsciifyBrightnessRenderer;
    readonly accurate: typeof P5AsciifyAccurateRenderer;
    readonly gradient: typeof P5AsciifyGradientRenderer;
    readonly edge: typeof P5AsciifyEdgeRenderer;
    readonly custom: typeof P5AsciifyRenderer;
};
type RendererType = keyof typeof RENDERER_TYPES;
/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export declare class P5AsciifyRendererManager {
    /** The p5 instance. */
    private _p;
    /** The grid instance. */
    private _grid;
    /** The font texture atlas instance. */
    private _fontTextureAtlas;
    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    private _currentCanvasDimensions;
    /** The list of available renderers. */
    private _renderers;
    /** The last renderer used in the rendering pipeline. */
    lastRenderer: P5AsciifyRenderer;
    /** The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. */
    private _backgroundColor;
    private _resultFramebuffer;
    constructor(
    /** The p5 instance. */
    _p: p5, 
    /** The grid instance. */
    _grid: P5AsciifyGrid, 
    /** The font texture atlas instance. */
    _fontTextureAtlas: P5AsciifyFontTextureAtlas);
    /**
     * Renders the ASCII output to the result framebuffer.
     *
     * **This method is called internally by the `p5asciify` instance every time the `draw()` function finishes.
     *  Should not be called manually, otherwise causing redundant computations.**
     *
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     */
    render(inputFramebuffer: p5.Framebuffer): void;
    /**
     * Checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     */
    private checkCanvasDimensions;
    /**
     * Resets the dimensions of all renderers.
     *
     * This method is automatically triggered when:
     * - Font properties are modified
     * - Canvas dimensions change
     *
     * These changes affect the grid dimensions, requiring renderer framebuffers to be resized
     * and certain shaders to be reinitialized. Should be redundant to call manually.
     */
    resetRendererDimensions(): void;
    /**
     * Adds a new renderer to the list of renderers.
     * @param name The name of the renderer to add.
     * @param type The type of the renderer to add.
     * @param options The options to use for the renderer.
     * @returns The ASCII renderer instance that was added.
     * @throws {@link P5AsciifyError} - If the renderer name is an empty string or the renderer type is invalid.
     *
     * @example
     * ```javascript
     * let brightnessAsciiRenderer;
     *
     *  function setupAsciify() {
     *      // Clear all existing default renderers provided by `p5.asciify`.
     *      p5asciify.renderers().clear();
     *
     *      // Add a new brightness renderer with custom options.
     *      brightnessAsciiRenderer = p5asciify.renderers().add('brightness', 'brightness', {
     *          enabled: true,
     *          characterColor: '#FF0000',
     *          backgroundColor: '#0000FF',
     *          characterColorMode: "fixed",
     *          backgroundColorMode: "fixed",
     *      });
     *  }
     * ```
     */
    add(name: string, type: RendererType, options: AsciiRendererOptions): P5AsciifyRenderer;
    /**
     * Gets the ASCII renderer instance with the given name.
     * @param rendererName The name of the renderer to get.
     * @returns The ASCII renderer instance with the given name.
     *
     * @example
     * ```javascript
     *  let brightnessRenderer;
     *
     *  function setupAsciify() {
     *      // Get the brightness renderer instance by name.
     *      brightnessRenderer = p5asciify.renderers().get('brightness');
     *
     *      // Use the brightness renderer instance to modify its properties during run-time,
     *      // instead of constantly calling `p5asciify.renderers().get('brightness')`.
     *  }
     * ```
     */
    get(rendererName: string): P5AsciifyRenderer;
    /**
     * Moves a renderer down in the list of renderers, meaning it will be rendered later in the pipeline.
     * @param renderer The renderer to move down in the list.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"brightness"` renderer down in the list of renderers.
     *      p5asciify.renderers().moveDown('brightness');
     *
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    moveDown(renderer: string | P5AsciifyRenderer): void;
    /**
     * Moves a renderer up in the list of renderers, meaning it will be rendered earlier in the pipeline.
     * @param renderer The renderer to move up in the list.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"accurate"` renderer up in the list of renderers.
     *      p5asciify.renderers().moveUp('accurate');
     *
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    moveUp(renderer: string | P5AsciifyRenderer): void;
    /**
     * Removes a renderer from the list of renderers.
     * @param renderer The name of the renderer or the renderer instance itself.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Remove the `"brightness"` renderer from the list of renderers.
     *      p5asciify.renderers().remove('brightness');
     *
     *      // Alternatively, you can also pass the renderer instance itself.
     * }
     * ```
     */
    remove(renderer: string | P5AsciifyRenderer): void;
    /**
     * Clears the list of renderers.
     * Can be useful when you want to start fresh without the default renderers provided by `p5.asciify`.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Clear all existing renderers.
     *      p5asciify.renderers().clear();
     *
     *     // With no renderers, you can add your own custom renderer.
     *     // Otherwise, `p5.asciify` will now render the input image without any ASCII effects.
     *  }
     * ```
     */
    clear(): void;
    /**
     * Swaps the positions of two renderers in the renderer list.
     * @param renderer1 The name of the first renderer or the renderer instance itself.
     * @param renderer2 The name of the second renderer or the renderer instance itself.
     * @throws {@link P5AsciifyError} - If one or more renderers are not found.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Swap the positions of the `"brightness"` and `"accurate"` renderers.
     *      p5asciify.renderers().swap('brightness', 'accurate');
     *
     *      // Alternatively, you can also pass the renderer instances themselves.
     *  }
     * ```
     */
    swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void;
    /**
     * Sets the background color for the ascii renderers.
     *
     * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color to black.
     *      p5asciify.renderers().background('#000000');
     *
     *      // Alternatively, you can also use:
     *      p5asciify.background('#000000');
     *  }
     * ```
     */
    background(color: string | p5.Color | [number, number?, number?, number?]): void;
    /**
     * Enables all renderers in the list of renderers at once,
     * effectively rendering the input image with all ASCII renderers applied.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *     // Enable all default renderers provided by `p5.asciify`.
     *      p5asciify.renderers().enable();
     *  }
     * ```
     */
    enable(): void;
    /**
     * Disables all renderers in the list of renderers at once,
     * effectively rendering the input image without any ASCII renderers applied.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Disable all renderers, effectively rendering the input image without any ASCII effects.
     *      p5asciify.renderers().disable();
     *  }
     * ```
     */
    disable(): void;
    /**
     * Enables or disables all renderers in the list of renderers at once.
     * @param enabled Whether to enable or disable all renderers.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable all default renderers provided by `p5.asciify`.
     *      p5asciify.renderers().enabled(true);
     *  }
     * ```
     */
    enabled(enabled: boolean): void;
    /**
     * Gets the index of a renderer in the list of renderers.
     * @param renderer The renderer to get the index of.
     * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
     */
    private _getRendererIndex;
    /**
     * Returns the list of available renderers.
     */
    get renderers(): {
        name: string;
        renderer: P5AsciifyRenderer;
    }[];
    /**
     * Returns the result framebuffer, which contains the final ASCII output.
     */
    get resultFramebuffer(): p5.Framebuffer;
}
export {};
