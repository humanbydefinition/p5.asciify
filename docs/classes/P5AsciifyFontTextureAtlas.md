[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyFontTextureAtlas

# Class: P5AsciifyFontTextureAtlas

Defined in: [FontTextureAtlas.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L8)

Creates a texture atlas containing all characters in a font, and provides utility methods for working with the atlas.

## Constructors

### new P5AsciifyFontTextureAtlas()

> **new P5AsciifyFontTextureAtlas**(`p`, `font`, `_fontSize`): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [FontTextureAtlas.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L34)

Creates a new `P5AsciifyFontTextureAtlas` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` | The p5 instance. |
| `font` | `Font` | The font object to use for the texture atlas. |
| `_fontSize` | `number` | The font size to use for the texture atlas. |

#### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_characterglyphs"></a> `_characterGlyphs` | `private` | `OpenTypeGlyph`[] | `undefined` | Array of `opentype.js` glyphs with unicode values, extended with r, g, and b properties for color. | [FontTextureAtlas.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L14) |
| <a id="_characters"></a> `_characters` | `private` | `string`[] | `undefined` | Array of characters in the font. | [FontTextureAtlas.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L11) |
| <a id="_charsetcols"></a> `_charsetCols` | `private` | `number` | `0` | Number of columns in the texture. | [FontTextureAtlas.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L23) |
| <a id="_charsetrows"></a> `_charsetRows` | `private` | `number` | `0` | Number of rows in the texture. | [FontTextureAtlas.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L26) |
| <a id="_fontsize-1"></a> `_fontSize` | `private` | `number` | `undefined` | The font size to use for the texture atlas. | [FontTextureAtlas.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L37) |
| <a id="_maxglyphdimensions"></a> `_maxGlyphDimensions` | `private` | `object` | `undefined` | Maximum width and height of the glyphs in the font. | [FontTextureAtlas.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L17) |
| `_maxGlyphDimensions.height` | `public` | `number` | `undefined` | - | [FontTextureAtlas.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L17) |
| `_maxGlyphDimensions.width` | `public` | `number` | `undefined` | - | [FontTextureAtlas.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L17) |
| <a id="_texture"></a> `_texture` | `private` | `Framebuffer` | `undefined` | Texture containing all characters in the font. As square as possible. | [FontTextureAtlas.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L20) |
| <a id="font-1"></a> `font` | `private` | `Font` | `undefined` | The font object to use for the texture atlas. | [FontTextureAtlas.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L36) |
| <a id="p-1"></a> `p` | `private` | `__module` | `undefined` | The p5 instance. | [FontTextureAtlas.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L35) |

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [FontTextureAtlas.ts:196](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L196)

##### Returns

`string`[]

***

### charsetCols

#### Get Signature

> **get** **charsetCols**(): `number`

Defined in: [FontTextureAtlas.ts:197](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L197)

##### Returns

`number`

***

### charsetRows

#### Get Signature

> **get** **charsetRows**(): `number`

Defined in: [FontTextureAtlas.ts:198](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L198)

##### Returns

`number`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontTextureAtlas.ts:199](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L199)

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontTextureAtlas.ts:194](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L194)

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontTextureAtlas.ts:194](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L194) |
| <a id="width"></a> `width` | `number` | [FontTextureAtlas.ts:194](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L194) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontTextureAtlas.ts:195](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L195)

##### Returns

`Framebuffer`

## Methods

### \_createTexture()

> `private` **\_createTexture**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:111](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L111)

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

Defined in: [FontTextureAtlas.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L69)

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
| <a id="height-1"></a> `height` | `number` | [FontTextureAtlas.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L69) |
| <a id="width-1"></a> `width` | `number` | [FontTextureAtlas.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L69) |

***

### \_loadCharacterGlyphs()

> `private` **\_loadCharacterGlyphs**(): `OpenTypeGlyph`[]

Defined in: [FontTextureAtlas.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L53)

Loads all glyphs with unicode values from the font and assigns colors to them.

#### Returns

`OpenTypeGlyph`[]

An array of opentype.js glyphs, extended with r, g, and b properties for color.

***

### drawCharacters()

> `private` **drawCharacters**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:136](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L136)

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

Defined in: [FontTextureAtlas.ts:159](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L159)

Gets an array of RGB colors for a given string or array of characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string`[] | Either a string or array of characters. |

#### Returns

\[`number`, `number`, `number`\][]

Array of RGB color values.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If a character is not found in the texture atlas.

***

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontTextureAtlas.ts:180](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L180)

Returns an array of characters that are not supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to check. |

#### Returns

`string`[]

An array of unsupported characters. List is empty if all characters are supported.

***

### setFontObject()

> **setFontObject**(`font`): `void`

Defined in: [FontTextureAtlas.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L86)

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

Defined in: [FontTextureAtlas.ts:101](https://github.com/humanbydefinition/p5-asciify/blob/962e73d5322ad3ee9e39152d22240240aa4f883f/src/lib/FontTextureAtlas.ts#L101)

Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The new font size. |

#### Returns

`void`
