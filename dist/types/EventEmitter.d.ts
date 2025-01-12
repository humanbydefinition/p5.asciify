/**
 * A simple event emitter class to handle custom events.
 */
export declare class P5AsciifyEventEmitter {
    private eventListeners;
    constructor();
    /**
     * Emit an event with a given name and data.
     * @param eventName Name of the event to emit.
     * @param data Data to pass to the event listeners.
     */
    emit(eventName: string, data: any): void;
    /**
     * Register a callback for a given event name.
     * @param eventName Name of the event to listen for.
     * @param callback Callback function to run when the event is emitted.
     */
    on(eventName: string, callback: (data: any) => void): void;
    /**
     * Remove a callback for a given event name.
     * @param eventName Name of the event to remove the callback from.
     * @param callback Callback function to remove.
     */
    off(eventName: string, callback: (data: any) => void): void;
}
