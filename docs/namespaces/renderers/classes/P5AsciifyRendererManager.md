[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L29)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`_p`, `_grid`, `_fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L40)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | The grid instance. |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. |

#### Returns

[`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_currentcanvasdimensions"></a> `_currentCanvasDimensions` | `private` | `object` | The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L32) |
| `_currentCanvasDimensions.height` | `public` | `number` | - | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L32) |
| `_currentCanvasDimensions.width` | `public` | `number` | - | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L32) |
| <a id="_fonttextureatlas-1"></a> `_fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. | [renderers/RendererManager.ts:48](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L48) |
| <a id="_grid-1"></a> `_grid` | `private` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | The grid instance. | [renderers/RendererManager.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L45) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | The p5 instance. | [renderers/RendererManager.ts:42](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L42) |
| <a id="_renderers"></a> `_renderers` | `private` | `object`[] | The list of available renderers. | [renderers/RendererManager.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L35) |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The last renderer used in the rendering loop. | [renderers/RendererManager.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L38) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:231](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L231)

##### Returns

`object`[]

## Methods

### \_getRendererIndex()

> `private` **\_getRendererIndex**(`renderer`): `number`

Defined in: [renderers/RendererManager.ts:223](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L223)

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

Defined in: [renderers/RendererManager.ts:119](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L119)

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

### checkCanvasDimensions()

> `private` **checkCanvasDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:92](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L92)

Continuously checks if the canvas dimensions have changed.
If they have, the grid is reset and the renderers are resized.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:194](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L194)

Clears the list of renderers.

#### Returns

`void`

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:147](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L147)

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

Defined in: [renderers/RendererManager.ts:163](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L163)

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

Defined in: [renderers/RendererManager.ts:173](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L173)

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

Defined in: [renderers/RendererManager.ts:183](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L183)

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

Defined in: [renderers/RendererManager.ts:70](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L70)

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

Defined in: [renderers/RendererManager.ts:106](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L106)

Resets the dimensions of all renderers.

#### Returns

`void`

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:203](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/RendererManager.ts#L203)

Swaps the positions of two renderers in the renderer list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer1` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the first renderer or the renderer instance itself. |
| `renderer2` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the second renderer or the renderer instance itself. |

#### Returns

`void`
