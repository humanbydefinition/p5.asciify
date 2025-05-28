---
sidebar_position: 5
title: Exporting your work
description: Learn how to export your p5.asciify ASCII art in multiple formats. Save as plain text files, structured JSON data, scalable SVG graphics, or traditional PNG/GIF images with comprehensive export options.
keywords: [p5.asciify export, ASCII art export, save ASCII text, JSON export ASCII, SVG ASCII art, PNG GIF export, ASCII file formats, p5.js save canvas, ASCII art sharing, textmode export options]
---

Before we dive into the details of exporting your work, let's take a moment to understand the different export formats available in `p5.js` and `p5.asciify`.

## Export formats

`p5.js` provides several export formats for saving and sharing your work, including:
- **Image**: Save your sketch as a static image in formats like PNG or JPEG.
- **GIF**: Save your sketch as an animated GIF, capturing the motion and transitions in your sketch.

Besides the above formats that can be exported using standard `p5.js` functions, `p5.asciify` provides a few additional export formats that are specific to the library and the ASCII art you create with it:
- **Text**: Save the ASCII representation of your sketch as a plain text file, preserving the grid format.
- **JSON**: Save the ASCII representation of your sketch as a JSON file, allowing for easy sharing and manipulation of the ASCII art data.
- **SVG**: Save the ASCII representation of your sketch as an SVG file, preserving the vector format and allowing for easy scaling and printing.

## Exporting static images

To export your sketch as a static image, you can use the [`saveCanvas()`](https://p5js.org/reference/p5/saveCanvas/) function provided by `p5.js`. This function allows you to save your sketch as a PNG or JPEG file. Here's an example of how to use it:

```javascript
function keyPressed() {
  if (key === 's') {
    saveCanvas('mySketch', 'png');
  }
}
```

In this example, pressing the 's' key will save the current frame of your sketch as a PNG file named `mySketch.png`.

## Exporting animated GIFs

To export your sketch as an animated GIF, you can use the [`saveGif()`](https://p5js.org/reference/p5/saveGif/) function provided by `p5.js`. This function allows you to capture a series of frames and save them as a GIF file. Here's an example of how to use it:

```javascript
// Save a 5-second gif when the user presses the 's' key.
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}
```

:::note
The GIF export might fail if your canvas is too large or if the animation is too long. In such cases, consider reducing the canvas size or the duration of the GIF.
:::

## Exporting text files

To export the ASCII representation of your sketch as a text file, you can use [`asciifier.saveStrings()`](../api/classes/P5Asciifier#savestrings) to save the ASCII representation of your sketch as a plain text file. Here's an example of how to use it:

```javascript
function keyPressed() {
  if (key === 's') {
    asciifier.saveStrings("ascii_output");
  }
}
```

:::tip
Using [`asciifier.toString()`](../api/classes/P5Asciifier#tostring), you can draw the ASCII representation of your sketch to the console.
:::

## Exporting JSON files

To export the ASCII representation of your sketch as a JSON file, you can use [`asciifier.saveJSON()`](../api/classes/P5Asciifier#savejson) to save the ASCII representation of your sketch as a JSON file. Here's an example of how to use it:

```javascript
function keyPressed() {
  if (key === 's') {
    asciifier.saveJSON({
        filename: "ascii_output",
        includeEmptyCells: true,
        prettyPrint: true,
    });
  }
}
```

The output format looks like this:

```json
{
  "metadata": {
    "version": "1.0",
    "created": "2025-04-23T16:37:52.692Z",
    "gridSize": {
      "cols": 13,
      "rows": 15,
      "cellWidth": 16,
      "cellHeight": 16,
      "width": 208,
      "height": 240
    }
  },
  "cells": [
    {
      "x": 0,
      "y": 0,
      "character": "Û",
      "unicode": 219,
      "color": "#000000ff",
      "backgroundColor": "#ffffffff",
      "rotation": 0,
      "inverted": false,
      "flipHorizontal": false,
      "flipVertical": false
    },
    {
      "x": 1,
      "y": 0,
      "character": "Û",
      "unicode": 219,
      "color": "#000000ff",
      "backgroundColor": "#ffffffff",
      "rotation": 0,
      "inverted": false,
      "flipHorizontal": false,
      "flipVertical": false
    },
    // ...
  ]
}
```

## Exporting SVG files

To export the ASCII representation of your sketch as an SVG file, you can use [`asciifier.saveSVG()`](../api/classes/P5Asciifier#savesvg) to save the ASCII representation of your sketch as an SVG file. Here's an example of how to use it:

```javascript
function keyPressed() {
  if (key === 's') {
    asciifier.saveSVG({
        filename: "ascii_output",
        drawMode: "stroke", // or "fill" or "text"
        includeBackgroundRectangles: false,
        strokeWidth: 1,
    });
  }
}
```