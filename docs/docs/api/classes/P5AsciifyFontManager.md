# Class: P5AsciifyFontManager

Defined in: [FontManager.ts:11](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L11)

Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.

## Accessors

### characters

#### Get Signature

> **get** **characters**(): [`P5AsciifyCharacter`](../type-aliases/P5AsciifyCharacter.md)[]

Defined in: [FontManager.ts:421](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L421)

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

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [FontManager.ts:408](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L408)

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

Defined in: [FontManager.ts:392](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L392)

Returns the font size used for the texture containing all characters in the font.

##### Returns

`number`

---

### maxGlyphDimensions

#### Get Signature

> **get** **maxGlyphDimensions**(): `object`

Defined in: [FontManager.ts:372](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L372)

Returns the maximum width and height found in all the glyphs in the font.

##### Returns

`object`

| Name     | Type     | Defined in                                                                                                                                      |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `height` | `number` | [FontManager.ts:372](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L372) |
| `width`  | `number` | [FontManager.ts:372](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L372) |

---

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [FontManager.ts:377](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L377)

Returns the texture containing all characters in the font.

##### Returns

`Framebuffer`

---

### textureColumns

#### Get Signature

> **get** **textureColumns**(): `number`

Defined in: [FontManager.ts:382](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L382)

Returns the number of columns in the texture containing all characters in the font.

##### Returns

`number`

---

### textureRows

#### Get Signature

> **get** **textureRows**(): `number`

Defined in: [FontManager.ts:387](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L387)

Returns the number of rows in the texture containing all characters in the font.

##### Returns

`number`

## Methods

### getUnsupportedCharacters()

> **getUnsupportedCharacters**(`characters`): `string`[]

Defined in: [FontManager.ts:229](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L229)

Returns an array of characters that are not supported by the current font.

#### Parameters

| Parameter    | Type     | Description                        |
| ------------ | -------- | ---------------------------------- |
| `characters` | `string` | The string of characters to check. |

#### Returns

`string`[]

An array of unsupported characters. List is empty if all characters are supported.

#### Example

```javascript
function setupAsciify() {
  // Print a list of potentially unsupported characters.
  console.log(
    p5asciify.asciifier().fontManager.getUnsupportedCharacters(" .,ABC123"),
  );
}
```

---

### glyphColor()

> **glyphColor**(`char`): \[`number`, `number`, `number`\]

Defined in: [FontManager.ts:202](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L202)

Gets the color of a character in the font.

#### Parameters

| Parameter | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `char`    | `string` | The character to get the color for. |

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
  const color = p5asciify.asciifier().fontManager.glyphColor("A");
  console.log(color);
}
```

---

### glyphColors()

> **glyphColors**(`characters`): \[`number`, `number`, `number`\][]

Defined in: [FontManager.ts:263](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/FontManager.ts#L263)

Gets an array of RGB colors for a given string of characters.

#### Parameters

| Parameter    | Type                   | Default value | Description             |
| ------------ | ---------------------- | ------------- | ----------------------- |
| `characters` | `string` \| `string`[] | `""`          | A string of characters. |

#### Returns

\[`number`, `number`, `number`\][]

Array of RGB color values.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If a character is not found in the fonts available characters.

#### Example

```javascript
function setupAsciify() {
  // Get the RGB colors for the characters 'ABC'
  const colors = p5asciify.asciifier().fontManager.glyphColors("ABC");
  console.log(colors);
}
```
