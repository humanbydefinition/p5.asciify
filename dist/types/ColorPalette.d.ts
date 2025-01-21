import p5 from 'p5';
/**
 * A 1D color palette for use with the `p5.asciify` library.
 *
 * The color palette is stored in a framebuffer, which is used to pass the colors to various shaders in the library.
 *
 * @remarks
 * Used in the {@link P5AsciifyRenderer} classes to store the colors of the characters in the character set,
 * which are then passed to the shaders for rendering and decoding the pixel colors to ASCII characters.
 *
 * Also used by the {@link P5AsciifyGradient} classes to store the colors of the gradient character sets for the same purpose.
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
