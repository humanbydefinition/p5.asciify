/**
 * @name 04_hydra-synth
 * @description Basic example utilizing hydra-synth with p5.js and p5.asciify.
 * @author flordefuega
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * @link https://github.com/hydra-synth/hydra-synth
 * @link https://hydra.ojack.xyz/
 * 
 * This example demonstrates how to utilize the `hydra-synth` library with `p5.asciify`.
 * The default 'brightness' renderer is used to asciify the hydra canvas.
 * 
 * The `hydra-synth` library is imported globally in the HTML file.
 * (Probably also works with the npm package `hydra-synth` with some minor adjustments.)
 */

import p5 from 'p5';
import { p5asciify } from '../../../src/lib/index';

// Define the default options for the brightness renderer
export const BRIGHTNESS_OPTIONS = {
  enabled: true,
  characters: " .:-=+*#%@",
  characterColor: "#ffffff",
  characterColorMode: 'sampled',
  backgroundColor: "#000000",
  backgroundColorMode: 'fixed',
  invert: false,
  fontSize: 16,
  rotation: 0,
  flipVertically: false,
  flipHorizontally: false,
};

export const createSketch = (options = {}) => {
  const finalOptions = { ...BRIGHTNESS_OPTIONS, ...options };
  let p5Instance = null;

  let hydra; // Create a hydra object
  let hydraCanvas; // Create a canvas for hydra to render to
  let pGraphic; // Create a p5.Graphics object to store the hydra canvas (Would be cool if framebuffers work too..)

  const sketch = (p) => {

    let asciifier; // Define the `asciifier` variable to store the `P5Asciifier` instance

    p.setup = () => {
      p.setAttributes('antialias', false);
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

      pGraphic = p.createGraphics(p.width, p.height);

      // taken from p5Live references
      // https://teddavis.org/p5live/
      // hydra canvas + init
      hydraCanvas = document.createElement("canvas");
      hydraCanvas.width = p.width;
      hydraCanvas.height = p.height;
      hydra = new Hydra({ detectAudio: false, canvas: hydraCanvas });

      // hydra code
      osc(10, 0.1, [0, 2].smooth()).out();
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
        invert: finalOptions.invert,
        rotation: finalOptions.rotation,
        flipVertically: finalOptions.flipVertically,
        flipHorizontally: finalOptions.flipHorizontally,
      });
    };

    p.draw = () => {
      pGraphic.clear(); // Draw hydra to pGraphic
      pGraphic.drawingContext.drawImage(hydraCanvas, 0, 0, p.width, p.height);

      p.clear(); // Draw pGraphic to the screen for `p5asciify` to process
      p.image(pGraphic, -p.width / 2, -p.height / 2);
    };

    // After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
    p.drawAsciify = () => {
      // Draw the FPS counter
      const fpsText = "FPS:" + Math.min(Math.ceil(p.frameRate()), 60);

      // Set text properties first so the bounds calculation is accurate
      p.textFont(asciifier.fontManager.font);
      p.textSize(64);

      // Get accurate text bounds for the background rectangle
      const bounds = p.textBounds(fpsText, -p.width / 2, p.height / 2);

      // Draw background with padding
      p.noStroke();
      p.fill(0);
      p.rect(
        bounds.x - 5,
        bounds.y - 5,
        bounds.w + 10,
        bounds.h + 10
      );

      // Draw the text
      p.fill(255, 255, 0);
      p.text(fpsText, -p.width / 2, p.height / 2);
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      pGraphic.resizeCanvas(p.width, p.height);

      hydra.setResolution(p.width, p.height);
    };
  };

  // For standalone example usage
  p5Instance = new p5(sketch);
};