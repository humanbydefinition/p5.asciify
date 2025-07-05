# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:27](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L27)

Manages the `p5.asciify` library by handling one or more [P5Asciifier](P5Asciifier.md) instances.

This class is implemented as a singleton, meaning only one instance exists throughout the application.
Access the instance through the exposed [p5asciify](../variables/p5asciify.md) object or via [P5AsciifierManager.getInstance](#getinstance).

The manager is responsible for:

- Initializing ASCII rendering capabilities
- Managing multiple asciifier instances
- Coordinating with p5.js rendering lifecycle
- Providing an API for creating, accessing, and removing asciifiers
- Managing p5.js lifecycle hooks through HookManager

## Accessors

### asciifiers

#### Get Signature

> **get** **asciifiers**(): [`P5Asciifier`](P5Asciifier.md)[]

Defined in: [AsciifierManager.ts:588](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L588)

Returns the list of [P5Asciifier](P5Asciifier.md) instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

---

### pluginRegistry

#### Get Signature

> **get** **pluginRegistry**(): [`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

Defined in: [AsciifierManager.ts:581](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L581)

Get the plugin registry

##### Returns

[`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

The plugin registry instance

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:465](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L465)

Activate a registered hook provided by `p5.asciify`.

#### Parameters

| Parameter  | Type                                      | Description                  |
| ---------- | ----------------------------------------- | ---------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to activate |

#### Returns

`void`

---

### add()

> **add**(`framebuffer?`): `null` \| [`P5Asciifier`](P5Asciifier.md) \| `Promise`\<`null` \| [`P5Asciifier`](P5Asciifier.md)\>

Defined in: [AsciifierManager.ts:342](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L342)

Adds a new [P5Asciifier](P5Asciifier.md) instance to the library.

#### Parameters

| Parameter      | Type                        | Description                                                                                                             |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `framebuffer?` | `Framebuffer` \| `Graphics` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

`null` \| [`P5Asciifier`](P5Asciifier.md) \| `Promise`\<`null` \| [`P5Asciifier`](P5Asciifier.md)\>

The newly created [P5Asciifier](P5Asciifier.md) instance, or null if validation fails.

---

### asciifier()

> **asciifier**(`index`): `null` \| [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:310](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L310)

Returns the [P5Asciifier](P5Asciifier.md) instance at the specified index.

When passing no arguments, the method returns the first [P5Asciifier](P5Asciifier.md) instance in the list,
which usually corresponds to the default [P5Asciifier](P5Asciifier.md) provided by the library, which is applied to the main canvas of the `p5.js` instance.

#### Parameters

| Parameter | Type     | Default value | Description                                                        |
| --------- | -------- | ------------- | ------------------------------------------------------------------ |
| `index`   | `number` | `0`           | The index of the [P5Asciifier](P5Asciifier.md) instance to return. |

#### Returns

`null` \| [`P5Asciifier`](P5Asciifier.md)

The [P5Asciifier](P5Asciifier.md) instance at the specified index.

#### Throws

If the index is out of bounds.

---

### asciify()

> **asciify**(): `void`

Defined in: [AsciifierManager.ts:293](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L293)

Executes the ASCII conversion rendering pipelines for each [P5Asciifier](P5Asciifier.md) instance managed by the library.

This method is called automatically by the library after the `draw()` function of the `p5.js` instance has finished executing.

**If the `post` hook is disabled, this method will not be called automatically.**

#### Returns

`void`

---

### background()

> **background**(`color`): `void`

Defined in: [AsciifierManager.ts:220](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L220)

Set the background color when drawing all managed [P5Asciifier](P5Asciifier.md) instances to the canvas.

To make the background transparent, pass an appropriate color value with an alpha value of `0`.

#### Parameters

| Parameter | Type                                                                 | Description                                                                                          |
| --------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `color`   | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js. |

#### Returns

`void`

#### Throws

If the color is not a string, array or `p5.Color`.

#### Example

```javascript
function setupAsciify() {
  // Set the background color to black.
  p5asciify.background("#000000");
}
```

---

### backgroundMode()

> **backgroundMode**(`mode`): `void`

Defined in: [AsciifierManager.ts:279](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L279)

Sets the background mode for all managed [P5Asciifier](P5Asciifier.md) instances simultaneously.

#### Parameters

| Parameter | Type                     | Default value | Description                                                                 |
| --------- | ------------------------ | ------------- | --------------------------------------------------------------------------- |
| `mode`    | `"sampled"` \| `"fixed"` | `"fixed"`     | The background mode to set for the [P5Asciifier](P5Asciifier.md) instances. |

#### Returns

`void`

---

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:473](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L473)

Deactivate a registered hook provided by `p5.asciify`.

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### font()

> **font**(`font`): `void`

Defined in: [AsciifierManager.ts:248](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L248)

Sets the font for all managed [P5Asciifier](P5Asciifier.md) instances simultaneously.

#### Parameters

| Parameter | Type   | Description                                                                                        |
| --------- | ------ | -------------------------------------------------------------------------------------------------- |
| `font`    | `Font` | The `p5.Font` instance to set as the font for all managed [P5Asciifier](P5Asciifier.md) instances. |

#### Returns

`void`

---

### fontSize()

> **fontSize**(`size`): `void`

Defined in: [AsciifierManager.ts:238](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L238)

Sets the font size for all managed [P5Asciifier](P5Asciifier.md) instances simultaneously.

#### Parameters

| Parameter | Type     | Description                                                           |
| --------- | -------- | --------------------------------------------------------------------- |
| `size`    | `number` | The font size to set for the [P5Asciifier](P5Asciifier.md) instances. |

#### Returns

`void`

---

### gridDimensions()

> **gridDimensions**(`gridCols`, `gridRows`): `void`

Defined in: [AsciifierManager.ts:259](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L259)

Sets the grid dimensions for all managed [P5Asciifier](P5Asciifier.md) instances simultaneously.

#### Parameters

| Parameter  | Type     | Description                              |
| ---------- | -------- | ---------------------------------------- |
| `gridCols` | `number` | The number of columns in the ASCII grid. |
| `gridRows` | `number` | The number of rows in the ASCII grid.    |

#### Returns

`void`

---

### gridResponsive()

> **gridResponsive**(`bool`): `void`

Defined in: [AsciifierManager.ts:269](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L269)

Sets whether the ASCII grid should be responsive to the size of the canvas for all managed [P5Asciifier](P5Asciifier.md) instances.

#### Parameters

| Parameter | Type      | Default value | Description                                                                                                                           |
| --------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `bool`    | `boolean` | `true`        | If `true`, the ASCII grid will adjust its size based on the canvas dimensions. Otherwise, it will always use the set grid dimensions. |

#### Returns

`void`

---

### init()

> **init**(`p`): `Promise`\<`void`\>

Defined in: [AsciifierManager.ts:133](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L133)

Initializes the `p5.asciify` library by setting the `p5.js` instance.

This method is called automatically by the library when the `p5.js` instance is created.

**If the `init` hook is disabled, this method will not be called automatically.**

#### Parameters

| Parameter | Type       | Description                                |
| --------- | ---------- | ------------------------------------------ |
| `p`       | `__module` | The p5.js instance to use for the library. |

#### Returns

`Promise`\<`void`\>

---

### registerPlugin()

> **registerPlugin**(`plugin`): `void`

Defined in: [AsciifierManager.ts:456](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L456)

Register a new renderer plugin with p5.asciify

#### Parameters

| Parameter | Type                                                                                                | Description                     |
| --------- | --------------------------------------------------------------------------------------------------- | ------------------------------- |
| `plugin`  | [`P5AsciifyRendererPlugin`](../p5.asciify/namespaces/plugins/interfaces/P5AsciifyRendererPlugin.md) | The renderer plugin to register |

#### Returns

`void`

---

### remove()

> **remove**(`indexOrAsciifier`): `void`

Defined in: [AsciifierManager.ts:396](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L396)

Removes a [P5Asciifier](P5Asciifier.md) instance.

#### Parameters

| Parameter          | Type                                        | Description                                                                                                              |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `indexOrAsciifier` | `number` \| [`P5Asciifier`](P5Asciifier.md) | The index of the [P5Asciifier](P5Asciifier.md) instance to remove, or the [P5Asciifier](P5Asciifier.md) instance itself. |

#### Returns

`void`

---

### setErrorLevel()

> **setErrorLevel**(`level`): `void`

Defined in: [AsciifierManager.ts:496](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L496)

Set the global error level for the library.

Controls how validation failures and errors are handled throughout p5.asciify.
This affects all asciifier instances and library operations.

#### Parameters

| Parameter | Type                                                                                         | Description                                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `level`   | [`P5AsciifyErrorLevel`](../p5.asciify/namespaces/errors/enumerations/P5AsciifyErrorLevel.md) | The error level to set. Use [P5AsciifyErrorLevel](../p5.asciify/namespaces/errors/enumerations/P5AsciifyErrorLevel.md) enum values. |

#### Returns

`void`

#### Example

```typescript
// Set to warning level for non-critical applications
p5asciify.setErrorLevel(P5AsciifyErrorLevel.WARNING);

// Silent mode for production environments
p5asciify.setErrorLevel(P5AsciifyErrorLevel.SILENT);
```

#### See

[P5AsciifyErrorLevel](../p5.asciify/namespaces/errors/enumerations/P5AsciifyErrorLevel.md) for detailed descriptions of each level

---

### setup()

> **setup**(): `Promise`\<`void`\>

Defined in: [AsciifierManager.ts:182](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L182)

Sets up the [P5Asciifier](P5Asciifier.md) instances managed by the library.

This method is called automatically by the library after the `setup()` function of the `p5.js` instance has finished executing.

**If the `afterSetup` hook is disabled, this method will not be called automatically.**

#### Returns

`Promise`\<`void`\>

---

### getInstance()

> `static` **getInstance**(): `P5AsciifierManager`

Defined in: [AsciifierManager.ts:62](https://github.com/humanbydefinition/p5.asciify/blob/c490e4c082a59f4e6823b1b6390d5dc7162b2aff/src/lib/AsciifierManager.ts#L62)

Gets the singleton instance of `P5AsciifierManager`.

#### Returns

`P5AsciifierManager`
