/**
 * Compares two version strings like `'1.8.0'` and `'1.11.3'`.
 * @param v1 The first version string.
 * @param v2 The second version string.
 * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
 * @ignore
 */
export const compareVersions = (v1: string, v2: string): number => {
    const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] ?? 0;
        const v2Part = v2Parts[i] ?? 0;
        if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
    }

    return 0;
}