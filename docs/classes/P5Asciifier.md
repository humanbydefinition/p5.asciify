[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L15)

The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_bordercolor"></a> `_borderColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | [Asciifier.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L16) |
| <a id="_font"></a> `_font` | `private` | `Font` | [Asciifier.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L19) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | [Asciifier.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L17) |
| <a id="asciifonttextureatlas"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [Asciifier.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L21) |
| <a id="grid"></a> `grid` | `public` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [Asciifier.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L22) |
| <a id="p"></a> `p` | `private` | `__module` | [Asciifier.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L20) |
| <a id="renderermanager"></a> `rendererManager` | `public` | [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md) | [Asciifier.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L18) |
| <a id="sketchframebuffer"></a> `sketchFramebuffer` | `public` | `Framebuffer` | [Asciifier.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L23) |

## Accessors

### borderColor

#### Get Signature

> **get** **borderColor**(): `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

Defined in: [Asciifier.ts:166](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L166)

##### Returns

`string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

#### Set Signature

> **set** **borderColor**(`color`): `void`

Defined in: [Asciifier.ts:155](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L155)

Sets the border color for the ascii renderers.

##### Throws

If the color is not a string, array or p5.Color.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. |

##### Returns

`void`

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [Asciifier.ts:165](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L165)

##### Returns

`Font`

#### Set Signature

> **set** **font**(`font`): `void`

Defined in: [Asciifier.ts:121](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L121)

Sets the font for the ascii renderers.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `string` \| `Font` | The font to set. |

##### Returns

`void`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [Asciifier.ts:164](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L164)

##### Returns

`number`

#### Set Signature

> **set** **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:98](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L98)

Sets the font size for the ascii renderers

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set |

##### Returns

`void`

## Methods

### addAsciiGradient()

> **addAsciiGradient**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `userParams`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [Asciifier.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L69)

Adds a new gradient to the renderer managers gradient manager, which will be rendered by the GradientAsciiRenderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradientName` | `GradientType` | The name of the gradient. |
| `brightnessStart` | `number` | The brightness value at which the gradient starts. |
| `brightnessEnd` | `number` | The brightness value at which the gradient ends. |
| `characters` | `string` | The characters to use for the gradient. |
| `userParams` | `Record`\<`string`, `any`\> | Optional parameters to pass to the gradient. |

#### Returns

[`P5AsciifyGradient`](P5AsciifyGradient.md)

***

### instance()

> **instance**(`p`, `addDummyPreloadFunction`): `void`

Defined in: [Asciifier.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L29)

Initialize the p5 instance for the Asciifier

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `p` | `__module` | `undefined` | The p5 instance |
| `addDummyPreloadFunction` | `boolean` | `true` | - |

#### Returns

`void`

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/5855dd1d0a98608471e1d6580f1b0121ba1b0942/src/lib/Asciifier.ts#L41)

Sets up the P5Asciify library with the specified options

#### Returns

`void`
