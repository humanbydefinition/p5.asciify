# Function: isP5AsyncCapable()

> **isP5AsyncCapable**(`version`): `boolean`

Defined in: [utils/utils.ts:74](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/utils/utils.ts#L74)

Checks if the detected p5.js version supports async operations (Promise-based APIs).

## Parameters

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| `version` | `string` | The p5.js version string |

## Returns

`boolean`

True if the version supports async operations (2.0.0+), false otherwise

## Example

```typescript
const version = detectP5Version(p5Instance);
const supportsAsync = isAsyncCapable(version);

if (supportsAsync) {
  const font = await p.loadFont("font.ttf");
} else {
  const font = p.loadFont("font.ttf", onLoadCallback);
}
```
