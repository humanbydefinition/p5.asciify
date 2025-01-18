[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGrid

# Class: P5AsciifyGrid

Defined in: [Grid.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L6)

Represents a 2D grid, handling the dimensions and resizing of the grid.

## Constructors

### new P5AsciifyGrid()

> **new P5AsciifyGrid**(`p`, `_cellWidth`, `_cellHeight`): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Grid.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_cellWidth` | `number` |
| `_cellHeight` | `number` |

#### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="_cellheight-1"></a> `_cellHeight` | `private` | `number` | - | [Grid.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L22) |
| <a id="_cellwidth-1"></a> `_cellWidth` | `private` | `number` | - | [Grid.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L21) |
| <a id="_cols"></a> `_cols` | `private` | `number` | The number of columns in the grid. | [Grid.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L10) |
| <a id="_height"></a> `_height` | `private` | `number` | - | [Grid.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L15) |
| <a id="_offsetx"></a> `_offsetX` | `private` | `number` | - | [Grid.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L16) |
| <a id="_offsety"></a> `_offsetY` | `private` | `number` | - | [Grid.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L17) |
| <a id="_rows"></a> `_rows` | `private` | `number` | - | [Grid.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L13) |
| <a id="_width"></a> `_width` | `private` | `number` | - | [Grid.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L14) |
| <a id="p-1"></a> `p` | `private` | `__module` | - | [Grid.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L20) |

## Accessors

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [Grid.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L68)

##### Returns

`number`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [Grid.ts:67](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L67)

##### Returns

`number`

***

### cols

#### Get Signature

> **get** **cols**(): `number`

Defined in: [Grid.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L69)

##### Returns

`number`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [Grid.ts:72](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L72)

##### Returns

`number`

***

### offsetX

#### Get Signature

> **get** **offsetX**(): `number`

Defined in: [Grid.ts:73](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L73)

##### Returns

`number`

***

### offsetY

#### Get Signature

> **get** **offsetY**(): `number`

Defined in: [Grid.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L74)

##### Returns

`number`

***

### rows

#### Get Signature

> **get** **rows**(): `number`

Defined in: [Grid.ts:70](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L70)

##### Returns

`number`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [Grid.ts:71](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L71)

##### Returns

`number`

## Methods

### \_calculateGridSize()

> `private` **\_calculateGridSize**(): \[`number`, `number`\]

Defined in: [Grid.ts:49](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L49)

Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.

#### Returns

\[`number`, `number`\]

The number of columns and rows in the grid.

***

### \_resizeGrid()

> `private` **\_resizeGrid**(): `void`

Defined in: [Grid.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L38)

Reset the total grid width/height and the offset to the outer canvas.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [Grid.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L30)

Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.

#### Returns

`void`

***

### resizeCellPixelDimensions()

> **resizeCellPixelDimensions**(`newCellWidth`, `newCellHeight`): `void`

Defined in: [Grid.ts:61](https://github.com/humanbydefinition/p5-asciify/blob/8b9754061a259b1877278d671905c17115a4d58b/src/lib/Grid.ts#L61)

Re-assign the grid cell dimensions and reset the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newCellWidth` | `number` | The new cell width. |
| `newCellHeight` | `number` | The new cell height. |

#### Returns

`void`
