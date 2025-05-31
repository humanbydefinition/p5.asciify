import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils/utils';

export type HookType = 'init' | 'beforePreload' | 'afterPreload' | 'beforeSetup' | 'afterSetup' | 'pre' | 'post' | 'remove';

export interface HookFunction {
    fn: (this: p5) => void | Promise<void>;
    registered: boolean;
    isCore: boolean;
}

/**
 * Manages p5.js lifecycle hooks for both 1.x.x and 2.x.x versions
 */
export class P5HookManager {
    private registeredHooks: Map<HookType, HookFunction> = new Map();
    private isP5v2: boolean = false;

    constructor() {
        this.isP5v2 = compareVersions(p5.prototype.VERSION, "2.0.0") >= 0;
    }

    /**
     * Register a hook function
     * @param hookType The type of hook to register
     * @param fn The function to execute
     * @param autoRegister Whether to immediately register with p5.js (default: true)
     * @param isCore Whether this is a core hook (protected from unregistration)
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

        const hookFunction: HookFunction = {
            fn,
            registered: false,
            isCore
        };

        this.registeredHooks.set(hookType, hookFunction);

        if (autoRegister) {
            this.activateHook(hookType);
        }
    }

    /**
     * Activate a registered hook with p5.js
     * @param hookType The type of hook to activate
     */
    public activateHook(hookType: HookType): void {
        const hookFunction = this.registeredHooks.get(hookType);
        if (!hookFunction) {
            throw new P5AsciifyError(`Hook '${hookType}' not found.`);
        }

        if (hookFunction.registered) {
            return; // Already activated
        }

        if (!this.isP5v2) {
            // For p5.js 1.x.x, register directly with p5.js
            p5.prototype.registerMethod(hookType, hookFunction.fn);
            hookFunction.registered = true;
        }
    }

    /**
     * Deactivate a hook from p5.js without unregistering it from the manager
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

        if (!hookFunction.registered) {
            return; // Already deactivated
        }

        if (!this.isP5v2) {
            p5.prototype.unregisterMethod(hookType, hookFunction.fn);

            console.log(`Deactivated hook '${hookType}' from p5.js.`);
            hookFunction.registered = false;
        }
        // For p5.js 2.x.x, we can't deactivate individual hooks from the addon system
    }

    /**
     * Get all hooks for a specific type (used internally by addon system)
     * @param hookType The type of hooks to retrieve
     * @returns Array of hook functions
     */
    public getHooks(hookType: HookType): HookFunction[] {
        const hookFunction = this.registeredHooks.get(hookType);
        return hookFunction ? [hookFunction] : [];
    }


    /**
     * Check if we're using p5.js 2.x.x
     */
    public get isP5Version2(): boolean {
        return this.isP5v2;
    }
}