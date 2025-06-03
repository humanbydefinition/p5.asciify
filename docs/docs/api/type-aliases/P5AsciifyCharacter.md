# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:228](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L228)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:248](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L248)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:257](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L257)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:230](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L230)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:254](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L254)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:251](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L251)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:233](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L233)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:242](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L242)

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
| `getBoundingBox()` | () => `object` | [types.ts:243](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L243) |
| `toSVG()`          | () => `string` | [types.ts:244](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/types.ts#L244) |
