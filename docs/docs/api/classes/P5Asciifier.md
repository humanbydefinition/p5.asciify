# Class: P5Asciifier

Defined in: [Asciifier.ts:19](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L19)

Manages a rendering pipeline for ASCII conversion, including font management, grid calculations, and ASCII renderers,
which is applied to the main p5.js canvas or a selected texture.

Instances of this class are created and managed through the [p5asciify](../variables/p5asciify.md) object _(see [P5AsciifierManager](P5AsciifierManager.md))_.

## Accessors

### fontManager

#### Get Signature

> **get** **fontManager**(): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [Asciifier.ts:707](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L707)

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

---

### grid

#### Get Signature

> **get** **grid**(): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Asciifier.ts:693](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L693)

Returns the [P5AsciifyGrid](P5AsciifyGrid.md) instance, which contains information about grid properties.

##### Example

```javascript
let framebuffer;

function setupAsciify() {
  // Can be useful to create a framebuffer with the same dimensions as the grid.
  framebuffer = createFramebuffer({
    width: p5asciify.asciifier().grid.cols,
    height: p5asciify.asciifier().grid.rows,
  });
}
```

##### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

---

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [Asciifier.ts:743](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L743)

Returns the ASCII output texture as a `p5.Framebuffer`, which can be used for further processing or rendering.
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

Defined in: [Asciifier.ts:254](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L254)

Sets the background color for the ascii renderers, occupying all the space not covered by cells in the grid.

To make the background transparent, pass an appropriate color value with an alpha value of `0`.

#### Parameters

| Parameter | Type                                                                 | Description                                                                                          |
| --------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `color`   | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the color is not a string, array or `p5.Color`.

#### Example

```javascript
function setupAsciify() {
  // Set the background color to black.
  p5asciify.asciifier().background("#000000");
}
```

---

### backgroundMode()

> **backgroundMode**(`mode`): `void`

Defined in: [Asciifier.ts:479](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L479)

Sets the background mode for the ASCII output.

If the mode is set to `fixed`, the background color set via [background](#background) will be used for transparent cells.

If the mode is set to `sampled`, the background color will be sampled from the pixel data of the texture that is being captured.

#### Parameters

| Parameter | Type                     | Default value | Description                                                         |
| --------- | ------------------------ | ------------- | ------------------------------------------------------------------- |
| `mode`    | `"fixed"` \| `"sampled"` | `"fixed"`     | The background mode to set. Can be either `"fixed"` or `"sampled"`. |

#### Returns

`void`

---

### fill()

> **fill**(`character`): `void`

Defined in: [Asciifier.ts:673](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L673)

Sets the p5.js `fill()` color to the color of the given character in the font texture atlas.

This method can be useful when drawing to a custom renderers `characterFramebuffer`,
which is used to convert the pixel data to ASCII characters.

#### Parameters

| Parameter   | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
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
  characterFramebuffer = asciifier
    .renderers()
    .get("custom").characterFramebuffer;
  primaryColorFramebuffer = asciifier
    .renderers()
    .get("custom").primaryColorFramebuffer;
  secondaryColorFramebuffer = asciifier
    .renderers()
    .get("custom").secondaryColorFramebuffer;
}

function draw() {
  // Draw a rectangle with the character 'A' to the character framebuffer
  characterFramebuffer.begin();
  clear();
  asciifier.fill("A");
  rect(0, 0, 10, 10);
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

---

### font()

> **font**(`font`, `options`): `void`

Defined in: [Asciifier.ts:204](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L204)

Sets the font for the ascii renderers in the rendering pipeline of the asciifier.

#### Parameters

| Parameter                  | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font`                     | `Font`                               | The `p5.Font` object to use for ASCII rendering.                                                                                                                                                                                                                                                                                                                                          |
| `options`                  | \{ `updateCharacters`: `boolean`; \} | An object containing options affecting what happens after the font is loaded.                                                                                                                                                                                                                                                                                                             |
| `options.updateCharacters` | `boolean`                            | If `true` _(default)_, updates set character sets in pre-defined renderers like the brightness-based ASCII renderer. This might cause an error if the new font does not contain the character sets used with the previous font. If `false`, those character sets are not updated, potentially leading to missing/different characters in the ASCII output if the mapping is not the same. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font parameter is invalid.

#### Example

```javascript
let font;

function preload() {
  // Load font during preload using p5.js `loadFont` function.
  font = loadFont("path/to/font.ttf");
}

function setupAsciify() {
  // Set the font to the default asciifier instance.
  p5asciify.asciifier().font(font);
}
```

---

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:139](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L139)

Sets the font size for the ASCII renderers of the asciifier.

#### Parameters

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
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

---

### gridDimensions()

> **gridDimensions**(`gridCols`, `gridRows`): `void`

Defined in: [Asciifier.ts:279](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L279)

Sets the grid dimensions for the ASCII renderers.
Calling this method will make the grid dimensions fixed, no longer adjusting automatically when the canvas size changes.

To make the grid dimensions responsive to the canvas size again, use the [gridResponsive](#gridresponsive) method.

#### Parameters

| Parameter  | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `gridCols` | `number` | The number of columns in the grid. |
| `gridRows` | `number` | The number of rows in the grid.    |

#### Returns

`void`

#### Example

```javascript
function setupAsciify() {
  // Set the grid dimensions to 100 columns, 50 rows.
  p5asciify.asciifier().gridDimensions(100, 50);
}
```

---

### gridResponsive()

> **gridResponsive**(`bool`): `void`

Defined in: [Asciifier.ts:299](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L299)

Adjust the grid dimensions to be responsive to the canvas size or fixed.

If `true`, the grid dimensions will be adjusted every time the canvas size changes to create a perfect grid on the x and y axes.

If `false`, the grid dimensions will be fixed and not change when the canvas size changes.

#### Parameters

| Parameter | Type      | Default value | Description                                                                |
| --------- | --------- | ------------- | -------------------------------------------------------------------------- |
| `bool`    | `boolean` | `true`        | Determines if the grid dimensions should be responsive to the canvas size. |

#### Returns

`void`

---

### loadJSON()

> **loadJSON**(`json`): `object`

Defined in: [Asciifier.ts:499](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L499)

Loads a JSON string or object and returns the framebuffers for the character, primary color, secondary color, transform, and rotation.

This method is useful for loading JSON exports from the [saveJSON](#savejson) method in custom renderers.
The framebuffers match the dimensions of the grid defined in the JSON.
Each framebuffer contains the pixel data for the respective properties,
which can be drawn to the respective custom renderers framebuffers via the `image()` function.

#### Parameters

| Parameter | Type                 | Description                        |
| --------- | -------------------- | ---------------------------------- |
| `json`    | `string` \| `object` | The JSON string or object to load. |

#### Returns

`object`

An object containing the framebuffers for character, primary color, secondary color, transform, and rotation.

| Name                        | Type          | Defined in                                                                                                                                  |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `characterFramebuffer`      | `Framebuffer` | [Asciifier.ts:500](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L500) |
| `primaryColorFramebuffer`   | `Framebuffer` | [Asciifier.ts:501](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L501) |
| `rotationFramebuffer`       | `Framebuffer` | [Asciifier.ts:504](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L504) |
| `secondaryColorFramebuffer` | `Framebuffer` | [Asciifier.ts:502](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L502) |
| `transformFramebuffer`      | `Framebuffer` | [Asciifier.ts:503](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L503) |

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the JSON format is invalid or unsupported.

---

### renderers()

> **renderers**(): [`P5AsciifyRendererManager`](../p5.asciify/namespaces/renderers/classes/P5AsciifyRendererManager.md)

Defined in: [Asciifier.ts:176](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L176)

Returns the [P5AsciifyRendererManager](../p5.asciify/namespaces/renderers/classes/P5AsciifyRendererManager.md), containing all ASCII renderers in the rendering pipeline of the asciifier.

#### Returns

[`P5AsciifyRendererManager`](../p5.asciify/namespaces/renderers/classes/P5AsciifyRendererManager.md)

The renderer manager.

#### Example

```javascript
let defaultBrightnessRenderer;

function setupAsciify() {
  // Fetch the default brightness renderer from the renderer manager.
  defaultBrightnessRenderer = p5asciify
    .asciifier()
    .renderers()
    .get("brightness");

  // Update any options for the renderer.
  defaultBrightnessRenderer.update({ invertMode: true });
}
```

---

### renderToCanvas()

> **renderToCanvas**(`bool`): `void`

Defined in: [Asciifier.ts:462](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L462)

Sets whether the ASCII output should be rendered to the canvas or not.

If this is set to `false`, the canvas will remain clear/empty until you start drawing stuff again in `drawAsciify()` after the `draw()`function finishes.
This is because `p5.asciify` wraps your `draw()` loop inside a framebuffer's `begin()` and `end()`.

By default, this is set to `true`, meaning the ASCII output will be rendered to the canvas **after** the `draw()` function ends,
but before the `drawAsciify()` function is called.

#### Parameters

| Parameter | Type      | Description                                            |
| --------- | --------- | ------------------------------------------------------ |
| `bool`    | `boolean` | `true` to render to the canvas, `false` to not render. |

#### Returns

`void`

---

### saveJSON()

> **saveJSON**(`options`): `void`

Defined in: [Asciifier.ts:346](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L346)

Saves the current ASCII output as a JSON file.

#### Parameters

| Parameter | Type                                                                                  | Description                           |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------- |
| `options` | [`JSONExportOptions`](../p5.asciify/namespaces/utils/interfaces/JSONExportOptions.md) | The options for saving the JSON file. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If no renderer is available to fetch ASCII output from.

---

### saveStrings()

> **saveStrings**(`filename`): `void`

Defined in: [Asciifier.ts:440](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L440)

Saves the ASCII output to a text file.

#### Parameters

| Parameter  | Type     | Description                                                                         |
| ---------- | -------- | ----------------------------------------------------------------------------------- |
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

---

### saveSVG()

> **saveSVG**(`options`): `void`

Defined in: [Asciifier.ts:330](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L330)

Saves the current ASCII output as an SVG file.

#### Parameters

| Parameter | Type                                                                                | Description                          |
| --------- | ----------------------------------------------------------------------------------- | ------------------------------------ |
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
      includeBackgrounds: false,
    });
  }
}
```

---

### toString()

> **toString**(): `string`

Defined in: [Asciifier.ts:421](https://github.com/humanbydefinition/p5.asciify/blob/4d58850eaa12d82328c25d81c99030b43e4030af/src/lib/Asciifier.ts#L421)

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
