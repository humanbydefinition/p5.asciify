[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyEdgeRenderer

# Class: P5AsciifyEdgeRenderer

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L21)

An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)\<`AsciiRendererOptions`\>

## Constructors

### new P5AsciifyEdgeRenderer()

> **new P5AsciifyEdgeRenderer**(`p5Instance`, `grid`, `characterSet`, `options`): [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L29)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p5Instance` | `__module` |
| `grid` | [`P5AsciifyGrid`](P5AsciifyGrid.md) |
| `characterSet` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) |
| `options` | `AsciiRendererOptions` |

#### Returns

[`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`constructor`](P5AsciifyRenderer.md#constructors)

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_asciicharacterframebuffer"></a> `_asciiCharacterFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_asciiCharacterFramebuffer`](P5AsciifyRenderer.md#_asciicharacterframebuffer) | [renderers/AsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L18) |
| <a id="_options"></a> `_options` | `protected` | `AsciiRendererOptions` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_options`](P5AsciifyRenderer.md#_options-1) | [renderers/AsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L26) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_outputFramebuffer`](P5AsciifyRenderer.md#_outputframebuffer) | [renderers/AsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L19) |
| <a id="_primarycolorsampleframebuffer"></a> `_primaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_primaryColorSampleFramebuffer`](P5AsciifyRenderer.md#_primarycolorsampleframebuffer) | [renderers/AsciiRenderer.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L16) |
| <a id="_secondarycolorsampleframebuffer"></a> `_secondaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_secondaryColorSampleFramebuffer`](P5AsciifyRenderer.md#_secondarycolorsampleframebuffer) | [renderers/AsciiRenderer.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L17) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_shader`](P5AsciifyRenderer.md#_shader) | [renderers/AsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L20) |
| <a id="asciicharactershader"></a> `asciiCharacterShader` | `private` | `Shader` | - | [renderers/edge/EdgeAsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L25) |
| <a id="characterset-1"></a> `characterSet` | `public` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterSet`](P5AsciifyRenderer.md#characterset-1) | [renderers/AsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L25) |
| <a id="colorsampleshader"></a> `colorSampleShader` | `private` | `Shader` | - | [renderers/edge/EdgeAsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L24) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`grid`](P5AsciifyRenderer.md#grid-1) | [renderers/AsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L24) |
| <a id="p"></a> `p` | `protected` | `__module` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`p`](P5AsciifyRenderer.md#p-1) | [renderers/AsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L23) |
| <a id="sampleframebuffer"></a> `sampleFramebuffer` | `private` | `Framebuffer` | - | [renderers/edge/EdgeAsciiRenderer.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L27) |
| <a id="sampleshader"></a> `sampleShader` | `private` | `Shader` | - | [renderers/edge/EdgeAsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L23) |
| <a id="sobelframebuffer"></a> `sobelFramebuffer` | `private` | `Framebuffer` | - | [renderers/edge/EdgeAsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L26) |
| <a id="sobelshader"></a> `sobelShader` | `private` | `Shader` | - | [renderers/edge/EdgeAsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L22) |

## Accessors

### asciiCharacterFramebuffer

#### Get Signature

> **get** **asciiCharacterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:147](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L147)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`asciiCharacterFramebuffer`](P5AsciifyRenderer.md#asciicharacterframebuffer)

***

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:144](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L144)

##### Returns

`T`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`options`](P5AsciifyRenderer.md#options)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:143](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L143)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`outputFramebuffer`](P5AsciifyRenderer.md#outputframebuffer)

***

### primaryColorSampleFramebuffer

#### Get Signature

> **get** **primaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:145](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L145)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`primaryColorSampleFramebuffer`](P5AsciifyRenderer.md#primarycolorsampleframebuffer)

***

### secondaryColorSampleFramebuffer

#### Get Signature

> **get** **secondaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:146](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L146)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`secondaryColorSampleFramebuffer`](P5AsciifyRenderer.md#secondarycolorsampleframebuffer)

## Methods

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L69)

Convert and render the input framebuffer to ASCII.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `inputFramebuffer` | `Framebuffer` | The input framebuffer to convert to ASCII. |
| `previousAsciiRenderer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The previous ASCII renderer in the pipeline. |

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`render`](P5AsciifyRenderer.md#render)

***

### resetShaders()

> **resetShaders**(): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:55](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L55)

Resets the shaders for the renderer.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L50)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### updateOptions()

> **updateOptions**(`newOptions`): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:59](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L59)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<`AsciiRendererOptions`\> | The new options to update. |

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`updateOptions`](P5AsciifyRenderer.md#updateoptions)
