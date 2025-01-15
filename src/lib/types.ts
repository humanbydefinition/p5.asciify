/**
 * Extends the opentype.js `Glyph` class with r, g, and b properties for color.
 * Currently doesn't actually `extend` the class, but rather defines a new interface, 
 * since there is no typing provided for the opentype.js library.
 */
export type OpenTypeGlyph = {
    unicode: number;
    unicodes: number[];
    getPath(x: number, y: number, fontSize: number): {
        getBoundingBox(): { x1: number; y1: number; x2: number; y2: number };
    };
    r?: number;
    g?: number;
    b?: number;
}