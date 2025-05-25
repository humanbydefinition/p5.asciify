# renderers

Contains functionality relevant to the ASCII rendering.

## Namespaces

| Namespace                                    | Description                                    |
| -------------------------------------------- | ---------------------------------------------- |
| [renderer2d](namespaces/renderer2d/index.md) | Contains all ASCII renderers for 2D rendering. |

## Classes

| Class                                                           | Description                                                                                              |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [P5AsciifyDisplayRenderer](classes/P5AsciifyDisplayRenderer.md) | Handles the final rendering of the ASCII output based on the final textures from the rendering pipeline. |
| [P5AsciifyRenderer](classes/P5AsciifyRenderer.md)               | Abstract ASCII renderer base class that all custom and pre-built ASCII renderers extend from.            |
| [P5AsciifyRendererManager](classes/P5AsciifyRendererManager.md) | Manages the whole ASCII rendering pipeline.                                                              |

## Interfaces

| Interface                                                                      | Description                                                                                                                                                                                            |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [AsciiRendererOptions](interfaces/AsciiRendererOptions.md)                     | Base ASCII renderer options, applicable to all ASCII renderers.                                                                                                                                        |
| [BrightnessAsciiRendererOptions](interfaces/BrightnessAsciiRendererOptions.md) | Options specific to the P5AsciifyBrightnessRenderer class.                                                                                                                                             |
| [EdgeAsciiRendererOptions](interfaces/EdgeAsciiRendererOptions.md)             | Options specific to the [P5AsciifyEdgeRenderer](namespaces/renderer2d/namespaces/feature/classes/P5AsciifyEdgeRenderer.md) class.                                                                      |
| [FeatureAsciiRendererOptions](interfaces/FeatureAsciiRendererOptions.md)       | Base options for all feature-based ASCII renderers that extend the [P5AsciifyAbstractFeatureRenderer2D](namespaces/renderer2d/namespaces/feature/classes/P5AsciifyAbstractFeatureRenderer2D.md) class. |

## Variables

| Variable                                      | Description                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [RENDERER_TYPES](variables/RENDERER_TYPES.md) | Dictionary of ASCII renderer types that can be added via the [P5AsciifyRendererManager.add](classes/P5AsciifyRendererManager.md#add) method by name. |
