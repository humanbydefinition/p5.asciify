[**p5.asciify v0.7.1**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyRenderer

# Class: P5AsciifyRenderer

Defined in: [renderers/AsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L25)

Base ASCII renderer class for custom shader-based ASCII Renderers.

## Extended by

- [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)
- [`P5AsciifyBrightnessRenderer`](P5AsciifyBrightnessRenderer.md)
- [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)
- [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

## Constructors

### new P5AsciifyRenderer()

> **new P5AsciifyRenderer**(`_p`, `_grid`, `_fontTextureAtlas`, `_options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/AsciiRenderer.ts:65](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L65)

Creates a new ASCII renderer instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `_p` | `__module` | `undefined` | The p5 instance. |
| `_grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | Grid object containing the relevant grid information. |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | The font texture atlas containing the ASCII characters texture. |
| `_options` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` | The options for the ASCII renderer. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

#### Remarks

This constructor is meant for internal use by the `p5.asciify` library.

To create renderers, use `p5asciify.renderers().add()`.
This will also return an instance of the renderer, which can be used to modify the renderer's properties.
Additionally, the renderer will also be added to the end of the rendering pipeline automatically.

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

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:413](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L413)

##### Returns

`Framebuffer`

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:411](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L411)

##### Returns

`Framebuffer`

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:408](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L408)

##### Returns

[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:407](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L407)

Get the output framebuffer, where the final ASCII conversion is rendered.

Can also contain grid cells filled with ASCII characters by previous renderers.

##### Returns

`Framebuffer`

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:409](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L409)

##### Returns

`Framebuffer`

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:412](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L412)

##### Returns

`Framebuffer`

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:410](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L410)

##### Returns

`Framebuffer`

## Methods

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

***

### disable()

> **disable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:388](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L388)

Disable the renderer.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:381](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L381)

Enable the renderer.

#### Returns

`void`

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

***

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/AsciiRenderer.ts:198](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L198)

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

Defined in: [renderers/AsciiRenderer.ts:151](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L151)

Resets the shaders for the renderer.

#### Returns

`void`

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/AsciiRenderer.ts:140](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/renderers/AsciiRenderer.ts#L140)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

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
