[**p5.asciify v0.9.0-beta.5**](../../../../../../../../README.md)

***

[p5.asciify](../../../../../../../../README.md) / [renderers](../../../../../README.md) / [renderer2d](../../../README.md) / [feature](../README.md) / P5AsciifyBrightnessRenderer

# Class: P5AsciifyBrightnessRenderer

Defined in: [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:44](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L44)

ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set.

## Extends

- [`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md)

## Accessors

### characterColorPalette

#### Get Signature

> **get** **characterColorPalette**(): [`P5AsciifyColorPalette`](../../../../../../../../classes/P5AsciifyColorPalette.md)

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:321](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L321)

Get the [P5AsciifyColorPalette](../../../../../../../../classes/P5AsciifyColorPalette.md) object containing colors that correspond to the defined character set.

##### Returns

[`P5AsciifyColorPalette`](../../../../../../../../classes/P5AsciifyColorPalette.md)

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`characterColorPalette`](AbstractFeatureRenderer2D.md#charactercolorpalette)

***

### characterFramebuffer

#### Get Signature

> **get** **characterFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:492](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L492)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`characterFramebuffer`](AbstractFeatureRenderer2D.md#characterframebuffer)

***

### flipFramebuffer

#### Get Signature

> **get** **flipFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:439](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L439)

##### Returns

`Framebuffer`

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`flipFramebuffer`](AbstractFeatureRenderer2D.md#flipframebuffer)

***

### inversionFramebuffer

#### Get Signature

> **get** **inversionFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:376](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L376)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`inversionFramebuffer`](AbstractFeatureRenderer2D.md#inversionframebuffer)

***

### options

#### Get Signature

> **get** **options**(): `T`

Defined in: [renderers/AsciiRenderer.ts:206](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L206)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`options`](AbstractFeatureRenderer2D.md#options)

***

### primaryColorFramebuffer

#### Get Signature

> **get** **primaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:260](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L260)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`primaryColorFramebuffer`](AbstractFeatureRenderer2D.md#primarycolorframebuffer)

***

### rotationFramebuffer

#### Get Signature

> **get** **rotationFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:437](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L437)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`rotationFramebuffer`](AbstractFeatureRenderer2D.md#rotationframebuffer)

***

### secondaryColorFramebuffer

#### Get Signature

> **get** **secondaryColorFramebuffer**(): `Framebuffer`

Defined in: [renderers/AsciiRenderer.ts:314](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L314)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`secondaryColorFramebuffer`](AbstractFeatureRenderer2D.md#secondarycolorframebuffer)

## Methods

### backgroundColor()

> **backgroundColor**(`color`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:186](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L186)

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
     p5asciify.asciifier().renderers().get("brightness").backgroundColor(color(255, 0, 0));
 }
```

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`backgroundColor`](AbstractFeatureRenderer2D.md#backgroundcolor)

***

### backgroundColorMode()

> **backgroundColorMode**(`mode`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:236](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L236)

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
     p5asciify.asciifier().renderers().get("brightness").backgroundColorMode('sampled');
 }
```

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`backgroundColorMode`](AbstractFeatureRenderer2D.md#backgroundcolormode)

***

### characterColor()

> **characterColor**(`color`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:148](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L148)

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
     p5asciify.asciifier().renderers().get("brightness").characterColor(color(0, 255, 0));
 }
```

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`characterColor`](AbstractFeatureRenderer2D.md#charactercolor)

***

### characterColorMode()

> **characterColorMode**(`mode`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:207](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L207)

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
     p5asciify.asciifier().renderers().get("brightness").characterColorMode('fixed');
 }
```

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`characterColorMode`](AbstractFeatureRenderer2D.md#charactercolormode)

***

### characters()

> **characters**(`characters`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:52](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L52)

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
     p5asciify.asciifier().renderers().get("brightness").characters('.:-=+*#%@');
 }
```

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`characters`](AbstractFeatureRenderer2D.md#characters)

***

### disable()

> **disable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:190](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L190)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`disable`](AbstractFeatureRenderer2D.md#disable)

***

### enable()

> **enable**(): `boolean`

Defined in: [renderers/AsciiRenderer.ts:165](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L165)

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`enable`](AbstractFeatureRenderer2D.md#enable)

***

### enabled()

> **enabled**(`enabled?`): `boolean`

Defined in: [renderers/AsciiRenderer.ts:120](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/AsciiRenderer.ts#L120)

Enable or disable the renderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled?` | `boolean` | Whether to enable or disable the renderer. |

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`enabled`](AbstractFeatureRenderer2D.md#enabled)

***

### flipHorizontally()

> **flipHorizontally**(`flip`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:156](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L156)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flip` | `boolean` |

#### Returns

`void`

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`flipHorizontally`](AbstractFeatureRenderer2D.md#fliphorizontally)

***

### flipVertically()

> **flipVertically**(`flip`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:164](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L164)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flip` | `boolean` |

#### Returns

`void`

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`flipVertically`](AbstractFeatureRenderer2D.md#flipvertically)

***

### invert()

> **invert**(`invert`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:78](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L78)

Swap the colors of the ASCII character and cell background colors.

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
     p5asciify.asciifier().renderers().get("brightness").invert(true);
 }
```

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`invert`](AbstractFeatureRenderer2D.md#invert)

***

### rotation()

> **rotation**(`angle`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:117](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L117)

Define the rotation angle of all characters in the grid affected by the renderer in degrees.

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
     p5asciify.asciifier().renderers().get("brightness").rotation(90);
 }
```

#### Throws

If angle is not a number.

#### Inherited from

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`rotation`](AbstractFeatureRenderer2D.md#rotation)

***

### update()

> **update**(`newOptions`): `void`

Defined in: [renderers/2d/feature/AbstractFeatureRenderer2D.ts:272](https://github.com/humanbydefinition/p5.asciify/blob/a4ed761105277b111d87aa2fc6aabd150321d66d/src/lib/renderers/2d/feature/AbstractFeatureRenderer2D.ts#L272)

Updates renderer options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newOptions` | [`FeatureAsciiRendererOptions`](../../../../../interfaces/FeatureAsciiRendererOptions.md) | The new options to update. |

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

[`AbstractFeatureRenderer2D`](AbstractFeatureRenderer2D.md).[`update`](AbstractFeatureRenderer2D.md#update)
