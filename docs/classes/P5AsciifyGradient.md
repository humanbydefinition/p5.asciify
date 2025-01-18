[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGradient

# Class: `abstract` P5AsciifyGradient

Defined in: [gradients/Gradient.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L10)

Represents a gradient that can be applied to the gradient ascii renderer.

## Extended by

- [`P5AsciifyConicalGradient`](P5AsciifyConicalGradient.md)
- [`P5AsciifyLinearGradient`](P5AsciifyLinearGradient.md)
- [`P5AsciifyRadialGradient`](P5AsciifyRadialGradient.md)
- [`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

## Constructors

### new P5AsciifyGradient()

> **new P5AsciifyGradient**(`p`, `_fontTextureAtlas`, `_shader`, `colors`, `brightnessStart`, `brightnessEnd`, `_characters`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/Gradient.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |
| `_shader` | `Shader` |
| `colors` | \[`number`, `number`, `number`\][] |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |
| `_characters` | `string` |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | [gradients/Gradient.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L12) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | [gradients/Gradient.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L11) |
| <a id="_characters-1"></a> `_characters` | `private` | `string` | [gradients/Gradient.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L24) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [gradients/Gradient.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L19) |
| <a id="_onpalettechangecallback"></a> `_onPaletteChangeCallback?` | `protected` | (`gradient`: [`P5AsciifyGradient`](P5AsciifyGradient.md), `value`: `string`[]) => `void` | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L14) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | [gradients/Gradient.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L15) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | [gradients/Gradient.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L20) |
| <a id="enabled"></a> `enabled` | `public` | `boolean` | [gradients/Gradient.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L13) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [gradients/Gradient.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L18) |

## Accessors

### brightnessEnd

#### Get Signature

> **get** **brightnessEnd**(): `number`

Defined in: [gradients/Gradient.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L86)

##### Returns

`number`

#### Set Signature

> **set** **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L64)

Sets the end brightness value.

##### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

##### Returns

`void`

***

### brightnessStart

#### Get Signature

> **get** **brightnessStart**(): `number`

Defined in: [gradients/Gradient.ts:87](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L87)

##### Returns

`number`

#### Set Signature

> **set** **brightnessStart**(`value`): `void`

Defined in: [gradients/Gradient.ts:54](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L54)

Sets the start brightness value.

##### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

##### Returns

`void`

***

### characters

#### Get Signature

> **get** **characters**(): `string`

Defined in: [gradients/Gradient.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L83)

##### Returns

`string`

#### Set Signature

> **set** **characters**(`value`): `void`

Defined in: [gradients/Gradient.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L74)

Sets the characters to use for the gradient.

##### Throws

P5AsciifyError If the string does contain characters that are not available in the font texture atlas.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The characters to use. |

##### Returns

`void`

***

### palette

#### Get Signature

> **get** **palette**(): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [gradients/Gradient.ts:85](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L85)

##### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:84](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L84)

##### Returns

`Shader`

## Methods

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/Gradient.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/89ee70d0032c1de92bfdbc3505dfbea3c5cb5a9b/src/lib/gradients/Gradient.ts#L40)

Sets the uniforms for the gradient shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `framebuffer` | `Framebuffer` | The framebuffer to use. |
| `referenceFramebuffer` | `Framebuffer` | The reference framebuffer, which is used so two gradients cannot write onto the same pixels. |

#### Returns

`void`
