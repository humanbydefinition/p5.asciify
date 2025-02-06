[**p5.asciify v0.7.4**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyAccurateRenderer

# Class: P5AsciifyAccurateRenderer

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:36](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L36)

An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters.

## Extends

- [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

## Constructors

### new P5AsciifyAccurateRenderer()

> **new P5AsciifyAccurateRenderer**(`p5Instance`, `grid`, `fontTextureAtlas`, `options`): [`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:59](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L59)

Creates a new `"accurate"` ASCII renderer instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `p5Instance` | `__module` | `undefined` | The p5 instance. |
| `grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | `undefined` | Grid object containing the relevant grid information. |
| `fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | `undefined` | The font texture atlas containing the ASCII characters texture. |
| `options` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | `ACCURATE_DEFAULT_OPTIONS` | The options for the ASCII renderer. |

#### Returns

[`P5AsciifyAccurateRenderer`](P5AsciifyAccurateRenderer.md)

#### Remarks

This constructor is meant for internal use by the `p5.asciify` library.

To create renderers, use `p5asciify.renderers().add("name", "accurate", { enabled: true });`.
This will also return an instance of the renderer, which can be used to modify the renderer's properties.
Additionally, the renderer will also be added to the end of the rendering pipeline automatically.

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`constructor`](P5AsciifyRenderer.md#constructors)

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/AsciiRenderer.ts:529](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L529)

Get the color palette object containing colors that correspond to the defined character set.

Not relevant for this base class, 
but used in derived classes for mapping brightness values to those colors for example, 
which are then translated to ASCII characters.

##### Returns

[`P5AsciifyColorPalette`](../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorPalette`](P5AsciifyRenderer.md#charactercolorpalette)

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:802](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L802)

Get the character framebuffer, whose pixels define the ASCII characters to use in the grid cells.

Subclasses write to this buffer automatically based on your settings. 
In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.

##### Example

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
     
     // Assign the ascii renderer's framebuffers to a global variable
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

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterFramebuffer`](P5AsciifyRenderer.md#characterframebuffer)

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:698](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L698)

Get the inversion framebuffer, 
whose pixels define whether to swap the character and background colors of the grid cells.

Subclasses write to this buffer automatically based on your settings. 
In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.

##### Example

```javascript
 let characterFramebuffer;
 let primaryColorFramebuffer;
 let secondaryColorFramebuffer;
 let inversionFramebuffer;

 function setup() {
     createCanvas(400, 400, WEBGL);
 }

 function setupAsciify() {
     // Enable the default custom renderer
     p5asciify.renderers().get("custom").enable();
     
     // Assign the ascii renderer's framebuffers to a global variable
     characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
     primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
     secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
     inversionFramebuffer = p5asciify.renderers().get("custom").inversionFramebuffer;
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

     // Swap the character and background colors of all grid cells.
     inversionFramebuffer.begin();
     background(255); // WHITE = swap, BLACK = don't swap
     inversionFramebuffer.end();
 }
```

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`inversionFramebuffer`](P5AsciifyRenderer.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

Defined in: [renderers/AsciiRenderer.ts:544](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L544)

Get the set options for the ASCII renderer.

**Do not modify directly, since some changes might not be reflected. 
Use the `update()` method or the specific setter methods instead.**

##### Returns

[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`options`](P5AsciifyRenderer.md#options)

***

### outputFramebuffer

#### Get Signature

> **get** **outputFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:536](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L536)

Get the output framebuffer, where the final ASCII conversion is rendered.

Can also contain grid cells filled with ASCII characters by previous renderers in the pipeline.

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`outputFramebuffer`](P5AsciifyRenderer.md#outputframebuffer)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:593](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L593)

Get the primary color framebuffer, whose pixels define the character colors of the grid cells.

Subclasses write to this buffer automatically based on your settings. 
In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.

##### Example

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
     
     // Assign the ascii renderer's framebuffers to a global variable
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

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`primaryColorFramebuffer`](P5AsciifyRenderer.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:754](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L754)

Get the rotation framebuffer, whose pixels define the rotation angle of each character in the grid.

Subclasses write to this buffer automatically based on your settings. 
In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.

##### Example

```javascript
 let characterFramebuffer;
 let primaryColorFramebuffer;
 let secondaryColorFramebuffer;
 let rotationFramebuffer;

 function setup() {
     createCanvas(400, 400, WEBGL);
 }

 function setupAsciify() {
     // Enable the default custom renderer
     p5asciify.renderers().get("custom").enable();
     
     // Assign the ascii renderer's framebuffers to a global variable
     characterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;
     primaryColorFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
     secondaryColorFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
     rotationFramebuffer = p5asciify.renderers().get("custom").rotationFramebuffer;
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

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`rotationFramebuffer`](P5AsciifyRenderer.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:642](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L642)

Get the secondary color framebuffer, whose pixels define the background colors of the grid cells.

Subclasses write to this buffer automatically based on your settings.
In `"custom"` renderers *(aka this base class)*, you must write to it manually in the `draw()` method.

##### Example

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
     
     // Assign the ascii renderer's framebuffers to a global variable
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

##### Returns

`Framebuffer`

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`secondaryColorFramebuffer`](P5AsciifyRenderer.md#secondarycolorframebuffer)

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:368](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L368)

Set the background color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Throws

If color is not a p5.Color object.

#### Example

```javascript
 function setupAsciify() {
     // Set the cell background color to red for the brightness renderer. 
     // (Is applied if the background color mode of this renderer is set to 'fixed')
     p5asciify.renderers().get("brightness").backgroundColor(color(255, 0, 0));
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`backgroundColor`](P5AsciifyRenderer.md#backgroundcolor)

***

### backgroundColorMode()

> **backgroundColorMode**(`mode`): `void`

Defined in: [renderers/AsciiRenderer.ts:418](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L418)

Sets the color mode for the grid cell background.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

#### Example

```javascript
 function setupAsciify() {
     // Set the background color mode to 'sampled' for the brightness renderer.
     p5asciify.renderers().get("brightness").backgroundColorMode('sampled');
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`backgroundColorMode`](P5AsciifyRenderer.md#backgroundcolormode)

***

### characterColor()

> **characterColor**(`color`): `void`

Defined in: [renderers/AsciiRenderer.ts:346](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L346)

Set the color of the ASCII characters, used in the fixed color mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `Color` | The fixed color of the ASCII characters. |

#### Returns

`void`

#### Throws

If color is not a p5.Color object.

#### Example

```javascript
 function setupAsciify() {
      // Set the character color to green for the brightness renderer.
     // (Is applied if the character color mode of this renderer is set to 'fixed')
     p5asciify.renderers().get("brightness").characterColor(color(0, 255, 0));
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColor`](P5AsciifyRenderer.md#charactercolor)

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [renderers/AsciiRenderer.ts:389](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L389)

Sets the color mode for ASCII characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | `string` | The color mode ('sampled' or 'fixed') |

#### Returns

`void`

#### Throws

If mode is not a string or not one of the allowed values ('sampled' or 'fixed')

#### Example

```javascript
 function setupAsciify() {
     // Set the character color mode to 'fixed' for the brightness renderer.
     p5asciify.renderers().get("brightness").characterColorMode('fixed');
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characterColorMode`](P5AsciifyRenderer.md#charactercolormode)

***

### characters()

> **characters**(`characters`): `void`

Defined in: [renderers/AsciiRenderer.ts:265](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L265)

Set the characters for the character set.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characters` | `string` | `""` | The characters to set for the character set. |

#### Returns

`void`

#### Throws

If characters is not a string.

#### Example

```javascript
 function setupAsciify() {
     // Set the character set to '.:-=+*#%@' for the brightness renderer.
     p5asciify.renderers().get("brightness").characters('.:-=+*#%@');
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`characters`](P5AsciifyRenderer.md#characters)

***

### disable()

> **disable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:517](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L517)

Disable the renderer.

Disabling the renderer will clear all framebuffers, 
and prevent the renderer being executed in the rendering pipeline.

#### Returns

`void`

#### Example

```javascript
 function keyPressed() {
     if (key === 'd') {
         // Disable the brightness renderer
         p5asciify.renderers().get("brightness").disable();
     } else if (key === 'e') {
         // Enable the brightness renderer
         p5asciify.renderers().get("brightness").enable();
     }
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`disable`](P5AsciifyRenderer.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [renderers/AsciiRenderer.ts:494](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L494)

Enable the renderer.

#### Returns

`void`

#### Example

```javascript
 function keyPressed() {
     if (key === 'd') {
         // Disable the brightness renderer
         p5asciify.renderers().get("brightness").disable();
     } else if (key === 'e') {
         // Enable the brightness renderer
         p5asciify.renderers().get("brightness").enable();
     }
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enable`](P5AsciifyRenderer.md#enable)

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/AsciiRenderer.ts:452](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L452)

Enable or disable the renderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled` | `boolean` | Whether to enable or disable the renderer. |

#### Returns

`void`

#### Throws

If enabled is not a boolean.

#### Example

```javascript
 function keyPressed() {
     if (key === 'd') {
         // Disable the brightness renderer
         p5asciify.renderers().get("brightness").enabled(false);
     } else if (key === 'e') {
         // Enable the brightness renderer
         p5asciify.renderers().get("brightness").enabled(true);
     }
}
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`enabled`](P5AsciifyRenderer.md#enabled)

***

### invert()

> **invert**(`invert`): `void`

Defined in: [renderers/AsciiRenderer.ts:291](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L291)

Invert the colors of the ASCII character and cell background colors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `invert` | `boolean` | Whether to swap the colors. |

#### Returns

`void`

#### Throws

If invert is not a boolean.

#### Example

```javascript
 function setupAsciify() {
     // Enable invert mode for the brightness renderer.
     p5asciify.renderers().get("brightness").invert(true);
 }
```

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`invert`](P5AsciifyRenderer.md#invert)

***

### render()

> **render**(`inputFramebuffer`, `previousAsciiRenderer`): `void`

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:97](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L97)

Convert and render the input framebuffer to ASCII.

**This method is called automatically by the `P5AsciifyRendererManager` class 
for each enabled renderer in the pipeline. Calling this method manually is redundant and causes unnecessary overhead.**

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `inputFramebuffer` | `Framebuffer` | The input framebuffer to convert to ASCII. |
| `previousAsciiRenderer` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The previous ASCII renderer in the pipeline. |

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`render`](P5AsciifyRenderer.md#render)

***

### resetShaders()

> **resetShaders**(): `void`

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:91](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L91)

Resets the shaders for the renderer.

Not relevant for this base class, but used in derived classes for reloading certain shaders with updated constants.

**It is redundant to call this method manually, 
as it is done automatically by `p5.asciify` when updating the font, font size, or other settings.**

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resetShaders`](P5AsciifyRenderer.md#resetshaders)

***

### resizeFramebuffers()

> **resizeFramebuffers**(): `void`

Defined in: [renderers/accurate/AccurateAsciiRenderer.ts:86](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/accurate/AccurateAsciiRenderer.ts#L86)

Resizes all framebuffers based on the grid dimensions.

**It is redundant to call this method manually,
as it is done automatically by `p5.asciify` when the canvas is resized or the grid is updated.**

#### Returns

`void`

#### Overrides

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`resizeFramebuffers`](P5AsciifyRenderer.md#resizeframebuffers)

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/AsciiRenderer.ts:316](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L316)

Define the rotation angle of all characters in the grid in degrees.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `angle` | `number` | The rotation angle in degrees. |

#### Returns

`void`

#### Remarks

Currently, the angle format is fixed to degrees. In the future, this may be changed to be based on the `angleMode` of the sketch.

#### Example

```javascript
 function setupAsciify() {
     // Rotate all characters in the grid by 90 degrees for the brightness renderer.
     p5asciify.renderers().get("brightness").rotation(90);
 }
```

#### Throws

If angle is not a number.

#### Inherited from

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`rotation`](P5AsciifyRenderer.md#rotation)

***

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/AsciiRenderer.ts:182](https://github.com/humanbydefinition/p5.asciify/blob/6fefeaafef48319cd9c62f693034711261e84b1d/src/lib/renderers/AsciiRenderer.ts#L182)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | `Partial`\<[`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md)\> | The new options to update. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Update the brightness renderer options
     p5asciify.renderers().get("brightness").update({
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

[`P5AsciifyRenderer`](P5AsciifyRenderer.md).[`update`](P5AsciifyRenderer.md#update)
