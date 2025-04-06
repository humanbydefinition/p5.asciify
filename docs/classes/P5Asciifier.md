[**p5.asciify v0.7.4**](../README.md)

***

[p5.asciify](../README.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:15](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L15)

Manages a rendering pipeline for ASCII conversion, including font management, grid calculations, and ASCII renderers, 
which is applied to the main p5.js canvas or a selected texture.

Instances of this class are created and managed through the [p5asciify](../variables/p5asciify.md) object *(see [P5AsciifierManager](P5AsciifierManager.md))*.

## Accessors

### canvasFlag

#### Get Signature

> **get** **canvasFlag**(): `boolean`

Defined in: [Asciifier.ts:495](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L495)

Returns the flag to determine if the p5.js canvas is being recorded into a framebuffer to asciify,
or if a custom framebuffer is being used instead.

Returns `true` if the p5.js canvas is used, otherwise `false`.

##### Returns

`boolean`

***

### captureFramebuffer

#### Get Signature

> **get** **captureFramebuffer**(): `Framebuffer`

Defined in: [Asciifier.ts:462](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L462)

Retrieves the framebuffer that contains the content to asciify.

The returned framebuffer either contains everything drawn on the p5.js main canvas, or a custom framebuffer if set during initialization.

##### Returns

`Framebuffer`

***

### fontManager

#### Get Signature

> **get** **fontManager**(): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [Asciifier.ts:455](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L455)

Returns the font manager, which manages the font and provides methods to access font properties like available characters and their corresponding rgb values.

##### Example

```javascript
 function setupAsciify() {
     // Print all existing characters in the font to the console.
     console.log(p5asciify.asciifier().fontManager.characters);
 }
```

##### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

***

### grid

#### Get Signature

> **get** **grid**(): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Asciifier.ts:442](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L442)

Returns the [P5AsciifyGrid](P5AsciifyGrid.md) instance, which contains information about grid properties, and methods to modify the grid.

##### Example

```javascript
let framebuffer;

function setupAsciify() {
     // Can also be useful to create a framebuffer with the same dimensions as the grid.

     framebuffer = createFramebuffer({
         width: p5asciify.asciifier().grid.cols, 
         height: p5asciify.asciifier().grid.rows
     });
}
```

##### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [Asciifier.ts:487](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L487)

Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
Can also be used via the p5.js `texture()` function.

##### Example

```javascript
 // Draw something on the canvas to asciify.
 function draw() {
     box(100);
 }

 function drawAsciify() {
     orbitControl();

     // Apply the asciified output as a texture to a 3D box.
     clear();
     texture(p5asciify.asciifier().texture);
     rotateX(frameCount * 0.01);
     rotateY(frameCount * 0.01);
     box(100);
 }
```

##### Returns

`Framebuffer`

## Methods

### background()

> **background**(`color`): `void`

Defined in: [Asciifier.ts:230](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L230)

Sets the background color for the ascii renderers, occupying all the space not covered by voxels in the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the color is not a string, array or p5.Color.

#### Example

```javascript
 function setupAsciify() {
     // Set the background color to black.
     p5asciify.asciifier().background('#000000');
 }
```

***

### fill()

> **fill**(`character`): `void`

Defined in: [Asciifier.ts:421](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L421)

Sets the p5.js `fill()` color to the color of the given character in the font texture atlas.

This method can be useful when drawing to a custom renderers `characterFramebuffer`, 
which is used to convert the pixel data to ASCII characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | `string` | The character to get the color for. |

#### Returns

`void`

#### Example

```javascript
 let characterFramebuffer;
 let primaryColorFramebuffer;
 let secondaryColorFramebuffer;

 let asciifier;

 function setup() {
     createCanvas(400, 400, WEBGL);
 }

 function setupAsciify() {
     asciifier = p5asciify.asciifier();

     // Enable the default custom renderer
     asciifier.renderers().get("custom").enable();
     
     // Assign the ascii renderer's character framebuffer to a global variable
     characterFramebuffer = asciifier.renderers().get("custom").characterFramebuffer;
     primaryColorFramebuffer = asciifier.renderers().get("custom").primaryColorFramebuffer;
     secondaryColorFramebuffer = asciifier.renderers().get("custom").secondaryColorFramebuffer;
 }

 function draw() {
     // Draw a rectangle with the character 'A' to the character framebuffer
     characterFramebuffer.begin();
     clear();
     asciifier.fill("A");
     rect(0, 0, 100, 100);
     characterFramebuffer.end();

     // Makes all ascii characters on the grid white.
     primaryColorFramebuffer.begin();
     background(255);
     primaryColorFramebuffer.end();

     // Makes all cell background colors black.
     secondaryColorFramebuffer.begin();
     background(0);
     secondaryColorFramebuffer.end();
 }
```

***

### font()

> **font**(`font`, `options`): `void`

Defined in: [Asciifier.ts:188](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L188)

Sets the font for the ascii renderers in the rendering pipeline of the asciifier.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `Font` | The `p5.Font` object to use for ASCII rendering. |
| `options` | \{ `updateCharacters`: `boolean`; \} | An object containing options affecting what happens after the font is loaded. |
| `options.updateCharacters` | `boolean` | If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer. This might throw an error if the new font does not contain the characters of the previous font. If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font parameter is invalid.

#### Example

```javascript
 let font;

 function preload() {
     // Load font during preload using p5.js loadFont function.
     font = loadFont('path/to/font.ttf');
 }

 function setupAsciify() {
     // Set the font to the loaded font.
     p5asciify.asciifier().font(font);
 }
```

***

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:129](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L129)

Sets the font size for the ASCII renderers of the asciifier.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Set the font size to 32 to use for all ASCII renderers of the asciifier.
     p5asciify.asciifier().fontSize(32);
 }
```

***

### gridDimensions()

> **gridDimensions**(`gridCols`, `gridRows`): `void`

Defined in: [Asciifier.ts:252](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L252)

Sets the grid dimensions for the ASCII renderers. 
Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.

To make the grid responsive to the canvas size again, use the [gridResponsive](P5Asciifier.md#gridresponsive) method.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `gridCols` | `number` | The number of columns in the grid. |
| `gridRows` | `number` | The number of rows in the grid. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Set the grid dimensions to 100 columns, 50 rows.
     p5asciify.asciifier().gridDimensions(100, 50);
 }
```

***

### gridResponsive()

> **gridResponsive**(`bool`): `void`

Defined in: [Asciifier.ts:266](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L266)

Adjust the grid dimensions to be responsive to the canvas size or fixed.

If `true`, the grid dimensions will be adjusted every time the canvas size changes to create a perfect grid on the x and y axes.

If `false`, the grid dimensions will be fixed and not change when the canvas size changes.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `bool` | `boolean` | `true` | Determines if the grid dimensions should be responsive to the canvas size. |

#### Returns

`void`

***

### renderers()

> **renderers**(): [`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md)

Defined in: [Asciifier.ts:160](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L160)

Returns the [P5AsciifyRendererManager](../namespaces/renderers/classes/P5AsciifyRendererManager.md), containing all ASCII renderers in the rendering pipeline of the asciifier.

#### Returns

[`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md)

The renderer manager.

#### Example

```javascript
 let defaultBrightnessRenderer;

 function setupAsciify() {
     // Fetch the default brightness renderer from the renderer manager.
     defaultBrightnessRenderer = p5asciify.asciifier().renderers().get("brightness");

     // Update any options for the renderer.
     defaultBrightnessRenderer.update({ invertMode: true });
 }
```

***

### saveStrings()

> **saveStrings**(`filename`): `void`

Defined in: [Asciifier.ts:358](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L358)

Saves the ASCII output to a text file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filename` | `string` | The filename to save the text file as. If not provided, a default filename is used. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available to fetch ASCII output from.

#### Example

```javascript
function drawAsciify() {
    // Save the ASCII output to a text file.
     if (frameCount === 11100110110111101101100) {
        p5asciify.asciifier().saveStrings("ascii_output");
    }
}
```

***

### toString()

> **toString**(): `string`

Defined in: [Asciifier.ts:339](https://github.com/humanbydefinition/p5.asciify/blob/9bc9e13422f8092690e25d564658494cfe17130e/src/lib/Asciifier.ts#L339)

Returns the current ASCII output as a string.

#### Returns

`string`

Multi-line string representation of the ASCII output.

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available to fetch ASCII output from.

#### Example

```javascript
 function drawAsciify() {
     // Print the ASCII output to the console.
     if (frameCount === 1101100011101010110111001100001) {
         console.log(p5asciify.asciifier().toString());
     }
 }
```
