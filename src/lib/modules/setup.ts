import p5 from 'p5';
import { validateSetup } from '../validators/SetupValidator';
import { P5Asciifier } from '../Asciifier';
import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt?raw';

/**
 * Registers setup methods for the p5.asciify library onto the p5 instance.
 */
export function registerSetupMethods(p5asciify: P5Asciifier): void {

    /**
     * Add `setupAsciify` function to p5 instance, which can be overridden by the user.
     * This function is called after the p5.asciify setup has been completed.
     */
    p5.prototype.setupAsciify = function(): void {};

    /**
     * Extend the p5.asciify instance to the p5 instance and run the p5.asciify init method
     */
    p5.prototype.registerMethod('init', function(this: p5) {
        p5asciify.instance(this, false);
    });

    /**
     * After the user's setup function is finished, run the p5.asciify setup
     */
    p5.prototype.registerMethod('afterSetup', function(this: p5) {
        this._incrementPreload();
        this.loadAsciiFont(URSAFONT_BASE64);
        validateSetup(this);
        p5asciify.setup();
        this.setupAsciify();
    });
}