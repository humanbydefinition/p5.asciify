[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontTextureAtlas

# Class: P5AsciifyFontTextureAtlas

Defined in: [FontTextureAtlas.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L12)

Manages a texture atlas for font rendering in the ASCII rendering process.
The atlas creates an optimized GPU-friendly texture containing all required glyphs
arranged in a square grid layout.

**Note: Modify font properties through the `p5asciify` instance methods rather than 
directly, as this ensures proper synchronization with dependent components.**

## Constructors

### new P5AsciifyFontTextureAtlas()

> **new P5AsciifyFontTextureAtlas**(`_p`, `_fontManager`, `_fontSize`): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [FontTextureAtlas.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L37)

Creates a new `P5AsciifyFontTextureAtlas` instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `_p` | `__module` | `undefined` | The p5 instance. |
| `_fontManager` | [`P5AsciifyFontManager`](P5AsciifyFontManager.md) | `undefined` | The font manager to use for the texture atlas. |
| `_fontSize` | `number` | `16` | The font size to use for the texture atlas. |

#### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

## Accessors

### charsetCols

#### Get Signature

> **get** **charsetCols**(): `number`

Defined in: [FontTextureAtlas.ts:139](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L139)

Returns the number of columns in the texture containing all characters in the font.

##### Returns

`number`

***

### charsetRows

#### Get Signature

> **get** **charsetRows**(): `number`

Defined in: [FontTextureAtlas.ts:144](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L144)

Returns the number of rows in the texture containing all characters in the font.

##### Returns

`number`

***

### fontManager

#### Get Signature

> **get** **fontManager**(): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [FontTextureAtlas.ts:154](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L154)

Returns the font manager used for the texture atlas.

##### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontTextureAtlas.ts:149](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L149)

Returns the font size used for the texture atlas.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontTextureAtlas.ts:129](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L129)

Returns the maximum width and height found for all the glyphs in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontTextureAtlas.ts:129](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L129) |
| <a id="width"></a> `width` | `number` | [FontTextureAtlas.ts:129](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L129) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontTextureAtlas.ts:134](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L134)

Returns the texture containing all characters in the font.

##### Returns

`Framebuffer`

## Methods

### reset()

> **reset**(): `void`

Defined in: [FontTextureAtlas.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L66)

Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.

#### Returns

`void`

***

### setFontSize()

> **setFontSize**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:75](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/FontTextureAtlas.ts#L75)

Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The new font size. |

#### Returns

`void`
