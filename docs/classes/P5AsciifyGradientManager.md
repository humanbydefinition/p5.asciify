[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGradientManager

# Class: P5AsciifyGradientManager

Defined in: [gradients/GradientManager.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L23)

Manages the creation and removal of gradients for the gradient ascii renderer.

## Constructors

### new P5AsciifyGradientManager()

> **new P5AsciifyGradientManager**(`p`, `fontTextureAtlas`): [`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

Defined in: [gradients/GradientManager.ts:57](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L57)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |

#### Returns

[`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_gradientconstructors"></a> `_gradientConstructors` | `private` | `GradientConstructorMap` | `undefined` | [gradients/GradientManager.ts:42](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L42) |
| <a id="_gradientparams"></a> `_gradientParams` | `private` | `GradientParams` | `undefined` | [gradients/GradientManager.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L24) |
| <a id="_gradients"></a> `_gradients` | `private` | [`P5AsciifyGradient`](P5AsciifyGradient.md)[] | `[]` | [gradients/GradientManager.ts:55](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L55) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | `undefined` | [gradients/GradientManager.ts:59](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L59) |
| <a id="gradientshaders"></a> `gradientShaders` | `private` | `Partial`\<`Record`\<`GradientType`, `Shader`\>\> | `{}` | [gradients/GradientManager.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L40) |
| <a id="gradientshadersources"></a> `gradientShaderSources` | `private` | `Record`\<`GradientType`, `string`\> | `undefined` | [gradients/GradientManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L32) |
| <a id="p-1"></a> `p` | `private` | `__module` | `undefined` | [gradients/GradientManager.ts:58](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L58) |

## Accessors

### gradientConstructors

#### Get Signature

> **get** **gradientConstructors**(): `GradientConstructorMap`

Defined in: [gradients/GradientManager.ts:115](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L115)

##### Returns

`GradientConstructorMap`

***

### gradientParams

#### Get Signature

> **get** **gradientParams**(): `GradientParams`

Defined in: [gradients/GradientManager.ts:113](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L113)

##### Returns

`GradientParams`

***

### gradients

#### Get Signature

> **get** **gradients**(): [`P5AsciifyGradient`](P5AsciifyGradient.md)[]

Defined in: [gradients/GradientManager.ts:114](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L114)

##### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)[]

## Methods

### addGradient()

> **addGradient**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `params`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/GradientManager.ts:77](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L77)

Add a gradient to the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradientName` | `GradientType` | The name of the gradient to add. |
| `brightnessStart` | `number` | The start brightness of the gradient. |
| `brightnessEnd` | `number` | The end brightness of the gradient. |
| `characters` | `string` | The characters to use for the gradient. |
| `params` | `Partial`\<`ConicalGradientParams` \| `LinearGradientParams` \| `NoiseGradientParams` \| `RadialGradientParams` \| `SpiralGradientParams`\> | The parameters for the gradient. |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

The gradient instance.

***

### removeGradient()

> **removeGradient**(`gradient`): `void`

Defined in: [gradients/GradientManager.ts:105](https://github.com/humanbydefinition/p5-asciify/blob/cf8ec4744d81def1a4cd12fbe8e8d65d2bea10b6/src/lib/gradients/GradientManager.ts#L105)

Remove a gradient from the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradient` | [`P5AsciifyGradient`](P5AsciifyGradient.md) | The gradient to remove. |

#### Returns

`void`
