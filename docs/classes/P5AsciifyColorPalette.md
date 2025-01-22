[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyColorPalette

# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L17)

A 1D color palette for use with the `p5.asciify` library.

The color palette is stored in a framebuffer, which is used to pass the colors to various shaders in the library.

## Remarks

Used in the [P5AsciifyRenderer](../namespaces/renderers/classes/P5AsciifyRenderer.md) classes to store the colors of the characters in the character set,
which are then passed to the shaders for rendering and decoding the pixel colors to ASCII characters.

Also used by the [P5AsciifyGradient](../namespaces/gradients/classes/P5AsciifyGradient.md) classes to store the colors of the gradient character sets for the same purpose.

## Constructors

### new P5AsciifyColorPalette()

> **new P5AsciifyColorPalette**(`p`, `_colors`): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [ColorPalette.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L27)

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
| <a id="_colors-1"></a> `_colors` | `private` | \[`number`, `number`, `number`\][] | The colors to store in the palette. | [ColorPalette.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L29) |
| <a id="framebuffer"></a> `framebuffer` | `public` | `Framebuffer` | The framebuffer used to store the color palette. | [ColorPalette.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L20) |
| <a id="p-1"></a> `p` | `private` | `__module` | The p5 instance. | [ColorPalette.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L28) |

## Accessors

### colors

#### Get Signature

> **get** **colors**(): \[`number`, `number`, `number`\][]

Defined in: [ColorPalette.ts:77](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L77)

##### Returns

\[`number`, `number`, `number`\][]

## Methods

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:71](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L71)

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

Defined in: [ColorPalette.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/ColorPalette.ts#L45)

Update the framebuffer with the currently selected colors.

#### Returns

`void`
