import { validateSetup } from '../validators/SetupValidator.js';

export function registerSetupMethods(p5asciify) {
    
    p5.prototype.setupP5Instance = function () {
        if (!p5asciify.p) {
            p5asciify.p = this;
        }
        p5asciify.rendererManager.gradientManager.addInstance(this);
    };

    p5.prototype.setupAsciifier = function () {
        validateSetup(this);
        p5asciify.setup();
    };

    p5.prototype.registerMethod("init", p5.prototype.setupP5Instance);
    p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);
}