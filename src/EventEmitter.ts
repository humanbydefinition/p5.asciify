export class P5AsciifyEventEmitter {
    private eventListeners: Map<string, Array<(data: any) => void>>;

    constructor() {
        this.eventListeners = new Map<string, Array<(data: any) => void>>();
    }

    emit(eventName: string, data: any): void {
        const listeners = this.eventListeners.get(eventName) || [];
        listeners.forEach(callback => callback(data));
    }

    on(eventName: string, callback: (data: any) => void): void {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName)?.push(callback);
    }

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