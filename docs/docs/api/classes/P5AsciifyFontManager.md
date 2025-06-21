# Class: P5AsciifyFontManager

Defined in: [FontManager.ts:11](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L11)

Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`P5AsciifyCharacter`](../type-aliases/P5AsciifyCharacter.md)[]

Defined in: [FontManager.ts:422](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L422)

An array of supported characters in the set font with additional information like unicode, and RGB color values.

##### Example

```javascript
function setupAsciify() {
  // Print the supported characters in the font to the console
  console.log(p5asciify.asciifier().fontManager.characters);
}
```

##### Returns

[`P5AsciifyCharacter`](../type-aliases/P5AsciifyCharacter.md)[]

---

### charactersString

#### Get Signature

> **get** **charactersString**(): `string`

Defined in: [FontManager.ts:438](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L438)

Returns all supported characters in the font as a single string.
Useful for quick access to the complete character set or for iteration purposes.

##### Example

```javascript
function setupAsciify() {
  // Get all supported characters as a string
  const allChars = p5asciify.asciifier().fontManager.charactersString;
  console.log("Font supports these characters:", allChars);
  console.log("Total character count:", allChars.length);
}
```

##### Returns

`string`

---

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [FontManager.ts:409](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L409)

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

---

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [FontManager.ts:393](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L393)

Returns the font size used for the texture containing all characters in the font.

##### Returns

`number`

---

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontManager.ts:373](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L373)

Returns the maximum width and height found in all the glyphs in the font.

##### Returns

`object`

| Name     | Type     | Defined in                                                                                                                                      |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `height` | `number` | [FontManager.ts:373](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L373) |
| `width`  | `number` | [FontManager.ts:373](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L373) |

---

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontManager.ts:378](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L378)

Returns the texture containing all characters in the font.

##### Returns

`Framebuffer`

---

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [FontManager.ts:383](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L383)

Returns the number of columns in the texture containing all characters in the font.

##### Returns

`number`

---

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [FontManager.ts:388](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L388)

Returns the number of rows in the texture containing all characters in the font.

##### Returns

`number`

## Methods

### glyphColor()

> **glyphColor**(`char`): `Color`

Defined in: [FontManager.ts:208](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L208)

Gets the color of a character in the font.

#### Parameters

| Parameter | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `char`    | `string` | The character to get the color for. |

#### Returns

`Color`

An array containing the RGB color values for the character,
which can be used to set the fill color when drawing to a custom renderers `characterFramebuffer`
to convert those pixels into the selected character.

#### Throws

If the character is not found in the font.

#### Example

```javascript
function setupAsciify() {
  // Get the RGB color of the character 'A'
  const color = p5asciify.asciifier().fontManager.glyphColor("A");
  console.log(color);
}
```

---

### glyphColors()

> **glyphColors**(`characters`): `Color`[]

Defined in: [FontManager.ts:257](https://github.com/humanbydefinition/p5.asciify/blob/e388e858755b4fb844e13d1aa48ab2d219cb215c/src/lib/FontManager.ts#L257)

Gets an array of RGB colors for a given string of characters.

#### Parameters

| Parameter    | Type                   | Default value | Description             |
| ------------ | ---------------------- | ------------- | ----------------------- |
| `characters` | `string` \| `string`[] | `""`          | A string of characters. |

#### Returns

`Color`[]

Array of RGB color values.

#### Throws

If a character is not found in the fonts available characters.

#### Example

```javascript
function setupAsciify() {
  // Get the RGB colors for the characters 'ABC'
  const colors = p5asciify.asciifier().fontManager.glyphColors("ABC");
  console.log(colors);
}
```
