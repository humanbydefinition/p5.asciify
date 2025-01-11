/**
 * Custom error class for the P5Asciify library.
 * Represents errors specific to the P5Asciify library.
 */
export class P5AsciifyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "P5AsciifyError";
    }
}