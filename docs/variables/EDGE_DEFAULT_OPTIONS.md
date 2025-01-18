[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / EDGE\_DEFAULT\_OPTIONS

# Variable: EDGE\_DEFAULT\_OPTIONS

> `const` **EDGE\_DEFAULT\_OPTIONS**: `object`

Defined in: [defaults.ts:60](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L60)

Default configuration options for edge detection ASCII renderer

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `1` | [defaults.ts:70](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L70) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `number` | 1 | Background color mode (0: `sampled`, 1: `fixed`) | [defaults.ts:72](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L72) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `1` | [defaults.ts:66](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L66) |
| <a id="charactercolormode"></a> `characterColorMode` | `number` | 0 | Character color mode (0: `sampled`, 1: `fixed`) | [defaults.ts:68](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L68) |
| <a id="characters"></a> `characters` | `string` | "-/\|\\-/\|\\" | Characters used for edge representation (8 characters for different angles) | [defaults.ts:64](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L64) |
| <a id="enabled"></a> `enabled` | `boolean` | false | Enable/disable the renderer | [defaults.ts:62](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L62) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [defaults.ts:74](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L74) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [defaults.ts:80](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L80) |
| <a id="samplethreshold"></a> `sampleThreshold` | `number` | 16 | Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it | [defaults.ts:78](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L78) |
| <a id="sobelthreshold"></a> `sobelThreshold` | `number` | 0.5 | Threshold for Sobel edge detection. Responsible for edge detection sensitivity | [defaults.ts:76](https://github.com/humanbydefinition/p5-asciify/blob/2eef0f93be0b07a27bd830cf8224669b9f9d1a6b/src/lib/defaults.ts#L76) |
