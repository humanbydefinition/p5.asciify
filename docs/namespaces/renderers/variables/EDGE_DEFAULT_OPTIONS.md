[**p5.asciify v0.7.1**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / EDGE\_DEFAULT\_OPTIONS

# Variable: EDGE\_DEFAULT\_OPTIONS

> `const` **EDGE\_DEFAULT\_OPTIONS**: `object`

Defined in: [renderers/edge/EdgeAsciiRenderer.ts:19](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L19)

Default configuration options for `"edge"` ASCII renderer

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `fixed` | [renderers/edge/EdgeAsciiRenderer.ts:29](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L29) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `string` | "fixed" | Background color mode | [renderers/edge/EdgeAsciiRenderer.ts:31](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L31) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` | [renderers/edge/EdgeAsciiRenderer.ts:25](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L25) |
| <a id="charactercolormode"></a> `characterColorMode` | `string` | "sampled" | Character color mode | [renderers/edge/EdgeAsciiRenderer.ts:27](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L27) |
| <a id="characters"></a> `characters` | `string` | "-/\|\\-/\|\\" | Characters used for edge representation (8 characters for different angles) | [renderers/edge/EdgeAsciiRenderer.ts:23](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L23) |
| <a id="enabled"></a> `enabled` | `boolean` | false | Enable/disable the renderer | [renderers/edge/EdgeAsciiRenderer.ts:21](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L21) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [renderers/edge/EdgeAsciiRenderer.ts:33](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L33) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [renderers/edge/EdgeAsciiRenderer.ts:39](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L39) |
| <a id="samplethreshold"></a> `sampleThreshold` | `number` | 16 | Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it | [renderers/edge/EdgeAsciiRenderer.ts:37](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L37) |
| <a id="sobelthreshold"></a> `sobelThreshold` | `number` | 0.5 | Threshold for Sobel edge detection. Responsible for edge detection sensitivity | [renderers/edge/EdgeAsciiRenderer.ts:35](https://github.com/humanbydefinition/p5-asciify/blob/4734d27c518ba68f3f98eba448e4499dc8c97158/src/lib/renderers/edge/EdgeAsciiRenderer.ts#L35) |
