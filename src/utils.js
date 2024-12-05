/**
 * Utility class containing static helper methods for version comparison and other common tasks.
 */
class P5AsciifyUtils {

    /**
     * @param {string} v1 - First version string (e.g., "1.2.3")
     * @param {string} v2 - Second version string (e.g., "1.2.4")
     * @returns {number} 1 if v1 > v2, -1 if v1 < v2, 0 if equal
     * @example
     * P5AsciifyUtils.compareVersions("1.2.3", "1.2.4") // Returns -1
     * P5AsciifyUtils.compareVersions("2.0.0", "1.9.9") // Returns 1
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