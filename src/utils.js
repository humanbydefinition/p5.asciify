/**
 * @class P5AsciifyUtils
 * @description
 * A utility class for the P5Asciify library.
 * Provides static methods for various common tasks such as color conversion and version comparison.
 */
class P5AsciifyUtils {

    static rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16).padStart(2, '0');
            return hex;
        }).join('');
    }

    /**
     * Compares two version strings.
     * @param {string} v1 - The first version string (e.g., "1.2.3").
     * @param {string} v2 - The second version string (e.g., "1.2.4").
     * @returns {number} 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
     */
    static compareVersions(v1, v2) {
        const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const [v1Part, v2Part] = [v1Parts[i] ?? 0, v2Parts[i] ?? 0];
            if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
        }

        return 0;
    }
}

export default P5AsciifyUtils;