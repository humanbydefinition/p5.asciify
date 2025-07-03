# Class: P5AsciifyPluginRegistry

Defined in: [plugins/PluginRegistry.ts:7](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L7)

Registry that manages renderer plugins for p5.asciify.

## Constructors

### Constructor

> **new P5AsciifyPluginRegistry**(): `P5AsciifyPluginRegistry`

#### Returns

`P5AsciifyPluginRegistry`

## Methods

### get()

> **get**(`id`): `undefined` \| [`P5AsciifyRendererPlugin`](../interfaces/P5AsciifyRendererPlugin.md)

Defined in: [plugins/PluginRegistry.ts:68](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L68)

Get a plugin by its ID

#### Parameters

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `id`      | `string` | Plugin ID   |

#### Returns

`undefined` \| [`P5AsciifyRendererPlugin`](../interfaces/P5AsciifyRendererPlugin.md)

The plugin instance or undefined if not found

---

### getAll()

> **getAll**(): [`P5AsciifyRendererPlugin`](../interfaces/P5AsciifyRendererPlugin.md)[]

Defined in: [plugins/PluginRegistry.ts:93](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L93)

Get all registered plugins

#### Returns

[`P5AsciifyRendererPlugin`](../interfaces/P5AsciifyRendererPlugin.md)[]

Array of plugin instances

---

### getIds()

> **getIds**(): `string`[]

Defined in: [plugins/PluginRegistry.ts:85](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L85)

Get all registered plugin IDs

#### Returns

`string`[]

Array of plugin IDs

---

### has()

> **has**(`id`): `boolean`

Defined in: [plugins/PluginRegistry.ts:59](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L59)

Check if a plugin with the given ID is registered

#### Parameters

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `id`      | `string` | Plugin ID to check |

#### Returns

`boolean`

True if the plugin exists, false otherwise

---

### register()

> **register**(`plugin`): `boolean`

Defined in: [plugins/PluginRegistry.ts:16](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L16)

Registers a new renderer plugin.

#### Parameters

| Parameter | Type                                                                  | Description                     |
| --------- | --------------------------------------------------------------------- | ------------------------------- |
| `plugin`  | [`P5AsciifyRendererPlugin`](../interfaces/P5AsciifyRendererPlugin.md) | The renderer plugin to register |

#### Returns

`boolean`

#### Throws

If a plugin with the same ID is already registered or conflicts with built-in renderers

---

### unregister()

> **unregister**(`id`): `boolean`

Defined in: [plugins/PluginRegistry.ts:77](https://github.com/humanbydefinition/p5.asciify/blob/4d546c48ccedf48d92566d5d67cf0ee23c09e577/src/lib/plugins/PluginRegistry.ts#L77)

Unregister a plugin by its ID

#### Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `id`      | `string` | Plugin ID to remove |

#### Returns

`boolean`

True if the plugin was removed, false if it wasn't found
