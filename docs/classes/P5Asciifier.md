[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L29)

The main class for the p5.asciify library. 

Responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.

## Remarks

The P5Asciifier class is initialized without any parameters.

Once the p5.js instance is available, the `instance()` method is called automatically in `GLOBAL` mode to pass the p5 instance to the library.

In `INSTANCE` mode, the `instance()` method must be called manually to pass the p5 instance to the library.

After the users `setup()` function has finished, the Asciifier's `setup()` method 
is called automatically to fully initialize the library.

At this point, the `p5.asciify` is fully functional and ready to interact with.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_bordercolor"></a> `_borderColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | [Asciifier.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L49) |
| <a id="_font"></a> `_font` | `private` | `Font` | [Asciifier.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L46) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | [Asciifier.ts:52](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L52) |
| <a id="asciifonttextureatlas"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [Asciifier.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L31) |
| <a id="grid"></a> `grid` | `public` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [Asciifier.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L34) |
| <a id="p"></a> `p` | `private` | `__module` | [Asciifier.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L43) |
| <a id="renderermanager"></a> `rendererManager` | `public` | [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md) | [Asciifier.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L40) |
| <a id="sketchframebuffer"></a> `sketchFramebuffer` | `public` | `Framebuffer` | [Asciifier.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L37) |

## Accessors

### borderColor

#### Get Signature

> **get** **borderColor**(): `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

Defined in: [Asciifier.ts:211](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L211)

##### Returns

`string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

#### Set Signature

> **set** **borderColor**(`color`): `void`

Defined in: [Asciifier.ts:200](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L200)

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

Defined in: [Asciifier.ts:210](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L210)

##### Returns

`Font`

#### Set Signature

> **set** **font**(`font`): `void`

Defined in: [Asciifier.ts:166](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L166)

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

Defined in: [Asciifier.ts:209](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L209)

##### Returns

`number`

#### Set Signature

> **set** **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:143](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L143)

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

Defined in: [Asciifier.ts:114](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L114)

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

Defined in: [Asciifier.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L74)

Used to pass the p5 instance to the `p5.asciify` library. 
Is called automatically by `p5.js` during initialization.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `p` | `__module` | `undefined` | The p5 instance |
| `addDummyPreloadFunction` | `boolean` | `true` | Whether to add a dummy preload function to the p5 instance |

#### Returns

`void`

#### Remarks

This method is called automatically in `GLOBAL` mode. In `INSTANCE` mode, it must be called manually at the start of the sketch.

In `GLOBAL` mode, `addDummyPreloadFunction` is set to `false` to prevent the p5 instance from adding a dummy preload function,
which is already added to `window` by the library.

In `INSTANCE` mode, `addDummyPreloadFunction` is set to `true` to add a dummy preload function to the p5 instance directly.

A dummy `preload` function is necessary in case the user does not provide one, since `p5.asciify` relies on the benefits of the `preload` function.

The implementation and difference with dummy `preload` definitions for `GLOBAL` and `INSTANCE` modes is questionable, but I haven't found a better solution yet.

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/4f781d7ed529d2b1cbfa493a9ac838a4592cbc36/src/lib/Asciifier.ts#L86)

Sets up the P5Asciify library with the specified options

#### Returns

`void`
