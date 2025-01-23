[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [gradients](../README.md) / P5AsciifyRadialGradient

# Class: P5AsciifyRadialGradient

Defined in: [gradients/radial/Radial.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L9)

A radial gradient that moves in a radial pattern across the screen.

## Extends

- [`P5AsciifyGradient`](P5AsciifyGradient.md)

## Constructors

### new P5AsciifyRadialGradient()

> **new P5AsciifyRadialGradient**(`p`, `_fontTextureAtlas`, `_shader`, `_characters`, `brightnessStart`, `brightnessEnd`, `params`): [`P5AsciifyRadialGradient`](P5AsciifyRadialGradient.md)

Defined in: [gradients/radial/Radial.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) |
| `_shader` | `Shader` |
| `_characters` | `string` |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |
| `params` | [`RadialGradientParams`](../type-aliases/RadialGradientParams.md) |

#### Returns

[`P5AsciifyRadialGradient`](P5AsciifyRadialGradient.md)

#### Overrides

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`constructor`](P5AsciifyGradient.md#constructors)

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_brightnessEnd`](P5AsciifyGradient.md#_brightnessend) | [gradients/Gradient.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L13) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_brightnessStart`](P5AsciifyGradient.md#_brightnessstart) | [gradients/Gradient.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L12) |
| <a id="_characters-1"></a> `_characters` | `protected` | `string` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_characters`](P5AsciifyGradient.md#_characters-1) | [gradients/radial/Radial.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L19) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_fontTextureAtlas`](P5AsciifyGradient.md#_fonttextureatlas-1) | [gradients/radial/Radial.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L17) |
| <a id="_onpalettechangecallback"></a> `_onPaletteChangeCallback?` | `protected` | (`gradient`: [`P5AsciifyGradient`](P5AsciifyGradient.md), `value`: `string`[]) => `void` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_onPaletteChangeCallback`](P5AsciifyGradient.md#_onpalettechangecallback) | [gradients/Gradient.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L15) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_palette`](P5AsciifyGradient.md#_palette) | [gradients/Gradient.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L16) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_shader`](P5AsciifyGradient.md#_shader-1) | [gradients/radial/Radial.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L18) |
| <a id="centerx"></a> `centerX` | `public` | `number` | - | [gradients/radial/Radial.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L11) |
| <a id="centery"></a> `centerY` | `public` | `number` | - | [gradients/radial/Radial.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L12) |
| <a id="direction"></a> `direction` | `public` | `number` | - | [gradients/radial/Radial.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L10) |
| <a id="enabled"></a> `enabled` | `public` | `boolean` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`enabled`](P5AsciifyGradient.md#enabled) | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L14) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`p`](P5AsciifyGradient.md#p-1) | [gradients/radial/Radial.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L16) |
| <a id="radius"></a> `radius` | `public` | `number` | - | [gradients/radial/Radial.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L13) |

## Accessors

### palette

#### Get Signature

> **get** **palette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [gradients/Gradient.ts:97](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L97)

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`palette`](P5AsciifyGradient.md#palette)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:96](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L96)

##### Returns

`Shader`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`shader`](P5AsciifyGradient.md#shader)

## Methods

### brightnessEnd()

> **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:65](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L65)

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

Defined in: [gradients/Gradient.ts:76](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L76)

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

Defined in: [gradients/Gradient.ts:55](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L55)

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

Defined in: [gradients/Gradient.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/Gradient.ts#L86)

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

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/radial/Radial.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/43b7b0b0d976fb53040ff3a56f702a43d4eee882/src/lib/gradients/radial/Radial.ts#L31)

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
