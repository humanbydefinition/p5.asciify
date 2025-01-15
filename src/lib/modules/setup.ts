import { validateSetup } from '../validators/SetupValidator';
import { P5Asciifier } from '../Asciifier';
import p5 from 'p5';

/**
 * Registers setup methods for the p5.asciify library onto the p5 instance.
 */
export function registerSetupMethods(p5asciify: P5Asciifier): void {

    /**
     * Pass the p5 instance to the asciifier instance
     */
    p5.prototype.registerMethod('init', function(this: p5) {
        p5asciify.instance(this);
    });

    /**
     * After the user's setup function is finished, run the p5.asciify setup
     */
    p5.prototype.registerMethod('afterSetup', function(this: p5) {
        validateSetup(this);
        p5asciify.setup();
    });
}