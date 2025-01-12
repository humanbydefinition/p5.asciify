import { P5AsciifyGradientManager } from '../gradients/GradientManager';
import { GradientType } from '../gradients/GradientManager';
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
export declare function validateGradientParams(gradientManager: P5AsciifyGradientManager, gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, userParams: Record<string, any>): void;
