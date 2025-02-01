[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontTextureAtlas

# Class: P5AsciifyFontTextureAtlas

Defined in: [FontTextureAtlas.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L9)

Manages a texture atlas for font rendering in the ASCII rendering process.

## Constructors

### new P5AsciifyFontTextureAtlas()

> **new P5AsciifyFontTextureAtlas**(`_p`, `_fontManager`, `_fontSize`): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [FontTextureAtlas.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L34)

Creates a new `P5AsciifyFontTextureAtlas` instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `_p` | `__module` | `undefined` | The p5 instance. |
| `_fontManager` | `P5AsciifyFontManager` | `undefined` | - |
| `_fontSize` | `number` | `16` | The font size to use for the texture atlas. |

#### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_charsetcols"></a> `_charsetCols` | `private` | `number` | `undefined` | Number of columns in the texture. | [FontTextureAtlas.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L23) |
| <a id="_charsetrows"></a> `_charsetRows` | `private` | `number` | `undefined` | Number of rows in the texture. | [FontTextureAtlas.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L26) |
| <a id="_fontmanager-1"></a> `_fontManager` | `private` | `P5AsciifyFontManager` | `undefined` | - | [FontTextureAtlas.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L36) |
| <a id="_fontsize-1"></a> `_fontSize` | `private` | `number` | `16` | The font size to use for the texture atlas. | [FontTextureAtlas.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L37) |
| <a id="_maxglyphdimensions"></a> `_maxGlyphDimensions` | `private` | `object` | `undefined` | Maximum width and height of the glyphs in the font. | [FontTextureAtlas.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L12) |
| `_maxGlyphDimensions.height` | `public` | `number` | `undefined` | Maximum height fetched from all the glyphs in the font. | [FontTextureAtlas.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L16) |
| `_maxGlyphDimensions.width` | `public` | `number` | `undefined` | Maximum width fetched from all the glyphs in the font. | [FontTextureAtlas.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L14) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | `undefined` | The p5 instance. | [FontTextureAtlas.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L35) |
| <a id="_texture"></a> `_texture` | `private` | `Framebuffer` | `undefined` | Texture containing all characters in the font. As square as possible. | [FontTextureAtlas.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L20) |

## Accessors

### charsetCols

#### Get Signature

> **get** **charsetCols**(): `number`

Defined in: [FontTextureAtlas.ts:127](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L127)

##### Returns

`number`

***

### charsetRows

#### Get Signature

> **get** **charsetRows**(): `number`

Defined in: [FontTextureAtlas.ts:128](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L128)

##### Returns

`number`

***

### fontManager

#### Get Signature

> **get** **fontManager**(): `P5AsciifyFontManager`

Defined in: [FontTextureAtlas.ts:130](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L130)

##### Returns

`P5AsciifyFontManager`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontTextureAtlas.ts:129](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L129)

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontTextureAtlas.ts:125](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L125)

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontTextureAtlas.ts:125](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L125) |
| <a id="width"></a> `width` | `number` | [FontTextureAtlas.ts:125](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L125) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontTextureAtlas.ts:126](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L126)

##### Returns

`Framebuffer`

## Methods

### \_createTexture()

> `private` **\_createTexture**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L83)

Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to use for creating the texture. |

#### Returns

`void`

***

### \_drawCharacters()

> `private` **\_drawCharacters**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:108](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L108)

Draws characters onto the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to use for drawing the characters on the texture. |

#### Returns

`void`

***

### \_getMaxGlyphDimensions()

> `private` **\_getMaxGlyphDimensions**(`fontSize`): `object`

Defined in: [FontTextureAtlas.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L47)

Calculates the maximum width and height of all the glyphs in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to use for calculations. |

#### Returns

`object`

An object containing the maximum width and height of the glyphs.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-1"></a> `height` | `number` | [FontTextureAtlas.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L47) |
| <a id="width-1"></a> `width` | `number` | [FontTextureAtlas.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L47) |

***

### reset()

> **reset**(): `void`

Defined in: [FontTextureAtlas.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L64)

Sets the font object and resets the whole atlas.

#### Returns

`void`

***

### setFontSize()

> **setFontSize**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/e247792661fdf21646cc212e4bf1e6a1bf198b53/src/lib/FontTextureAtlas.ts#L73)

Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The new font size. |

#### Returns

`void`
