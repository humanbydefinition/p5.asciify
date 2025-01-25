/**
 * Validates if a number is within a specified range.
 * @param value The value to validate.
 * @param min The minimum value.
 * @param max The maximum value.
 * @param name The name of the value. (Used in potential error message.)
 * @throws {@link P5AsciifyError} If the value is not a number or is outside the specified range.
 */
export declare const validateNumberInRange: (value: number, min: number, max: number, name: string) => void;
/**
 * Compares two version strings like `'1.8.0'` and `'1.11.3'`.
 * @param v1 The first version string.
 * @param v2 The second version string.
 * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
 */
export declare const compareVersions: (v1: string, v2: string) => number;
