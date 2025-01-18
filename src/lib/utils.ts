import { P5AsciifyError } from './AsciifyError';

/**
 * Validates a number is within a specified range.
 * @param value The value to validate.
 * @param min The minimum value.
 * @param max The maximum value.
 * @param name The name of the value. (Is used in the error message if validation fails.)
 */
export const validateNumberInRange = (value: number, min: number, max: number, name: string) => {
    if (typeof value !== 'number' || value < min || value > max) {
        throw new P5AsciifyError(
            `Invalid ${name} value '${value}'. Expected a number between ${min} and ${max}.`
        );
    }
};

/**
 * Compares two version strings.
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
}