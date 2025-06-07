import { P5AsciifyRendererPlugin } from './RendererPlugin';
import { errorHandler } from '../errors';

/**
 * Registry that manages renderer plugins for p5.asciify.
 */
export class P5AsciifyPluginRegistry {
    // Map of plugin id to plugin instance
    private _plugins = new Map<string, P5AsciifyRendererPlugin>();

    /**
     * Registers a new renderer plugin.
     * @param plugin The renderer plugin to register
     * @throws If a plugin with the same ID is already registered or conflicts with built-in renderers
     */
    public register(plugin: P5AsciifyRendererPlugin): boolean {
        // Validate plugin parameter
        const isValidPlugin = errorHandler.validate(
            plugin && typeof plugin === 'object',
            'Plugin must be a valid P5AsciifyRendererPlugin object.',
            { providedValue: plugin, method: 'register' }
        );

        if (!isValidPlugin) {
            return false; // Return early if plugin validation fails
        }

        // Validate plugin has required ID property
        const hasValidId = errorHandler.validate(
            typeof plugin.id === 'string' && plugin.id.trim() !== '',
            'Plugin must have a valid non-empty ID.',
            { providedValue: plugin.id, method: 'register' }
        );

        if (!hasValidId) {
            return false; // Return early if ID validation fails
        }

        // Validate plugin is not already registered
        const isNotDuplicate = errorHandler.validate(
            !this._plugins.has(plugin.id),
            `A plugin with ID '${plugin.id}' is already registered.`,
            { providedValue: plugin.id, method: 'register' }
        );

        if (!isNotDuplicate) {
            return false; // Return early if plugin already exists
        }

        this._plugins.set(plugin.id, plugin);
        return true;
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