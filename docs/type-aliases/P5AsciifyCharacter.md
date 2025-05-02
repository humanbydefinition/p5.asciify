[**p5.asciify v0.9.0-beta.5**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyCharacter

# Type Alias: P5AsciifyCharacter

> **P5AsciifyCharacter** = `object`

Defined in: [types.ts:180](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L180)

Each character from a loaded font is represented as a `P5AsciifyCharacter` object.

To receive the list of characters from a loaded font, use the [P5AsciifyFontManager](../classes/P5AsciifyFontManager.md) class.

## Properties

### advanceWidth

> **advanceWidth**: `number`

Defined in: [types.ts:200](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L200)

The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully.

***

### b

> **b**: `number`

Defined in: [types.ts:209](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L209)

The blue component of the character color.

***

### character

> **character**: `string`

Defined in: [types.ts:182](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L182)

The character represented by this glyph.

***

### g

> **g**: `number`

Defined in: [types.ts:206](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L206)

The green component of the character color.

***

### r

> **r**: `number`

Defined in: [types.ts:203](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L203)

The red component of the character color.

***

### unicode

> **unicode**: `number`

Defined in: [types.ts:185](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L185)

The unicode value of the character.

## Methods

### getPath()

> **getPath**(`x`, `y`, `fontSize`): `object`

Defined in: [types.ts:194](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L194)

Gets the outline path of this character positioned at specified coordinates.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `number` | The horizontal position to place the character |
| `y` | `number` | The vertical position to place the character |
| `fontSize` | `number` | The font size to scale the glyph to (in pixels) |

#### Returns

`object`

An object with methods to get the bounding box and SVG representation of the character

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `getBoundingBox()` | () => `object` | [types.ts:195](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L195) |
| `toSVG()` | () => `string` | [types.ts:196](https://github.com/humanbydefinition/p5.asciify/blob/fe0dff6d1233011a7a23cab5c777ec3b02b03613/src/lib/types.ts#L196) |
