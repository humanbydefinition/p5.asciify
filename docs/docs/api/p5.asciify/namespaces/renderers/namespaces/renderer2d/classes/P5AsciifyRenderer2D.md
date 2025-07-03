# Class: P5AsciifyRenderer2D\<T\>

Defined in: [renderers/2d/AsciiRenderer2D.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/2d/AsciiRenderer2D.ts#L20)

ASCII renderer for custom 2D rendering.

## Extends

- [`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md)\<`T`\>

## Extended by

- [`P5AsciifyAbstractFeatureRenderer2D`](../namespaces/feature/classes/P5AsciifyAbstractFeatureRenderer2D.md)

## Type Parameters

| Type Parameter                                                                      | Default type                                                          |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `T` _extends_ [`AsciiRendererOptions`](../../../interfaces/AsciiRendererOptions.md) | [`AsciiRendererOptions`](../../../interfaces/AsciiRendererOptions.md) |

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:619](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L619)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`characterFramebuffer`](../../../classes/P5AsciifyRenderer.md#characterframebuffer)

---

### framebufferOptions

#### Get Signature

> **get** **framebufferOptions**(): `object`

Defined in: [renderers/AsciiRenderer.ts:566](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L566)

Get the framebuffer settings used to configure all internal framebuffers for the renderer.

##### Returns

| Name                | Type      | Description                                                                                                                                                 | Defined in                                                                                                                                                            |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `antialias?`        | `boolean` | Whether to perform anti-aliasing. If set to `true`, 2 samples will be used by default. The number of samples can also be set (e.g., 4). Default is `false`. | [renderers/AsciiRenderer.ts:53](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L53) |
| `channels?`         | `number`  | Whether to store `RGB` or `RGBA` color channels. Default is to match the main canvas, which is `RGBA`.                                                      | [renderers/AsciiRenderer.ts:77](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L77) |
| `density`           | `number`  | The pixel density of the framebuffers. Always fixed to 1, since they are used for offscreen rendering.                                                      | [renderers/AsciiRenderer.ts:62](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L62) |
| `depth?`            | `boolean` | Whether to include a depth buffer. Default is `true`.                                                                                                       | [renderers/AsciiRenderer.ts:59](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L59) |
| `depthFormat?`      | `any`     | Data format of depth information. Either `UNSIGNED_INT` or `FLOAT`. Default is `UNSIGNED_INT`.                                                              | [renderers/AsciiRenderer.ts:71](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L71) |
| `format?`           | `number`  | Data format of the texture. Either `UNSIGNED_BYTE`, `FLOAT`, or `HALF_FLOAT`. Default is `UNSIGNED_BYTE`.                                                   | [renderers/AsciiRenderer.ts:74](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L74) |
| `height`            | `number`  | Height of the framebuffer. Always matches the grid rows.                                                                                                    | [renderers/AsciiRenderer.ts:68](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L68) |
| `stencil?`          | `boolean` | Whether to include a stencil buffer for masking. `depth` must be `true` for this feature to work. Defaults to the value of `depth` _(which is `true`)_.     | [renderers/AsciiRenderer.ts:80](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L80) |
| `textureFiltering?` | `any`     | How to read values from the framebuffer. Either `LINEAR` (nearby pixels will be interpolated) or `NEAREST` (no interpolation). Default is `NEAREST`.        | [renderers/AsciiRenderer.ts:56](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L56) |
| `width`             | `number`  | Width of the framebuffer. Always matches the grid columns.                                                                                                  | [renderers/AsciiRenderer.ts:65](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L65) |

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`framebufferOptions`](../../../classes/P5AsciifyRenderer.md#framebufferoptions)

---

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:326](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L326)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`options`](../../../classes/P5AsciifyRenderer.md#options)

---

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:380](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L380)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`primaryColorFramebuffer`](../../../classes/P5AsciifyRenderer.md#primarycolorframebuffer)

---

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:560](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L560)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`rotationFramebuffer`](../../../classes/P5AsciifyRenderer.md#rotationframebuffer)

---

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:434](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L434)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`secondaryColorFramebuffer`](../../../classes/P5AsciifyRenderer.md#secondarycolorframebuffer)

---

### transformFramebuffer

#### Get Signature

> **get** **transformFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:499](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L499)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`transformFramebuffer`](../../../classes/P5AsciifyRenderer.md#transformframebuffer)

## Methods

### disable()

> **disable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:310](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L310)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`disable`](../../../classes/P5AsciifyRenderer.md#disable)

---

### enable()

> **enable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:285](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L285)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`enable`](../../../classes/P5AsciifyRenderer.md#enable)

---

### enabled()

> **enabled**(`enabled?`): `boolean`

Defined in: [renderers/AsciiRenderer.ts:234](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L234)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`enabled`](../../../classes/P5AsciifyRenderer.md#enabled)

---

### setFramebufferOptions()

> **setFramebufferOptions**(`settings`): `void`

Defined in: [renderers/AsciiRenderer.ts:146](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L146)

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

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`setFramebufferOptions`](../../../classes/P5AsciifyRenderer.md#setframebufferoptions)

---

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:198](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/renderers/AsciiRenderer.ts#L198)

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

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`update`](../../../classes/P5AsciifyRenderer.md#update)
