/**
 * A simple event emitter class to handle custom events.
 */
export class P5AsciifyEventEmitter {
    private eventListeners: Map<string, Array<(data: any) => void>>;

    constructor() {
        this.eventListeners = new Map<string, Array<(data: any) => void>>();
    }

    /**
     * Emit an event with a given name and data.
     * @param eventName Name of the event to emit. 
     * @param data Data to pass to the event listeners.
     */
    emit(eventName: string, data: any): void {
        const listeners = this.eventListeners.get(eventName) || [];
        listeners.forEach(callback => callback(data));
    }

    /**
     * Register a callback for a given event name.
     * @param eventName Name of the event to listen for.
     * @param callback Callback function to run when the event is emitted.
     */
    on(eventName: string, callback: (data: any) => void): void {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName)?.push(callback);
    }

    /**
     * Remove a callback for a given event name.
     * @param eventName Name of the event to remove the callback from.
     * @param callback Callback function to remove.
     */
    off(eventName: string, callback: (data: any) => void): void {
        if (!this.eventListeners.has(eventName)) return;
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            this.eventListeners.set(
                eventName,
                listeners.filter(cb => cb !== callback)
            );
        }
    }
}