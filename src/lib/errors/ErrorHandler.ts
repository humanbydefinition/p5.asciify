import { P5AsciifyError } from "./AsciifyError";

export enum P5AsciifyErrorLevel {
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
     * Configure the error handler
     */
    public configure(options: Partial<ErrorHandlerOptions>): void {
        this._options = { ...this._options, ...options };
    }

    /**
     * Handle an error based on the configured settings
     * @returns true if execution should continue, false if error was handled
     */
    public handle(
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
            this.handle(message, context);
            return false; // Validation failed
        }
        return true; // Validation passed
    }

    /**
     * Validate a condition with a fallback value
     * @param condition The condition to validate
     * @param message Error message if validation fails
     * @param fallbackValue Value to return if validation fails
     * @param context Additional context for debugging
     * @returns The fallbackValue if validation fails, undefined if validation passes
     */
    public validateWithFallback<T>(
        condition: boolean,
        message: string,
        fallbackValue: T,
        context?: any
    ): T | undefined {
        if (!condition) {
            this.handle(message, context);
            return fallbackValue; // Validation failed, return fallback
        }
        return undefined; // Validation passed, no fallback needed
    }

    /**
     * Set global error level
     */
    public setGlobalLevel(level: P5AsciifyErrorLevel): void {
        this._options.globalLevel = level;
    }

    /**
     * Get current configuration
     */
    public getConfiguration(): ErrorHandlerOptions {
        return { ...this._options };
    }
}

// Export singleton instance
export const errorHandler = P5AsciifyErrorHandler.getInstance();