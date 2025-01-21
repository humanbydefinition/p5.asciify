import p5 from 'p5';
import { P5AsciifyColorPalette } from './ColorPalette';
import { P5AsciifyFontTextureAtlas } from './FontTextureAtlas';
/**
 * Represents a set of characters to be used by an ASCII renderer.
 *
 * Contains a `P5AsciifyColorPalette` instance to manage the color references for each set character.
 */
export declare class P5AsciifyCharacterSet {
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    /** The color palette for the character set. */
    characterColorPalette: P5AsciifyColorPalette;
    /** The list of individual characters in the character set. */
    private _characters;
    /**
     * Create a new character set instance.
     * @param p The p5 instance.
     * @param asciiFontTextureAtlas The font texture atlas to reference for character colors.
     * @param characters The characters to use in the character set.
     */
    constructor(p: p5, asciiFontTextureAtlas: P5AsciifyFontTextureAtlas, characters?: string);
    /**
     * Validates the characters to ensure they are supported by the current font.
     * @param characters The characters to validate.
     * @returns The validated characters as a list of individual characters.
     * @throws {@link P5AsciifyError} If any characters are not supported by the set font.
     */
    private validateCharacters;
    /**
     * Sets the characters to be used in the character set and updates the color palette texture.
     * @param characters The string of characters to use.
     */
    setCharacterSet(characters: string): void;
    /**
     * Resets the character set colors. Gets called when the font atlas is updated with a new font.
     */
    reset(): void;
    get characters(): string;
}
