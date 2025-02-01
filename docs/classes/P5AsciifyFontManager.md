[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontManager

# Class: P5AsciifyFontManager

Defined in: [FontManager.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L8)

Manages a texture atlas for font rendering in the ASCII rendering process.

## Constructors

### new P5AsciifyFontManager()

> **new P5AsciifyFontManager**(`p`, `fontSource`?): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [FontManager.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `fontSource`? | `string` \| `Font` |

#### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_characterglyphs"></a> `_characterGlyphs` | `private` | [`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[] | `[]` | [FontManager.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L16) |
| <a id="_characters"></a> `_characters` | `private` | `string`[] | `[]` | [FontManager.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L14) |
| <a id="_font"></a> `_font` | `private` | `Font` | `undefined` | [FontManager.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L12) |
| <a id="_p"></a> `_p` | `private` | `__module` | `undefined` | [FontManager.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L10) |

## Accessors

### characterGlyphs

#### Get Signature

> **get** **characterGlyphs**(): [`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[]

Defined in: [FontManager.ts:156](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L156)

##### Returns

[`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[]

***

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [FontManager.ts:155](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L155)

##### Returns

`string`[]

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [FontManager.ts:154](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L154)

##### Returns

`Font`

## Methods

### \_initializeGlyphsAndCharacters()

> `private` **\_initializeGlyphsAndCharacters**(): `void`

Defined in: [FontManager.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L29)

#### Returns

`void`

***

### \_isValidFontPath()

> `private` **\_isValidFontPath**(`path`): `boolean`

Defined in: [FontManager.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L83)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`boolean`

***

### getCharsetColorArray()

> **getCharsetColorArray**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [FontManager.ts:140](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L140)

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

Defined in: [FontManager.ts:109](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L109)

Returns an array of characters that are not supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to check. |

#### Returns

`string`[]

An array of unsupported characters. List is empty if all characters are supported.

***

### glyphColor()

> **glyphColor**(`char`): \[`number`, `number`, `number`\]

Defined in: [FontManager.ts:92](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L92)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `char` | `string` |

#### Returns

\[`number`, `number`, `number`\]

***

### loadFont()

> **loadFont**(`font`, `onSuccess`?): `void`

Defined in: [FontManager.ts:48](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `font` | `string` \| `Font` |
| `onSuccess`? | () => `void` |

#### Returns

`void`

***

### validateCharacters()

> **validateCharacters**(`characters`): `void`

Defined in: [FontManager.ts:127](https://github.com/humanbydefinition/p5-asciify/blob/8048ed2591f1c8ea5ae855965762fa34a05b3fdc/src/lib/FontManager.ts#L127)

Validates a string of characters against the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to validate. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If any characters are not supported by the current font.
