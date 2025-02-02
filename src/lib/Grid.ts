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
export class P5AsciifyGrid {
    /** The number of columns in the grid. */
    private _cols!: number;

    /** The number of rows in the grid. */
    private _rows!: number;

    /** The total width of the grid in pixels. */
    private _width!: number;

    /** The total height of the grid in pixels. */
    private _height!: number;

    /** The offset to the outer canvas on the x-axis when centering the grid. */
    private _offsetX!: number;

    /** The offset to the outer canvas on the y-axis when centering the grid. */
    private _offsetY!: number;

    /**
     * Create a new grid instance.
     * @param _p The p5 instance.
     * @param _cellWidth The width of each cell in the grid.
     * @param _cellHeight The height of each cell in the grid.
     */
    constructor(
        private _p: p5,
        private _cellWidth: number,
        private _cellHeight: number
    ) {
        this.reset();
    }

    /**
     * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
     */
    public reset(): void {
        [this._cols, this._rows] = [Math.floor(this._p.width / this._cellWidth), Math.floor(this._p.height / this._cellHeight)];
        this._resizeGrid();
    }

    /**
     * Reset the total grid width & height, and the offset to the outer canvas.
     */
    private _resizeGrid(): void {
        this._width = this._cols * this._cellWidth;
        this._height = this._rows * this._cellHeight;
        this._offsetX = Math.floor((this._p.width - this._width) / 2);
        this._offsetY = Math.floor((this._p.height - this._height) / 2);
    }

    /**
     * Re-assign the grid cell dimensions and `reset()` the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     */
    public resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void {
        [this._cellWidth, this._cellHeight] = [newCellWidth, newCellHeight];
        this.reset();
    }

    /**
     * Returns the width of each cell in the grid.
     */
    get cellWidth() { return this._cellWidth; }

    /**
     * Returns the height of each cell in the grid.
     */
    get cellHeight() { return this._cellHeight; }

    /**
     * Returns the number of columns in the grid.
     */
    get cols() { return this._cols; }

    /**
     * Returns the number of rows in the grid.
     */
    get rows() { return this._rows; }

    /**
     * Returns the total width of the grid.
     */
    get width() { return this._width; }

    /**
     * Returns the total height of the grid.
     */
    get height() { return this._height; }

    /**
     * Returns the offset to the outer canvas borders on the x-axis when centering the grid.
     */
    get offsetX() { return this._offsetX; }

    /**
     * Returns the offset to the outer canvas borders on the y-axis when centering the grid.
     */
    get offsetY() { return this._offsetY; }
}