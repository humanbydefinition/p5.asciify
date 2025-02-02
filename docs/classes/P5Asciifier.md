[**p5.asciify v0.7.3**](../README.md)

***

[p5.asciify](../README.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:17](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L17)

The main class for the `p5.asciify` library, 
responsible for setting up the library, managing its properties, and providing an interface for interacting with the library.

`p5.asciify` exports an instance `p5asciify` of this class, which is used to interact with the library.

Currently, this class is not designed to be instantiated by the user. Use the `p5asciify` instance exported by the library instead.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Accessors

### fontManager

#### Get Signature

> **get** **fontManager**(): [`P5AsciifyFontManager`](P5AsciifyFontManager.md)

Defined in: [Asciifier.ts:435](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L435)

Returns the font manager, which manages the font and provides methods to access font properties.

##### Example

```javascript
 function setupAsciify() {
     // Print all existing characters in the font to the console.
     console.log(p5asciify.fontManager.characters);
 }
```

##### Returns

[`P5AsciifyFontManager`](P5AsciifyFontManager.md)

***

### fontTextureAtlas

#### Get Signature

> **get** **fontTextureAtlas**(): [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [Asciifier.ts:422](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L422)

Returns the font texture atlas, which contains the texture with all glyphs of the font set in the font manager.

##### Example

```javascript
 function drawAsciify() {
     // Peek behind the curtain at the font texture atlas (you curious cat)
     clear(); 
     image(p5asciify.fontTextureAtlas.texture, -width / 2, -height / 2, width, height);
 }
```

##### Returns

[`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

***

### grid

#### Get Signature

> **get** **grid**(): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Asciifier.ts:408](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L408)

Returns the grid, which contains the dimensions and offsets to create a perfect grid based on the canvas and font glyph dimensions.

##### Example

```javascript
let framebuffer;

function setupAsciify() {
     // Can be useful to create a framebuffer with the same dimensions as the grid.
     framebuffer = createFramebuffer({width: p5asciify.grid.cols, height: p5asciify.grid.rows});
}
```

##### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

***

### sketchFramebuffer

#### Get Signature

> **get** **sketchFramebuffer**(): `Framebuffer`

Defined in: [Asciifier.ts:442](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L442)

Returns the sketch framebuffer, which contains the output of the user's `draw()` function to asciify.

There is no real reason to access this in a `p5.js` sketch, but I'm happy to be proven wrong.

##### Returns

`Framebuffer`

***

### texture

#### Get Signature

> **get** **texture**(): `Framebuffer`

Defined in: [Asciifier.ts:467](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L467)

Returns the ASCII output texture as a p5.Framebuffer, which can be used for further processing or rendering.
Can also be used via the p5.js `texture()` function.

##### Example

```javascript
 // Draw something on the canvas to asciify.
 function draw() {
     rotateX(frameCount * 0.01);
     rotateY(frameCount * 0.01);
     box(100);
 }

 function drawAsciify() {
     orbitControl();

     // Apply the asciified output as a texture to a 3D box.
     clear();
     texture(p5asciify.texture);
     box(100);
 }
```

##### Returns

`Framebuffer`

## Methods

### asciify()

> **asciify**(): `void`

Defined in: [Asciifier.ts:116](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L116)

Renders the ASCII output to the canvas.

**This method is called automatically every time the user's `draw()` function has finished. Calling it manually is redundant and only causes useless computation.**

#### Returns

`void`

***

### background()

> **background**(`color`): `void`

Defined in: [Asciifier.ts:245](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L245)

Sets the background color for the ascii renderering. 

Covers all the transparent space, including the edges of the canvas, which might not be covered by the grid of characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by `p5.js`. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the passed color is invalid.

#### Example

```javascript
 function setupAsciify() {
     // Set the background color to black.
     p5asciify.background("#000000");
 }
```

***

### fill()

> **fill**(`character`): `void`

Defined in: [Asciifier.ts:391](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L391)

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

 function setup() {
     createCanvas(400, 400, WEBGL);
 }

 function setupAsciify() {
     // Enable the default custom renderer
     p5asciify.renderers().get("custom").enable();
     
     // Assign the ascii renderer's character framebuffer to a global variable
     characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
     primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
     secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
 }

 function draw() {
     // Draw a rectangle with the character 'A' to the character framebuffer
     characterFramebuffer.begin();
     clear();
     p5asciify.fill("A");
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

### fontSize()

> **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:139](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L139)

Sets the font size for the ASCII renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Set the font size to 32 to use for all ASCII renderers.
     p5asciify.fontSize(32);
 }
```

***

### init()

> **init**(`p`, `fontBase64`): `void`

Defined in: [Asciifier.ts:49](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L49)

Initializes the `p5.asciify` library by setting the `p5.js` instance and loading the font manager with the default font.

**This method is called automatically when p5.js is initialized and should not be called manually, 
otherwise causing unexpected behavior.**

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` |  |
| `fontBase64` | `string` |  |

#### Returns

`void`

***

### instance()

> **instance**(`p`): `void`

Defined in: [Asciifier.ts:105](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L105)

Necessary to call in p5.js `INSTANCE` mode to ensure a `preload` function is defined.
Otherwise an empty `preload` method is defined, so the preload loop is executed and the font provided by `p5.asciify` is loaded properly.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` | The p5.js instance to use for the library. |

#### Returns

`void`

#### Example

```javascript
 import p5 from 'p5';
 import { p5asciify } from '../../src/lib/index';

 const sketch = (p) => {
     p5asciify.instance(p);

     // ... your sketch code
 }

new p5(sketch);

***

### loadFont()

> **loadFont**(`font`, `options`, `onSuccess`?): `void`

Defined in: [Asciifier.ts:200](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L200)

Sets the font for the ascii renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `string` \| `Font` | The font to use. Can be a path, base64 string, or p5.Font object. |
| `options` | \{ `updateCharacters`: `true`; \} | An object containing options affecting what happens after the font is loaded. |
| `options.updateCharacters` | `true` | If true, updates renderer character colors for ascii conversion with new font. May throw an error if new font lacks set characters in renderers. If false, the character colors won't be updated, potentially leading to incorrect ASCII conversion when not updated manually afterwards. |
| `onSuccess`? | () => `void` | A callback function to call after the font has been loaded and potential updates have been made. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) - If the font parameter is invalid or the font fails to load.

#### Example

```javascript
 function preload() {
     // Load a custom font from a path
     p5asciify.loadFont('path/to/font.ttf', { updateCharacters: true }, () => {
         // Font loaded successfully
         console.log('Font loaded successfully');
     });

     // The second and third parameters are optional. When called during `preload`, 
     // the font will be loaded before `setup` begins, 
     // similar to how `loadFont` works in `p5.js`.
 }
```

***

### renderers()

> **renderers**(): [`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md)

Defined in: [Asciifier.ts:170](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L170)

Returns the renderer manager, containing all ASCII renderers in the rendering loop.

#### Returns

[`P5AsciifyRendererManager`](../namespaces/renderers/classes/P5AsciifyRendererManager.md)

The renderer manager.

#### Example

```javascript
 let defaultBrightnessRenderer;

 function setupAsciify() {
     // Fetch the default brightness renderer from the renderer manager.
     defaultBrightnessRenderer = p5asciify.renderers().get("brightness");

     // Update any options for the renderer.
     defaultBrightnessRenderer.update({ invertMode: true, });
 }
```

***

### saveStrings()

> **saveStrings**(`filename`): `void`

Defined in: [Asciifier.ts:332](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L332)

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
        p5asciify.saveStrings("ascii_output");
    }
}
```

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:60](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L60)

Sets up the `p5.asciify` library by initializing the font texture atlas, grid, renderer manager, and sketch framebuffer.

**This method called automatically after the user's `setup()` function has finished. 
Calling this function manually would reset the library and previously made settings, which is rather redundant.**

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Defined in: [Asciifier.ts:313](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/Asciifier.ts#L313)

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
         console.log(p5asciify.toString());
     }
 }
