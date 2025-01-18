[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGrid

# Class: P5AsciifyGrid

Defined in: [Grid.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L8)

Represents a 2D grid, where each cell has a fixed width and height.

Based on the current canvas dimensions, the grid is resized to fit the maximum number of cells.

## Constructors

### new P5AsciifyGrid()

> **new P5AsciifyGrid**(`_p`, `_cellWidth`, `_cellHeight`): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Grid.ts:45](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L45)

Create a new grid instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_p` | `__module` | The p5 instance. |
| `_cellWidth` | `number` | The width of each cell in the grid. |
| `_cellHeight` | `number` | The height of each cell in the grid. |

#### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_cellheight-1"></a> `_cellHeight` | `private` | `number` | The height of each cell in the grid. | [Grid.ts:48](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L48) |
| <a id="_cellwidth-1"></a> `_cellWidth` | `private` | `number` | The width of each cell in the grid. | [Grid.ts:47](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L47) |
| <a id="_cols"></a> `_cols` | `private` | `number` | The number of columns in the grid. | [Grid.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L12) |
| <a id="_height"></a> `_height` | `private` | `number` | The total height of the grid in pixels. | [Grid.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L27) |
| <a id="_offsetx"></a> `_offsetX` | `private` | `number` | The offset to the outer canvas on the x-axis when centering the grid. | [Grid.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L32) |
| <a id="_offsety"></a> `_offsetY` | `private` | `number` | The offset to the outer canvas on the y-axis when centering the grid. | [Grid.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L37) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | The p5 instance. | [Grid.ts:46](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L46) |
| <a id="_rows"></a> `_rows` | `private` | `number` | The number of rows in the grid. | [Grid.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L17) |
| <a id="_width"></a> `_width` | `private` | `number` | The total width of the grid in pixels. | [Grid.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L22) |

## Accessors

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [Grid.ts:83](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L83)

##### Returns

`number`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [Grid.ts:82](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L82)

##### Returns

`number`

***

### cols

#### Get Signature

> **get** **cols**(): `number`

Defined in: [Grid.ts:84](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L84)

##### Returns

`number`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [Grid.ts:87](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L87)

##### Returns

`number`

***

### offsetX

#### Get Signature

> **get** **offsetX**(): `number`

Defined in: [Grid.ts:88](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L88)

##### Returns

`number`

***

### offsetY

#### Get Signature

> **get** **offsetY**(): `number`

Defined in: [Grid.ts:89](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L89)

##### Returns

`number`

***

### rows

#### Get Signature

> **get** **rows**(): `number`

Defined in: [Grid.ts:85](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L85)

##### Returns

`number`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [Grid.ts:86](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L86)

##### Returns

`number`

## Methods

### \_resizeGrid()

> `private` **\_resizeGrid**(): `void`

Defined in: [Grid.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L64)

Reset the total grid width & height, and the offset to the outer canvas.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [Grid.ts:56](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L56)

Reset the grid to the default number of columns and rows based on the current canvas, and `_cellWidth` and `_cellHeight`.

#### Returns

`void`

***

### resizeCellPixelDimensions()

> **resizeCellPixelDimensions**(`newCellWidth`, `newCellHeight`): `void`

Defined in: [Grid.ts:76](https://github.com/humanbydefinition/p5-asciify/blob/f78d0db20fa282655dc91b1b72c4b35a00f75e75/src/lib/Grid.ts#L76)

Re-assign the grid cell dimensions and reset the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newCellWidth` | `number` | The new cell width. |
| `newCellHeight` | `number` | The new cell height. |

#### Returns

`void`
