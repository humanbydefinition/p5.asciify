# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:280](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L280)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:300](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L300)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:309](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L309)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:282](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L282)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:306](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L306)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:303](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L303)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:285](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L285)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:294](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L294)

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
| `getBoundingBox()` | () => `object` | [types.ts:295](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L295) |
| `toSVG()`          | () => `string` | [types.ts:296](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/types.ts#L296) |
