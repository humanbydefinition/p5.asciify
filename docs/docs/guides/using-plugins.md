---
sidebar_position: 6
title: Using renderer plugins
---

`p5.asciify` offers a plugin system that allows you to register reusable renderer plugins, which can be added to any rendering pipeline, similar to other pre-defined renderers like the brightness-based ASCII renderer.

In the following guide, we'll walk through the process of installing and using the `"accurate"` renderer plugin, which is an old renderer that has been removed from the core library. The plugin feature is fairly new, and the `"accurate"` renderer is the only plugin available at the moment. However, it serves as a great example on how to use plugins in `p5.asciify` in general.

`"accurate"` renderer plugin: [**GitHub repository**](https://github.com/humanbydefinition/p5.asciify-accurate-renderer-plugin)

## Installing plugins

### Prerequisites
- Plugins renderers require `p5.asciify` version [`0.9.5`](https://github.com/humanbydefinition/p5.asciify/releases/tag/v0.9.5) or later.
- Plugins support the same `p5.js` versions as `p5.asciify`.
- Plugins work in both `GLOBAL` and `INSTANCE` mode.

### Importing a plugin

#### Global mode

Download the latest `umd` bundle of the plugin from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify-accurate-renderer-plugin/releases/) or import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/p5.asciify-accurate-renderer-plugin). The plugin is distributed as a single JavaScript file, which you can include in your project by adding the following script tag to your HTML file <u>after</u> importing `p5.asciify`:

```html
<!-- Import p5.js before p5.asciify -->
<script src="path/to/library/p5.min.js"></script>

<!-- Import p5.asciify after p5.js -->
<script src="path/to/library/p5.asciify.umd.js"></script>

<!-- Import the plugin after p5.asciify -->
<script src="path/to/library/p5.asciify-accurate-renderer-plugin.umd.js"></script>
```

#### Instance mode

Download the latest `esm` version of this plugin from the [**GitHub releases page**](https://github.com/humanbydefinition/p5.asciify-accurate-renderer-plugin/releases/), import it directly from a CDN like [**jsDelivr**](https://www.jsdelivr.com/package/npm/p5.asciify-accurate-renderer-plugin), or install it using `npm`:

```bash
npm install p5.asciify-accurate-renderer-plugin
```

```javascript
import p5 from 'p5';
import { p5asciify } from 'p5.asciify';
import { AccurateRendererPlugin } from 'p5.asciify-accurate-renderer-plugin';

const sketch = (p) => {

    let asciifier;

    p.setup = () => {
      p.createCanvas(800, 800, p.WEBGL);
    };

    p.setupAsciify = () => {
      p5asciify.registerPlugin(AccurateRendererPlugin);

      asciifier = p5asciify.asciifier();
      asciifier.renderers().disable();
      asciifier.renderers().add("accurate", "accurate", { enabled: true });
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

## Usage

To use the `"accurate"` renderer, you need to register the plugin with `p5.asciify` using [`p5asciify.registerPlugin(AccurateRendererPlugin)`](../api/classes/P5AsciifierManager#registerplugin) within [`setupAsciify()`](../api/interfaces/P5AsciifyExtensions#setupasciify), and add it to a rendering pipeline of a [`P5Asciifier`](../api/classes/P5Asciifier) instance. The `"accurate"` renderer can then be used in the same way as the pre-defined `"brightness"` renderer, since it uses the exact same API.

```javascript
let asciifier;
let accurateRenderer;

function setup() {
  createCanvas(800, 800, WEBGL);
}

function setupAsciify() {
  p5asciify.registerPlugin(AccurateRendererPlugin);

  asciifier = p5asciify.asciifier();
  asciifier.renderers().disable();

  accurateRenderer = asciifier.renderers().add("accurate", "accurate", { enabled: true });

  accurateRenderer.update({
    enabled: true, // redundant, but for clarity
    characters: " .:-=+*%@#",
    characterColor: "#ffffff",
    characterColorMode: "sampled", // or "fixed"
    backgroundColor: "#000000",
    backgroundColorMode: "sampled", // or "fixed"
    invertMode: false, // swap char and bg colors
    rotationAngle: 0, // rotation angle in degrees
    flipVertically: false, // flip chars vertically
    flipHorizontally: false, // flip chars horizontally
  });
}

function draw() {
  background(32);
  fill(255);
  rotateX(radians(frameCount * 3));
  rotateZ(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(800, 100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
