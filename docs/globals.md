[**p5.asciify v0.6.3**](README.md)

***

# p5.asciify v0.6.3

## Classes

| Class | Description |
| ------ | ------ |
| [P5Asciifier](classes/P5Asciifier.md) | The main class for the `p5.asciify` library. |
| [P5AsciifyAccurateRenderer](classes/P5AsciifyAccurateRenderer.md) | An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters. |
| [P5AsciifyBrightnessRenderer](classes/P5AsciifyBrightnessRenderer.md) | ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set. |
| [P5AsciifyCharacterSet](classes/P5AsciifyCharacterSet.md) | Represents a set of characters to be used by an ASCII renderer. |
| [P5AsciifyColorPalette](classes/P5AsciifyColorPalette.md) | A 1D color palette for use with the `p5.asciify` library. |
| [P5AsciifyConicalGradient](classes/P5AsciifyConicalGradient.md) | A conical gradient that moves in a conical pattern across the screen. |
| [P5AsciifyEdgeRenderer](classes/P5AsciifyEdgeRenderer.md) | An ASCII renderer that applies ASCII edges to the input sketch by using edge detection. |
| [P5AsciifyError](classes/P5AsciifyError.md) | Custom error class for the P5Asciify library. |
| [P5AsciifyFontTextureAtlas](classes/P5AsciifyFontTextureAtlas.md) | Creates a texture atlas containing all characters in a font, and provides utility methods for working with the atlas. |
| [P5AsciifyGradient](classes/P5AsciifyGradient.md) | Represents a gradient that can be applied to the gradient ascii renderer. |
| [P5AsciifyGradientManager](classes/P5AsciifyGradientManager.md) | Manages the creation and removal of gradients for the gradient ascii renderer. |
| [P5AsciifyGradientRenderer](classes/P5AsciifyGradientRenderer.md) | An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer. |
| [P5AsciifyGrid](classes/P5AsciifyGrid.md) | Represents a 2D grid, where each cell has a fixed width and height. |
| [P5AsciifyLinearGradient](classes/P5AsciifyLinearGradient.md) | A linear gradient that moves in a linear pattern across the screen. |
| [P5AsciifyRadialGradient](classes/P5AsciifyRadialGradient.md) | A radial gradient that moves in a radial pattern across the screen. |
| [P5AsciifyRenderer](classes/P5AsciifyRenderer.md) | Abstract class for shader-based ASCII Renderers. |
| [P5AsciifyRendererManager](classes/P5AsciifyRendererManager.md) | Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. |
| [P5AsciifySpiralGradient](classes/P5AsciifySpiralGradient.md) | A spiral gradient that moves in a spiral pattern across the screen. |

## Variables

| Variable | Description |
| ------ | ------ |
| [ACCURATE\_DEFAULT\_OPTIONS](variables/ACCURATE_DEFAULT_OPTIONS.md) | Default configuration options for accurate ASCII renderer |
| [BRIGHTNESS\_DEFAULT\_OPTIONS](variables/BRIGHTNESS_DEFAULT_OPTIONS.md) | Default configuration options for brightness-based ASCII renderer |
| [CUSTOM\_DEFAULT\_OPTIONS](variables/CUSTOM_DEFAULT_OPTIONS.md) | Default configuration options for custom ASCII renderer |
| [DEFAULT\_BACKGROUND\_COLOR](variables/DEFAULT_BACKGROUND_COLOR.md) | The default background color used behind the ASCII grid. This color fills the space not occupied by the centered ASCII grid. |
| [DEFAULT\_FONT\_SIZE](variables/DEFAULT_FONT_SIZE.md) | Default font size for the ASCII rendering |
| [EDGE\_CHARACTER\_LENGTH](variables/EDGE_CHARACTER_LENGTH.md) | Number of characters used in edge detection renderer's character set |
| [EDGE\_DEFAULT\_OPTIONS](variables/EDGE_DEFAULT_OPTIONS.md) | Default configuration options for edge detection ASCII renderer |
| [FONT\_SIZE\_LIMITS](variables/FONT_SIZE_LIMITS.md) | Font size constraints for ASCII rendering |
| [GRADIENT\_DEFAULT\_OPTIONS](variables/GRADIENT_DEFAULT_OPTIONS.md) | Default configuration options for gradient-based ASCII renderer |
| [p5asciify](variables/p5asciify.md) | The main instance of the p5.asciify library, which is used to access all of the library's functionality. |
