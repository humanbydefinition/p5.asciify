[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyGradientRenderer

# Class: P5AsciifyGradientRenderer

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:39](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L39)

An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Constructors

### new P5AsciifyGradientRenderer()

> **new P5AsciifyGradientRenderer**(`p5Instance`, `grid`, `fontTextureAtlas`, `options`): [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L49)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `p5Instance` | `__module` | `undefined` |
| `grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` |
| `options` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | `GRADIENT_DEFAULT_OPTIONS` |

#### Returns

[`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`constructor`](P5AsciifyRenderer.md#constructors)

## Properties

| Property | Modifier | Type | Default value | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_charactercolorpalette"></a> `_characterColorPalette` | `protected` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | `undefined` | The color palette containing colors that correspond to the defined character set. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_characterColorPalette`](P5AsciifyRenderer.md#_charactercolorpalette) | [renderers/AsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L28) |
| <a id="_characterframebuffer"></a> `_characterFramebuffer` | `protected` | `Framebuffer` | `undefined` | The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_characterFramebuffer`](P5AsciifyRenderer.md#_characterframebuffer) | [renderers/AsciiRenderer.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L37) |
| <a id="_fonttextureatlas"></a> `_fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | The font texture atlas containing the ASCII characters texture. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_fontTextureAtlas`](P5AsciifyRenderer.md#_fonttextureatlas-1) | [renderers/AsciiRenderer.ts:56](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L56) |
| <a id="_grid"></a> `_grid` | `protected` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | The grid to render the ASCII characters on. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_grid`](P5AsciifyRenderer.md#_grid-1) | [renderers/AsciiRenderer.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L53) |
| <a id="_inversionframebuffer"></a> `_inversionFramebuffer` | `protected` | `Framebuffer` | `undefined` | The inversion framebuffer, whose pixels define whether to swap the character and background colors. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_inversionFramebuffer`](P5AsciifyRenderer.md#_inversionframebuffer) | [renderers/AsciiRenderer.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L40) |
| <a id="_options"></a> `_options` | `protected` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` | The options for the ASCII renderer. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_options`](P5AsciifyRenderer.md#_options-1) | [renderers/AsciiRenderer.ts:59](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L59) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | `undefined` | The output framebuffer, where the final ASCII conversion is rendered. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_outputFramebuffer`](P5AsciifyRenderer.md#_outputframebuffer) | [renderers/AsciiRenderer.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L43) |
| <a id="_p"></a> `_p` | `protected` | `__module` | `undefined` | The p5 instance. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_p`](P5AsciifyRenderer.md#_p-1) | [renderers/AsciiRenderer.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L50) |
| <a id="_primarycolorframebuffer"></a> `_primaryColorFramebuffer` | `protected` | `Framebuffer` | `undefined` | The primary color framebuffer, whose pixels define the character colors of the grid cells. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_primaryColorFramebuffer`](P5AsciifyRenderer.md#_primarycolorframebuffer) | [renderers/AsciiRenderer.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L31) |
| <a id="_secondarycolorframebuffer"></a> `_secondaryColorFramebuffer` | `protected` | `Framebuffer` | `undefined` | The secondary color framebuffer, whose pixels define the background colors of the grid cells. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_secondaryColorFramebuffer`](P5AsciifyRenderer.md#_secondarycolorframebuffer) | [renderers/AsciiRenderer.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L34) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | `undefined` | The shader used for the ASCII conversion. | [`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`_shader`](P5AsciifyRenderer.md#_shader) | [renderers/AsciiRenderer.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L46) |
| <a id="asciicharactershader"></a> `asciiCharacterShader` | `private` | `Shader` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L44) |
| <a id="colorsampleshader"></a> `colorSampleShader` | `private` | `Shader` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L41) |
| <a id="gradientmanager"></a> `gradientManager` | `private` | [`P5AsciifyGradientManager`](../../gradients/classes/P5AsciifyGradientManager.md) | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L47) |
| <a id="grayscaleframebuffer"></a> `grayscaleFramebuffer` | `private` | `Framebuffer` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:42](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L42) |
| <a id="grayscaleshader"></a> `grayscaleShader` | `private` | `Shader` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L40) |
| <a id="inversionshader"></a> `inversionShader` | `private` | `Shader` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L43) |
| <a id="nextasciigradientframebuffer"></a> `nextAsciiGradientFramebuffer` | `private` | `Framebuffer` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L46) |
| <a id="prevasciigradientframebuffer"></a> `prevAsciiGradientFramebuffer` | `private` | `Framebuffer` | `undefined` | - | - | [renderers/gradient/GradientAsciiRenderer.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L45) |

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/AsciiRenderer.ts:337](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L337)

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorPalette`](P5AsciifyRenderer.md#charactercolorpalette)

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:343](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L343)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterFramebuffer`](P5AsciifyRenderer.md#characterframebuffer)

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:342](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L342)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`inversionFramebuffer`](P5AsciifyRenderer.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:339](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L339)

##### Returns

[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`options`](P5AsciifyRenderer.md#options)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:338](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L338)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`outputFramebuffer`](P5AsciifyRenderer.md#outputframebuffer)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:340](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L340)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`primaryColorFramebuffer`](P5AsciifyRenderer.md#primarycolorframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:341](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L341)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`secondaryColorFramebuffer`](P5AsciifyRenderer.md#secondarycolorframebuffer)

## Methods

### add()

> **add**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `options`): [`P5AsciifyGradient`](../../gradients/classes/P5AsciifyGradient.md)

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:97](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L97)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `gradientName` | [`GradientType`](../../gradients/type-aliases/GradientType.md) |
| `brightnessStart` | `number` |
| `brightnessEnd` | `number` |
| `characters` | `string` |
| `options` | `any` |

#### Returns

[`P5AsciifyGradient`](../../gradients/classes/P5AsciifyGradient.md)

***

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:259](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L259)

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

Defined in: [renderers/AsciiRenderer.ts:293](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L293)

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

Defined in: [renderers/AsciiRenderer.ts:247](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L247)

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

Defined in: [renderers/AsciiRenderer.ts:272](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L272)

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

Defined in: [renderers/AsciiRenderer.ts:199](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L199)

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

Defined in: [renderers/AsciiRenderer.ts:332](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L332)

Disable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`disable`](P5AsciifyRenderer.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:325](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L325)

Enable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enable`](P5AsciifyRenderer.md#enable)

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:314](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L314)

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

Defined in: [renderers/AsciiRenderer.ts:217](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L217)

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

### remove()

> **remove**(`gradientInstance`): `void`

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:105](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L105)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `gradientInstance` | [`P5AsciifyGradient`](../../gradients/classes/P5AsciifyGradient.md) |

#### Returns

`void`

***

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:109](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L109)

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

Defined in: [renderers/AsciiRenderer.ts:124](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L124)

Resets the shaders for the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:90](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L90)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:234](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L234)

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

Defined in: [renderers/AsciiRenderer.ts:130](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/AsciiRenderer.ts#L130)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`update`](P5AsciifyRenderer.md#update)
