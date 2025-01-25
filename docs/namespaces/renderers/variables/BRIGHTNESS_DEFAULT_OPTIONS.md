[**p5.asciify v0.7.0**](../../../README.md)

***

[p5.asciify](../../../README.md) / [renderers](../README.md) / BRIGHTNESS\_DEFAULT\_OPTIONS

# Variable: BRIGHTNESS\_DEFAULT\_OPTIONS

> `const` **BRIGHTNESS\_DEFAULT\_OPTIONS**: `object`

Defined in: [renderers/brightness/BrightnessAsciiRenderer.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L14)

Default configuration options for brightness-based ASCII renderer

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `fixed` | [renderers/brightness/BrightnessAsciiRenderer.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L24) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `string` | "fixed" | Background color mode | [renderers/brightness/BrightnessAsciiRenderer.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L26) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` | [renderers/brightness/BrightnessAsciiRenderer.ts:20](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L20) |
| <a id="charactercolormode"></a> `characterColorMode` | `string` | "sampled" | Character color mode | [renderers/brightness/BrightnessAsciiRenderer.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L22) |
| <a id="characters"></a> `characters` | `string` | "0123456789" | Characters used for brightness mapping (from darkest to brightest) | [renderers/brightness/BrightnessAsciiRenderer.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L18) |
| <a id="enabled"></a> `enabled` | `boolean` | true | Enable/disable the renderer | [renderers/brightness/BrightnessAsciiRenderer.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L16) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [renderers/brightness/BrightnessAsciiRenderer.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L28) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [renderers/brightness/BrightnessAsciiRenderer.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/7631802629c85b8f44e1943240e189c31cd9f417/src/lib/renderers/brightness/BrightnessAsciiRenderer.ts#L30) |
