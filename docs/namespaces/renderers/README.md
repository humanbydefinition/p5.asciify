[**p5.asciify v0.6.3**](../../README.md)

***

[p5.asciify](../../globals.md) / renderers

# renderers

Contains functionality relevant to the ASCII rendering.

## Classes

| Class | Description |
| ------ | ------ |
| [P5AsciifyAccurateRenderer](classes/P5AsciifyAccurateRenderer.md) | An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters. |
| [P5AsciifyBrightnessRenderer](classes/P5AsciifyBrightnessRenderer.md) | ASCII Renderer that uses brightness to determine the ASCII characters to use from the 1D character set. |
| [P5AsciifyEdgeRenderer](classes/P5AsciifyEdgeRenderer.md) | An ASCII renderer that applies ASCII edges to the input sketch by using edge detection. |
| [P5AsciifyGradientRenderer](classes/P5AsciifyGradientRenderer.md) | An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer. |
| [P5AsciifyRenderer](classes/P5AsciifyRenderer.md) | Abstract class for shader-based ASCII Renderers. |
| [P5AsciifyRendererManager](classes/P5AsciifyRendererManager.md) | Manages the available ASCII renderers and handles rendering the ASCII output to the canvas. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [AsciiRendererOptions](interfaces/AsciiRendererOptions.md) | - |

## Variables

| Variable | Description |
| ------ | ------ |
| [ACCURATE\_DEFAULT\_OPTIONS](variables/ACCURATE_DEFAULT_OPTIONS.md) | Default configuration options for accurate ASCII renderer |
| [BRIGHTNESS\_DEFAULT\_OPTIONS](variables/BRIGHTNESS_DEFAULT_OPTIONS.md) | Default configuration options for brightness-based ASCII renderer |
| [CUSTOM\_DEFAULT\_OPTIONS](variables/CUSTOM_DEFAULT_OPTIONS.md) | - |
| [EDGE\_DEFAULT\_OPTIONS](variables/EDGE_DEFAULT_OPTIONS.md) | Default configuration options for edge detection ASCII renderer |
| [GRADIENT\_DEFAULT\_OPTIONS](variables/GRADIENT_DEFAULT_OPTIONS.md) | Default configuration options for gradient-based ASCII renderer |
