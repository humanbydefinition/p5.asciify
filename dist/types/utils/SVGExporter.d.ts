import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import { P5AsciifyRendererManager } from '../renderers/RendererManager';
/**
 * Options for SVG export.
 */
export interface SVGExportOptions {
    /**
     * The filename to save the SVG file as. If not provided, a default filename is used.
     */
    filename?: string;
    /**
     * Whether to include cell background rectangles in the SVG output.
     * When false, only the character paths are included, creating a more compact SVG.
     * Default is `true`.
     */
    includeBackgroundRectangles?: boolean;
    /**
     * The drawing mode for ASCII characters (`'fill'`, `'stroke'`, or `'text'`).
     * When set to `'fill'`, characters are rendered as filled shapes.
     * When set to `'stroke'`, characters are rendered as outlines.
     * When set to `'text'`, characters are rendered as text elements using `'monospaced'` font.
     * Default is `'fill'`.
     */
    drawMode?: 'fill' | 'stroke' | 'text';
    /**
     * The stroke width to use when drawMode is set to `'stroke'`.
     * Default is `1.0`.
     */
    strokeWidth?: number;
}
/**
 * Utility class for exporting ASCII art as SVG files.
 * @ignore
 */
export declare class P5AsciifySVGExporter {
    /**
     * The p5.js instance.
     */
    private p;
    /**
     * Creates a new SVG exporter.
     * @param p The p5.js instance
     */
    constructor(p: p5);
    /**
     * Exports the current ASCII output as an SVG file.
     * @param rendererManager The renderer manager containing framebuffers with ASCII data
     * @param grid The grid information for dimensions and cell sizes
     * @param fontManager The font manager with character data
     * @param options Options for SVG export or just the filename as a string for backward compatibility
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     */
    saveSVG(rendererManager: P5AsciifyRendererManager, grid: P5AsciifyGrid, fontManager: P5AsciifyFontManager, backgroundColor: p5.Color, options: SVGExportOptions): void;
    /**
     * Generates the SVG header content
     * @param width The width of the SVG
     * @param height The height of the SVG
     * @returns The SVG header content
     */
    private generateSVGHeader;
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
     * @param char The characters object array
     * @param options The SVG export options
     * @returns The SVG content for the cell
     */
    private generateSVGCellContent;
    /**
     * Escapes special XML characters in a string
     * @param str The string to escape
     * @returns The escaped string
     */
    private escapeXml;
    /**
     * Creates a downloadable SVG file and initiates the download
     * @param svgContent The SVG content to download
     * @param filename The filename for the SVG file
     */
    private downloadSVG;
}
