# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:282](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L282)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:302](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L302)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### character

> **character**: `string`

Defined in: [types.ts:284](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L284)

The character represented by this glyph.

---

### color

> **color**: `p5.Color`

Defined in: [types.ts:304](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L304)

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:287](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L287)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:296](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L296)

Gets the outline path of this character positioned at specified coordinates.

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
| `getBoundingBox()` | () => `object` | [types.ts:297](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L297) |
| `toSVG()`          | () => `string` | [types.ts:298](https://github.com/humanbydefinition/p5.asciify/blob/890d7feb185e00ea8c8a849059b23cc3e18e7138/src/lib/types.ts#L298) |
