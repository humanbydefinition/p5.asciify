[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L29)

The main class for the `p5.asciify` library. 

Responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.

## Remarks

The `P5Asciifier` class is initialized without any parameters.

Once the `p5.js` instance is available, the `instance()` method is called automatically in `GLOBAL` mode to pass the `p5` instance to the library.

In `INSTANCE` mode, the `instance()` method must be called manually to pass the `p5` instance to the library.

After the users `setup()` function has finished, the Asciifier's `setup()` method 
is called automatically to fully initialize the library.

At this point, the `p5.asciify` is fully functional and ready to interact with.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_backgroundcolor"></a> `_backgroundColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | `"#000000"` | The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. | [Asciifier.ts:63](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L63) |
| <a id="_font"></a> `_font` | `private` | `Font` | `undefined` | The font to use for the ASCII rendering. | [Asciifier.ts:58](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L58) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | `16` | The font size to use for the ASCII rendering. | [Asciifier.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L68) |
| <a id="_p"></a> `_p` | `private` | `__module` | `undefined` | The p5 instance. | [Asciifier.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L53) |
| <a id="asciifonttextureatlas"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | `undefined` | Contains texture with all glyphs of a given font. | [Asciifier.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L33) |
| <a id="grid"></a> `grid` | `public` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | `undefined` | Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font size. | [Asciifier.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L38) |
| <a id="renderermanager"></a> `rendererManager` | `public` | [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md) | `undefined` | Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. | [Asciifier.ts:48](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L48) |
| <a id="sketchframebuffer"></a> `sketchFramebuffer` | `public` | `Framebuffer` | `undefined` | Wraps around the user's `draw()` function to capture it's output for the ascii renderers. | [Asciifier.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L43) |

## Methods

### addAsciiGradient()

> **addAsciiGradient**(`gradientName`, `brightnessStart`, `brightnessEnd`, `characters`, `userParams`): [`P5AsciifyGradient`](P5AsciifyGradient.md)

Defined in: [Asciifier.ts:149](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L149)

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

Defined in: [Asciifier.ts:133](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L133)

Renders the ASCII output to the canvas.

Is called automatically every time the user's `draw()` function has finished.

#### Returns

`void`

***

### background()

> **background**(`color`): `void`

Defined in: [Asciifier.ts:247](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L247)

Sets the background color for the ascii renderers. 

Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the color is not a string, array or p5.Color.

***

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:187](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L187)

Sets the font size for the ascii renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font size is out of bounds.

***

### instance()

> **instance**(`p`, `addDummyPreloadFunction`): `void`

Defined in: [Asciifier.ts:89](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L89)

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

Defined in: [Asciifier.ts:211](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L211)

Sets the font for the ascii renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `string` \| `Font` | The font to use. Can be a path, base64 string, or p5.Font object. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font parameter is invalid or the font fails to load.

***

### removeAsciiGradient()

> **removeAsciiGradient**(`gradient`): `void`

Defined in: [Asciifier.ts:178](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L178)

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

Defined in: [Asciifier.ts:103](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/Asciifier.ts#L103)

Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.

Is called automatically after the user's `setup()` function has finished.

#### Returns

`void`
