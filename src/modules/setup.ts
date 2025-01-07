import { validateSetup } from '../validators/SetupValidator.js';

import { Asciifier } from '../Asciifier';
import p5 from 'p5';

export function registerSetupMethods(p5asciify: Asciifier): void {

    p5.prototype.setupP5Instance = function (this: p5): void {
        if (!p5asciify.p) {
            p5asciify.p = this;
        }
        p5asciify.rendererManager.gradientManager.addInstance(this);
    };

    p5.prototype.setupAsciifier = function (this: p5): void {
        validateSetup(this);
        p5asciify.setup();
    };

    p5.prototype.registerMethod('init', p5.prototype.setupP5Instance);
    p5.prototype.registerMethod('afterSetup', p5.prototype.setupAsciifier);
}