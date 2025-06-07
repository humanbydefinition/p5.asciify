import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { P5AsciifyError } from './errors/AsciifyError';
import { P5AsciifyHookManager } from './HookManager';
import { HookType } from './types';

import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt?raw';
import { P5AsciifyRendererPlugin } from './plugins/RendererPlugin';
import { P5AsciifyPluginRegistry } from './plugins/PluginRegistry';
import { compareVersions } from './utils';
import { errorHandler } from './errors';
import { P5AsciifyErrorLevel } from './errors/ErrorHandler';

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
 * - Managing p5.js lifecycle hooks through HookManager
 */
export class P5AsciifierManager {
    /** Singleton instance of the manager */
    private static _instance: P5AsciifierManager | null = null;

    /** The p5.js instance used by the library. */
    private _p!: p5;

    /** The list of `P5Asciifier` instances managed by the library. */
    private _asciifiers: P5Asciifier[];

    /** The base font used by the library. */
    private _baseFont!: p5.Font;

    /** Contains the content that has been drawn to the `p5.js` canvas throughout the `draw()` loop. */
    private _sketchFramebuffer!: p5.Framebuffer;

    /** The plugin registry instance. */
    private _pluginRegistry: P5AsciifyPluginRegistry;

    /** The hook manager instance. */
    private _hookManager: P5AsciifyHookManager;

    private _setupDone: boolean = false;

    /**
     * Gets the singleton instance of `P5AsciifierManager`.
     */
    public static getInstance(): P5AsciifierManager {
        if (!P5AsciifierManager._instance) {
            P5AsciifierManager._instance = new P5AsciifierManager();
        }
        return P5AsciifierManager._instance;
    }

    /**
     * Creates a new `P5AsciifierManager` instance.
     */
    private constructor() {
        // Only allow one instance
        if (P5AsciifierManager._instance) {
            throw new P5AsciifyError("P5AsciifierManager is a singleton and cannot be instantiated directly. Use P5AsciifierManager.getInstance() instead.");
        }

        this._pluginRegistry = new P5AsciifyPluginRegistry();
        this._asciifiers = [new P5Asciifier(this._pluginRegistry)];
        this._hookManager = P5AsciifyHookManager.getInstance();

        // Initialize hook manager with dependency injection
        this._hookManager.initialize(this);
    }

    /**
     * Handle initialization hook
     * @ignore
     */
    public async handleInit(p: p5): Promise<void> {
        return await this.init(p);
    }

    /**
     * Handle setup hook
     * @ignore
     */
    public async handleSetup(p: p5): Promise<void> {
        return await this.setup();
    }

    /**
     * Handle pre-draw hook
     * @ignore
     */
    public handlePreDraw(p: p5): void {
        if (this._sketchFramebuffer) {
            this._sketchFramebuffer.begin();
            p.clear();
        }
    }

    /**
     * Handle post-draw hook
     * @ignore
     */
    public handlePostDraw(p: p5): void {
        if (this._sketchFramebuffer) {
            this._sketchFramebuffer.end();
            this.asciify();
        }
    }

    /**
     * Initializes the `p5.asciify` library by setting the `p5.js` instance.
     * 
     * For the provided {@link p5asciify} object this method is called automatically when the library is imported.
     * 
     * @param p The p5.js instance to use for the library.
     * @ignore
     */
    public async init(p: p5): Promise<void> {
        this._p = p;

        // Apply shader precision fix for Android devices
        this._applyShaderPrecisionFix();

        if (compareVersions(p.VERSION, "2.0.0") < 0) {
            // For p5.js 1.x - use preload increment and callback
            // Check if we're in global mode to avoid conflicts
            if (!p._isGlobal) {
                this._p.preload = () => { };
            }

            this._p._incrementPreload();
            this._baseFont = p.loadFont(URSAFONT_BASE64, (font) => {
                this._asciifiers.forEach((asciifier) => {
                    asciifier.init(p, font);
                });
            });
        } else {
            // For p5.js 2.0.0+ - use the Promise-based approach
            this._baseFont = await this._p.loadFont(URSAFONT_BASE64);

            // Create and wait for all initialization promises to complete
            await Promise.all(
                this._asciifiers.map(asciifier => asciifier.init(p, this._baseFont))
            );
        }
    }

    /**
     * Sets up the `P5Asciifier` instances managed by the library.
     * 
     * For the provided {@link p5asciify} object this method is called automatically when the users `setup` function finished executing.
     * @ignore
     */
    public async setup(): Promise<void> {

        this._sketchFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        // Check p5.js version to determine sync vs async setup
        if (compareVersions(this._p.VERSION, "2.0.0") < 0) {
            // For p5.js 1.x - synchronous setup
            for (const asciifier of this._asciifiers) {
                asciifier.setup(this._sketchFramebuffer);
            }
        } else {
            // For p5.js 2.0+ - asynchronous setup
            for (const asciifier of this._asciifiers) {
                await asciifier.setup(this._sketchFramebuffer);
            }
        }

        this._setupDone = true;
    }

    /**
     * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
     * 
     * For the provided {@link p5asciify} object this method is called automatically when the users `draw` function finished executing.
     * 
     * @ignore
     */
    public asciify(): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.asciify();
        });
    }

    /**
     * Returns the `P5Asciifier` instance at the specified index.
     * 
     * When passing no arguments, the method returns the first `P5Asciifier` instance in the list, 
     * which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.
     * 
     * @param index The index of the `P5Asciifier` instance to return.
     * @returns The `P5Asciifier` instance at the specified index.
     * @throws If the index is out of bounds.
     */
    public asciifier(index: number = 0): P5Asciifier | null {
        // Validate input parameter
        const isValidInput = errorHandler.validate(
            typeof index === 'number' && !isNaN(index) && Number.isInteger(index),
            'Index must be a valid integer.',
            { providedValue: index, method: 'asciifier' }
        );

        if (!isValidInput) {
            return null; // Return early if input validation fails
        }

        // Validate index is within bounds
        const isValidIndex = errorHandler.validate(
            index >= 0 && index < this._asciifiers.length,
            `Invalid asciifier index: ${index}. Valid range is 0 to ${this._asciifiers.length - 1}.`,
            { providedValue: index, method: 'asciifier' }
        );

        if (!isValidIndex) {
            return null; // Return early if index validation fails
        }

        return this._asciifiers[index];
    }

    /**
     * Adds a new `P5Asciifier` instance to the library.
     * @param framebuffer   The framebuffer to capture for ASCII conversion.
     *                      If not provided, the main canvas of the `p5.js` instance will be used.
     * @returns The newly created `P5Asciifier` instance, or null if validation fails.
     */
    public add(framebuffer?: p5.Framebuffer | p5.Graphics): P5Asciifier | Promise<P5Asciifier | null> | null {
        // Validate setup is done
        const isSetupDone = errorHandler.validate(
            this._setupDone,
            "Cannot add asciifier before initializing p5.asciify. Ensure p5.asciify is initialized first.",
            { providedValue: this._setupDone, method: 'add' }
        );

        if (!isSetupDone) {
            return null; // Return early if setup validation fails
        }

        const asciifier = new P5Asciifier(this._pluginRegistry);

        // For p5.js 1.x, use the synchronous initialization pattern
        if (compareVersions(this._p.VERSION, "2.0.0") < 0) {
            // For p5.js 1.x, synchronous init
            asciifier.init(this._p, this._baseFont);

            // If setup is done, immediately set up the asciifier
            if (this._setupDone) {
                asciifier.setup(framebuffer ? framebuffer : this._sketchFramebuffer);
            }

            this._asciifiers.push(asciifier);
            return asciifier;
        } else {
            // For p5.js 2.0+, return a Promise
            return (async () => {
                try {
                    await asciifier.init(this._p, this._baseFont);

                    if (this._setupDone && this._sketchFramebuffer) {
                        await asciifier.setup(framebuffer ? framebuffer : this._sketchFramebuffer);
                    }

                    this._asciifiers.push(asciifier);
                    return asciifier;
                } catch (error) {
                    // If async operations fail, validate and return null
                    errorHandler.validate(
                        false,
                        `Failed to initialize asciifier: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        { providedValue: error, method: 'add' }
                    );
                    return null;
                }
            })();
        }
    }

    /**
     * Removes a `P5Asciifier` instance.
     * @param indexOrAsciifier The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself.
     */
    public remove(indexOrAsciifier: number | P5Asciifier): void {
        if (typeof indexOrAsciifier === 'number') {
            // Handle removal by index
            const index = indexOrAsciifier;

            const isValidInput = errorHandler.validate(
                typeof index === 'number' && !isNaN(index) && Number.isInteger(index),
                'Index must be a valid integer.',
                { providedValue: index, method: 'remove' }
            );

            if (!isValidInput) {
                return; // Return early if input validation fails
            }

            const isValidIndex = errorHandler.validate(
                index >= 0 && index < this._asciifiers.length,
                `Invalid asciifier index: ${index}. Valid range is 0 to ${this._asciifiers.length - 1}.`,
                { providedValue: index, method: 'remove' }
            );

            if (!isValidIndex) {
                return; // Return early if index validation fails
            }

            this._asciifiers.splice(index, 1);
        } else {
            // Handle removal by instance
            const asciifier = indexOrAsciifier;

            const isValidInstance = errorHandler.validate(
                asciifier && asciifier instanceof P5Asciifier,
                'Asciifier must be a valid P5Asciifier instance.',
                { providedValue: asciifier, method: 'remove' }
            );

            if (!isValidInstance) {
                return; // Return early if instance validation fails
            }

            const index = this._asciifiers.indexOf(asciifier);

            const asciifierExists = errorHandler.validate(
                index !== -1,
                'The specified asciifier was not found in the list.',
                { providedValue: asciifier, method: 'remove' }
            );

            if (!asciifierExists) {
                return; // Return early if asciifier not found
            }

            this._asciifiers.splice(index, 1);
        }
    }

    /**
     * Register a new renderer plugin with p5.asciify
     * @param plugin The renderer plugin to register
     */
    public registerPlugin(plugin: P5AsciifyRendererPlugin): void {
        this._pluginRegistry.register(plugin);
    }

    /**
     * Activate a registered hook
     * @param hookType The type of hook to activate
     */
    public activateHook(hookType: HookType): void {
        this._hookManager.activateHook(hookType);
    }

    /**
     * Deactivate a registered hook
     * @param hookType The type of hook to deactivate
     */
    public deactivateHook(hookType: HookType): void {
        this._hookManager.deactivateHook(hookType);
    }

    /**
     * Set the global error level for the library.
     * @param level The error level to set.
     */
    public setErrorLevel(level: P5AsciifyErrorLevel): void {
        errorHandler.setGlobalLevel(level);
    }

    /**
     * Apply shader precision fix for Android devices.
     * This fixes p5.js shaders to use highp precision instead of mediump.
     * Generally fixed in p5.js v1.11.3+, but this provides backwards compatibility.
     * @private
     */
    private _applyShaderPrecisionFix(): void {
        const shadersToReplace = [
            ['_getImmediateModeShader', '_defaultImmediateModeShader'],
            ['_getNormalShader', '_defaultNormalShader'],
            ['_getColorShader', '_defaultColorShader'],
            ['_getPointShader', '_defaultPointShader'],
            ['_getLineShader', '_defaultLineShader'],
            ['_getFontShader', '_defaultFontShader'],
        ];

        // Apply the fix to the renderer prototype if not already applied
        for (const [method, cacheKey] of shadersToReplace) {
            const prevMethod = p5.RendererGL.prototype[method]
            p5.RendererGL.prototype[method] = function () {
                if (!this[cacheKey]) {
                    this[cacheKey] = prevMethod.call(this)
                    this[cacheKey]._vertSrc = this[cacheKey]._vertSrc.replace(
                        /mediump/g,
                        'highp',
                    )
                    this[cacheKey]._fragSrc = this[cacheKey]._fragSrc.replace(
                        /mediump/g,
                        'highp',
                    )
                }

                return this[cacheKey]
            }
        }
    }

    /**
     * Get the plugin registry
     * @returns The plugin registry instance
     */
    get pluginRegistry(): P5AsciifyPluginRegistry {
        return this._pluginRegistry;
    }

    /**
     * Get the hook manager
     * @returns The hook manager instance
     */
    get hookManager(): P5AsciifyHookManager {
        return this._hookManager;
    }

    /**
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[] { return this._asciifiers; }

    /**
     * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
     * @ignore
     */
    get sketchFramebuffer(): p5.Framebuffer { return this._sketchFramebuffer; }
}