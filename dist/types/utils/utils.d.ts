/**
 * Compares two version strings like `'1.8.0'` and `'1.11.3'`.
 * @param v1 The first version string.
 * @param v2 The second version string.
 * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
 * @ignore
 */
export declare const compareVersions: (v1: string, v2: string) => number;
