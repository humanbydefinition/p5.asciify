/**
 * @name 00_basic
 * @description Basic example applying the pre-defined `'brightness'` renderer to a p5.js canvas with `p5.asciify`.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply the pre-defined `'brightness'` renderer to a p5.js canvas.
 * A rotating 3D box is drawn on the canvas and asciified using the `'brightness'` renderer.
 */

import p5 from 'p5';
import { p5asciify } from '../../../src/lib/index';

export const createSketch = (options = {}) => {
  let p5Instance = null;

  const sketch = (p) => {

    let asciifier; // Define the `asciifier` variable to store the `P5Asciifier` instance

    p.setup = () => {
      p.setAttributes('antialias', false);
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    // After `p5.asciify` is set up in the background after `setup()`,
    // we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
    p.setupAsciify = () => {
      // Fetch the default `P5Asciifier` instance provided by the library
      asciifier = p5asciify.asciifier();

      asciifier.fontSize(16);

      asciifier.backgroundMode('fixed'); // or 'sampled'

      // Update the pre-defined `brightness` renderer with the provided options
      asciifier.renderers().get("brightness").update({
        enabled: true,
        characters: " .:-=+*#%@",
        characterColor: "#ffffff",
        characterColorMode: 'sampled',
        backgroundColor: "#000000",
        backgroundColorMode: 'fixed',
        invertMode: false,
        rotationAngle: 0,
        flipHorizontally: false,
        flipVertically: false,
        brightnessRange: [0, 255],
      });
    };

    // Draw anything on the canvas to be asciified
    p.draw = () => {
      p.clear();
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateZ(p.radians(p.frameCount));
      p.directionalLight(255, 255, 255, 0, 0, -1);
      p.box(800, 100, 100);
    };

    // After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
    p.drawAsciify = () => {
      const fpsText = "FPS:" + Math.min(Math.ceil(p.frameRate()), 60);

      p.noStroke();
      p.fill(0);
      p.rect(-p.width / 2, p.height / 2 - p.textAscent() - 4, p.textWidth(fpsText), p.textAscent());

      p.textFont(asciifier.fontManager.font);
      p.textSize(64);
      p.fill(255, 255, 0);
      p.text(fpsText, -p.width / 2, p.height / 2);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  // For standalone example usage
  p5Instance = new p5(sketch);
};