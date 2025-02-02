# p5.asciify ( ͡° ͜ʖ ͡°)

<p align="center">
  <img src="https://github.com/humanbydefinition/p5.asciify/raw/main/repo_assets/p5.asciify.animated-logo.gif" />
</p>

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
- **Local Examples**: Explore the `examples` folder for `instance mode` implementations
- **Online Examples**: View [`p5.js web editor collection`](https://editor.p5js.org/humanbydefinition/collections/VAws0yqLW) for `global mode` versions

> Both example sets demonstrate the same functionality, just implemented differently based on p5.js usage mode.

# Getting Started

## Prerequisites

- `p5.asciify` requires [`p5.js`](https://p5js.org/) version `1.8.0` or higher to work. 
- `p5.asciify` only runs in [`WEBGL`](https://p5js.org/reference/#/p5/createCanvas) mode, so make sure to set up your canvas accordingly:

```javascript
function setup() {
  createCanvas(800, 800, WEBGL);
}
```

That's it! You're now ready to install and use `p5.asciify` in your [`p5.js`](https://p5js.org/) projects.

## Installation

Download the latest version of `p5.asciify` from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify/releases). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file <u>after</u> importing `p5.js`:

```html
<!-- Import p5.js before p5.asciify -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="path/to/library/p5.asciify.min.js"></script>
```


Alternatively, the library can be imported directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/):

```html	
<!-- Import p5.js before p5.asciify -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.7.2/dist/p5.asciify.umd.js"></script>
```

> [!TIP]
> To capture a canvas with libraries like [`p5.capture`](https://github.com/tapioca24/p5.capture) and `p5.asciify` applied, make sure to import them **after** `p5.asciify` to ensure the correct rendering order.
>
> ```html
> <!-- Import p5.js before p5.asciify -->
> <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>
>
> <!-- Import p5.asciify after p5.js -->
> <script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.7.2/dist/p5.asciify.umd.js"></script>
>
> <!-- Import p5.capture after p5.asciify -->
> <script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>
> ```

At this point, when imported correctly, the [`p5.js`](https://p5js.org/) canvas in `WEBGL` mode should already be converted into a grid of ASCII characters with the default settings applied! (｡◕‿‿◕｡)

### Instance mode

`p5.asciify` supports both global and instance mode. To use the library in instance mode *(through `npm` for example)*, you need to load the library in a specific way:

```bash
npm install p5.asciify
```

```javascript
import p5 from 'p5';
import { p5asciify } from 'p5.asciify';

const theSketch = (sketch) => {

    sketch.setup = () => {
      sketch.createCanvas(800, 800, sketch.WEBGL);
    };

    // Setup function specific to the p5.asciify library, 
    // which is executed automatically after the p5.js setup function is finished
    sketch.setupAsciify = () => {

      // Set the font size for all ASCII renderers of the library
      p5asciify.fontSize(finalOptions.fontSize);

      p5asciify.renderers().get("brightness").update({
        characters: " .,:;i1tfLCG08@", // ASCII characters used for rendering
        invertMode: true, // Swap the ASCII character colors with it's cell background colors
      });
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
> [!NOTE]
> All examples and explanations in the [`Wiki`](https://github.com/humanbydefinition/p5.asciify/wiki) are given in global mode. To use them in instance mode, you need to adjust the code accordingly, as shown in the example above.

# Usage
Check out the [`Usage`](https://github.com/humanbydefinition/p5.asciify/wiki/02_Usage) section in the [`Wiki`](https://github.com/humanbydefinition/p5.asciify/wiki) to learn how to customize and create your own ASCII rendering pipeline! You'll find step-by-step instructions and examples on how to effectively use `p5.asciify` in your projects.

## Contributing
Contributions are welcome! To ensure consistency, please follow our [Contributing Guidelines](https://github.com/humanbydefinition/p5.asciify/wiki/04_Contributing) before submitting issues or pull requests.

## License
This project is licensed under the MIT License. See the [`LICENSE`](https://github.com/humanbydefinition/p5.asciify/blob/main/LICENSE) file for more details.
