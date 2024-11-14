<p align="center">
  <img src="https://github.com/humanbydefinition/p5.asciify/raw/main/repo_assets/p5.asciify.animated-logo.gif" />
</p>

Welcome to the `p5.asciify` wiki! ʕっ•ᴥ•ʔっ

# Introduction

`p5.asciify` is a [`p5.js`](https://p5js.org/) add-on library for converting the main canvas in [`WEBGL`](https://p5js.org/reference/p5/WEBGL/) mode into a grid of ASCII characters in real-time, allowing you to bring a retro, text-based aesthetic to your visualizations, adding a unique touch to your creative coding projects.

The main goal of `p5.asciify` is to provide an easy-to-use, customizable solution for converting the main [`p5.js`](https://p5js.org/) canvas into ASCII characters in real-time, offering a wide range of settings and effects to adjust the appearance of the ASCII grid to specific needs and artistic vision.

To see `p5.asciify` in action, check out the example sketches in the provided collection on the [p5.js web editor](https://editor.p5js.org/): 
[`p5.asciify examples`](https://editor.p5js.org/humanbydefinition/collections/DUa3pcJqn).

`p5.asciify` is actively developed and maintained by [**@humanbydefinition**](https://github.com/humanbydefinition), with new features and improvements being added regularly. The library is open-source and available here, where you can contribute to its development, report issues, or suggest new features. I highly value your feedback and contributions, so feel free to reach out!

I would love to see your creations using `p5.asciify`! Feel free to tag me on social media or use the hashtag `#p5asciify` so I can enjoy and share your amazing work too.  
(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 

[![Instagram](https://img.shields.io/badge/Instagram-lightgrey?style=social&logo=instagram)](https://www.instagram.com/humanbydefinition/)

*Special thanks to [`@davepagurek`](https://github.com/davepagurek) for helping me learn how to create a p5.js addon library! (✿◠‿◠)*

# Features

`p5.asciify` features a customizable rendering pipeline which is being executed every time the user's `draw()` function is finished, currently consisting of optional effect shaders being applied before and after the ASCII conversion, as well as brightness- and edge-based ASCII conversion.


<details>
<summary>Rendering pipeline diagram</summary>

```
TODO!
```
</details>


## ASCII Conversion

`p5.asciify` currently offers two different ASCII conversion methods, brightness-based and edge-based, each with its own set of parameters that can be adjusted to achieve the desired visual effect. The ASCII conversion is done using shaders, which allows for real-time conversion of the main [`WebGL`](https://en.wikipedia.org/wiki/WebGL) canvas into a grid of ASCII characters.

### Shared settings

| Setting          | Description                                                                                          |
|------------------|------------------------------------------------------------------------------------------------------|
| **`font`**         | The font used for the ASCII conversion.                                                              |
| **`fontSize`**     | The size of the font used for the ASCII conversion.                                                  |

### Common settings

Both edge-based and brightness-based ASCII conversions have these parameters. However, they are not shared and can be set individually for each ASCII conversion shader.

| Setting          | Description                                                                                          |
|------------------|------------------------------------------------------------------------------------------------------|
| **`enabled`**      | Enables or disables the ASCII conversion.                                                           |
| **`characters`**   | The characters used for the ASCII conversion.                                                       |
| **`characterColorMode`** | The color mode used for the ASCII conversion.                                                       |
| **`characterColor`** | The color used for the ASCII conversion.                                                            |
| **`backgroundColorMode`** | The color mode used for the background of the ASCII conversion.                                     |
| **`backgroundColor`** | The color used for the background of the grid cells.                                                |
| **`invertMode`**   | A mode used for swapping the character and background colors.                                       |
| **`rotationAngle`** | Rotate the ASCII characters by a specified angle.                                                   |

### Edge-based conversion settings

| Setting          | Description                                                                                          |
|------------------|------------------------------------------------------------------------------------------------------|
| **`sobelThreshold`** | The threshold used for the Sobel edge detection algorithm.                                           |
| **`sampleThreshold`** | The threshold used for sampling the sobel filter output to a smaller size.

## Pre- and Post-Effect Shaders

To apply effects before and after the ASCII conversion, `p5.asciify` provides a set of effect shaders that can be called anywhere inside the sketches `setup()` function and `draw()` loop. Each effect shader has its own set of parameters that can be adjusted freely, allowing for a wide range of visual effects to be applied before and after the ASCII conversion.

### Currently available effect shaders
| Effect                | Description                                                                                          |
|-----------------------|-------------------------------------------------------------------------------------------------|
| **`brightness`**        | Adjusts the brightness of the image.                                                                 |
| **`chromaticaberration`** | Creates a chromatic aberration effect, which shifts the colors of the image to simulate lens distortion. |
| **`colorpalette`**     | Applies a specific color palette to the image, changing its colors to match the given palette.          |
| **`distortion`**        | Introduces a distortion effect, altering the image's appearance based on frequency and amplitude.       |
| **`grayscale`**         | Converts the image to grayscale, removing all color.                                                    |
| **`invert`**            | Inverts the colors of the image, creating a negative effect.                                            |
| **`kaleidoscope`**      | Applies a kaleidoscope effect, creating symmetrical patterns by repeating segments of the image.        |
| **`rotate`**            | Rotates the image by a specified angle, altering its orientation.                                        |