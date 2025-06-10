/**
 * Error handling levels for the p5.asciify library.
 *
 * Determines how validation failures and errors are processed throughout the library.
 * Each level provides different behavior for error reporting and execution flow control.
 *
 * @enum {number}
 * @example
 * ```typescript
 *
 * // Set to warning level to log errors without stopping execution
 * p5asciify.setErrorLevel(P5AsciifyErrorLevel.WARNING);
 * ```
 */
export declare enum P5AsciifyErrorLevel {
    /**
     * Suppress all error output.
     * Validation failures are handled silently without any console messages.
     */
    SILENT = 0,
    /**
     * Log validation failures as warnings.
     * Execution continues normally, but issues are reported to the console.
     */
    WARNING = 1,
    /**
     * Log validation failures as errors.
     * Execution continues, but errors are prominently displayed in the console.
     */
    ERROR = 2,
    /**
     * Throw exceptions on validation failures.
     * Stops execution immediately when errors occur (default behavior).
     */
    THROW = 3
}
/**
 * Options for configuring the error handler.
 * @ignore
 */
export interface ErrorHandlerOptions {
    /** Global error level */
    globalLevel: P5AsciifyErrorLevel;
    /** Prefix for console messages */
    consolePrefix: string;
}
/**
 * Interface for error information used by the p5.asciify error handler.
 * @ignore
 */
export interface P5AsciifyErrorInfo {
    message: string;
    level: P5AsciifyErrorLevel;
    context?: any;
    originalError?: Error;
}
/**
 * Singleton error handler for p5.asciify.
 * This class handles errors based on the configured error level.
 * It can log warnings, errors, or throw exceptions based on the global error level.
 * @ignore
 */
export declare class P5AsciifyErrorHandler {
    private static _instance;
    private _options;
    private constructor();
    static getInstance(): P5AsciifyErrorHandler;
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
/**
 * Singleton instance of the p5.asciify error handler.
 * @ignore
 */
export declare const errorHandler: P5AsciifyErrorHandler;
