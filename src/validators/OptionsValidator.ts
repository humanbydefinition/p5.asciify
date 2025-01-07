import { VALID_OPTIONS, VALID_RENDER_MODES, FONT_SIZE_LIMITS, EDGE_CHARACTER_LENGTH } from '../constants/validOptions.js';
import { P5AsciifyError } from '../AsciifyError.js';
import p5 from 'p5';

/**
 * Interface for p5.asciify options.
 */
interface AsciifyOptions {
    characterColor?: string | p5.Color;
    backgroundColor?: string | p5.Color;
    fontSize?: number;
    characters?: string;
}

/**
 * Validates the options for p5.asciify.
 *
 * @param {p5} p - The p5.js instance.
 * @param {AsciifyOptions} options - The options to validate.
 * @throws {P5AsciifyError} If any validation fails.
 */
export function validateOptions(p: p5, options: AsciifyOptions): void {
    if (options?.characterColor) {
        options.characterColor = p.color(options.characterColor);
    }

    if (options?.backgroundColor) {
        options.backgroundColor = p.color(options.backgroundColor);
    }

    // Validate fontSize
    if (options?.fontSize && (options.fontSize < FONT_SIZE_LIMITS.MIN || options.fontSize > FONT_SIZE_LIMITS.MAX)) {
        throw new P5AsciifyError(`Font size ${options.fontSize} is out of bounds. It should be between ${FONT_SIZE_LIMITS.MIN} and ${FONT_SIZE_LIMITS.MAX}.`);
    }

    // Validate edge.characters length (NEEDS TO BE FIXED)
    /**
    if (options?.characters && options.characters.length !== EDGE_CHARACTER_LENGTH) {
        throw new P5AsciifyError(`edge.characters must be exactly ${EDGE_CHARACTER_LENGTH} characters long.`);
    }
    */
}