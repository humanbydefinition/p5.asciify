# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:220](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L220)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:240](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L240)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

---

### b

> **b**: `number`

Defined in: [types.ts:249](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L249)

The blue component of the character color.

---

### character

> **character**: `string`

Defined in: [types.ts:222](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L222)

The character represented by this glyph.

---

### g

> **g**: `number`

Defined in: [types.ts:246](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L246)

The green component of the character color.

---

### r

> **r**: `number`

Defined in: [types.ts:243](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L243)

The red component of the character color.

---

### unicode

> **unicode**: `number`

Defined in: [types.ts:225](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L225)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:234](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L234)

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
| `getBoundingBox()` | () => `object` | [types.ts:235](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L235) |
| `toSVG()`          | () => `string` | [types.ts:236](https://github.com/humanbydefinition/p5.asciify/blob/6378d8029993bc2b61b23878c17fc7bdb8ee5369/src/lib/types.ts#L236) |
