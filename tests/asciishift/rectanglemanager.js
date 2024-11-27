// RectangleManager.js

class RectangleManager {
    constructor(gridCols, gridRows, splitDepth = 3, spacing = 0, maxRectangleCount = 64) {
        this.gridCols = gridCols;
        this.gridRows = gridRows;
        this.maxRectangleCount = maxRectangleCount;
        this.splitDepth = splitDepth;
        this.spacing = spacing;
        this.rectangles = [];
        this.maxRectangleDimension = 0;
    }

    updateGridDimensions(gridCols, gridRows) {
        this.gridCols = gridCols;
        this.gridRows = gridRows;
    }

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

        this.rectangles = shuffle(this.rectangles);
    }

    splitSpace(container, depth) {
        if (depth >= this.splitDepth) {
            this.rectangles.push({
                x: container.x + this.spacing,
                y: container.y + this.spacing,
                width: Math.max(0, container.width - 2 * this.spacing),
                height: Math.max(0, container.height - 2 * this.spacing)
            });
            return;
        }

        const splitHorizontal = random() > 0.5;

        if (splitHorizontal) {
            const splitPoint = Math.floor(random() * container.height);
            this.splitSpace(
                { x: container.x, y: container.y, width: container.width, height: splitPoint },
                depth + 1,
            );
            this.splitSpace(
                {
                    x: container.x,
                    y: container.y + splitPoint,
                    width: container.width,
                    height: container.height - splitPoint
                },
                depth + 1,
            );
        } else {
            const splitPoint = Math.floor(random() * container.width);
            this.splitSpace(
                { x: container.x, y: container.y, width: splitPoint, height: container.height },
                depth + 1,
            );
            this.splitSpace(
                {
                    x: container.x + splitPoint,
                    y: container.y,
                    width: container.width - splitPoint,
                    height: container.height
                },
                depth + 1,
            );
        }
    }

    getRectangles() {
        return this.rectangles;
    }

    getMaxResetFrames() {
        return this.maxResetFrames;
    }

    getMaxRectangleDimension() {
        return this.maxRectangleDimension;
    }
}
