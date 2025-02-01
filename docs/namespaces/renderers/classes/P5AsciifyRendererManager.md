[**p5.asciify v0.7.1**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L29)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`_p`, `_grid`, `_fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L45)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | The grid instance. |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. |

#### Returns

[`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_backgroundcolor"></a> `_backgroundColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | `"#000000"` | The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. | [renderers/RendererManager.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L41) |
| <a id="_currentcanvasdimensions"></a> `_currentCanvasDimensions` | `private` | `object` | `undefined` | The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L32) |
| `_currentCanvasDimensions.height` | `public` | `number` | `undefined` | - | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L32) |
| `_currentCanvasDimensions.width` | `public` | `number` | `undefined` | - | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L32) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | The font texture atlas instance. | [renderers/RendererManager.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L53) |
| <a id="_grid-1"></a> `_grid` | `private` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | The grid instance. | [renderers/RendererManager.ts:50](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L50) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | `undefined` | The p5 instance. | [renderers/RendererManager.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L47) |
| <a id="_renderers"></a> `_renderers` | `private` | `object`[] | `undefined` | The list of available renderers. | [renderers/RendererManager.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L35) |
| <a id="_resultframebuffer"></a> `_resultFramebuffer` | `private` | `Framebuffer` | `undefined` | - | [renderers/RendererManager.ts:43](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L43) |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | `undefined` | The last renderer used in the rendering loop. | [renderers/RendererManager.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L38) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:274](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L274)

##### Returns

`object`[]

***

### resultFramebuffer

#### Get Signature

> **get** **resultFramebuffer**(): `Framebuffer`

Defined in: [renderers/RendererManager.ts:275](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L275)

##### Returns

`Framebuffer`

## Methods

### \_getRendererIndex()

> `private` **\_getRendererIndex**(`renderer`): `number`

Defined in: [renderers/RendererManager.ts:266](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L266)

Gets the index of a renderer in the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The renderer to get the index of. |

#### Returns

`number`

The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.

***

### add()

> **add**(`name`, `type`, `options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:135](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L135)

Adds a new renderer to the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the renderer to add. |
| `type` | `"custom"` \| `"edge"` \| `"gradient"` \| `"accurate"` \| `"brightness"` | The type of the renderer to add. |
| `options` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | The options to use for the renderer. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

***

### background()

> **background**(`color`): `void`

Defined in: [renderers/RendererManager.ts:241](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L241)

Sets the background color for the ascii renderers. 

Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

[P5AsciifyError](../../../classes/P5AsciifyError.md) - If the color is not a string, array or p5.Color.

***

### checkCanvasDimensions()

> `private` **checkCanvasDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:108](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L108)

Continuously checks if the canvas dimensions have changed.
If they have, the grid is reset and the renderers are resized.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:210](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L210)

Clears the list of renderers.

#### Returns

`void`

***

### disable()

> **disable**(): `void`

Defined in: [renderers/RendererManager.ts:253](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L253)

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [renderers/RendererManager.ts:249](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L249)

#### Returns

`void`

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/RendererManager.ts:257](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L257)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `enabled` | `boolean` |

#### Returns

`void`

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:163](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L163)

Gets the ASCII renderer instance with the given name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rendererName` | `string` | The name of the renderer to get. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

The ASCII renderer instance with the given name.

***

### moveDown()

> **moveDown**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:179](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L179)

Moves a renderer up in the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The renderer to move up in the list. |

#### Returns

`void`

***

### moveUp()

> **moveUp**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:189](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L189)

Moves a renderer down in the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The renderer to move down in the list. |

#### Returns

`void`

***

### remove()

> **remove**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:199](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L199)

Removes a renderer from the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the renderer or the renderer instance itself. |

#### Returns

`void`

***

### render()

> **render**(`inputFramebuffer`): `void`

Defined in: [renderers/RendererManager.ts:80](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L80)

Renders the ASCII output to the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `inputFramebuffer` | `Framebuffer` | The input framebuffer to transform into ASCII. |

#### Returns

`void`

***

### resetRendererDimensions()

> **resetRendererDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:122](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L122)

Resets the dimensions of all renderers.

#### Returns

`void`

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:219](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/renderers/RendererManager.ts#L219)

Swaps the positions of two renderers in the renderer list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer1` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the first renderer or the renderer instance itself. |
| `renderer2` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the second renderer or the renderer instance itself. |

#### Returns

`void`
