# Class: P5AsciifyErrorHandler

Defined in: errors/ErrorHandler.ts:24

## Methods

### configure()

> **configure**(`options`): `void`

Defined in: errors/ErrorHandler.ts:44

Configure the error handler

#### Parameters

| Parameter | Type                                                                       |
| --------- | -------------------------------------------------------------------------- |
| `options` | `Partial`\<[`ErrorHandlerOptions`](../interfaces/ErrorHandlerOptions.md)\> |

#### Returns

`void`

---

### getConfiguration()

> **getConfiguration**(): [`ErrorHandlerOptions`](../interfaces/ErrorHandlerOptions.md)

Defined in: errors/ErrorHandler.ts:132

Get current configuration

#### Returns

[`ErrorHandlerOptions`](../interfaces/ErrorHandlerOptions.md)

---

### handle()

> **handle**(`message`, `context?`, `originalError?`): `boolean`

Defined in: errors/ErrorHandler.ts:52

Handle an error based on the configured settings

#### Parameters

| Parameter        | Type     |
| ---------------- | -------- |
| `message`        | `string` |
| `context?`       | `any`    |
| `originalError?` | `Error`  |

#### Returns

`boolean`

true if execution should continue, false if error was handled

---

### setGlobalLevel()

> **setGlobalLevel**(`level`): `void`

Defined in: errors/ErrorHandler.ts:125

Set global error level

#### Parameters

| Parameter | Type                                          |
| --------- | --------------------------------------------- |
| `level`   | [`ErrorLevel`](../enumerations/ErrorLevel.md) |

#### Returns

`void`

---

### validate()

> **validate**(`condition`, `message`, `context?`): `boolean`

Defined in: errors/ErrorHandler.ts:89

Validate a condition and handle errors if validation fails

#### Parameters

| Parameter   | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| `condition` | `boolean` | The condition to validate         |
| `message`   | `string`  | Error message if validation fails |
| `context?`  | `any`     | Additional context for debugging  |

#### Returns

`boolean`

true if validation passed, false if validation failed and was handled

---

### validateWithFallback()

> **validateWithFallback**\<`T`\>(`condition`, `message`, `fallbackValue`, `context?`): `undefined` \| `T`

Defined in: errors/ErrorHandler.ts:109

Validate a condition with a fallback value

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter       | Type      | Description                         |
| --------------- | --------- | ----------------------------------- |
| `condition`     | `boolean` | The condition to validate           |
| `message`       | `string`  | Error message if validation fails   |
| `fallbackValue` | `T`       | Value to return if validation fails |
| `context?`      | `any`     | Additional context for debugging    |

#### Returns

`undefined` \| `T`

The fallbackValue if validation fails, undefined if validation passes

---

### getInstance()

> `static` **getInstance**(): `P5AsciifyErrorHandler`

Defined in: errors/ErrorHandler.ts:34

#### Returns

`P5AsciifyErrorHandler`
