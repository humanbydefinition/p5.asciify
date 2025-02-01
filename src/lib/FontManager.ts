import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import { OpenTypeGlyph } from './types';

/**
 * Manages a texture atlas for font rendering in the ASCII rendering process.
 */
export class P5AsciifyFontManager {

    private _p: p5;

    private _font!: p5.Font;

    private _characters: string[] = [];

    private _characterGlyphs: OpenTypeGlyph[] = [];

    constructor(
        p: p5,
        fontSource?: string | p5.Font,
    ) {
        this._p = p;

        if (fontSource) {
            this.loadFont(fontSource);
        }
    }

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

    loadFont(
        font: string | p5.Font,
        onSuccess?: () => void,
    ): void {
            if (typeof font !== 'string' && !(font instanceof p5.Font)) {
                throw new P5AsciifyError('Invalid font parameter. Expected a path, base64 string, blob URL, or p5.Font object.');
            }

            // Handle blob URLs and file paths
            if (typeof font === 'string') {
                if (!this._isValidFontPath(font)) {
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

    private _isValidFontPath(path: string): boolean {
        // Handle blob URLs
        if (path.startsWith('blob:') || path.startsWith('data:')) {
            return true;
        }
        const ext = path.toLowerCase().split('.').pop();
        return ext === 'ttf' || ext === 'otf';
    }

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
     */
    public validateCharacters(characters: string): void {
        const unsupportedChars: string[] = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
    }

    /**
     * Gets an array of RGB colors for a given string or array of characters.
     * @param characters - A string of characters.
     * @returns Array of RGB color values.
     * @throws {@link P5AsciifyError} If a character is not found in the texture atlas.
     */
    public getCharsetColorArray(characters: string = ""): Array<[number, number, number]> {
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

    get font(): p5.Font { return this._font; }
    get characters(): string[] { return this._characters; }
    get characterGlyphs(): OpenTypeGlyph[] { return this._characterGlyphs; }
}