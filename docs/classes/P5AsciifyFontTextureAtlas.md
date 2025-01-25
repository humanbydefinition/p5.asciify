[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyFontTextureAtlas

# Class: P5AsciifyFontTextureAtlas

Defined in: [FontTextureAtlas.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L8)

Manages a texture atlas for font rendering in the ASCII rendering process.

## Constructors

### new P5AsciifyFontTextureAtlas()

> **new P5AsciifyFontTextureAtlas**(`_p`, `_font`, `_fontSize`): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [FontTextureAtlas.ts:39](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L39)

Creates a new `P5AsciifyFontTextureAtlas` instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `_p` | `__module` | `undefined` | The p5 instance. |
| `_font` | `Font` | `undefined` | The font object to use for the texture atlas. |
| `_fontSize` | `number` | `16` | The font size to use for the texture atlas. |

#### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="_characterglyphs"></a> `_characterGlyphs` | `private` | [`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[] | `undefined` | Array of `opentype.js` glyphs with unicode values, extended with r, g, and b properties for color. | [FontTextureAtlas.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L14) |
| <a id="_characters"></a> `_characters` | `private` | `string`[] | `undefined` | Array of all characters in the font. | [FontTextureAtlas.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L11) |
| <a id="_charsetcols"></a> `_charsetCols` | `private` | `number` | `undefined` | Number of columns in the texture. | [FontTextureAtlas.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L28) |
| <a id="_charsetrows"></a> `_charsetRows` | `private` | `number` | `undefined` | Number of rows in the texture. | [FontTextureAtlas.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L31) |
| <a id="_font-1"></a> `_font` | `private` | `Font` | `undefined` | The font object to use for the texture atlas. | [FontTextureAtlas.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L41) |
| <a id="_fontsize-1"></a> `_fontSize` | `private` | `number` | `16` | The font size to use for the texture atlas. | [FontTextureAtlas.ts:42](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L42) |
| <a id="_maxglyphdimensions"></a> `_maxGlyphDimensions` | `private` | `object` | `undefined` | Maximum width and height of the glyphs in the font. | [FontTextureAtlas.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L17) |
| `_maxGlyphDimensions.height` | `public` | `number` | `undefined` | Maximum height fetched from all the glyphs in the font. | [FontTextureAtlas.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L21) |
| `_maxGlyphDimensions.width` | `public` | `number` | `undefined` | Maximum width fetched from all the glyphs in the font. | [FontTextureAtlas.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L19) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | `undefined` | The p5 instance. | [FontTextureAtlas.ts:40](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L40) |
| <a id="_texture"></a> `_texture` | `private` | `Framebuffer` | `undefined` | Texture containing all characters in the font. As square as possible. | [FontTextureAtlas.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L25) |

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [FontTextureAtlas.ts:211](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L211)

##### Returns

`string`[]

***

### charsetCols

#### Get Signature

> **get** **charsetCols**(): `number`

Defined in: [FontTextureAtlas.ts:212](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L212)

##### Returns

`number`

***

### charsetRows

#### Get Signature

> **get** **charsetRows**(): `number`

Defined in: [FontTextureAtlas.ts:213](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L213)

##### Returns

`number`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontTextureAtlas.ts:214](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L214)

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontTextureAtlas.ts:209](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L209)

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontTextureAtlas.ts:209](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L209) |
| <a id="width"></a> `width` | `number` | [FontTextureAtlas.ts:209](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L209) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontTextureAtlas.ts:210](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L210)

##### Returns

`Framebuffer`

## Methods

### \_createTexture()

> `private` **\_createTexture**(`fontSize`): `void`

Defined in: [FontTextureAtlas.ts:116](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L116)

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

Defined in: [FontTextureAtlas.ts:141](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L141)

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

Defined in: [FontTextureAtlas.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L74)

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
| <a id="height-1"></a> `height` | `number` | [FontTextureAtlas.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L74) |
| <a id="width-1"></a> `width` | `number` | [FontTextureAtlas.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L74) |

***

### \_loadCharacterGlyphs()

> `private` **\_loadCharacterGlyphs**(): [`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[]

Defined in: [FontTextureAtlas.ts:58](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L58)

Loads all glyphs with unicode values from the font and assigns colors to them.

#### Returns

[`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[]

An array of opentype.js glyphs, extended with r, g, and b properties for color.

***

### getCharsetColorArray()

> **getCharsetColorArray**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [FontTextureAtlas.ts:164](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L164)

Gets an array of RGB colors for a given string or array of characters.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characters` | `string` | `""` | A string of characters. |

#### Returns

\[`number`, `number`, `number`\][]

Array of RGB color values.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If a character is not found in the texture atlas.

***

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontTextureAtlas.ts:183](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L183)

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

Defined in: [FontTextureAtlas.ts:91](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L91)

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

Defined in: [FontTextureAtlas.ts:106](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L106)

Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The new font size. |

#### Returns

`void`

***

### validateCharacters()

> **validateCharacters**(`characters`): `void`

Defined in: [FontTextureAtlas.ts:201](https://github.com/humanbydefinition/p5-asciify/blob/8cd5bfe7cd7ddc9c2a99adb8f2c6b062ad6f770a/src/lib/FontTextureAtlas.ts#L201)

Validates a string of characters against the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to validate. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If any characters are not supported by the current font.
