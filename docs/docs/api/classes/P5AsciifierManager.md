# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:24](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L24)

Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances.

This class is implemented as a singleton, meaning only one instance exists throughout the application.
Access the instance through the exposed [p5asciify](../variables/p5asciify.md) object or via P5AsciifierManager.getInstance.

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

Defined in: [AsciifierManager.ts:292](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L292)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

---

### hookManager

#### Get Signature

> **get** **hookManager**(): [`P5AsciifyHookManager`](P5AsciifyHookManager.md)

Defined in: [AsciifierManager.ts:285](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L285)

Get the hook manager

##### Returns

[`P5AsciifyHookManager`](P5AsciifyHookManager.md)

The hook manager instance

---

### pluginRegistry

#### Get Signature

> **get** **pluginRegistry**(): [`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

Defined in: [AsciifierManager.ts:277](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L277)

Get the plugin registry

##### Returns

[`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

The plugin registry instance

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:261](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L261)

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

Defined in: [AsciifierManager.ts:187](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L187)

Adds a new `P5Asciifier` instance to the library.

#### Parameters

| Parameter      | Type          | Description                                                                                                             |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `framebuffer?` | `Framebuffer` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

[`P5Asciifier`](P5Asciifier.md) \| `Promise`\<[`P5Asciifier`](P5Asciifier.md)\>

The newly created `P5Asciifier` instance.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the framebuffer is not an instance of `p5.Framebuffer`.

---

### asciifier()

> **asciifier**(`index`): [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:172](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L172)

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

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:269](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L269)

Deactivate a hook without unregistering it

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### getAddonConfig()

> **getAddonConfig**(): `object`

Defined in: [AsciifierManager.ts:85](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L85)

**`Internal`**

Get the addon configuration for p5.js 2.x.x

#### Returns

`object`

| Name          | Type                            | Defined in                                                                                                                                      |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `postdraw()`  | (`this`) => `void`              | [HookManager.ts:333](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L333) |
| `postsetup()` | (`this`) => `Promise`\<`void`\> | [HookManager.ts:319](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L319) |
| `predraw()`   | (`this`) => `void`              | [HookManager.ts:326](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L326) |
| `presetup()`  | (`this`) => `Promise`\<`void`\> | [HookManager.ts:312](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L312) |

---

### registerPlugin()

> **registerPlugin**(`plugin`): `void`

Defined in: [AsciifierManager.ts:253](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L253)

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

Defined in: [AsciifierManager.ts:230](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/AsciifierManager.ts#L230)

Removes a `P5Asciifier` instance.

#### Parameters

| Parameter          | Type                                        | Description                                                                              |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `indexOrAsciifier` | `number` \| [`P5Asciifier`](P5Asciifier.md) | The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the index is out of bounds or the specified asciifier is not found.
