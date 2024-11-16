This guide will help you get started with `p5.asciify` by showing you how to install the library and use it in your [`p5.js`](https://p5js.org/) projects.

>[!NOTE]
> If you've read the entire [`README`](https://github.com/humanbydefinition/p5.asciify/blob/main/README.md), there's nothing new here!

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
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="path/to/library/p5.asciify.min.js"></script>
```


Alternatively, the library can be imported directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/):

```html	
<!-- Import p5.js before p5.asciify -->
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.3.0/dist/p5.asciify.min.js"></script>
```

> [!TIP]
> To capture a canvas with libraries like [`p5.capture`](https://github.com/tapioca24/p5.capture) and `p5.asciify` applied, make sure to import them **after** `p5.asciify` to ensure the correct rendering order.
>
> ```html
> <!-- Import p5.js before p5.asciify -->
> <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>
>
> <!-- Import p5.asciify after p5.js -->
> <script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.3.0/dist/p5.asciify.min.js"></script>
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
> All examples and explanations in the [`Wiki`](https://github.com/humanbydefinition/p5.asciify/wiki) are given in global mode. To use them in instance mode, you need to adjust the code accordingly, as shown in the example above.
>
> Essentially, you need to pass the p5 instance to the `p5asciify` library using the `p5asciify.instance(sketch)` function before setup, as well as using the p5 instance to call the functions provided by the library.

<hr />

To dive deeper and start creating your own amazing visualizations with `p5.asciify`, check out the [`Usage`](https://github.com/humanbydefinition/p5.asciify/wiki/Usage) section to learn how to customize the ASCII conversion and apply various effects to your sketches! You'll find step-by-step instructions and examples on how to effectively use `p5.asciify` in your projects. 


