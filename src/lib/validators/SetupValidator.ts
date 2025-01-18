import { P5AsciifyError } from '../AsciifyError.js';
import p5 from 'p5';

import { compareVersions } from '../utils.js';

/**
 * Validates the p5 instance for p5.asciify setup.
 * @param {Object} p - The p5.js instance.
 * @throws {P5AsciifyError} If any validation fails.
 */
export function validateSetup(p: p5) {
    // Ensure WebGL renderer is used
    if (!(p._renderer.drawingContext instanceof WebGLRenderingContext || 
        p._renderer.drawingContext instanceof WebGL2RenderingContext)) {
      throw new P5AsciifyError("WebGL renderer is required for p5.asciify to run.");
  }

    // Ensure p5.js version is 1.8.0 or higher
    if (compareVersions(p.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to run.");
    }
}