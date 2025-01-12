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
export declare function validateOptions(p: p5, options: AsciifyOptions): void;
export {};
