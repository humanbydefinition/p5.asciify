[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../README.md) / [gradients](../README.md) / P5AsciifySpiralGradient

# Class: P5AsciifySpiralGradient

Defined in: [gradients/spiral/Spiral.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L9)

A spiral gradient that moves in a spiral pattern across the screen.

## Extends

- [`P5AsciifyGradient`](P5AsciifyGradient.md)

## Constructors

### new P5AsciifySpiralGradient()

> **new P5AsciifySpiralGradient**(`p`, `_fontTextureAtlas`, `_shader`, `_characters`, `brightnessStart`, `brightnessEnd`, `params`): [`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

Defined in: [gradients/spiral/Spiral.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) |
| `_shader` | `Shader` |
| `_characters` | `string` |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |
| `params` | [`SpiralGradientParams`](../type-aliases/SpiralGradientParams.md) |

#### Returns

[`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

#### Overrides

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`constructor`](P5AsciifyGradient.md#constructors)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | The end brightness value of the gradient. Should be a value between 0 and 255. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_brightnessEnd`](P5AsciifyGradient.md#_brightnessend) | [gradients/Gradient.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L17) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | The start brightness value of the gradient. Should be a value between 0 and 255. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_brightnessStart`](P5AsciifyGradient.md#_brightnessstart) | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L14) |
| <a id="_characters-1"></a> `_characters` | `protected` | `string` | The characters to use for the gradient. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_characters`](P5AsciifyGradient.md#_characters-1) | [gradients/spiral/Spiral.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L20) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_fontTextureAtlas`](P5AsciifyGradient.md#_fonttextureatlas-1) | [gradients/spiral/Spiral.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L18) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | The color palette for the gradient, corresponding to the characters. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_palette`](P5AsciifyGradient.md#_palette) | [gradients/Gradient.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L23) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | The gradient shader to use. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_shader`](P5AsciifyGradient.md#_shader-1) | [gradients/spiral/Spiral.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L19) |
| <a id="centerx"></a> `centerX` | `public` | `number` | - | - | [gradients/spiral/Spiral.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L11) |
| <a id="centery"></a> `centerY` | `public` | `number` | - | - | [gradients/spiral/Spiral.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L12) |
| <a id="density"></a> `density` | `public` | `number` | - | - | [gradients/spiral/Spiral.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L14) |
| <a id="direction"></a> `direction` | `public` | `number` | - | - | [gradients/spiral/Spiral.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L10) |
| <a id="p-1"></a> `p` | `protected` | `__module` | The p5 instance. | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`p`](P5AsciifyGradient.md#p-1) | [gradients/spiral/Spiral.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L17) |
| <a id="speed"></a> `speed` | `public` | `number` | - | - | [gradients/spiral/Spiral.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L13) |

## Accessors

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [gradients/Gradient.ts:137](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L137)

##### Returns

`boolean`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`isEnabled`](P5AsciifyGradient.md#isenabled)

***

### palette

#### Get Signature

> **get** **palette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [gradients/Gradient.ts:136](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L136)

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`palette`](P5AsciifyGradient.md#palette)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:135](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L135)

##### Returns

`Shader`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`shader`](P5AsciifyGradient.md#shader)

## Methods

### brightnessEnd()

> **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:82](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L82)

Sets the end brightness value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

#### Returns

`void`

#### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`brightnessEnd`](P5AsciifyGradient.md#brightnessend-1)

***

### brightnessRange()

> **brightnessRange**(`start`, `end`): `void`

Defined in: [gradients/Gradient.ts:93](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L93)

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

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`brightnessRange`](P5AsciifyGradient.md#brightnessrange)

***

### brightnessStart()

> **brightnessStart**(`value`): `void`

Defined in: [gradients/Gradient.ts:72](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L72)

Sets the start brightness value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

#### Returns

`void`

#### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`brightnessStart`](P5AsciifyGradient.md#brightnessstart-1)

***

### characters()

> **characters**(`value`): `void`

Defined in: [gradients/Gradient.ts:103](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L103)

Sets the characters to use for the gradient.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The characters to use. |

#### Returns

`void`

#### Throws

P5AsciifyError If the string does contain characters that are not available in the font texture atlas.

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`characters`](P5AsciifyGradient.md#characters)

***

### disable()

> **disable**(): `void`

Defined in: [gradients/Gradient.ts:130](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L130)

Disables the gradient.

#### Returns

`void`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`disable`](P5AsciifyGradient.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [gradients/Gradient.ts:123](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L123)

Enables the gradient.

#### Returns

`void`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`enable`](P5AsciifyGradient.md#enable)

***

### enabled()

> **enabled**(`value`): `void`

Defined in: [gradients/Gradient.ts:116](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/Gradient.ts#L116)

Enables or disables the gradient.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `boolean` | Whether to enable or disable the gradient. |

#### Returns

`void`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`enabled`](P5AsciifyGradient.md#enabled)

***

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/spiral/Spiral.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/gradients/spiral/Spiral.ts#L33)

Sets the uniforms for the gradient shader.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `framebuffer` | `Framebuffer` | The framebuffer to use. |
| `referenceFramebuffer` | `Framebuffer` | The reference framebuffer, which is used so two gradients cannot write onto the same pixels. |

#### Returns

`void`

#### Overrides

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`setUniforms`](P5AsciifyGradient.md#setuniforms)
