import { P5AsciifyError } from './AsciifyError';
import { P5AsciifyColorPalette } from './ColorPalette';
import p5 from 'p5';
import { P5AsciifyTextureAtlas } from './FontTextureAtlas';

/**
 * Interface for constructor parameters
 */
interface P5AsciifyCharacterSetOptions {
    p5Instance: p5;
    asciiFontTextureAtlas: P5AsciifyTextureAtlas; 
    characters: string;
}

/**
 * @class P5AsciifyCharacterSet
 * @description
 * A class that represents a character set for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all the characters in the character set.
 */
class P5AsciifyCharacterSet {
    private p5Instance: p5; 
    private asciiFontTextureAtlas: P5AsciifyTextureAtlas;
    private characters: string[];
    private characterColors: [number, number, number][];
    private characterColorPalette: P5AsciifyColorPalette;

    constructor({ p5Instance, asciiFontTextureAtlas, characters }: P5AsciifyCharacterSetOptions) {
        this.p5Instance = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;

        this.characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this.characters);

        this.characterColorPalette = new P5AsciifyColorPalette(this.characterColors);
        this.characterColorPalette.setup(this.p5Instance);
    }

    /**
     * Validates a string of characters to ensure they are supported by the current font.
     * @param characters - The string of characters to validate.
     * @returns The validated characters as an array of strings.
     * @throws P5AsciifyError if unsupported characters are found.
     */
    private validateCharacters(characters: string): string[] {
        const unsupportedChars: string[] = this.asciiFontTextureAtlas.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
        return Array.from(characters);
    }

    /**
     * Sets the characters to be used in the character set and updates the texture.
     * @param characters - The string of characters to set.
     */
    public setCharacterSet(characters: string): void {
        this.characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this.characters);
        this.characterColorPalette.setColors(this.characterColors);
    }
}

export default P5AsciifyCharacterSet;