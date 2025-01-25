import p5 from 'p5';
/**
 * A 1D color palette stored in a framebuffer, which is used to pass colors to shaders.
 */
export declare class P5AsciifyColorPalette {
    private _p;
    private _colors;
    /** The framebuffer used to store the color palette. */
    private _framebuffer;
    /**
     * Create a new color palette instance.
     * @param _p The p5 instance.
     * @param _colors The colors to store in the palette.
     */
    constructor(_p: p5, _colors: [number, number, number][]);
    /**
     * Update the framebuffer with the currently selected colors.
     */
    private _updateFramebuffer;
    /**
     * Set the colors of the palette and update the framebuffer.
     * @param newColors The new colors to set.
     */
    setColors(newColors: [number, number, number][]): void;
    get colors(): [number, number, number][];
    get framebuffer(): p5.Framebuffer;
}
