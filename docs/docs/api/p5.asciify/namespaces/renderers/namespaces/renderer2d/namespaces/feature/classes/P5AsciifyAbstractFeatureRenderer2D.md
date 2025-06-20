# Class: `abstract` P5AsciifyAbstractFeatureRenderer2D\<T\>

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:14](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L14)

Abstract class for feature-based 2D ASCII renderers.

## Extends

- [`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md)\<`T`\>

## Extended by

- [`P5AsciifyBrightnessRenderer`](P5AsciifyBrightnessRenderer.md)
- [`P5AsciifyEdgeRenderer`](P5AsciifyEdgeRenderer.md)

## Type Parameters

| Type Parameter                                                                                          | Default type                                                                              |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `T` _extends_ [`FeatureAsciiRendererOptions`](../../../../../interfaces/FeatureAsciiRendererOptions.md) | [`FeatureAsciiRendererOptions`](../../../../../interfaces/FeatureAsciiRendererOptions.md) |

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../../../../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:393](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L393)

Get the [P5AsciifyColorPalette](../../../../../../../../classes/P5AsciifyColorPalette.md) object containing colors that correspond to the defined character set.

##### Returns

[`P5AsciifyColorPalette`](../../../../../../../../classes/P5AsciifyColorPalette.md)

---

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:563](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L563)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`characterFramebuffer`](../../../classes/P5AsciifyRenderer2D.md#characterframebuffer)

---

### framebufferSettings

#### Get Signature

> **get** **framebufferSettings**(): `object`

Defined in: [renderers/AsciiRenderer.ts:510](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L510)

##### Returns

| Name               | Type      | Description                                         | Defined in                                                                                                                                                            |
| ------------------ | --------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `antialias`        | `boolean` | Whether to enable antialiasing for the framebuffer. | [renderers/AsciiRenderer.ts:35](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L35) |
| `density`          | `number`  | -                                                   | [renderers/AsciiRenderer.ts:43](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L43) |
| `depth?`           | `boolean` | Whether to enable depth for the framebuffer.        | [renderers/AsciiRenderer.ts:41](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L41) |
| `depthFormat?`     | `any`     | -                                                   | [renderers/AsciiRenderer.ts:46](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L46) |
| `height`           | `number`  | -                                                   | [renderers/AsciiRenderer.ts:45](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L45) |
| `textureFiltering` | `any`     | The texture filtering mode for the framebuffer.     | [renderers/AsciiRenderer.ts:38](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L38) |
| `width`            | `number`  | -                                                   | [renderers/AsciiRenderer.ts:44](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L44) |

#### Inherited from

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`framebufferSettings`](../../../classes/P5AsciifyRenderer2D.md#framebuffersettings)

---

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:273](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L273)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`options`](../../../classes/P5AsciifyRenderer2D.md#options)

---

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:327](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L327)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`primaryColorFramebuffer`](../../../classes/P5AsciifyRenderer2D.md#primarycolorframebuffer)

---

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:507](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L507)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`rotationFramebuffer`](../../../classes/P5AsciifyRenderer2D.md#rotationframebuffer)

---

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:381](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L381)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`secondaryColorFramebuffer`](../../../classes/P5AsciifyRenderer2D.md#secondarycolorframebuffer)

---

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:446](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L446)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`transformFramebuffer`](../../../classes/P5AsciifyRenderer2D.md#transformframebuffer)

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:235](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L235)

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

---

### backgroundColorMode()

> **backgroundColorMode**(`mode`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:300](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L300)

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

---

### characterColor()

> **characterColor**(`color`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:168](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L168)

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

---

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:263](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L263)

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

---

### characters()

> **characters**(`characters`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:54](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L54)

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

---

### disable()

> **disable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:257](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L257)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`disable`](../../../classes/P5AsciifyRenderer2D.md#disable)

---

### enable()

> **enable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:232](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L232)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`enable`](../../../classes/P5AsciifyRenderer2D.md#enable)

---

### enabled()

> **enabled**(`enabled?`): `boolean`

Defined in: [renderers/AsciiRenderer.ts:181](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L181)

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`enabled`](../../../classes/P5AsciifyRenderer2D.md#enabled)

---

### flipHorizontally()

> **flipHorizontally**(`flip`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:187](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L187)

Define whether to flip the ASCII characters horizontally.

#### Parameters

| Parameter | Type      | Description                                  |
| --------- | --------- | -------------------------------------------- |
| `flip`    | `boolean` | Whether to flip the characters horizontally. |

#### Returns

`void`

#### Throws

If flip is not a boolean.

---

### flipVertically()

> **flipVertically**(`flip`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:206](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L206)

Define whether to flip the ASCII characters vertically.

#### Parameters

| Parameter | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `flip`    | `boolean` | Whether to flip the characters vertically. |

#### Returns

`void`

#### Throws

If flip is not a boolean.

---

### invert()

> **invert**(`invert`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:84](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L84)

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

---

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:128](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L128)

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

---

### setFramebufferSettings()

> **setFramebufferSettings**(`settings`): `void`

Defined in: [renderers/AsciiRenderer.ts:95](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/AsciiRenderer.ts#L95)

Update framebuffer settings (except width/height) and recreate all framebuffers.

#### Parameters

| Parameter                    | Type                                                                                                   | Description                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `settings`                   | \{ `antialias?`: `boolean`; `depth?`: `boolean`; `depthFormat?`: `any`; `textureFiltering?`: `any`; \} | Partial framebuffer settings (width/height/density are ignored). |
| `settings.antialias?`        | `boolean`                                                                                              | -                                                                |
| `settings.depth?`            | `boolean`                                                                                              | -                                                                |
| `settings.depthFormat?`      | `any`                                                                                                  | -                                                                |
| `settings.textureFiltering?` | `any`                                                                                                  | -                                                                |

#### Returns

`void`

#### Inherited from

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`setFramebufferSettings`](../../../classes/P5AsciifyRenderer2D.md#setframebuffersettings)

---

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:344](https://github.com/humanbydefinition/p5.asciify/blob/7bcb46eee7a4a607e842b6ccb8c930fbed351f10/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L344)

Updates renderer options.

#### Parameters

| Parameter    | Type | Description                |
| ------------ | ---- | -------------------------- |
| `newOptions` | `T`  | The new options to update. |

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

[`P5AsciifyRenderer2D`](../../../classes/P5AsciifyRenderer2D.md).[`update`](../../../classes/P5AsciifyRenderer2D.md#update)
