/**
 * Custom error class for `p5.asciify` related errors.
 */
export class P5AsciifyError extends Error {
    public readonly originalError?: Error;

    constructor(message: string, originalError?: Error) {
        super(message);
        this.name = 'P5AsciifyError';
        this.originalError = originalError;
    }
}