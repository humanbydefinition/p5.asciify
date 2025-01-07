import { P5AsciifyError } from './AsciifyError';
import P5AsciifyColorPalette from './colorpalette.js';

/**
 * @class P5AsciifyCharacterSet
 * @description
 * A class that represents a character set for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all the characters in the character set.
 */
class P5AsciifyCharacterSet {

    constructor({ p5Instance, asciiFontTextureAtlas, characters }) {
        this.p5Instance = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;

        this.characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this.characters);

        this.characterColorPalette = new P5AsciifyColorPalette(this.characterColors);
        this.characterColorPalette.setup(this.p5Instance);
    }

    /**
     * Validates a string of characters to ensure they are supported by the current font.
     * @param {string} characters 
     * @param {string} defaultCharacters 
     * @returns {string[]} The validated characters. If any characters are unsupported, the default characters are returned.
     */
    validateCharacters(characters) {
        let unsupportedChars = this.asciiFontTextureAtlas.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
        return Array.from(characters);
    }

    /**
     * Sets the characters to be used in the character set and creates a new texture.
     * @param {string} characters - The string of characters to set.
     */
    setCharacterSet(characters) {
        this.characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this.characters);
        this.characterColorPalette.setColors(this.characterColors);
    }
}

export default P5AsciifyCharacterSet;