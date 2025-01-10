import p5 from 'p5';

/**
 * Represents a 2D grid, handling the dimensions and resizing of the grid.
 */
export class P5AsciifyGrid {
    private _cols = 0;
    private _rows = 0;
    private _width = 0;
    private _height = 0;
    private _offsetX = 0;
    private _offsetY = 0;

    constructor(
        private p: p5,
        private _cellWidth: number,
        private _cellHeight: number
    ) {
        this.reset();
    }

    /**
     * Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.
     */
    public reset(): void {
        [this._cols, this._rows] = this._calculateGridSize();
        this._resizeGrid();
    }

    /**
     * Reset the total grid width/height and the offset to the outer canvas.
     */
    private _resizeGrid(): void {
        this._width = this._cols * this._cellWidth;
        this._height = this._rows * this._cellHeight;
        this._offsetX = Math.floor((this.p.width - this._width) / 2);
        this._offsetY = Math.floor((this.p.height - this._height) / 2);
    }

    /**
     * Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.
     * @returns The number of columns and rows in the grid.
     */
    private _calculateGridSize(): [number, number] {
        return [
            Math.floor(this.p.width / this._cellWidth),
            Math.floor(this.p.height / this._cellHeight)
        ];
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