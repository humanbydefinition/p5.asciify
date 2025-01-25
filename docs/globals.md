[**p5.asciify v0.6.3**](README.md)

***

# p5.asciify v0.6.3

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [gradients](namespaces/gradients/README.md) | Contains functionality relevant to the ASCII gradients, which are used exclusively by the [P5AsciifyGradientRenderer](namespaces/renderers/classes/P5AsciifyGradientRenderer.md). |
| [renderers](namespaces/renderers/README.md) | Contains functionality relevant to the ASCII rendering. |

## Classes

| Class | Description |
| ------ | ------ |
| [P5Asciifier](classes/P5Asciifier.md) | The main class for the `p5.asciify` library, responsible for setting up the library, managing its properties, and providing an interface for interacting with the library. |
| [P5AsciifyColorPalette](classes/P5AsciifyColorPalette.md) | A 1D color palette stored in a framebuffer, which is used to pass colors to shaders. |
| [P5AsciifyError](classes/P5AsciifyError.md) | Simple error class, representing errors specific to `p5.asciify`. |
| [P5AsciifyFontTextureAtlas](classes/P5AsciifyFontTextureAtlas.md) | Manages a texture atlas for font rendering in the ASCII rendering process. |
| [P5AsciifyGrid](classes/P5AsciifyGrid.md) | Manages the grid dimensions for the ASCII renderers. |

## Type Aliases

| Type alias | Description |
| ------ | ------ |
| [OpenTypeGlyph](type-aliases/OpenTypeGlyph.md) | Extends the `opentype.js` `Glyph` class with r, g, and b properties for color. Currently doesn't actually `extend` the class, but rather defines a new interface, since there is no typing provided by the `opentype.js` library. |

## Variables

| Variable | Description |
| ------ | ------ |
| [p5asciify](variables/p5asciify.md) | The main instance of the p5.asciify library, which is used to access all of the library's functionality. |
