/**
 * @class P5AsciifyColorPalette
 * @description Represents a single color palette
 */
class P5AsciifyColorPalette {
    constructor(colors) {
        this.colors = colors;
        this.rowIndex = -1; // Will be set by manager
    }

    getColors() {
        return this.colors;
    }

    getRowIndex() {
        return this.rowIndex;
    }
}

export default P5AsciifyColorPalette;