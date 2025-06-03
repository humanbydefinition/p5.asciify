# Class: P5AsciifyRenderer2D\<T\>

Defined in: [renderers/2d/AsciiRenderer2D.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/2d/AsciiRenderer2D.ts#L20)

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

Defined in: [renderers/AsciiRenderer.ts:492](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L492)

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

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:205](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L205)

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

Defined in: [renderers/AsciiRenderer.ts:259](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L259)

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

Defined in: [renderers/AsciiRenderer.ts:439](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L439)

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

Defined in: [renderers/AsciiRenderer.ts:313](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L313)

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

Defined in: [renderers/AsciiRenderer.ts:378](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L378)

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

Defined in: [renderers/AsciiRenderer.ts:189](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L189)

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

Defined in: [renderers/AsciiRenderer.ts:164](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L164)

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

Defined in: [renderers/AsciiRenderer.ts:119](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L119)

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

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:94](https://github.com/humanbydefinition/p5.asciify/blob/f7ea3aaf85f74af4820425d6e8a41eecf5d02d32/src/lib/renderers/AsciiRenderer.ts#L94)

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
