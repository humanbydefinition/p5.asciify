[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyRenderer

# Class: P5AsciifyRenderer

Defined in: [renderers/AsciiRenderer.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L16)

Abstract class for shader-based ASCII Renderers.

## Extended by

- [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)
- [`P5AsciifyBrightnessRenderer`](P5AsciifyBrightnessRenderer.md)
- [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)
- [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

## Constructors

### new P5AsciifyRenderer()

> **new P5AsciifyRenderer**(`p`, `grid`, `fontTextureAtlas`, `_options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/AsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `grid` | [`P5AsciifyGrid`](P5AsciifyGrid.md) |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |
| `_options` | `AsciiRendererOptions` |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_asciicharacterframebuffer"></a> `_asciiCharacterFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L21) |
| <a id="_inversionframebuffer"></a> `_inversionFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L22) |
| <a id="_options-1"></a> `_options` | `protected` | `AsciiRendererOptions` | [renderers/AsciiRenderer.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L30) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L23) |
| <a id="_primarycolorsampleframebuffer"></a> `_primaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L19) |
| <a id="_secondarycolorsampleframebuffer"></a> `_secondaryColorSampleFramebuffer` | `protected` | `Framebuffer` | [renderers/AsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L20) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | [renderers/AsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L24) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | [renderers/AsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L18) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [renderers/AsciiRenderer.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L29) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [renderers/AsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L28) |
| <a id="p-1"></a> `p` | `protected` | `__module` | [renderers/AsciiRenderer.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L27) |

## Accessors

### asciiCharacterFramebuffer

#### Get Signature

> **get** **asciiCharacterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:316](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L316)

##### Returns

`Framebuffer`

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:315](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L315)

##### Returns

`Framebuffer`

***

### options

#### Get Signature

> **get** **options**(): `AsciiRendererOptions`

Defined in: [renderers/AsciiRenderer.ts:312](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L312)

##### Returns

`AsciiRendererOptions`

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:311](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L311)

##### Returns

`Framebuffer`

***

### primaryColorSampleFramebuffer

#### Get Signature

> **get** **primaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:313](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L313)

##### Returns

`Framebuffer`

***

### secondaryColorSampleFramebuffer

#### Get Signature

> **get** **secondaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:314](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L314)

##### Returns

`Framebuffer`

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:233](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L233)

Set the background color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

***

### backgroundColorMode()

> **backgroundColorMode**(`mode`): `void`

Defined in: [renderers/AsciiRenderer.ts:267](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L267)

Sets the color mode for the grid cell background.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

***

### characterColor()

> **characterColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:221](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L221)

Set the color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Throws

If color is not a p5.Color object.

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [renderers/AsciiRenderer.ts:246](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L246)

Sets the color mode for ASCII characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

***

### characters()

> **characters**(`characters`): `void`

Defined in: [renderers/AsciiRenderer.ts:173](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L173)

Set the characters for the character set.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characters` | `string` | `""` | The characters to set for the character set. |

#### Returns

`void`

#### Throws

If characters is not a string.

***

### disable()

> **disable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:306](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L306)

Disable the renderer.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:299](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L299)

Enable the renderer.

#### Returns

`void`

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:288](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L288)

Enable or disable the renderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled` | `boolean` | Whether to enable or disable the renderer. |

#### Returns

`void`

#### Throws

If enabled is not a boolean.

***

### invert()

> **invert**(`invert`): `void`

Defined in: [renderers/AsciiRenderer.ts:191](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L191)

Invert the colors of the ASCII character and cell background colors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `invert` | `boolean` | Whether to swap the colors. |

#### Returns

`void`

#### Throws

If invert is not a boolean.

***

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/AsciiRenderer.ts:145](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L145)

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

Defined in: [renderers/AsciiRenderer.ts:98](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L98)

Resets the shaders for the renderer.

#### Returns

`void`

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/AsciiRenderer.ts:88](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L88)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:208](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L208)

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

***

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:104](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/AsciiRenderer.ts#L104)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<`AsciiRendererUserOptions`\> | The new options to update. |

#### Returns

`void`
