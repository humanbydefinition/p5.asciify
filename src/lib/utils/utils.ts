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
export const detectP5Version = (p: p5): string => {
    const versionSources = [
        // Instance version (most common in standard setups)
        () => p?.VERSION,
        
        // Global p5 version (works in many environments)
        () => (typeof p5 !== 'undefined' && p5.VERSION) ? p5.VERSION : undefined,
        
        // Window global version (P5LIVE style environments)
        () => (typeof window !== 'undefined' && (window as any).p5?.VERSION) 
              ? (window as any).p5.VERSION : undefined,
        
        // Constructor version (some bundled environments)
        () => p?.constructor?.VERSION,
        
        // Prototype chain version (edge cases)
        () => Object.getPrototypeOf(p)?.constructor?.VERSION,
    ];

    // Try each version source with error protection
    for (const getVersion of versionSources) {
        try {
            const version = getVersion();
            // Validate that we got a proper version string
            if (version && typeof version === 'string' && /^\d+\.\d+/.test(version)) {
                return version;
            }
        } catch (e) {
            // Continue to next source if this one fails
            continue;
        }
    }

    // Safe fallback version if all detection methods fail
    return '1.0.0';
};

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
export const isP5AsyncCapable = (version: string): boolean => {
    return compareVersions(version, "2.0.0") >= 0;
};

/**
 * Compares two version strings like `'1.8.0'` and `'1.11.3'`.
 * @param v1 The first version string.
 * @param v2 The second version string.
 * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
 */
export const compareVersions = (v1: string, v2: string): number => {
    const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] ?? 0;
        const v2Part = v2Parts[i] ?? 0;
        if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
    }

    return 0;
};