import p5 from 'p5';
/**
 * A 1D color palette for use with the P5Asciify library.
 */
export declare class P5AsciifyColorPalette {
    _colors: [number, number, number][];
    framebuffer: p5.Framebuffer;
    p5Instance: p5;
    constructor(colors: [number, number, number][]);
    /**
     * Setup the color palette with a p5 instance.
     * @param p5Instance The p5 instance to use for creating the framebuffer.
     */
    setup(p5Instance: p5): void;
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
