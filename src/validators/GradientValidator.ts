import { P5AsciifyError } from '../AsciifyError';
import P5AsciifyGradientManager from '../managers/GradientManager';

/**
 * Validates the parameters for adding an ASCII gradient.
 *
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
    gradientName: string,
    brightnessStart: number,
    brightnessEnd: number,
    characters: string,
    userParams: Record<string, any>
): void {
    // Check if the gradient constructor exists
    if (!gradientManager.gradientConstructors[gradientName]) {
        throw new P5AsciifyError(
            `Gradient '${gradientName}' does not exist! Available gradients: ${Object.keys(gradientManager.gradientConstructors).join(", ")}`
        );
    }

    // Validate brightnessStart
    if (typeof brightnessStart !== 'number' || brightnessStart < 0 || brightnessStart > 255) {
        throw new P5AsciifyError(
            `Invalid brightness start value '${brightnessStart}'. Expected a number between 0 and 255.`
        );
    }

    // Validate brightnessEnd
    if (typeof brightnessEnd !== 'number' || brightnessEnd < 0 || brightnessEnd > 255) {
        throw new P5AsciifyError(
            `Invalid brightness end value '${brightnessEnd}'. Expected a number between 0 and 255.`
        );
    }

    // Validate characters
    if (typeof characters !== 'string') {
        throw new P5AsciifyError(
            `Invalid characters value '${characters}'. Expected a string.`
        );
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