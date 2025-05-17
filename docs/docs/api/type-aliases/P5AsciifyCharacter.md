# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:218](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L218)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:242](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L242)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:251](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L251)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:220](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L220)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:248](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L248)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:245](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L245)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:223](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L223)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:236](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L236)

Gets the outline path of this character positioned at specified coordinates.

This method comes from the `opentype.js` library, which is used by `p5.js` through the `p5.Font` object
throughout the `v1.X.X` versions `p5.asciify` is compatible with.

#### Parameters

| Parameter  | Type     | Description                                     |
| ---------- | -------- | ----------------------------------------------- |
| `x`        | `number` | The horizontal position to place the character  |
| `y`        | `number` | The vertical position to place the character    |
| `fontSize` | `number` | The font size to scale the glyph to (in pixels) |

#### Returns

`object`

An object with methods to get the bounding box and SVG representation of the character

| Name               | Type           | Defined in                                                                                                                          |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `getBoundingBox()` | () => `object` | [types.ts:237](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L237) |
| `toSVG()`          | () => `string` | [types.ts:238](https://github.com/humanbydefinition/p5.asciify/blob/87ac6f42db0b8651603642d4c687c7a3e314ba5f/src/lib/types.ts#L238) |
