# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:270](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L270)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:290](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L290)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:299](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L299)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:272](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L272)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:296](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L296)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:293](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L293)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:275](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L275)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:284](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L284)

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
| `getBoundingBox()` | () => `object` | [types.ts:285](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L285) |
| `toSVG()`          | () => `string` | [types.ts:286](https://github.com/humanbydefinition/p5.asciify/blob/72903d96d3952ed620f9a2161a4579d7cc8f2a03/src/lib/types.ts#L286) |
