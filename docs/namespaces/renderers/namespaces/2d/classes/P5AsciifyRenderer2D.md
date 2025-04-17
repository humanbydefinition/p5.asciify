[**p5.asciify v0.8.2**](../../../../../README.md)

***

[p5.asciify](../../../../../README.md) / [renderers](../../../README.md) / [2d](../README.md) / P5AsciifyRenderer2D

# Class: P5AsciifyRenderer2D\<T\>

Defined in: [renderers/2d/AsciiRenderer2D.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/2d/AsciiRenderer2D.ts#L20)

ASCII renderer for custom 2D rendering.

## Extends

- [`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md)\<`T`\>

## Extended by

- [`AbstractFeatureRenderer2D`](../namespaces/feature/classes/AbstractFeatureRenderer2D.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* [`AsciiRendererOptions`](../../../interfaces/AsciiRendererOptions.md) | [`AsciiRendererOptions`](../../../interfaces/AsciiRendererOptions.md) |

## Accessors

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:486](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L486)

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
     characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
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

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:372](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L372)

Get the inversion framebuffer, 
whose pixels define whether to swap the character and background colors of the grid cells.

Pre-built ASCII renderers like `'brightness'` write to this buffer automatically based on your settings. 
In `'custom2D'` renderers, you must write to it manually in your `draw()` function.

##### Example

```javascript
 let characterFramebuffer;
 let primaryColorFramebuffer;
 let secondaryColorFramebuffer;
 let inversionFramebuffer;

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
     characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
     inversionFramebuffer = asciifier.renderers().get("custom2D").inversionFramebuffer;
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

     // Swap the character and background colors of all grid cells.
     inversionFramebuffer.begin();
     background(255); // WHITE = swap, BLACK = don't swap
     inversionFramebuffer.end();
 }
```

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`inversionFramebuffer`](../../../classes/P5AsciifyRenderer.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:202](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L202)

Get the set options for the ASCII renderer.

##### Example

```javascript
 function setupAsciify() {
     // Get the brightness renderer options
     const brightnessOptions = p5asciify.asciifier().renderers().get("brightness").options();
     console.log(brightnessOptions);
 }
```

##### Returns

`T`

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`options`](../../../classes/P5AsciifyRenderer.md#options)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:256](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L256)

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
     characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
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

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:433](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L433)

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
     characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
     rotationFramebuffer = asciifier.renderers().get("custom2D").rotationFramebuffer;
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

     // Rotates all characters in the grid by 270 degrees. 
     // Utilize the red and green channels for the rotation angle.
     rotationFramebuffer.begin();
     background(255, 15, 0); // a bit cheesy right now, but you get the idea.
     rotationFramebuffer.end();
 }
```

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`rotationFramebuffer`](../../../classes/P5AsciifyRenderer.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:310](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L310)

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
     characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
     primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
     secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
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

## Methods

### disable()

> **disable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:186](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L186)

Disable the renderer.

Disabling the renderer will clear all framebuffers, 
and prevent the renderer from being executed in the rendering pipeline.

#### Returns

`boolean`

The new state of the renderer.

#### Example

```javascript
 function keyPressed() {
     if (key === 'd') {
         // Disable the brightness renderer
         p5asciify.asciifier().renderers().get("brightness").disable();
     } else if (key === 'e') {
         // Enable the brightness renderer
         p5asciify.asciifier().renderers().get("brightness").enable();
     }
 }
```

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`disable`](../../../classes/P5AsciifyRenderer.md#disable)

***

### enable()

> **enable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:161](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L161)

Enable the renderer.

#### Returns

`boolean`

The new state of the renderer.

#### Example

```javascript
 function keyPressed() {
     if (key === 'd') {
         // Disable the brightness renderer
         p5asciify.asciifier().renderers().get("brightness").disable();
     } else if (key === 'e') {
         // Enable the brightness renderer
         p5asciify.asciifier().renderers().get("brightness").enable();
     }
 }
```

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`enable`](../../../classes/P5AsciifyRenderer.md#enable)

***

### enabled()

> **enabled**(`enabled`?): `boolean`

Defined in: [renderers/AsciiRenderer.ts:116](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L116)

Enable or disable the renderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled`? | `boolean` | Whether to enable or disable the renderer. |

#### Returns

`boolean`

The current/new state of the renderer.

#### Throws

If the provided enabled value is not a boolean.

#### Example

```javascript
 function keyPressed() {
     if (key === 'd') {
         // Disable the brightness renderer
         p5asciify.asciifier().renderers().get("brightness").enabled(false);
     } else if (key === 'e') {
         // Enable the brightness renderer
         p5asciify.asciifier().renderers().get("brightness").enabled(true);
     }
 }
```

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`enabled`](../../../classes/P5AsciifyRenderer.md#enabled)

***

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:89](https://github.com/humanbydefinition/p5.asciify/blob/067077b3e92500d55ca650ba698ea8971960c3aa/src/lib/renderers/AsciiRenderer.ts#L89)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `T` | The new options to update. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Update the brightness renderer options
     p5asciify.asciifier().renderers().get("brightness").update({
         enabled: true,
         characterColor: color(255, 0, 0),
         backgroundColor: color(0, 0, 255),
         characters: '.:-=+*#%@',
         invertMode: true,
         rotationAngle: 90,
         // ...
     });
 }
```

#### Inherited from

[`P5AsciifyRenderer`](../../../classes/P5AsciifyRenderer.md).[`update`](../../../classes/P5AsciifyRenderer.md#update)
