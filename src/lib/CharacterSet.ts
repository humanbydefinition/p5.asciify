import p5 from 'p5';

import { P5AsciifyError } from './AsciifyError';
import { P5AsciifyColorPalette } from './ColorPalette';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';

/**
 * Represents a set of characters to be used by an ASCII renderer.
 */
export class P5AsciifyCharacterSet {
    private _characters: string[];
    private characterColors: [number, number, number][];
    public characterColorPalette: P5AsciifyColorPalette;

    constructor(
        private p: p5,
        public asciiFontTextureAtlas: P5AsciifyFontTextureAtlas,
        characters: string
    ) {
        this._characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters);

        this.characterColorPalette = new P5AsciifyColorPalette(this.p, this.characterColors);
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
        this._characters = this.validateCharacters(characters);
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters);
        this.characterColorPalette.setColors(this.characterColors);
    }

    /**
     * Resets the character set colors. Gets called when the font atlas is updated.
     */
    public reset(): void {
        this.characterColors = this.asciiFontTextureAtlas.getCharsetColorArray(this._characters);
        this.characterColorPalette.setColors(this.characterColors);
    }

    // Getters
    get characters() { return this._characters; }
}