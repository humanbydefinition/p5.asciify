# Function: getGlyphIndex()

> **getGlyphIndex**(`font`, `codePoint`): `number`

Defined in: [utils/fonts/TyprFontUtils.ts:9](https://github.com/humanbydefinition/p5.asciify/blob/b4847c3686de8aac8ab85c6df8c62f37e7437142/src/lib/utils/fonts/TyprFontUtils.ts#L9)

Gets the glyph index for a given Unicode code point in a Typr.js font

## Parameters

| Parameter   | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `font`      | `Font`   | The p5.Font object containing Typr.js font data |
| `codePoint` | `number` | The Unicode code point to look up               |

## Returns

`number`

The glyph index, or 0 if not found
