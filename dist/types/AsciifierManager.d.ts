import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { HookType } from './types';
import { P5AsciifyRendererPlugin } from './plugins/RendererPlugin';
import { P5AsciifyPluginRegistry } from './plugins/PluginRegistry';
import { P5AsciifyErrorLevel } from './errors/ErrorHandler';
/**
 * Manages the `p5.asciify` library by handling one or more {@link P5Asciifier} instances.
 *
 * This class is implemented as a singleton, meaning only one instance exists throughout the application.
 * Access the instance through the exposed {@link p5asciify} object or via {@link P5AsciifierManager.getInstance}.
 *
 * The manager is responsible for:
 * - Initializing ASCII rendering capabilities
 * - Managing multiple asciifier instances
 * - Coordinating with p5.js rendering lifecycle
 * - Providing an API for creating, accessing, and removing asciifiers
 * - Managing p5.js lifecycle hooks through HookManager
 */
export declare class P5AsciifierManager {
    /** Singleton instance of the manager */
    private static _instance;
    /** The p5.js instance used by the library. */
    private _p;
    /** The list of {@link P5Asciifier} instances managed by the library. */
    private _asciifiers;
    /** The base font used by the library. */
    private _baseFont;
    /** Contains the content that has been drawn to the `p5.js` canvas throughout the `draw()` loop. */
    private _sketchFramebuffer;
    /** The plugin registry instance. */
    private _pluginRegistry;
    /** The hook manager instance. */
    private _hookManager;
    /** Indicates whether the setup phase has been completed. */
    private _setupDone;
    /** The version of the p5.js library used. */
    private _p5Version;
    /** The background color for the ASCII outputs, which is used to fill transparent areas. */
    private _backgroundColor;
    /**
     * Gets the singleton instance of `P5AsciifierManager`.
     */
    static getInstance(): P5AsciifierManager;
    /**
     * Creates a new `P5AsciifierManager` instance.
     */
    private constructor();
    /**
     * Handle initialization hook
     * @ignore
     */
    handleInit(p: p5): Promise<void>;
    /**
     * Handle setup hook
     * @ignore
     */
    handleSetup(p: p5): Promise<void>;
    /**
     * Handle pre-draw hook
     * @ignore
     */
    handlePreDraw(p: p5): void;
    /**
     * Handle post-draw hook
     * @ignore
     */
    handlePostDraw(p: p5): void;
    /**
     * Initializes the `p5.asciify` library by setting the `p5.js` instance.
     *
     * This method is called automatically by the library when the `p5.js` instance is created.
     *
     * **If the `init` hook is disabled, this method will not be called automatically.**
     *
     * @param p The p5.js instance to use for the library.
     */
    init(p: p5): Promise<void>;
    /**
     * Sets up the {@link P5Asciifier} instances managed by the library.
     *
     * This method is called automatically by the library after the `setup()` function of the `p5.js` instance has finished executing.
     *
     * **If the `afterSetup` hook is disabled, this method will not be called automatically.**
     */
    setup(): Promise<void>;
    /**
     * Set the background color when drawing all managed {@link P5Asciifier} instances to the canvas.
     *
     * To make the background transparent, pass an appropriate color value with an alpha value of `0`.
     *
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws If the color is not a string, array or `p5.Color`.
     *
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color to black.
     *      p5asciify.background('#000000');
     *  }
     * ```
     */
    background(color: string | p5.Color | [number, number?, number?, number?]): void;
    /**
     * Sets the font size for all managed {@link P5Asciifier} instances simultaneously.
     * @param size The font size to set for the {@link P5Asciifier} instances.
     */
    fontSize(size: number): void;
    /**
     * Sets the font for all managed {@link P5Asciifier} instances simultaneously.
     * @param font The `p5.Font` instance to set as the font for all managed {@link P5Asciifier} instances.
     */
    font(font: p5.Font): void;
    /**
     * Sets the grid dimensions for all managed {@link P5Asciifier} instances simultaneously.
     * @param gridCols The number of columns in the ASCII grid.
     * @param gridRows The number of rows in the ASCII grid.
     */
    gridDimensions(gridCols: number, gridRows: number): void;
    /**
     * Sets whether the ASCII grid should be responsive to the size of the canvas for all managed {@link P5Asciifier} instances.
     * @param bool If `true`, the ASCII grid will adjust its size based on the canvas dimensions. Otherwise, it will always use the set grid dimensions.
     */
    gridResponsive(bool?: boolean): void;
    /**
     * Sets the background mode for all managed {@link P5Asciifier} instances simultaneously.
     * @param mode The background mode to set for the {@link P5Asciifier} instances.
     */
    backgroundMode(mode?: "fixed" | "sampled"): void;
    /**
     * Executes the ASCII conversion rendering pipelines for each {@link P5Asciifier} instance managed by the library.
     *
     * This method is called automatically by the library after the `draw()` function of the `p5.js` instance has finished executing.
     *
     * **If the `post` hook is disabled, this method will not be called automatically.**
     */
    asciify(): void;
    /**
     * Returns the {@link P5Asciifier} instance at the specified index.
     *
     * When passing no arguments, the method returns the first {@link P5Asciifier} instance in the list,
     * which usually corresponds to the default {@link P5Asciifier} provided by the library, which is applied to the main canvas of the `p5.js` instance.
     *
     * @param index The index of the {@link P5Asciifier} instance to return.
     * @returns The {@link P5Asciifier} instance at the specified index.
     * @throws If the index is out of bounds.
     */
    asciifier(index?: number): P5Asciifier | null;
    /**
     * Adds a new {@link P5Asciifier} instance to the library.
     * @param framebuffer   The framebuffer to capture for ASCII conversion.
     *                      If not provided, the main canvas of the `p5.js` instance will be used.
     * @returns The newly created {@link P5Asciifier} instance, or null if validation fails.
     */
    add(framebuffer?: p5.Framebuffer | p5.Graphics): P5Asciifier | Promise<P5Asciifier | null> | null;
    /**
     * Removes a {@link P5Asciifier} instance.
     * @param indexOrAsciifier The index of the {@link P5Asciifier} instance to remove, or the {@link P5Asciifier} instance itself.
     */
    remove(indexOrAsciifier: number | P5Asciifier): void;
    /**
     * Register a new renderer plugin with p5.asciify
     * @param plugin The renderer plugin to register
     */
    registerPlugin(plugin: P5AsciifyRendererPlugin): void;
    /**
     * Activate a registered hook provided by `p5.asciify`.
     *
     * @param hookType The type of hook to activate
     */
    activateHook(hookType: HookType): void;
    /**
     * Deactivate a registered hook provided by `p5.asciify`.
     * @param hookType The type of hook to deactivate
     */
    deactivateHook(hookType: HookType): void;
    /**
     * Set the global error level for the library.
     *
     * Controls how validation failures and errors are handled throughout p5.asciify.
     * This affects all asciifier instances and library operations.
     *
     * @param level - The error level to set. Use {@link P5AsciifyErrorLevel} enum values.
     *
     * @example
     * ```typescript
     * // Set to warning level for non-critical applications
     * p5asciify.setErrorLevel(P5AsciifyErrorLevel.WARNING);
     *
     * // Silent mode for production environments
     * p5asciify.setErrorLevel(P5AsciifyErrorLevel.SILENT);
     * ```
     *
     * @see {@link P5AsciifyErrorLevel} for detailed descriptions of each level
     */
    setErrorLevel(level: P5AsciifyErrorLevel): void;
    /**
     * Apply shader precision fix for Android devices.
     * This fixes p5.js shaders to use highp precision instead of mediump.
     * Generally fixed in p5.js v1.11.3+, but this provides backwards compatibility.
     * @private
     */
    private _applyShaderPrecisionFix;
    /**
     * Get the plugin registry
     * @returns The plugin registry instance
     */
    get pluginRegistry(): P5AsciifyPluginRegistry;
    /**
     * Returns the list of {@link P5Asciifier} instances managed by the library.
     */
    get asciifiers(): P5Asciifier[];
    /**
     * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
     * @ignore
     */
    get sketchFramebuffer(): p5.Framebuffer;
}
