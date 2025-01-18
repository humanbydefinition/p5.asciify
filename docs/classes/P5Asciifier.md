[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / P5Asciifier

# Class: P5Asciifier

Defined in: [Asciifier.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L12)

The main class for the p5.asciify library. This class is responsible for setting up the library and running the rendering pipeline.

## Constructors

### new P5Asciifier()

> **new P5Asciifier**(): [`P5Asciifier`](P5Asciifier.md)

#### Returns

[`P5Asciifier`](P5Asciifier.md)

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="_bordercolor"></a> `_borderColor` | `private` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | [Asciifier.ts:13](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L13) |
| <a id="_font"></a> `_font` | `private` | `Font` | [Asciifier.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L16) |
| <a id="_fontsize"></a> `_fontSize` | `private` | `number` | [Asciifier.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L14) |
| <a id="asciifonttextureatlas"></a> `asciiFontTextureAtlas` | `public` | [`P5AsciifyFontTextureAtlas`](P5AsciifyFontTextureAtlas.md) | [Asciifier.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L18) |
| <a id="grid"></a> `grid` | `public` | [`P5AsciifyGrid`](P5AsciifyGrid.md) | [Asciifier.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L19) |
| <a id="p"></a> `p` | `private` | `__module` | [Asciifier.ts:17](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L17) |
| <a id="renderermanager"></a> `rendererManager` | `public` | `RendererManager` | [Asciifier.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L15) |
| <a id="sketchframebuffer"></a> `sketchFramebuffer` | `public` | `Framebuffer` | [Asciifier.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L20) |

## Accessors

### borderColor

#### Get Signature

> **get** **borderColor**(): `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

Defined in: [Asciifier.ts:115](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L115)

##### Returns

`string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\]

#### Set Signature

> **set** **borderColor**(`color`): `void`

Defined in: [Asciifier.ts:104](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L104)

Sets the border color for the ascii renderers.

##### Throws

If the color is not a string, array or p5.Color.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| `Color` \| \[`number`, `number`?, `number`?, `number`?\] | The color to set. |

##### Returns

`void`

***

### font

#### Get Signature

> **get** **font**(): `Font`

Defined in: [Asciifier.ts:114](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L114)

##### Returns

`Font`

#### Set Signature

> **set** **font**(`font`): `void`

Defined in: [Asciifier.ts:85](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L85)

Sets the font for the ascii renderers.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `font` | `Font` | The font to set. |

##### Returns

`void`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: [Asciifier.ts:113](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L113)

##### Returns

`number`

#### Set Signature

> **set** **fontSize**(`fontSize`): `void`

Defined in: [Asciifier.ts:62](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L62)

Sets the font size for the ascii renderers

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fontSize` | `number` | The font size to set |

##### Returns

`void`

## Methods

### instance()

> **instance**(`p`, `addDummyPreloadFunction`): `void`

Defined in: [Asciifier.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L26)

Initialize the p5 instance for the Asciifier

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `p` | `__module` | `undefined` | The p5 instance |
| `addDummyPreloadFunction` | `boolean` | `true` | - |

#### Returns

`void`

***

### setup()

> **setup**(): `void`

Defined in: [Asciifier.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/d933e1e72dca936b7d54361a33dbe73efbcfa676/src/lib/Asciifier.ts#L38)

Sets up the P5Asciify library with the specified options

#### Returns

`void`
