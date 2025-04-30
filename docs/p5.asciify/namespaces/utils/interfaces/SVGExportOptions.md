[**p5.asciify v0.9.0-beta.4**](../../../../README.md)

***

[p5.asciify](../../../../README.md) / [utils](../README.md) / SVGExportOptions

# Interface: SVGExportOptions

Defined in: [utils/SVGExporter.ts:10](https://github.com/humanbydefinition/p5.asciify/blob/efa13807f031eb411bb838accfe71654ff0d9825/src/lib/utils/SVGExporter.ts#L10)

Options for SVG export.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="drawmode"></a> `drawMode?` | `"fill"` \| `"stroke"` \| `"text"` | The drawing mode for ASCII characters (`'fill'`, `'stroke'`, or `'text'`). When set to `'fill'`, characters are rendered as filled shapes. When set to `'stroke'`, characters are rendered as outlines. When set to `'text'`, characters are rendered as text elements using `'monospaced'` font. Default is `'fill'`. | [utils/SVGExporter.ts:30](https://github.com/humanbydefinition/p5.asciify/blob/efa13807f031eb411bb838accfe71654ff0d9825/src/lib/utils/SVGExporter.ts#L30) |
| <a id="filename"></a> `filename?` | `string` | The filename to save the SVG file as. If not provided, a default filename is used. | [utils/SVGExporter.ts:14](https://github.com/humanbydefinition/p5.asciify/blob/efa13807f031eb411bb838accfe71654ff0d9825/src/lib/utils/SVGExporter.ts#L14) |
| <a id="includebackgroundrectangles"></a> `includeBackgroundRectangles?` | `boolean` | Whether to include cell background rectangles in the SVG output. When false, only the character paths are included, creating a more compact SVG. Default is `true`. | [utils/SVGExporter.ts:21](https://github.com/humanbydefinition/p5.asciify/blob/efa13807f031eb411bb838accfe71654ff0d9825/src/lib/utils/SVGExporter.ts#L21) |
| <a id="strokewidth"></a> `strokeWidth?` | `number` | The stroke width to use when drawMode is set to `'stroke'`. Default is `1.0`. | [utils/SVGExporter.ts:36](https://github.com/humanbydefinition/p5.asciify/blob/efa13807f031eb411bb838accfe71654ff0d9825/src/lib/utils/SVGExporter.ts#L36) |
