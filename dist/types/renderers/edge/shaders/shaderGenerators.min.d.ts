/**
 * Generates the sample fragment shader code for the ASCII edge renderer, which computes the most frequent non-black color in a grid cell.
 * @param MAX_HISTOGRAM_SIZE The maximum size of the color histogram
 * @param SAMPLES_PER_ROW Number of samples per row
 * @param SAMPLES_PER_COL Number of samples per column
 * @returns The sample fragment shader code
 */
export declare const generateSampleShader: (MAX_HISTOGRAM_SIZE: number, SAMPLES_PER_ROW: number, SAMPLES_PER_COL: number) => string;
