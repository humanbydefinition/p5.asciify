[**p5.asciify v0.9.0-beta.1**](../../../../README.md)

***

[p5.asciify](../../../../README.md) / [utils](../README.md) / SVGExportOptions

# Interface: SVGExportOptions

Defined in: [utils/SVGExporter.ts:9](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/utils/SVGExporter.ts#L9)

Options for SVG export.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="drawmode"></a> `drawMode?` | `"fill"` \| `"stroke"` \| `"text"` | The drawing mode for ASCII characters (`'fill'`, `'stroke'`, or `'text'`). When set to `'fill'`, characters are rendered as filled shapes. When set to `'stroke'`, characters are rendered as outlines. When set to `'text'`, characters are rendered as text elements using `'monospaced'` font. Default is `'fill'`. | [utils/SVGExporter.ts:29](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/utils/SVGExporter.ts#L29) |
| <a id="filename"></a> `filename?` | `string` | The filename to save the SVG file as. If not provided, a default filename is used. | [utils/SVGExporter.ts:13](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/utils/SVGExporter.ts#L13) |
| <a id="includebackgroundrectangles"></a> `includeBackgroundRectangles?` | `boolean` | Whether to include cell background rectangles in the SVG output. When false, only the character paths are included, creating a more compact SVG. Default is `true`. | [utils/SVGExporter.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/utils/SVGExporter.ts#L20) |
| <a id="strokewidth"></a> `strokeWidth?` | `number` | The stroke width to use when drawMode is set to `'stroke'`. Default is `1.0`. | [utils/SVGExporter.ts:35](https://github.com/humanbydefinition/p5.asciify/blob/edf0ab1cc6347e56bd84618ff447f3c7ef1e1694/src/lib/utils/SVGExporter.ts#L35) |
