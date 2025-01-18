[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifySpiralGradient

# Class: P5AsciifySpiralGradient

Defined in: [gradients/spiral/Spiral.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L9)

A spiral gradient that moves in a spiral pattern across the screen.

## Extends

- [`P5AsciifyGradient`](P5AsciifyGradient.md)

## Constructors

### new P5AsciifySpiralGradient()

> **new P5AsciifySpiralGradient**(`p`, `_fontTextureAtlas`, `_shader`, `colors`, `brightnessStart`, `brightnessEnd`, `characters`, `params`): [`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

Defined in: [gradients/spiral/Spiral.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |
| `_shader` | `Shader` |
| `colors` | \[`number`, `number`, `number`\][] |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |
| `characters` | `string` |
| `params` | `SpiralGradientParams` |

#### Returns

[`P5AsciifySpiralGradient`](P5AsciifySpiralGradient.md)

#### Overrides

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`constructor`](P5AsciifyGradient.md#constructors)

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_brightnessend"></a> `_brightnessEnd` | `protected` | `number` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_brightnessEnd`](P5AsciifyGradient.md#_brightnessend) | [gradients/Gradient.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L12) |
| <a id="_brightnessstart"></a> `_brightnessStart` | `protected` | `number` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_brightnessStart`](P5AsciifyGradient.md#_brightnessstart) | [gradients/Gradient.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L11) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_fontTextureAtlas`](P5AsciifyGradient.md#_fonttextureatlas-1) | [gradients/spiral/Spiral.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L18) |
| <a id="_onpalettechangecallback"></a> `_onPaletteChangeCallback?` | `protected` | (`gradient`: [`P5AsciifyGradient`](P5AsciifyGradient.md), `value`: `string`[]) => `void` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_onPaletteChangeCallback`](P5AsciifyGradient.md#_onpalettechangecallback) | [gradients/Gradient.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L14) |
| <a id="_palette"></a> `_palette` | `protected` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_palette`](P5AsciifyGradient.md#_palette) | [gradients/Gradient.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L15) |
| <a id="_shader-1"></a> `_shader` | `protected` | `Shader` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`_shader`](P5AsciifyGradient.md#_shader-1) | [gradients/spiral/Spiral.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L19) |
| <a id="centerx"></a> `centerX` | `public` | `number` | - | [gradients/spiral/Spiral.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L11) |
| <a id="centery"></a> `centerY` | `public` | `number` | - | [gradients/spiral/Spiral.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L12) |
| <a id="density"></a> `density` | `public` | `number` | - | [gradients/spiral/Spiral.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L14) |
| <a id="direction"></a> `direction` | `public` | `number` | - | [gradients/spiral/Spiral.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L10) |
| <a id="enabled"></a> `enabled` | `public` | `boolean` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`enabled`](P5AsciifyGradient.md#enabled) | [gradients/Gradient.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L13) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [`P5AsciifyGradient`](P5AsciifyGradient.md).[`p`](P5AsciifyGradient.md#p-1) | [gradients/spiral/Spiral.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L17) |
| <a id="speed"></a> `speed` | `public` | `number` | - | [gradients/spiral/Spiral.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L13) |

## Accessors

### brightnessEnd

#### Get Signature

> **get** **brightnessEnd**(): `number`

Defined in: [gradients/Gradient.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L86)

##### Returns

`number`

#### Set Signature

> **set** **brightnessEnd**(`value`): `void`

Defined in: [gradients/Gradient.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L64)

Sets the end brightness value.

##### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

##### Returns

`void`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`brightnessEnd`](P5AsciifyGradient.md#brightnessend-1)

***

### brightnessStart

#### Get Signature

> **get** **brightnessStart**(): `number`

Defined in: [gradients/Gradient.ts:87](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L87)

##### Returns

`number`

#### Set Signature

> **set** **brightnessStart**(`value`): `void`

Defined in: [gradients/Gradient.ts:54](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L54)

Sets the start brightness value.

##### Throws

P5AsciifyError If the value is not a number or is not within the range [0, 255].

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The brightness value to set. |

##### Returns

`void`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`brightnessStart`](P5AsciifyGradient.md#brightnessstart-1)

***

### characters

#### Get Signature

> **get** **characters**(): `string`

Defined in: [gradients/Gradient.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L83)

##### Returns

`string`

#### Set Signature

> **set** **characters**(`value`): `void`

Defined in: [gradients/Gradient.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L74)

Sets the characters to use for the gradient.

##### Throws

P5AsciifyError If the string does contain characters that are not available in the font texture atlas.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The characters to use. |

##### Returns

`void`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`characters`](P5AsciifyGradient.md#characters)

***

### palette

#### Get Signature

> **get** **palette**(): [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

Defined in: [gradients/Gradient.ts:85](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L85)

##### Returns

[`P5AsciifyColorPalette`](P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`palette`](P5AsciifyGradient.md#palette)

***

### shader

#### Get Signature

> **get** **shader**(): `Shader`

Defined in: [gradients/Gradient.ts:84](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/Gradient.ts#L84)

##### Returns

`Shader`

#### Inherited from

[`P5AsciifyGradient`](P5AsciifyGradient.md).[`shader`](P5AsciifyGradient.md#shader)

## Methods

### setUniforms()

> **setUniforms**(`framebuffer`, `referenceFramebuffer`): `void`

Defined in: [gradients/spiral/Spiral.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/gradients/spiral/Spiral.ts#L34)

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
