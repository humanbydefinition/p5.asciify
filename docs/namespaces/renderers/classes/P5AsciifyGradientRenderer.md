[**p5.asciify v0.7.1**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyGradientRenderer

# Class: P5AsciifyGradientRenderer

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L40)

An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Constructors

### new P5AsciifyGradientRenderer()

> **new P5AsciifyGradientRenderer**(`p5Instance`, `grid`, `fontTextureAtlas`, `options`): [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L51)

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

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/AsciiRenderer.ts:400](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L400)

Get the color palette object containing colors that correspond to the defined character set.

Not relevant for this base class, 
but used in derived classes for mapping brightness values to those colors for example, 
which are then translated to ASCII characters.

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorPalette`](P5AsciifyRenderer.md#charactercolorpalette)

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:413](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L413)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterFramebuffer`](P5AsciifyRenderer.md#characterframebuffer)

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:411](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L411)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`inversionFramebuffer`](P5AsciifyRenderer.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:408](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L408)

##### Returns

[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`options`](P5AsciifyRenderer.md#options)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:407](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L407)

Get the output framebuffer, where the final ASCII conversion is rendered.

Can also contain grid cells filled with ASCII characters by previous renderers.

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`outputFramebuffer`](P5AsciifyRenderer.md#outputframebuffer)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:409](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L409)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`primaryColorFramebuffer`](P5AsciifyRenderer.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:412](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L412)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`rotationFramebuffer`](P5AsciifyRenderer.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:410](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L410)

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`secondaryColorFramebuffer`](P5AsciifyRenderer.md#secondarycolorframebuffer)

## Methods

### add()

> **add**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `options`): [`P5AsciifyGradient`](../../gradients/classes/P5AsciifyGradient.md)

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:100](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L100)

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

Defined in: [renderers/AsciiRenderer.ts:297](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L297)

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

Defined in: [renderers/AsciiRenderer.ts:331](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L331)

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

Defined in: [renderers/AsciiRenderer.ts:285](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L285)

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

Defined in: [renderers/AsciiRenderer.ts:310](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L310)

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

Defined in: [renderers/AsciiRenderer.ts:229](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L229)

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

Defined in: [renderers/AsciiRenderer.ts:388](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L388)

Disable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`disable`](P5AsciifyRenderer.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:381](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L381)

Enable the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enable`](P5AsciifyRenderer.md#enable)

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:352](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L352)

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

Defined in: [renderers/AsciiRenderer.ts:247](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L247)

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

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:108](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L108)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `gradientInstance` | [`P5AsciifyGradient`](../../gradients/classes/P5AsciifyGradient.md) |

#### Returns

`void`

***

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:112](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L112)

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

Defined in: [renderers/AsciiRenderer.ts:151](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L151)

Resets the shaders for the renderer.

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/gradient/GradientAsciiRenderer.ts:93](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/gradient/GradientAsciiRenderer.ts#L93)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:264](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L264)

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

Defined in: [renderers/AsciiRenderer.ts:157](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L157)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`update`](P5AsciifyRenderer.md#update)
