[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontManager

# Class: P5AsciifyFontManager

Defined in: [FontManager.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L8)

Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.

## Constructors

### new P5AsciifyFontManager()

> **new P5AsciifyFontManager**(`_p`, `fontSource`): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [FontManager.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L24)

Creates a new `P5AsciifyFontManager` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `fontSource` | `string` \| `Font` | The source to load the font from. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object. |

#### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

## Accessors

### characterGlyphs

#### Get Signature

> **get** **characterGlyphs**(): [`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[]

Defined in: [FontManager.ts:258](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L258)

An array of character glyphs in the set font with color assignments.

##### Example

```javascript
 function setupAsciify() {
     // Print the character glyphs in the font
     console.log(p5asciify.fontManager.characterGlyphs);
 }
```

##### Returns

[`OpenTypeGlyph`](../type-aliases/OpenTypeGlyph.md)[]

***

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [FontManager.ts:245](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L245)

An array of supported characters in the set font.

##### Example

```javascript
 function setupAsciify() {
     // Print the supported characters in the font
     console.log(p5asciify.fontManager.characters);
 }
```

##### Returns

`string`[]

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [FontManager.ts:232](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L232)

The `p5.Font` object used for ASCII rendering.

##### Example

```javascript
 function drawAsciify() {
     // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
     textFont(p5asciify.fontManager.font);
     textSize(16);
     fill(255);
     text(frameRate() + " FPS", 10, 10);
 }
```

##### Returns

`Font`

## Methods

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontManager.ts:154](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L154)

Returns an array of characters that are not supported by the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to check. |

#### Returns

`string`[]

An array of unsupported characters. List is empty if all characters are supported.

#### Example

```javascript
 function setupAsciify() {
     // Print a list of potentially unsupported characters.
     console.log(p5asciify.fontManager.getUnsupportedCharacters(" .,ABC123"));
 }
```

***

### glyphColor()

> **glyphColor**(`char`): \[`number`, `number`, `number`\]

Defined in: [FontManager.ts:129](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L129)

Gets the color of a character in the font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `char` | `string` | The character to get the color for. |

#### Returns

\[`number`, `number`, `number`\]

An array containing the RGB color values for the character, 
         which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer` 
         to convert those pixels into the selected character.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the character is not found in the texture atlas.

#### Example

```javascript
 function setupAsciify() {
     // Get the color of the character 'A'
     const color = p5asciify.fontManager.glyphColor('A');
     console.log(color);
 }
```

***

### glyphColors()

> **glyphColors**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [FontManager.ts:204](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L204)

Gets an array of RGB colors for a given string of characters.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characters` | `string` | `""` | A string of characters. |

#### Returns

\[`number`, `number`, `number`\][]

Array of RGB color values.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If a character is not found in the fonts available characters.

#### Example

```javascript
 function setupAsciify() {
     // Get the RGB colors for the characters 'ABC'
     const colors = p5asciify.fontManager.glyphColors('ABC');
     console.log(colors);
 }
```

***

### loadFont()

> **loadFont**(`font`, `onSuccess`?): `void`

Defined in: [FontManager.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L64)

Loads a font for ASCII rendering.

**Note: For proper library functionality, use `p5asciify.loadFont()` instead 
of accessing this method directly. Direct access may lead to inconsistent state 
as other components won't be automatically updated.**

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `string` \| `Font` | The font to load. Can be a path to a .ttf or .otf file, a base64 string, a blob URL, or a p5.Font object. |
| `onSuccess`? | () => `void` | A callback function to call when the font is successfully loaded. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the font parameter is invalid or the font fails to load.

***

### validateCharacters()

> **validateCharacters**(`characters`): `void`

Defined in: [FontManager.ts:182](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/FontManager.ts#L182)

Validates a string of characters against the current font.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characters` | `string` | The string of characters to validate. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If any characters are not supported by the current font.

#### Example

```javascript
 function setupAsciify() {
     // Validate the characters 'ABC' (all supported)
     p5asciify.fontManager.validateCharacters('ABC');

     // Validate the characters 'ABC123' (unsupported characters '123')
     p5asciify.fontManager.validateCharacters('ABC123'); // -> Error
 }
