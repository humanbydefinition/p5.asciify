[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../README.md) / P5AsciifyGrid

# Class: P5AsciifyGrid

Defined in: [Grid.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L8)

Manages the grid dimensions for the ASCII renderers.

Based on the current canvas and font glyph dimensions, the grid is sized to fit the maximum number of cells.

## Constructors

### new P5AsciifyGrid()

> **new P5AsciifyGrid**(`_p`, `_cellWidth`, `_cellHeight`): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Grid.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L33)

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
| <a id="_cellheight-1"></a> `_cellHeight` | `private` | `number` | The height of each cell in the grid. | [Grid.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L36) |
| <a id="_cellwidth-1"></a> `_cellWidth` | `private` | `number` | The width of each cell in the grid. | [Grid.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L35) |
| <a id="_cols"></a> `_cols` | `private` | `number` | The number of columns in the grid. | [Grid.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L10) |
| <a id="_height"></a> `_height` | `private` | `number` | The total height of the grid in pixels. | [Grid.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L19) |
| <a id="_offsetx"></a> `_offsetX` | `private` | `number` | The offset to the outer canvas on the x-axis when centering the grid. | [Grid.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L22) |
| <a id="_offsety"></a> `_offsetY` | `private` | `number` | The offset to the outer canvas on the y-axis when centering the grid. | [Grid.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L25) |
| <a id="_p-1"></a> `_p` | `private` | `__module` | The p5 instance. | [Grid.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L34) |
| <a id="_rows"></a> `_rows` | `private` | `number` | The number of rows in the grid. | [Grid.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L13) |
| <a id="_width"></a> `_width` | `private` | `number` | The total width of the grid in pixels. | [Grid.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L16) |

## Accessors

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [Grid.ts:71](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L71)

##### Returns

`number`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [Grid.ts:70](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L70)

##### Returns

`number`

***

### cols

#### Get Signature

> **get** **cols**(): `number`

Defined in: [Grid.ts:72](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L72)

##### Returns

`number`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [Grid.ts:75](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L75)

##### Returns

`number`

***

### offsetX

#### Get Signature

> **get** **offsetX**(): `number`

Defined in: [Grid.ts:76](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L76)

##### Returns

`number`

***

### offsetY

#### Get Signature

> **get** **offsetY**(): `number`

Defined in: [Grid.ts:77](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L77)

##### Returns

`number`

***

### rows

#### Get Signature

> **get** **rows**(): `number`

Defined in: [Grid.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L73)

##### Returns

`number`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [Grid.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L74)

##### Returns

`number`

## Methods

### \_resizeGrid()

> `private` **\_resizeGrid**(): `void`

Defined in: [Grid.ts:52](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L52)

Reset the total grid width & height, and the offset to the outer canvas.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [Grid.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L44)

Reset the grid to the default number of columns and rows based on the current canvas dimensions, and `_cellWidth` and `_cellHeight`.

#### Returns

`void`

***

### resizeCellPixelDimensions()

> **resizeCellPixelDimensions**(`newCellWidth`, `newCellHeight`): `void`

Defined in: [Grid.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/b2e2acf40c3dc8f3fd384fd8c87e98bcbf502f21/src/lib/Grid.ts#L64)

Re-assign the grid cell dimensions and reset the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newCellWidth` | `number` | The new cell width. |
| `newCellHeight` | `number` | The new cell height. |

#### Returns

`void`
