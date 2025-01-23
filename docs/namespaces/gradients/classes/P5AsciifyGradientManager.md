[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [gradients](../README.md) / P5AsciifyGradientManager

# Class: P5AsciifyGradientManager

Defined in: [gradients/GradientManager.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L23)

Manages the creation and removal of gradients for the gradient ascii renderer.

## Constructors

### new P5AsciifyGradientManager()

> **new P5AsciifyGradientManager**(`_p`, `_fontTextureAtlas`): [`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

Defined in: [gradients/GradientManager.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L53)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) |

#### Returns

[`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | [gradients/GradientManager.ts:55](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L55) |
| <a id="_gradientconstructors"></a> `_gradientConstructors` | `private` | [`GradientConstructorMap`](../type-aliases/GradientConstructorMap.md) | `undefined` | [gradients/GradientManager.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L40) |
| <a id="_gradientparams"></a> `_gradientParams` | `private` | [`GradientParams`](../type-aliases/GradientParams.md) | `undefined` | [gradients/GradientManager.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L24) |
| <a id="_gradients"></a> `_gradients` | `private` | [`P5AsciifyGradient`](P5AsciifyGradient.md)[] | `[]` | [gradients/GradientManager.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L51) |
| <a id="_gradientshaders"></a> `_gradientShaders` | `private` | `Partial`\<`Record`\<[`GradientType`](../type-aliases/GradientType.md), `Shader`\>\> | `{}` | [gradients/GradientManager.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L38) |
| <a id="_gradientshadersources"></a> `_gradientShaderSources` | `private` | `Record`\<[`GradientType`](../type-aliases/GradientType.md), `string`\> | `undefined` | [gradients/GradientManager.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L31) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | `undefined` | [gradients/GradientManager.ts:54](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L54) |

## Accessors

### gradientConstructors

#### Get Signature

> **get** **gradientConstructors**(): [`GradientConstructorMap`](../type-aliases/GradientConstructorMap.md)

Defined in: [gradients/GradientManager.ts:152](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L152)

##### Returns

[`GradientConstructorMap`](../type-aliases/GradientConstructorMap.md)

***

### gradientParams

#### Get Signature

> **get** **gradientParams**(): [`GradientParams`](../type-aliases/GradientParams.md)

Defined in: [gradients/GradientManager.ts:150](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L150)

##### Returns

[`GradientParams`](../type-aliases/GradientParams.md)

***

### gradients

#### Get Signature

> **get** **gradients**(): [`P5AsciifyGradient`](P5AsciifyGradient.md)[]

Defined in: [gradients/GradientManager.ts:151](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L151)

##### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)[]

## Methods

### add()

> **add**(`gradientName`, `characters`, `brightnessStart`, `brightnessEnd`, `options`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/GradientManager.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L73)

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

Defined in: [gradients/GradientManager.ts:142](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/gradients/GradientManager.ts#L142)

Remove a gradient from the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradient` | [`P5AsciifyGradient`](P5AsciifyGradient.md) | The gradient to remove. |

#### Returns

`void`
