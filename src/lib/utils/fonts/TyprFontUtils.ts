import p5 from 'p5';

/**
 * Gets the glyph index for a given Unicode code point in a Typr.js font
 * @param font The p5.Font object containing Typr.js font data
 * @param codePoint The Unicode code point to look up
 * @returns The glyph index, or 0 if not found
 */
export function getGlyphIndex(font: p5.Font, codePoint: number): number {
    // Access the cmap to translate from Unicode to glyph index
    const cmap = font.data.cmap;

    if (!cmap || !cmap.tables) return 0;

    // Try to find the code point in any of the cmap tables
    for (const table of cmap.tables) {
        if (table.format === 4) {
            for (let i = 0; i < table.startCount.length; i++) {
                if (codePoint >= table.startCount[i] && codePoint <= table.endCount[i]) {
                    // Handle the mapping based on how the format 4 cmap works
                    if (table.idRangeOffset[i] === 0) {
                        return (codePoint + table.idDelta[i]) & 0xFFFF;
                    } else {
                        const idx = table.idRangeOffset[i] / 2 + (codePoint - table.startCount[i]) -
                            (table.startCount.length - i);
                        if (idx >= 0 && idx < table.glyphIdArray.length) {
                            const glyphId = table.glyphIdArray[idx];
                            if (glyphId !== 0) {
                                return (glyphId + table.idDelta[i]) & 0xFFFF;
                            }
                        }
                    }
                }
            }
        }
    }

    return 0; // Not found
}

/**
 * Creates an empty path object with the required interface
 */
export function createEmptyPath(): { getBoundingBox(): { x1: number; y1: number; x2: number; y2: number }; toSVG(): string } {
    return {
        getBoundingBox: () => ({ x1: 0, y1: 0, x2: 0, y2: 0 }),
        toSVG: () => ""
    };
}

/**
 * Creates a path object for a glyph that implements the same interface as OpenType.js paths
 * @param font The p5.Font object containing Typr.js font data
 * @param glyphData The glyph data from the Typr.js glyf table
 * @param x The x position
 * @param y The y position
 * @param fontSize The font size
 * @returns A path object with getBoundingBox and toSVG methods
 */
export function createGlyphPath(
    font: p5.Font,
    glyphData: any,
    x: number,
    y: number,
    fontSize: number
): { getBoundingBox(): { x1: number; y1: number; x2: number; y2: number }; toSVG(): string } {
    // If there's no glyph data or it's empty
    if (!glyphData || !glyphData.xs || glyphData.xs.length === 0) {
        return createEmptyPath();
    }

    // Scale factor based on font size and unitsPerEm
    const scale = fontSize / font.data.head.unitsPerEm;

    // Create a path object with the required interface
    return {
        getBoundingBox: () => {
            // Return a scaled bounding box
            return {
                x1: x + (glyphData.xMin * scale),
                y1: y + (-glyphData.yMax * scale),  // Flip Y coordinates (TTF uses Y-up)
                x2: x + (glyphData.xMax * scale),
                y2: y + (-glyphData.yMin * scale)   // Flip Y coordinates
            };
        },
        toSVG: () => {
            // Generate an SVG path string
            return glyphToSVGPath(glyphData, x, y, scale);
        }
    };
}

/**
 * Converts a glyph to an SVG path string
 * @param glyphData The glyph data
 * @param x The x position
 * @param y The y position
 * @param scale The scale factor
 * @returns SVG path string
 */
export function glyphToSVGPath(glyphData: any, x: number, y: number, scale: number): string {
    if (!glyphData || !glyphData.xs) return "";

    const { xs, ys, endPts, flags } = glyphData;

    if (!xs || !ys || !endPts || !flags) return "";

    // SVG path format: <path d="...commands..." />
    let pathData = "";
    let startIndex = 0;

    // Process each contour in the glyph
    for (let i = 0; i < endPts.length; i++) {
        const endPt = endPts[i];
        if (endPt < startIndex) continue; // Invalid contour

        // Check if we have points in this contour
        if (endPt >= startIndex) {
            // Start the path at the first point
            const firstX = x + (xs[startIndex] * scale);
            const firstY = y - (ys[startIndex] * scale); // Flip Y coordinates
            pathData += `M${firstX.toFixed(2)},${firstY.toFixed(2)}`;

            // Process points in this contour
            let j = startIndex + 1;
            while (j <= endPt) {
                // Check if current point is on curve or off curve (control point)
                const isOnCurve = (flags[j] & 1) !== 0;

                if (isOnCurve) {
                    // Add line to on-curve point
                    const currX = x + (xs[j] * scale);
                    const currY = y - (ys[j] * scale);
                    pathData += `L${currX.toFixed(2)},${currY.toFixed(2)}`;
                    j++;
                } else {
                    // Handle quadratic bezier curve
                    // We need to find the next on-curve point to complete the curve
                    const ctrlX = x + (xs[j] * scale);
                    const ctrlY = y - (ys[j] * scale);

                    // Find next point (could be on-curve or another control point)
                    let nextJ = (j + 1 > endPt) ? startIndex : j + 1;
                    let nextIsOnCurve = (flags[nextJ] & 1) !== 0;

                    if (nextIsOnCurve) {
                        // Simple case: one control point followed by on-curve point
                        const nextX = x + (xs[nextJ] * scale);
                        const nextY = y - (ys[nextJ] * scale);
                        pathData += `Q${ctrlX.toFixed(2)},${ctrlY.toFixed(2)} ${nextX.toFixed(2)},${nextY.toFixed(2)}`;
                        j = nextJ + 1;
                    } else {
                        // Two consecutive off-curve points - implied on-curve point between them
                        const nextX = x + (xs[nextJ] * scale);
                        const nextY = y - (ys[nextJ] * scale);

                        // Calculate implied on-curve point (midpoint)
                        const impliedX = (ctrlX + nextX) / 2;
                        const impliedY = (ctrlY + nextY) / 2;

                        pathData += `Q${ctrlX.toFixed(2)},${ctrlY.toFixed(2)} ${impliedX.toFixed(2)},${impliedY.toFixed(2)}`;

                        // Make current point the next off-curve point
                        j = nextJ;
                    }
                }
            }

            // Close the path
            pathData += "Z";
        }

        // Move to the next contour
        startIndex = endPt + 1;
    }

    // Return SVG path with proper formatting
    return `<path d="${pathData}" />`;
}