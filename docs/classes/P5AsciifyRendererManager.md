[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L29)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`p`, `grid`, `fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L35)

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
| <a id="_renderers"></a> `_renderers` | `private` | `object`[] | [renderers/RendererManager.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L31) |
| <a id="currentcanvasdimensions"></a> `currentCanvasDimensions` | `private` | `object` | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L30) |
| `currentCanvasDimensions.height` | `public` | `number` | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L30) |
| `currentCanvasDimensions.width` | `public` | `number` | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L30) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [renderers/RendererManager.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L38) |
| <a id="gradientmanager"></a> `gradientManager` | `public` | [`P5AsciifyGradientManager`](P5AsciifyGradientManager.md) | [renderers/RendererManager.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L32) |
| <a id="grid-1"></a> `grid` | `private` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [renderers/RendererManager.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L37) |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | [renderers/RendererManager.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L33) |
| <a id="p-1"></a> `p` | `private` | `__module` | [renderers/RendererManager.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L36) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:221](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L221)

##### Returns

`object`[]

## Methods

### add()

> **add**(`name`, `type`, `options`): `void`

Defined in: [renderers/RendererManager.ts:110](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L110)

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

Defined in: [renderers/RendererManager.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L83)

Continuously checks if the canvas dimensions have changed.
If they have, the grid is reset and the renderers are resized.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:184](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L184)

Clears the list of renderers.

#### Returns

`void`

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:137](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L137)

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

Defined in: [renderers/RendererManager.ts:213](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L213)

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

Defined in: [renderers/RendererManager.ts:153](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L153)

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

Defined in: [renderers/RendererManager.ts:163](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L163)

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

Defined in: [renderers/RendererManager.ts:173](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L173)

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

Defined in: [renderers/RendererManager.ts:63](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L63)

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

Defined in: [renderers/RendererManager.ts:97](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L97)

Resets the dimensions of all renderers.

#### Returns

`void`

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:193](https://github.com/humanbydefinition/p5-asciify/blob/571047bdf712418b9d7094e1f65d29ff730058f9/src/lib/renderers/RendererManager.ts#L193)

Swaps the positions of two renderers in the renderer list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer1` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the first renderer or the renderer instance itself. |
| `renderer2` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the second renderer or the renderer instance itself. |

#### Returns

`void`
