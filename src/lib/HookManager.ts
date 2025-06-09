import p5 from 'p5';
import { P5AsciifyError } from './errors/AsciifyError';
import { compareVersions } from './utils/utils';
import { HookType, P5AsciifyHookHandlers } from './types';
import { errorHandler } from './errors';

export interface HookFunction {
    originalFn: (this: p5) => void | Promise<void>;
    proxyFn: (this: p5) => void | Promise<void>;
    active: boolean;
    isCore: boolean;
    registered: boolean;
}

/**
 * Manages `p5.js` lifecycle hooks for both `1.x.x` and `2.x.x` versions.
 * Handles automatic registration with `p5.js` and provides unified hook management
 * @ignore
 */
export class P5AsciifyHookManager {
    private registeredHooks: Map<HookType, HookFunction> = new Map();
    private p5AddonRegistered: boolean = false;
    private hookHandlers!: P5AsciifyHookHandlers;

    // Cache for user functions
    private _cachedSetupAsciifyFn: (() => void | Promise<void>) | null = null;
    private _cachedDrawAsciifyFn: (() => void | Promise<void>) | null = null;

    // Singleton pattern for easy access from addon config
    private static _instance: P5AsciifyHookManager | null = null;

    public static getInstance(): P5AsciifyHookManager {
        if (!P5AsciifyHookManager._instance) {
            P5AsciifyHookManager._instance = new P5AsciifyHookManager();
        }
        return P5AsciifyHookManager._instance;
    }

    private constructor() {
        // Ensure singleton instance
        if (P5AsciifyHookManager._instance) {
            throw new P5AsciifyError("P5AsciifyHookManager is a singleton and cannot be instantiated multiple times.");
        }
    }

    /**
     * Initialize the hook manager with dependency injection
     * @param handlers The hook handlers that implement core functionality
     * @ignore
     */
    public initialize(handlers: P5AsciifyHookHandlers): void {
        this.hookHandlers = handlers;
        this._registerCoreHooks();
        this._integrateWithP5();
    }

    /**
     * Register the core p5.asciify hooks using injected handlers
     * @private
     */
    private _registerCoreHooks(): void {
        const handlers = this.hookHandlers as P5AsciifyHookHandlers;

        // Core init hook - cannot be deactivated
        const initHook = function (this: p5) {
            return handlers.handleInit(this);
        };
        this._registerHook('init', initHook, false);

        // Core setup hook
        const afterSetupHook = function (this: p5) {
            // Ensure WebGL renderer is used
            if (!(this._renderer.drawingContext instanceof WebGLRenderingContext ||
                this._renderer.drawingContext instanceof WebGL2RenderingContext)) {
                throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
            }

            // Ensure p5.js version is 1.8.0 or higherAdd commentMore actions
            if (compareVersions(this.VERSION, "1.8.0") < 0) {
                throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to run.");
            }

            if (compareVersions(this.VERSION, "2.0.0") >= 0) {
                return (async () => {
                    await handlers.handleSetup(this);

                    // Cache user functions
                    const hookManager = P5AsciifyHookManager.getInstance();
                    hookManager._cachedSetupAsciifyFn = this.setupAsciify ||
                        (this._isGlobal && typeof window !== 'undefined' && typeof (window as any).setupAsciify === 'function' ? (window as any).setupAsciify : null);

                    hookManager._cachedDrawAsciifyFn = this.drawAsciify ||
                        (this._isGlobal && typeof window !== 'undefined' && typeof (window as any).drawAsciify === 'function' ? (window as any).drawAsciify : null);

                    if (typeof hookManager._cachedSetupAsciifyFn === 'function') {
                        await hookManager._cachedSetupAsciifyFn.call(this);
                    }
                })();
            } else {
                handlers.handleSetup(this);

                // Cache user functions
                const hookManager = P5AsciifyHookManager.getInstance();
                hookManager._cachedSetupAsciifyFn = this.setupAsciify ||
                    (this._isGlobal && typeof window !== 'undefined' && typeof (window as any).setupAsciify === 'function' ? (window as any).setupAsciify : null);

                hookManager._cachedDrawAsciifyFn = this.drawAsciify ||
                    (this._isGlobal && typeof window !== 'undefined' && typeof (window as any).drawAsciify === 'function' ? (window as any).drawAsciify : null);

                if (typeof hookManager._cachedSetupAsciifyFn === 'function') {
                    hookManager._cachedSetupAsciifyFn.call(this);
                }
            }
        };
        this._registerHook('afterSetup', afterSetupHook, false);

        // Core pre-draw hook
        const preHook = function (this: p5) {
            handlers.handlePreDraw(this);
        };
        this._registerHook('pre', preHook, false);

        // Core post-draw hook
        const postHook = function (this: p5) {
            handlers.handlePostDraw(this);

            const hookManager = P5AsciifyHookManager.getInstance();
            if (typeof hookManager._cachedDrawAsciifyFn === 'function') {
                hookManager._cachedDrawAsciifyFn.call(this);
            }
        };
        this._registerHook('post', postHook, false);
    }

    /**
     * Integrate with p5.js based on version
     * @private
     */
    private _integrateWithP5(): void {
        if (typeof p5 === 'undefined' || !p5 || !p5.VERSION) {
            console.log("p5.asciify loading without automatic hooks!")
            return;
        }

        if (compareVersions(p5.VERSION, "2.0.0") >= 0 && typeof p5.registerAddon === 'function') {
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
     * @param isCore Whether this is a core hook (protected from deactivation)
     */
    private _registerHook(
        hookType: HookType,
        fn: (this: p5) => void | Promise<void>,
        isCore: boolean = false
    ): void {
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
    }

    /**
     * Activate a hook by setting its proxy to active
     * @param hookType The type of hook to activate
     */
    public activateHook(hookType: HookType): void {
        // Validate hookType parameter
        const isValidHookType = errorHandler.validate(
            hookType && typeof hookType === 'string' && hookType.trim() !== '',
            'Hook type must be a non-empty string.',
            { providedValue: hookType, method: 'activateHook' }
        );

        if (!isValidHookType) {
            return; // Return early if hook type validation fails
        }

        const hookFunction = this.registeredHooks.get(hookType);

        // Validate hook exists
        const hookExists = errorHandler.validate(
            hookFunction !== undefined,
            `Hook '${hookType}' not found.`,
            { providedValue: hookType, method: 'activateHook' }
        );

        if (!hookExists) {
            return; // Return early if hook not found
        }

        // Always set to active (proxy will execute the function)
        hookFunction!.active = true;
    }

    /**
     * Deactivate a hook by setting its proxy to inactive
     * @param hookType The type of hook to deactivate
     */
    public deactivateHook(hookType: HookType): void {
        // Validate hookType parameter
        const isValidHookType = errorHandler.validate(
            hookType && typeof hookType === 'string' && hookType.trim() !== '',
            'Hook type must be a non-empty string.',
            { providedValue: hookType, method: 'deactivateHook' }
        );

        if (!isValidHookType) {
            return; // Return early if hook type validation fails
        }

        const hookFunction = this.registeredHooks.get(hookType);

        // Validate hook exists
        const hookExists = errorHandler.validate(
            hookFunction !== undefined,
            `Hook '${hookType}' not found.`,
            { providedValue: hookType, method: 'deactivateHook' }
        );

        if (!hookExists) {
            return; // Return early if hook not found
        }

        // Validate hook is not a core hook
        const isNotCore = errorHandler.validate(
            !hookFunction!.isCore,
            `Core hook '${hookType}' cannot be deactivated.`,
            { providedValue: hookType, method: 'deactivateHook' }
        );

        if (!isNotCore) {
            return; // Return early if trying to deactivate core hook
        }

        // Simply set to inactive - the proxy will handle the rest
        hookFunction!.active = false;
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
     * @ignore
     */
    public getHooks(hookType: HookType): Array<{ fn: (this: p5) => void | Promise<void> }> {
        const hookFunction = this.registeredHooks.get(hookType);
        if (hookFunction && hookFunction.active) {
            return [{ fn: hookFunction.originalFn }];
        }
        return [];
    }
}