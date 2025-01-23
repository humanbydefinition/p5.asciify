[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / compareVersions

# Function: compareVersions()

> **compareVersions**(`v1`, `v2`): `number`

Defined in: [utils.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/7c3eabf90074b598e8c066f34c74bf18f66d26d4/src/lib/utils.ts#L25)

Compares two version strings like `'1.8.0'` and `'1.11.3'`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `string` | The first version string. |
| `v2` | `string` | The second version string. |

## Returns

`number`

1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
