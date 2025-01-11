import { validateGradientParams } from '../validators/GradientValidator';
import { P5Asciifier } from '../Asciifier';
import p5 from 'p5';

export function registerGradientMethods(p5asciify: P5Asciifier): void {

    p5.prototype.addAsciiGradient = function (
        gradientName: string,
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

    p5.prototype.removeAsciiGradient = function (
        gradientInstance: any
    ): void {
        p5asciify.rendererManager.gradientManager.removeGradient(gradientInstance);
    };
}