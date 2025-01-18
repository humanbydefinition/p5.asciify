import p5 from 'p5';

import { P5AsciifyError } from './AsciifyError';
import { P5AsciifyColorPalette } from './ColorPalette';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';

/**
 * Represents a set of characters to be used by an ASCII renderer.
 * 
 * Contains a `P5AsciifyColorPalette` instance to manage the color references for each set character.
 */
export class P5AsciifyCharacterSet {

    /** The color palette for the character set. */
    public characterColorPalette: P5AsciifyColorPalette;

    /** The list of individual characters in the character set. */
    private _characters: string[];

    /**
     * Create a new character set instance.
     * @param p The p5 instance.
     * @param asciiFontTextureAtlas The font texture atlas to reference for character colors.
     * @param characters The characters to use in the character set.
     */
    constructor(
        private p: p5,
        public asciiFontTextureAtlas: P5AsciifyFontTextureAtlas,
        characters: string
    ) {
        this._characters = this.validateCharacters(characters);
        this.characterColorPalette = new P5AsciifyColorPalette(this.p, this.asciiFontTextureAtlas.getCharsetColorArray(this._characters));
    }

    /**
     * Validates the characters to ensure they are supported by the current font.
     * @param characters The characters to validate.
     * @returns The validated characters as a list of individual characters.
     * @throws {@link P5AsciifyError} If any characters are not supported by the set font.
     */
    private validateCharacters(characters: string): string[] {
        const unsupportedChars: string[] = this.asciiFontTextureAtlas.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
        return Array.from(characters);
    }

    /**
     * Sets the characters to be used in the character set and updates the color palette texture.
     * @param characters The string of characters to use.
     */
    public setCharacterSet(characters: string): void {
        this._characters = this.validateCharacters(characters);
        this.characterColorPalette.setColors(this.asciiFontTextureAtlas.getCharsetColorArray(this._characters));
    }

    /**
     * Resets the character set colors. Gets called when the font atlas is updated with a new font.
     */
    public reset(): void {
        this.characterColorPalette.setColors(this.asciiFontTextureAtlas.getCharsetColorArray(this._characters));
    }

    // Getters
    get characters() { return this._characters; }
}