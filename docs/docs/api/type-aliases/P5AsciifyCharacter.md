# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:187](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L187)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:211](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L211)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:220](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L220)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:189](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L189)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:217](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L217)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:214](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L214)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:192](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L192)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:205](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L205)

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
| `getBoundingBox()` | () => `object` | [types.ts:206](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L206) |
| `toSVG()`          | () => `string` | [types.ts:207](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/types.ts#L207) |
