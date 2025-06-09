# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:27](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L27)

Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances.

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

Defined in: [AsciifierManager.ts:451](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L451)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

---

### pluginRegistry

#### Get Signature

> **get** **pluginRegistry**(): [`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

Defined in: [AsciifierManager.ts:444](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L444)

Get the plugin registry

##### Returns

[`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

The plugin registry instance

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:366](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L366)

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

Defined in: [AsciifierManager.ts:242](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L242)

Adds a new `P5Asciifier` instance to the library.

#### Parameters

| Parameter      | Type                        | Description                                                                                                             |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `framebuffer?` | `Framebuffer` \| `Graphics` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

`null` \| [`P5Asciifier`](P5Asciifier.md) \| `Promise`\<`null` \| [`P5Asciifier`](P5Asciifier.md)\>

The newly created `P5Asciifier` instance, or null if validation fails.

---

### asciifier()

> **asciifier**(`index`): `null` \| [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:210](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L210)

Returns the `P5Asciifier` instance at the specified index.

When passing no arguments, the method returns the first `P5Asciifier` instance in the list,
which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.

#### Parameters

| Parameter | Type     | Default value | Description                                        |
| --------- | -------- | ------------- | -------------------------------------------------- |
| `index`   | `number` | `0`           | The index of the `P5Asciifier` instance to return. |

#### Returns

`null` \| [`P5Asciifier`](P5Asciifier.md)

The `P5Asciifier` instance at the specified index.

#### Throws

If the index is out of bounds.

---

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:374](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L374)

Deactivate a registered hook provided by `p5.asciify`.

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### registerPlugin()

> **registerPlugin**(`plugin`): `void`

Defined in: [AsciifierManager.ts:357](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L357)

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

Defined in: [AsciifierManager.ts:297](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L297)

Removes a `P5Asciifier` instance.

#### Parameters

| Parameter          | Type                                        | Description                                                                              |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `indexOrAsciifier` | `number` \| [`P5Asciifier`](P5Asciifier.md) | The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself. |

#### Returns

`void`

---

### setErrorLevel()

> **setErrorLevel**(`level`): `void`

Defined in: [AsciifierManager.ts:397](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L397)

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

### getInstance()

> `static` **getInstance**(): `P5AsciifierManager`

Defined in: [AsciifierManager.ts:54](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/AsciifierManager.ts#L54)

Gets the singleton instance of `P5AsciifierManager`.

#### Returns

`P5AsciifierManager`
