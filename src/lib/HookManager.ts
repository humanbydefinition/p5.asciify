import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils/utils';

export type HookType = 'init' | 'beforePreload' | 'afterPreload' | 'beforeSetup' | 'afterSetup' | 'pre' | 'post' | 'remove';

export interface HookFunction {
    originalFn: (this: p5) => void | Promise<void>;
    proxyFn: (this: p5) => void | Promise<void>;
    active: boolean;
    isCore: boolean;
    registered: boolean;
}

/**
 * Manages p5.js lifecycle hooks for both 1.x.x and 2.x.x versions
 * Handles automatic registration with p5.js and provides unified hook management
 */
export class P5HookManager {
    private registeredHooks: Map<HookType, HookFunction> = new Map();
    private isP5v2: boolean = false;
    private p5AddonRegistered: boolean = false;

    // Cache for user functions
    private _cachedSetupAsciifyFn: (() => void | Promise<void>) | null = null;
    private _cachedDrawAsciifyFn: (() => void | Promise<void>) | null = null;

    constructor() {
        this.isP5v2 = compareVersions(p5.prototype.VERSION, "2.0.0") >= 0;
    }

    /**
     * Initialize the hook manager and register with p5.js
     * @param asciifierManager Reference to the manager for core functionality
     */
    public initialize(asciifierManager: any): void {
        this._registerCoreHooks(asciifierManager);
        this._integrateWithP5();
    }

    /**
     * Register the core p5.asciify hooks
     * @private
     */
    private _registerCoreHooks(manager: any): void {

        // Core init hook - cannot be deactivated
        const initHook = function (this: p5) {
            try {
                if (compareVersions(this.VERSION, "2.0.0") >= 0) {
                    return manager.init(this);
                } else {
                    manager.init(this);
                }
            } catch (error) {
                console.error('Error in init hook:', error);
                throw error;
            }
        };

        this.registerHook('init', initHook, false, true);

        // Core setup hook
        const afterSetupHook = function (this: p5) {
            try {
                if (compareVersions(this.VERSION, "2.0.0") >= 0) {
                    return (async () => {
                        // Ensure WebGL renderer is used
                        if (!(this._renderer.drawingContext instanceof WebGLRenderingContext ||
                            this._renderer.drawingContext instanceof WebGL2RenderingContext)) {
                            throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
                        }

                        await manager.setup();

                        // Cache user functions
                        const hookManager = manager.hookManager;
                        hookManager._cachedSetupAsciifyFn = this.setupAsciify ||
                            (this._isGlobal && typeof window !== 'undefined' && typeof window.setupAsciify === 'function' ? window.setupAsciify : null);

                        hookManager._cachedDrawAsciifyFn = this.drawAsciify ||
                            (this._isGlobal && typeof window !== 'undefined' && typeof window.drawAsciify === 'function' ? window.drawAsciify : null);

                        if (typeof hookManager._cachedSetupAsciifyFn === 'function') {
                            await hookManager._cachedSetupAsciifyFn.call(this);
                        }
                    })();
                } else {
                    // Ensure WebGL renderer is used
                    if (!(this._renderer.drawingContext instanceof WebGLRenderingContext ||
                        this._renderer.drawingContext instanceof WebGL2RenderingContext)) {
                        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
                    }

                    setTimeout(async () => {
                        await manager.setup();

                        // Cache user functions
                        const hookManager = manager.hookManager;
                        hookManager._cachedSetupAsciifyFn = this.setupAsciify ||
                            (this._isGlobal && typeof window !== 'undefined' && typeof window.setupAsciify === 'function' ? window.setupAsciify : null);

                        hookManager._cachedDrawAsciifyFn = this.drawAsciify ||
                            (this._isGlobal && typeof window !== 'undefined' && typeof window.drawAsciify === 'function' ? window.drawAsciify : null);

                        if (typeof hookManager._cachedSetupAsciifyFn === 'function') {
                            hookManager._cachedSetupAsciifyFn.call(this);
                        }
                    }, 0);
                }
            } catch (error) {
                console.error('Error in afterSetup hook:', error);
                throw error;
            }
        };
        this.registerHook('afterSetup', afterSetupHook, false, false);

        // Core pre-draw hook
        const preHook = function (this: p5) {
            try {
                if (manager.sketchFramebuffer) {
                    manager.sketchFramebuffer.begin();
                    this.clear();
                }
            } catch (error) {
                console.error('Error in pre hook:', error);
                throw error;
            }
        };
        this.registerHook('pre', preHook, false, false);

        // Core post-draw hook
        const postHook = function (this: p5) {
            if (manager.sketchFramebuffer) {
                manager.sketchFramebuffer.end();
                manager.asciify();
            }

            const hookManager = manager.hookManager;
            if (typeof hookManager._cachedDrawAsciifyFn === 'function') {
                hookManager._cachedDrawAsciifyFn.call(this);
            }
        };
        this.registerHook('post', postHook, false, false);
    }

    /**
     * Integrate with p5.js based on version
     * @private
     */
    private _integrateWithP5(): void {
        if (typeof p5 === 'undefined') return;

        if (this.isP5v2 && typeof p5.registerAddon === 'function') {
            // p5.js v2.0.0+ - use addon system
            if (!this.p5AddonRegistered) {
                p5.registerAddon(this._createP5Addon());
                this.p5AddonRegistered = true;
            }
        } else {
            // p5.js v1.x.x - use legacy hook registration
            this._registerLegacyHooks();
        }
    }

    /**
     * Create p5.js v2.0.0+ addon configuration
     * @private
     */
    private _createP5Addon() {
        const manager = this;

        return function p5AsciifyAddon(p5Core: any, fn: any, lifecycles: any) {
            lifecycles.presetup = async function (this: p5) {
                const hooks = manager.getHooks('init');
                for (const hook of hooks) {
                    await hook.fn.call(this);
                }
            };

            lifecycles.postsetup = async function (this: p5) {
                const hooks = manager.getHooks('afterSetup');
                for (const hook of hooks) {
                    await hook.fn.call(this);
                }
            };

            lifecycles.predraw = function (this: p5) {
                const hooks = manager.getHooks('pre');
                for (const hook of hooks) {
                    hook.fn.call(this);
                }
            };

            lifecycles.postdraw = function (this: p5) {
                const hooks = manager.getHooks('post');
                for (const hook of hooks) {
                    hook.fn.call(this);
                }
            };
        };
    }

    /**
     * Register hooks with p5.js v1.x.x legacy system
     * @private
     */
    private _registerLegacyHooks(): void {
        // Register each hook type with p5.js
        this.registeredHooks.forEach((hookFunction, hookType) => {
            if (!hookFunction.registered) {
                p5.prototype.registerMethod(hookType, hookFunction.proxyFn);
                hookFunction.registered = true;
            }
        });
    }

    /**
     * Register a hook function with proxy-based activation control
     * @param hookType The type of hook to register
     * @param fn The function to execute
     * @param autoRegister Whether to immediately register with p5.js (default: true)
     * @param isCore Whether this is a core hook (protected from deactivation)
     */
    public registerHook(
        hookType: HookType,
        fn: (this: p5) => void | Promise<void>,
        autoRegister: boolean = true,
        isCore: boolean = false
    ): void {
        if (this.registeredHooks.has(hookType)) {
            throw new P5AsciifyError(`Hook '${hookType}' is already registered.`);
        }

        // Create a proxy function with direct closure reference to this manager instance
        const manager = this; // Capture manager reference in closure
        const proxyFn = function (this: p5) {
            const hookFunction = manager.registeredHooks.get(hookType);
            if (hookFunction && hookFunction.active) {
                return hookFunction.originalFn.call(this);
            }
            // If hook is inactive, do nothing
        };

        const hookFunction: HookFunction = {
            originalFn: fn,
            proxyFn: proxyFn,
            active: true, // Start active by default
            isCore,
            registered: false
        };

        this.registeredHooks.set(hookType, hookFunction);

        if (autoRegister) {
            this.activateHook(hookType);
        }
    }

    /**
     * Register the proxy function with p5.js (one-time registration)
     * @param hookType The type of hook to activate
     */
    public activateHook(hookType: HookType): void {
        const hookFunction = this.registeredHooks.get(hookType);
        if (!hookFunction) {
            throw new P5AsciifyError(`Hook '${hookType}' not found.`);
        }

        // Always set to active (proxy will execute the function)
        hookFunction.active = true;

        // Register with p5.js only once for v1.x.x
        if (!hookFunction.registered && !this.isP5v2) {
            p5.prototype.registerMethod(hookType, hookFunction.proxyFn);
            hookFunction.registered = true;
        }
    }

    /**
     * Deactivate a hook by setting its proxy to inactive (without unregistering from p5.js)
     * @param hookType The type of hook to deactivate
     */
    public deactivateHook(hookType: HookType): void {
        const hookFunction = this.registeredHooks.get(hookType);
        if (!hookFunction) {
            throw new P5AsciifyError(`Hook '${hookType}' not found.`);
        }

        if (hookFunction.isCore) {
            throw new P5AsciifyError(`Core hook '${hookType}' cannot be deactivated.`);
        }

        // Simply set to inactive - the proxy will handle the rest
        hookFunction.active = false;
    }

    /**
     * Check if a hook is currently active
     * @param hookType The type of hook to check
     * @returns Whether the hook is active
     */
    public isHookActive(hookType: HookType): boolean {
        const hookFunction = this.registeredHooks.get(hookType);
        return hookFunction ? hookFunction.active : false;
    }

    /**
     * Get all hooks for a specific type (used internally by addon system)
     * @param hookType The type of hooks to retrieve
     * @returns Array of active hook functions
     */
    public getHooks(hookType: HookType): Array<{ fn: (this: p5) => void | Promise<void> }> {
        const hookFunction = this.registeredHooks.get(hookType);
        if (hookFunction && hookFunction.active) {
            return [{ fn: hookFunction.originalFn }];
        }
        return [];
    }

    /**
     * Get the addon configuration for p5.js 2.x.x (used by AsciifierManager)
     * @internal
     */
    public getAddonConfig() {
        return {
            presetup: async function (this: p5) {
                const manager = P5HookManager.getInstance();
                const hooks = manager.getHooks('init');
                for (const hook of hooks) {
                    await hook.fn.call(this);
                }
            },
            postsetup: async function (this: p5) {
                const manager = P5HookManager.getInstance();
                const hooks = manager.getHooks('afterSetup');
                for (const hook of hooks) {
                    await hook.fn.call(this);
                }
            },
            predraw: function (this: p5) {
                const manager = P5HookManager.getInstance();
                const hooks = manager.getHooks('pre');
                for (const hook of hooks) {
                    hook.fn.call(this);
                }
            },
            postdraw: function (this: p5) {
                const manager = P5HookManager.getInstance();
                const hooks = manager.getHooks('post');
                for (const hook of hooks) {
                    hook.fn.call(this);
                }
            }
        };
    }

    // Singleton pattern for easy access from addon config
    private static _instance: P5HookManager | null = null;

    public static getInstance(): P5HookManager {
        if (!P5HookManager._instance) {
            throw new P5AsciifyError("HookManager not initialized");
        }
        return P5HookManager._instance;
    }
}