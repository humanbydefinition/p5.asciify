# Class: P5AsciifyColorPalette

Defined in: [ColorPalette.ts:10](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/ColorPalette.ts#L10)

A 1D color palette stored in a framebuffer that is used to pass colors to shaders.

There is no need to modify instances of this class provided by the library,
as they are managed internally and can be modified more easily through classes managing them.
But you technically could - _if you wanted to_ - without breaking anything.

## Constructors

### Constructor

> **new P5AsciifyColorPalette**(`_p`, `_colors`): `P5AsciifyColorPalette`

Defined in: [ColorPalette.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/ColorPalette.ts#L20)

Create a new color palette instance.

#### Parameters

| Parameter | Type       | Description          |
| --------- | ---------- | -------------------- |
| `_p`      | `__module` | The p5 instance.     |
| `_colors` | `Color`[]  | The colors to store. |

#### Returns

`P5AsciifyColorPalette`

## Accessors

### colors

#### Get Signature

> **get** **colors**(): `Color`[]

Defined in: [ColorPalette.ts:72](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/ColorPalette.ts#L72)

Get the colors of the palette.

##### Returns

`Color`[]

---

### framebuffer

#### Get Signature

> **get** **framebuffer**(): `Framebuffer`

Defined in: [ColorPalette.ts:77](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/ColorPalette.ts#L77)

Get the framebuffer containing the colors of the palette.

##### Returns

`Framebuffer`

## Methods

### setColors()

> **setColors**(`newColors`): `void`

Defined in: [ColorPalette.ts:64](https://github.com/humanbydefinition/p5.asciify/blob/4c47e97c89b667f4fc3e388c4030c24c198a641c/src/lib/ColorPalette.ts#L64)

Sets the colors of the palette and updates the framebuffer.

#### Parameters

| Parameter   | Type      | Description            |
| ----------- | --------- | ---------------------- |
| `newColors` | `Color`[] | The new colors to set. |

#### Returns

`void`
