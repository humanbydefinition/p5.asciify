import p5 from 'p5';
import { HookType, P5AsciifyHookHandlers } from './types';
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
export declare class P5AsciifyHookManager {
    private registeredHooks;
    private p5AddonRegistered;
    private hookHandlers;
    private _cachedSetupAsciifyFn;
    private _cachedDrawAsciifyFn;
    private static _instance;
    static getInstance(): P5AsciifyHookManager;
    private constructor();
    /**
     * Initialize the hook manager with dependency injection
     * @param handlers The hook handlers that implement core functionality
     * @ignore
     */
    initialize(handlers: P5AsciifyHookHandlers): void;
    /**
     * Register the core p5.asciify hooks using injected handlers
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
     * @param isCore Whether this is a core hook (protected from deactivation)
     */
    private _registerHook;
    /**
     * Activate a hook by setting its proxy to active
     * @param hookType The type of hook to activate
     */
    activateHook(hookType: HookType): void;
    /**
     * Deactivate a hook by setting its proxy to inactive
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
     * @ignore
     */
    getHooks(hookType: HookType): Array<{
        fn: (this: p5) => void | Promise<void>;
    }>;
}
