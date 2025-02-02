[**p5.asciify v0.7.3**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:29](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L29)

Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.

## Constructors

### new P5AsciifyRendererManager()

> **new P5AsciifyRendererManager**(`_p`, `_grid`, `_fontTextureAtlas`): [`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

Defined in: [renderers/RendererManager.ts:45](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L45)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_grid` | [`P5AsciifyGrid`](../../../classes/P5AsciifyGrid.md) | The grid instance. |
| `_fontTextureAtlas` | [`P5AsciifyFontTextureAtlas`](../../../classes/P5AsciifyFontTextureAtlas.md) | The font texture atlas instance. |

#### Returns

[`P5AsciifyRendererManager`](P5AsciifyRendererManager.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="lastrenderer"></a> `lastRenderer` | `public` | [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The last renderer used in the rendering pipeline. | [renderers/RendererManager.ts:38](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L38) |

## Accessors

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:421](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L421)

Returns the list of available renderers.

##### Returns

`object`[]

***

### resultFramebuffer

#### Get Signature

> **get** **resultFramebuffer**(): `Framebuffer`

Defined in: [renderers/RendererManager.ts:426](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L426)

Returns the result framebuffer, which contains the final ASCII output.

##### Returns

`Framebuffer`

## Methods

### add()

> **add**(`name`, `type`, `options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:167](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L167)

Adds a new renderer to the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the renderer to add. |
| `type` | `"custom"` \| `"edge"` \| `"gradient"` \| `"accurate"` \| `"brightness"` | The type of the renderer to add. |
| `options` | [`AsciiRendererOptions`](../type-aliases/AsciiRendererOptions.md) | The options to use for the renderer. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

The ASCII renderer instance that was added.

#### Throws

[P5AsciifyError](../../../classes/P5AsciifyError.md) - If the renderer name is an empty string or the renderer type is invalid.

#### Example

```javascript
let brightnessAsciiRenderer;

 function setupAsciify() {
     // Clear all existing default renderers provided by `p5.asciify`.
     p5asciify.renderers().clear();

     // Add a new brightness renderer with custom options.
     brightnessAsciiRenderer = p5asciify.renderers().add('brightness', 'brightness', {
         enabled: true,
         characterColor: '#FF0000',
         backgroundColor: '#0000FF',
         characterColorMode: "fixed",
         backgroundColorMode: "fixed",
     });
 }
```

***

### background()

> **background**(`color`): `void`

Defined in: [renderers/RendererManager.ts:350](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L350)

Sets the background color for the ascii renderers. 

Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

[P5AsciifyError](../../../classes/P5AsciifyError.md) - If the color is not a string, array or p5.Color.

#### Example

```javascript
 function setupAsciify() {
     // Set the background color to black.
     p5asciify.renderers().background('#000000');

     // Alternatively, you can also use:
     p5asciify.background('#000000');
 }
```

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:297](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L297)

Clears the list of renderers. 
Can be useful when you want to start fresh without the default renderers provided by `p5.asciify`.

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Clear all existing renderers.
     p5asciify.renderers().clear();

    // With no renderers, you can add your own custom renderer.
    // Otherwise, `p5.asciify` will now render the input image without any ASCII effects.
 }
```

***

### disable()

> **disable**(): `void`

Defined in: [renderers/RendererManager.ts:386](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L386)

Disables all renderers in the list of renderers at once, 
effectively rendering the input image without any ASCII renderers applied.

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Disable all renderers, effectively rendering the input image without any ASCII effects.
     p5asciify.renderers().disable();
 }
```

***

### enable()

> **enable**(): `void`

Defined in: [renderers/RendererManager.ts:370](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L370)

Enables all renderers in the list of renderers at once,
effectively rendering the input image with all ASCII renderers applied.

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
    // Enable all default renderers provided by `p5.asciify`.
     p5asciify.renderers().enable();
 }
```

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/RendererManager.ts:402](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L402)

Enables or disables all renderers in the list of renderers at once.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `enabled` | `boolean` | Whether to enable or disable all renderers. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Enable all default renderers provided by `p5.asciify`.
     p5asciify.renderers().enabled(true);
 }
```

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:208](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L208)

Gets the ASCII renderer instance with the given name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rendererName` | `string` | The name of the renderer to get. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

The ASCII renderer instance with the given name.

#### Example

```javascript
 let brightnessRenderer;

 function setupAsciify() {
     // Get the brightness renderer instance by name.
     brightnessRenderer = p5asciify.renderers().get('brightness');

     // Use the brightness renderer instance to modify its properties during run-time,
     // instead of constantly calling `p5asciify.renderers().get('brightness')`.
 }
```

***

### moveDown()

> **moveDown**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:234](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L234)

Moves a renderer down in the list of renderers, meaning it will be rendered later in the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The renderer to move down in the list. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Move the `"brightness"` renderer down in the list of renderers.
     p5asciify.renderers().moveDown('brightness');

     // Alternatively, you can also pass the renderer instance itself.
 }
```

***

### moveUp()

> **moveUp**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:254](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L254)

Moves a renderer up in the list of renderers, meaning it will be rendered earlier in the pipeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The renderer to move up in the list. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Move the `"accurate"` renderer up in the list of renderers.
     p5asciify.renderers().moveUp('accurate');

     // Alternatively, you can also pass the renderer instance itself.
 }
```

***

### remove()

> **remove**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:274](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L274)

Removes a renderer from the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the renderer or the renderer instance itself. |

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Remove the `"brightness"` renderer from the list of renderers.
     p5asciify.renderers().remove('brightness');

     // Alternatively, you can also pass the renderer instance itself.
}
```

***

### render()

> **render**(`inputFramebuffer`): `void`

Defined in: [renderers/RendererManager.ts:84](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L84)

Renders the ASCII output to the result framebuffer.

**This method is called internally by the `p5asciify` instance every time the `draw()` function finishes.
 Should not be called manually, otherwise causing redundant computations.**

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `inputFramebuffer` | `Framebuffer` | The input framebuffer to transform into ASCII. |

#### Returns

`void`

***

### resetRendererDimensions()

> **resetRendererDimensions**(): `void`

Defined in: [renderers/RendererManager.ts:133](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L133)

Resets the dimensions of all renderers.

This method is automatically triggered when:
- Font properties are modified
- Canvas dimensions change

These changes affect the grid dimensions, requiring renderer framebuffers to be resized
and certain shaders to be reinitialized. Should be redundant to call manually.

#### Returns

`void`

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:317](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/renderers/RendererManager.ts#L317)

Swaps the positions of two renderers in the renderer list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer1` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the first renderer or the renderer instance itself. |
| `renderer2` | `string` \| [`P5AsciifyRenderer`](P5AsciifyRenderer.md) | The name of the second renderer or the renderer instance itself. |

#### Returns

`void`

#### Throws

[P5AsciifyError](../../../classes/P5AsciifyError.md) - If one or more renderers are not found.

#### Example

```javascript
 function setupAsciify() {
     // Swap the positions of the `"brightness"` and `"accurate"` renderers.
     p5asciify.renderers().swap('brightness', 'accurate');

     // Alternatively, you can also pass the renderer instances themselves.
 }
```
