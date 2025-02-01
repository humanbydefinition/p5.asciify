[**p5.asciify v0.7.1**](../../../README.md)

***

[p5.asciify](../../../README.md) / [gradients](../README.md) / P5AsciifyGradient

# Class: `abstract` P5AsciifyGradient

Defined in: [gradients/Gradient.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L11)

Represents a gradient that can be applied to the gradient ascii renderer.

## Extended by

- [`P5AsciifyConicalGradient`](P5AsciifyConicalGradient.md)
- [`P5AsciifyLinearGradient`](P5AsciifyLinearGradient.md)
- [`P5AsciifyRadialGradient`](P5AsciifyRadialGradient.md)
- [`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

## Constructors

### new P5AsciifyGradient()

> **new P5AsciifyGradient**(`p`, `_fontTextureAtlas`, `_shader`, `_characters`, `brightnessStart`, `brightnessEnd`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/Gradient.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L25)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` | The p5 instance. |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. |
| `_shader` | `Shader` | The gradient shader to use. |
| `_characters` | `string` | The characters to use for the gradient. |
| `brightnessStart` | `number` | - |
| `brightnessEnd` | `number` | - |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | The end brightness value of the gradient. Should be a value between 0 and 255. | [gradients/Gradient.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L17) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | The start brightness value of the gradient. Should be a value between 0 and 255. | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L14) |
| <a id="_characters-1"></a> `_characters` | `protected` | `string` | The characters to use for the gradient. | [gradients/Gradient.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L36) |
| <a id="_enabled"></a> `_enabled` | `private` | `boolean` | Whether the gradient is enabled. | [gradients/Gradient.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L20) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. | [gradients/Gradient.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L30) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | The color palette for the gradient, corresponding to the characters. | [gradients/Gradient.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L23) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | The gradient shader to use. | [gradients/Gradient.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L33) |
| <a id="p-1"></a> `p` | `protected` | `__module` | The p5 instance. | [gradients/Gradient.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L27) |

## Accessors

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [gradients/Gradient.ts:137](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L137)

##### Returns

`boolean`

***

### palette

#### Get Signature

> **get** **palette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [gradients/Gradient.ts:136](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L136)

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:135](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L135)

##### Returns

`Shader`

## Methods

### brightnessEnd()

> **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:82](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L82)

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

Defined in: [gradients/Gradient.ts:93](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L93)

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

Defined in: [gradients/Gradient.ts:72](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L72)

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

Defined in: [gradients/Gradient.ts:103](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L103)

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

### disable()

> **disable**(): `void`

Defined in: [gradients/Gradient.ts:130](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L130)

Disables the gradient.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [gradients/Gradient.ts:123](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L123)

Enables the gradient.

#### Returns

`void`

***

### enabled()

> **enabled**(`value`): `void`

Defined in: [gradients/Gradient.ts:116](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L116)

Enables or disables the gradient.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `boolean` | Whether to enable or disable the gradient. |

#### Returns

`void`

***

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/Gradient.ts:58](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/gradients/Gradient.ts#L58)

Sets the uniforms for the gradient shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `framebuffer` | `Framebuffer` | The framebuffer to use. |
| `referenceFramebuffer` | `Framebuffer` | The reference framebuffer, which is used so two gradients cannot write onto the same pixels. |

#### Returns

`void`
