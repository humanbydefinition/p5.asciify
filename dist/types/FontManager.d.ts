import p5 from 'p5';
import { OpenTypeGlyph } from './types';
/**
 * Manages a texture atlas for font rendering in the ASCII rendering process.
 */
export declare class P5AsciifyFontManager {
    private _p;
    private _font;
    private _characters;
    private _characterGlyphs;
    constructor(p: p5, fontSource?: string | p5.Font);
    private _initializeGlyphsAndCharacters;
    loadFont(font: string | p5.Font, onSuccess?: () => void): void;
    private _isValidFontPath;
    glyphColor(char: string): [number, number, number];
    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters The string of characters to check.
     * @returns An array of unsupported characters. List is empty if all characters are supported.
     */
    getUnsupportedCharacters(characters: string): string[];
    /**
     * Validates a string of characters against the current font.
     * @param characters The string of characters to validate.
     * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
     */
    validateCharacters(characters: string): void;
    /**
     * Gets an array of RGB colors for a given string or array of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws {@link P5AsciifyError} If a character is not found in the texture atlas.
     */
    getCharsetColorArray(characters?: string): Array<[number, number, number]>;
    get font(): p5.Font;
    get characters(): string[];
    get characterGlyphs(): OpenTypeGlyph[];
}
