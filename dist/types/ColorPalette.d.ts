import p5 from 'p5';
/**
 * A 1D color palette stored in a framebuffer that is used to pass colors to shaders.
 *
 * There is no need to modify instances of this class provided by the library,
 * as they are managed internally and can be modified more easily through classes managing them.
 * But you technically could - *if you wanted to* - without breaking anything.
 */
export declare class P5AsciifyColorPalette {
    private _p;
    private _colors;
    /** The framebuffer used to store the color palette. */
    private _framebuffer;
    /**
     * Create a new color palette instance.
     * @param _p The p5 instance.
     * @param _colors The colors to store.
     */
    constructor(_p: p5, _colors: p5.Color[]);
    /**
     * Update the framebuffer with the currently selected colors.
     */
    private _updateFramebuffer;
    /**
     * Sets the colors of the palette and updates the framebuffer.
     * @param newColors The new colors to set.
     */
    setColors(newColors: p5.Color[]): void;
    /**
     * Get the colors of the palette.
     */
    get colors(): p5.Color[];
    /**
     * Get the framebuffer containing the colors of the palette.
     */
    get framebuffer(): p5.Framebuffer;
}
