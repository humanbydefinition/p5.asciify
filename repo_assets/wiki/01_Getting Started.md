This guide will help you get started with `p5.asciify` by showing you how to install the library and use it in your [`p5.js`](https://p5js.org/) projects.

>[!NOTE]
> If you've read the entire [`README`](https://github.com/humanbydefinition/p5.asciify/blob/main/README.md) on the front page already, there's nothing new here!

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
<script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.7.3/dist/p5.asciify.umd.js"></script>
```

> [!TIP]
> To capture a canvas with libraries like [`p5.capture`](https://github.com/tapioca24/p5.capture) and `p5.asciify` applied, make sure to import them **after** `p5.asciify` to ensure the correct rendering order.
>
> ```html
> <!-- Import p5.js before p5.asciify -->
> <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.js"></script>
>
> <!-- Import p5.asciify after p5.js -->
> <script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.7.3/dist/p5.asciify.umd.js"></script>
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

<hr />

To dive deeper and start creating your own amazing visualizations with `p5.asciify`, check out the [`Usage`](https://github.com/humanbydefinition/p5.asciify/wiki/Usage) section to learn how to customize the ASCII conversion! You'll find step-by-step instructions and examples on how to effectively use `p5.asciify` in your projects. 