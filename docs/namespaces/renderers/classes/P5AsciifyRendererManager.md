[**p5.asciify v0.8.2**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / P5AsciifyRendererManager

# Class: P5AsciifyRendererManager

Defined in: [renderers/RendererManager.ts:23](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L23)

Manages the whole ASCII rendering pipeline.

## Accessors

### asciiDisplayRenderer

#### Get Signature

> **get** **asciiDisplayRenderer**(): [`P5AsciifyDisplayRenderer`](P5AsciifyDisplayRenderer.md)

Defined in: [renderers/RendererManager.ts:499](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L499)

Returns the [P5AsciifyDisplayRenderer](P5AsciifyDisplayRenderer.md) instance which performs the final ASCII conversion.

##### Returns

[`P5AsciifyDisplayRenderer`](P5AsciifyDisplayRenderer.md)

***

### hasEnabledRenderers

#### Get Signature

> **get** **hasEnabledRenderers**(): `boolean`

Defined in: [renderers/RendererManager.ts:539](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L539)

Returns a boolean indicating whether any renderers are enabled in the pipeline.

##### Returns

`boolean`

***

### renderers

#### Get Signature

> **get** **renderers**(): `object`[]

Defined in: [renderers/RendererManager.ts:494](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L494)

Returns the list of renderers in the pipeline.

The first renderer in the list is executed last, and the last renderer in the list is executed first.

##### Returns

`object`[]

## Methods

### add()

> **add**(`name`, `type`, `options`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:252](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L252)

Adds a new renderer to the list of renderers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the renderer to add. |
| `type` | `"custom2D"` \| `"edge"` \| `"accurate"` \| `"brightness"` | The type of the renderer to add. |
| `options` | [`AsciiRendererOptions`](../interfaces/AsciiRendererOptions.md) | The options to use for the renderer. |

#### Returns

[`P5AsciifyRenderer`](P5AsciifyRenderer.md)

The ASCII renderer instance that was added.

#### Throws

[P5AsciifyError](../../../classes/P5AsciifyError.md) - If the renderer name is an empty string or the renderer type is invalid.

#### Example

```javascript
 let asciifier;
 let brightnessAsciiRenderer;

 function setupAsciify() {
     asciifier = p5asciify.asciifier();

     // Clear all existing default renderers provided by `p5.asciify`.
     asciifier.renderers().clear();

     // Add a new brightness renderer with custom options.
     brightnessAsciiRenderer = asciifier.renderers().add('brightness', 'brightness', {
         enabled: true,
         characterColor: '#FF0000',
         backgroundColor: '#0000FF',
         characterColorMode: "fixed",
         backgroundColorMode: "fixed",
     });
 }
```

***

### clear()

> **clear**(): `void`

Defined in: [renderers/RendererManager.ts:398](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L398)

Clears the list of renderers. 
Can be useful when you want to start fresh without the default renderers provided by the library.

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Clear all existing renderers.
     p5asciify.asciifier().renderers().clear();

    // With no renderers, you can add your own custom renderer.
    // Otherwise, `p5.asciify` will now render the input image without any ASCII conversion.
 }
```

***

### disable()

> **disable**(): `void`

Defined in: [renderers/RendererManager.ts:457](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L457)

Disables all renderers in the list of renderers at once.

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
     // Disable all renderers in the list.
     p5asciify.asciifier().renderers().disable();
 }
```

***

### enable()

> **enable**(): `void`

Defined in: [renderers/RendererManager.ts:442](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L442)

Enables all renderers in the list of renderers at once.

#### Returns

`void`

#### Example

```javascript
 function setupAsciify() {
    // Enable all default renderers provided by `p5.asciify`.
     p5asciify.asciifier().renderers().enable();
 }
```

***

### enabled()

> **enabled**(`enabled`): `void`

Defined in: [renderers/RendererManager.ts:473](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L473)

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
     p5asciify.asciifier().renderers().enabled(true);
 }
```

***

### get()

> **get**(`rendererName`): [`P5AsciifyRenderer`](P5AsciifyRenderer.md)

Defined in: [renderers/RendererManager.ts:293](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L293)

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
     brightnessRenderer = p5asciify.asciifier().renderers().get('brightness');

     // Use the brightness renderer instance to modify its properties during run-time,
     // instead of constantly calling `p5asciify.asciifier().renderers().get('brightness')`.
 }
```

***

### moveDown()

> **moveDown**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:319](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L319)

Moves a renderer down in the list of renderers, meaning it will be rendered earlier in the pipeline.

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
     p5asciify.asciifier().renderers().moveDown('brightness');

     // Alternatively, you can also pass the renderer instance itself.
 }
```

***

### moveUp()

> **moveUp**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:347](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L347)

Moves a renderer up in the list of renderers, meaning it will be rendered later in the pipeline.

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
     p5asciify.asciifier().renderers().moveUp('accurate');

     // Alternatively, you can also pass the renderer instance itself.
 }
```

***

### remove()

> **remove**(`renderer`): `void`

Defined in: [renderers/RendererManager.ts:375](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L375)

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
     p5asciify.asciifier().renderers().remove('brightness');

     // Alternatively, you can also pass the renderer instance itself.
}
```

***

### swap()

> **swap**(`renderer1`, `renderer2`): `void`

Defined in: [renderers/RendererManager.ts:418](https://github.com/humanbydefinition/p5.asciify/blob/553bb5ac82249ad767c7c569631587ea0b0f6e12/src/lib/renderers/RendererManager.ts#L418)

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
     p5asciify.asciifier().renderers().swap('brightness', 'accurate');

     // Alternatively, you can also pass the renderer instances themselves.
 }
```
