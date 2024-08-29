/**
 * @class P5AsciifyGrid
 * @description
 * Represents a 2D grid for the P5Asciify library.
 * Handles the dimensions and resizing of the grid.
 */
class P5AsciifyGrid {
    /**
     * Creates an instance of P5AsciifyGrid.
     * @param {Object} options - The grid options.
     * @param {number} options.cellWidth - The width of each cell in the grid.
     * @param {number} options.cellHeight - The height of each cell in the grid.
     */
    constructor({ cellWidth, cellHeight }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    addInstance(p5Instance) {
        this.p5Instance = p5Instance;
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
     * Adjusts the grid's offset to center it within the given width and height in the ASCII shader.
     * @private
     */
    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((this.p5Instance.width - this.width) / 2);
        this.offsetY = Math.floor((this.p5Instance.height - this.height) / 2);
    }

    /**
     * Calculates the number of columns and rows for the grid based on the current cell dimensions.
     * @returns {number[]} An array containing the number of columns and rows.
     * @private
     */
    _calculateGridCellDimensions() {
        const cellsX = Math.floor(this.p5Instance.width / this.cellWidth);
        const cellsY = Math.floor(this.p5Instance.height / this.cellHeight);
        return [cellsX, cellsY];
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