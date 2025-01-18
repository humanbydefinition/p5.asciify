[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L23)

The main class for the p5.asciify library. 
This class is responsible for setting up the library, and managing its properties.

## Remarks

The P5Asciifier class is initialized without any parameters.
Once the p5.js instance is available, the instance() method is called automatically to pass the p5 instance to the Asciifier.
After the users `setup()` function has finished, the Asciifier's `setup()` method is called automatically to fully initialize the library.
At this point, the p5.asciify is fully functional and ready to interact with.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_bordercolor"></a> `_borderColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | [Asciifier.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L24) |
| <a id="_font"></a> `_font` | `private` | `Font` | [Asciifier.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L27) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | [Asciifier.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L25) |
| <a id="asciifonttextureatlas"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [Asciifier.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L29) |
| <a id="grid"></a> `grid` | `public` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [Asciifier.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L30) |
| <a id="p"></a> `p` | `private` | `__module` | [Asciifier.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L28) |
| <a id="renderermanager"></a> `rendererManager` | `public` | [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md) | [Asciifier.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L26) |
| <a id="sketchframebuffer"></a> `sketchFramebuffer` | `public` | `Framebuffer` | [Asciifier.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L31) |

## Accessors

### borderColor

#### Get Signature

> **get** **borderColor**(): `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

Defined in: [Asciifier.ts:174](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L174)

##### Returns

`string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

#### Set Signature

> **set** **borderColor**(`color`): `void`

Defined in: [Asciifier.ts:163](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L163)

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

Defined in: [Asciifier.ts:173](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L173)

##### Returns

`Font`

#### Set Signature

> **set** **font**(`font`): `void`

Defined in: [Asciifier.ts:129](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L129)

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

Defined in: [Asciifier.ts:172](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L172)

##### Returns

`number`

#### Set Signature

> **set** **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:106](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L106)

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

Defined in: [Asciifier.ts:77](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L77)

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

Defined in: [Asciifier.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L37)

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

Defined in: [Asciifier.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/97a886fbd6773eeef25eaef50ed7335671b5702c/src/lib/Asciifier.ts#L49)

Sets up the P5Asciify library with the specified options

#### Returns

`void`
