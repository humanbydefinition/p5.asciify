import p5 from 'p5';
import { P5AsciifyEdgeRenderer } from './2d/feature';
import { AbstractFeatureRenderer2D } from './2d/feature/AbstractFeatureRenderer2D';

/**
 * Base ASCII renderer options, applicable to all ASCII renderers.
 */
export interface AsciiRendererOptions {
    /** Whether the renderer is enabled. */
    enabled?: boolean;
}

/**
 * Base options for all feature-based ASCII renderers that extend the {@link AbstractFeatureRenderer2D} class.
 */
export interface FeatureAsciiRendererOptions extends AsciiRendererOptions {
    /** The character set to use for the ASCII renderer. */
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
}

/**
 * Options specific to the {@link P5AsciifyEdgeRenderer} class.
 */
export interface EdgeAsciiRendererOptions extends FeatureAsciiRendererOptions {
    /** The threshold for the Sobel edge detection algorithm. */
    sobelThreshold?: number;

    /** The threshold for the ASCII character sampling algorithm. */
    sampleThreshold?: number;
}