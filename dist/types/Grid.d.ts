import p5 from 'p5';
/**
 * Manages the grid dimensions for the ASCII renderer.
 *
 * Based on the current canvas dimensions, the grid is resized to fit the maximum number of cells.
 */
export declare class P5AsciifyGrid {
    private _p;
    private _cellWidth;
    private _cellHeight;
    /** The number of columns in the grid. */
    private _cols;
    /** The number of rows in the grid. */
    private _rows;
    /** The total width of the grid in pixels. */
    private _width;
    /** The total height of the grid in pixels. */
    private _height;
    /** The offset to the outer canvas on the x-axis when centering the grid. */
    private _offsetX;
    /** The offset to the outer canvas on the y-axis when centering the grid. */
    private _offsetY;
    /**
     * Create a new grid instance.
     * @param _p The p5 instance.
     * @param _cellWidth The width of each cell in the grid.
     * @param _cellHeight The height of each cell in the grid.
     */
    constructor(_p: p5, _cellWidth: number, _cellHeight: number);
    /**
     * Reset the grid to the default number of columns and rows based on the current canvas, and `_cellWidth` and `_cellHeight`.
     */
    reset(): void;
    /**
     * Reset the total grid width & height, and the offset to the outer canvas.
     */
    private _resizeGrid;
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
