[**p5.asciify v0.8.0**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifierManager

# Class: P5AsciifierManager

Defined in: [AsciifierManager.ts:10](https://github.com/humanbydefinition/p5.asciify/blob/b019705f5b5ac899f9bd233de3aa255aa7f68509/src/lib/AsciifierManager.ts#L10)

Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances through the exposed [p5asciify](../variables/p5asciify.md) object, which is an instance of this class.

## Accessors

### asciifiers

#### Get Signature

> **get** **asciifiers**(): [`P5Asciifier`](P5Asciifier.md)[]

Defined in: [AsciifierManager.ts:155](https://github.com/humanbydefinition/p5.asciify/blob/b019705f5b5ac899f9bd233de3aa255aa7f68509/src/lib/AsciifierManager.ts#L155)

Returns the list of `P5Asciifier` instances managed by the library.

##### Returns

[`P5Asciifier`](P5Asciifier.md)[]

## Methods

### add()

> **add**(`framebuffer`?): [`P5Asciifier`](P5Asciifier.md)

Defined in: [AsciifierManager.ts:100](https://github.com/humanbydefinition/p5.asciify/blob/b019705f5b5ac899f9bd233de3aa255aa7f68509/src/lib/AsciifierManager.ts#L100)

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

Defined in: [AsciifierManager.ts:85](https://github.com/humanbydefinition/p5.asciify/blob/b019705f5b5ac899f9bd233de3aa255aa7f68509/src/lib/AsciifierManager.ts#L85)

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

### remove()

> **remove**(`indexOrAsciifier`): `void`

Defined in: [AsciifierManager.ts:122](https://github.com/humanbydefinition/p5.asciify/blob/b019705f5b5ac899f9bd233de3aa255aa7f68509/src/lib/AsciifierManager.ts#L122)

Removes a `P5Asciifier` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `indexOrAsciifier` | `number` \| [`P5Asciifier`](P5Asciifier.md) | The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself. |

#### Returns

`void`

#### Throws

[P5AsciifyError](P5AsciifyError.md) If the index is out of bounds or the specified asciifier is not found.
