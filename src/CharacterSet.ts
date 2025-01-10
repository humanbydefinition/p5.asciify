import p5 from 'p5';

import { P5AsciifyError } from './AsciifyError';
import { P5AsciifyColorPalette } from './ColorPalette';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';

/**
 * Represents a set of characters to be used by an ASCII renderer.
 */
export class P5AsciifyCharacterSet {
    private p5Instance: p5; 
    private asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    private characters: string[];
    private characterColors: [number, number, number][];
    private characterColorPalette: P5AsciifyColorPalette;

    constructor(p5Instance: p5, asciiFontTextureAtlas: P5AsciifyFontTextureAtlas, characters: string) {
        this.p5Instance = p5Instance;
        this.asciiFontTextureAtlas = asciiFontTextureAtlas;

        this.characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this.characters);

        this.characterColorPalette = new P5AsciifyColorPalette(this.characterColors);
        this.characterColorPalette.setup(this.p5Instance);
    }

    /**
     * Validates the characters to ensure they are supported by the current font.
     * @param characters The characters to validate.
     * @returns The validated characters as a list of characters.
     * @throws {P5AsciifyError} If any characters are not supported by the font
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
     * @param characters The string of characters to use.
     */
    public setCharacterSet(characters: string): void {
        this.characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this.characters);
        this.characterColorPalette.setColors(this.characterColors);
    }
}