# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:19](https://github.com/humanbydefinition/p5.asciify/blob/00720ad8f2ef8d8a53f9642532fdf1c23814b144/src/lib/AsciifierManager.ts#L19)

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

Defined in: [AsciifierManager.ts:192](https://github.com/humanbydefinition/p5.asciify/blob/00720ad8f2ef8d8a53f9642532fdf1c23814b144/src/lib/AsciifierManager.ts#L192)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

## Methods

### add()

> **add**(`framebuffer?`): [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:137](https://github.com/humanbydefinition/p5.asciify/blob/00720ad8f2ef8d8a53f9642532fdf1c23814b144/src/lib/AsciifierManager.ts#L137)

Adds a new `P5Asciifier` instance to the library.

#### Parameters

| Parameter      | Type          | Description                                                                                                             |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `framebuffer?` | `Framebuffer` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

[`P5Asciifier`](P5Asciifier.md)

The newly created `P5Asciifier` instance.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the framebuffer is not an instance of `p5.Framebuffer`.

---

### asciifier()

> **asciifier**(`index`): [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:122](https://github.com/humanbydefinition/p5.asciify/blob/00720ad8f2ef8d8a53f9642532fdf1c23814b144/src/lib/AsciifierManager.ts#L122)

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

### remove()

> **remove**(`indexOrAsciifier`): `void`

Defined in: [AsciifierManager.ts:159](https://github.com/humanbydefinition/p5.asciify/blob/00720ad8f2ef8d8a53f9642532fdf1c23814b144/src/lib/AsciifierManager.ts#L159)

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

Defined in: [AsciifierManager.ts:44](https://github.com/humanbydefinition/p5.asciify/blob/00720ad8f2ef8d8a53f9642532fdf1c23814b144/src/lib/AsciifierManager.ts#L44)

Gets the singleton instance of `P5AsciifierManager`.
If the instance doesn't exist yet, it creates one.

#### Returns

`P5AsciifierManager`

The singleton instance of `P5AsciifierManager`.
