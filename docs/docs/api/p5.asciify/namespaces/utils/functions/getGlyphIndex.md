# Function: getGlyphIndex()

> **getGlyphIndex**(`font`, `codePoint`): `number`

Defined in: [utils/fonts/TyprFontUtils.ts:9](https://github.com/humanbydefinition/p5.asciify/blob/da415d822fbe05fa59dd8bb5f8c6f704edbd5094/src/lib/utils/fonts/TyprFontUtils.ts#L9)

Gets the glyph index for a given Unicode code point in a Typr.js font

## Parameters

| Parameter   | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `font`      | `Font`   | The p5.Font object containing Typr.js font data |
| `codePoint` | `number` | The Unicode code point to look up               |

## Returns

`number`

The glyph index, or 0 if not found
