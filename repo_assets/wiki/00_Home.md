<p align="center">
  <img src="https://github.com/humanbydefinition/p5.asciify/raw/main/repo_assets/p5.asciify.animated-logo.gif" />
</p>

Welcome to the `p5.asciify` wiki! ʕっ•ᴥ•ʔっ

# Introduction

`p5.asciify` is a [`p5.js`](https://p5js.org/) add-on library for converting the main canvas in [`WEBGL`](https://p5js.org/reference/p5/WEBGL/) mode into a grid of ASCII characters in real-time, allowing you to bring text-based aesthetics to your visualizations.

The main goal of `p5.asciify` is to provide an easy-to-use, customizable solution for converting the main [`p5.js`](https://p5js.org/) canvas into a grid of ASCII characters, offering a wide range of settings to adjust the ASCII rendering to specific needs and artistic vision.

`p5.asciify` is actively developed and maintained by [**@humanbydefinition**](https://github.com/humanbydefinition), with new features and improvements being added regularly. The library is open-source and available here, where you can contribute to its development, report issues, or suggest new features. I highly value your feedback and contributions, so feel free to reach out!

I would love to see your creations using `p5.asciify`! Feel free to tag me on social media or use the hashtag `#p5asciify` so I can enjoy and share your amazing work too. (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 

[![Instagram](https://img.shields.io/badge/Instagram-lightgrey?style=social&logo=instagram)](https://www.instagram.com/humanbydefinition/)

*Special thanks to [`@davepagurek`](https://github.com/davepagurek) for helping me learn how to create a p5.js addon library! (✿◠‿◠)*

### Live Demo & Examples

#### Live Demo
See `p5.asciify` in action at [`textmode.art`](https://textmode.art/) - an ASCII/textmode editor powered by this library.

#### Example Code
- **Local Examples**: Explore the [`examples`](https://github.com/humanbydefinition/p5.asciify/tree/main/examples) folder for `instance mode` implementations
- **Online Examples**: View [`p5.js web editor collection`](https://editor.p5js.org/humanbydefinition/collections/VAws0yqLW) for `global mode` versions

> Both example sets demonstrate the same functionality, just implemented differently based on p5.js usage mode.

# Features

`p5.asciify` features a customizable rendering pipeline with various different ASCII renderers, allowing for the creation of unique and visually appealing ASCII art in real-time.

- **Brightness-based ASCII renderer**
  - Converts the canvas into ASCII characters based on the brightness of the pixels.
- **Accurate ASCII renderer**
  - Converts the canvas into the best possible ASCII representation based the available characters and the content of the input image.
- **Gradient/pattern-based ASCII renderer**
  - Applies user-defined ASCII patterns to defined brightness ranges in the canvas.
- **Edge-based ASCII renderer**
  - Converts edge detected cells into corresponding ASCII characters.
- **Custom ASCII renderer**
  - Allows for the creation of custom ASCII transformations using shaders or any `p5.js` drawing functions.

On initialization, `p5.asciify` comes with a default set of renderers arranged in a specific order. You can customize the library by adding more renderers, modifying the rendering order, removing existing renderers, or adjusting each renderer's settings.