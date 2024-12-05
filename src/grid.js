/**
 * Represents a 2D grid, handling the dimensions and resizing of the grid.
 */
class P5AsciifyGrid {
    /**
     * Creates an instance of P5AsciifyGrid.
     * @param {p5} p5Instance - The p5 instance to get the width and height from.
     * @param {number} cellWidth - The width of each cell in the grid.
     * @param {number} cellHeight - The height of each cell in the grid.
     */
    constructor(p5Instance, cellWidth, cellHeight) {
        this.p5Instance = p5Instance;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.reset();
    }

    /**
     * Resets the grid dimensions based on the current cell width and height.
     * Calculates the number of columns and rows and resizes the grid accordingly.
     */
    reset() {
        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    /**
     * Resizes the grid dimensions based on the current number of columns and rows, as well as the cell width and height.
     * Adjusts the grid's offset to center it within the given canvas dimensions.
     */
    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((this.p5Instance.width - this.width) / 2);
        this.offsetY = Math.floor((this.p5Instance.height - this.height) / 2);
    }

    /**
     * Calculates the number of columns and rows for the grid based on the current cell and sketch dimensions.
     * @returns {number[]} An array containing the number of columns and rows for the grid.
     */
    _calculateGridCellDimensions() {
        return [Math.floor(this.p5Instance.width / this.cellWidth), Math.floor(this.p5Instance.height / this.cellHeight)];
    }

    /**
     * Resizes the dimensions of a grid cell in pixels.
     * Recalculates the number of columns and rows and resizes the grid accordingly.
     * @param {number} newCellWidth - The new width of each cell in the grid.
     * @param {number} newCellHeight - The new height of each cell in the grid.
     */
    resizeCellPixelDimensions(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        this.reset();
    }

    /**
     * Resizes the dimensions of the grid based on the number of given columns and rows.
     * If the new dimensions exceed the maximum dimensions of the grid, the grid is reset to its default dimensions.
     * @param {number} numCols - The new number of columns for the grid.
     * @param {number} numRows - The new number of rows for the grid
     */
    resizeCellDimensions(numCols, numRows) {
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
};

export default P5AsciifyGrid;