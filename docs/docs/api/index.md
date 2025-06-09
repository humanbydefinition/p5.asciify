# p5.asciify v0.10.0-beta.13

## Namespaces

| Namespace                                             | Description                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------ |
| [errors](p5.asciify/namespaces/errors/index.md)       | Contains error handling functionality and utilities.                     |
| [plugins](p5.asciify/namespaces/plugins/index.md)     | Contains plugin interfaces to implement against.                         |
| [renderers](p5.asciify/namespaces/renderers/index.md) | Contains functionality relevant to the ASCII rendering.                  |
| [utils](p5.asciify/namespaces/utils/index.md)         | Contains utility functions and classes used by the `p5.asciify` library. |

## Classes

| Class                                                     | Description                                                                                                                                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [P5Asciifier](classes/P5Asciifier.md)                     | Manages a rendering pipeline for ASCII conversion, including font management, grid calculations, and ASCII renderers, which is applied to the main p5.js canvas or a selected texture. |
| [P5AsciifierManager](classes/P5AsciifierManager.md)       | Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances.                                                                                                      |
| [P5AsciifyColorPalette](classes/P5AsciifyColorPalette.md) | A 1D color palette stored in a framebuffer that is used to pass colors to shaders.                                                                                                     |
| [P5AsciifyFontManager](classes/P5AsciifyFontManager.md)   | Manages the font used for the ASCII rendering pipeline and provides methods for working with the font.                                                                                 |
| [P5AsciifyGrid](classes/P5AsciifyGrid.md)                 | Manages the grid for the ASCII rendering pipeline of an [P5Asciifier](classes/P5Asciifier.md) instance.                                                                                |

## Interfaces

| Interface                                                | Description                                                                                                |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [P5AsciifyExtensions](interfaces/P5AsciifyExtensions.md) | Interface for additional properties and methods added to the `p5.js` instance by the `p5.asciify` library. |

## Type Aliases

| Type Alias                                                     | Description                                                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [HookType](type-aliases/HookType.md)                           | Hook types supported by the p5.asciify hook manager.                               |
| [P5AsciifyCharacter](type-aliases/P5AsciifyCharacter.md)       | Each character from a loaded font is represented as a `P5AsciifyCharacter` object. |
| [P5AsciifyHookHandlers](type-aliases/P5AsciifyHookHandlers.md) | Type for core hook handlers                                                        |

## Variables

| Variable                            | Description                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [p5asciify](variables/p5asciify.md) | Main instance of p5.asciify _([P5AsciifierManager](classes/P5AsciifierManager.md))_ providing full access to the library. |
