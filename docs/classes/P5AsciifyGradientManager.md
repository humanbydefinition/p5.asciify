[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGradientManager

# Class: P5AsciifyGradientManager

Defined in: [gradients/GradientManager.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L21)

Manages the creation and removal of gradients for the gradient ascii renderer.

## Constructors

### new P5AsciifyGradientManager()

> **new P5AsciifyGradientManager**(`_p`, `_fontTextureAtlas`): [`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

Defined in: [gradients/GradientManager.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_p` | `__module` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |

#### Returns

[`P5AsciifyGradientManager`](P5AsciifyGradientManager.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | `undefined` | [gradients/GradientManager.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L53) |
| <a id="_gradientconstructors"></a> `_gradientConstructors` | `private` | `GradientConstructorMap` | `undefined` | [gradients/GradientManager.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L38) |
| <a id="_gradientparams"></a> `_gradientParams` | `private` | `GradientParams` | `undefined` | [gradients/GradientManager.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L22) |
| <a id="_gradients"></a> `_gradients` | `private` | [`P5AsciifyGradient`](P5AsciifyGradient.md)[] | `[]` | [gradients/GradientManager.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L49) |
| <a id="_gradientshaders"></a> `_gradientShaders` | `private` | `Partial`\<`Record`\<`GradientType`, `Shader`\>\> | `{}` | [gradients/GradientManager.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L36) |
| <a id="_gradientshadersources"></a> `_gradientShaderSources` | `private` | `Record`\<`GradientType`, `string`\> | `undefined` | [gradients/GradientManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L29) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | `undefined` | [gradients/GradientManager.ts:52](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L52) |

## Accessors

### gradientConstructors

#### Get Signature

> **get** **gradientConstructors**(): `GradientConstructorMap`

Defined in: [gradients/GradientManager.ts:108](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L108)

##### Returns

`GradientConstructorMap`

***

### gradientParams

#### Get Signature

> **get** **gradientParams**(): `GradientParams`

Defined in: [gradients/GradientManager.ts:106](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L106)

##### Returns

`GradientParams`

***

### gradients

#### Get Signature

> **get** **gradients**(): [`P5AsciifyGradient`](P5AsciifyGradient.md)[]

Defined in: [gradients/GradientManager.ts:107](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L107)

##### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)[]

## Methods

### addGradient()

> **addGradient**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `params`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [gradients/GradientManager.ts:71](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L71)

Add a gradient to the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradientName` | `GradientType` | The name of the gradient to add. |
| `brightnessStart` | `number` | The start brightness of the gradient. |
| `brightnessEnd` | `number` | The end brightness of the gradient. |
| `characters` | `string` | The characters to use for the gradient. |
| `params` | `Partial`\<`ConicalGradientParams` \| `LinearGradientParams` \| `RadialGradientParams` \| `SpiralGradientParams`\> | The parameters for the gradient. |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

The gradient instance.

***

### removeGradient()

> **removeGradient**(`gradient`): `void`

Defined in: [gradients/GradientManager.ts:98](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/gradients/GradientManager.ts#L98)

Remove a gradient from the gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradient` | [`P5AsciifyGradient`](P5AsciifyGradient.md) | The gradient to remove. |

#### Returns

`void`
