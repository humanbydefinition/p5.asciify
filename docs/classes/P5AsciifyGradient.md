[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGradient

# Class: `abstract` P5AsciifyGradient

Defined in: [gradients/Gradient.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L10)

Represents a gradient that can be applied to the gradient ascii renderer.

## Extended by

- [`P5AsciifyConicalGradient`](P5AsciifyConicalGradient.md)
- [`P5AsciifyLinearGradient`](P5AsciifyLinearGradient.md)
- [`P5AsciifyRadialGradient`](P5AsciifyRadialGradient.md)
- [`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

## Constructors

### new P5AsciifyGradient()

> **new P5AsciifyGradient**(`p`, `_fontTextureAtlas`, `_shader`, `brightnessStart`, `brightnessEnd`, `characters`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/Gradient.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |
| `_shader` | `Shader` |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |
| `characters` | `string` |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | [gradients/Gradient.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L12) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | [gradients/Gradient.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L11) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [gradients/Gradient.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L19) |
| <a id="_onpalettechangecallback"></a> `_onPaletteChangeCallback?` | `protected` | (`gradient`: [`P5AsciifyGradient`](P5AsciifyGradient.md), `value`: `string`[]) => `void` | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L14) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | [gradients/Gradient.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L15) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | [gradients/Gradient.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L20) |
| <a id="enabled"></a> `enabled` | `public` | `boolean` | [gradients/Gradient.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L13) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [gradients/Gradient.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L18) |

## Accessors

### brightnessEnd

#### Get Signature

> **get** **brightnessEnd**(): `number`

Defined in: [gradients/Gradient.ts:82](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L82)

##### Returns

`number`

#### Set Signature

> **set** **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:63](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L63)

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

Defined in: [gradients/Gradient.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L83)

##### Returns

`number`

#### Set Signature

> **set** **brightnessStart**(`value`): `void`

Defined in: [gradients/Gradient.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L53)

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

#### Set Signature

> **set** **characters**(`value`): `void`

Defined in: [gradients/Gradient.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L73)

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

Defined in: [gradients/Gradient.ts:81](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L81)

##### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:80](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L80)

##### Returns

`Shader`

## Methods

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/Gradient.ts:39](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/gradients/Gradient.ts#L39)

Sets the uniforms for the gradient shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `framebuffer` | `Framebuffer` | The framebuffer to use. |
| `referenceFramebuffer` | `Framebuffer` | The reference framebuffer, which is used so two gradients cannot write onto the same pixels. |

#### Returns

`void`
