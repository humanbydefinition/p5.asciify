[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L26)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`p`, `grid`, `fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L33)

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
| <a id="_renderers"></a> `_renderers` | `private` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md)[] | [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L29) |
| <a id="currentcanvasdimensions"></a> `currentCanvasDimensions` | `private` | `object` | [renderers/RendererManager.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L27) |
| `currentCanvasDimensions.height` | `public` | `number` | [renderers/RendererManager.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L27) |
| `currentCanvasDimensions.width` | `public` | `number` | [renderers/RendererManager.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L27) |
| <a id="fonttextureatlas-1"></a> `fontTextureAtlas` | `private` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [renderers/RendererManager.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L36) |
| <a id="gradientcharacterset"></a> `gradientCharacterSet` | `private` | [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md) | [renderers/RendererManager.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L28) |
| <a id="gradientmanager"></a> `gradientManager` | `public` | [`P5AsciifyGradientManager`](P5AsciifyGradientManager.md) | [renderers/RendererManager.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L30) |
| <a id="grid-1"></a> `grid` | `private` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [renderers/RendererManager.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L35) |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | [renderers/RendererManager.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L31) |
| <a id="p-1"></a> `p` | `private` | `__module` | [renderers/RendererManager.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L34) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)[]

Defined in: [renderers/RendererManager.ts:110](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L110)

##### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)[]

## Methods

### checkCanvasDimensions()

> `private` **checkCanvasDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:88](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L88)

Continuously checks if the canvas dimensions have changed.
If they have, the grid is reset and the renderers are resized.

#### Returns

`void`

***

### render()

> **render**(`inputFramebuffer`): `void`

Defined in: [renderers/RendererManager.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L66)

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

Defined in: [renderers/RendererManager.ts:102](https://github.com/humanbydefinition/p5-asciify/blob/d304087d1ede08ec5b6ebc19263567aad6425656/src/lib/renderers/RendererManager.ts#L102)

Resets the dimensions of all renderers.

#### Returns

`void`
