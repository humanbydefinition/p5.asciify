import p5 from 'p5';

/**
 * Manages the 3D grid for the ASCII rendering pipeline of an {@link P5Asciifier} instance.
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

    /** Whether the grid dimensions are fixed, or flexible based on the canvas dimensions. */
    public fixedDimensions: boolean = false;

    /**
     * Create a new grid instance.
     * @param _p The p5 instance.
     * @param _cellWidth The width of each cell in the grid.
     * @param _cellHeight The height of each cell in the grid.
     * @ignore
     */
    constructor(
        private _p: p5,
        private _cellWidth: number,
        private _cellHeight: number,
    ) {
        this.reset();
    }

    /**
     * Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.
     * @ignore
     */
    public reset(): void {
        if (!this.fixedDimensions) {
            [this._cols, this._rows] = [Math.floor(this._p.width / this._cellWidth), Math.floor(this._p.height / this._cellHeight)];
        }

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
     * @ignore
     */
    public resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void {
        [this._cellWidth, this._cellHeight] = [newCellWidth, newCellHeight];
        this.reset();
    }

    /**
     * Re-assign the grid dimensions and resize the grid. 
     * 
     * Calling this method makes the grid dimensions fixed, meaning they will not automatically resize based on the canvas dimensions.
     * @param newCols The new number of columns.
     * @param newRows The new number of rows.
     * @ignore
     */
    public resizeGridDimensions(newCols: number, newRows: number): void {
        this.fixedDimensions = true;
        [this._cols, this._rows] = [newCols, newRows];
        this._resizeGrid();
    }

    /**
     * Make the grid dimensions flexible again, and `reset()` the grid.
     * @ignore
     */
    public resetGridDimensions(): void {
        this.fixedDimensions = false;
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