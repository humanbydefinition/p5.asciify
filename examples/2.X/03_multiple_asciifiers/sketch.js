/**
 * @name 03_multiple_asciifiers
 * @description Basic example applying multiple asciifiers on various textures in parallel with p5.js and p5.asciify.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply multiple asciifiers on various textures in parallel.
 * The pre-defined 'brightness' renderer by the default asciifier is used to asciify the canvas.
 * A custom asciifier is created and applied to a custom framebuffer.
 */

import p5 from 'p5';
import { p5asciify } from '../../../src/lib/index';

export const createSketch = (options = {}) => {
  let p5Instance = null;

  const sketch = (p) => {

    let defaultAsciifier; // Define a variable to store the default `P5Asciifier` instance
    let customAsciifier; // Define a variable to store the custom `P5Asciifier` instance

    let customFramebuffer; // Framebuffer the custom asciifier will asciify

    p.setup = () => {
      p.setAttributes('antialias', false);
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    // After `p5.asciify` is set up in the background after `setup()`,
    // we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
    p.setupAsciify = async () => {

      // Fetch the default `P5Asciifier` instance provided by the library
      defaultAsciifier = p5asciify.asciifier();

      // Create a new asciifier instance and apply it to a custom framebuffer
      customFramebuffer = p.createFramebuffer();
      customAsciifier = await p5asciify.add(customFramebuffer);

      // Set the font size for both asciifiers
      defaultAsciifier.fontSize(16);
      customAsciifier.fontSize(32);

      // Update the default asciifiers default 'brightness' renderer with the provided options
      defaultAsciifier.renderers().get("brightness").update({
        enabled: true,
        characters: " .:-=+*#%@",
        characterColor: "#ffffff",
        characterColorMode: 'sampled',
        backgroundColor: "#000000",
        backgroundColorMode: 'fixed',
        invertMode: false,
        fontSize: 16,
        rotationAngle: 0,
        brightnessRange: [0, 255],
      });

      // Update the custom asciifiers default 'brightness' renderer with the provided options
      customAsciifier.renderers().get("brightness").update({
        enabled: true,
        characters: " .:oO@",
        characterColor: "#ffffff",
        characterColorMode: 'sampled',
        backgroundColor: "#000000",
        backgroundColorMode: 'fixed',
        invertMode: true,
        fontSize: 32,
        rotationAngle: 0,
        brightnessRange: [0, 255],
      });

      defaultAsciifier.backgroundMode('fixed'); // or 'sampled'
      customAsciifier.backgroundMode('fixed'); // or 'sampled'
    };

    p.draw = () => {
      p.directionalLight(255, 255, 255, 0, 0, -1);

      // Draw anything on the custom framebuffer for the custom asciifier to asciify
      customFramebuffer.begin();
      p.clear();
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateZ(p.radians(p.frameCount));
      p.box(800, 100, 100);
      customFramebuffer.end();

      // Draw anything on the canvas for the default asciifier to asciify
      p.clear();
      p.normalMaterial();
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateY(p.radians(p.frameCount));
      p.torus(300, 100);
    };

    // After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
    p.drawAsciify = () => {
      p.background(0); // Set the background to black, removing everything previously drawn

      // Draw both asciifier textures on top of each other
      p.image(defaultAsciifier.texture, -p.width / 2, -p.height / 2);
      p.image(customAsciifier.texture, -p.width / 2, -p.height / 2);

      // Draw the FPS counter
      const fpsText = "FPS:" + Math.min(Math.ceil(p.frameRate()), 60);

      // Set text properties first so the bounds calculation is accurate
      p.textFont(defaultAsciifier.fontManager.font);
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
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  // For standalone example usage
  p5Instance = new p5(sketch);
};