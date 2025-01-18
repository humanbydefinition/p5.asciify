[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGrid

# Class: P5AsciifyGrid

Defined in: [Grid.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L6)

Represents a 2D grid, handling the dimensions and resizing of the grid.

## Constructors

### new P5AsciifyGrid()

> **new P5AsciifyGrid**(`p`: `__module`, `_cellWidth`: `number`, `_cellHeight`: `number`): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Grid.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L14)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_cellWidth` | `number` |
| `_cellHeight` | `number` |

#### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_cellheight-1"></a> `_cellHeight` | `private` | `number` | `undefined` | [Grid.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L17) |
| <a id="_cellwidth-1"></a> `_cellWidth` | `private` | `number` | `undefined` | [Grid.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L16) |
| <a id="_cols"></a> `_cols` | `private` | `number` | `0` | [Grid.ts:7](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L7) |
| <a id="_height"></a> `_height` | `private` | `number` | `0` | [Grid.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L10) |
| <a id="_offsetx"></a> `_offsetX` | `private` | `number` | `0` | [Grid.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L11) |
| <a id="_offsety"></a> `_offsetY` | `private` | `number` | `0` | [Grid.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L12) |
| <a id="_rows"></a> `_rows` | `private` | `number` | `0` | [Grid.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L8) |
| <a id="_width"></a> `_width` | `private` | `number` | `0` | [Grid.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L9) |
| <a id="p-1"></a> `p` | `private` | `__module` | `undefined` | [Grid.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L15) |

## Accessors

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [Grid.ts:63](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L63)

##### Returns

`number`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [Grid.ts:62](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L62)

##### Returns

`number`

***

### cols

#### Get Signature

> **get** **cols**(): `number`

Defined in: [Grid.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L64)

##### Returns

`number`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [Grid.ts:67](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L67)

##### Returns

`number`

***

### offsetX

#### Get Signature

> **get** **offsetX**(): `number`

Defined in: [Grid.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L68)

##### Returns

`number`

***

### offsetY

#### Get Signature

> **get** **offsetY**(): `number`

Defined in: [Grid.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L69)

##### Returns

`number`

***

### rows

#### Get Signature

> **get** **rows**(): `number`

Defined in: [Grid.ts:65](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L65)

##### Returns

`number`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [Grid.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L66)

##### Returns

`number`

## Methods

### \_calculateGridSize()

> `private` **\_calculateGridSize**(): \[`number`, `number`\]

Defined in: [Grid.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L44)

Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.

#### Returns

\[`number`, `number`\]

The number of columns and rows in the grid.

***

### \_resizeGrid()

> `private` **\_resizeGrid**(): `void`

Defined in: [Grid.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L33)

Reset the total grid width/height and the offset to the outer canvas.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [Grid.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L25)

Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.

#### Returns

`void`

***

### resizeCellPixelDimensions()

> **resizeCellPixelDimensions**(`newCellWidth`: `number`, `newCellHeight`: `number`): `void`

Defined in: [Grid.ts:56](https://github.com/humanbydefinition/p5-asciify/blob/078f4b1646c936e58db623927bca2f91152b5a58/src/lib/Grid.ts#L56)

Re-assign the grid cell dimensions and reset the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newCellWidth` | `number` | The new cell width. |
| `newCellHeight` | `number` | The new cell height. |

#### Returns

`void`
