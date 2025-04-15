import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import { P5AsciifyRendererManager } from '../renderers/RendererManager';
import { P5AsciifyError } from '../AsciifyError';

/**
 * Drawing mode for SVG characters
 */
export type SVGDrawMode = 'fill' | 'stroke' | 'text';

/**
 * Options for SVG export
 */
export interface SVGExportOptions {
    /**
     * The filename to save the SVG file as. If not provided, a default filename is used.
     */
    filename?: string;

    /**
     * Whether to include cell background rectangles in the SVG output.
     * When false, only the character paths are included, creating a more compact SVG.
     * Default is true.
     */
    includeBackgroundRectangles?: boolean;

    /**
     * The drawing mode for ASCII characters (fill, stroke, or text).
     * When set to 'fill', characters are rendered as filled shapes.
     * When set to 'stroke', characters are rendered as outlines.
     * When set to 'text', characters are rendered as text elements (more compact).
     * Default is 'fill'.
     */
    drawMode?: SVGDrawMode;

    /**
     * The stroke width to use when drawMode is set to 'stroke'.
     * Default is 1.0.
     */
    strokeWidth?: number;

    /**
     * Font family to use when drawMode is set to 'text'.
     * If not specified, "monospace" will be used.
     */
    fontFamily?: string;

    /**
     * Whether to apply hatch pattern fills when in 'stroke' mode for pen plotter compatibility.
     * Only applies when drawMode is 'stroke'.
     * Default is false.
     */
    useHatchFill?: boolean;

    /**
     * Hatch pattern type when useHatchFill is true.
     * Options: 'diagonal', 'cross', 'horizontal', 'vertical'
     * Default is 'diagonal'.
     */
    hatchPattern?: 'diagonal' | 'cross' | 'horizontal' | 'vertical';

    /**
     * Spacing between hatch lines in pixels.
     * Default is 3.
     */
    hatchSpacing?: number;

    /**
     * Whether to optimize the SVG for pen plotting (removes unnecessary attributes,
     * ensures proper stroke properties, etc.)
     * Default is false.
     */
    optimizeForPenPlotter?: boolean;
}

/**
 * Utility class for exporting ASCII art as SVG files.
 */
export class P5AsciifySVGExporter {
    /**
     * The p5.js instance.
     */
    private p: p5;

    /**
     * Creates a new SVG exporter.
     * @param p The p5.js instance
     */
    constructor(p: p5) {
        this.p = p;
    }

    /**
     * Exports the current ASCII output as an SVG file.
     * @param rendererManager The renderer manager containing framebuffers with ASCII data
     * @param grid The grid information for dimensions and cell sizes
     * @param fontManager The font manager with character data
     * @param options Options for SVG export or just the filename as a string for backward compatibility
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     */
    public saveSVG(
        rendererManager: P5AsciifyRendererManager,
        grid: P5AsciifyGrid,
        fontManager: P5AsciifyFontManager,
        options: SVGExportOptions
    ): void {
        // Set defaults for options
        const exportOptions: SVGExportOptions = {
            includeBackgroundRectangles: true,
            drawMode: 'fill',
            strokeWidth: 1.0,
            useHatchFill: false,
            hatchPattern: 'diagonal',
            hatchSpacing: 3,
            optimizeForPenPlotter: false,
            ...options
        };

        // Generate default filename if none provided
        if (!exportOptions.filename) {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            exportOptions.filename = `asciify_output_${date}_${time}`;
        }

        // Access the framebuffers
        const characterFramebuffer = rendererManager.characterFramebuffer;
        const primaryColorFramebuffer = rendererManager.primaryColorFramebuffer;
        const secondaryColorFramebuffer = rendererManager.secondaryColorFramebuffer;
        const inversionFramebuffer = rendererManager.inversionFramebuffer;
        const rotationFramebuffer = rendererManager.rotationFramebuffer;

        if (!characterFramebuffer) {
            throw new P5AsciifyError('No renderer available to generate SVG output.');
        }

        // Load pixels from all framebuffers
        characterFramebuffer.loadPixels();
        primaryColorFramebuffer.loadPixels();
        secondaryColorFramebuffer.loadPixels();
        inversionFramebuffer.loadPixels();
        rotationFramebuffer.loadPixels();

        const characterPixels = characterFramebuffer.pixels;
        const primaryColorPixels = primaryColorFramebuffer.pixels;
        const secondaryColorPixels = secondaryColorFramebuffer.pixels;
        const inversionPixels = inversionFramebuffer.pixels;
        const rotationPixels = rotationFramebuffer.pixels;

        // Get grid dimensions and cell sizes
        const cols = grid.cols;
        const rows = grid.rows;
        const cellWidth = grid.cellWidth;
        const cellHeight = grid.cellHeight;

        // Total dimensions of the output SVG
        const gridWidth = grid.width;
        const gridHeight = grid.height;

        // Font information
        const charGlyphs = fontManager.characterGlyphs;
        const chars = fontManager.characters;

        // Start building SVG content
        let svgContent = this.generateSVGHeader(gridWidth, gridHeight);

        // Add background rect if needed
        if (exportOptions.includeBackgroundRectangles) {
            const bgColor = rendererManager.asciiDisplayRenderer.backgroundColor;
            const bgColorObj = this.p.color(bgColor as p5.Color);
            const bgColorStr = `rgba(${bgColorObj._array[0] * 255},${bgColorObj._array[1] * 255},${bgColorObj._array[2] * 255},${bgColorObj._array[3]})`;
            svgContent += `\n<rect width="${gridWidth}" height="${gridHeight}" fill="${bgColorStr}" />`;
        }

        // Create a group for the ASCII cells
        svgContent += `\n<g id="ascii-cells">`;

        // Iterate through the grid to create the SVG cells with characters
        let idx = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const pixelIdx = idx * 4;

                // Get character index from red and green channels
                const r = characterPixels[pixelIdx];
                const g = characterPixels[pixelIdx + 1];
                let charIndex = r + (g << 8);

                // Clamp character index
                if (charIndex >= chars.length) {
                    charIndex = chars.length - 1;
                }

                const char = chars[charIndex];

                // Get the colors for this cell from primary/secondary framebuffers
                let primaryColor = {
                    r: primaryColorPixels[pixelIdx],
                    g: primaryColorPixels[pixelIdx + 1],
                    b: primaryColorPixels[pixelIdx + 2],
                    a: primaryColorPixels[pixelIdx + 3]
                };

                let secondaryColor = {
                    r: secondaryColorPixels[pixelIdx],
                    g: secondaryColorPixels[pixelIdx + 1],
                    b: secondaryColorPixels[pixelIdx + 2],
                    a: secondaryColorPixels[pixelIdx + 3]
                };

                // Check if colors should be inverted based on inversionFramebuffer
                // White pixel (255) in inversionFramebuffer means colors should be swapped
                const inversionValue = inversionPixels[pixelIdx];
                if (inversionValue === 255) {
                    // Swap primary and secondary colors
                    const tempColor = primaryColor;
                    primaryColor = secondaryColor;
                    secondaryColor = tempColor;
                }

                // Calculate rotation angle from rotationFramebuffer
                // Red channel for degrees up to 255, green channel for additional degrees
                const rotationRed = rotationPixels[pixelIdx];
                const rotationGreen = rotationPixels[pixelIdx + 1];
                const rotationAngle = rotationRed + (rotationGreen * 256 / 15);

                // Calculate position for this cell
                const cellX = x * cellWidth;
                const cellY = y * cellHeight;

                svgContent += this.generateSVGCellContent(
                    charIndex,
                    primaryColor,
                    secondaryColor,
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    rotationAngle,
                    fontManager,
                    charGlyphs,
                    exportOptions
                );

                idx++;
            }
        }

        // Close the SVG
        svgContent += `\n</g>\n</svg>`;

        this.downloadSVG(svgContent, exportOptions.filename);
    }

    /**
     * Generates the SVG header content
     * @param width The width of the SVG
     * @param height The height of the SVG
     * @returns The SVG header content
     */
    private generateSVGHeader(width: number, height: number): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
     xmlns="http://www.w3.org/2000/svg" version="1.1">
<title>ascii art generated via p5.asciify</title>
<desc>ascii art visualization of a p5.js sketch</desc>`;
    }

    /**
     * Generates the SVG content for a single cell
     * @param charIndex The index of the character in the font atlas
     * @param primaryColor The foreground color for the cell
     * @param secondaryColor The background color for the cell
     * @param cellX The x position of the cell
     * @param cellY The y position of the cell
     * @param cellWidth The width of the cell
     * @param cellHeight The height of the cell
     * @param rotationAngle The rotation angle for the character
     * @param fontManager The font manager
     * @param charGlyphs The character glyphs
     * @param options The SVG export options
     * @returns The SVG content for the cell
     */
    private generateSVGCellContent(
        charIndex: number,
        primaryColor: { r: number, g: number, b: number, a: number },
        secondaryColor: { r: number, g: number, b: number, a: number },
        cellX: number,
        cellY: number,
        cellWidth: number,
        cellHeight: number,
        rotationAngle: number,
        fontManager: P5AsciifyFontManager,
        charGlyphs: any[],
        options: SVGExportOptions
    ): string {
        let cellContent = '';

        // Add the cell background if needed and if backgrounds are included
        if (options.includeBackgroundRectangles && secondaryColor.a > 0) {
            const bgColorStr = `rgba(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a / 255})`;

            if (options.drawMode === 'stroke') {
                cellContent += `\n  <rect x="${cellX}" y="${cellY}" width="${cellWidth}" height="${cellHeight}" stroke="${bgColorStr}" fill="none" stroke-width="${options.strokeWidth || 1.0}" />`;
            } else {
                cellContent += `\n  <rect x="${cellX}" y="${cellY}" width="${cellWidth}" height="${cellHeight}" fill="${bgColorStr}" />`;
            }
        }

        // Calculate center point of the cell for rotation
        const centerX = cellX + (cellWidth / 2);
        const centerY = cellY + (cellHeight / 2);

        // Get the actual character from fontManager
        const char = fontManager.characters[charIndex];
        const colorStr = `rgba(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a / 255})`;

        if (options.drawMode === 'text') {
            // Use text element mode - more compact but requires font to be available
            const fontFamily = options.fontFamily || 'monospace';
            const fontSize = Math.min(cellWidth, cellHeight) * 0.8; // Scale font to fit cell

            if (rotationAngle > 0) {
                cellContent += `\n  <text x="${centerX}" y="${centerY}" 
                    font-family="${fontFamily}" font-size="${fontSize}px" fill="${colorStr}"
                    text-anchor="middle" dominant-baseline="middle"
                    transform="rotate(${rotationAngle} ${centerX} ${centerY})">${this.escapeXml(char)}</text>`;
            } else {
                cellContent += `\n  <text x="${centerX}" y="${centerY}" 
                    font-family="${fontFamily}" font-size="${fontSize}px" fill="${colorStr}"
                    text-anchor="middle" dominant-baseline="middle">${this.escapeXml(char)}</text>`;
            }
        } else {
            // Original path-based rendering (fill or stroke)
            // Get the glyph for this character if available
            const glyph = charGlyphs[charIndex];

            // Adjust position to center glyph within cell
            const xOffset = cellX + (cellWidth - glyph.advanceWidth * fontManager.fontSize / fontManager.font.font.unitsPerEm) / 2;
            const yOffset = cellY + (cellHeight + fontManager.fontSize * 0.7) / 2;

            // Get SVG path data from the glyph
            const pathObj = glyph.getPath(xOffset, yOffset, fontManager.fontSize);

            // Get SVG path data and extract just the 'd' attribute value
            const svgPath = pathObj.toSVG();
            const dMatch = svgPath.match(/d="([^"]+)"/);

            if (dMatch && dMatch[1]) {
                // Start transform group if needed for rotation
                if (rotationAngle > 0) {
                    cellContent += `\n  <g transform="rotate(${rotationAngle} ${centerX} ${centerY})">`;
                }

                // Apply either fill or stroke based on drawMode
                if (options.drawMode === 'stroke') {
                    const strokeWidth = options.strokeWidth || 1.0;
                    const pathId = `path-${charIndex}-${cellX}-${cellY}`.replace(/\./g, '-');

                    // Add the path with stroke and no fill for pen plotter
                    cellContent += `\n    <path id="${pathId}" d="${dMatch[1]}" stroke="${colorStr}" stroke-width="${strokeWidth}" fill="none" />`;

                    // If hatch fill is enabled, add hatching
                    if (options.useHatchFill) {
                        cellContent += this.generateHatchPattern(
                            pathId,
                            cellX,
                            cellY,
                            cellWidth,
                            cellHeight,
                            colorStr,
                            options.hatchPattern || 'diagonal',
                            options.hatchSpacing || 3,
                            strokeWidth
                        );
                    }
                } else {
                    // Regular fill mode
                    cellContent += `\n    <path d="${dMatch[1]}" fill="${colorStr}" />`;
                }

                // Close transform group if needed
                if (rotationAngle > 0) {
                    cellContent += `\n  </g>`;
                }
            }
        }

        return cellContent;
    }

    /**
     * Escapes special XML characters in a string
     * @param str The string to escape
     * @returns The escaped string
     */
    private escapeXml(str: string): string {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /**
     * Generates SVG content for a hatch pattern to fill the given path
     * This is useful for pen plotters that can't use solid fills
     * @param pathId The ID of the path to apply hatching to
     * @param cellX The x position of the cell
     * @param cellY The y position of the cell
     * @param cellWidth The width of the cell
     * @param cellHeight The height of the cell
     * @param color The stroke color for the hatch lines
     * @param pattern The hatch pattern type
     * @param spacing The spacing between hatch lines
     * @param strokeWidth The width of the hatch lines
     * @returns SVG content for the hatch pattern
     */
    private generateHatchPattern(
        pathId: string,
        cellX: number,
        cellY: number,
        cellWidth: number,
        cellHeight: number,
        color: string,
        pattern: 'diagonal' | 'cross' | 'horizontal' | 'vertical',
        spacing: number,
        strokeWidth: number
    ): string {
        // Create a clip path to constrain the hatching within the character path
        let hatchContent = `\n    <clipPath id="clip-${pathId}">
      <use href="#${pathId}" />
    </clipPath>`;

        // Create a group for all hatch lines, clipped to the character shape
        hatchContent += `\n    <g clip-path="url(#clip-${pathId})" stroke="${color}" stroke-width="${strokeWidth}" fill="none">`;

        // Calculate a larger buffer to ensure complete coverage of character shapes
        // Characters can have complex shapes that extend beyond regular bounds
        const buffer = Math.max(cellWidth, cellHeight) * 1.5;

        // Extend bounding box to ensure full coverage
        const x1 = cellX - buffer;
        const y1 = cellY - buffer;
        const x2 = cellX + cellWidth + buffer;
        const y2 = cellY + cellHeight + buffer;

        // Use a tighter spacing for more consistent coverage
        const effectiveSpacing = Math.max(1.0, spacing * 0.8);

        // Add appropriate hatching based on the selected pattern
        if (pattern === 'horizontal' || pattern === 'cross') {
            // Add horizontal lines with increased density
            for (let y = y1; y <= y2; y += effectiveSpacing) {
                hatchContent += `\n      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" />`;
            }
        }

        if (pattern === 'vertical' || pattern === 'cross') {
            // Add vertical lines
            for (let x = x1; x <= x2; x += effectiveSpacing) {
                hatchContent += `\n      <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" />`;
            }
        }

        if (pattern === 'diagonal' || pattern === 'cross') {
            // Use a more comprehensive approach for diagonal lines
            // Calculate diagonal properties based on both width and height
            const width = x2 - x1;
            const height = y2 - y1;
            const diagonalLength = Math.sqrt(width * width + height * height) * 2;

            // Calculate range to ensure full coverage
            const range = diagonalLength;

            // Forward diagonal (/)
            for (let offset = -range; offset <= range; offset += effectiveSpacing) {
                hatchContent += `\n      <line 
                x1="${x1 + (offset < 0 ? -offset : 0)}" 
                y1="${y1 + (offset > 0 ? offset : 0)}" 
                x2="${Math.min(x1 + diagonalLength, x2)}" 
                y2="${Math.min(y1 + diagonalLength, y2)}" />`;
            }

            // Backward diagonal (\) if cross pattern
            if (pattern === 'cross') {
                for (let offset = -range; offset <= range; offset += effectiveSpacing) {
                    hatchContent += `\n      <line 
                    x1="${x1 + (offset < 0 ? -offset : 0)}" 
                    y1="${y2 - (offset > 0 ? offset : 0)}" 
                    x2="${Math.min(x1 + diagonalLength, x2)}" 
                    y2="${Math.max(y2 - diagonalLength, y1)}" />`;
                }
            }
        }

        // Close the hatch group
        hatchContent += `\n    </g>`;

        return hatchContent;
    }

    /**
     * Creates a downloadable SVG file and initiates the download
     * @param svgContent The SVG content to download
     * @param filename The filename for the SVG file
     */
    private downloadSVG(svgContent: string, filename: string): void {
        // Create a blob and download the SVG file
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${filename}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
    }
}