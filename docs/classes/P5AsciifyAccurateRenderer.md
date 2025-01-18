[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyAccurateRenderer

# Class: P5AsciifyAccurateRenderer

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L16)

An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Constructors

### new P5AsciifyAccurateRenderer()

> **new P5AsciifyAccurateRenderer**(`p5Instance`, `grid`, `characterSet`, `options`): [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L24)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p5Instance` | `__module` |
| `grid` | [`P5AsciifyGrid`](P5AsciifyGrid.md) |
| `characterSet` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) |
| `options` | `AsciiRendererOptions` |

#### Returns

[`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)

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
| <a id="brightnesssampleframebuffer"></a> `brightnessSampleFramebuffer` | `private` | `Framebuffer` | - | [renderers/accurate/AccurateAsciiRenderer.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L21) |
| <a id="brightnesssampleshader"></a> `brightnessSampleShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L18) |
| <a id="brightnesssplitframebuffer"></a> `brightnessSplitFramebuffer` | `private` | `Framebuffer` | - | [renderers/accurate/AccurateAsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L22) |
| <a id="brightnesssplitshader"></a> `brightnessSplitShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L20) |
| <a id="characterselectionshader"></a> `characterSelectionShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L17) |
| <a id="characterset-1"></a> `characterSet` | `public` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterSet`](P5AsciifyRenderer.md#characterset-1) | [renderers/AsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L25) |
| <a id="colorsampleshader"></a> `colorSampleShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L19) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`grid`](P5AsciifyRenderer.md#grid-1) | [renderers/AsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L24) |
| <a id="p"></a> `p` | `protected` | `__module` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`p`](P5AsciifyRenderer.md#p-1) | [renderers/AsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L23) |

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

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:56](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L56)

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

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L50)

Resets the shaders for the renderer.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L45)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### updateOptions()

> **updateOptions**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:88](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/renderers/AsciiRenderer.ts#L88)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<`AsciiRendererOptions`\> | The new options to update. |

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`updateOptions`](P5AsciifyRenderer.md#updateoptions)
