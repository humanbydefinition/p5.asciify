[**p5.asciify v0.9.0-beta.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontManager

# Class: P5AsciifyFontManager

Defined in: [FontManager.ts:8](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L8)

Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.

## Constructors

### Constructor

> **new P5AsciifyFontManager**(`_p`, `_font`): `P5AsciifyFontManager`

Defined in: [FontManager.ts:44](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L44)

Creates a new `P5AsciifyFontManager` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_font` | `Font` | The font to use for ASCII rendering. |

#### Returns

`P5AsciifyFontManager`

## Accessors

### characters

#### Get Signature

> **get** **characters**(): `object`[]

Defined in: [FontManager.ts:349](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L349)

An array of supported characters in the set font with additional information like unicode, and RGB color values.

##### Example

```javascript
 function setupAsciify() {
     // Print the supported characters in the font to the console
     console.log(p5asciify.asciifier().fontManager.characters);
 }
```

##### Returns

`object`[]

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [FontManager.ts:336](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L336)

The `p5.Font` object used for ASCII rendering.

##### Example

```javascript
 function drawAsciify() {
     // Draw an FPS counter, using the font set in p5.asciify, on top of the ASCII rendering.
     textFont(p5asciify.asciifier().fontManager.font);
     textSize(16);
     fill(255);
     text(frameRate() + " FPS", 10, 10);
 }
```

##### Returns

`Font`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontManager.ts:320](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L320)

Returns the font size used for the texture containing all characters in the font.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontManager.ts:300](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L300)

Returns the maximum width and height found in all the glyphs in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `height` | `number` | [FontManager.ts:300](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L300) |
| `width` | `number` | [FontManager.ts:300](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L300) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontManager.ts:305](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L305)

Returns the texture containing all characters in the font.

##### Returns

`Framebuffer`

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [FontManager.ts:310](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L310)

Returns the number of columns in the texture containing all characters in the font.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [FontManager.ts:315](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L315)

Returns the number of rows in the texture containing all characters in the font.

##### Returns

`number`

## Methods

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontManager.ts:152](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L152)

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
     console.log(p5asciify.asciifier().fontManager.getUnsupportedCharacters(" .,ABC123"));
 }
```

***

### glyphColor()

> **glyphColor**(`char`): \[`number`, `number`, `number`\]

Defined in: [FontManager.ts:127](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L127)

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

[P5AsciifyError](P5AsciifyError.md) If the character is not found in the font.

#### Example

```javascript
 function setupAsciify() {
     // Get the RGB color of the character 'A'
     const color = p5asciify.asciifier().fontManager.glyphColor('A');
     console.log(color);
 }
```

***

### glyphColors()

> **glyphColors**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [FontManager.ts:190](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/FontManager.ts#L190)

Gets an array of RGB colors for a given string of characters.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characters` | `string` \| `string`[] | `""` | A string of characters. |

#### Returns

\[`number`, `number`, `number`\][]

Array of RGB color values.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If a character is not found in the fonts available characters.

#### Example

```javascript
 function setupAsciify() {
     // Get the RGB colors for the characters 'ABC'
     const colors = p5asciify.asciifier().fontManager.glyphColors('ABC');
     console.log(colors);
 }
```
