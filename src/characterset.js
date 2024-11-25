import P5AsciifyError from './errors.js';
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
        this.characterColors = this.getCharsetColorArray(this.characters);

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
        let unsupportedChars = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
        return Array.from(characters);
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param {string} characters - The string of characters to check.
     * @returns {string[]} An array of unsupported characters.
     */
    getUnsupportedCharacters(characters) {
        return Array.from(new Set(Array.from(characters).filter(char =>
            !this.asciiFontTextureAtlas.fontGlyphs.some(glyph => glyph.unicodes.includes(char.codePointAt(0)))
        )));
    }

    /**
     * Sets the characters to be used in the character set and creates a new texture.
     * @param {string} characters - The string of characters to set.
     */
    setCharacterSet(characters) {
        this.characters = this.validateCharacters(characters);
    }

    /**
     * Gets an array of RGB colors for given characters or string
     * @param {string|string[]} input - Either a string or array of characters
     * @returns {Array<[number,number,number]>} Array of RGB color values
     * @throws {Error} If character is not found in the texture atlas
     */
    getCharsetColorArray(input) {
        const chars = Array.isArray(input) ? input : Array.from(input);
        
        return chars.map(char => {
            const glyph = this.asciiFontTextureAtlas.characterGlyphs.find(
                glyph => glyph.unicodes.includes(char.codePointAt(0))
            );
    
            if (!glyph) {
                throw new Error(`Could not find character in character set: ${char}`);
            }
    
            return [glyph.r, glyph.g, glyph.b];
        });
    }
}

export default P5AsciifyCharacterSet;