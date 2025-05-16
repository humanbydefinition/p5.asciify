---
sidebar_position: 1
title: Installation
---

## Prerequisites

- `p5.asciify` requires [`p5.js`](https://p5js.org/) version `1.8.0` or higher.
  - The library is also compatible with `p5.js` versions `2.x.x`, but only from version `2.0.2` onward.
- `p5.asciify` only runs in [`WEBGL`](https://p5js.org/reference/#/p5/createCanvas) mode, so make sure to set up your canvas accordingly:
```javascript
function setup() {
  createCanvas(800, 800, WEBGL);
}
```

That's it! You're now ready to install and use `p5.asciify` in your `p5.js` projects.

## Importing the library

### Global mode

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

### Instance mode

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

:::info
At this point - when imported correctly - your `p5.js` canvas in `WEBGL` mode should already be converted into a grid of ASCII characters with the default settings applied.
:::

<hr />

## Next steps

Now that you have `p5.asciify` installed and running, you're ready to start creating amazing ASCII art and textmode experiences in your `p5.js` projects! (｡◕‿‿◕｡)

It's a good idea to check out the [**Playgrounds**](../playgrounds) section to run, and play with `p5.asciify` example sketches in your browser to get a feel for the library and its capabilities.

In the [**Fundamentals**](../guides/fundamentals) guide, you'll learn more about the core concepts of the library and how to get started with your first project before diving into the [**Your First Rendering Pipeline**](../guides/first-rendering-pipeline) guide to create your first own rendering pipeline. (◕‿◕✿)

:::note
If you are using `p5.js` version `2.x.x`, please refer to the [**Integrating p5.asciify with p5.js 2.0**](./p5-2.x.x) guide for more information on how to set up the library in your project. All examples and guides in this documentation are based on `p5.js` versions `1.8.0` to `1.X.X`, so please keep that in mind when following along.
:::