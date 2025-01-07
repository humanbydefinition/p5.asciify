import { validateGradientParams } from '../validators/GradientValidator.js';

export function registerGradientMethods(p5asciify) {

    p5.prototype.addAsciiGradient = function (gradientName, brightnessStart, brightnessEnd, characters, userParams = {}) {
        validateGradientParams(
            p5asciify.rendererManager.gradientManager,
            gradientName,
            brightnessStart,
            brightnessEnd,
            characters,
            userParams
        );

        return p5asciify.rendererManager.gradientManager.addGradient(gradientName, brightnessStart, brightnessEnd, characters, userParams);
    };

    p5.prototype.removeAsciiGradient = function (gradientInstance) {
        p5asciify.rendererManager.gradientManager.removeGradient(gradientInstance);
    };
}