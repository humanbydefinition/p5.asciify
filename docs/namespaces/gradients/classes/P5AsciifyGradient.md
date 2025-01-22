[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [gradients](../README.md) / P5AsciifyGradient

# Class: `abstract` P5AsciifyGradient

Defined in: [gradients/Gradient.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L11)

Represents a gradient that can be applied to the gradient ascii renderer.

## Extended by

- [`P5AsciifyConicalGradient`](P5AsciifyConicalGradient.md)
- [`P5AsciifyLinearGradient`](P5AsciifyLinearGradient.md)
- [`P5AsciifyRadialGradient`](P5AsciifyRadialGradient.md)
- [`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

## Constructors

### new P5AsciifyGradient()

> **new P5AsciifyGradient**(`p`, `_fontTextureAtlas`, `_shader`, `_characters`, `brightnessStart`, `brightnessEnd`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/Gradient.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) |
| `_shader` | `Shader` |
| `_characters` | `string` |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | [gradients/Gradient.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L13) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | [gradients/Gradient.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L12) |
| <a id="_characters-1"></a> `_characters` | `protected` | `string` | [gradients/Gradient.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L22) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | [gradients/Gradient.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L20) |
| <a id="_onpalettechangecallback"></a> `_onPaletteChangeCallback?` | `protected` | (`gradient`: [`P5AsciifyGradient`](P5AsciifyGradient.md), `value`: `string`[]) => `void` | [gradients/Gradient.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L15) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | [gradients/Gradient.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L16) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | [gradients/Gradient.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L21) |
| <a id="enabled"></a> `enabled` | `public` | `boolean` | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L14) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [gradients/Gradient.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L19) |

## Accessors

### palette

#### Get Signature

> **get** **palette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [gradients/Gradient.ts:97](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L97)

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:96](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L96)

##### Returns

`Shader`

## Methods

### brightnessEnd()

> **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:65](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L65)

Sets the end brightness value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

#### Returns

`void`

#### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

***

### brightnessRange()

> **brightnessRange**(`start`, `end`): `void`

Defined in: [gradients/Gradient.ts:76](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L76)

Sets the brightness range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `start` | `number` | The start brightness value. |
| `end` | `number` | The end brightness value. |

#### Returns

`void`

#### Throws

P5AsciifyError If the start or end value is not a number or is not within the range [0, 255].

***

### brightnessStart()

> **brightnessStart**(`value`): `void`

Defined in: [gradients/Gradient.ts:55](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L55)

Sets the start brightness value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

#### Returns

`void`

#### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

***

### characters()

> **characters**(`value`): `void`

Defined in: [gradients/Gradient.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L86)

Sets the characters to use for the gradient.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The characters to use. |

#### Returns

`void`

#### Throws

P5AsciifyError If the string does contain characters that are not available in the font texture atlas.

***

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/Gradient.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/gradients/Gradient.ts#L41)

Sets the uniforms for the gradient shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `framebuffer` | `Framebuffer` | The framebuffer to use. |
| `referenceFramebuffer` | `Framebuffer` | The reference framebuffer, which is used so two gradients cannot write onto the same pixels. |

#### Returns

`void`
