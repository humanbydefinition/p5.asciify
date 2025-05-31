import p5 from 'p5';
export type HookType = 'init' | 'beforePreload' | 'afterPreload' | 'beforeSetup' | 'afterSetup' | 'pre' | 'post' | 'remove';
export interface HookFunction {
    fn: (this: p5) => void | Promise<void>;
    registered: boolean;
    isCore: boolean;
}
/**
 * Manages p5.js lifecycle hooks for both 1.x.x and 2.x.x versions
 */
export declare class P5HookManager {
    private registeredHooks;
    private isP5v2;
    constructor();
    /**
     * Register a hook function
     * @param hookType The type of hook to register
     * @param fn The function to execute
     * @param autoRegister Whether to immediately register with p5.js (default: true)
     * @param isCore Whether this is a core hook (protected from unregistration)
     */
    registerHook(hookType: HookType, fn: (this: p5) => void | Promise<void>, autoRegister?: boolean, isCore?: boolean): void;
    /**
     * Activate a registered hook with p5.js
     * @param hookType The type of hook to activate
     */
    activateHook(hookType: HookType): void;
    /**
     * Deactivate a hook from p5.js without unregistering it from the manager
     * @param hookType The type of hook to deactivate
     */
    deactivateHook(hookType: HookType): void;
    /**
     * Get all hooks for a specific type (used internally by addon system)
     * @param hookType The type of hooks to retrieve
     * @returns Array of hook functions
     */
    getHooks(hookType: HookType): HookFunction[];
    /**
     * Check if we're using p5.js 2.x.x
     */
    get isP5Version2(): boolean;
}
