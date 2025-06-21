# Class: P5AsciifyEdgeRenderer

Defined in: [renderers/2d/feature/edge/EdgeAsciiRenderer.ts:53](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/edge/EdgeAsciiRenderer.ts#L53)

An ASCII renderer that applies ASCII edges to the input sketch by using edge detection.

## Extends

- [`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md)\<[`EdgeAsciiRendererOptions`](../../../../../interfaces/EdgeAsciiRendererOptions.md)\>

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../../../../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:393](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L393)

Get the [P5AsciifyColorPalette](../../../../../../../../classes/P5AsciifyColorPalette.md) object containing colors that correspond to the defined character set.

##### Returns

[`P5AsciifyColorPalette`](../../../../../../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`characterColorPalette`](P5AsciifyAbstractFeatureRenderer2D.md#charactercolorpalette)

---

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:616](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L616)

Get the character framebuffer, whose pixels define the ASCII characters to use in the grid cells.

Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings.
In `'custom2D'` renderers, you must write to it manually in your `draw()` function.

##### Example

```javascript
let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;

let asciifier;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function setupAsciify() {
  // Get the asciifier instance
  asciifier = p5asciify.asciifier();

  // Enable the default custom renderer
  asciifier.renderers().get("custom2D").enable();

  // Assign the ascii renderer's framebuffers to a global variable
  characterFramebuffer = asciifier
    .renderers()
    .get("custom2D").characterFramebuffer;
  primaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").primaryColorFramebuffer;
  secondaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").secondaryColorFramebuffer;
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

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`characterFramebuffer`](P5AsciifyAbstractFeatureRenderer2D.md#characterframebuffer)

---

### framebufferOptions

#### Get Signature

> **get** **framebufferOptions**(): `object`

Defined in: [renderers/AsciiRenderer.ts:563](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L563)

Get the framebuffer settings used to configure all internal framebuffers for the renderer.

##### Returns

| Name                | Type      | Description                                                                                                                                                 | Defined in                                                                                                                                                            |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `antialias?`        | `boolean` | Whether to perform anti-aliasing. If set to `true`, 2 samples will be used by default. The number of samples can also be set (e.g., 4). Default is `false`. | [renderers/AsciiRenderer.ts:53](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L53) |
| `channels?`         | `number`  | Whether to store `RGB` or `RGBA` color channels. Default is to match the main canvas, which is `RGBA`.                                                      | [renderers/AsciiRenderer.ts:77](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L77) |
| `density`           | `number`  | The pixel density of the framebuffers. Always fixed to 1, since they are used for offscreen rendering.                                                      | [renderers/AsciiRenderer.ts:62](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L62) |
| `depth?`            | `boolean` | Whether to include a depth buffer. Default is `true`.                                                                                                       | [renderers/AsciiRenderer.ts:59](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L59) |
| `depthFormat?`      | `any`     | Data format of depth information. Either `UNSIGNED_INT` or `FLOAT`. Default is `UNSIGNED_INT`.                                                              | [renderers/AsciiRenderer.ts:71](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L71) |
| `format?`           | `number`  | Data format of the texture. Either `UNSIGNED_BYTE`, `FLOAT`, or `HALF_FLOAT`. Default is `UNSIGNED_BYTE`.                                                   | [renderers/AsciiRenderer.ts:74](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L74) |
| `height`            | `number`  | Height of the framebuffer. Always matches the grid rows.                                                                                                    | [renderers/AsciiRenderer.ts:68](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L68) |
| `stencil?`          | `boolean` | Whether to include a stencil buffer for masking. `depth` must be `true` for this feature to work. Defaults to the value of `depth` _(which is `true`)_.     | [renderers/AsciiRenderer.ts:80](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L80) |
| `textureFiltering?` | `any`     | How to read values from the framebuffer. Either `LINEAR` (nearby pixels will be interpolated) or `NEAREST` (no interpolation). Default is `NEAREST`.        | [renderers/AsciiRenderer.ts:56](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L56) |
| `width`             | `number`  | Width of the framebuffer. Always matches the grid columns.                                                                                                  | [renderers/AsciiRenderer.ts:65](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L65) |

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`framebufferOptions`](P5AsciifyAbstractFeatureRenderer2D.md#framebufferoptions)

---

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:323](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L323)

Get the set options for the ASCII renderer.

##### Example

```javascript
function setupAsciify() {
  // Get the brightness renderer options
  const brightnessOptions = p5asciify
    .asciifier()
    .renderers()
    .get("brightness")
    .options();
  console.log(brightnessOptions);
}
```

##### Returns

`T`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`options`](P5AsciifyAbstractFeatureRenderer2D.md#options)

---

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:377](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L377)

Get the primary color framebuffer, whose pixels define the character colors of the grid cells.

Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings.
In `'custom2D'` renderers, you must write to it manually in your `draw()` function.

##### Example

```javascript
let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;

let asciifier;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function setupAsciify() {
  // Get the asciifier instance
  asciifier = p5asciify.asciifier();

  // Enable the default custom renderer
  asciifier.renderers().get("custom2D").enable();

  // Assign the ascii renderer's framebuffers to a global variable
  characterFramebuffer = asciifier
    .renderers()
    .get("custom2D").characterFramebuffer;
  primaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").primaryColorFramebuffer;
  secondaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").secondaryColorFramebuffer;
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

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`primaryColorFramebuffer`](P5AsciifyAbstractFeatureRenderer2D.md#primarycolorframebuffer)

---

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:557](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L557)

Get the rotation framebuffer, whose pixels define the rotation angle of each character in the grid.

Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings.
In `'custom2D'` renderers, you must write to it manually in your `draw()` function.

##### Example

```javascript
let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;
let rotationFramebuffer;

let asciifier;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function setupAsciify() {
  // Get the asciifier instance
  asciifier = p5asciify.asciifier();

  // Enable the default custom renderer
  asciifier.renderers().get("custom2D").enable();

  // Assign the ascii renderer's framebuffers to a global variable
  characterFramebuffer = asciifier
    .renderers()
    .get("custom2D").characterFramebuffer;
  primaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").primaryColorFramebuffer;
  secondaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").secondaryColorFramebuffer;
  rotationFramebuffer = asciifier
    .renderers()
    .get("custom2D").rotationFramebuffer;
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

  // Rotates all characters in the grid by X degrees.
  // Utilize the red color channel for the rotation angle.
  rotationFramebuffer.begin();
  background("rgb(25%, 0%, 0%)"); // 25% of 360 degrees = 90 degrees
  rotationFramebuffer.end();
}
```

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`rotationFramebuffer`](P5AsciifyAbstractFeatureRenderer2D.md#rotationframebuffer)

---

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:431](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L431)

Get the secondary color framebuffer, whose pixels define the background colors of the grid cells.

Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings.
In `'custom2D'` renderers, you must write to it manually in your `draw()` function.

##### Example

```javascript
let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;

let asciifier;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function setupAsciify() {
  // Get the asciifier instance
  asciifier = p5asciify.asciifier();

  // Enable the default custom renderer
  asciifier.renderers().get("custom2D").enable();

  // Assign the ascii renderer's framebuffers to a global variable
  characterFramebuffer = asciifier
    .renderers()
    .get("custom2D").characterFramebuffer;
  primaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").primaryColorFramebuffer;
  secondaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").secondaryColorFramebuffer;
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

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`secondaryColorFramebuffer`](P5AsciifyAbstractFeatureRenderer2D.md#secondarycolorframebuffer)

---

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:496](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L496)

Get the transform framebuffer, where each pixels color channel defines a different transformation:

- Red channel: Swap the character and background colors of the grid cells.
- Green channel: Flip the ASCII characters horizontally.
- Blue channel: Flip the ASCII characters vertically.

Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings.
In `'custom2D'` renderers, you must write to it manually in your `draw()` function.

##### Example

```javascript
let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;
let transformFramebuffer;

let asciifier;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function setupAsciify() {
  // Get the asciifier instance
  asciifier = p5asciify.asciifier();

  // Enable the default custom renderer
  asciifier.renderers().get("custom2D").enable();

  // Assign the ascii renderer's framebuffers to a global variable
  characterFramebuffer = asciifier
    .renderers()
    .get("custom2D").characterFramebuffer;
  primaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").primaryColorFramebuffer;
  secondaryColorFramebuffer = asciifier
    .renderers()
    .get("custom2D").secondaryColorFramebuffer;
  transformFramebuffer = asciifier
    .renderers()
    .get("custom2D").transformFramebuffer;
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

  // Swap the character and background colors of all grid cells,
  // and flip the ASCII characters horizontally.
  transformFramebuffer.begin();
  background(255, 255, 0);
  transformFramebuffer.end();
}
```

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`transformFramebuffer`](P5AsciifyAbstractFeatureRenderer2D.md#transformframebuffer)

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:235](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L235)

Set the background color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| `color`   | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Throws

If color is not a p5.Color object.

#### Example

```javascript
function setupAsciify() {
  // Set the cell background color to red for the brightness renderer.
  // (Is applied if the background color mode of this renderer is set to 'fixed')
  p5asciify
    .asciifier()
    .renderers()
    .get("brightness")
    .backgroundColor(color(255, 0, 0));
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`backgroundColor`](P5AsciifyAbstractFeatureRenderer2D.md#backgroundcolor)

---

### backgroundColorMode()

> **backgroundColorMode**(`mode`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:300](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L300)

Sets the color mode for the grid cell background.

#### Parameters

| Parameter | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| `mode`    | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

#### Example

```javascript
function setupAsciify() {
  // Set the background color mode to 'sampled' for the brightness renderer.
  p5asciify
    .asciifier()
    .renderers()
    .get("brightness")
    .backgroundColorMode("sampled");
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`backgroundColorMode`](P5AsciifyAbstractFeatureRenderer2D.md#backgroundcolormode)

---

### characterColor()

> **characterColor**(`color`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:168](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L168)

Set the color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| `color`   | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Throws

If color is not a p5.Color object.

#### Example

```javascript
function setupAsciify() {
  // Set the character color to green for the brightness renderer.
  // (Is applied if the character color mode of this renderer is set to 'fixed')
  p5asciify
    .asciifier()
    .renderers()
    .get("brightness")
    .characterColor(color(0, 255, 0));
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`characterColor`](P5AsciifyAbstractFeatureRenderer2D.md#charactercolor)

---

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:263](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L263)

Sets the color mode for ASCII characters.

#### Parameters

| Parameter | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| `mode`    | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

#### Example

```javascript
function setupAsciify() {
  // Set the character color mode to 'fixed' for the brightness renderer.
  p5asciify
    .asciifier()
    .renderers()
    .get("brightness")
    .characterColorMode("fixed");
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`characterColorMode`](P5AsciifyAbstractFeatureRenderer2D.md#charactercolormode)

---

### characters()

> **characters**(`characters`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:54](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L54)

Set the characters for the character set.

#### Parameters

| Parameter    | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `characters` | `string` | The characters to set for the character set. |

#### Returns

`void`

#### Throws

If characters is not a string.

#### Example

```javascript
function setupAsciify() {
  // Set the character set to '.:-=+*#%@' for the brightness renderer.
  p5asciify.asciifier().renderers().get("brightness").characters(".:-=+*#%@");
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`characters`](P5AsciifyAbstractFeatureRenderer2D.md#characters)

---

### disable()

> **disable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:307](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L307)

Disable the renderer.

Disabling the renderer will clear all framebuffers,
and prevent the renderer from being executed in the rendering pipeline.

#### Returns

`boolean`

The new state of the renderer.

#### Example

```javascript
function keyPressed() {
  if (key === "d") {
    // Disable the brightness renderer
    p5asciify.asciifier().renderers().get("brightness").disable();
  } else if (key === "e") {
    // Enable the brightness renderer
    p5asciify.asciifier().renderers().get("brightness").enable();
  }
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`disable`](P5AsciifyAbstractFeatureRenderer2D.md#disable)

---

### enable()

> **enable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:282](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L282)

Enable the renderer.

#### Returns

`boolean`

The new state of the renderer.

#### Example

```javascript
function keyPressed() {
  if (key === "d") {
    // Disable the brightness renderer
    p5asciify.asciifier().renderers().get("brightness").disable();
  } else if (key === "e") {
    // Enable the brightness renderer
    p5asciify.asciifier().renderers().get("brightness").enable();
  }
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`enable`](P5AsciifyAbstractFeatureRenderer2D.md#enable)

---

### enabled()

> **enabled**(`enabled?`): `boolean`

Defined in: [renderers/AsciiRenderer.ts:231](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L231)

Enable or disable the renderer.

#### Parameters

| Parameter  | Type      | Description                                |
| ---------- | --------- | ------------------------------------------ |
| `enabled?` | `boolean` | Whether to enable or disable the renderer. |

#### Returns

`boolean`

The current/new state of the renderer.

#### Throws

If the provided enabled value is not a boolean.

#### Example

```javascript
function keyPressed() {
  if (key === "d") {
    // Disable the brightness renderer
    p5asciify.asciifier().renderers().get("brightness").enabled(false);
  } else if (key === "e") {
    // Enable the brightness renderer
    p5asciify.asciifier().renderers().get("brightness").enabled(true);
  }
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`enabled`](P5AsciifyAbstractFeatureRenderer2D.md#enabled)

---

### flipHorizontally()

> **flipHorizontally**(`flip`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:187](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L187)

Define whether to flip the ASCII characters horizontally.

#### Parameters

| Parameter | Type      | Description                                  |
| --------- | --------- | -------------------------------------------- |
| `flip`    | `boolean` | Whether to flip the characters horizontally. |

#### Returns

`void`

#### Throws

If flip is not a boolean.

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`flipHorizontally`](P5AsciifyAbstractFeatureRenderer2D.md#fliphorizontally)

---

### flipVertically()

> **flipVertically**(`flip`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:206](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L206)

Define whether to flip the ASCII characters vertically.

#### Parameters

| Parameter | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `flip`    | `boolean` | Whether to flip the characters vertically. |

#### Returns

`void`

#### Throws

If flip is not a boolean.

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`flipVertically`](P5AsciifyAbstractFeatureRenderer2D.md#flipvertically)

---

### invert()

> **invert**(`invert`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:84](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L84)

Swap the colors of the ASCII character and cell background colors.

#### Parameters

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `invert`  | `boolean` | Whether to swap the colors. |

#### Returns

`void`

#### Throws

If invert is not a boolean.

#### Example

```javascript
function setupAsciify() {
  // Enable invert mode for the brightness renderer.
  p5asciify.asciifier().renderers().get("brightness").invert(true);
}
```

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`invert`](P5AsciifyAbstractFeatureRenderer2D.md#invert)

---

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:128](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L128)

Define the rotation angle of all characters in the grid affected by the renderer in degrees.

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `angle`   | `number` | The rotation angle in degrees. |

#### Returns

`void`

#### Remarks

Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.

#### Example

```javascript
function setupAsciify() {
  // Rotate all characters in the grid by 90 degrees for the brightness renderer.
  p5asciify.asciifier().renderers().get("brightness").rotation(90);
}
```

#### Throws

If angle is not a number.

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`rotation`](P5AsciifyAbstractFeatureRenderer2D.md#rotation)

---

### sampleThreshold()

> **sampleThreshold**(`value`): `void`

Defined in: [renderers/2d/feature/edge/EdgeAsciiRenderer.ts:162](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/edge/EdgeAsciiRenderer.ts#L162)

Set the sample threshold value for the edge detection algorithm.

#### Parameters

| Parameter | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `value`   | `number` | The sample threshold value for the edge detection algorithm. |

#### Returns

`void`

#### Example

```javascript
function setupAsciify() {
  // Set the sample threshold value for the edge detection algorithm
  p5asciify.renderers().get("edge").sampleThreshold(32);
}
```

#### Throws

If the value is not a valid number greater than or equal to 0.

---

### setFramebufferOptions()

> **setFramebufferOptions**(`settings`): `void`

Defined in: [renderers/AsciiRenderer.ts:143](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/AsciiRenderer.ts#L143)

Update framebuffer settings (except width/height/density) and recreate all framebuffers.

This method allows you to configure the internal framebuffers used by the renderer.
Note that width, height, and density are managed internally and cannot be modified.

For a full list of available settings, see the `p5.createFramebuffer()` documentation:
[https://p5js.org/reference/p5/createFramebuffer/](https://p5js.org/reference/p5/createFramebuffer/)

#### Parameters

| Parameter                    | Type                                                                                                                                                                            | Description                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `settings`                   | \{ `antialias?`: `boolean`; `channels?`: `number`; `depth?`: `boolean`; `depthFormat?`: `number`; `format?`: `number`; `stencil?`: `boolean`; `textureFiltering?`: `number`; \} | Available framebuffer settings. `width`, `height`, and `density` are managed internally and cannot be modified.                                               |
| `settings.antialias?`        | `boolean`                                                                                                                                                                       | Whether to perform anti-aliasing. If set to `true`, 2 samples will be used by default. The number of samples can also be set _(e.g., 4)_. Default is `false`. |
| `settings.channels?`         | `number`                                                                                                                                                                        | Whether to store `RGB` or `RGBA` color channels. Default is to match the main canvas which is `RGBA`.                                                         |
| `settings.depth?`            | `boolean`                                                                                                                                                                       | Whether to include a depth buffer. Default is `true`.                                                                                                         |
| `settings.depthFormat?`      | `number`                                                                                                                                                                        | Data format of depth information, either `UNSIGNED_INT` or `FLOAT`. Default is `UNSIGNED_INT`.                                                                |
| `settings.format?`           | `number`                                                                                                                                                                        | Data format of the texture, either `UNSIGNED_BYTE`, `FLOAT`, or `HALF_FLOAT`. Default is `UNSIGNED_BYTE`.                                                     |
| `settings.stencil?`          | `boolean`                                                                                                                                                                       | Whether to include a stencil buffer for masking. `depth` must be `true` for this feature to work. Defaults to the value of `depth` which is `true`.           |
| `settings.textureFiltering?` | `number`                                                                                                                                                                        | How to read values from the framebuffer. Either `LINEAR` _(nearby pixels will be interpolated)_ or `NEAREST` _(no interpolation)_. Default is `NEAREST`.      |

#### Returns

`void`

#### Inherited from

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`setFramebufferOptions`](P5AsciifyAbstractFeatureRenderer2D.md#setframebufferoptions)

---

### sobelThreshold()

> **sobelThreshold**(`value`): `void`

Defined in: [renderers/2d/feature/edge/EdgeAsciiRenderer.ts:128](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/edge/EdgeAsciiRenderer.ts#L128)

Set the threshold value for the Sobel edge detection algorithm.

#### Parameters

| Parameter | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| `value`   | `number` | The threshold value for the Sobel edge detection algorithm. |

#### Returns

`void`

#### Example

```javascript
function setupAsciify() {
  // Set the threshold value for the Sobel edge detection algorithm
  p5asciify.renderers().get("edge").sobelThreshold(0.5);
}
```

#### Throws

If the value is not a valid number between 0 and 1.

---

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/2d/feature/edge/EdgeAsciiRenderer.ts:183](https://github.com/humanbydefinition/p5.asciify/blob/1b5a6cba0c455984ce43c63ef29d11c26fd6ec65/src/lib/renderers/2d/feature/edge/EdgeAsciiRenderer.ts#L183)

Updates renderer options.

#### Parameters

| Parameter    | Type                                                                                             | Description                |
| ------------ | ------------------------------------------------------------------------------------------------ | -------------------------- |
| `newOptions` | `Partial`\<[`EdgeAsciiRendererOptions`](../../../../../interfaces/EdgeAsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`

#### Example

```javascript
function setupAsciify() {
  // Update the brightness renderer options
  p5asciify
    .asciifier()
    .renderers()
    .get("brightness")
    .update({
      enabled: true,
      characterColor: color(255, 0, 0),
      backgroundColor: color(0, 0, 255),
      characters: ".:-=+*#%@",
      invertMode: true,
      rotationAngle: 90,
      // ...
    });
}
```

#### Overrides

[`P5AsciifyAbstractFeatureRenderer2D`](P5AsciifyAbstractFeatureRenderer2D.md).[`update`](P5AsciifyAbstractFeatureRenderer2D.md#update)
