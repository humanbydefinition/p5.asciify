[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [renderers](../README.md) / P5AsciifyRenderer

# Class: P5AsciifyRenderer

Defined in: [renderers/AsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L24)

Class for shader-based ASCII Renderers.

## Extended by

- [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)
- [`P5AsciifyBrightnessRenderer`](P5AsciifyBrightnessRenderer.md)
- [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)
- [`P5AsciifyGradientRenderer`](P5AsciifyGradientRenderer.md)

## Constructors

### new P5AsciifyRenderer()

> **new P5AsciifyRenderer**(`p`, `grid`, `fontTextureAtlas`, `_options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/AsciiRenderer.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L34)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `p` | `__module` | `undefined` |
| `grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` |
| `_options` | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_asciicharacterframebuffer"></a> `_asciiCharacterFramebuffer` | `protected` | `Framebuffer` | `undefined` | [renderers/AsciiRenderer.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L29) |
| <a id="_inversionframebuffer"></a> `_inversionFramebuffer` | `protected` | `Framebuffer` | `undefined` | [renderers/AsciiRenderer.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L30) |
| <a id="_options-1"></a> `_options` | `protected` | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | `CUSTOM_DEFAULT_OPTIONS` | [renderers/AsciiRenderer.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L38) |
| <a id="_outputframebuffer"></a> `_outputFramebuffer` | `protected` | `Framebuffer` | `undefined` | [renderers/AsciiRenderer.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L31) |
| <a id="_primarycolorsampleframebuffer"></a> `_primaryColorSampleFramebuffer` | `protected` | `Framebuffer` | `undefined` | [renderers/AsciiRenderer.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L27) |
| <a id="_secondarycolorsampleframebuffer"></a> `_secondaryColorSampleFramebuffer` | `protected` | `Framebuffer` | `undefined` | [renderers/AsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L28) |
| <a id="_shader"></a> `_shader` | `protected` | `Shader` | `undefined` | [renderers/AsciiRenderer.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L32) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md) | `undefined` | [renderers/AsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L26) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `protected` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | [renderers/AsciiRenderer.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L37) |
| <a id="grid-1"></a> `grid` | `protected` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | [renderers/AsciiRenderer.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L36) |
| <a id="p-1"></a> `p` | `protected` | `__module` | `undefined` | [renderers/AsciiRenderer.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L35) |

## Accessors

### asciiCharacterFramebuffer

#### Get Signature

> **get** **asciiCharacterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:322](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L322)

##### Returns

`Framebuffer`

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:321](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L321)

##### Returns

`Framebuffer`

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:318](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L318)

##### Returns

[`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:317](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L317)

##### Returns

`Framebuffer`

***

### primaryColorSampleFramebuffer

#### Get Signature

> **get** **primaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:319](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L319)

##### Returns

`Framebuffer`

***

### secondaryColorSampleFramebuffer

#### Get Signature

> **get** **secondaryColorSampleFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:320](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L320)

##### Returns

`Framebuffer`

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:239](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L239)

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

Defined in: [renderers/AsciiRenderer.ts:273](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L273)

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

Defined in: [renderers/AsciiRenderer.ts:227](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L227)

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

Defined in: [renderers/AsciiRenderer.ts:252](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L252)

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

Defined in: [renderers/AsciiRenderer.ts:179](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L179)

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

Defined in: [renderers/AsciiRenderer.ts:312](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L312)

Disable the renderer.

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:305](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L305)

Enable the renderer.

#### Returns

`void`

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:294](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L294)

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

Defined in: [renderers/AsciiRenderer.ts:197](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L197)

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

Defined in: [renderers/AsciiRenderer.ts:151](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L151)

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

Defined in: [renderers/AsciiRenderer.ts:104](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L104)

Resets the shaders for the renderer.

#### Returns

`void`

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/AsciiRenderer.ts:94](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L94)

Resizes all framebuffers based on the grid dimensions.

#### Returns

`void`

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:214](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L214)

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

Defined in: [renderers/AsciiRenderer.ts:110](https://github.com/humanbydefinition/p5-asciify/blob/529a159e489b63e659b0059fde6d4e5ace5c2f9e/src/lib/renderers/AsciiRenderer.ts#L110)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<[`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`
