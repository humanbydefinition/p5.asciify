[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyColorPalette

# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L15)

A 1D color palette for use with the `p5.asciify` library.

The color palette is stored in a framebuffer, which is used to pass the colors to various shaders in the library.

## Remarks

Used in the [P5AsciifyCharacterSet](P5AsciifyCharacterSet.md) class to store the colors of the characters in the character set,
which are then passed to the shaders for rendering and decoding the pixel colors to ASCII characters.

Also used by the [P5AsciifyGradient](P5AsciifyGradient.md) classes to store the colors of the gradient character sets for the same purpose.

## Constructors

### new P5AsciifyColorPalette()

> **new P5AsciifyColorPalette**(`p`, `_colors`): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [ColorPalette.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L25)

Create a new color palette instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` | The p5 instance. |
| `_colors` | \[`number`, `number`, `number`\][] | The colors to store in the palette. |

#### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_colors-1"></a> `_colors` | `private` | \[`number`, `number`, `number`\][] | The colors to store in the palette. | [ColorPalette.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L27) |
| <a id="framebuffer"></a> `framebuffer` | `public` | `Framebuffer` | The framebuffer used to store the color palette. | [ColorPalette.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L18) |
| <a id="p-1"></a> `p` | `private` | `__module` | The p5 instance. | [ColorPalette.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L26) |

## Accessors

### colors

#### Get Signature

> **get** **colors**(): \[`number`, `number`, `number`\][]

Defined in: [ColorPalette.ts:75](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L75)

##### Returns

\[`number`, `number`, `number`\][]

## Methods

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L69)

Set the colors of the palette and update the framebuffer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newColors` | \[`number`, `number`, `number`\][] | The new colors to set. |

#### Returns

`void`

***

### updateFramebuffer()

> **updateFramebuffer**(): `void`

Defined in: [ColorPalette.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/be3647d4a706edbeac596a8651a8ee16fcb3e2d3/src/lib/ColorPalette.ts#L43)

Update the framebuffer with the currently selected colors.

#### Returns

`void`
