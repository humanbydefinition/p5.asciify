import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { P5AsciifyError } from './errors/AsciifyError';
import { P5AsciifyHookManager } from './HookManager';
import { HookType } from './types';

import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt?raw';
import { P5AsciifyRendererPlugin } from './plugins/RendererPlugin';
import { P5AsciifyPluginRegistry } from './plugins/PluginRegistry';
import { detectP5Version, isP5AsyncCapable, isValidP5Color } from './utils';
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

    /** Indicates whether the setup phase has been completed. */
    private _setupDone: boolean = false;

    /** The version of the p5.js library used. */
    private _p5Version!: string;

    /** The background color for the ASCII outputs, which is used to fill transparent areas. */
    private _backgroundColor: string | p5.Color | [number, number?, number?, number?] = "#000000";
    

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
     * This method is called automatically by the library when the `p5.js` instance is created.
     * 
     * **If the `init` hook is disabled, this method will not be called automatically.**
     * 
     * @param p The p5.js instance to use for the library.
     */
    public async init(p: p5): Promise<void> {
        this._p = p;

        this._p5Version = detectP5Version(p);

        if (!this._p5Version) {
            throw new P5AsciifyError("Could not determine p5.js version. Ensure p5.js is properly loaded.");
        }

        // Apply shader precision fix for Android devices
        this._applyShaderPrecisionFix();

        if (isP5AsyncCapable(this._p5Version)) {
            // For p5.js 2.0.0+ - use the Promise-based approach
            this._baseFont = await this._p.loadFont(URSAFONT_BASE64);

            // Create and wait for all initialization promises to complete
            await Promise.all(
                this._asciifiers.map(asciifier => asciifier.init(p, this._baseFont))
            );
        } else {
            // For p5.js 1.x - use preload increment and callback
            // Check if we're in global mode to avoid conflicts


            if (!this._p.preload && typeof (globalThis as any).preload !== 'function') {
                this._p.preload = () => { };
            }

            this._p._incrementPreload();
            await new Promise<void>((resolve) => {
                this._baseFont = p.loadFont(URSAFONT_BASE64, (font) => {
                    this._asciifiers.forEach((asciifier) => {
                        asciifier.init(p, font);
                    });

                    resolve();
                })
            });
        }
    }

    /**
     * Sets up the `P5Asciifier` instances managed by the library.
     * 
     * This method is called automatically by the library after the `setup()` function of the `p5.js` instance has finished executing.
     * 
     * **If the `afterSetup` hook is disabled, this method will not be called automatically.**
     */
    public async setup(): Promise<void> {
        this._sketchFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        // Check p5.js version to determine sync vs async setup
        if (isP5AsyncCapable(this._p5Version)) {
            // For p5.js 2.0+ - asynchronous setup
            for (const asciifier of this._asciifiers) {
                await asciifier.setup(this._sketchFramebuffer);
            }
        } else {
            // For p5.js 1.x - synchronous setup
            for (const asciifier of this._asciifiers) {
                asciifier.setup(this._sketchFramebuffer);
            }
        }

        this._setupDone = true;
    }

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
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        const isValid = errorHandler.validate(
            typeof color === 'string' || Array.isArray(color) || isValidP5Color(this._p, color),
            `Invalid color type: ${typeof color}. Expected string, array or p5.Color.`,
            { providedValue: color, method: 'background' }
        );

        if (!isValid) {
            return; // Early return if the color is not valid
        }

        this._backgroundColor = color;
    }

    /**
     * Sets the font size for all managed `P5Asciifier` instances simultaneously.
     * @param size The font size to set for the `P5Asciifier` instances.
     */
    public fontSize(size: number): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.fontSize(size);
        });
    }

    /**
     * Sets the font for all managed `P5Asciifier` instances simultaneously.
     * @param font The `p5.Font` instance to set as the font for all managed `P5Asciifier` instances.
     */
    public font(font: p5.Font): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.font(font);
        });
    } 

    /**
     * Sets the grid dimensions for all managed `P5Asciifier` instances simultaneously.
     * @param gridCols The number of columns in the ASCII grid.
     * @param gridRows The number of rows in the ASCII grid.
     */
    public gridDimensions(gridCols: number, gridRows: number): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.gridDimensions(gridCols, gridRows);
        });
    }

    /**
     * Sets whether the ASCII grid should be responsive to the size of the canvas for all managed `P5Asciifier` instances.
     * @param bool If `true`, the ASCII grid will adjust its size based on the canvas dimensions. Otherwise, it will always use the set grid dimensions.
     */
    public gridResponsive(bool: boolean = true): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.gridResponsive(bool);
        });
    }

    /**
     * Sets the background mode for all managed `P5Asciifier` instances simultaneously.
     * @param mode The background mode to set for the `P5Asciifier` instances.
     */
    public backgroundMode(mode: "fixed" | "sampled" = "fixed"): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.backgroundMode(mode);
        });
    }

    /**
     * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
     * 
     * This method is called automatically by the library after the `draw()` function of the `p5.js` instance has finished executing.
     * 
     * **If the `post` hook is disabled, this method will not be called automatically.**
     * 
     */
    public asciify(): void {
        this._p.background(this._backgroundColor as p5.Color);
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

        if (isP5AsyncCapable(this._p5Version)) {
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
        } else {
            // For p5.js 1.x, synchronous init
            asciifier.init(this._p, this._baseFont);

            // If setup is done, immediately set up the asciifier
            if (this._setupDone) {
                asciifier.setup(framebuffer ? framebuffer : this._sketchFramebuffer);
            }

            this._asciifiers.push(asciifier);
            return asciifier;
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
     * Activate a registered hook provided by `p5.asciify`.
     * 
     * @param hookType The type of hook to activate
     */
    public activateHook(hookType: HookType): void {
        this._hookManager.activateHook(hookType);
    }

    /**
     * Deactivate a registered hook provided by `p5.asciify`.
     * @param hookType The type of hook to deactivate
     */
    public deactivateHook(hookType: HookType): void {
        this._hookManager.deactivateHook(hookType);
    }

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

        // Try multiple strategies to find RendererGL class
        let rendererGL = null;
        const rendererSources = [
            // Strategy 1: Instance constructor (works in flok.cc)
            () => this._p?.constructor?.RendererGL,

            // Strategy 2: Global p5 (works in P5LIVE)
            () => (typeof p5 !== 'undefined' && p5.RendererGL) ? p5.RendererGL : undefined,
        ];

        // Try each renderer source until we find one that works
        for (const getRenderer of rendererSources) {
            try {
                const renderer = getRenderer();
                if (renderer && renderer.prototype) {
                    rendererGL = renderer;
                    break;
                }
            } catch (e) {
                // Continue to next strategy if this one fails
                continue;
            }
        }

        // If we couldn't find RendererGL, exit gracefully
        if (!rendererGL || !rendererGL.prototype) {
            console.warn('p5.asciify: Could not find RendererGL class, skipping shader precision fix for Android devices running below p5.js v1.11.3.');
            return;
        }

        // Apply the fix to the renderer prototype
        for (const [method, cacheKey] of shadersToReplace) {
            // Check if the method exists on the prototype
            if (typeof rendererGL.prototype[method] === 'function') {
                const prevMethod = rendererGL.prototype[method];

                rendererGL.prototype[method] = function () {
                    if (!this[cacheKey]) {
                        this[cacheKey] = prevMethod.call(this);

                        // Safely apply the precision fix
                        if (this[cacheKey] && this[cacheKey]._vertSrc) {
                            this[cacheKey]._vertSrc = this[cacheKey]._vertSrc.replace(
                                /mediump/g,
                                'highp'
                            );
                        }
                        if (this[cacheKey] && this[cacheKey]._fragSrc) {
                            this[cacheKey]._fragSrc = this[cacheKey]._fragSrc.replace(
                                /mediump/g,
                                'highp'
                            );
                        }
                    }

                    return this[cacheKey];
                };
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
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[] { return this._asciifiers; }

    /**
     * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
     * @ignore
     */
    get sketchFramebuffer(): p5.Framebuffer { return this._sketchFramebuffer; }
}