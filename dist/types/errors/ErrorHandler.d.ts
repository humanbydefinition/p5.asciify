export declare enum P5AsciifyErrorLevel {
    SILENT = 0,
    WARNING = 1,
    ERROR = 2,
    THROW = 3
}
export interface ErrorHandlerOptions {
    /** Global error level */
    globalLevel: P5AsciifyErrorLevel;
    /** Prefix for console messages */
    consolePrefix: string;
}
export interface P5AsciifyErrorInfo {
    message: string;
    level: P5AsciifyErrorLevel;
    context?: any;
    originalError?: Error;
}
export declare class P5AsciifyErrorHandler {
    private static _instance;
    private _options;
    private constructor();
    static getInstance(): P5AsciifyErrorHandler;
    /**
     * Configure the error handler
     */
    configure(options: Partial<ErrorHandlerOptions>): void;
    /**
     * Handle an error based on the configured settings
     * @returns true if execution should continue, false if error was handled
     */
    private _handle;
    /**
     * Validate a condition and handle errors if validation fails
     * @param condition The condition to validate
     * @param message Error message if validation fails
     * @param context Additional context for debugging
     * @returns true if validation passed, false if validation failed and was handled
     */
    validate(condition: boolean, message: string, context?: any): boolean;
    /**
     * Set global error level
     */
    setGlobalLevel(level: P5AsciifyErrorLevel): void;
}
export declare const errorHandler: P5AsciifyErrorHandler;
