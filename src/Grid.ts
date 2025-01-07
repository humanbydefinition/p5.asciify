import p5 from 'p5';

/**
 * Represents a 2D grid, handling the dimensions and resizing of the grid.
 */
export class P5AsciifyGrid {
    private p: p5;
    private cellWidth: number;
    private cellHeight: number;
    private cols: number = 0;
    private rows: number = 0;
    private width: number = 0;
    private height: number = 0;
    private offsetX: number = 0;
    private offsetY: number = 0;

    constructor(p: p5, cellWidth: number, cellHeight: number) {
        this.p = p;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.reset();
    }

    /**
     * Resets the grid dimensions based on the current cell width and height.
     * Calculates the number of columns and rows and resizes the grid accordingly.
     */
    public reset(): void {
        const [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    /**
     * Resizes the grid dimensions based on the current number of columns and rows, as well as the cell width and height.
     * Adjusts the grid's offset to center it within the given canvas dimensions.
     */
    private _resizeGrid(): void {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((this.p.width - this.width) / 2);
        this.offsetY = Math.floor((this.p.height - this.height) / 2);
    }

    /**
     * Calculates the number of columns and rows for the grid based on the current cell and sketch dimensions.
     * @returns An array containing the number of columns and rows for the grid.
     */
    private _calculateGridCellDimensions(): [number, number] {
        const cols = Math.floor(this.p.width / this.cellWidth);
        const rows = Math.floor(this.p.height / this.cellHeight);
        return [cols, rows];
    }

    /**
     * Resizes the dimensions of a grid cell in pixels.
     * Recalculates the number of columns and rows and resizes the grid accordingly.
     * @param newCellWidth - The new width of each cell in the grid.
     * @param newCellHeight - The new height of each cell in the grid.
     */
    public resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        this.reset();
    }

    /**
     * Resizes the dimensions of the grid based on the number of given columns and rows.
     * If the new dimensions exceed the maximum dimensions of the grid, the grid is reset to its default dimensions.
     * @param numCols - The new number of columns for the grid.
     * @param numRows - The new number of rows for the grid.
     */
    public resizeCellDimensions(numCols: number, numRows: number): void {
        const [maxCols, maxRows] = this._calculateGridCellDimensions();
        if (numCols > maxCols || numRows > maxRows) {
            console.warn(`The defined grid dimensions exceed the maximum dimensions of the grid. The maximum dimensions for the given font(size) and sketch dimensions are ${maxCols} x ${maxRows}. Resetting to default dimensions.`);
            this.reset();
            return;
        }

        this.cols = numCols;
        this.rows = numRows;

        // Resize the grid based on new dimensions
        this._resizeGrid();
    }
}