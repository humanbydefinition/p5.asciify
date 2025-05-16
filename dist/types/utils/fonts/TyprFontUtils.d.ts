import p5 from 'p5';
/**
 * Gets the glyph index for a given Unicode code point in a Typr.js font
 * @param font The p5.Font object containing Typr.js font data
 * @param codePoint The Unicode code point to look up
 * @returns The glyph index, or 0 if not found
 */
export declare function getGlyphIndex(font: p5.Font, codePoint: number): number;
/**
 * Creates an empty path object with the required interface
 */
export declare function createEmptyPath(): {
    getBoundingBox(): {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    toSVG(): string;
};
/**
 * Creates a path object for a glyph that implements the same interface as OpenType.js paths
 * @param font The p5.Font object containing Typr.js font data
 * @param glyphData The glyph data from the Typr.js glyf table
 * @param x The x position
 * @param y The y position
 * @param fontSize The font size
 * @returns A path object with getBoundingBox and toSVG methods
 */
export declare function createGlyphPath(font: p5.Font, glyphData: any, x: number, y: number, fontSize: number): {
    getBoundingBox(): {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    toSVG(): string;
};
/**
 * Converts a glyph to an SVG path string
 * @param glyphData The glyph data
 * @param x The x position
 * @param y The y position
 * @param scale The scale factor
 * @returns SVG path string
 */
export declare function glyphToSVGPath(glyphData: any, x: number, y: number, scale: number): string;
