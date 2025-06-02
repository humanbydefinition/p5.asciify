import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { P5HookManager, HookType } from './HookManager';
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
 * - Managing p5.js lifecycle hooks
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
    /** Contains the content that has been drawn to the `p5.js` canvas throughout the `draw()` loop. */
    private _sketchFramebuffer;
    /** The plugin registry instance. */
    private _pluginRegistry;
    /** The hook manager instance. */
    private _hookManager;
    /** Cache for user functions */
    private _cachedSetupAsciifyFn;
    private _cachedDrawAsciifyFn;
    /**
     * Gets the singleton instance of `P5AsciifierManager`.
     * If the instance doesn't exist yet, it creates one.
     *
     * @returns The singleton instance of `P5AsciifierManager`.
     *
     * @ignore
     */
    static getInstance(): P5AsciifierManager;
    /**
     * Creates a new `P5AsciifierManager` instance.
     * @ignore
     */
    private constructor();
    /**
     * Register the core p5.asciify hooks
     * @private
     */
    /**
 * Register the core p5.asciify hooks
 * @private
 */
    private _registerCoreHooks;
    /**
     * Get the addon configuration for p5.js 2.x.x
     * @internal
     */
    getAddonConfig(): {
        presetup: (this: p5) => Promise<void>;
        postsetup: (this: p5) => Promise<void>;
        predraw: (this: p5) => void;
        postdraw: (this: p5) => void;
    };
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
     * Register a new renderer plugin with p5.asciify
     * @param plugin The renderer plugin to register
     */
    registerPlugin(plugin: P5AsciifyRendererPlugin): void;
    /**
      * Activate a registered hook
      * @param hookType The type of hook to activate
      */
    activateHook(hookType: HookType): void;
    /**
     * Deactivate a hook without unregistering it
     * @param hookType The type of hook to deactivate
     */
    deactivateHook(hookType: HookType): void;
    /**
     * Get the plugin registry
     * @returns The plugin registry instance
     */
    get pluginRegistry(): P5AsciifyPluginRegistry;
    /**
     * Get the hook manager
     * @returns The hook manager instance
     */
    get hookManager(): P5HookManager;
    /**
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[];
    /**
     * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
     * @ignore
     */
    get sketchFramebuffer(): p5.Framebuffer;
}
