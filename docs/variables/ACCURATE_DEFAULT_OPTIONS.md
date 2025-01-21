[**p5.asciify v0.6.3**](../README.md)

***

[p5.asciify](../globals.md) / ACCURATE\_DEFAULT\_OPTIONS

# Variable: ACCURATE\_DEFAULT\_OPTIONS

> `const` **ACCURATE\_DEFAULT\_OPTIONS**: `object`

Defined in: [defaults.ts:22](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L22)

Default configuration options for accurate ASCII renderer

## Type declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="backgroundcolor"></a> `backgroundColor` | `string` | "#000000" | Cell background color. Only used when `characterColorMode` is set to `1` | [defaults.ts:32](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L32) |
| <a id="backgroundcolormode"></a> `backgroundColorMode` | `number` | 1 | Background color mode (0: `sampled`, 1: `fixed`) | [defaults.ts:34](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L34) |
| <a id="charactercolor"></a> `characterColor` | `string` | "#FFFFFF" | Color of the ASCII characters. Only used when `characterColorMode` is set to `1` | [defaults.ts:28](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L28) |
| <a id="charactercolormode"></a> `characterColorMode` | `number` | 0 | Character color mode (0: `sampled`, 1: `fixed`) | [defaults.ts:30](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L30) |
| <a id="characters"></a> `characters` | `string` | "0123456789" | Characters used for pattern matching | [defaults.ts:26](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L26) |
| <a id="enabled"></a> `enabled` | `boolean` | false | Enable/disable the renderer | [defaults.ts:24](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L24) |
| <a id="invertmode"></a> `invertMode` | `boolean` | false | Swap the cells ASCII character colors with it's cell background colors | [defaults.ts:36](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L36) |
| <a id="rotationangle"></a> `rotationAngle` | `number` | 0 | Rotation angle of all characters in the grid in degrees | [defaults.ts:38](https://github.com/humanbydefinition/p5-asciify/blob/1a27890fc6c8c052abc0ef6e129ce2e94a0e661c/src/lib/defaults.ts#L38) |
