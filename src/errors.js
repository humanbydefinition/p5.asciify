/**
 * @class P5AsciifyError
 * @extends {Error}
 * @description
 * Custom error class for the P5Asciify library.
 * Represents errors specific to the P5Asciify library.
 */
class P5AsciifyError extends Error {
    /**
     * Creates an instance of P5AsciifyError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "P5AsciifyError";
    }
};

export default P5AsciifyError;
