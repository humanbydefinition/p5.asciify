import { P5AsciifyRendererPlugin } from './RendererPlugin';
import { P5AsciifyError } from '../AsciifyError';

/**
 * Registry that manages renderer plugins for p5.asciify
 * @ignore
 */
export class P5AsciifyPluginRegistry {
    // Map of plugin id to plugin instance
    private _plugins = new Map<string, P5AsciifyRendererPlugin>();

    /**
     * Registers a new renderer plugin.
     * @param plugin The renderer plugin to register
     * @throws {@link P5AsciifyError} - If a plugin with the same ID is already registered or conflicts with built-in renderers
     */
    public register(plugin: P5AsciifyRendererPlugin): void {
        if (this._plugins.has(plugin.id)) {
            throw new P5AsciifyError(`A plugin with ID '${plugin.id}' is already registered`);
        }
        
        this._plugins.set(plugin.id, plugin);
    }
    
    /**
     * Check if a plugin with the given ID is registered
     * @param id Plugin ID to check
     * @returns True if the plugin exists, false otherwise
     */
    public has(id: string): boolean {
        return this._plugins.has(id);
    }
    
    /**
     * Get a plugin by its ID
     * @param id Plugin ID
     * @returns The plugin instance or undefined if not found
     */
    public get(id: string): P5AsciifyRendererPlugin | undefined {
        return this._plugins.get(id);
    }
    
    /**
     * Unregister a plugin by its ID
     * @param id Plugin ID to remove
     * @returns True if the plugin was removed, false if it wasn't found
     */
    public unregister(id: string): boolean {
        return this._plugins.delete(id);
    }
    
    /**
     * Get all registered plugin IDs
     * @returns Array of plugin IDs
     */
    public getIds(): string[] {
        return Array.from(this._plugins.keys());
    }
    
    /**
     * Get all registered plugins
     * @returns Array of plugin instances
     */
    public getAll(): P5AsciifyRendererPlugin[] {
        return Array.from(this._plugins.values());
    }
}