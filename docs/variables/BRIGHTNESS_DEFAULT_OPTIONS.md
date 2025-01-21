[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / BRIGHTNESS\_DEFAULT\_OPTIONS

# Variable: BRIGHTNESS\_DEFAULT\_OPTIONS

> `const` **BRIGHTNESS\_DEFAULT\_OPTIONS**: `object`

Defined in: [defaults.ts:2](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L2)

Default configuration options for brightness-based ASCII renderer

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `1` | [defaults.ts:12](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L12) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `number` | 1 | Background color mode (0: `sampled`, 1: `fixed`) | [defaults.ts:14](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L14) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `1` | [defaults.ts:8](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L8) |
| <a id="charactercolormode"></a> `characterColorMode` | `number` | 0 | Character color mode (0: `sampled`, 1: `fixed`) | [defaults.ts:10](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L10) |
| <a id="characters"></a> `characters` | `string` | "0123456789" | Characters used for brightness mapping (from darkest to brightest) | [defaults.ts:6](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L6) |
| <a id="enabled"></a> `enabled` | `boolean` | true | Enable/disable the renderer | [defaults.ts:4](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L4) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [defaults.ts:16](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L16) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [defaults.ts:18](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L18) |
