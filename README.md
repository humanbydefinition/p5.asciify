# p5.asciify ( ͡° ͜ʖ ͡°)

<p align="center">
  <img src="https://github.com/humanbydefinition/p5.asciify/raw/main/repo_assets/p5.asciify.animated-logo.gif" />
</p>

`p5.asciify` is a [`p5.js`](https://p5js.org/) add-on library for converting the main canvas in [`WEBGL`](https://p5js.org/reference/p5/WEBGL/) mode into a grid of ASCII characters in real-time, allowing you to bring a retro, text-based aesthetic to your visualizations, adding a unique touch to your creative coding projects.

The main goal of `p5.asciify` is to provide an easy-to-use, customizable solution for converting the main [`p5.js`](https://p5js.org/) canvas into ASCII characters, offering a wide range of settings and effects to adjust the appearance of the ASCII grid to specific needs and artistic vision.

To see `p5.asciify` in action, check out the example sketches in the provided collection on the [p5.js web editor](https://editor.p5js.org/): 
[`p5.asciify examples`](https://editor.p5js.org/humanbydefinition/collections/DUa3pcJqn).

`p5.asciify` is actively developed and maintained by [**@humanbydefinition**](https://github.com/humanbydefinition), with new features and improvements being added regularly. The library is open-source and available here, where you can contribute to its development, report issues, or suggest new features. I highly value your feedback and contributions, so feel free to reach out!

I would love to see your creations using `p5.asciify`! Feel free to tag me on social media or use the hashtag `#p5asciify` so I can enjoy and share your amazing work too. (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 

[![Instagram](https://img.shields.io/badge/Instagram-lightgrey?style=social&logo=instagram)](https://www.instagram.com/humanbydefinition/)

*Special thanks to [`@davepagurek`](https://github.com/davepagurek) for helping me learn how to create a p5.js addon library! (✿◠‿◠)*

# Getting Started

## Prerequisites

- `p5.asciify` requires [`p5.js`](https://p5js.org/) version `1.8.0` or higher to work. 
- `p5.asciify` only runs in [`WEBGL`](https://p5js.org/reference/#/p5/createCanvas) mode, so make sure to set up your canvas accordingly:

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
```

That's it! You're now ready to install and use `p5.asciify` in your [`p5.js`](https://p5js.org/) projects.

## Installation

Download the latest version of `p5.asciify` from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify/releases). The library is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file <u>after</u> importing `p5.js`:

```html
<!-- Import p5.js before p5.asciify -->
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="path/to/library/p5.asciify.min.js"></script>
```


Alternatively, the library can be imported directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/):

```html	
<!-- Import p5.js before p5.asciify -->
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.1.5/dist/p5.asciify.min.js"></script>
```

> [!TIP]
> To capture a canvas with libraries like [`p5.capture`](https://github.com/tapioca24/p5.capture) and `p5.asciify` applied, make sure to import them **after** `p5.asciify` to ensure the correct rendering order.
>
> ```html
> <!-- Import p5.js before p5.asciify -->
> <script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.js"></script>
>
> <!-- Import p5.asciify after p5.js -->
> <script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.1.5/dist/p5.asciify.min.js"></script>
>
> <!-- Import p5.capture after p5.asciify -->
> <script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>
> ```

At this point, when imported correctly, the [`p5.js`](https://p5js.org/) canvas in `WEBGL` mode should already be converted into a grid of ASCII characters with the default settings applied! (｡◕‿‿◕｡)

### Instance mode

Since v0.2.0, `p5.asciify` officially supports both global and instance mode. To use the library in instance mode, you need to load it in a specific way:

```javascript
const theSketch = (sketch) => {

    p5asciify.instance(sketch); // Pass the p5 instance to the p5asciify library before setup

    sketch.setup = () => {
        sketch.createCanvas(800, 800, sketch.WEBGL);

        sketch.setAsciiOptions({ // All functions provided by p5.asciify are now available through the p5 instance
            common: {
                fontSize: 16,
            },
            brightness: {
                enabled: true,
                invertMode: true,
            },
            edge: {
                enabled: true,
                invertMode: true
            }
        });
    };

    sketch.draw = () => {
        sketch.push();
        sketch.background(0);
        sketch.fill(255);
        sketch.rotateX(sketch.radians(sketch.frameCount * 3));
        sketch.rotateZ(sketch.radians(sketch.frameCount));
        sketch.directionalLight(255, 255, 255, 0, 0, -1);
        sketch.box(800, 100, 100);
        sketch.pop();
    };
};

let myp5 = new p5(theSketch);
```
> [!NOTE]
> All examples in the Wiki are written in global mode. To use them in instance mode, you need to adjust the code accordingly, as shown in the example above.


# Usage

Check out the [`Usage`](https://github.com/humanbydefinition/p5.asciify/wiki/02_Usage) section in the [`Wiki`](https://github.com/humanbydefinition/p5.asciify/wiki) to learn how to customize the ASCII conversion and apply various effects to your sketches! You'll find step-by-step instructions and examples on how to effectively use `p5.asciify` in your projects.

## Contributing
Contributions are welcome. Please [`open an issue`](https://github.com/humanbydefinition/p5.asciify/issues) or [`submit a pull request`](https://github.com/humanbydefinition/p5.asciify/pulls) on GitHub.

## License
This project is licensed under the MIT License. See the [`LICENSE`](https://github.com/humanbydefinition/p5.asciify/blob/main/LICENSE) file for more details.
