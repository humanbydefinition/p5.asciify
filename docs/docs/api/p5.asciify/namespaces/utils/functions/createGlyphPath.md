# Function: createGlyphPath()

> **createGlyphPath**(`font`, `glyphData`, `x`, `y`, `fontSize`): `object`

Defined in: [utils/fonts/TyprFontUtils.ts:60](https://github.com/humanbydefinition/p5.asciify/blob/da415d822fbe05fa59dd8bb5f8c6f704edbd5094/src/lib/utils/fonts/TyprFontUtils.ts#L60)

Creates a path object for a glyph that implements the same interface as OpenType.js paths

## Parameters

| Parameter   | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `font`      | `Font`   | The p5.Font object containing Typr.js font data |
| `glyphData` | `any`    | The glyph data from the Typr.js glyf table      |
| `x`         | `number` | The x position                                  |
| `y`         | `number` | The y position                                  |
| `fontSize`  | `number` | The font size                                   |

## Returns

`object`

A path object with getBoundingBox and toSVG methods

| Name               | Type           | Defined in                                                                                                                                                                |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getBoundingBox()` | () => `object` | [utils/fonts/TyprFontUtils.ts:66](https://github.com/humanbydefinition/p5.asciify/blob/da415d822fbe05fa59dd8bb5f8c6f704edbd5094/src/lib/utils/fonts/TyprFontUtils.ts#L66) |
| `toSVG()`          | () => `string` | [utils/fonts/TyprFontUtils.ts:66](https://github.com/humanbydefinition/p5.asciify/blob/da415d822fbe05fa59dd8bb5f8c6f704edbd5094/src/lib/utils/fonts/TyprFontUtils.ts#L66) |
