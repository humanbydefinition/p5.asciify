# p5.asciify ( ͡° ͜ʖ ͡°)

<p align="center">
  <img src="./repo_assets/images/p5.asciify.animated-logo.gif" />
  <img src="./repo_assets/images/p5.asciify.animated-logo.gif" />
</p>

`p5.asciify` is a powerful add-on library for [`p5.js`](https://p5js.org/) that transforms your canvas and offcanvas textures into dynamic ASCII/textmode representations on a 3D grid in real time, allowing you to create intricate 2D and 3D ASCII/textmode art and much more with ease.
`p5.asciify` is a powerful add-on library for [`p5.js`](https://p5js.org/) that transforms your canvas and offcanvas textures into dynamic ASCII/textmode representations on a 3D grid in real time, allowing you to create intricate 2D and 3D ASCII/textmode art and much more with ease.

## Table of Contents

- [Features](#features)
- [Examples](#examples)
  - [Code examples](#code-examples)
  - [Tools](#tools)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Importing the library](#importing-the-library)
    - [Global mode](#global-mode)
    - [Instance mode](#instance-mode)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Current and past contributors](#current-and-past-contributors)
  - [Donations](#donations)

## Features

`p5.asciify` is the most advanced ASCII conversion library, offering a wide range of tools for crafting intricate ASCII art and building complex, multi-layered rendering pipelines.

- **Renderer management**: Create and manage multiple ASCII renderers with different settings to create a unique rendering pipeline.
- **Pre-built renderers (2D)**: Add pre-built renderers, like `'brightness'`- or `'edge'`-based ASCII converters, to your pipeline.
- **Custom renderers**: Add your own custom 2D or 3D ASCII renderers to the pipeline to create unique effects by controlling each cell's ASCII character, character color, background color, and more individually.
- **Asciifier management**: Create and manage multiple asciifiers to apply different ASCII rendering pipelines to different textures or canvases in parallel.
- **Camera modes**: Choose between `'orthogonal'` and `'perspective'` camera modes to adjust the ASCII grid's appearance of an asciifier.
- **Grid transformations**: Rotate, scale, and translate the ASCII grid in 3D space to create dynamic and interactive 2D/3D ASCII art.
- **Font management**: Set the font and font size for all ASCII renderers in the pipeline of an asciifier.
- **Grid management**: Apply a perfect and responsive grid based on the canvas/texture dimensions, font size, and font metrics, or create a custom grid with a specific number of rows, columns, and depth.
- **WebGL1/WebGL2 support**: All shader code provided by `p5.asciify` is written in GLSL ES 1.0, making it compatible with both WebGL1 and WebGL2 contexts, allowing for a wide range of devices to run your ASCII projects.

With `p5.asciify`, you can effortlessly create stunning ASCII art, textmode games, interactive ASCII experiences, and much more. The library is designed to be flexible, efficient, and easy to use, offering a comprehensive range of tools to help you develop unique and engaging ASCII projects.

## Examples

### Code examples
- [`p5.js web editor collection`](https://editor.p5js.org/humanbydefinition/collections/VAws0yqLW) - A collection of `p5.asciify` examples in `GLOBAL` mode.
- [`./examples`](./examples) - A collection of `p5.asciify` examples in `INSTANCE` mode.

### Tools
- [`textmode.art`](https://textmode.art/) - An ASCII/textmode editor powered by `p5.asciify`.

### ...and more to come!

### ...and more to come!

> [!NOTE]
> Feel free to submit your own ASCII projects and examples using `p5.asciify` to be featured here by creating a pull request or opening an issue!

## Installation

### Prerequisites

- `p5.asciify` requires [`p5.js`](https://p5js.org/) version `1.8.0` or higher to work. 
- `p5.asciify` only runs in [`WEBGL`](https://p5js.org/reference/#/p5/createCanvas) mode, so make sure to set up your canvas accordingly:

```javascript
function setup() {
  createCanvas(800, 800, WEBGL);
}
```

That's it! You're now ready to install and use `p5.asciify` in your [`p5.js`](https://p5js.org/) projects.

### Importing the library

#### Global mode

Download the latest `umd` version of `p5.asciify` from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify/releases/) or import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/p5.asciify). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file <u>after</u> importing [`p5.js`](https://p5js.org/):

```html
<!-- Import p5.js before p5.asciify -->
<script src="path/to/library/p5.min.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="path/to/library/p5.asciify.umd.js"></script>
```

#### Instance mode

Download the latest `esm` version of `p5.asciify` from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify/releases/), import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/p5.asciify), or install it using `npm`:

```bash
npm install p5.asciify
```

```javascript
import p5 from 'p5';
import { p5asciify } from 'p5.asciify';

const theSketch = (sketch) => {

    // Pass the p5 instance to the p5asciify library before setup
    p5asciify.instance(sketch); 

    sketch.setup = () => {
      sketch.createCanvas(800, 800, sketch.WEBGL);
    };

    sketch.draw = () => {
      sketch.clear();
      sketch.background(0);
      sketch.fill(255);
      sketch.rotateX(sketch.radians(sketch.frameCount * 3));
      sketch.rotateZ(sketch.radians(sketch.frameCount));
      sketch.directionalLight(255, 255, 255, 0, 0, -1);
      sketch.box(800, 100, 100);
    };
};

let myp5 = new p5(theSketch);
```

> [!WARNING]
> In `INSTANCE` mode, it is essential to call `p5asciify.instance(sketch);` during initialization only if you are **not** providing any `preload()` function to your sketch in order to avoid any potential issues with the library's initialization process. If you are using `preload()`, you can safely skip this step.
> In `INSTANCE` mode, it is essential to call `p5asciify.instance(sketch);` during initialization only if you are **not** providing any `preload()` function to your sketch in order to avoid any potential issues with the library's initialization process. If you are using `preload()`, you can safely skip this step.
>
> *(Note: This step is not required for `GLOBAL` mode sketches.)*

<hr />

At this point - when imported correctly - your [`p5.js`](https://p5js.org/) canvas in `WEBGL` mode should already be converted into a grid of ASCII characters with the default settings applied. Happy coding! (｡◕‿‿◕｡)

## Usage

To effectively use `p5.asciify` in your projects, check out the following resources:
- [`./docs`](https://github.com/humanbydefinition/p5-asciify/tree/main/docs) - The documentation for all classes, methods, and properties provided by `p5.asciify`.
- [`./examples`](./examples) - A collection of `p5.asciify` examples in `INSTANCE` mode.
- [`p5.js web editor collection`](https://editor.p5js.org/humanbydefinition/collections/VAws0yqLW) - A collection of `p5.asciify` examples in `GLOBAL` mode.

> [!NOTE]
> If you have any questions or need help with a specific feature, feel free to open an issue or reach out to [`@humanbydefinition`](https://github.com/humanbydefinition) directly for assistance.
> If you have any questions or need help with a specific feature, feel free to open an issue or reach out to [`@humanbydefinition`](https://github.com/humanbydefinition) directly for assistance.
>
> If you would like to contribute to the documentation or examples, please refer to the [Contributing Guidelines](./repo_assets/markdown/CONTRIBUTING.md) or reach out for more information.

## Contributing

`p5.asciify` is an ongoing open-source project, welcoming and valuing all types of contributions from the community. If you are interested in contributing to the project, please read our [Contributing Guidelines](./repo_assets/markdown/CONTRIBUTING.md) to get started.

### Current and past contributors

| **Contributor** | **Website** | **Socials** |
|-----------------|-------------|------------|
| [humanbydefinition](https://github.com/humanbydefinition) <br> Creator and active maintainer of `p5.asciify`. | [![Website](https://badgen.net/badge/Visit/website/blue?icon=chrome-web-store)](https://textmode.art) | [![Instagram](https://badgen.net/badge/Instagram/humanbydefinition/pink?icon=instagram)](https://instagram.com/humanbydefinition) <br> [![Mastodon](https://badgen.net/badge/Mastodon/@humanbydefinition/blue?icon=mastodon)](https://mastodon.social/@humanbydefinition) |
| [davepagurek](https://github.com/davepagurek) <br> WebGL steward for [p5.js](https://p5js.org/) and a huge help bringing `p5.asciify` to life. | [![Website](https://badgen.net/badge/Visit/website/blue?icon=chrome-web-store)](https://www.davepagurek.com/) | [![Instagram](https://badgen.net/badge/Instagram/davepagurek/pink?icon=instagram)](https://instagram.com/davepagurek) <br> [![Mastodon](https://badgen.net/badge/Mastodon/@davepagurek/blue?icon=mastodon)](https://mastodon.online/@davepagurek@genart.social) |
| [gridsystem](https://github.com/gridsystem) <br> Provided valuable advice that greatly improved project accessibility. | *N/A* | *N/A* |
| [flordefuego](https://github.com/flordefuego) <br> Provided examples and insights on combining Hydra, p5.js, and `p5.asciify`. | [![Website](https://badgen.net/badge/Visit/website/blue?icon=chrome-web-store)](https://flordefuego.xyz/) | [![Instagram](https://badgen.net/badge/Instagram/flordefuega/pink?icon=instagram)](https://instagram.com/flordefuega) <br> [![Mastodon](https://badgen.net/badge/Mastodon/@flordefuego/blue?icon=mastodon)](https://mastodon.social/@flordefuego@post.lurk.org) |
> [!NOTE]
> If you have contributed in the past and would like to be featured here, please open an issue or create a pull request to add your information to the list.

### Donations

If you enjoy using `p5.asciify` and would like to support my textmode endeavors and its continued development, your contribution is greatly appreciated.

- [**Ko-fi**](https://ko-fi.com/humanbydefinition)
- [**GitHub Sponsors**](https://github.com/sponsors/humanbydefinition)
- [**Ethereum**](https://etherscan.io/address/0xAA14d79ccF069d3E57eeCb6822c1F241e0d46C42)
- [**Tezos**](https://tzkt.io/humanbydefinition.tez)

Thank you for your generosity and for being part of this creative journey! (｡♥‿♥｡)

> [!NOTE]
> You can also support the project by starring the repository, sharing it with your friends, or contributing in any way you feel comfortable with. Every little bit helps!
>
> I also love hearing from you and seeing the projects you create with `p5.asciify`, so feel free to reach out and share your work with me anytime! (◕‿◕)

> [!IMPORTANT]
> `p5.asciify` remains free, accessible, and open-source forever for everyone to use and enjoy, regardless of any contributions or donations. Your support is greatly appreciated but never required to use the library or access its features.
