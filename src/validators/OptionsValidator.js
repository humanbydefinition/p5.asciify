import { VALID_OPTIONS, VALID_RENDER_MODES, FONT_SIZE_LIMITS, EDGE_CHARACTER_LENGTH } from '../constants/validOptions.js';
import P5AsciifyError from '../errors.js';

/**
 * Validates the options for p5.asciify.
 *
 * @param {p5} p - The p5.js instance.
 * @param {Object} options - The options to validate.
 * @throws {P5AsciifyError} If any validation fails.
 */
export function validateOptions(p, options) {
    const unknownOptions = Object.keys(options).filter(option => !VALID_OPTIONS.includes(option));

    if (unknownOptions.length) {
        throw new P5AsciifyError(`Unknown options detected: ${unknownOptions}. Refer to the documentation for valid options.`);
    }

    // Validate renderMode
    if (options?.ascii?.renderMode && !VALID_RENDER_MODES.includes(options.ascii.renderMode)) {
        throw new P5AsciifyError(`Invalid render mode '${options.ascii.renderMode}'. Valid render modes are: ${VALID_RENDER_MODES}.`);
    }

    const { ascii, edge, common, gradient, custom, text } = options;

    // Convert hex color strings to p5.Color objects and assign them to the options
    const colorOptions = [edge, ascii, gradient];
    colorOptions.forEach(opt => {
        if (opt?.characterColor) opt.characterColor = p.color(opt.characterColor);
        if (opt?.backgroundColor) opt.backgroundColor = p.color(opt.backgroundColor);
    });

    if (common?.borderColor) {
        common.borderColor = p.color(common.borderColor);
    }

    // Validate fontSize
    if (common?.fontSize && (common.fontSize < FONT_SIZE_LIMITS.MIN || common.fontSize > FONT_SIZE_LIMITS.MAX)) {
        throw new P5AsciifyError(`Font size ${common.fontSize} is out of bounds. It should be between ${FONT_SIZE_LIMITS.MIN} and ${FONT_SIZE_LIMITS.MAX}.`);
    }

    // Validate edge.characters length
    if (edge?.characters && edge.characters.length !== EDGE_CHARACTER_LENGTH) {
        throw new P5AsciifyError(`edge.characters must be exactly ${EDGE_CHARACTER_LENGTH} characters long.`);
    }
}