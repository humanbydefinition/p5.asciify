[**p5.asciify v0.7.4**](../../../README.md)

***

[p5.asciify](../../../README.md) / [gradients](../README.md) / P5AsciifyGradientManager

# Class: P5AsciifyGradientManager

Defined in: [gradients/GradientManager.ts:23](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L23)

Manages the creation and removal of gradients for the gradient ascii renderer.

## Constructors

### new P5AsciifyGradientManager()

> **new P5AsciifyGradientManager**(`_p`, `_fontTextureAtlas`): [`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

Defined in: [gradients/GradientManager.ts:59](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L59)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. |

#### Returns

[`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

## Accessors

### gradientConstructors

#### Get Signature

> **get** **gradientConstructors**(): [`GradientConstructorMap`](../type-aliases/GradientConstructorMap.md)

Defined in: [gradients/GradientManager.ts:161](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L161)

##### Returns

[`GradientConstructorMap`](../type-aliases/GradientConstructorMap.md)

***

### gradientParams

#### Get Signature

> **get** **gradientParams**(): [`GradientParams`](../type-aliases/GradientParams.md)

Defined in: [gradients/GradientManager.ts:159](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L159)

##### Returns

[`GradientParams`](../type-aliases/GradientParams.md)

***

### gradients

#### Get Signature

> **get** **gradients**(): [`P5AsciifyGradient`](P5AsciifyGradient.md)[]

Defined in: [gradients/GradientManager.ts:160](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L160)

##### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)[]

## Methods

### add()

> **add**(`gradientName`, `characters`, `brightnessStart`, `brightnessEnd`, `options`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/GradientManager.ts:82](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L82)

Add a gradient to the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradientName` | [`GradientType`](../type-aliases/GradientType.md) | The name of the gradient to add. |
| `characters` | `string` | The characters to use for the gradient. |
| `brightnessStart` | `number` | The start brightness of the gradient. |
| `brightnessEnd` | `number` | The end brightness of the gradient. |
| `options` | `Partial`\<[`ConicalGradientParams`](../type-aliases/ConicalGradientParams.md) \| [`LinearGradientParams`](../type-aliases/LinearGradientParams.md) \| [`RadialGradientParams`](../type-aliases/RadialGradientParams.md) \| [`SpiralGradientParams`](../type-aliases/SpiralGradientParams.md)\> | The parameters for the gradient. |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

The gradient instance.

***

### remove()

> **remove**(`gradient`): `void`

Defined in: [gradients/GradientManager.ts:151](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/gradients/GradientManager.ts#L151)

Remove a gradient from the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradient` | [`P5AsciifyGradient`](P5AsciifyGradient.md) | The gradient to remove. |

#### Returns

`void`
