[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [renderers](../README.md) / P5AsciifyEdgeRenderer

# Class: P5AsciifyEdgeRenderer

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L44)

An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Constructors

### new P5AsciifyEdgeRenderer()

> **new P5AsciifyEdgeRenderer**(`p5Instance`, `grid`, `fontTextureAtlas`, `options`): [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L53)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `p5Instance` | `__module` | `undefined` |
| `grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` |
| `options` | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | `EDGE_DEFAULT_OPTIONS` |

#### Returns

[`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`constructor`](P5AsciifyRenderer.md#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_asciicharacterframebuffer"></a> `_asciiCharacterFramebuffer` | `protected` | `Framebuffer` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_asciiCharacterFramebuffer`](P5AsciifyRenderer.md#_asciicharacterframebuffer) | [renderers/AsciiRenderer.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L29) |
| <a id="_inversionframebuffer"></a> `_inversionFramebuffer` | `protected` | `Framebuffer` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_inversionFramebuffer`](P5AsciifyRenderer.md#_inversionframebuffer) | [renderers/AsciiRenderer.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L30) |
| <a id="_options"></a> `_options` | `protected` | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_options`](P5AsciifyRenderer.md#_options-1) | [renderers/AsciiRenderer.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L38) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_outputFramebuffer`](P5AsciifyRenderer.md#_outputframebuffer) | [renderers/AsciiRenderer.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L31) |
| <a id="_primarycolorsampleframebuffer"></a> `_primaryColorSampleFramebuffer` | `protected` | `Framebuffer` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_primaryColorSampleFramebuffer`](P5AsciifyRenderer.md#_primarycolorsampleframebuffer) | [renderers/AsciiRenderer.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L27) |
| <a id="_secondarycolorsampleframebuffer"></a> `_secondaryColorSampleFramebuffer` | `protected` | `Framebuffer` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_secondaryColorSampleFramebuffer`](P5AsciifyRenderer.md#_secondarycolorsampleframebuffer) | [renderers/AsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L28) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_shader`](P5AsciifyRenderer.md#_shader) | [renderers/AsciiRenderer.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L32) |
| <a id="asciicharactershader"></a> `asciiCharacterShader` | `private` | `Shader` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L49) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorPalette`](P5AsciifyRenderer.md#charactercolorpalette) | [renderers/AsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L26) |
| <a id="colorsampleshader"></a> `colorSampleShader` | `private` | `Shader` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L47) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`fontTextureAtlas`](P5AsciifyRenderer.md#fonttextureatlas-1) | [renderers/AsciiRenderer.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L37) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`grid`](P5AsciifyRenderer.md#grid-1) | [renderers/AsciiRenderer.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L36) |
| <a id="inversionshader"></a> `inversionShader` | `private` | `Shader` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:48](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L48) |
| <a id="p"></a> `p` | `protected` | `__module` | `undefined` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`p`](P5AsciifyRenderer.md#p-1) | [renderers/AsciiRenderer.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L35) |
| <a id="sampleframebuffer"></a> `sampleFramebuffer` | `private` | `Framebuffer` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L51) |
| <a id="sampleshader"></a> `sampleShader` | `private` | `Shader` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L46) |
| <a id="sobelframebuffer"></a> `sobelFramebuffer` | `private` | `Framebuffer` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L50) |
| <a id="sobelshader"></a> `sobelShader` | `private` | `Shader` | `undefined` | - | [renderers/edge/EdgeAsciiRenderer.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L45) |

## Accessors

### asciiCharacterFramebuffer

#### Get Signature

> **get** **asciiCharacterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:324](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L324)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`asciiCharacterFramebuffer`](P5AsciifyRenderer.md#asciicharacterframebuffer)

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:323](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L323)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`inversionFramebuffer`](P5AsciifyRenderer.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:320](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L320)

##### Returns

[`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`options`](P5AsciifyRenderer.md#options)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:319](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L319)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`outputFramebuffer`](P5AsciifyRenderer.md#outputframebuffer)

***

### primaryColorSampleFramebuffer

#### Get Signature

> **get** **primaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:321](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L321)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`primaryColorSampleFramebuffer`](P5AsciifyRenderer.md#primarycolorsampleframebuffer)

***

### secondaryColorSampleFramebuffer

#### Get Signature

> **get** **secondaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:322](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L322)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`secondaryColorSampleFramebuffer`](P5AsciifyRenderer.md#secondarycolorsampleframebuffer)

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:241](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L241)

Set the background color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`backgroundColor`](P5AsciifyRenderer.md#backgroundcolor)

***

### backgroundColorMode()

> **backgroundColorMode**(`mode`): `void`

Defined in: [renderers/AsciiRenderer.ts:275](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L275)

Sets the color mode for the grid cell background.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`backgroundColorMode`](P5AsciifyRenderer.md#backgroundcolormode)

***

### characterColor()

> **characterColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:229](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L229)

Set the color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Throws

If color is not a p5.Color object.

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColor`](P5AsciifyRenderer.md#charactercolor)

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [renderers/AsciiRenderer.ts:254](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L254)

Sets the color mode for ASCII characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorMode`](P5AsciifyRenderer.md#charactercolormode)

***

### characters()

> **characters**(`characters`): `void`

Defined in: [renderers/AsciiRenderer.ts:181](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L181)

Set the characters for the character set.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characters` | `string` | `""` | The characters to set for the character set. |

#### Returns

`void`

#### Throws

If characters is not a string.

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characters`](P5AsciifyRenderer.md#characters)

***

### disable()

> **disable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:314](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L314)

Disable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`disable`](P5AsciifyRenderer.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:307](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L307)

Enable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enable`](P5AsciifyRenderer.md#enable)

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:296](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L296)

Enable or disable the renderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled` | `boolean` | Whether to enable or disable the renderer. |

#### Returns

`void`

#### Throws

If enabled is not a boolean.

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enabled`](P5AsciifyRenderer.md#enabled)

***

### invert()

> **invert**(`invert`): `void`

Defined in: [renderers/AsciiRenderer.ts:199](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L199)

Invert the colors of the ASCII character and cell background colors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `invert` | `boolean` | Whether to swap the colors. |

#### Returns

`void`

#### Throws

If invert is not a boolean.

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`invert`](P5AsciifyRenderer.md#invert)

***

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:130](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L130)

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

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:80](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L80)

Resets the shaders for the renderer.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:75](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L75)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:216](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/AsciiRenderer.ts#L216)

Define the rotation angle of all characters in the grid in degrees.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `angle` | `number` | The rotation angle in degrees. |

#### Returns

`void`

#### Remarks

Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.

#### Throws

If angle is not a number.

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`rotation`](P5AsciifyRenderer.md#rotation)

***

### sampleThreshold()

> **sampleThreshold**(`value`): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:106](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L106)

Set the sample threshold value for the edge detection algorithm.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The sample threshold value for the edge detection algorithm. |

#### Returns

`void`

#### Throws

If the value is not a valid number greater than or equal to 0.

***

### sobelThreshold()

> **sobelThreshold**(`value`): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:89](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L89)

Set the threshold value for the Sobel edge detection algorithm.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The threshold value for the Sobel edge detection algorithm. |

#### Returns

`void`

#### Throws

If the value is not a valid number between 0 and 1.

***

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:118](https://github.com/humanbydefinition/p5-asciify/blob/a7f21099f1ebfb0144144b513e73b3d6ec4d2c09/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L118)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<[`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`update`](P5AsciifyRenderer.md#update)
