// RectangleManager.js

class RectangleManager {
    /**
     * Initializes the RectangleManager with grid dimensions, split depth, spacing, and maximum rectangle count.
     * Creates a set of non-overlapping rectangles filling the grid space based on the split depth.
     * @param {number} gridCols - Number of columns in the grid.
     * @param {number} gridRows - Number of rows in the grid.
     * @param {number} [splitDepth=3] - Maximum depth for recursive splitting. A depth of 3 generates 8 rectangles.
     * @param {number} [spacing=1] - Spacing between rectangles.
     * @param {number} [maxRectangleCount=64] - Maximum number of rectangles to generate. Extra rectangles are filled with zero dimensions.
     */
    constructor(gridCols, gridRows, splitDepth = 3, spacing = 1, maxRectangleCount = 16) {
        this.gridCols = gridCols;
        this.gridRows = gridRows;
        this.maxRectangleCount = maxRectangleCount;
        this.splitDepth = splitDepth;
        this.spacing = spacing;
        this.rectangles = [];
        this.maxRectangleDimension = 0;
    }

    /**
     * Updates the grid dimensions.
     * @param {number} gridCols - New number of columns in the grid.
     * @param {number} gridRows - New number of rows in the grid.
     */
    updateGridDimensions(gridCols, gridRows) {
        this.gridCols = gridCols;
        this.gridRows = gridRows;
    }

    /**
     * Initializes and generates the rectangles based on current grid dimensions and split depth.
     */
    initializeRectangles() {
        this.maxRectangleDimension = 0;
        this.rectangles = [];

        const container = {
            x: 0,
            y: 0,
            width: this.gridCols,
            height: this.gridRows
        };
        this.splitSpace(container, 0);

        // Calculate the maximum rectangle dimension
        this.rectangles.forEach(rect => {
            if (rect.width > 0 && rect.height > 0) {
                const maxDimension = Math.max(rect.width, rect.height);
                if (maxDimension > this.maxRectangleDimension) {
                    this.maxRectangleDimension = maxDimension;
                }
            }
        });

        // Ensure rectangles has exactly maxRectangleCount elements
        while (this.rectangles.length < this.maxRectangleCount) {
            this.rectangles.push({ x: 0, y: 0, width: 0, height: 0 });
        }

        this.rectangles = shuffle(this.rectangles); // Shuffle the rectangles
    }

    /**
     * Recursively splits the container space to generate rectangles.
     * Spacing is reserved between child containers to ensure no spacing at grid edges.
     * @param {Object} container - The current container with x, y, width, and height.
     * @param {number} depth - Current depth of recursion.
     */
    splitSpace(container, depth) {
        if (depth >= this.splitDepth) {
            // Base case: create rectangle without adding spacing to edges
            this.rectangles.push({
                x: container.x,
                y: container.y,
                width: container.width,
                height: container.height
            });
            return;
        }

        // Decide split direction randomly
        const splitHorizontal = random() > 0.5;

        if (splitHorizontal) {
            // Ensure there is enough height to split and apply spacing
            if (container.height <= this.spacing + 1) {
                this.rectangles.push({
                    x: container.x,
                    y: container.y,
                    width: container.width,
                    height: container.height
                });
                return;
            }

            // Choose a split point ensuring spacing is reserved between the two child containers
            const minSplit = Math.min(1, container.height - this.spacing - 1);
            const splitPoint = Math.floor(random() * (container.height - this.spacing)) + minSplit;

            // Define first child container
            const firstChild = {
                x: container.x,
                y: container.y,
                width: container.width,
                height: splitPoint
            };

            // Define second child container with spacing reserved
            const secondChild = {
                x: container.x,
                y: container.y + splitPoint + this.spacing,
                width: container.width,
                height: container.height - splitPoint - this.spacing
            };

            // Recursively split the child containers
            this.splitSpace(firstChild, depth + 1);
            this.splitSpace(secondChild, depth + 1);
        } else {
            // Ensure there is enough width to split and apply spacing
            if (container.width <= this.spacing + 1) {
                this.rectangles.push({
                    x: container.x,
                    y: container.y,
                    width: container.width,
                    height: container.height
                });
                return;
            }

            // Choose a split point ensuring spacing is reserved between the two child containers
            const minSplit = Math.min(1, container.width - this.spacing - 1);
            const splitPoint = Math.floor(random() * (container.width - this.spacing)) + minSplit;

            // Define first child container
            const firstChild = {
                x: container.x,
                y: container.y,
                width: splitPoint,
                height: container.height
            };

            // Define second child container with spacing reserved
            const secondChild = {
                x: container.x + splitPoint + this.spacing,
                y: container.y,
                width: container.width - splitPoint - this.spacing,
                height: container.height
            };

            // Recursively split the child containers
            this.splitSpace(firstChild, depth + 1);
            this.splitSpace(secondChild, depth + 1);
        }
    }
}
