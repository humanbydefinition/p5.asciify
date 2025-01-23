[**p5.asciify v0.6.3**](../../../README.md)

***

[p5.asciify](../../../globals.md) / [renderers](../README.md) / EDGE\_DEFAULT\_OPTIONS

# Variable: EDGE\_DEFAULT\_OPTIONS

> `const` **EDGE\_DEFAULT\_OPTIONS**: `object`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L18)

Default configuration options for edge detection ASCII renderer

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `fixed` | [renderers/edge/EdgeAsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L28) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `string` | "fixed" | Background color mode | [renderers/edge/EdgeAsciiRenderer.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L30) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` | [renderers/edge/EdgeAsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L24) |
| <a id="charactercolormode"></a> `characterColorMode` | `string` | "sampled" | Character color mode | [renderers/edge/EdgeAsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L26) |
| <a id="characters"></a> `characters` | `string` | "-/\|\\-/\|\\" | Characters used for edge representation (8 characters for different angles) | [renderers/edge/EdgeAsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L22) |
| <a id="enabled"></a> `enabled` | `boolean` | false | Enable/disable the renderer | [renderers/edge/EdgeAsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L20) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [renderers/edge/EdgeAsciiRenderer.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L32) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [renderers/edge/EdgeAsciiRenderer.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L38) |
| <a id="samplethreshold"></a> `sampleThreshold` | `number` | 16 | Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it | [renderers/edge/EdgeAsciiRenderer.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L36) |
| <a id="sobelthreshold"></a> `sobelThreshold` | `number` | 0.5 | Threshold for Sobel edge detection. Responsible for edge detection sensitivity | [renderers/edge/EdgeAsciiRenderer.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/59ed5778928b6bd3b07654da74314fe6afa1ddc9/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L34) |
