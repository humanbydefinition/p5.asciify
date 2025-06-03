import p5 from 'p5';
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
export declare class P5HookManager {
    private registeredHooks;
    private isP5v2;
    private p5AddonRegistered;
    private _cachedSetupAsciifyFn;
    private _cachedDrawAsciifyFn;
    constructor();
    /**
     * Initialize the hook manager and register with p5.js
     * @param asciifierManager Reference to the manager for core functionality
     */
    initialize(asciifierManager: any): void;
    /**
     * Register the core p5.asciify hooks
     * @private
     */
    private _registerCoreHooks;
    /**
     * Integrate with p5.js based on version
     * @private
     */
    private _integrateWithP5;
    /**
     * Create p5.js v2.0.0+ addon configuration
     * @private
     */
    private _createP5Addon;
    /**
     * Register hooks with p5.js v1.x.x legacy system
     * @private
     */
    private _registerLegacyHooks;
    /**
     * Register a hook function with proxy-based activation control
     * @param hookType The type of hook to register
     * @param fn The function to execute
     * @param autoRegister Whether to immediately register with p5.js (default: true)
     * @param isCore Whether this is a core hook (protected from deactivation)
     */
    registerHook(hookType: HookType, fn: (this: p5) => void | Promise<void>, autoRegister?: boolean, isCore?: boolean): void;
    /**
     * Register the proxy function with p5.js (one-time registration)
     * @param hookType The type of hook to activate
     */
    activateHook(hookType: HookType): void;
    /**
     * Deactivate a hook by setting its proxy to inactive (without unregistering from p5.js)
     * @param hookType The type of hook to deactivate
     */
    deactivateHook(hookType: HookType): void;
    /**
     * Check if a hook is currently active
     * @param hookType The type of hook to check
     * @returns Whether the hook is active
     */
    isHookActive(hookType: HookType): boolean;
    /**
     * Get all hooks for a specific type (used internally by addon system)
     * @param hookType The type of hooks to retrieve
     * @returns Array of active hook functions
     */
    getHooks(hookType: HookType): Array<{
        fn: (this: p5) => void | Promise<void>;
    }>;
    /**
     * Get the addon configuration for p5.js 2.x.x (used by AsciifierManager)
     * @internal
     */
    getAddonConfig(): {
        presetup: (this: p5) => Promise<void>;
        postsetup: (this: p5) => Promise<void>;
        predraw: (this: p5) => void;
        postdraw: (this: p5) => void;
    };
    private static _instance;
    static getInstance(): P5HookManager;
}
