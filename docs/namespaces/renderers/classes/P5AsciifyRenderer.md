[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [renderers](../README.md) / P5AsciifyRenderer

# Class: P5AsciifyRenderer

Defined in: [renderers/AsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L25)

Class for shader-based ASCII Renderers.

## Extended by

- [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)
- [`P5AsciifyBrightnessRenderer`](P5AsciifyBrightnessRenderer.md)
- [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)
- [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

## Constructors

### new P5AsciifyRenderer()

> **new P5AsciifyRenderer**(`_p`, `_grid`, `_fontTextureAtlas`, `_options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/AsciiRenderer.ts:48](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L48)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `_p` | `__module` | `undefined` |
| `_grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` |
| `_options` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_charactercolorpalette"></a> `_characterColorPalette` | `protected` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | `undefined` | The color palette containing colors that correspond to the defined character set. | [renderers/AsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L28) |
| <a id="_characterframebuffer"></a> `_characterFramebuffer` | `protected` | `Framebuffer` | `undefined` | The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. | [renderers/AsciiRenderer.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L37) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | - | [renderers/AsciiRenderer.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L51) |
| <a id="_grid-1"></a> `_grid` | `protected` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | - | [renderers/AsciiRenderer.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L50) |
| <a id="_inversionframebuffer"></a> `_inversionFramebuffer` | `protected` | `Framebuffer` | `undefined` | The inversion framebuffer, whose pixels define whether to swap the character and background colors. | [renderers/AsciiRenderer.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L40) |
| <a id="_options-1"></a> `_options` | `protected` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` | - | [renderers/AsciiRenderer.ts:52](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L52) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | `undefined` | The output framebuffer, where the final ASCII conversion is rendered. | [renderers/AsciiRenderer.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L43) |
| <a id="_p-1"></a> `_p` | `protected` | `__module` | `undefined` | - | [renderers/AsciiRenderer.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L49) |
| <a id="_primarycolorframebuffer"></a> `_primaryColorFramebuffer` | `protected` | `Framebuffer` | `undefined` | The primary color framebuffer, whose pixels define the character colors of the grid cells. | [renderers/AsciiRenderer.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L31) |
| <a id="_secondarycolorframebuffer"></a> `_secondaryColorFramebuffer` | `protected` | `Framebuffer` | `undefined` | The secondary color framebuffer, whose pixels define the background colors of the grid cells. | [renderers/AsciiRenderer.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L34) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | `undefined` | The shader used for the ASCII conversion. | [renderers/AsciiRenderer.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L46) |

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/AsciiRenderer.ts:331](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L331)

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:337](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L337)

##### Returns

`Framebuffer`

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:336](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L336)

##### Returns

`Framebuffer`

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:333](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L333)

##### Returns

[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:332](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L332)

##### Returns

`Framebuffer`

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:334](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L334)

##### Returns

`Framebuffer`

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:335](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L335)

##### Returns

`Framebuffer`

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:253](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L253)

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

Defined in: [renderers/AsciiRenderer.ts:287](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L287)

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

Defined in: [renderers/AsciiRenderer.ts:241](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L241)

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

Defined in: [renderers/AsciiRenderer.ts:266](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L266)

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

Defined in: [renderers/AsciiRenderer.ts:193](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L193)

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

Defined in: [renderers/AsciiRenderer.ts:326](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L326)

Disable the renderer.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:319](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L319)

Enable the renderer.

#### Returns

`void`

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:308](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L308)

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

Defined in: [renderers/AsciiRenderer.ts:211](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L211)

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

Defined in: [renderers/AsciiRenderer.ts:165](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L165)

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

Defined in: [renderers/AsciiRenderer.ts:118](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L118)

Resets the shaders for the renderer.

#### Returns

`void`

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/AsciiRenderer.ts:108](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L108)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:228](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L228)

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

Defined in: [renderers/AsciiRenderer.ts:124](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/renderers/AsciiRenderer.ts#L124)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`
