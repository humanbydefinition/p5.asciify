/**
 * Custom error class for the P5Asciify library.
 * Represents errors specific to the P5Asciify library.
 */
export class P5AsciifyError extends Error {

    /**
     * Create a new P5AsciifyError instance.
     * @param message The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "P5AsciifyError";
    }
}