[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyCharacterSet

# Class: P5AsciifyCharacterSet

Defined in: [CharacterSet.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L12)

Represents a set of characters to be used by an ASCII renderer.

Contains a `P5AsciifyColorPalette` instance to manage the color references for each set character.

## Constructors

### new P5AsciifyCharacterSet()

> **new P5AsciifyCharacterSet**(`p`, `asciiFontTextureAtlas`, `characters`): [`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md)

Defined in: [CharacterSet.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L26)

Create a new character set instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `p` | `__module` | `undefined` | The p5 instance. |
| `asciiFontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | `undefined` | The font texture atlas to reference for character colors. |
| `characters` | `string` | `""` | The characters to use in the character set. |

#### Returns

[`P5AsciifyCharacterSet`](P5AsciifyCharacterSet.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_characters"></a> `_characters` | `private` | `string` | The list of individual characters in the character set. | [CharacterSet.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L18) |
| <a id="asciifonttextureatlas-1"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | The font texture atlas to reference for character colors. | [CharacterSet.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L28) |
| <a id="charactercolorpalette"></a> `characterColorPalette` | `public` | [`P5AsciifyColorPalette`](P5AsciifyColorPalette.md) | The color palette for the character set. | [CharacterSet.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L15) |
| <a id="p-1"></a> `p` | `private` | `__module` | The p5 instance. | [CharacterSet.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L27) |

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `string`

Defined in: [CharacterSet.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L66)

##### Returns

`string`

## Methods

### reset()

> **reset**(): `void`

Defined in: [CharacterSet.ts:61](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L61)

Resets the character set colors. Gets called when the font atlas is updated with a new font.

#### Returns

`void`

***

### setCharacterSet()

> **setCharacterSet**(`characters`): `void`

Defined in: [CharacterSet.ts:53](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L53)

Sets the characters to be used in the character set and updates the color palette texture.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to use. |

#### Returns

`void`

***

### validateCharacters()

> `private` **validateCharacters**(`characters`): `string`

Defined in: [CharacterSet.ts:41](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/CharacterSet.ts#L41)

Validates the characters to ensure they are supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The characters to validate. |

#### Returns

`string`

The validated characters as a list of individual characters.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If any characters are not supported by the set font.
