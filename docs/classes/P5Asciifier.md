[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L29)

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

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_backgroundcolor"></a> `_backgroundColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | `"#000000"` | [Asciifier.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L49) |
| <a id="_font"></a> `_font` | `private` | `Font` | `undefined` | [Asciifier.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L46) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | `16` | [Asciifier.ts:52](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L52) |
| <a id="_p"></a> `_p` | `private` | `__module` | `undefined` | [Asciifier.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L43) |
| <a id="asciifonttextureatlas"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | `undefined` | [Asciifier.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L31) |
| <a id="grid"></a> `grid` | `public` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | `undefined` | [Asciifier.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L34) |
| <a id="renderermanager"></a> `rendererManager` | `public` | [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md) | `undefined` | [Asciifier.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L40) |
| <a id="sketchframebuffer"></a> `sketchFramebuffer` | `public` | `Framebuffer` | `undefined` | [Asciifier.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L37) |

## Methods

### addAsciiGradient()

> **addAsciiGradient**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `userParams`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [Asciifier.ts:133](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L133)

Adds a new gradient to the renderer managers gradient manager, which will be rendered by the `GradientAsciiRenderer`.

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

### asciify()

> **asciify**(): `void`

Defined in: [Asciifier.ts:117](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L117)

Renders the ASCII output to the canvas.

Is called automatically every time the user's `draw()` function has finished.

#### Returns

`void`

***

### background()

> **background**(`color`): `void`

Defined in: [Asciifier.ts:231](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L231)

Sets the background color for the ascii renderers. 

Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

If the color is not a string, array or p5.Color.

***

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:171](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L171)

Sets the font size for the ascii renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set. |

#### Returns

`void`

#### Throws

If the font size is out of bounds.

***

### instance()

> **instance**(`p`, `addDummyPreloadFunction`): `void`

Defined in: [Asciifier.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L73)

Used to pass the p5 instance to the `p5.asciify` library.

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

### loadFont()

> **loadFont**(`font`): `void`

Defined in: [Asciifier.ts:195](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L195)

Sets the font for the ascii renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `string` \| `Font` | The font to use. Can be a path, base64 string, or p5.Font object. |

#### Returns

`void`

#### Throws

If the font parameter is invalid or the font fails to load.

***

### removeAsciiGradient()

> **removeAsciiGradient**(`gradient`): `void`

Defined in: [Asciifier.ts:162](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L162)

Removes a gradient from the renderer managers gradient manager.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gradient` | [`P5AsciifyGradient`](P5AsciifyGradient.md) | The gradient to remove. |

#### Returns

`void`

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:87](https://github.com/humanbydefinition/p5-asciify/blob/514129d7cbe0dc5aad57c2fc13d745c7c4510db2/src/lib/Asciifier.ts#L87)

Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.

Is called automatically after the user's `setup()` function has finished.

#### Returns

`void`
