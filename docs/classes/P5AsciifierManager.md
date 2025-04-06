[**p5.asciify v0.7.4**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifierManager

# Class: P5AsciifierManager

Defined in: AsciifierManager.ts:10

Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances through the exposed [p5asciify](../variables/p5asciify.md) object, which is an instance of this class.

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="hooksenabled"></a> `hooksEnabled` | `public` | `boolean` | `true` | Defines whether the hooks are enabled or not. | AsciifierManager.ts:22 |

## Accessors

### asciifiers

#### Get Signature

> **get** **asciifiers**(): [`P5Asciifier`](P5Asciifier.md)[]

Defined in: AsciifierManager.ts:182

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

## Methods

### add()

> **add**(`framebuffer`?): [`P5Asciifier`](P5Asciifier.md)

Defined in: AsciifierManager.ts:149

Adds a new `P5Asciifier` instance to the library.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `framebuffer`? | `Framebuffer` | The framebuffer to capture for ASCII conversion. If not provided, the main canvas of the `p5.js` instance will be used. |

#### Returns

[`P5Asciifier`](P5Asciifier.md)

The newly created `P5Asciifier` instance.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the framebuffer is not an instance of `p5.Framebuffer`.

***

### asciifier()

> **asciifier**(`index`): [`P5Asciifier`](P5Asciifier.md)

Defined in: AsciifierManager.ts:134

Returns the `P5Asciifier` instance at the specified index.

By default, the method returns the first `P5Asciifier` instance in the list, 
which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `index` | `number` | `0` | The index of the `P5Asciifier` instance to return. |

#### Returns

[`P5Asciifier`](P5Asciifier.md)

The `P5Asciifier` instance at the specified index.

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the index is out of bounds.

***

### registerDrawHooks()

> **registerDrawHooks**(`p`): `void`

Defined in: AsciifierManager.ts:77

Registers the pre-draw and post-draw hooks with p5.js.
This method is called after the setup is complete.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `__module` | The p5 instance. |

#### Returns

`void`

***

### remove()

> **remove**(`index`): `void`

Defined in: AsciifierManager.ts:171

Removes the `P5Asciifier` instance at the specified index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The index of the `P5Asciifier` instance to remove. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the index is out of bounds.

***

### unregisterHooks()

> **unregisterHooks**(): `void`

Defined in: AsciifierManager.ts:35

Unregisters all hooks so that the user can opt out of the automatic hook behavior.

#### Returns

`void`
