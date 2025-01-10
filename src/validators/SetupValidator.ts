import { P5AsciifyError } from '../AsciifyError.js';
import p5 from 'p5';

/**
 * Validates the p5 instance for p5.asciify setup.
 * @param {Object} p - The p5.js instance.
 * @throws {P5AsciifyError} If any validation fails.
 */
export function validateSetup(p: p5) {
    // Check if setup has already been done
    if (p._setupDone) {
        return;
    }

    // Ensure WebGL renderer is used
    if (p._renderer.drawingContext instanceof CanvasRenderingContext2D) {
        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
    }

    // Check p5.js version
    function compareVersions(v1: string, v2: string): number {
        const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const v1Part = v1Parts[i] ?? 0;
            const v2Part = v2Parts[i] ?? 0;
            if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
        }

        return 0;
    }

    if (compareVersions(p.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
    }
}