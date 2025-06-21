# Enumeration: P5AsciifyErrorLevel

Defined in: [errors/ErrorHandler.ts:17](https://github.com/humanbydefinition/p5.asciify/blob/e84cef5e536638c5f6d76446c1b5a0c21e26f2d7/src/lib/errors/ErrorHandler.ts#L17)

Error handling levels for the p5.asciify library.

Determines how validation failures and errors are processed throughout the library.
Each level provides different behavior for error reporting and execution flow control.

## Example

```typescript
// Set to warning level to log errors without stopping execution
p5asciify.setErrorLevel(P5AsciifyErrorLevel.WARNING);
```

## Enumeration Members

| Enumeration Member             | Value | Description                                                                                                  | Defined in                                                                                                                                                    |
| ------------------------------ | ----- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="error"></a> `ERROR`     | `2`   | Log validation failures as errors. Execution continues, but errors are prominently displayed in the console. | [errors/ErrorHandler.ts:34](https://github.com/humanbydefinition/p5.asciify/blob/e84cef5e536638c5f6d76446c1b5a0c21e26f2d7/src/lib/errors/ErrorHandler.ts#L34) |
| <a id="silent"></a> `SILENT`   | `0`   | Suppress all error output. Validation failures are handled silently without any console messages.            | [errors/ErrorHandler.ts:22](https://github.com/humanbydefinition/p5.asciify/blob/e84cef5e536638c5f6d76446c1b5a0c21e26f2d7/src/lib/errors/ErrorHandler.ts#L22) |
| <a id="throw"></a> `THROW`     | `3`   | Throw exceptions on validation failures. Stops execution immediately when errors occur (default behavior).   | [errors/ErrorHandler.ts:40](https://github.com/humanbydefinition/p5.asciify/blob/e84cef5e536638c5f6d76446c1b5a0c21e26f2d7/src/lib/errors/ErrorHandler.ts#L40) |
| <a id="warning"></a> `WARNING` | `1`   | Log validation failures as warnings. Execution continues normally, but issues are reported to the console.   | [errors/ErrorHandler.ts:28](https://github.com/humanbydefinition/p5.asciify/blob/e84cef5e536638c5f6d76446c1b5a0c21e26f2d7/src/lib/errors/ErrorHandler.ts#L28) |
