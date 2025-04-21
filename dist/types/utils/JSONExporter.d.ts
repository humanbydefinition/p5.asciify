import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import { P5AsciifyRendererManager } from '../renderers/RendererManager';
/**
 * Options for JSON export.
 */
export interface JSONExportOptions {
    /**
     * The filename to save the JSON file as. If not provided, a default filename is used.
     */
    filename?: string;
    /**
     * Whether to include empty/space cells in the output.
     * Default is `true`.
     */
    includeEmptyCells?: boolean;
    /**
     * Whether to pretty-print the JSON with indentation.
     * Default is `true`.
     */
    prettyPrint?: boolean;
}
/**
 * Interface representing a cell in the JSON export.
 */
export interface ASCIICell {
    /**
     * X position of the cell in the grid.
     */
    x: number;
    /**
     * Y position of the cell in the grid.
     */
    y: number;
    /**
     * The character in the cell.
     */
    character: string;
    /**
     * Unicode code point of the character.
     */
    unicode: number;
    /**
     * Hexadecimal representation of the cell's foreground color.
     */
    color: string;
    /**
     * Hexadecimal representation of the cell's background color.
     */
    backgroundColor: string;
    /**
     * Rotation of the cell in degrees.
     */
    rotation: number;
    /**
     * Whether the foreground and background colors are inverted.
     */
    inverted: boolean;
    /** Whether the cell is flipped horizontally. */
    flipHorizontal: boolean;
    /** Whether the cell is flipped vertically. */
    flipVertical: boolean;
}
/**
 * Utility class for exporting ASCII art as JSON.
 */
export declare class P5AsciifyJSONExporter {
    /**
     * The p5.js instance.
     */
    private p;
    /**
     * Creates a new JSON exporter.
     * @param p The p5.js instance
     */
    constructor(p: p5);
    /**
     * Exports the current ASCII output as a JSON file.
     * @param rendererManager The renderer manager containing framebuffers with ASCII data
     * @param grid The grid information for dimensions and cell sizes
     * @param fontManager The font manager with character data
     * @param options Options for JSON export
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     */
    saveJSON(rendererManager: P5AsciifyRendererManager, grid: P5AsciifyGrid, fontManager: P5AsciifyFontManager, options?: JSONExportOptions): void;
    /**
     * Converts RGBA values to a hex color string
     * @param r Red channel (0-255)
     * @param g Green channel (0-255)
     * @param b Blue channel (0-255)
     * @param a Alpha channel (0-255)
     * @returns Hex color string (e.g., "#RRGGBBAA")
     */
    private rgbaToHex;
    /**
     * Creates a downloadable JSON file and initiates the download
     * @param jsonContent The JSON content to download
     * @param filename The filename for the JSON file
     */
    private downloadJSON;
}
