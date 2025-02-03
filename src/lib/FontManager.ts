import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { OpenTypeGlyph } from './types';

/**
 * Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.
 */
export class P5AsciifyFontManager {

    /** The font to use for ASCII rendering. */
    private _font!: p5.Font;

    /** An array of supported characters in the font. */
    private _characters: string[] = [];

    /** An array of character glyphs with color assignments. */
    private _characterGlyphs: OpenTypeGlyph[] = [];

    /**
     * Creates a new `P5AsciifyFontManager` instance.
     * @param _p The p5 instance.
     * @param fontSource The source to load the font from. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object.
     */
    constructor(
        private _p: p5,
        fontSource: string | p5.Font,
    ) {
        this.loadFont(fontSource);
    }

    /**
     * Initializes the character glyphs and characters array.
     */
    private _initializeGlyphsAndCharacters(): void {
        const glyphs = Object.values(this._font.font.glyphs.glyphs) as OpenTypeGlyph[];

        // Initialize characters array
        this._characters = glyphs
            .filter((glyph): glyph is OpenTypeGlyph => glyph.unicode !== undefined)
            .map(glyph => String.fromCharCode(glyph.unicode!));

        // Initialize character glyphs with color assignments
        this._characterGlyphs = Object.values(this._font.font.glyphs.glyphs as OpenTypeGlyph[])
            .filter((glyph): glyph is OpenTypeGlyph => glyph.unicode !== undefined)
            .map((glyph, index) => {
                glyph.r = index % 256;
                glyph.g = Math.floor(index / 256) % 256;
                glyph.b = Math.floor(index / 65536);
                return glyph;
            });
    }

    /**
     * Loads a font for ASCII rendering.
     * 
     * **Note: For proper library functionality, use `p5asciify.loadFont();` instead 
     * of accessing this method directly. Direct access may lead to inconsistent state 
     * as other dependent components won't be updated.**
     * 
     * @param font The font to load. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object.
     * @param onSuccess A callback function to call when the font is successfully loaded.
     * @throws {@link P5AsciifyError} If the font parameter is invalid or the font fails to load.
     */
    public loadFont(
        font: string | p5.Font,
        onSuccess?: () => void,
    ): void {
        if (typeof font !== 'string' && !(font instanceof p5.Font)) {
            throw new P5AsciifyError('Invalid font parameter. Expected a path, base64 string, blob URL, or p5.Font object.');
        }

        // Handle font paths, base64 strings, and blob URLs
        if (typeof font === 'string') {
            if (!this._isValidFontString(font)) {
                throw new P5AsciifyError('Invalid font parameter. Expected .ttf, .otf file, or blob URL or base64 string.');
            }

            this._p.loadFont(
                font,
                (loadedFont: p5.Font) => {
                    this._font = loadedFont;
                    this._initializeGlyphsAndCharacters();
                    this._p._decrementPreload();
                    onSuccess?.();
                },
                () => {
                    throw new P5AsciifyError(`Failed to load font from: ${font}`);
                }
            );
            return;
        }

        // Handle p5.Font objects
        this._font = font;
        this._initializeGlyphsAndCharacters();
        onSuccess?.();
    }

    /**
     * Checks if a font string is valid.
     * @param fontString The font string to check.
     * @returns True if the font string is valid, false otherwise.
     */
    private _isValidFontString(fontString: string): boolean {
        if (fontString.startsWith('blob:') || fontString.startsWith('data:')) {
            return true;
        }
        const ext = fontString.toLowerCase().split('.').pop();
        return ext === 'ttf' || ext === 'otf';
    }

    /**
     * Gets the color of a character in the font.
     * @param char The character to get the color for.
     * @returns An array containing the RGB color values for the character, 
     *          which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer` 
     *          to convert those pixels into the selected character.
     * @throws {@link P5AsciifyError} If the character is not found in the texture atlas.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Get the color of the character 'A'
     *      const color = p5asciify.fontManager.glyphColor('A');
     *      console.log(color);
     *  }
     * ```
     */
    public glyphColor(char: string): [number, number, number] {
        const glyph = this._characterGlyphs.find(
            (glyph: OpenTypeGlyph) => glyph.unicodes.includes(char.codePointAt(0) as number)
        );

        if (!glyph) {
            throw new P5AsciifyError(`Could not find character in character set: ${char}`);
        }

        return [glyph.r as number, glyph.g as number, glyph.b as number];
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters The string of characters to check.
     * @returns An array of unsupported characters. List is empty if all characters are supported.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print a list of potentially unsupported characters.
     *      console.log(p5asciify.fontManager.getUnsupportedCharacters(" .,ABC123"));
     *  }
     * ```
     */
    public getUnsupportedCharacters(characters: string): string[] {
        return Array.from(
            new Set(
                Array.from(characters).filter(
                    (char: string) =>
                        !this._characterGlyphs.some((glyph: OpenTypeGlyph) =>
                            glyph.unicodes.includes(char.codePointAt(0) as number)
                        )
                )
            )
        );
    }

    /**
     * Validates a string of characters against the current font.
     * @param characters The string of characters to validate.
     * @throws {@link P5AsciifyError} If any characters are not supported by the current font.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Validate the characters 'ABC' (all supported)
     *      p5asciify.fontManager.validateCharacters('ABC');
     * 
     *      // Validate the characters 'ABC123' (unsupported characters '123')
     *      p5asciify.fontManager.validateCharacters('ABC123'); // -> Error
     *  }
     */
    public validateCharacters(characters: string): void {
        const unsupportedChars: string[] = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
    }

    /**
     * Gets an array of RGB colors for a given string of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws {@link P5AsciifyError} If a character is not found in the fonts available characters.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Get the RGB colors for the characters 'ABC'
     *      const colors = p5asciify.fontManager.glyphColors('ABC');
     *      console.log(colors);
     *  }
     * ```
     */
    public glyphColors(characters: string = ""): Array<[number, number, number]> {
        return Array.from(characters).map((char: string) => {
            const glyph = this._characterGlyphs.find(
                (glyph: OpenTypeGlyph) => glyph.unicodes.includes(char.codePointAt(0) as number)
            );

            if (!glyph) {
                throw new P5AsciifyError(`Could not find character in character set: ${char}`);
            }

            return [glyph.r as number, glyph.g as number, glyph.b as number];
        });
    }

    /**
     * The `p5.Font` object used for ASCII rendering.
     * 
     * @example
     * ```javascript
     *  function drawAsciify() {
     *      // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
     *      textFont(p5asciify.fontManager.font);
     *      textSize(16);
     *      fill(255);
     *      text(frameRate() + " FPS", 10, 10);
     *  }
     * ```
     */
    get font(): p5.Font { return this._font; }

    /**
     * An array of supported characters in the set font.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print the supported characters in the font
     *      console.log(p5asciify.fontManager.characters);
     *  }
     * ```
     */
    get characters(): string[] { return this._characters; }

    /**
     * An array of character glyphs in the set font with color assignments.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Print the character glyphs in the font
     *      console.log(p5asciify.fontManager.characterGlyphs);
     *  }
     * ```
     */
    get characterGlyphs(): OpenTypeGlyph[] { return this._characterGlyphs; }
}