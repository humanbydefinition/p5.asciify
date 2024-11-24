// RandomManager.js
class RandomManager {
    constructor(initialSeed) {
        this.initialSeed = initialSeed;
        this.seedrandom = Math.seedrandom;
        this.mainGenerator = this.seedrandom(this.initialSeed, { state: true });
        this.currentState = this.mainGenerator.state();

        this.initialState = this.mainGenerator.state();

        this.saveState = this.mainGenerator.state();
    }

    /**
     * Generates the next random number and updates the current state.
     * @returns {number} A pseudo-random number between 0 (inclusive) and 1 (exclusive).
     */
    getRandom() {
        const rand = this.mainGenerator();
        this.currentState = this.mainGenerator.state();
        return rand;
    }

    getTempRandom() {
        const tempGen = this.getTemporaryGenerator();
        return tempGen();
    }

    reset() {
        this.mainGenerator = this.seedrandom(this.initialSeed, { state: true });
        this.currentState = this.mainGenerator.state();
    }

    /**
     * Creates a temporary generator with the current state.
     * This generator can be used to generate random numbers without affecting the main generator.
     * @returns {object} A temporary seedrandom generator.
     */
    getTemporaryGenerator() {
        return this.seedrandom('', { state: this.currentState });
    }

    /**
     * Resets the main generator to a specific state.
     * @param {object} state - The state to reset the main generator to.
     */
    resetToState(state) {
        this.mainGenerator = this.seedrandom('', { state: state });
        this.currentState = this.mainGenerator.state();
    }

    /**
     * Saves the current state of the main generator.
     * @returns {object} The current state of the main generator.
     */
    backupState(state) {
        this.saveState = state;
    }

    /**
     * Restores the main generator to a previously saved state.
     * @param {object} state - The state to restore the main generator to.
     */
    restoreSaveState() {
        this.mainGenerator = this.seedrandom('', { state: this.saveState });
        this.currentState = this.mainGenerator.state();
    }

    /**
     * Generates a random integer between min (inclusive) and max (exclusive).
     * @param {number} min - The minimum integer value.
     * @param {number} max - The maximum integer value.
     * @returns {number} A pseudo-random integer between min and max.
     */
    getRandomInt(min, max) {
        return Math.floor(this.getRandom() * (max - min)) + min;
    }

    /**
     * Shuffles an array using the Fisher-Yates algorithm with the main generator.
     * @param {Array} array - The array to shuffle.
     * @returns {Array} The shuffled array.
     */
    shuffleArray(array) {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = this.getRandomInt(0, i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Shuffles an array using a temporary generator.
     * @param {Array} array - The array to shuffle.
     * @returns {Array} The shuffled array.
     */
    shuffleArrayWithTemp(array) {
        const tempGen = this.getTemporaryGenerator();
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(tempGen() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}