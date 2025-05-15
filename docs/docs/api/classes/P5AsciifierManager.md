# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:22](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L22)

Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances.

This class is implemented as a singleton, meaning only one instance exists throughout the application.
Access the instance through the exposed [p5asciify](../variables/p5asciify.md) object or via [P5AsciifierManager.getInstance](#getinstance).

The manager is responsible for:

- Initializing ASCII rendering capabilities
- Managing multiple asciifier instances
- Coordinating with p5.js rendering lifecycle
- Providing an API for creating, accessing, and removing asciifiers

## Accessors

### asciifiers

#### Get Signature

> **get** **asciifiers**(): [`P5Asciifier`](P5Asciifier.md)[]

Defined in: [AsciifierManager.ts:256](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L256)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

---

### pluginRegistry

#### Get Signature

> **get** **pluginRegistry**(): [`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

Defined in: [AsciifierManager.ts:249](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L249)

Get the plugin registry

##### Returns

[`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

The plugin registry instance

## Methods

### add()

> **add**(`framebuffer?`): [`P5Asciifier`](P5Asciifier.md) \| `Promise`\<[`P5Asciifier`](P5Asciifier.md)\>

Defined in: [AsciifierManager.ts:164](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L164)

Adds a new `P5Asciifier` instance to the library.

#### Parameters

| Parameter      | Type  | Description                                                                                                             |
| -------------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| `framebuffer?` | `any` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

[`P5Asciifier`](P5Asciifier.md) \| `Promise`\<[`P5Asciifier`](P5Asciifier.md)\>

The newly created `P5Asciifier` instance.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the framebuffer is not an instance of `p5.Framebuffer`.

---

### asciifier()

> **asciifier**(`index`): [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:149](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L149)

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

[P5AsciifyError](P5AsciifyError.md) If the index is out of bounds.

---

### registerPlugin()

> **registerPlugin**(`plugin`): `void`

Defined in: [AsciifierManager.ts:241](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L241)

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

Defined in: [AsciifierManager.ts:207](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L207)

Removes a `P5Asciifier` instance.

#### Parameters

| Parameter          | Type                                        | Description                                                                              |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `indexOrAsciifier` | `number` \| [`P5Asciifier`](P5Asciifier.md) | The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the index is out of bounds or the specified asciifier is not found.

---

### getInstance()

> `static` **getInstance**(): `P5AsciifierManager`

Defined in: [AsciifierManager.ts:50](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/AsciifierManager.ts#L50)

Gets the singleton instance of `P5AsciifierManager`.
If the instance doesn't exist yet, it creates one.

#### Returns

`P5AsciifierManager`

The singleton instance of `P5AsciifierManager`.
