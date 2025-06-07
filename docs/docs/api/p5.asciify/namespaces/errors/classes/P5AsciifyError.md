# Class: P5AsciifyError

Defined in: [errors/AsciifyError.ts:4](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/errors/AsciifyError.ts#L4)

Custom error class for `p5.asciify` related errors.

## Extends

- `Error`

## Constructors

### Constructor

> **new P5AsciifyError**(`message`, `originalError?`): `P5AsciifyError`

Defined in: [errors/AsciifyError.ts:7](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/errors/AsciifyError.ts#L7)

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
| <a id="originalerror"></a> `originalError?` | `readonly` | `Error` | [errors/AsciifyError.ts:5](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/errors/AsciifyError.ts#L5) |
