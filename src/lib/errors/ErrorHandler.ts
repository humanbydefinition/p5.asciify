import { P5AsciifyError } from "./AsciifyError";

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
export enum P5AsciifyErrorLevel {
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
export class P5AsciifyErrorHandler {
    private static _instance: P5AsciifyErrorHandler | null = null;

    private _options: ErrorHandlerOptions = {
        globalLevel: P5AsciifyErrorLevel.THROW,
        consolePrefix: '[p5.asciify]'
    };

    private constructor() { }

    public static getInstance(): P5AsciifyErrorHandler {
        if (!P5AsciifyErrorHandler._instance) {
            P5AsciifyErrorHandler._instance = new P5AsciifyErrorHandler();
        }
        return P5AsciifyErrorHandler._instance;
    }

    /**
     * Handle an error based on the configured settings
     * @returns true if execution should continue, false if error was handled
     */
    private _handle(
        message: string,
        context?: any,
        originalError?: Error
    ): boolean {
        const errorInfo: P5AsciifyErrorInfo = {
            message,
            level: this._options.globalLevel,
            context,
            originalError
        };

        switch (this._options.globalLevel) {
            case P5AsciifyErrorLevel.SILENT:
                return false; // Validation failed, handled silently

            case P5AsciifyErrorLevel.WARNING:
                console.warn(`${this._options.consolePrefix} ${message}`, context);
                return false; // Validation failed, warning logged

            case P5AsciifyErrorLevel.ERROR:
                console.error(`${this._options.consolePrefix} ${message}`, context);
                return false; // Validation failed, error logged

            case P5AsciifyErrorLevel.THROW:
            default:
                throw new P5AsciifyError(message, originalError);
        }
    }

    /**
     * Validate a condition and handle errors if validation fails
     * @param condition The condition to validate
     * @param message Error message if validation fails
     * @param context Additional context for debugging
     * @returns true if validation passed, false if validation failed and was handled
     */
    public validate(
        condition: boolean,
        message: string,
        context?: any
    ): boolean {
        if (!condition) {
            this._handle(message, context);
            return false; // Validation failed
        }
        return true; // Validation passed
    }

    /**
     * Set global error level
     */
    public setGlobalLevel(level: P5AsciifyErrorLevel): void {
        this._options.globalLevel = level;
    }
}

/**
 * Singleton instance of the p5.asciify error handler.
 * @ignore
 */
export const errorHandler = P5AsciifyErrorHandler.getInstance();