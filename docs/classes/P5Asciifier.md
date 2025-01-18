[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L12)

The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

### \_borderColor

> `private` **\_borderColor**: `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

Defined in: [Asciifier.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L13)

***

### \_font

> `private` **\_font**: `Font`

Defined in: [Asciifier.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L16)

***

### \_fontSize

> `private` **\_fontSize**: `number`

Defined in: [Asciifier.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L14)

***

### asciiFontTextureAtlas

> **asciiFontTextureAtlas**: [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md)

Defined in: [Asciifier.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L18)

***

### grid

> **grid**: [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Asciifier.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L19)

***

### p

> `private` **p**: `__module`

Defined in: [Asciifier.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L17)

***

### rendererManager

> **rendererManager**: `RendererManager`

Defined in: [Asciifier.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L15)

***

### sketchFramebuffer

> **sketchFramebuffer**: `Framebuffer`

Defined in: [Asciifier.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L20)

## Accessors

### borderColor

#### Get Signature

> **get** **borderColor**(): `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

Defined in: [Asciifier.ts:115](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L115)

##### Returns

`string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

#### Set Signature

> **set** **borderColor**(`color`): `void`

Defined in: [Asciifier.ts:104](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L104)

Sets the border color for the ascii renderers.

##### Throws

If the color is not a string, array or p5.Color.

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`color`

</td>
<td>

`string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

</td>
<td>

The color to set.

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [Asciifier.ts:114](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L114)

##### Returns

`Font`

#### Set Signature

> **set** **font**(`font`): `void`

Defined in: [Asciifier.ts:85](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L85)

Sets the font for the ascii renderers.

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`font`

</td>
<td>

`Font`

</td>
<td>

The font to set.

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [Asciifier.ts:113](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L113)

##### Returns

`number`

#### Set Signature

> **set** **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:62](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L62)

Sets the font size for the ascii renderers

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fontSize`

</td>
<td>

`number`

</td>
<td>

The font size to set

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

## Methods

### instance()

> **instance**(`p`, `addDummyPreloadFunction`): `void`

Defined in: [Asciifier.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L26)

Initialize the p5 instance for the Asciifier

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`__module`

</td>
<td>

`undefined`

</td>
<td>

The p5 instance

</td>
</tr>
<tr>
<td>

`addDummyPreloadFunction`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/f02ca91b53ec7b24731659c0e56dabb5a64ea74e/src/lib/Asciifier.ts#L38)

Sets up the P5Asciify library with the specified options

#### Returns

`void`
