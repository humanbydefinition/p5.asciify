[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5AsciifyGrid

# Class: P5AsciifyGrid

Defined in: [Grid.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L6)

Represents a 2D grid, handling the dimensions and resizing of the grid.

## Constructors

### new P5AsciifyGrid()

> **new P5AsciifyGrid**(`p`, `_cellWidth`, `_cellHeight`): [`P5AsciifyGrid`](P5AsciifyGrid.md)

Defined in: [Grid.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L14)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `__module` |
| `_cellWidth` | `number` |
| `_cellHeight` | `number` |

#### Returns

[`P5AsciifyGrid`](P5AsciifyGrid.md)

## Properties

### \_cellHeight

> `private` **\_cellHeight**: `number`

Defined in: [Grid.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L17)

***

### \_cellWidth

> `private` **\_cellWidth**: `number`

Defined in: [Grid.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L16)

***

### \_cols

> `private` **\_cols**: `number` = `0`

Defined in: [Grid.ts:7](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L7)

***

### \_height

> `private` **\_height**: `number` = `0`

Defined in: [Grid.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L10)

***

### \_offsetX

> `private` **\_offsetX**: `number` = `0`

Defined in: [Grid.ts:11](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L11)

***

### \_offsetY

> `private` **\_offsetY**: `number` = `0`

Defined in: [Grid.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L12)

***

### \_rows

> `private` **\_rows**: `number` = `0`

Defined in: [Grid.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L8)

***

### \_width

> `private` **\_width**: `number` = `0`

Defined in: [Grid.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L9)

***

### p

> `private` **p**: `__module`

Defined in: [Grid.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L15)

## Accessors

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [Grid.ts:63](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L63)

##### Returns

`number`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [Grid.ts:62](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L62)

##### Returns

`number`

***

### cols

#### Get Signature

> **get** **cols**(): `number`

Defined in: [Grid.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L64)

##### Returns

`number`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [Grid.ts:67](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L67)

##### Returns

`number`

***

### offsetX

#### Get Signature

> **get** **offsetX**(): `number`

Defined in: [Grid.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L68)

##### Returns

`number`

***

### offsetY

#### Get Signature

> **get** **offsetY**(): `number`

Defined in: [Grid.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L69)

##### Returns

`number`

***

### rows

#### Get Signature

> **get** **rows**(): `number`

Defined in: [Grid.ts:65](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L65)

##### Returns

`number`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [Grid.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L66)

##### Returns

`number`

## Methods

### \_calculateGridSize()

> `private` **\_calculateGridSize**(): \[`number`, `number`\]

Defined in: [Grid.ts:44](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L44)

Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.

#### Returns

\[`number`, `number`\]

The number of columns and rows in the grid.

***

### \_resizeGrid()

> `private` **\_resizeGrid**(): `void`

Defined in: [Grid.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L33)

Reset the total grid width/height and the offset to the outer canvas.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [Grid.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L25)

Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.

#### Returns

`void`

***

### resizeCellPixelDimensions()

> **resizeCellPixelDimensions**(`newCellWidth`, `newCellHeight`): `void`

Defined in: [Grid.ts:56](https://github.com/humanbydefinition/p5-asciify/blob/11c58195cf6779df9fc2a61b517a9027eed65596/src/lib/Grid.ts#L56)

Re-assign the grid cell dimensions and reset the grid.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newCellWidth` | `number` | The new cell width. |
| `newCellHeight` | `number` | The new cell height. |

#### Returns

`void`
