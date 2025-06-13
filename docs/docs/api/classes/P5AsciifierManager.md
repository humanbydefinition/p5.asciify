# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:27](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L27)

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

Defined in: [AsciifierManager.ts:537](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L537)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

---

### pluginRegistry

#### Get Signature

> **get** **pluginRegistry**(): [`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

Defined in: [AsciifierManager.ts:530](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L530)

Get the plugin registry

##### Returns

[`P5AsciifyPluginRegistry`](../p5.asciify/namespaces/plugins/classes/P5AsciifyPluginRegistry.md)

The plugin registry instance

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:414](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L414)

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

Defined in: [AsciifierManager.ts:291](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L291)

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

Defined in: [AsciifierManager.ts:259](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L259)

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

### asciify()

> **asciify**(): `void`

Defined in: [AsciifierManager.ts:242](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L242)

Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.

This method is called automatically by the library after the `draw()` function of the `p5.js` instance has finished executing.

**If the `post` hook is disabled, this method will not be called automatically.**

#### Returns

`void`

---

### background()

> **background**(`color`): `void`

Defined in: [AsciifierManager.ts:220](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L220)

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

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [AsciifierManager.ts:422](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L422)

Deactivate a registered hook provided by `p5.asciify`.

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### init()

> **init**(`p`): `Promise`\<`void`\>

Defined in: [AsciifierManager.ts:133](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L133)

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

Defined in: [AsciifierManager.ts:405](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L405)

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

Defined in: [AsciifierManager.ts:345](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L345)

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

Defined in: [AsciifierManager.ts:445](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L445)

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

Defined in: [AsciifierManager.ts:182](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L182)

Sets up the `P5Asciifier` instances managed by the library.

This method is called automatically by the library after the `setup()` function of the `p5.js` instance has finished executing.

**If the `afterSetup` hook is disabled, this method will not be called automatically.**

#### Returns

`Promise`\<`void`\>

---

### getInstance()

> `static` **getInstance**(): `P5AsciifierManager`

Defined in: [AsciifierManager.ts:62](https://github.com/humanbydefinition/p5.asciify/blob/ace1342891258faf7ebc3f7702cd043e86c2060a/src/lib/AsciifierManager.ts#L62)

Gets the singleton instance of `P5AsciifierManager`.

#### Returns

`P5AsciifierManager`
