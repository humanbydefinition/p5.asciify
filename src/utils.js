/**
 * @class P5AsciifyUtils
 * @description
 * A utility class for the P5Asciify library.
 * Provides static methods for various common tasks such as color conversion and version comparison.
 */
class P5AsciifyUtils {

    /**
     * Converts a hex color string to an RGB array.
     * @param {string} hex - The hex color string (e.g., "#ff5733").
     * @returns {number[]} An array containing the RGB values [r, g, b].
     */
    static hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    /**
     * Converts an RGB array to a shader color array.
     * @param {number[]} color - The RGB array [r, g, b].
     * @returns {number[]} An array containing the shader color values [r/255, g/255, b/255].
     */
    static rgbToShaderColor(color) {
        return [color[0] / 255, color[1] / 255, color[2] / 255];
    }

    /**
     * Converts a hex color string to a shader color array.
     * @param {string} hex - The hex color string (e.g., "#ff5733").
     * @returns {number[]} An array containing the shader color values [r/255, g/255, b/255].
     */
    static hexToShaderColor(hex) {
        return this.rgbToShaderColor(this.hexToRgb(hex));
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

    /**
     * Deeply merges two objects into a new object.
     * @param {Object} target - The target object to merge into.
     * @param {Object} source - The source object to merge from.
     * @returns {Object} The merged object.
     */
    static deepMerge(target, source) {
        const result = { ...target };

        for (const key of Object.keys(source)) {
            if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key]) && key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                result[key] = this.deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }
}

export default P5AsciifyUtils;