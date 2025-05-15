# Interface: P5AsciifyRendererPlugin

Defined in: [plugins/RendererPlugin.ts:10](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/plugins/RendererPlugin.ts#L10)

Interface that all p5.asciify renderer plugins must implement.

## Properties

| Property                               | Modifier   | Type     | Description                             | Defined in                                                                                                                                                          |
| -------------------------------------- | ---------- | -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="description"></a> `description` | `readonly` | `string` | Description of what the renderer does   | [plugins/RendererPlugin.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/plugins/RendererPlugin.ts#L18) |
| <a id="id"></a> `id`                   | `readonly` | `string` | Unique identifier for the renderer type | [plugins/RendererPlugin.ts:12](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/plugins/RendererPlugin.ts#L12) |
| <a id="name"></a> `name`               | `readonly` | `string` | Human-readable name of the renderer     | [plugins/RendererPlugin.ts:15](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/plugins/RendererPlugin.ts#L15) |
| <a id="version"></a> `version`         | `readonly` | `string` | Version of the plugin                   | [plugins/RendererPlugin.ts:21](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/plugins/RendererPlugin.ts#L21) |

## Methods

### create()

> **create**(`p`, `captureFramebuffer`, `grid`, `fontManager`, `options?`): [`P5AsciifyRenderer`](../../../../classes/P5AsciifyRenderer.md)

Defined in: [plugins/RendererPlugin.ts:24](https://github.com/humanbydefinition/p5.asciify/blob/883b8f77570245b1cd4d1e87634e3133d65faa13/src/lib/plugins/RendererPlugin.ts#L24)

Creates a new instance of the renderer

#### Parameters

| Parameter            | Type                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| `p`                  | `p5`                                                                         |
| `captureFramebuffer` | `Framebuffer`                                                                |
| `grid`               | [`P5AsciifyGrid`](../../../../classes/P5AsciifyGrid.md)                      |
| `fontManager`        | [`P5AsciifyFontManager`](../../../../classes/P5AsciifyFontManager.md)        |
| `options?`           | [`AsciiRendererOptions`](../../renderers/interfaces/AsciiRendererOptions.md) |

#### Returns

[`P5AsciifyRenderer`](../../../../classes/P5AsciifyRenderer.md)
