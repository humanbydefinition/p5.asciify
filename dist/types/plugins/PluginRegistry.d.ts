import { P5AsciifyRendererPlugin } from './RendererPlugin';
/**
 * Registry that manages renderer plugins for p5.asciify.
 */
export declare class P5AsciifyPluginRegistry {
    private _plugins;
    /**
     * Registers a new renderer plugin.
     * @param plugin The renderer plugin to register
     * @throws {@link P5AsciifyError} - If a plugin with the same ID is already registered or conflicts with built-in renderers
     */
    register(plugin: P5AsciifyRendererPlugin): void;
    /**
     * Check if a plugin with the given ID is registered
     * @param id Plugin ID to check
     * @returns True if the plugin exists, false otherwise
     */
    has(id: string): boolean;
    /**
     * Get a plugin by its ID
     * @param id Plugin ID
     * @returns The plugin instance or undefined if not found
     */
    get(id: string): P5AsciifyRendererPlugin | undefined;
    /**
     * Unregister a plugin by its ID
     * @param id Plugin ID to remove
     * @returns True if the plugin was removed, false if it wasn't found
     */
    unregister(id: string): boolean;
    /**
     * Get all registered plugin IDs
     * @returns Array of plugin IDs
     */
    getIds(): string[];
    /**
     * Get all registered plugins
     * @returns Array of plugin instances
     */
    getAll(): P5AsciifyRendererPlugin[];
}
