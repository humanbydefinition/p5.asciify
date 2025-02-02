import p5 from 'p5';
/**
 * Manages the grid dimensions for the ASCII renderers.
 * The grid automatically sizes to fit the maximum number of cells based on
 * current canvas dimensions and font metrics.
 *
 * While the grid properties are readable, avoid modifying them directly through this class's methods.
 * Direct modifications can lead to synchronization issues between the grid and other components.
 * Instead, use the methods provided by the `P5Asciifier` instance `p5asciify` to modify font properties,
 * which will properly propagate changes to the grid.
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
     * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
     */
    reset(): void;
    /**
     * Reset the total grid width & height, and the offset to the outer canvas.
     */
    private _resizeGrid;
    /**
     * Re-assign the grid cell dimensions and `reset()` the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     */
    resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void;
    /**
     * Returns the width of each cell in the grid.
     */
    get cellWidth(): number;
    /**
     * Returns the height of each cell in the grid.
     */
    get cellHeight(): number;
    /**
     * Returns the number of columns in the grid.
     */
    get cols(): number;
    /**
     * Returns the number of rows in the grid.
     */
    get rows(): number;
    /**
     * Returns the total width of the grid.
     */
    get width(): number;
    /**
     * Returns the total height of the grid.
     */
    get height(): number;
    /**
     * Returns the offset to the outer canvas borders on the x-axis when centering the grid.
     */
    get offsetX(): number;
    /**
     * Returns the offset to the outer canvas borders on the y-axis when centering the grid.
     */
    get offsetY(): number;
}
