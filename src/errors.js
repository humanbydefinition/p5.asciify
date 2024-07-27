class P5AsciifyError extends Error {
    constructor(message) {
        super(message);
        this.name = "P5AsciifyError";
    }
};

export default P5AsciifyError;