[**p5.asciify v0.8.3-beta.2**](../README.md)

***

[p5.asciify](../README.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:17](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L17)

Manages a rendering pipeline for ASCII conversion, including font management, grid calculations, and ASCII renderers, 
which is applied to the main p5.js canvas or a selected texture.

Instances of this class are created and managed through the [p5asciify](../variables/p5asciify.md) object *(see [P5AsciifierManager](P5AsciifierManager.md))*.

## Constructors

### Constructor

> **new P5Asciifier**(): `P5Asciifier`

#### Returns

`P5Asciifier`

## Accessors

### fontManager

#### Get Signature

> **get** **fontManager**(): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [Asciifier.ts:483](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L483)

Returns the font manager, which manages the font and provides methods to access font properties like available characters and their corresponding rgb values,
and the texture containing all the characters in the font.

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

Defined in: [Asciifier.ts:469](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L469)

Returns the [P5AsciifyGrid](P5AsciifyGrid.md) instance, which contains information about grid properties, and methods to modify the grid.

##### Example

```javascript
let framebuffer;

function setupAsciify() {
     // Can be useful to create a framebuffer with the same dimensions as the grid.
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

Defined in: [Asciifier.ts:519](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L519)

Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
Can also be used via the p5.js `texture()` function.

##### Example

```javascript
 // Draw something on the canvas to asciify.
 function draw() {
     background(0);
     fill(255);
     box(100);
 }

 // Apply the asciified output as a texture to a 3D box.
 function drawAsciify() {
     orbitControl();

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

Defined in: [Asciifier.ts:210](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L210)

Sets the background color for the ascii renderers, occupying all the space not covered by cells in the grid.

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

Defined in: [Asciifier.ts:449](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L449)

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

Defined in: [Asciifier.ts:168](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L168)

Sets the font for the ascii renderers in the rendering pipeline of the asciifier.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `Font` | The `p5.Font` object to use for ASCII rendering. |
| `options` | \{ `updateCharacters`: `boolean`; \} | An object containing options affecting what happens after the font is loaded. |
| `options.updateCharacters` | `boolean` | If `true` *(default)*, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer. This might throw an error if the new font does not contain the character sets used with the previous font. If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font parameter is invalid.

#### Example

```javascript
 let font;

 function preload() {
     // Load font during preload using p5.js `loadFont` function.
     font = loadFont('path/to/font.ttf');
 }

 function setupAsciify() {
     // Set the font to the default asciifier instance.
     p5asciify.asciifier().font(font);
 }
```

***

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:109](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L109)

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

Defined in: [Asciifier.ts:236](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L236)

Sets the grid dimensions for the ASCII renderers. 
Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.

To make the grid responsive to the canvas size again, use the [gridResponsive](#gridresponsive) method.

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

Defined in: [Asciifier.ts:250](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L250)

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

> **renderers**(): [`P5AsciifyRendererManager`](../p5.asciify/namespaces/renderers/classes/P5AsciifyRendererManager.md)

Defined in: [Asciifier.ts:140](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L140)

Returns the [P5AsciifyRendererManager](../p5.asciify/namespaces/renderers/classes/P5AsciifyRendererManager.md), containing all ASCII renderers in the rendering pipeline of the asciifier.

#### Returns

[`P5AsciifyRendererManager`](../p5.asciify/namespaces/renderers/classes/P5AsciifyRendererManager.md)

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

### saveJSON()

> **saveJSON**(`options`): `void`

Defined in: [Asciifier.ts:292](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L292)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `JSONExportOptions` |

#### Returns

`void`

***

### saveStrings()

> **saveStrings**(`filename`): `void`

Defined in: [Asciifier.ts:386](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L386)

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

### saveSVG()

> **saveSVG**(`options`): `void`

Defined in: [Asciifier.ts:281](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L281)

Saves the current ASCII output as an SVG file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`SVGExportOptions`](../p5.asciify/namespaces/utils/interfaces/SVGExportOptions.md) | The options for saving the SVG file. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available to fetch ASCII output from.

#### Example

```javascript
function drawAsciify() {
    // Save the ASCII output as an SVG file with default options
    if (frameCount === 60) {
        p5asciify.asciifier().saveSVG("asciify_output");
    }
    
    // Save without cell background rectangles
    if (frameCount === 120) {
        p5asciify.asciifier().saveSVG({
            filename: "asciify_clean",
            includeBackgrounds: false
        });
    }
}
```

***

### toString()

> **toString**(): `string`

Defined in: [Asciifier.ts:367](https://github.com/humanbydefinition/p5.asciify/blob/6d72ea658c8d5e1472926d21bdf01b6d105bb13a/src/lib/Asciifier.ts#L367)

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
