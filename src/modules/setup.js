import { validateSetup } from '../validators/SetupValidator.js';

export function registerSetupMethods(p5asciify) {
    
    p5.prototype.setupP5Instance = function () {
        if (!p5asciify.p5Instance) {
            p5asciify.p5Instance = this;
        }
        p5asciify.rendererManager.gradientManager.addInstance(p5asciify.p5Instance);
    };

    p5.prototype.setupAsciifier = function () {
        validateSetup(p5asciify.p5Instance);
        p5asciify.setup();
    };

    p5.prototype.registerMethod("init", p5.prototype.setupP5Instance);
    p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);
}