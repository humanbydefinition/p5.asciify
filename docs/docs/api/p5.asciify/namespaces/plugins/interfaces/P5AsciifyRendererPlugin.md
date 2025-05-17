# Interface: P5AsciifyRendererPlugin

Defined in: [plugins/RendererPlugin.ts:10](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L10)

Interface that all p5.asciify renderer plugins must implement.

## Properties

| Property                               | Modifier   | Type     | Description                             | Defined in                                                                                                                                                          |
| -------------------------------------- | ---------- | -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="author"></a> `author`           | `readonly` | `string` | Author of the plugin                    | [plugins/RendererPlugin.ts:24](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L24) |
| <a id="description"></a> `description` | `readonly` | `string` | Description of what the renderer does   | [plugins/RendererPlugin.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L18) |
| <a id="id"></a> `id`                   | `readonly` | `string` | Unique identifier for the renderer type | [plugins/RendererPlugin.ts:12](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L12) |
| <a id="name"></a> `name`               | `readonly` | `string` | Human-readable name of the renderer     | [plugins/RendererPlugin.ts:15](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L15) |
| <a id="version"></a> `version`         | `readonly` | `string` | Version of the plugin                   | [plugins/RendererPlugin.ts:21](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L21) |

## Methods

### create()

> **create**(`p`, `captureFramebuffer`, `grid`, `fontManager`, `options?`): [`P5AsciifyRenderer`](../../renderers/classes/P5AsciifyRenderer.md)

Defined in: [plugins/RendererPlugin.ts:27](https://github.com/humanbydefinition/p5.asciify/blob/557c82e1366289f1e9fccdbbe3a328b76a1f9aa9/src/lib/plugins/RendererPlugin.ts#L27)

Creates a new instance of the plugin renderer

#### Parameters

| Parameter            | Type                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `p`                  | `__module`                                                                                 |
| `captureFramebuffer` | `Framebuffer`                                                                              |
| `grid`               | [`P5AsciifyGrid`](../../../../classes/P5AsciifyGrid.md)                                    |
| `fontManager`        | [`P5AsciifyFontManager`](../../../../classes/P5AsciifyFontManager.md)                      |
| `options?`           | [`FeatureAsciiRendererOptions`](../../renderers/interfaces/FeatureAsciiRendererOptions.md) |

#### Returns

[`P5AsciifyRenderer`](../../renderers/classes/P5AsciifyRenderer.md)
