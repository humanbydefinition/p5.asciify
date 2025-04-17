[**p5.asciify v0.8.1**](../../../../../../../README.md)

***

[p5.asciify](../../../../../../../README.md) / [renderers](../../../../../README.md) / [2d](../../../README.md) / [feature](../README.md) / BRIGHTNESS\_DEFAULT\_OPTIONS

# Variable: BRIGHTNESS\_DEFAULT\_OPTIONS

> `const` **BRIGHTNESS\_DEFAULT\_OPTIONS**: `object`

Defined in: [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L18)

Default configuration options for `"brightness"` ASCII renderer. 

If there are options not provided during the creation of the renderer, the default options will be used.

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `fixed` | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:28](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L28) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `string` | "fixed" | Background color mode | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:30](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L30) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:24](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L24) |
| <a id="charactercolormode"></a> `characterColorMode` | `string` | "sampled" | Character color mode | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:26](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L26) |
| <a id="characters"></a> `characters` | `string` | "0123456789" | Characters used for brightness mapping (from darkest to brightest) | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:22](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L22) |
| <a id="enabled"></a> `enabled` | `boolean` | true | Enable/disable the renderer | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L20) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:32](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L32) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts:34](https://github.com/humanbydefinition/p5.asciify/blob/3cc00e8f6a25945c0c79e78bf6a85ba27b00b936/src/lib/renderers/2d/feature/brightness/BrightnessAsciiRenderer.ts#L34) |
