import p5 from 'p5';
/**
 * A 1D color palette for use with the P5Asciify library.
 */
export declare class P5AsciifyColorPalette {
    private p;
    private _colors;
    framebuffer: p5.Framebuffer;
    constructor(p: p5, _colors: [number, number, number][]);
    /**
     * Update the framebuffer with the current colors.
     */
    updateFramebuffer(): void;
    /**
     * Set the colors of the palette and update the framebuffer.
     * @param newColors The new colors to set.
     */
    setColors(newColors: [number, number, number][]): void;
    get colors(): [number, number, number][];
}
