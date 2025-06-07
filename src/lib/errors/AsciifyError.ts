/**
 * Simple error class, representing errors specific to `p5.asciify`.
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