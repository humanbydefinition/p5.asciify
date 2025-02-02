[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyColorPalette

# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/ColorPalette.ts#L10)

A 1D color palette stored in a framebuffer that is used to pass colors to shaders.

There is no need to modify instances of this class provided by the library, 
as they are managed internally and can be modified more easily through classes managing them.
But you technically could - *if you wanted to* - without breaking anything.

## Constructors

### new P5AsciifyColorPalette()

> **new P5AsciifyColorPalette**(`_p`, `_colors`): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [ColorPalette.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/ColorPalette.ts#L20)

Create a new color palette instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_colors` | \[`number`, `number`, `number`\][] | The colors to store in the palette. |

#### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

## Accessors

### colors

#### Get Signature

> **get** **colors**(): \[`number`, `number`, `number`\][]

Defined in: [ColorPalette.ts:72](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/ColorPalette.ts#L72)

Get the colors of the palette.

##### Returns

\[`number`, `number`, `number`\][]

***

### framebuffer

#### Get Signature

> **get** **framebuffer**(): `Framebuffer`

Defined in: [ColorPalette.ts:77](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/ColorPalette.ts#L77)

Get the framebuffer of the palette.

##### Returns

`Framebuffer`

## Methods

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/ColorPalette.ts#L64)

Sets the colors of the palette and updates the framebuffer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newColors` | \[`number`, `number`, `number`\][] | The new colors to set. |

#### Returns

`void`
