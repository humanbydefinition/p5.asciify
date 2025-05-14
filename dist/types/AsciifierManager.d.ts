import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { P5AsciifyRendererPlugin } from './plugins/RendererPlugin';
import { P5AsciifyPluginRegistry } from './plugins/PluginRegistry';
/**
 * Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances.
 *
 * This class is implemented as a singleton, meaning only one instance exists throughout the application.
 * Access the instance through the exposed {@link p5asciify} object or via {@link P5AsciifierManager.getInstance}.
 *
 * The manager is responsible for:
 * - Initializing ASCII rendering capabilities
 * - Managing multiple asciifier instances
 * - Coordinating with p5.js rendering lifecycle
 * - Providing an API for creating, accessing, and removing asciifiers
 */
export declare class P5AsciifierManager {
    /** Singleton instance of the manager */
    private static _instance;
    /** The p5.js instance used by the library. */
    private _p;
    /** The list of `P5Asciifier` instances managed by the library. */
    private _asciifiers;
    /** The base font used by the library. */
    private _baseFont;
    /** Defines whether the hooks are enabled or not. */
    private _hooksEnabled;
    /** Contains the content that has been drawn to the `p5.js` canvas throughout the `draw()` loop. */
    private _sketchFramebuffer;
    /** The plugin registry instance. */
    private _pluginRegistry;
    /**
     * Gets the singleton instance of `P5AsciifierManager`.
     * If the instance doesn't exist yet, it creates one.
     *
     * @returns The singleton instance of `P5AsciifierManager`.
     */
    static getInstance(): P5AsciifierManager;
    /**
     * Creates a new `P5AsciifierManager` instance.
     * @ignore
     */
    private constructor();
    /**
     * Initializes the `p5.asciify` library by setting the `p5.js` instance.
     *
     * For the provided {@link p5asciify} object this method is called automatically when the library is imported.
     *
     * @param p The p5.js instance to use for the library.
     * @ignore
     */
    init(p: p5): Promise<void>;
    /**
     * Sets up the `P5Asciifier` instances managed by the library.
     *
     * For the provided {@link p5asciify} object this method is called automatically when the users `setup` function finished executing.
     * @ignore
     */
    setup(): Promise<void>;
    /**
     * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
     *
     * For the provided {@link p5asciify} object this method is called automatically when the users `draw` function finished executing.
     *
     * @ignore
     */
    asciify(): void;
    /**
     * Returns the `P5Asciifier` instance at the specified index.
     *
     * When passing no arguments, the method returns the first `P5Asciifier` instance in the list,
     * which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.
     *
     * @param index The index of the `P5Asciifier` instance to return.
     * @returns The `P5Asciifier` instance at the specified index.
     * @throws {@link P5AsciifyError} If the index is out of bounds.
     */
    asciifier(index?: number): P5Asciifier;
    /**
     * Adds a new `P5Asciifier` instance to the library.
     * @param framebuffer   The framebuffer to capture for ASCII conversion.
     *                      If not provided, the main canvas of the `p5.js` instance will be used.
     * @returns The newly created `P5Asciifier` instance.
     * @throws {@link P5AsciifyError} If the framebuffer is not an instance of `p5.Framebuffer`.
     */
    add(framebuffer?: p5.Framebuffer): P5Asciifier | Promise<P5Asciifier>;
    /**
     * Removes a `P5Asciifier` instance.
     * @param indexOrAsciifier The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself.
     * @throws {@link P5AsciifyError} If the index is out of bounds or the specified asciifier is not found.
     */
    remove(indexOrAsciifier: number | P5Asciifier): void;
    /**
     * Sets hooks status. This method should be called if you need to manually
     * enable or disable the automatic pre/post draw hooks.
     *
     * @param enabled Whether the hooks should be enabled
     * @ignore
     */
    setHooksEnabled(enabled: boolean): void;
    /**
     * Register a new renderer plugin with p5.asciify
     * @param plugin The renderer plugin to register
     */
    registerPlugin(plugin: P5AsciifyRendererPlugin): void;
    /**
     * Get the plugin registry
     * @returns The plugin registry instance
     */
    get pluginRegistry(): P5AsciifyPluginRegistry;
    /**
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[];
    /**
     * Returns `true` if the hooks are enabled, `false` otherwise.
     * @ignore
     */
    get hooksEnabled(): boolean;
    /**
     * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
     * @ignore
     */
    get sketchFramebuffer(): p5.Framebuffer;
}
