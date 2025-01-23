[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / validateNumberInRange

# Function: validateNumberInRange()

> **validateNumberInRange**(`value`, `min`, `max`, `name`): `void`

Defined in: [utils.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/7c3eabf90074b598e8c066f34c74bf18f66d26d4/src/lib/utils.ts#L11)

Validates if a number is within a specified range.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The value to validate. |
| `min` | `number` | The minimum value. |
| `max` | `number` | The maximum value. |
| `name` | `string` | The name of the value. (Used in potential error message.) |

## Returns

`void`

## Throws

[P5AsciifyError](../classes/P5AsciifyError.md) If the value is not a number or is outside the specified range.
