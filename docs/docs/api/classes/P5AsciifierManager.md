# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:25](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L25)

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

Defined in: [AsciifierManager.ts:321](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L321)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

---

### hookManager

#### Get Signature

> **get** **hookManager**(): [`P5AsciifyHookManager`](P5AsciifyHookManager.md)

Defined in: [AsciifierManager.ts:314](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L314)

Get the hook manager

##### Returns

[`P5AsciifyHookManager`](P5AsciifyHookManager.md)

The hook manager instance

---

### pluginRegistry

#### Get Signature

> **get** **pluginRegistry**(): [`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

Defined in: [AsciifierManager.ts:306](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L306)

Get the plugin registry

##### Returns

[`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

The plugin registry instance

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:290](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L290)

Activate a registered hook

#### Parameters

| Parameter  | Type                                      | Description                  |
| ---------- | ----------------------------------------- | ---------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to activate |

#### Returns

`void`

---

### add()

> **add**(`framebuffer?`): [`P5Asciifier`](P5Asciifier.md) \| `Promise`\<[`P5Asciifier`](P5Asciifier.md)\>

Defined in: [AsciifierManager.ts:216](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L216)

Adds a new `P5Asciifier` instance to the library.

#### Parameters

| Parameter      | Type          | Description                                                                                                             |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `framebuffer?` | `Framebuffer` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

[`P5Asciifier`](P5Asciifier.md) \| `Promise`\<[`P5Asciifier`](P5Asciifier.md)\>

The newly created `P5Asciifier` instance.

#### Throws

P5AsciifyError If the framebuffer is not an instance of `p5.Framebuffer`.

---

### asciifier()

> **asciifier**(`index`): [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:201](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L201)

Returns the `P5Asciifier` instance at the specified index.

When passing no arguments, the method returns the first `P5Asciifier` instance in the list,
which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.

#### Parameters

| Parameter | Type     | Default value | Description                                        |
| --------- | -------- | ------------- | -------------------------------------------------- |
| `index`   | `number` | `0`           | The index of the `P5Asciifier` instance to return. |

#### Returns

[`P5Asciifier`](P5Asciifier.md)

The `P5Asciifier` instance at the specified index.

#### Throws

P5AsciifyError If the index is out of bounds.

---

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:298](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L298)

Deactivate a registered hook

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### registerPlugin()

> **registerPlugin**(`plugin`): `void`

Defined in: [AsciifierManager.ts:282](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L282)

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

Defined in: [AsciifierManager.ts:259](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L259)

Removes a `P5Asciifier` instance.

#### Parameters

| Parameter          | Type                                        | Description                                                                              |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `indexOrAsciifier` | `number` \| [`P5Asciifier`](P5Asciifier.md) | The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself. |

#### Returns

`void`

#### Throws

P5AsciifyError If the index is out of bounds or the specified asciifier is not found.

---

### getInstance()

> `static` **getInstance**(): `P5AsciifierManager`

Defined in: [AsciifierManager.ts:52](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/AsciifierManager.ts#L52)

Gets the singleton instance of `P5AsciifierManager`.

#### Returns

`P5AsciifierManager`
