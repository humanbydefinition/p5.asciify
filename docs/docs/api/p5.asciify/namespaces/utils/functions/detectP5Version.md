# Function: detectP5Version()

> **detectP5Version**(`p`): `string`

Defined in: [utils/utils.ts:19](https://github.com/humanbydefinition/p5.asciify/blob/fec90c4382e90afa818d1e2d47829d9ca98f5310/src/lib/utils/utils.ts#L19)

Detects the p5.js version from various possible sources across different environments.

This function tries multiple strategies to detect the p5.js version, which is necessary
because different p5.js environments (P5LIVE, flok.cc, standalone, etc.) may expose
the version property in different ways.

## Parameters

| Parameter | Type       | Description                                   |
| --------- | ---------- | --------------------------------------------- |
| `p`       | `__module` | The p5.js instance to detect the version from |

## Returns

`string`

The detected p5.js version string, or '1.0.0' as a safe fallback

## Example

```typescript
const version = detectP5Version(p5Instance);
console.log(`Detected p5.js version: ${version}`);
```
