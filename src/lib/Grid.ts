import p5 from 'p5';

/**
 * Represents a 2D grid, where each cell has a fixed width and height.
 * Based on the current canvas dimensions, the grid is resized to fit the maximum number of cells.
 */
export class P5AsciifyGrid {
    /**
     * The number of columns in the grid.
     */
    private _cols!: number;

    /**
     * The number of rows in the grid.
     */
    private _rows!: number;

    /**
     * The total width of the grid in pixels.
     */
    private _width!: number;

    /**
     * The total height of the grid in pixels.
     */
    private _height!: number;

    /**
     * The offset to the outer canvas on the x-axis when centering the grid.
     */
    private _offsetX!: number;

    /**
     * The offset to the outer canvas on the y-axis when centering the grid.
     */
    private _offsetY!: number;

    /**
     * Create a new grid instance.
     * @param p The p5 instance.
     * @param _cellWidth The width of each cell in the grid.
     * @param _cellHeight The height of each cell in the grid.
     */
    constructor(
        private p: p5,
        private _cellWidth: number,
        private _cellHeight: number
    ) {
        this.reset();
    }

    /**
     * Reset the grid to the default number of columns and rows based on the current canvas and `_cellWidth` and `_cellHeight`.
     */
    public reset(): void {
        [this._cols, this._rows] = [Math.floor(this.p.width / this._cellWidth), Math.floor(this.p.height / this._cellHeight)];
        this._resizeGrid();
    }

    /**
     * Reset the total grid width & height, and the offset to the outer canvas.
     */
    private _resizeGrid(): void {
        this._width = this._cols * this._cellWidth;
        this._height = this._rows * this._cellHeight;
        this._offsetX = Math.floor((this.p.width - this._width) / 2);
        this._offsetY = Math.floor((this.p.height - this._height) / 2);
    }

    /**
     * Re-assign the grid cell dimensions and reset the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     */
    public resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void {
        [this._cellWidth, this._cellHeight] = [newCellWidth, newCellHeight];
        this.reset();
    }

    // Getters
    get cellWidth() { return this._cellWidth; }
    get cellHeight() { return this._cellHeight; }
    get cols() { return this._cols; }
    get rows() { return this._rows; }
    get width() { return this._width; }
    get height() { return this._height; }
    get offsetX() { return this._offsetX; }
    get offsetY() { return this._offsetY; }
}