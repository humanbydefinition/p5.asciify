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
export class P5AsciifyJSONExporter {
    /**
     * The p5.js instance.
     */
    private p: p5;

    /**
     * Creates a new JSON exporter.
     * @param p The p5.js instance
     */
    constructor(p: p5) {
        this.p = p;
    }

    /**
     * Exports the current ASCII output as a JSON file.
     * @param rendererManager The renderer manager containing framebuffers with ASCII data
     * @param grid The grid information for dimensions and cell sizes
     * @param fontManager The font manager with character data
     * @param options Options for JSON export
     * @throws {@link P5AsciifyError} - If no renderer is available to fetch ASCII output from.
     */
    public saveJSON(
        rendererManager: P5AsciifyRendererManager,
        grid: P5AsciifyGrid,
        fontManager: P5AsciifyFontManager,
        options: JSONExportOptions = {}
    ): void {
        // Set defaults for options
        const exportOptions: JSONExportOptions = {
            includeEmptyCells: true,
            prettyPrint: true,
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
        const transformFramebuffer = rendererManager.transformFramebuffer;
        const rotationFramebuffer = rendererManager.rotationFramebuffer;

        // Load pixels from all framebuffers
        characterFramebuffer.loadPixels();
        primaryColorFramebuffer.loadPixels();
        secondaryColorFramebuffer.loadPixels();
        transformFramebuffer.loadPixels();
        rotationFramebuffer.loadPixels();

        const characterPixels = characterFramebuffer.pixels;
        const primaryColorPixels = primaryColorFramebuffer.pixels;
        const secondaryColorPixels = secondaryColorFramebuffer.pixels;
        const transformPixels = transformFramebuffer.pixels;
        const rotationPixels = rotationFramebuffer.pixels;

        // Get grid dimensions
        const cols = grid.cols;
        const rows = grid.rows;

        // Font information
        const chars = fontManager.characters;

        // Create the metadata object
        const metadata = {
            version: "1.0",
            created: new Date().toISOString(),
            gridSize: {
                cols: cols,
                rows: rows,
                cellWidth: grid.cellWidth,
                cellHeight: grid.cellHeight,
                width: grid.width,
                height: grid.height
            }
        };

        // Create the cells array
        const cells: ASCIICell[] = [];

        // Iterate through the grid to extract cell data
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

                // Skip empty cells if includeEmptyCells is false
                if (!exportOptions.includeEmptyCells && (char.character === ' ' || char.character === '')) {
                    idx++;
                    continue;
                }

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

                const transformR = transformPixels[pixelIdx];
                const transformG = transformPixels[pixelIdx + 1];
                const transformB = transformPixels[pixelIdx + 2];

                // R channel for inversion, G for horizontal flip, B for vertical flip
                const isInverted = transformR === 255;
                const flipH = transformG === 255;
                const flipV = transformB === 255;

                // The rest of color swapping logic remains the same
                if (isInverted) {
                    // Swap primary and secondary colors
                    const tempColor = primaryColor;
                    primaryColor = secondaryColor;
                    secondaryColor = tempColor;
                }

                // Calculate rotation angle from rotationFramebuffer
                // Red channel for degrees up to 255, green channel for additional degrees
                const rotationRed = rotationPixels[pixelIdx];
                const rotationGreen = rotationPixels[pixelIdx + 1];
                const rotationAngle = rotationRed + rotationGreen;

                // Convert colors to hex format
                const primaryColorHex = this.rgbaToHex(
                    primaryColor.r,
                    primaryColor.g,
                    primaryColor.b,
                    primaryColor.a
                );

                const secondaryColorHex = this.rgbaToHex(
                    secondaryColor.r,
                    secondaryColor.g,
                    secondaryColor.b,
                    secondaryColor.a
                );

                // Create the cell object
                const cell: ASCIICell = {
                    x: x,
                    y: y,
                    character: char.character,
                    unicode: char.unicode,
                    color: primaryColorHex,
                    backgroundColor: secondaryColorHex,
                    rotation: rotationAngle,
                    inverted: isInverted,
                    flipHorizontal: flipH,
                    flipVertical: flipV
                };

                // Add the cell to the array
                cells.push(cell);
                idx++;
            }
        }

        // Create the final JSON object
        const jsonOutput = {
            metadata: metadata,
            cells: cells
        };

        // Convert to JSON string
        const jsonString = JSON.stringify(
            jsonOutput,
            null,
            exportOptions.prettyPrint ? 2 : 0
        );

        // Download the JSON file
        this.downloadJSON(jsonString, exportOptions.filename);
    }

    /**
     * Converts RGBA values to a hex color string
     * @param r Red channel (0-255)
     * @param g Green channel (0-255)
     * @param b Blue channel (0-255)
     * @param a Alpha channel (0-255)
     * @returns Hex color string (e.g., "#RRGGBBAA")
     */
    private rgbaToHex(r: number, g: number, b: number, a: number): string {
        const componentToHex = (c: number) => {
            const hex = Math.round(c).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${componentToHex(a)}`;
    }

    /**
     * Creates a downloadable JSON file and initiates the download
     * @param jsonContent The JSON content to download
     * @param filename The filename for the JSON file
     */
    private downloadJSON(jsonContent: string, filename: string): void {
        // Create a blob and download the JSON file
        const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = jsonUrl;
        downloadLink.download = `${filename}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(jsonUrl);
    }
}