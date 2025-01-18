[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyCharacterSet

# Class: P5AsciifyCharacterSet

Defined in: [CharacterSet.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L10)

Represents a set of characters to be used by an ASCII renderer.

## Constructors

### new P5AsciifyCharacterSet()

> **new P5AsciifyCharacterSet**(`p`, `asciiFontTextureAtlas`, `characters`): [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md)

Defined in: [CharacterSet.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `asciiFontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) |
| `characters` | `string` |

#### Returns

[`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_characters"></a> `_characters` | `private` | `string`[] | [CharacterSet.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L11) |
| <a id="asciifonttextureatlas-1"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [CharacterSet.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L17) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | [CharacterSet.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L13) |
| <a id="charactercolors"></a> `characterColors` | `private` | \[`number`, `number`, `number`\][] | [CharacterSet.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L12) |
| <a id="p-1"></a> `p` | `private` | `__module` | [CharacterSet.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L16) |

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [CharacterSet.ts:59](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L59)

##### Returns

`string`[]

## Methods

### reset()

> **reset**(): `void`

Defined in: [CharacterSet.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L53)

Resets the character set colors. Gets called when the font atlas is updated.

#### Returns

`void`

***

### setCharacterSet()

> **setCharacterSet**(`characters`): `void`

Defined in: [CharacterSet.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L44)

Sets the characters to be used in the character set and updates the texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to use. |

#### Returns

`void`

***

### validateCharacters()

> `private` **validateCharacters**(`characters`): `string`[]

Defined in: [CharacterSet.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/cdff850585d76a5bcd9825304acbb40250c3497b/src/lib/CharacterSet.ts#L32)

Validates the characters to ensure they are supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The characters to validate. |

#### Returns

`string`[]

The validated characters as a list of characters.

#### Throws

If any characters are not supported by the font
