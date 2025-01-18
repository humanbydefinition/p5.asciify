[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyRenderer

# Class: P5AsciifyRenderer\<T\>

Defined in: [renderers/AsciiRenderer.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L14)

Abstract class for shader-based ASCII Renderers.

## Extended by

- [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)
- [`P5AsciifyBrightnessRenderer`](P5AsciifyBrightnessRenderer.md)
- [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)
- [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `AsciiRendererOptions` | `AsciiRendererOptions` |

## Constructors

### new P5AsciifyRenderer()

> **new P5AsciifyRenderer**\<`T`\>(`p`, `grid`, `characterSet`, `_options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)\<`T`\>

Defined in: [renderers/AsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L22)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `grid` | [`P5AsciifyGrid`](P5AsciifyGrid.md) |
| `characterSet` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) |
| `_options` | `T` |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)\<`T`\>

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_asciicharacterframebuffer"></a> `_asciiCharacterFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L18) |
| <a id="_options-1"></a> `_options` | `protected` | `T` | [renderers/AsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L26) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L19) |
| <a id="_primarycolorsampleframebuffer"></a> `_primaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L16) |
| <a id="_secondarycolorsampleframebuffer"></a> `_secondaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L17) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | [renderers/AsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L20) |
| <a id="characterset-1"></a> `characterSet` | `public` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) | [renderers/AsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L25) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [renderers/AsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L24) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [renderers/AsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L23) |

## Accessors

### asciiCharacterFramebuffer

#### Get Signature

> **get** **asciiCharacterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:147](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L147)

##### Returns

`Framebuffer`

***

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:144](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L144)

##### Returns

`T`

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:143](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L143)

##### Returns

`Framebuffer`

***

### primaryColorSampleFramebuffer

#### Get Signature

> **get** **primaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:145](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L145)

##### Returns

`Framebuffer`

***

### secondaryColorSampleFramebuffer

#### Get Signature

> **get** **secondaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:146](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L146)

##### Returns

`Framebuffer`

## Methods

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/AsciiRenderer.ts:119](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L119)

Convert and render the input framebuffer to ASCII.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `inputFramebuffer` | `Framebuffer` | The input framebuffer to convert to ASCII. |
| `previousAsciiRenderer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The previous ASCII renderer in the pipeline. |

#### Returns

`void`

***

### resetShaders()

> **resetShaders**(): `void`

Defined in: [renderers/AsciiRenderer.ts:82](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L82)

Resets the shaders for the renderer.

#### Returns

`void`

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/AsciiRenderer.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L73)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

***

### updateOptions()

> **updateOptions**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:88](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/renderers/AsciiRenderer.ts#L88)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<`AsciiRendererOptions`\> | The new options to update. |

#### Returns

`void`
