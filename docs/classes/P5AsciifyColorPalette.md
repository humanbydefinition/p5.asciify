[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyColorPalette

# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L6)

A 1D color palette stored in a framebuffer, which is used to pass colors to shaders.

## Constructors

### new P5AsciifyColorPalette()

> **new P5AsciifyColorPalette**(`_p`, `_colors`): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [ColorPalette.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L16)

Create a new color palette instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_colors` | \[`number`, `number`, `number`\][] | The colors to store in the palette. |

#### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_colors-1"></a> `_colors` | `private` | \[`number`, `number`, `number`\][] | The colors to store in the palette. | [ColorPalette.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L18) |
| <a id="_framebuffer"></a> `_framebuffer` | `private` | `Framebuffer` | The framebuffer used to store the color palette. | [ColorPalette.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L9) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | The p5 instance. | [ColorPalette.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L17) |

## Accessors

### colors

#### Get Signature

> **get** **colors**(): \[`number`, `number`, `number`\][]

Defined in: [ColorPalette.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L66)

##### Returns

\[`number`, `number`, `number`\][]

***

### framebuffer

#### Get Signature

> **get** **framebuffer**(): `Framebuffer`

Defined in: [ColorPalette.ts:67](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L67)

##### Returns

`Framebuffer`

## Methods

### \_updateFramebuffer()

> `private` **\_updateFramebuffer**(): `void`

Defined in: [ColorPalette.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L34)

Update the framebuffer with the currently selected colors.

#### Returns

`void`

***

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:60](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/ColorPalette.ts#L60)

Set the colors of the palette and update the framebuffer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newColors` | \[`number`, `number`, `number`\][] | The new colors to set. |

#### Returns

`void`
