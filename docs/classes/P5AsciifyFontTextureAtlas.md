[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyFontTextureAtlas

# Class: P5AsciifyFontTextureAtlas

Defined in: [FontTextureAtlas.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L8)

Creates a texture atlas containing all characters in a font, and provides utility methods for working with the atlas.

## Constructors

### new P5AsciifyFontTextureAtlas()

> **new P5AsciifyFontTextureAtlas**(`p`, `font`, `_fontSize`): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [FontTextureAtlas.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `font` | `Font` |
| `_fontSize` | `number` |

#### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_characterglyphs"></a> `_characterGlyphs` | `private` | `OpenTypeGlyph`[] | `undefined` | [FontTextureAtlas.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L10) |
| <a id="_characters"></a> `_characters` | `private` | `string`[] | `undefined` | [FontTextureAtlas.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L9) |
| <a id="_charsetcols"></a> `_charsetCols` | `private` | `number` | `0` | [FontTextureAtlas.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L13) |
| <a id="_charsetrows"></a> `_charsetRows` | `private` | `number` | `0` | [FontTextureAtlas.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L14) |
| <a id="_fontsize-1"></a> `_fontSize` | `private` | `number` | `undefined` | [FontTextureAtlas.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L19) |
| <a id="_maxglyphdimensions"></a> `_maxGlyphDimensions` | `private` | `object` | `undefined` | [FontTextureAtlas.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L11) |
| `_maxGlyphDimensions.height` | `public` | `number` | `undefined` | [FontTextureAtlas.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L11) |
| `_maxGlyphDimensions.width` | `public` | `number` | `undefined` | [FontTextureAtlas.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L11) |
| <a id="_texture"></a> `_texture` | `private` | `Framebuffer` | `undefined` | [FontTextureAtlas.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L12) |
| <a id="font-1"></a> `font` | `private` | `Font` | `undefined` | [FontTextureAtlas.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L18) |
| <a id="p-1"></a> `p` | `private` | `__module` | `undefined` | [FontTextureAtlas.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L17) |

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [FontTextureAtlas.ts:178](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L178)

##### Returns

`string`[]

***

### charsetCols

#### Get Signature

> **get** **charsetCols**(): `number`

Defined in: [FontTextureAtlas.ts:179](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L179)

##### Returns

`number`

***

### charsetRows

#### Get Signature

> **get** **charsetRows**(): `number`

Defined in: [FontTextureAtlas.ts:180](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L180)

##### Returns

`number`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontTextureAtlas.ts:181](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L181)

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontTextureAtlas.ts:176](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L176)

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontTextureAtlas.ts:176](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L176) |
| <a id="width"></a> `width` | `number` | [FontTextureAtlas.ts:176](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L176) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontTextureAtlas.ts:177](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L177)

##### Returns

`Framebuffer`

## Methods

### \_createTexture()

> `private` **\_createTexture**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:93](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L93)

Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to use for creating the texture. |

#### Returns

`void`

***

### \_getMaxGlyphDimensions()

> `private` **\_getMaxGlyphDimensions**(`fontSize`): `object`

Defined in: [FontTextureAtlas.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L51)

Calculates the maximum width and height of the glyphs in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to use for calculations. |

#### Returns

`object`

An object containing the maximum width and height of the glyphs.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-1"></a> `height` | `number` | [FontTextureAtlas.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L51) |
| <a id="width-1"></a> `width` | `number` | [FontTextureAtlas.ts:51](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L51) |

***

### \_loadCharacterGlyphs()

> `private` **\_loadCharacterGlyphs**(): `OpenTypeGlyph`[]

Defined in: [FontTextureAtlas.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L35)

Loads all glyphs with unicode values from the font and assigns colors to them.

#### Returns

`OpenTypeGlyph`[]

An array of opentype.js glyphs, extended with r, g, and b properties for color.

***

### drawCharacters()

> `private` **drawCharacters**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:118](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L118)

Draws characters onto the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to use for drawing the characters on the texture. |

#### Returns

`void`

***

### getCharsetColorArray()

> **getCharsetColorArray**(`input`): \[`number`, `number`, `number`\][]

Defined in: [FontTextureAtlas.ts:141](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L141)

Gets an array of RGB colors for a given string or array of characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` \| `string`[] | Either a string or array of characters |

#### Returns

\[`number`, `number`, `number`\][]

Array of RGB color values

#### Throws

P5AsciifyError If a character is not found in the texture atlas

***

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontTextureAtlas.ts:162](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L162)

Returns an array of characters that are not supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to check. |

#### Returns

`string`[]

An array of unsupported characters.List is empty if all characters are supported.

***

### setFontObject()

> **setFontObject**(`font`): `void`

Defined in: [FontTextureAtlas.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L68)

Sets the font object and resets the whole atlas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `Font` | The new font object. |

#### Returns

`void`

***

### setFontSize()

> **setFontSize**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/d5121837ea4d87a7b217d789b12962adb307bebd/src/lib/FontTextureAtlas.ts#L83)

Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The new font size. |

#### Returns

`void`
