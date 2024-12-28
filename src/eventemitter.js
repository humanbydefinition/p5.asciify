class P5AsciifyEventEmitter {
    constructor() {
        this.eventListeners = new Map();
    }

    emit(eventName, data) {
        const listeners = this.eventListeners.get(eventName) || [];
        listeners.forEach(callback => callback(data));
    }

    on(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName).push(callback);
    }

    off(eventName, callback) {
        if (!this.eventListeners.has(eventName)) return;
        const listeners = this.eventListeners.get(eventName);
        this.eventListeners.set(eventName, listeners.filter(cb => cb !== callback));
    }
}

export default P5AsciifyEventEmitter;