import { P5AsciifyError } from '../AsciifyError';
import { P5AsciifyGradientManager } from '../gradients/GradientManager';
import { GradientType } from '../gradients/types';
import { validateNumberInRange } from '../utils';

/**
 * Validates the parameters for adding an ASCII gradient.
 * @param gradientManager - The gradient manager instance.
 * @param gradientName - The name of the gradient.
 * @param brightnessStart - The starting brightness value (0-255).
 * @param brightnessEnd - The ending brightness value (0-255).
 * @param characters - The characters to use for the gradient.
 * @param userParams - Additional user parameters for the gradient.
 * @throws P5AsciifyError If any validation fails.
 */
export function validateGradientParams(
    gradientManager: P5AsciifyGradientManager,
    gradientName: GradientType,
    brightnessStart: number,
    brightnessEnd: number,
    characters: string,
    userParams: Record<string, any>
): void {
    // Validate gradient name type and existence
    if (typeof gradientName !== 'string') {
        throw new P5AsciifyError('Gradient name must be a string');
    }
    if (!gradientManager.gradientConstructors[gradientName]) {
        throw new P5AsciifyError(
            `Gradient '${gradientName}' does not exist! Available gradients: ${Object.keys(gradientManager.gradientConstructors).join(", ")}`
        );
    }

    // Validate brightness types and ranges
    if (typeof brightnessStart !== 'number') {
        throw new P5AsciifyError('Brightness start value must be a number');
    }
    if (typeof brightnessEnd !== 'number') {
        throw new P5AsciifyError('Brightness end value must be a number');
    }
    validateNumberInRange(brightnessStart, 0, 255, 'brightness start');
    validateNumberInRange(brightnessEnd, 0, 255, 'brightness end');

    // Validate characters
    if (typeof characters !== 'string') {
        throw new P5AsciifyError('Characters must be a string');
    }
    if (characters.length === 0) {
        throw new P5AsciifyError('Characters string cannot be empty');
    }

    // Validate userParams
    if (!userParams || typeof userParams !== 'object' || Array.isArray(userParams)) {
        throw new P5AsciifyError('User parameters must be an object');
    }

    // Validate userParams keys
    const validParams = Object.keys(gradientManager.gradientParams[gradientName]);
    const invalidKeys = Object.keys(userParams).filter(key => !validParams.includes(key));
    if (invalidKeys.length > 0) {
        throw new P5AsciifyError(
            `Invalid parameter(s) for gradient '${gradientName}': ${invalidKeys.join(", ")}\nValid parameters are: ${validParams.join(", ")}`
        );
    }
}