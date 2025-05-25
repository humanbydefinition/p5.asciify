# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:217](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L217)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:237](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L237)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:246](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L246)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:219](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L219)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:243](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L243)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:240](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L240)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:222](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L222)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:231](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L231)

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
| `getBoundingBox()` | () => `object` | [types.ts:232](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L232) |
| `toSVG()`          | () => `string` | [types.ts:233](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/types.ts#L233) |
