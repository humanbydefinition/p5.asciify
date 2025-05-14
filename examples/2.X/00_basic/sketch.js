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

// Define options for the brightness renderer
export const BRIGHTNESS_OPTIONS = {
  enabled: true,
  characters: " .:-=+*#%@",
  characterColor: "#ffffff",
  characterColorMode: 'sampled',
  backgroundColor: "#000000",
  backgroundColorMode: 'fixed',
  invertMode: false,
  fontSize: 16,
  rotationAngle: 0,
  flipHorizontally: false,
  flipVertically: false,
};

export const createSketch = (options = {}) => {
  const finalOptions = { ...BRIGHTNESS_OPTIONS, ...options };
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

      if (finalOptions.fontSize) { // If a `fontSize` is provided, set it in the `asciifier` instance
        asciifier.fontSize(finalOptions.fontSize);
      }

      // Update the pre-defined `brightness` renderer with the provided options
      asciifier.renderers().get("brightness").update({
        enabled: finalOptions.enabled,
        characters: finalOptions.characters,
        characterColor: finalOptions.characterColor,
        characterColorMode: finalOptions.characterColorMode,
        backgroundColor: finalOptions.backgroundColor,
        backgroundColorMode: finalOptions.backgroundColorMode,
        invertMode: finalOptions.invertMode,
        rotationAngle: finalOptions.rotationAngle,
        flipHorizontally: finalOptions.flipHorizontally,
        flipVertically: finalOptions.flipVertically,
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
      // Draw the FPS counter
      const fpsText = "FPS:" + Math.min(Math.ceil(p.frameRate()), 60);

      // Set text properties first so the bounds calculation is accurate
      p.textFont(asciifier.fontManager.font);
      p.textSize(64);

      // Get accurate text bounds for the background rectangle
      const textBounds = p.textBounds(fpsText, -p.width / 2, p.height / 2);

      // Draw background with padding
      p.noStroke();
      p.fill(0);
      p.rect(
        textBounds.x - 5,
        textBounds.y - 5,
        textBounds.w + 10,
        textBounds.h + 10
      );

      // Draw the text
      p.fill(255, 255, 0);
      p.text(fpsText, -p.width / 2, p.height / 2);
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  // For standalone example usage
  p5Instance = new p5(sketch);
};