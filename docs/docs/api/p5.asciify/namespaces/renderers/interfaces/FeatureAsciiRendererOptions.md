# Interface: FeatureAsciiRendererOptions

Defined in: [renderers/types.ts:16](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L16)

Base options for all feature-based ASCII renderers that extend the [P5AsciifyAbstractFeatureRenderer2D](../namespaces/renderer2d/namespaces/feature/classes/P5AsciifyAbstractFeatureRenderer2D.md) class.

## Extends

- [`AsciiRendererOptions`](AsciiRendererOptions.md)

## Extended by

- [`BrightnessAsciiRendererOptions`](BrightnessAsciiRendererOptions.md)
- [`EdgeAsciiRendererOptions`](EdgeAsciiRendererOptions.md)

## Properties

| Property                                                | Type                 | Description                                                                               | Inherited from                                                                                 | Defined in                                                                                                                                            |
| ------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="backgroundcolor"></a> `backgroundColor?`         | `any`                | The cell background color. Only used when `characterColorMode` is set to `fixed`.         | -                                                                                              | [renderers/types.ts:27](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L27) |
| <a id="backgroundcolormode"></a> `backgroundColorMode?` | `string` \| `number` | The background color mode. Can be either `sampled` or `fixed`.                            | -                                                                                              | [renderers/types.ts:30](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L30) |
| <a id="charactercolor"></a> `characterColor?`           | `any`                | The color of the ASCII characters. Only used when `characterColorMode` is set to `fixed`. | -                                                                                              | [renderers/types.ts:21](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L21) |
| <a id="charactercolormode"></a> `characterColorMode?`   | `string` \| `number` | The character color mode. Can be either `sampled` or `fixed`.                             | -                                                                                              | [renderers/types.ts:24](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L24) |
| <a id="characters"></a> `characters?`                   | `string`             | The character set to use for the ASCII renderer.                                          | -                                                                                              | [renderers/types.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L18) |
| <a id="enabled"></a> `enabled?`                         | `boolean`            | Whether the renderer is enabled.                                                          | [`AsciiRendererOptions`](AsciiRendererOptions.md).[`enabled`](AsciiRendererOptions.md#enabled) | [renderers/types.ts:10](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L10) |
| <a id="fliphorizontally"></a> `flipHorizontally?`       | `boolean`            | Flip the ASCII characters horizontally.                                                   | -                                                                                              | [renderers/types.ts:39](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L39) |
| <a id="flipvertically"></a> `flipVertically?`           | `boolean`            | Flip the ASCII characters vertically.                                                     | -                                                                                              | [renderers/types.ts:42](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L42) |
| <a id="invertmode"></a> `invertMode?`                   | `boolean`            | Swap the cells ASCII character colors with its cell background colors.                    | -                                                                                              | [renderers/types.ts:33](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L33) |
| <a id="rotationangle"></a> `rotationAngle?`             | `any`                | The rotation angle of all characters affected by a given renderer.                        | -                                                                                              | [renderers/types.ts:36](https://github.com/humanbydefinition/p5.asciify/blob/f723ec464286df336f4a528d146b61a2d9b0c0cf/src/lib/renderers/types.ts#L36) |
