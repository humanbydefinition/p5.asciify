[**p5.asciify v0.7.4**](../../../../../../../README.md)

***

[p5.asciify](../../../../../../../README.md) / [renderers](../../../../../README.md) / [2d](../../../README.md) / [feature](../README.md) / ACCURATE\_DEFAULT\_OPTIONS

# Variable: ACCURATE\_DEFAULT\_OPTIONS

> `const` **ACCURATE\_DEFAULT\_OPTIONS**: `object`

Defined in: renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:18

Default configuration options for `"accurate"` ASCII renderer. 

If there are options not provided during the creation of the renderer, the default options will be used.

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `fixed` | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:28 |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `string` | "fixed" | Background color mode | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:30 |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:24 |
| <a id="charactercolormode"></a> `characterColorMode` | `string` | "sampled" | Character color mode | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:26 |
| <a id="characters"></a> `characters` | `string` | "0123456789" | Characters used for pattern matching | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:22 |
| <a id="enabled"></a> `enabled` | `boolean` | false | Enable/disable the renderer | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:20 |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:32 |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | renderers/2d/feature/accurate/AccurateAsciiRenderer.ts:34 |
