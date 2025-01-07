import p5 from 'p5';
import { P5AsciifyError } from './AsciifyError';
import  { Glyph } from 'opentype.js';

interface P5AsciifyFontTextureAtlasOptions {
    p5Instance: p5;
    font: p5.Font;
    fontSize: number;
}

interface MaxGlyphDimensions {
    width: number;
    height: number;
}

class P5AsciifyFontTextureAtlas {
    private p: p5;
    private font: any; // Replace 'any' with the actual font type
    private fontSize: number;
    private characters: string[];
    private characterGlyphs: Glyph[];
    private maxGlyphDimensions: MaxGlyphDimensions;
    private texture?: p5.Framebuffer;
    private charsetCols: number = 0;
    private charsetRows: number = 0;

    constructor({ p5Instance, font, fontSize }: P5AsciifyFontTextureAtlasOptions) {
        this.p = p5Instance;
        this.font = font;
        this.fontSize = fontSize;

        this.characters = Object.values(this.font.font.glyphs.glyphs)
            .filter((glyph: Glyph) => glyph.unicode !== undefined)
            .map((glyph: Glyph) => String.fromCharCode(glyph.unicode));

        this.characterGlyphs = this.loadCharacterGlyphs();
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(this.fontSize);
    }

    private loadCharacterGlyphs(): Glyph[] {
        // Load glyphs with unicode
        const glyphs: Glyph[] = Object.values(this.font.font.glyphs.glyphs).filter(
            (glyph: Glyph) => glyph.unicode !== undefined
        );

        // Assign colors to the sorted glyphs
        glyphs.forEach((glyph: Glyph, index: number) => {
            glyph.r = index % 256;
            glyph.g = Math.floor(index / 256) % 256;
            glyph.b = Math.floor(index / 65536);
        });

        return glyphs;
    }

    /**
     * Calculates the maximum dimensions of glyphs in the whole font for a given font size.
     * @param fontSize - The font size to use for calculations.
     * @returns An object containing the maximum width and height of the glyphs.
     */
    private getMaxGlyphDimensions(fontSize: number): MaxGlyphDimensions {
        return this.characterGlyphs.reduce<MaxGlyphDimensions>(
            (maxDims, glyph) => {
                const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
                return {
                    width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                    height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1)),
                };
            },
            { width: 0, height: 0 }
        );
    }

    /**
     * Sets the font object and resets the character set.
     * @param font - The new font object.
     */
    public setFontObject(font: any): void { // Replace 'any' with the actual font type
        this.font = font;
        this.characters = Object.values(this.font.font.glyphs.glyphs)
            .filter((glyph: Glyph) => glyph.unicode !== undefined)
            .map((glyph: Glyph) => String.fromCharCode(glyph.unicode));

        this.characterGlyphs = this.loadCharacterGlyphs();
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(this.fontSize);
    }

    /**
     * Sets the font size and updates the maximum glyph dimensions.
     * @param fontSize - The new font size.
     */
    public setFontSize(fontSize: number): void {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(this.fontSize);
    }

    /**
     * Creates a texture containing all characters in the character set, arranged in a 2d grid.
     * @param fontSize - The font size to use for rendering the texture.
     */
    public createTexture(fontSize: number): void {
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);
        const dimensions = this.getMaxGlyphDimensions(fontSize);

        if (!this.texture) {
            this.texture = this.p.createFramebuffer({
                width: dimensions.width * this.charsetCols,
                height: dimensions.height * this.charsetRows,
                depthFormat: this.p.UNSIGNED_INT,
                textureFiltering: this.p.NEAREST,
            });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();
        this.p.clear();
        this.drawCharacters(fontSize, dimensions);
        this.texture.end();
    }

    /**
     * Draws characters onto the texture.
     * @param fontSize - The font size to use for drawing the characters on the texture.
     * @param dimensions - The maximum dimensions of the glyphs.
     */
    private drawCharacters(fontSize: number, dimensions: MaxGlyphDimensions): void {
        this.p.clear();
        this.p.textFont(this.font);
        this.p.fill(255);
        this.p.textSize(fontSize);
        this.p.textAlign(this.p.LEFT, this.p.TOP);
        this.p.noStroke();

        for (let i = 0; i < this.characterGlyphs.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col - (dimensions.width * this.charsetCols) / 2;
            const y = dimensions.height * row - (dimensions.height * this.charsetRows) / 2;
            this.p.text(String.fromCharCode(this.characterGlyphs[i].unicode), x, y);
        }
    }

    /**
     * Gets an array of RGB colors for given characters or string
     * @param input - Either a string or array of characters
     * @returns Array of RGB color values
     * @throws P5AsciifyError If character is not found in the texture atlas
     */
    public getCharsetColorArray(input: string | string[]): Array<[number, number, number]> {
        const chars: string[] = Array.isArray(input) ? input : Array.from(input);

        return chars.map((char: string) => {
            const glyph = this.characterGlyphs.find(
                (glyph: Glyph) => glyph.unicodes.includes(char.codePointAt(0) as number)
            );

            if (!glyph) {
                throw new P5AsciifyError(`Could not find character in character set: ${char}`);
            }

            return [glyph.r as number, glyph.g as number, glyph.b as number];
        });
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters - The string of characters to check.
     * @returns An array of unsupported characters.
     */
    public getUnsupportedCharacters(characters: string): string[] {
        return Array.from(
            new Set(
                Array.from(characters).filter(
                    (char: string) =>
                        !this.characterGlyphs.some((glyph: Glyph) =>
                            glyph.unicodes.includes(char.codePointAt(0) as number)
                        )
                )
            )
        );
    }
}

export default P5AsciifyFontTextureAtlas;