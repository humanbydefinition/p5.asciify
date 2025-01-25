import p5 from 'p5';
/**
 * A 1D color palette stored in a framebuffer, which can be used to pass colors to shaders.
 */
export declare class P5AsciifyColorPalette {
    private p;
    private _colors;
    /** The framebuffer used to store the color palette. */
    framebuffer: p5.Framebuffer;
    /**
     * Create a new color palette instance.
     * @param p The p5 instance.
     * @param _colors The colors to store in the palette.
     */
    constructor(p: p5, _colors: [number, number, number][]);
    /**
     * Update the framebuffer with the currently selected colors.
     */
    updateFramebuffer(): void;
    /**
     * Set the colors of the palette and update the framebuffer.
     * @param newColors The new colors to set.
     */
    setColors(newColors: [number, number, number][]): void;
    get colors(): [number, number, number][];
}
