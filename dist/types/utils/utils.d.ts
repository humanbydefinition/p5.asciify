import p5 from 'p5';
/**
 * Detects the p5.js version from various possible sources across different environments.
 *
 * This function tries multiple strategies to detect the p5.js version, which is necessary
 * because different p5.js environments (P5LIVE, flok.cc, standalone, etc.) may expose
 * the version property in different ways.
 *
 * @param p The p5.js instance to detect the version from
 * @returns The detected p5.js version string, or '1.0.0' as a safe fallback
 *
 * @example
 * ```typescript
 * const version = detectP5Version(p5Instance);
 * console.log(`Detected p5.js version: ${version}`);
 * ```
 */
export declare const detectP5Version: (p: p5) => string;
/**
 * Checks if the detected p5.js version supports async operations (Promise-based APIs).
 *
 * @param version The p5.js version string
 * @returns True if the version supports async operations (2.0.0+), false otherwise
 *
 * @example
 * ```typescript
 * const version = detectP5Version(p5Instance);
 * const supportsAsync = isAsyncCapable(version);
 *
 * if (supportsAsync) {
 *     const font = await p.loadFont('font.ttf');
 * } else {
 *     const font = p.loadFont('font.ttf', onLoadCallback);
 * }
 * ```
 */
export declare const isP5AsyncCapable: (version: string) => boolean;
export declare const isValidP5Color: (p: p5, color: any) => boolean;
export declare const isValidP5Font: (p: p5, font: any) => boolean;
/**
 * Detect if p5.js is running in global mode by checking multiple indicators
 * @private
 */
export declare const isP5GlobalMode: (p: p5) => boolean;
/**
 * Compares two version strings like `'1.8.0'` and `'1.11.3'`.
 * @param v1 The first version string.
 * @param v2 The second version string.
 * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
 */
export declare const compareVersions: (v1: string, v2: string) => number;
