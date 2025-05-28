---
sidebar_position: 1
title: Introduction
description: Learn how p5.asciify transforms WEBGL p5.js sketches into ASCII art. Explore features, try the interactive playground, and discover renderer management, custom effects, and export capabilities.
keywords: [p5.asciify introduction, ASCII art tutorial, p5.js ASCII conversion, WEBGL to ASCII, interactive ASCII playground, renderer management, custom ASCII effects, ASCII art export, textmode art library, creative coding tutorial]
---

import SandboxSketch from '!!raw-loader!./sandbox_sketch.js';
import SandpackEditor from '@site/src/components/SandpackEditor/SandpackEditor';
import FontCard from '@site/src/components/FontCard/FontCard';

# Introduction

`p5.asciify` is a powerful add-on library for [p5.js](https://p5js.org/) and the most advanced open-source ASCII conversion library available, designed to transform canvases and textures in `WEBGL` mode into dynamic ASCII/textmode representations in real-time. With `p5.asciify`, you can create intricate ASCII art, textmode games, interactive ASCII experiences, and much more in the web browser with ease.

`p5.asciify` is used in live coding performances, installations,  interactive art projects and more, allowing artists and developers to explore the unique aesthetic of ASCII art in a modern context. The library is designed to be flexible, efficient, and easy to use, offering a comprehensive range of tools to help you develop unique and engaging ASCII projects.

## Features

- **Renderer management**: Create and manage multiple ASCII renderers with different settings to create a unique rendering pipeline.
- **Pre-built renderers**: Add pre-built renderers, like `'brightness'`- or `'edge'`-based ASCII converters, to your pipeline.
- **Custom renderers**: Add your own custom ASCII renderers to the pipeline through code to create unique effects by controlling each cell's ASCII character, character color, background color, and more individually.
- **Asciifier management**: Create and manage multiple asciifiers to apply different ASCII rendering pipelines to different textures or the main canvas in parallel.
- **Font management**: Set the font and font size for all ASCII renderers in the pipeline of an asciifier.
- **Grid management**: Apply a perfect and responsive grid based on the canvas/texture dimensions, font size, and font metrics, or create a custom grid with a specific number of columns and rows.
- **WebGL1/WebGL2 support**: All shader code provided by `p5.asciify` is written in `GLSL ES 1.0`, making it compatible with both `WebGL1` and `WebGL2` contexts, allowing for a wide range of devices to run your ASCII projects.
- **Export functionality**: Export your ASCII art as `.txt`, `.svg` and `.json` files for easy sharing and printing, complementing the native image and GIF saving capabilities of `p5.js`.
- **Plugin system**: Create reusable custom renderers as plugins and share them with the community!

## Playground

`p5.asciify` is designed to be easy to use, and any `p5.js` sketch in `WEBGL` mode that uses the supported `p5.js` versions can be converted to ASCII just by importing the library, no additional code is needed.

Just paste your favorite p5.js sketch into the editor below and watch the magic happen! (◕‿◕)

:::info
- Sketch must be in `WEBGL` mode.
- Sketch must run in `p5.js` versions `1.8.0` to `1.X.X`.
- Sketch must be in `GLOBAL` mode.
:::

<SandpackEditor
  sketch={SandboxSketch}
  template="static"
/>



## Credits

Behind every great library stands the work of talented individuals and resources that make it all possible. `p5.asciify` wouldn't be what it is today without these valuable contributions. While the [Contributors](/docs/community/contributors) page honors the amazing people who've helped shape this project, this section celebrates the outstanding resources that are woven directly into the fabric of the `p5.asciify` codebase.

The development of `p5.asciify` owes tremendous gratitude to the creators who've shared their work under generous licenses, making this library possible. These core components deserve a spotlight of their own:

### Font
`p5.asciify` uses [**UrsaFont**](https://ursafrank.itch.io/ursafont) as its default font, created by [**UrsaFrank**](https://ursafrank.itch.io/). This font is available under the [CC0 (Creative Commons Zero) license](https://creativecommons.org/publicdomain/zero/1.0/), meaning it's dedicated to the public domain and can be freely used for any purpose.

Though not required by the license, I greatly appreciate [**UrsaFrank**](https://ursafrank.itch.io/)'s contribution to the open-source community by making this high-quality textmode font freely available.

<FontCard
  name="UrsaFont"
  image="https://img.itch.zone/aW1nLzg1NzE1NTkucG5n/original/LYwLGy.png"
  description="An 8x8 pixel monospaced font inspired by the ANSI text standard, created specifically for textmode art and games. Available in two versions: UrsaFont ANSI, closely adhering to the standard ANSI set, and UrsaFont, featuring additional unique shapes for extended creativity. Both variants include inverted color options, offering versatile artistic possibilities. Distributed freely under the permissive CC0 1.0 Universal Licence."
  downloadUrl="https://ursafrank.itch.io/ursafont"
  glyphCount="256+"
  formats=""
  license="CC0 (Creative Commons Zero)"
  />