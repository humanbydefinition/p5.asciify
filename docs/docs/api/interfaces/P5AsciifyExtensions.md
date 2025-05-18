# Interface: P5AsciifyExtensions

Defined in: [types.ts:24](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/types.ts#L24)

Interface for additional properties and methods added to the `p5.js` instance by the `p5.asciify` library.

## Methods

### drawAsciify()

> **drawAsciify**(): `void`

Defined in: [types.ts:99](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/types.ts#L99)

Called once per frame after the `draw()` loop of `p5.asciify` is complete.
Use this method to perform any additional drawing steps after the asciified content is rendered.

#### Returns

`void`

#### Example

```javascript
let asciifier;

function setupAsciify() {
  // Get the default asciifier instance.
  asciifier = p5asciify.asciifier();
}

// Draw anything on the canvas to asciify.
function draw() {
  clear();
  fill(255);
  rotateX(p.radians(p.frameCount * 3));
  rotateZ(p.radians(p.frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(800, 100, 100);
}

// After the asciified content is drawn to the canvas, draw an FPS counter on top of it.
function drawAsciify() {
  textFont(p5asciify.asciifier().fontManager.font);
  textSize(64);
  fill(255, 255, 0);
  text(
    "FPS:" + Math.min(Math.ceil(p.frameRate()), 60),
    -p.width / 2,
    p.height / 2,
  );

  // You can also access the framebuffer containing the asciified content
  // to do additional processing through `asciifier.texture`,
  // like applying the asciified texture onto a 3D object.
}
```

---

### setupAsciify()

> **setupAsciify**(): `void`

Defined in: [types.ts:61](https://github.com/humanbydefinition/p5.asciify/blob/1fdcca16e0d536cb9e8fbd48454be986de20576c/src/lib/types.ts#L61)

Called once after the `setup()` of `p5.asciify` is complete.
Use this method to perform any additional setup steps after the asciify setup is complete.

This is the place where you can safely start using the functionality provided by the [p5asciify](../variables/p5asciify.md) _([P5AsciifierManager](../classes/P5AsciifierManager.md))_ object.
All properties can also be modified during run-time through the `draw()` loop before the ASCII conversion is executed.

#### Returns

`void`

#### Example

```javascript
let asciifier;

function setupAsciify() {
  // Get the default asciifier instance.
  asciifier = p5asciify.asciifier();

  // Set the font size of the default asciifier to 8.
  asciifier.fontSize(8);

  // ... and so much more! ᓭᘏᒉ
}

function draw() {
  // Draw anything on the canvas to asciify.
  clear();
  fill(255);
  rotateX(p.radians(p.frameCount * 3));
  rotateZ(p.radians(p.frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(800, 100, 100);

  // The asciified content will be drawn on the canvas after the draw loop
  // with the transformations applied to the grid.
}
```
