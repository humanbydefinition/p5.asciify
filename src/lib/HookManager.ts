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
 * Uses a proxy-based approach to control hook execution without relying on p5.js unregistration
 */
export class P5HookManager {
    private registeredHooks: Map<HookType, HookFunction> = new Map();
    private isP5v2: boolean = false;

    constructor() {
        this.isP5v2 = compareVersions(p5.prototype.VERSION, "2.0.0") >= 0;
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

        // Register with p5.js only once
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
}