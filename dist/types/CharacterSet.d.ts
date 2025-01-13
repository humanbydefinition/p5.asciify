import p5 from 'p5';
import { P5AsciifyColorPalette } from './ColorPalette';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
/**
 * Represents a set of characters to be used by an ASCII renderer.
 */
export declare class P5AsciifyCharacterSet {
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    private _characters;
    private characterColors;
    characterColorPalette: P5AsciifyColorPalette;
    constructor(p: p5, asciiFontTextureAtlas: P5AsciifyFontTextureAtlas, characters: string);
    /**
     * Validates the characters to ensure they are supported by the current font.
     * @param characters The characters to validate.
     * @returns The validated characters as a list of characters.
     * @throws {P5AsciifyError} If any characters are not supported by the font
     */
    private validateCharacters;
    /**
     * Sets the characters to be used in the character set and updates the texture.
     * @param characters The string of characters to use.
     */
    setCharacterSet(characters: string): void;
    /**
     * Resets the character set colors. Gets called when the font atlas is updated.
     */
    reset(): void;
    get characters(): string[];
}
