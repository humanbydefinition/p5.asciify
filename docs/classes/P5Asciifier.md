[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L25)

The main class for the `p5.asciify` library, 
responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.

## Remarks

The `P5Asciifier` class is initialized without any parameters.

Once the `p5.js` instance is available, the `instance()` method is called automatically in `GLOBAL` mode to pass the `p5` instance to the library.

In `INSTANCE` mode, the `instance()` method must be called manually to pass the `p5` instance to the library.

After the users `setup()` function has finished, the Asciifier's `setup()` method 
is called automatically to fully initialize the library.

At this point, the `p5.asciify` is fully functional and ready to interact with.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(`p`?, `sketchFramebuffer`?, `font`?): [`P5Asciifier`](P5Asciifier.md)

Defined in: [Asciifier.ts:61](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L61)

Creates a new instance of the `P5Asciifier` class.

By default, `p5.asciify` creates an initial instance without any parameters, 
since this instance is special, capturing whatever is being drawn to the p5.js canvas through hooks.

If the user wants to an instance of this class to apply to a given framebuffer,
all parameters must be provided to the constructor.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p`? | `__module` |  |
| `sketchFramebuffer`? | `Framebuffer` |  |
| `font`? | `Font` |  |

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_font"></a> `_font` | `private` | `Font` | `undefined` | The font to use for the ASCII rendering. | [Asciifier.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L44) |
| <a id="_fontmanager"></a> `_fontManager` | `private` | `P5AsciifyFontManager` | `undefined` | - | [Asciifier.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L29) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | `16` | The font size to use for the ASCII rendering. | [Asciifier.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L47) |
| <a id="_fonttextureatlas"></a> `_fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | `undefined` | Contains texture with all glyphs of a given font. | [Asciifier.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L27) |
| <a id="_grid"></a> `_grid` | `private` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | `undefined` | Contains the grid dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions. | [Asciifier.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L32) |
| <a id="_p"></a> `_p` | `private` | `__module` | `undefined` | The `p5.js` instance. | [Asciifier.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L41) |
| <a id="_renderermanager"></a> `_rendererManager` | `private` | [`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md) | `undefined` | Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. | [Asciifier.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L38) |
| <a id="_sketchframebuffer"></a> `_sketchFramebuffer` | `private` | `Framebuffer` | `undefined` | Wraps around the user's `draw()` function to capture it's output for the ascii renderers. | [Asciifier.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L35) |

## Accessors

### fontTextureAtlas

#### Get Signature

> **get** **fontTextureAtlas**(): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [Asciifier.ts:337](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L337)

##### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

***

### grid

#### Get Signature

> **get** **grid**(): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Asciifier.ts:336](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L336)

##### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

***

### sketchFramebuffer

#### Get Signature

> **get** **sketchFramebuffer**(): `Framebuffer`

Defined in: [Asciifier.ts:335](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L335)

##### Returns

`Framebuffer`

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [Asciifier.ts:343](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L343)

Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
Can also be used via the `texture()` method.

##### Returns

`Framebuffer`

## Methods

### \_generateAsciiLines()

> `private` **\_generateAsciiLines**(): `string`[]

Defined in: [Asciifier.ts:253](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L253)

Generates ASCII art representation as string array

#### Returns

`string`[]

Array of strings representing ASCII art lines

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available

***

### asciify()

> **asciify**(): `void`

Defined in: [Asciifier.ts:160](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L160)

Renders the ASCII output to the canvas.

Is called automatically every time the user's `draw()` function has finished.

#### Returns

`void`

***

### background()

> **background**(`color`): `void`

Defined in: [Asciifier.ts:243](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L243)

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

### fill()

> **fill**(`character`): `void`

Defined in: [Asciifier.ts:330](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L330)

Sets the p5.js fill color to the color of the given character in the font texture atlas.

This is useful when drawing to a renderers `characterFramebuffer`, which is used to generate the ASCII output.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | `string` | The character to get the color for. |

#### Returns

`void`

***

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:176](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L176)

Sets the font size for the ASCII renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font size is out of bounds.

***

### init()

> **init**(`p`, `addDummyPreloadFunction`, `fontBase64`): `void`

Defined in: [Asciifier.ts:117](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L117)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `p` | `__module` | `undefined` |
| `addDummyPreloadFunction` | `boolean` | `true` |
| `fontBase64` | `string` | `undefined` |

#### Returns

`void`

***

### instance()

> **instance**(`p`, `addDummyPreloadFunction`): `void`

Defined in: [Asciifier.ts:109](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L109)

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

> **loadFont**(`font`, `options`, `onSuccess`?): `void`

Defined in: [Asciifier.ts:208](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L208)

Sets the font for the ascii renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `string` \| `Font` | The font to use. Can be a path, base64 string, or p5.Font object. |
| `options` | \{ `updateCharacters`: `true`; \} | - |
| `options.updateCharacters` | `true` | - |
| `onSuccess`? | () => `void` | - |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font parameter is invalid or the font fails to load.

***

### renderers()

> **renderers**(): [`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md)

Defined in: [Asciifier.ts:199](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L199)

Returns the renderer manager, containing all ASCII renderers in the rendering loop.

#### Returns

[`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md)

The renderer manager.

***

### saveStrings()

> **saveStrings**(`filename`): `void`

Defined in: [Asciifier.ts:312](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L312)

Saves the ASCII output to a text file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filename` | `string` | The filename to save the text file as. If not provided, a default filename is generated. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available to save ASCII output.

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:127](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L127)

Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.

Is called automatically after the user's `setup()` function has finished.

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Defined in: [Asciifier.ts:303](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/Asciifier.ts#L303)

Returns the current ASCII output as a string

#### Returns

`string`

Multi-line string representation of the ASCII art

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available
