[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontTextureAtlas

# Class: P5AsciifyFontTextureAtlas

Defined in: [FontTextureAtlas.ts:7](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L7)

Manages a texture atlas for font rendering in the ASCII rendering process.

## Constructors

### new P5AsciifyFontTextureAtlas()

> **new P5AsciifyFontTextureAtlas**(`_p`, `_fontManager`, `_fontSize`): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [FontTextureAtlas.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L32)

Creates a new `P5AsciifyFontTextureAtlas` instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `_p` | `__module` | `undefined` | The p5 instance. |
| `_fontManager` | [`P5AsciifyFontManager`](P5AsciifyFontManager.md) | `undefined` | The font manager to use for the texture atlas. |
| `_fontSize` | `number` | `16` | The font size to use for the texture atlas. |

#### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_charsetcols"></a> `_charsetCols` | `private` | `number` | `undefined` | Number of columns in the texture. | [FontTextureAtlas.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L21) |
| <a id="_charsetrows"></a> `_charsetRows` | `private` | `number` | `undefined` | Number of rows in the texture. | [FontTextureAtlas.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L24) |
| <a id="_fontmanager-1"></a> `_fontManager` | `private` | [`P5AsciifyFontManager`](P5AsciifyFontManager.md) | `undefined` | The font manager to use for the texture atlas. | [FontTextureAtlas.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L34) |
| <a id="_fontsize-1"></a> `_fontSize` | `private` | `number` | `16` | The font size to use for the texture atlas. | [FontTextureAtlas.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L35) |
| <a id="_maxglyphdimensions"></a> `_maxGlyphDimensions` | `private` | `object` | `undefined` | Maximum width and height of the glyphs in the font. | [FontTextureAtlas.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L10) |
| `_maxGlyphDimensions.height` | `public` | `number` | `undefined` | Maximum height fetched from all the glyphs in the font. | [FontTextureAtlas.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L14) |
| `_maxGlyphDimensions.width` | `public` | `number` | `undefined` | Maximum width fetched from all the glyphs in the font. | [FontTextureAtlas.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L12) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | `undefined` | The p5 instance. | [FontTextureAtlas.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L33) |
| <a id="_texture"></a> `_texture` | `private` | `Framebuffer` | `undefined` | Texture containing all characters in the font. As square as possible. | [FontTextureAtlas.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L18) |

## Accessors

### charsetCols

#### Get Signature

> **get** **charsetCols**(): `number`

Defined in: [FontTextureAtlas.ts:124](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L124)

##### Returns

`number`

***

### charsetRows

#### Get Signature

> **get** **charsetRows**(): `number`

Defined in: [FontTextureAtlas.ts:125](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L125)

##### Returns

`number`

***

### fontManager

#### Get Signature

> **get** **fontManager**(): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [FontTextureAtlas.ts:127](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L127)

##### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontTextureAtlas.ts:126](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L126)

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontTextureAtlas.ts:122](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L122)

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontTextureAtlas.ts:122](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L122) |
| <a id="width"></a> `width` | `number` | [FontTextureAtlas.ts:122](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L122) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontTextureAtlas.ts:123](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L123)

##### Returns

`Framebuffer`

## Methods

### \_createTexture()

> `private` **\_createTexture**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:80](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L80)

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

Defined in: [FontTextureAtlas.ts:105](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L105)

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

Defined in: [FontTextureAtlas.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L45)

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
| <a id="height-1"></a> `height` | `number` | [FontTextureAtlas.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L45) |
| <a id="width-1"></a> `width` | `number` | [FontTextureAtlas.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L45) |

***

### reset()

> **reset**(): `void`

Defined in: [FontTextureAtlas.ts:61](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L61)

Resets the texture atlas by recalculating the maximum glyph dimensions and recreating the texture.

#### Returns

`void`

***

### setFontSize()

> **setFontSize**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:70](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontTextureAtlas.ts#L70)

Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The new font size. |

#### Returns

`void`
