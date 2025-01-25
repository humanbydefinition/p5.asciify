[**p5.asciify v0.7.0**](../README.md)

***

[p5.asciify](../README.md) / OpenTypeGlyph

# Type Alias: OpenTypeGlyph

> **OpenTypeGlyph**: `object`

Defined in: [types.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L68)

Extends the `opentype.js` `Glyph` class with r, g, and b properties for color.
Currently doesn't actually `extend` the class, but rather defines a new interface, 
since there is no typing provided by the `opentype.js` library.

## Type declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="b"></a> `b`? | `number` | [types.ts:76](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L76) |
| <a id="g"></a> `g`? | `number` | [types.ts:75](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L75) |
| <a id="r"></a> `r`? | `number` | [types.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L74) |
| <a id="unicode"></a> `unicode` | `number` | [types.ts:69](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L69) |
| <a id="unicodes"></a> `unicodes` | `number`[] | [types.ts:70](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L70) |
| <a id="getpath"></a> `getPath()` | `object` | [types.ts:71](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/types.ts#L71) |

## Remarks

The `p5.js` `p5.Font` object contains a property `font` which is an instance of the `opentype.js` `Font` class,
which is used for extracting glyph information in the [P5AsciifyFontTextureAtlas](../classes/P5AsciifyFontTextureAtlas.md) class.
