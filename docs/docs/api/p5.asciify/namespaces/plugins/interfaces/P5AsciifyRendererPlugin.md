# Interface: P5AsciifyRendererPlugin

Defined in: [plugins/RendererPlugin.ts:12](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L12)

Interface that all p5.asciify renderer plugins must implement.

## Properties

| Property                               | Modifier   | Type     | Description                             | Defined in                                                                                                                                                          |
| -------------------------------------- | ---------- | -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="author"></a> `author`           | `readonly` | `string` | Author of the plugin                    | [plugins/RendererPlugin.ts:26](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L26) |
| <a id="description"></a> `description` | `readonly` | `string` | Description of what the renderer does   | [plugins/RendererPlugin.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L20) |
| <a id="id"></a> `id`                   | `readonly` | `string` | Unique identifier for the renderer type | [plugins/RendererPlugin.ts:14](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L14) |
| <a id="name"></a> `name`               | `readonly` | `string` | Human-readable name of the renderer     | [plugins/RendererPlugin.ts:17](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L17) |
| <a id="version"></a> `version`         | `readonly` | `string` | Version of the plugin                   | [plugins/RendererPlugin.ts:23](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L23) |

## Methods

### create()

> **create**(`p`, `captureFramebuffer`, `grid`, `fontManager`, `options?`): [`P5AsciifyRenderer`](../../renderers/classes/P5AsciifyRenderer.md)\<[`AsciiRendererOptions`](../../renderers/interfaces/AsciiRendererOptions.md)\> \| [`P5AsciifyRenderer2D`](../../renderers/namespaces/renderer2d/classes/P5AsciifyRenderer2D.md)\<[`AsciiRendererOptions`](../../renderers/interfaces/AsciiRendererOptions.md)\> \| [`P5AsciifyAbstractFeatureRenderer2D`](../../renderers/namespaces/renderer2d/namespaces/feature/classes/P5AsciifyAbstractFeatureRenderer2D.md)\<[`FeatureAsciiRendererOptions`](../../renderers/interfaces/FeatureAsciiRendererOptions.md)\>

Defined in: [plugins/RendererPlugin.ts:37](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/plugins/RendererPlugin.ts#L37)

Creates a new instance of the renderer.

#### Parameters

| Parameter            | Type                                                                                       | Description                                        |
| -------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `p`                  | `__module`                                                                                 | The p5 instance.                                   |
| `captureFramebuffer` | `Framebuffer`                                                                              | The framebuffer containing the content to asciify. |
| `grid`               | [`P5AsciifyGrid`](../../../../classes/P5AsciifyGrid.md)                                    | The grid to use for the asciification.             |
| `fontManager`        | [`P5AsciifyFontManager`](../../../../classes/P5AsciifyFontManager.md)                      | The font manager to use.                           |
| `options?`           | [`FeatureAsciiRendererOptions`](../../renderers/interfaces/FeatureAsciiRendererOptions.md) | Optional options for the renderer.                 |

#### Returns

[`P5AsciifyRenderer`](../../renderers/classes/P5AsciifyRenderer.md)\<[`AsciiRendererOptions`](../../renderers/interfaces/AsciiRendererOptions.md)\> \| [`P5AsciifyRenderer2D`](../../renderers/namespaces/renderer2d/classes/P5AsciifyRenderer2D.md)\<[`AsciiRendererOptions`](../../renderers/interfaces/AsciiRendererOptions.md)\> \| [`P5AsciifyAbstractFeatureRenderer2D`](../../renderers/namespaces/renderer2d/namespaces/feature/classes/P5AsciifyAbstractFeatureRenderer2D.md)\<[`FeatureAsciiRendererOptions`](../../renderers/interfaces/FeatureAsciiRendererOptions.md)\>

A new instance of the renderer.
