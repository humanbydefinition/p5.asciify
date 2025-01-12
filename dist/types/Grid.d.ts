import p5 from 'p5';
/**
 * Represents a 2D grid, handling the dimensions and resizing of the grid.
 */
export declare class P5AsciifyGrid {
    private p;
    private _cellWidth;
    private _cellHeight;
    private _cols;
    private _rows;
    private _width;
    private _height;
    private _offsetX;
    private _offsetY;
    constructor(p: p5, _cellWidth: number, _cellHeight: number);
    /**
     * Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.
     */
    reset(): void;
    /**
     * Reset the total grid width/height and the offset to the outer canvas.
     */
    private _resizeGrid;
    /**
     * Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.
     * @returns The number of columns and rows in the grid.
     */
    private _calculateGridSize;
    /**
     * Re-assign the grid cell dimensions and reset the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     */
    resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void;
    get cellWidth(): number;
    get cellHeight(): number;
    get cols(): number;
    get rows(): number;
    get width(): number;
    get height(): number;
    get offsetX(): number;
    get offsetY(): number;
}
