[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyColorPalette

# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L6)

A 1D color palette for use with the P5Asciify library.

## Constructors

### new P5AsciifyColorPalette()

> **new P5AsciifyColorPalette**(`p`, `_colors`): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [ColorPalette.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L9)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_colors` | \[`number`, `number`, `number`\][] |

#### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_colors-1"></a> `_colors` | `private` | \[`number`, `number`, `number`\][] | [ColorPalette.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L11) |
| <a id="framebuffer"></a> `framebuffer` | `public` | `Framebuffer` | [ColorPalette.ts:7](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L7) |
| <a id="p-1"></a> `p` | `private` | `__module` | [ColorPalette.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L10) |

## Accessors

### colors

#### Get Signature

> **get** **colors**(): \[`number`, `number`, `number`\][]

Defined in: [ColorPalette.ts:59](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L59)

##### Returns

\[`number`, `number`, `number`\][]

## Methods

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L53)

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

Defined in: [ColorPalette.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/4fd2e8db8d519fa467f370c6f15b2c0cecde58e7/src/lib/ColorPalette.ts#L27)

Update the framebuffer with the current colors.

#### Returns

`void`
