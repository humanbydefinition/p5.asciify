# utils

Contains utility functions and classes used by the `p5.asciify` library.

## Interfaces

| Interface                                            | Description              |
| ---------------------------------------------------- | ------------------------ |
| [JSONExportOptions](interfaces/JSONExportOptions.md) | Options for JSON export. |
| [SVGExportOptions](interfaces/SVGExportOptions.md)   | Options for SVG export.  |

## Functions

| Function                                        | Description                                                                               |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [createEmptyPath](functions/createEmptyPath.md) | Creates an empty path object with the required interface                                  |
| [createGlyphPath](functions/createGlyphPath.md) | Creates a path object for a glyph that implements the same interface as OpenType.js paths |
| [getGlyphIndex](functions/getGlyphIndex.md)     | Gets the glyph index for a given Unicode code point in a Typr.js font                     |
| [glyphToSVGPath](functions/glyphToSVGPath.md)   | Converts a glyph to an SVG path string                                                    |
