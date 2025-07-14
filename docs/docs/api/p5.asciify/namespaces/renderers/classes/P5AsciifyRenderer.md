# Class: `abstract` P5AsciifyRenderer\<T\>

Defined in: [renderers/AsciiRenderer.ts:11](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L11)

Abstract ASCII renderer base class that all custom and pre-built ASCII renderers extend from.

## Extended by

- [`P5AsciifyRenderer2D`](../namespaces/renderer2d/classes/P5AsciifyRenderer2D.md)

## Type Parameters

| Type Parameter                                                                | Default type                                                    |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `T` _extends_ [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) |

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:583](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L583)

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

---

### framebufferOptions

#### Get Signature

> **get** **framebufferOptions**(): `object`

Defined in: [renderers/AsciiRenderer.ts:530](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L530)

Get the framebuffer settings used to configure all internal framebuffers for the renderer.

##### Returns

| Name                | Type      | Description                                                                                                                                                 | Defined in                                                                                                                                                            |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `antialias?`        | `boolean` | Whether to perform anti-aliasing. If set to `true`, 2 samples will be used by default. The number of samples can also be set (e.g., 4). Default is `false`. | [renderers/AsciiRenderer.ts:53](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L53) |
| `channels?`         | `number`  | Whether to store `RGB` or `RGBA` color channels. Default is to match the main canvas, which is `RGBA`.                                                      | [renderers/AsciiRenderer.ts:77](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L77) |
| `density`           | `number`  | The pixel density of the framebuffers. Always fixed to 1, since they are used for offscreen rendering.                                                      | [renderers/AsciiRenderer.ts:62](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L62) |
| `depth?`            | `boolean` | Whether to include a depth buffer. Default is `true`.                                                                                                       | [renderers/AsciiRenderer.ts:59](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L59) |
| `depthFormat?`      | `any`     | Data format of depth information. Either `UNSIGNED_INT` or `FLOAT`. Default is `UNSIGNED_INT`.                                                              | [renderers/AsciiRenderer.ts:71](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L71) |
| `format?`           | `number`  | Data format of the texture. Either `UNSIGNED_BYTE`, `FLOAT`, or `HALF_FLOAT`. Default is `UNSIGNED_BYTE`.                                                   | [renderers/AsciiRenderer.ts:74](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L74) |
| `height`            | `number`  | Height of the framebuffer. Always matches the grid rows.                                                                                                    | [renderers/AsciiRenderer.ts:68](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L68) |
| `stencil?`          | `boolean` | Whether to include a stencil buffer for masking. `depth` must be `true` for this feature to work. Defaults to the value of `depth` _(which is `true`)_.     | [renderers/AsciiRenderer.ts:80](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L80) |
| `textureFiltering?` | `any`     | How to read values from the framebuffer. Either `LINEAR` (nearby pixels will be interpolated) or `NEAREST` (no interpolation). Default is `NEAREST`.        | [renderers/AsciiRenderer.ts:56](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L56) |
| `width`             | `number`  | Width of the framebuffer. Always matches the grid columns.                                                                                                  | [renderers/AsciiRenderer.ts:65](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L65) |

---

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:290](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L290)

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

---

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:344](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L344)

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

---

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:524](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L524)

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

---

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:398](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L398)

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

---

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:463](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L463)

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

## Methods

### disable()

> **disable**(): `this`

Defined in: [renderers/AsciiRenderer.ts:274](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L274)

Disable the renderer.

Disabling the renderer will clear all framebuffers,
and prevent the renderer from being executed in the rendering pipeline.

#### Returns

`this`

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

---

### enable()

> **enable**(): `this`

Defined in: [renderers/AsciiRenderer.ts:249](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L249)

Enable the renderer.

#### Returns

`this`

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

---

### enabled()

> **enabled**(`enabled?`): `this`

Defined in: [renderers/AsciiRenderer.ts:198](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L198)

Enable or disable the renderer.

#### Parameters

| Parameter  | Type      | Description                                |
| ---------- | --------- | ------------------------------------------ |
| `enabled?` | `boolean` | Whether to enable or disable the renderer. |

#### Returns

`this`

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

---

### update()

> **update**(`newOptions`): `this`

Defined in: [renderers/AsciiRenderer.ts:160](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/renderers/AsciiRenderer.ts#L160)

Updates renderer options.

#### Parameters

| Parameter    | Type | Description                |
| ------------ | ---- | -------------------------- |
| `newOptions` | `T`  | The new options to update. |

#### Returns

`this`

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
      invert: true,
      rotation: 90,
      // ...
    });
}
```
