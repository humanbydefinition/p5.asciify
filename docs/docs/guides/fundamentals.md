---
sidebar_position: 1
title: Fundamentals
description: Learn the fundamentals of p5.asciify library. Understand P5Asciifier instances, rendering pipelines, setupAsciify and drawAsciify hooks, and the default brightness, edge, and custom 2D renderers.
keywords: [p5.asciify fundamentals, P5Asciifier class, rendering pipeline basics, setupAsciify hook, drawAsciify hook, ASCII conversion concepts, p5asciify object, brightness renderer, edge renderer, custom 2D renderer]
---

Before diving into the `p5.asciify` library, it's a good idea to understand the core concepts that will help you make the most of its features. The library is deeply engrained in the `p5.js` lifecycle, and it is important to understand how it works in order to use it effectively.

## The [`p5asciify`](../api/variables/p5asciify) object

The `p5asciify` object exported by the library of type [`P5AsciifierManager`](../api/classes/P5AsciifierManager) is the main entry point for using the library. It manages and provides access to all of your [`P5Asciifier`](../api/classes/P5Asciifier) instances, who are responsible for converting the main canvas or a texture of your choice into an ASCII representation using your configured rendering pipelines.

The `p5asciify` object is created and initialized for you when you include the library in your project. You can access it directly using `p5asciify` in your code.

By default, the `p5asciify` object is created with a default [`P5Asciifier`](../api/classes/P5Asciifier) instance which is applied to the main canvas. You can create additional instances and apply them to different textures as needed, applying varying ASCII conversion pipelines to each one in parallel.

## The [`P5Asciifier`](../api/classes/P5Asciifier) class

The `P5Asciifier` class is the core component of the `p5.asciify` library. It is responsible for converting a texture into an ASCII representation using your configured rendering pipeline. Each `P5Asciifier` instance can be configured with its own settings, including the font, font size, grid dimensions, and rendering pipeline. 

A rendering pipeline is a series of ASCII conversion steps that are applied to the texture before it is rendered as ASCII art. For example, you can apply a brightness-based ASCII converter, followed by an edge detection-based converter. The pipeline can have any number of steps, and each step can be configured with its own settings.

By default, the pre-defined `P5Asciifier` instance and all instances created by the `p5asciify` object have a default rendering pipeline set up, including each available converter a single time, while only the brightness-based converter is enabled. This allows you to get started quickly without having to configure everything from scratch.

In order of execution, the default rendering pipeline is as follows:
- [`P5AsciifyBrightnessRenderer`](../api/p5.asciify/namespaces/renderers/namespaces/renderer2d/namespaces/feature/classes/P5AsciifyBrightnessRenderer) *(only enabled renderer by default)*
    - Applies brightness-based ASCII conversion to the texture.

- [`P5AsciifyEdgeRenderer`](../api/p5.asciify/namespaces/renderers/namespaces/renderer2d/namespaces/feature/classes/P5AsciifyEdgeRenderer)
    - Applies edge detection-based ASCII conversion to the texture, highlighting the edges of the image.

- [`P5AsciifyRenderer2D`](../api/p5.asciify/namespaces/renderers/namespaces/renderer2d/classes/P5AsciifyRenderer2D)
    - Applies custom 2D-based ASCII conversion based on the content you draw to various framebuffers provided by the renderer, to define the properties of each grid cell individually.

You can customize the rendering pipeline by adding or removing steps, or by changing the order of execution. This allows you to create unique ASCII art styles and effects.

## Hooks

The `p5.asciify` library provides two important hooks that allow you to set up your rendering pipeline(s), and to draw on top of the ASCII representation after it has been rendered to the main canvas.

These hooks are called automatically by the library at the appropriate times, and are set up and used similarly to the `p5.js` library's `setup()` and `draw()` functions.

### [`setupAsciify()`](../api/interfaces/P5AsciifyExtensions#setupasciify)

The `setupAsciify()` hook is called once after the user's `setup()` function, and is used to set up the rendering pipeline(s) for your `P5Asciifier` instances. This is where you can configure the fonts, font sizes, grid dimensions, and any other settings for your ASCII conversion pipeline(s). 

:::tip
All the things you set up in `setupAsciify()` can also be changed and modified at any time within the draw loop in your sketch, so you can create dynamic ASCII art that changes based on user input or other events.
:::


### [`drawAsciify()`](../api/interfaces/P5AsciifyExtensions#drawasciify)

The `drawAsciify()` hook is called once per frame after the user's `draw()` function, and is used to draw on top of the ASCII representation of your texture. This is where you can add any additional effects or overlays to your ASCII art, such as filters, text, shapes, or images.

<hr />

:::info
That's it for the fundamentals! Check out the [**Your first rendering pipeline**](./first-rendering-pipeline.md) guide next to learn how to set up and customize a rendering pipeline using the default `P5Asciifier` instance provided by the library through the `p5asciify` object.
:::