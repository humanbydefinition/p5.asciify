import { validateGradientParams } from '../validators/GradientValidator';
import { P5Asciifier } from '../Asciifier';
import { GradientType } from '../gradients/types';
import { P5AsciifyGradient } from '../gradients/Gradient';
import p5 from 'p5';

/**
 * Registers the `addAsciiGradient` and `removeAsciiGradient` methods to the p5.js instance.
 */
export function registerGradientMethods(p5asciify: P5Asciifier): void {

    /**
     * Adds a new gradient to the gradient manager, which will be rendered by the GradientAsciiRenderer.
     * @param gradientName The name of the gradient.
     * @param brightnessStart The brightness value at which the gradient starts.
     * @param brightnessEnd The brightness value at which the gradient ends.
     * @param characters The characters to use for the gradient.
     * @param userParams Optional parameters to pass to the gradient.
     */
    p5.prototype.addAsciiGradient = function (
        gradientName: GradientType,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        userParams: Record<string, any> = {}
    ): any {
        validateGradientParams(
            p5asciify.rendererManager.gradientManager,
            gradientName,
            brightnessStart,
            brightnessEnd,
            characters,
            userParams
        );

        return p5asciify.rendererManager.gradientManager.addGradient(
            gradientName,
            brightnessStart,
            brightnessEnd,
            characters,
            userParams
        );
    };

    /**
     * Removes a gradient from the gradient manager.
     */
    p5.prototype.removeAsciiGradient = function (
        gradientInstance: P5AsciifyGradient
    ): void {
        p5asciify.rendererManager.gradientManager.removeGradient(gradientInstance);
    };
}