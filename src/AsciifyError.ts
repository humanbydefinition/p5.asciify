/**
 * Custom error class for the P5Asciify library.
 * Represents errors specific to the P5Asciify library.
 */
export class P5AsciifyError extends Error {
    /**
     * Creates an instance of P5AsciifyError.
     * @param message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "P5AsciifyError";
    }
}