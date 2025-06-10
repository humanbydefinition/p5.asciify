# Function: compareVersions()

> **compareVersions**(`v1`, `v2`): `number`

Defined in: [utils/utils.ts:120](https://github.com/humanbydefinition/p5.asciify/blob/db219ebd919c345fc51a95258e4a8ccb5b2fd6a3/src/lib/utils/utils.ts#L120)

Compares two version strings like `'1.8.0'` and `'1.11.3'`.

## Parameters

| Parameter | Type     | Description                |
| --------- | -------- | -------------------------- |
| `v1`      | `string` | The first version string.  |
| `v2`      | `string` | The second version string. |

## Returns

`number`

1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
