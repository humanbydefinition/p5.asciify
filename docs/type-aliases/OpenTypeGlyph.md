[**p5.asciify v0.7.3**](../README.md)

***

[p5.asciify](../README.md) / OpenTypeGlyph

# Type Alias: OpenTypeGlyph

> **OpenTypeGlyph**: `object`

Defined in: [types.ts:70](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L70)

Extends the `opentype.js` `Glyph` class with r, g, and b properties for color.
Currently doesn't actually `extend` the class, but rather defines a new interface, 
since there is no typing provided by the `opentype.js` library.

## Type declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="b"></a> `b`? | `number` | [types.ts:78](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L78) |
| <a id="g"></a> `g`? | `number` | [types.ts:77](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L77) |
| <a id="r"></a> `r`? | `number` | [types.ts:76](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L76) |
| <a id="unicode"></a> `unicode` | `number` | [types.ts:71](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L71) |
| <a id="unicodes"></a> `unicodes` | `number`[] | [types.ts:72](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L72) |
| <a id="getpath"></a> `getPath()` | `object` | [types.ts:73](https://github.com/humanbydefinition/p5.asciify/blob/799e83eb3a285fe5bbb187efe84893fd58ddd933/src/lib/types.ts#L73) |

## Remarks

The `p5.js` `p5.Font` object contains a property `font` which is an instance of the `opentype.js` `Font` class,
which is used for extracting glyph information in the [P5AsciifyFontTextureAtlas](../classes/P5AsciifyFontTextureAtlas.md) class.
