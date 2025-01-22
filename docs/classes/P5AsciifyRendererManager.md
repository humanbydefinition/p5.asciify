[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L27)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`p`, `grid`, `fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L32)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `grid` | [`P5AsciifyGrid`](P5AsciifyGrid.md) |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |

#### Returns

[`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_renderers"></a> `_renderers` | `private` | `object`[] | [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L29) |
| <a id="currentcanvasdimensions"></a> `currentCanvasDimensions` | `private` | `object` | [renderers/RendererManager.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L28) |
| `currentCanvasDimensions.height` | `public` | `number` | [renderers/RendererManager.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L28) |
| `currentCanvasDimensions.width` | `public` | `number` | [renderers/RendererManager.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L28) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [renderers/RendererManager.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L35) |
| <a id="grid-1"></a> `grid` | `private` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [renderers/RendererManager.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L34) |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L30) |
| <a id="p-1"></a> `p` | `private` | `__module` | [renderers/RendererManager.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L33) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:216](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L216)

##### Returns

`object`[]

## Methods

### add()

> **add**(`name`, `type`, `options`): `void`

Defined in: [renderers/RendererManager.ts:105](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L105)

Adds a new renderer to the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the renderer to add. |
| `type` | `string` | The type of the renderer to add. |
| `options` | `AsciiRendererOptions` | The options to use for the renderer. |

#### Returns

`void`

***

### checkCanvasDimensions()

> `private` **checkCanvasDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:78](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L78)

Continuously checks if the canvas dimensions have changed.
If they have, the grid is reset and the renderers are resized.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:179](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L179)

Clears the list of renderers.

#### Returns

`void`

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:132](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L132)

Gets the ASCII renderer instance with the given name.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rendererName` | `string` |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

The ASCII renderer instance with the given name.

***

### getRendererIndex()

> `private` **getRendererIndex**(`renderer`): `number`

Defined in: [renderers/RendererManager.ts:208](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L208)

Gets the index of a renderer in the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The renderer to get the index of. |

#### Returns

`number`

The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.

***

### moveDown()

> **moveDown**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:148](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L148)

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

Defined in: [renderers/RendererManager.ts:158](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L158)

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

Defined in: [renderers/RendererManager.ts:168](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L168)

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

Defined in: [renderers/RendererManager.ts:58](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L58)

Renders the ASCII output to the canvas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `inputFramebuffer` | `any` | The input framebuffer to transform into ASCII. |

#### Returns

`void`

***

### resetRendererDimensions()

> **resetRendererDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:92](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L92)

Resets the dimensions of all renderers.

#### Returns

`void`

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:188](https://github.com/humanbydefinition/p5-asciify/blob/64b8c5c1613bfcff4a54a1c103772defea33aec3/src/lib/renderers/RendererManager.ts#L188)

Swaps the positions of two renderers in the renderer list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer1` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the first renderer or the renderer instance itself. |
| `renderer2` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the second renderer or the renderer instance itself. |

#### Returns

`void`
