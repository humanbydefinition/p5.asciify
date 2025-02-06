import p5 from 'p5';
/** The options for the ASCII renderers. */
export type AsciiRendererOptions = {
    /** Whether the renderer is enabled. */
    enabled?: boolean;
    /** The character set to use for the ASCII renderer. (not used in the `"custom"` and `"gradient"` renderers) */
    characters?: string;
    /** The color of the ASCII characters. Only used when `characterColorMode` is set to `fixed`. */
    characterColor?: string | [number, number, number] | p5.Color;
    /** The character color mode. Can be either `sampled` or `fixed`. */
    characterColorMode?: number | string;
    /** The cell background color. Only used when `characterColorMode` is set to `fixed`. */
    backgroundColor?: string | [number, number, number] | p5.Color;
    /** The background color mode. Can be either `sampled` or `fixed`. */
    backgroundColorMode?: number | string;
    /** Swap the cells ASCII character colors with its cell background colors. */
    invertMode?: boolean;
    /** The rotation angle of all characters affected by a given renderer. */
    rotationAngle?: number | p5.Color;
    /** The threshold for the Sobel edge detection algorithm. (only used in the `"edge"` renderer) */
    sobelThreshold?: number;
    /** The threshold for the ASCII character sampling algorithm. (only used in the `"edge"` renderer) */
    sampleThreshold?: number;
};
