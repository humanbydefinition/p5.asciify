class P5AsciifyGrid {
    constructor({ cellWidth, cellHeight }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.reset();
    }

    reset() {
        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((windowWidth - this.width) / 2);
        this.offsetY = Math.floor((windowHeight - this.height) / 2);
    }

    _calculateGridCellDimensions() {
        const cellsX = Math.floor(windowWidth / this.cellWidth);
        const cellsY = Math.floor(windowHeight / this.cellHeight);
        return [cellsX, cellsY];
    }

    resizeCellDimensions(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        this.reset();
    }
};
