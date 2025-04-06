[**p5.asciify v0.7.4**](../../../../../../../README.md)

***

[p5.asciify](../../../../../../../README.md) / [renderers](../../../../../README.md) / [2d](../../../README.md) / [feature](../README.md) / EDGE\_DEFAULT\_OPTIONS

# Variable: EDGE\_DEFAULT\_OPTIONS

> `const` **EDGE\_DEFAULT\_OPTIONS**: `object`

Defined in: renderers/2d/feature/edge/EdgeAsciiRenderer.ts:23

Default configuration options for `"edge"` ASCII renderer. 

If there are options not provided during the creation of the renderer, the default options will be used.

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `fixed` | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:33 |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `string` | "fixed" | Background color mode | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:35 |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:29 |
| <a id="charactercolormode"></a> `characterColorMode` | `string` | "sampled" | Character color mode | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:31 |
| <a id="characters"></a> `characters` | `string` | "-/\|\\-/\|\\" | Characters used for edge representation (8 characters for different angles) | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:27 |
| <a id="enabled"></a> `enabled` | `boolean` | false | Enable/disable the renderer | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:25 |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:37 |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:43 |
| <a id="samplethreshold"></a> `sampleThreshold` | `number` | 16 | Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:41 |
| <a id="sobelthreshold"></a> `sobelThreshold` | `number` | 0.5 | Threshold for Sobel edge detection. Responsible for edge detection sensitivity | renderers/2d/feature/edge/EdgeAsciiRenderer.ts:39 |
