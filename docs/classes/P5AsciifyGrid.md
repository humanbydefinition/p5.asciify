[**p5.asciify v0.7.1**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyGrid

# Class: P5AsciifyGrid

Defined in: [Grid.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L13)

Manages the grid dimensions for the ASCII renderers.
The grid automatically sizes to fit the maximum number of cells based on 
current canvas dimensions and font metrics.

While the grid properties are readable, avoid modifying them directly through this class's methods.
Direct modifications can lead to synchronization issues between the grid and other components.
Instead, use the methods provided by the `P5Asciifier` instance `p5asciify` to modify font properties, 
which will properly propagate changes to the grid.

## Constructors

### new P5AsciifyGrid()

> **new P5AsciifyGrid**(`_p`, `_cellWidth`, `_cellHeight`): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Grid.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L38)

Create a new grid instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_cellWidth` | `number` | The width of each cell in the grid. |
| `_cellHeight` | `number` | The height of each cell in the grid. |

#### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

## Accessors

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [Grid.ts:82](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L82)

Returns the height of each cell in the grid.

##### Returns

`number`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [Grid.ts:77](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L77)

Returns the width of each cell in the grid.

##### Returns

`number`

***

### cols

#### Get Signature

> **get** **cols**(): `number`

Defined in: [Grid.ts:87](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L87)

Returns the number of columns in the grid.

##### Returns

`number`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [Grid.ts:102](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L102)

Returns the total height of the grid.

##### Returns

`number`

***

### offsetX

#### Get Signature

> **get** **offsetX**(): `number`

Defined in: [Grid.ts:107](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L107)

Returns the offset to the outer canvas borders on the x-axis when centering the grid.

##### Returns

`number`

***

### offsetY

#### Get Signature

> **get** **offsetY**(): `number`

Defined in: [Grid.ts:112](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L112)

Returns the offset to the outer canvas borders on the y-axis when centering the grid.

##### Returns

`number`

***

### rows

#### Get Signature

> **get** **rows**(): `number`

Defined in: [Grid.ts:92](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L92)

Returns the number of rows in the grid.

##### Returns

`number`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [Grid.ts:97](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L97)

Returns the total width of the grid.

##### Returns

`number`

## Methods

### reset()

> **reset**(): `void`

Defined in: [Grid.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L49)

Reset the grid to the default number of columns and rows based on the current canvas dimensions, and the grid cell dimensions.

#### Returns

`void`

***

### resizeCellPixelDimensions()

> **resizeCellPixelDimensions**(`newCellWidth`, `newCellHeight`): `void`

Defined in: [Grid.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/240f04ae8120d8b0eda0aa09e3fda1b41eb9a25b/src/lib/Grid.ts#L69)

Re-assign the grid cell dimensions and `reset()` the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newCellWidth` | `number` | The new cell width. |
| `newCellHeight` | `number` | The new cell height. |

#### Returns

`void`
