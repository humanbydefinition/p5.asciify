[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / AsciiRendererOptions

# Type Alias: AsciiRendererOptions

> **AsciiRendererOptions**: `object`

Defined in: [renderers/types.ts:4](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L4)

The options for the ASCII renderers.

## Type declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor`? | `string` \| \[`number`, `number`, `number`\] \| `p5.Color` | The cell background color. Only used when `characterColorMode` is set to `fixed`. | [renderers/types.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L18) |
| <a id="backgroundcolormode"></a> `backgroundColorMode`? | `number` \| `string` | The background color mode. Can be either `sampled` or `fixed`. | [renderers/types.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L21) |
| <a id="charactercolor"></a> `characterColor`? | `string` \| \[`number`, `number`, `number`\] \| `p5.Color` | The color of the ASCII characters. Only used when `characterColorMode` is set to `fixed`. | [renderers/types.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L12) |
| <a id="charactercolormode"></a> `characterColorMode`? | `number` \| `string` | The character color mode. Can be either `sampled` or `fixed`. | [renderers/types.ts:15](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L15) |
| <a id="characters"></a> `characters`? | `string` | The character set to use for the ASCII renderer. (not used in the `"custom"` and `"gradient"` renderers) | [renderers/types.ts:9](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L9) |
| <a id="enabled"></a> `enabled` | `boolean` | Whether the renderer is enabled. | [renderers/types.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L6) |
| <a id="invertmode"></a> `invertMode` | `boolean` | Swap the cells ASCII character colors with its cell background colors. | [renderers/types.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L24) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | The rotation angle of all characters in the grid in degrees. | [renderers/types.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L27) |
| <a id="samplethreshold"></a> `sampleThreshold`? | `number` | The threshold for the ASCII character sampling algorithm. (only used in the `"edge"` renderer) | [renderers/types.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L33) |
| <a id="sobelthreshold"></a> `sobelThreshold`? | `number` | The threshold for the Sobel edge detection algorithm. (only used in the `"edge"` renderer) | [renderers/types.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/10002e5b44822cb907b50597a894bf5528f31cb6/src/lib/renderers/types.ts#L30) |
