---
sidebar_position: 1
---

# Introduction

`p5.asciify` is a powerful add-on library for [p5.js](https://p5js.org/) that transforms `WEBGL` canvases *(and offcanvas textures)* into a dynamic ASCII/textmode representation in real-time, allowing for the creation of intricate ASCII/textmode art and much more with ease.

import SandboxSketch from '!!raw-loader!./sandbox_sketch.js';
import SandpackEditor from '@site/src/components/SandpackEditor/SandpackEditor';

## Playground

How easy you may ask? Just paste your favorite p5.js sketch in `WEBGL` mode into the editor below and watch the magic happen! (◕‿◕)

:::info
- Sketch must be in `WEBGL` mode.
- Sketch must run in `p5.js` version `1.11.5`.
- Sketch must be in `GLOBAL` mode.
:::

<SandpackEditor
  sketch={SandboxSketch}
  template="static"
/>

## Features

`p5.asciify` is the most advanced ASCII conversion library available, offering a wide range of tools for crafting intricate ASCII art and building complex rendering pipelines.

- **Renderer management**: Create and manage multiple ASCII renderers with different settings to create a unique rendering pipeline.
- **Pre-built renderers**: Add pre-built renderers, like `'brightness'`- or `'edge'`-based ASCII converters, to your pipeline.
- **Custom renderers**: Add your own custom ASCII renderers to the pipeline through code to create unique effects by controlling each cell's ASCII character, character color, background color, and more individually.
- **Asciifier management**: Create and manage multiple asciifiers to apply different ASCII rendering pipelines to different textures or canvases in parallel.
- **Font management**: Set the font and font size for all ASCII renderers in the pipeline of an asciifier.
- **Grid management**: Apply a perfect and responsive grid based on the canvas/texture dimensions, font size, and font metrics, or create a custom grid with a specific number of rows, columns, and depth.
- **WebGL1/WebGL2 support**: All shader code provided by `p5.asciify` is written in GLSL ES 1.0, making it compatible with both WebGL1 and WebGL2 contexts, allowing for a wide range of devices to run your ASCII projects.
- **Export functionality**: Export your ASCII art as `.txt`, `.svg` and `.json` files for easy sharing and printing, complementing p5.js's native image and GIF saving capabilities.

With `p5.asciify`, you can effortlessly create stunning ASCII art, textmode games, interactive ASCII experiences, and much more. The library is designed to be flexible, efficient, and easy to use, offering a comprehensive range of tools to help you develop unique and engaging ASCII projects.

