# p5.asciify ( ͡° ͜ʖ ͡°)


<div align="center">

![p5 asciify animated-logo](https://github.com/user-attachments/assets/bdc42553-c800-43a9-bedb-75a39b2a67d3)


| [![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![WebGL](https://img.shields.io/badge/WebGL1-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) | [![docs](https://img.shields.io/badge/docs-docusaurus-3ECC5F?logo=docusaurus&logoColor=white)](https://p5.textmode.art/) [![Discord](https://img.shields.io/discord/1357070706181017691?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/sjrw8QXNks) | [![ko-fi](https://shields.io/badge/ko--fi-donate-ff5f5f?logo=ko-fi)](https://ko-fi.com/V7V8JG2FY) [![Github-sponsors](https://img.shields.io/badge/sponsor-30363D?logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/humanbydefinition) |
|:-------------|:-------------|:-------------|

</div>


`p5.asciify` is a powerful add-on library for [`p5.js`](https://p5js.org/) that transforms your canvas and offcanvas textures into dynamic ASCII/textmode representations on a grid in real time, allowing you to create intricate ASCII/textmode art and much more with ease.

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

## Installation

### Prerequisites

- `p5.asciify` requires [`p5.js`](https://p5js.org/) versions `1.8.0` to `1.X.X` to run.
  - `p5.js` versions `2.X.X` are not yet supported, but will be in the future.
- `p5.asciify` only runs in [`WEBGL`](https://p5js.org/reference/#/p5/createCanvas) mode, so make sure to set up your canvas accordingly:

```javascript
function setup() {
  createCanvas(800, 800, WEBGL);
}
```

That's it! You're now ready to install and use `p5.asciify` in your `p5.js` projects.

### Importing the library

#### Global mode

Download the latest `umd` version of `p5.asciify` from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify/releases/) or import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/p5.asciify). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file <u>after</u> importing `p5.js`:

```html
<!-- Import p5.js before p5.asciify -->
<script src="path/to/library/p5.min.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="path/to/library/p5.asciify.umd.js"></script>

<!-- Or import it directly from a CDN like jsDelivr
<script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.9.0/dist/p5.asciify.umd.min.js"></script> 
-->
```

#### Instance mode

Download the latest `esm` version of `p5.asciify` from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify/releases/), import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/p5.asciify), or install it using `npm`:

```bash
npm install p5.asciify
```

```javascript
import p5 from 'p5';
import { p5asciify } from 'p5.asciify';

const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 800, p.WEBGL);
    };

    p.draw = () => {
      p.clear();
      p.background(0);
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateZ(p.radians(p.frameCount));
      p.directionalLight(255, 255, 255, 0, 0, -1);
      p.box(800, 100, 100);
    };
};

let myp5 = new p5(sketch);
```

<hr />

At this point - when imported correctly - your `p5.js` canvas in `WEBGL` mode should already be converted into a grid of ASCII characters with the default settings applied. Happy coding! (｡◕‿‿◕｡)

## Learn more

### 📚 [Visit the Official Documentation](https://p5.textmode.art/)

Explore the comprehensive documentation at [p5.textmode.art](https://p5.textmode.art/) for:
- Detailed guides
- Interactive examples
- Complete API reference
- Tips and tricks
- ... and much more!

The documentation will help you unlock the full potential of p5.asciify in your creative coding projects.

> [!NOTE]
> While the API reference is complete and always up-to-date, the documentation is still a work in progress. If you have any questions or need assistance, feel free to reach out on [Discord](https://discord.gg/sjrw8QXNks) or open an issue on GitHub.