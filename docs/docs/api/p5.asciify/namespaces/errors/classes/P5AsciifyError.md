# Class: P5AsciifyError

Defined in: [errors/AsciifyError.ts:4](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/errors/AsciifyError.ts#L4)

Custom error class for `p5.asciify` related errors.

## Extends

- `Error`

## Constructors

### Constructor

> **new P5AsciifyError**(`message`, `originalError?`): `P5AsciifyError`

Defined in: [errors/AsciifyError.ts:7](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/errors/AsciifyError.ts#L7)

#### Parameters

| Parameter        | Type     |
| ---------------- | -------- |
| `message`        | `string` |
| `originalError?` | `Error`  |

#### Returns

`P5AsciifyError`

#### Overrides

`Error.constructor`

## Properties

| Property                                    | Modifier   | Type    | Defined in                                                                                                                                                  |
| ------------------------------------------- | ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="originalerror"></a> `originalError?` | `readonly` | `Error` | [errors/AsciifyError.ts:5](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/errors/AsciifyError.ts#L5) |
