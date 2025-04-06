[**p5.asciify v0.7.4**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyFontManager

# Class: P5AsciifyFontManager

Defined in: [FontManager.ts:8](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L8)

Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.

## Constructors

### new P5AsciifyFontManager()

> **new P5AsciifyFontManager**(`_p`, `_font`): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [FontManager.ts:41](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L41)

Creates a new `P5AsciifyFontManager` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_font` | `Font` | The font to use for ASCII rendering. |

#### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

## Accessors

### characterGlyphs

#### Get Signature

> **get** **characterGlyphs**(): `OpenTypeGlyph`[]

Defined in: [FontManager.ts:333](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L333)

An array of character glyphs in the set font with color assignments.

##### Example

```javascript
 function setupAsciify() {
     // Print the character glyph objects of the font to the console
     console.log(p5asciify.asciifier().fontManager.characterGlyphs);
 }
```

##### Returns

`OpenTypeGlyph`[]

***

### characters

#### Get Signature

> **get** **characters**(): `string`[]

Defined in: [FontManager.ts:320](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L320)

An array of supported characters in the set font.

##### Example

```javascript
 function setupAsciify() {
     // Print the supported characters in the font to the console
     console.log(p5asciify.asciifier().fontManager.characters);
 }
```

##### Returns

`string`[]

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [FontManager.ts:307](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L307)

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

Defined in: [FontManager.ts:291](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L291)

Returns the font size used for the texture atlas.

##### Returns

`number`

***

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontManager.ts:271](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L271)

Returns the maximum width and height found in all the glyphs in the font.

##### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height"></a> `height` | `number` | [FontManager.ts:271](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L271) |
| <a id="width"></a> `width` | `number` | [FontManager.ts:271](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L271) |

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontManager.ts:276](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L276)

Returns the texture containing all characters in the font.

##### Returns

`Framebuffer`

***

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [FontManager.ts:281](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L281)

Returns the number of columns in the texture containing all characters in the font.

##### Returns

`number`

***

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [FontManager.ts:286](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L286)

Returns the number of rows in the texture containing all characters in the font.

##### Returns

`number`

## Methods

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontManager.ts:138](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L138)

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

Defined in: [FontManager.ts:113](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L113)

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
     // Get the color of the character 'A'
     const color = p5asciify.asciifier().fontManager.glyphColor('A');
     console.log(color);
 }
```

***

### glyphColors()

> **glyphColors**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [FontManager.ts:179](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L179)

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
     const colors = p5asciify.asciifier().fontManager.glyphColors('ABC');
     console.log(colors);
 }
```

***

### setup()

> **setup**(`fontSize`): `void`

Defined in: [FontManager.ts:48](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/FontManager.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fontSize` | `number` |

#### Returns

`void`
