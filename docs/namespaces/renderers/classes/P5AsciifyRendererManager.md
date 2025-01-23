[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [renderers](../README.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L29)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`p`, `grid`, `fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L34)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) |

#### Returns

[`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_renderers"></a> `_renderers` | `private` | `object`[] | [renderers/RendererManager.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L31) |
| <a id="currentcanvasdimensions"></a> `currentCanvasDimensions` | `private` | `object` | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L30) |
| `currentCanvasDimensions.height` | `public` | `number` | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L30) |
| `currentCanvasDimensions.width` | `public` | `number` | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L30) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | [renderers/RendererManager.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L37) |
| <a id="grid-1"></a> `grid` | `private` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | [renderers/RendererManager.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L36) |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L32) |
| <a id="p-1"></a> `p` | `private` | `__module` | [renderers/RendererManager.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L35) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:219](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L219)

##### Returns

`object`[]

## Methods

### add()

> **add**(`name`, `type`, `options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:107](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L107)

Adds a new renderer to the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the renderer to add. |
| `type` | `"brightness"` \| `"accurate"` \| `"gradient"` \| `"edge"` \| `"custom"` | The type of the renderer to add. |
| `options` | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | The options to use for the renderer. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

***

### checkCanvasDimensions()

> `private` **checkCanvasDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:80](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L80)

Continuously checks if the canvas dimensions have changed.
If they have, the grid is reset and the renderers are resized.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:182](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L182)

Clears the list of renderers.

#### Returns

`void`

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:135](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L135)

Gets the ASCII renderer instance with the given name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rendererName` | `string` | The name of the renderer to get. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

The ASCII renderer instance with the given name.

***

### getRendererIndex()

> `private` **getRendererIndex**(`renderer`): `number`

Defined in: [renderers/RendererManager.ts:211](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L211)

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

Defined in: [renderers/RendererManager.ts:151](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L151)

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

Defined in: [renderers/RendererManager.ts:161](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L161)

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

Defined in: [renderers/RendererManager.ts:171](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L171)

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

Defined in: [renderers/RendererManager.ts:59](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L59)

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

Defined in: [renderers/RendererManager.ts:94](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L94)

Resets the dimensions of all renderers.

#### Returns

`void`

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:191](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/RendererManager.ts#L191)

Swaps the positions of two renderers in the renderer list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer1` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the first renderer or the renderer instance itself. |
| `renderer2` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the second renderer or the renderer instance itself. |

#### Returns

`void`
