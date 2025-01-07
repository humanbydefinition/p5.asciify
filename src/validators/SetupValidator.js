import P5AsciifyError from '../errors.js';
import P5AsciifyUtils from '../utils.js';

/**
 * Validates the p5 instance for p5.asciify setup.
 *
 * @param {Object} p5Instance - The p5.js instance.
 * @throws {P5AsciifyError} If any validation fails.
 */
export function validateSetup(p5Instance) {
    // Check if setup has already been done
    if (p5Instance._setupDone) {
        return;
    }

    // Ensure WebGL renderer is used
    if (p5Instance._renderer.drawingContext instanceof CanvasRenderingContext2D) {
        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
    }

    // Check p5.js version
    if (P5AsciifyUtils.compareVersions(p5Instance.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
    }
}