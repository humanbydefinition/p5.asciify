/**
 * Custom error class for `p5.asciify` related errors.
 */
export declare class P5AsciifyError extends Error {
    readonly originalError?: Error;
    constructor(message: string, originalError?: Error);
}
