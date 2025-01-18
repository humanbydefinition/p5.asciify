[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyCharacterSet

# Class: P5AsciifyCharacterSet

Defined in: [CharacterSet.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L12)

Represents a set of characters to be used by an ASCII renderer.

Contains a `P5AsciifyColorPalette` instance to manage the color references for each set character.

## Constructors

### new P5AsciifyCharacterSet()

> **new P5AsciifyCharacterSet**(`p`, `asciiFontTextureAtlas`, `characters`): [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md)

Defined in: [CharacterSet.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L31)

Create a new character set instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` | The p5 instance. |
| `asciiFontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | The font texture atlas to reference for character colors. |
| `characters` | `string` | The characters to use in the character set. |

#### Returns

[`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_characters"></a> `_characters` | `private` | `string`[] | The list of characters in the character set. | [CharacterSet.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L22) |
| <a id="asciifonttextureatlas-1"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | The font texture atlas to reference for character colors. | [CharacterSet.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L33) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | The color palette for the character set. | [CharacterSet.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L17) |
| <a id="p-1"></a> `p` | `private` | `__module` | The p5 instance. | [CharacterSet.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L32) |

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [CharacterSet.ts:71](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L71)

##### Returns

`string`[]

## Methods

### reset()

> **reset**(): `void`

Defined in: [CharacterSet.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L66)

Resets the character set colors. Gets called when the font atlas is updated with a new font.

#### Returns

`void`

***

### setCharacterSet()

> **setCharacterSet**(`characters`): `void`

Defined in: [CharacterSet.ts:58](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L58)

Sets the characters to be used in the character set and updates the color palette texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to use. |

#### Returns

`void`

***

### validateCharacters()

> `private` **validateCharacters**(`characters`): `string`[]

Defined in: [CharacterSet.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/CharacterSet.ts#L46)

Validates the characters to ensure they are supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The characters to validate. |

#### Returns

`string`[]

The validated characters as a list of characters.

#### Throws

If any characters are not supported by the set font.
