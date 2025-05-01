import { describe, it, expect, beforeEach } from 'vitest';
import { P5AsciifyGrid } from '../lib/Grid';
import p5 from 'p5';

// Mock p5 instances with different dimensions
const p5Mocks = [
    { width: 800, height: 800 } as p5,
    { width: 1024, height: 768 } as p5,
    { width: 1920, height: 1080 } as p5
];

// Grid configurations to test
const gridConfigs = [
    { cellWidth: 16, cellHeight: 16 },
    { cellWidth: 32, cellHeight: 24 },
    { cellWidth: 20, cellHeight: 30 }
];

describe('P5AsciifyGrid', () => {
    describe.each(p5Mocks)('with canvas dimensions w:$width h:$height', (mockP5) => {
        let grid: P5AsciifyGrid;

        describe.each(gridConfigs)('and cell dimensions w:$cellWidth h:$cellHeight', (config) => {
            beforeEach(() => {
                grid = new P5AsciifyGrid(mockP5, config.cellWidth, config.cellHeight);
            });

            describe('initialization', () => {
                it('should initialize with correct dimensions', () => {
                    expect(grid.cellWidth).toBe(config.cellWidth);
                    expect(grid.cellHeight).toBe(config.cellHeight);
                    expect(grid.cols).toBe(Math.floor(mockP5.width / config.cellWidth));
                    expect(grid.rows).toBe(Math.floor(mockP5.height / config.cellHeight));
                });

                it('should calculate correct total dimensions', () => {
                    const expectedWidth = Math.floor(mockP5.width / config.cellWidth) * config.cellWidth;
                    const expectedHeight = Math.floor(mockP5.height / config.cellHeight) * config.cellHeight;
                    
                    expect(grid.width).toBe(expectedWidth);
                    expect(grid.height).toBe(expectedHeight);
                });

                it('should calculate correct offsets', () => {
                    const expectedWidth = Math.floor(mockP5.width / config.cellWidth) * config.cellWidth;
                    const expectedHeight = Math.floor(mockP5.height / config.cellHeight) * config.cellHeight;
                    
                    expect(grid.offsetX).toBe(Math.floor((mockP5.width - expectedWidth) / 2));
                    expect(grid.offsetY).toBe(Math.floor((mockP5.height - expectedHeight) / 2));
                });
            });

            describe('resizing', () => {
                const newSizes = [
                    { width: 24, height: 24 },
                    { width: 40, height: 30 }
                ];

                it.each(newSizes)('should handle resize to w:$width h:$height', (newSize) => {
                    grid.resizeCellPixelDimensions(newSize.width, newSize.height);

                    expect(grid.cellWidth).toBe(newSize.width);
                    expect(grid.cellHeight).toBe(newSize.height);
                    expect(grid.cols).toBe(Math.floor(mockP5.width / newSize.width));
                    expect(grid.rows).toBe(Math.floor(mockP5.height / newSize.height));

                    const expectedWidth = grid.cols * newSize.width;
                    const expectedHeight = grid.rows * newSize.height;
                    
                    expect(grid.offsetX).toBe(Math.floor((mockP5.width - expectedWidth) / 2));
                    expect(grid.offsetY).toBe(Math.floor((mockP5.height - expectedHeight) / 2));
                });
            });
        });
    });
});