import { validateSetup } from '../validators/SetupValidator';

import { P5Asciifier } from '../Asciifier';
import p5 from 'p5';

/**
 * Registers the `setupP5Instance` and `setupAsciifier` methods to the p5.js instance.
 */
export function registerSetupMethods(p5asciify: P5Asciifier): void {

    p5.prototype.setupP5Instance = function (this: p5): void {
        p5asciify.addP5Instance(this);
    };

    p5.prototype.setupAsciifier = function (this: p5): void {
        validateSetup(this);
        p5asciify.setup();
    };

    p5.prototype.registerMethod('init', p5.prototype.setupP5Instance);
    p5.prototype.registerMethod('afterSetup', p5.prototype.setupAsciifier);
}