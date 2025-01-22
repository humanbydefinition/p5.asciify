[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyAccurateRenderer

# Class: P5AsciifyAccurateRenderer

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L16)

An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Constructors

### new P5AsciifyAccurateRenderer()

> **new P5AsciifyAccurateRenderer**(`p5Instance`, `grid`, `fontTextureAtlas`, `options`): [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L24)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p5Instance` | `__module` |
| `grid` | [`P5AsciifyGrid`](P5AsciifyGrid.md) |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |
| `options` | `AsciiRendererOptions` |

#### Returns

[`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`constructor`](P5AsciifyRenderer.md#constructors)

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_asciicharacterframebuffer"></a> `_asciiCharacterFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_asciiCharacterFramebuffer`](P5AsciifyRenderer.md#_asciicharacterframebuffer) | [renderers/AsciiRenderer.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L21) |
| <a id="_inversionframebuffer"></a> `_inversionFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_inversionFramebuffer`](P5AsciifyRenderer.md#_inversionframebuffer) | [renderers/AsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L22) |
| <a id="_options"></a> `_options` | `protected` | `AsciiRendererOptions` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_options`](P5AsciifyRenderer.md#_options-1) | [renderers/AsciiRenderer.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L30) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_outputFramebuffer`](P5AsciifyRenderer.md#_outputframebuffer) | [renderers/AsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L23) |
| <a id="_primarycolorsampleframebuffer"></a> `_primaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_primaryColorSampleFramebuffer`](P5AsciifyRenderer.md#_primarycolorsampleframebuffer) | [renderers/AsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L19) |
| <a id="_secondarycolorsampleframebuffer"></a> `_secondaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_secondaryColorSampleFramebuffer`](P5AsciifyRenderer.md#_secondarycolorsampleframebuffer) | [renderers/AsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L20) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_shader`](P5AsciifyRenderer.md#_shader) | [renderers/AsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L24) |
| <a id="brightnesssampleframebuffer"></a> `brightnessSampleFramebuffer` | `private` | `Framebuffer` | - | [renderers/accurate/AccurateAsciiRenderer.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L21) |
| <a id="brightnesssampleshader"></a> `brightnessSampleShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L18) |
| <a id="brightnesssplitframebuffer"></a> `brightnessSplitFramebuffer` | `private` | `Framebuffer` | - | [renderers/accurate/AccurateAsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L22) |
| <a id="brightnesssplitshader"></a> `brightnessSplitShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L20) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorPalette`](P5AsciifyRenderer.md#charactercolorpalette) | [renderers/AsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L18) |
| <a id="characterselectionshader"></a> `characterSelectionShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L17) |
| <a id="colorsampleshader"></a> `colorSampleShader` | `private` | `Shader` | - | [renderers/accurate/AccurateAsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L19) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`fontTextureAtlas`](P5AsciifyRenderer.md#fonttextureatlas-1) | [renderers/AsciiRenderer.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L29) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`grid`](P5AsciifyRenderer.md#grid-1) | [renderers/AsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L28) |
| <a id="p"></a> `p` | `protected` | `__module` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`p`](P5AsciifyRenderer.md#p-1) | [renderers/AsciiRenderer.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L27) |

## Accessors

### asciiCharacterFramebuffer

#### Get Signature

> **get** **asciiCharacterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:316](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L316)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`asciiCharacterFramebuffer`](P5AsciifyRenderer.md#asciicharacterframebuffer)

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:315](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L315)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`inversionFramebuffer`](P5AsciifyRenderer.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): `AsciiRendererOptions`

Defined in: [renderers/AsciiRenderer.ts:312](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L312)

##### Returns

`AsciiRendererOptions`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`options`](P5AsciifyRenderer.md#options)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:311](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L311)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`outputFramebuffer`](P5AsciifyRenderer.md#outputframebuffer)

***

### primaryColorSampleFramebuffer

#### Get Signature

> **get** **primaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:313](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L313)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`primaryColorSampleFramebuffer`](P5AsciifyRenderer.md#primarycolorsampleframebuffer)

***

### secondaryColorSampleFramebuffer

#### Get Signature

> **get** **secondaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:314](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L314)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`secondaryColorSampleFramebuffer`](P5AsciifyRenderer.md#secondarycolorsampleframebuffer)

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:233](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L233)

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

Defined in: [renderers/AsciiRenderer.ts:267](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L267)

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

Defined in: [renderers/AsciiRenderer.ts:221](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L221)

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

Defined in: [renderers/AsciiRenderer.ts:246](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L246)

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

Defined in: [renderers/AsciiRenderer.ts:173](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L173)

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

Defined in: [renderers/AsciiRenderer.ts:306](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L306)

Disable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`disable`](P5AsciifyRenderer.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:299](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L299)

Enable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enable`](P5AsciifyRenderer.md#enable)

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:288](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L288)

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

Defined in: [renderers/AsciiRenderer.ts:191](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L191)

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

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:56](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L56)

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

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L50)

Resets the shaders for the renderer.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L45)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:208](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L208)

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

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:104](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/AsciiRenderer.ts#L104)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<`AsciiRendererUserOptions`\> | The new options to update. |

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`update`](P5AsciifyRenderer.md#update)
