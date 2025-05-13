import p5 from 'p5';
import { P5AsciifyRenderer } from './AsciiRenderer';
import { P5AsciifyDisplayRenderer } from './AsciiDisplayRenderer';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import { AsciiRendererOptions } from './types';
import { P5AsciifyRendererPlugin } from '../plugins/RendererPlugin';
/**
 * Manages the whole ASCII rendering pipeline.
 */
export declare class P5AsciifyRendererManager {
    /** The p5 instance. */
    private _p;
    /** The framebuffer containing the content to be asciified. */
    private _captureFramebuffer;
    /** The grid instance. */
    private _grid;
    /** The font texture atlas instance. */
    private _fontManager;
    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    private _currentCanvasDimensions;
    /** The list of available renderers. */
    private _renderers;
    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    private _primaryColorFramebuffer;
    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    private _secondaryColorFramebuffer;
    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    private _characterFramebuffer;
    /** The transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     */
    private _transformFramebuffer;
    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    private _rotationFramebuffer;
    private _asciiDisplayRenderer2D;
    /** Whether any renderers are enabled. */
    private _hasEnabledRenderers;
    /**
     * Registered plugin renderers
     */
    private static _plugins;
    /**
     * Creates a new ASCII renderer manager instance.
     * @param _p The p5 instance.
     * @param _grid The grid instance.
     * @param _fontManager The font texture atlas instance.
     * @ignore
     */
    constructor(
    /** The p5 instance. */
    _p: p5, 
    /** The framebuffer containing the content to be asciified. */
    _captureFramebuffer: p5.Framebuffer, 
    /** The grid instance. */
    _grid: P5AsciifyGrid, 
    /** The font texture atlas instance. */
    _fontManager: P5AsciifyFontManager);
    /**
     * Runs all renderers in the pipeline, merging their framebuffers together,
     * and passing them to the ASCII display renderer for final rendering.
     *
     * All {@link P5Asciifier} instances and their renderer managers call this method automatically
     * after the user's `draw()` function when part of the {@link P5AsciifierManager} instance {@link p5asciify}.
     *
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     *
     * @ignore
     */
    render(inputFramebuffer: p5.Framebuffer): void;
    /**
     * Checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     *
     * Is called automatically when {@link render} is called
     * and the canvas dimensions are different to the previous {@link render} call.
     */
    private checkCanvasDimensions;
    /**
     * Resets the dimensions of all renderers.
     *
     * Is called automatically when {@link render} is called
     * and the canvas dimensions are different to the previous {@link render} call.
     *
     * @ignore
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
     *  let asciifier;
     *  let brightnessAsciiRenderer;
     *
     *  function setupAsciify() {
     *      asciifier = p5asciify.asciifier();
     *
     *      // Remove all existing default renderers provided by `p5.asciify`.
     *      asciifier.renderers().clear();
     *
     *      // Add a new brightness renderer with custom options.
     *      brightnessAsciiRenderer = asciifier.renderers().add('brightness', 'brightness', {
     *          enabled: true,
     *          characterColor: '#FF0000',
     *          backgroundColor: '#0000FF',
     *          characterColorMode: "fixed",
     *          backgroundColorMode: "fixed",
     *      });
     *  }
     * ```
     */
    add(name: string, type: string, options: AsciiRendererOptions): P5AsciifyRenderer;
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
     *      brightnessRenderer = p5asciify.asciifier().renderers().get('brightness');
     *
     *      // Use the brightness renderer instance to modify its properties during run-time,
     *      // instead of constantly calling `p5asciify.asciifier().renderers().get('brightness')`.
     *  }
     * ```
     */
    get(rendererName: string): P5AsciifyRenderer;
    /**
     * Gets a list of all available renderer types (built-in and plugins)
     * @returns An array of available renderer type IDs
     */
    getAvailableRendererTypes(): string[];
    /**
     * Moves a renderer down in the list of renderers, meaning it will be rendered earlier in the pipeline.
     * @param renderer The renderer to move down in the list.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"brightness"` renderer down in the list of renderers.
     *      p5asciify.asciifier().renderers().moveDown('brightness');
     *
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    moveDown(renderer: string | P5AsciifyRenderer): void;
    /**
     * Moves a renderer up in the list of renderers, meaning it will be rendered later in the pipeline.
     * @param renderer The renderer to move up in the list.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"accurate"` renderer up in the list of renderers.
     *      p5asciify.asciifier().renderers().moveUp('accurate');
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
     *      p5asciify.asciifier().renderers().remove('brightness');
     *
     *      // Alternatively, you can also pass the renderer instance itself.
     * }
     * ```
     */
    remove(renderer: string | P5AsciifyRenderer): void;
    /**
     * Clears the list of renderers.
     * Can be useful when you want to start fresh without the default renderers provided by the library.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Clear all existing renderers.
     *      p5asciify.asciifier().renderers().clear();
     *
     *     // With no renderers, you can add your own custom renderer.
     *     // Otherwise, `p5.asciify` will now render the input image without any ASCII conversion.
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
     *      p5asciify.asciifier().renderers().swap('brightness', 'accurate');
     *
     *      // Alternatively, you can also pass the renderer instances themselves.
     *  }
     * ```
     */
    swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void;
    /**
     * Enables all renderers in the list of renderers at once.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *     // Enable all default renderers provided by `p5.asciify`.
     *      p5asciify.asciifier().renderers().enable();
     *  }
     * ```
     */
    enable(): void;
    /**
     * Disables all renderers in the list of renderers at once.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Disable all renderers in the list.
     *      p5asciify.asciifier().renderers().disable();
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
     *      p5asciify.asciifier().renderers().enabled(true);
     *  }
     * ```
     */
    enabled(enabled: boolean): void;
    /**
     * Registers a new renderer plugin.
     * @param plugin The renderer plugin to register
     * @throws {@link P5AsciifyError} - If a plugin with the same ID is already registered
     */
    static registerPlugin(plugin: P5AsciifyRendererPlugin): void;
    /**
     * Gets the index of a renderer in the list of renderers.
     * @param renderer The renderer to get the index of.
     * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
     */
    private _getRendererIndex;
    /**
     * Returns the list of renderers in the pipeline.
     *
     * The first renderer in the list is executed last, and the last renderer in the list is executed first.
     */
    get renderers(): {
        name: string;
        renderer: P5AsciifyRenderer;
    }[];
    /**
     * Returns the {@link P5AsciifyDisplayRenderer} instance which performs the final ASCII conversion.
     */
    get asciiDisplayRenderer(): P5AsciifyDisplayRenderer;
    /**
     * Returns the primary color framebuffer,
     * which contains the primary color framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get characterFramebuffer(): p5.Framebuffer;
    /**
     * Returns the primary color framebuffer,
     * which contains the primary color framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get primaryColorFramebuffer(): p5.Framebuffer;
    /**
     * Returns the secondary color framebuffer,
     * which contains the secondary color framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get secondaryColorFramebuffer(): p5.Framebuffer;
    /**
     * Returns the inversion framebuffer,
     * which contains the inversion framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get transformFramebuffer(): p5.Framebuffer;
    /**
     * Returns the rotation framebuffer,
     * which contains the rotation framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get rotationFramebuffer(): p5.Framebuffer;
    /**
     * Returns a boolean indicating whether any renderers are enabled in the pipeline.
     */
    get hasEnabledRenderers(): boolean;
}
