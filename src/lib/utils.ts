import { P5AsciifyError } from './AsciifyError';

/**
 * Validates a number is within a specified range.
 * @param value The value to validate.
 * @param min The minimum value.
 * @param max The maximum value.
 * @param name The name of the value. (Is used in the error message if validation fails.)
 */
export const validateNumberInRange = (value: any, min: number, max: number, name: string) => {
    if (typeof value !== 'number' || value < min || value > max) {
        throw new P5AsciifyError(
            `Invalid ${name} value '${value}'. Expected a number between ${min} and ${max}.`
        );
    }
};