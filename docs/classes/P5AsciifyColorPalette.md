[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyColorPalette

# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L6)

A 1D color palette stored in a framebuffer, which can be used to pass colors to shaders.

## Constructors

### new P5AsciifyColorPalette()

> **new P5AsciifyColorPalette**(`p`, `_colors`): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [ColorPalette.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L16)

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
| <a id="_colors-1"></a> `_colors` | `private` | \[`number`, `number`, `number`\][] | The colors to store in the palette. | [ColorPalette.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L18) |
| <a id="framebuffer"></a> `framebuffer` | `public` | `Framebuffer` | The framebuffer used to store the color palette. | [ColorPalette.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L9) |
| <a id="p-1"></a> `p` | `private` | `__module` | The p5 instance. | [ColorPalette.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L17) |

## Accessors

### colors

#### Get Signature

> **get** **colors**(): \[`number`, `number`, `number`\][]

Defined in: [ColorPalette.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L66)

##### Returns

\[`number`, `number`, `number`\][]

## Methods

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:60](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L60)

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

Defined in: [ColorPalette.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/ColorPalette.ts#L34)

Update the framebuffer with the currently selected colors.

#### Returns

`void`
