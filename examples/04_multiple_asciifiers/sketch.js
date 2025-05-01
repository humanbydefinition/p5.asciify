/**
 * @name 05_multiple_asciifiers
 * @description Basic example applying multiple asciifiers on various textures in parallel with p5.js and p5.asciify.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply multiple asciifiers on various textures in parallel.
 * The pre-defined 'brightness' renderer by the default asciifier is used to asciify the canvas.
 * A custom asciifier is created and applied to a custom framebuffer.
 */

import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

export const DEFAULT_BRIGHTNESS_OPTIONS = {
  enabled: true,
  characters: " .:-=+*#%@",
  characterColor: "#ffffff",
  characterColorMode: 'sampled',
  backgroundColor: "#000000",
  backgroundColorMode: 'fixed',
  invertMode: false,
  fontSize: 16,
  rotationAngle: 0
};

export const CUSTOM_BRIGHTNESS_OPTIONS = {
  enabled: true,
  characters: " .:oO@",
  characterColor: "#ffffff",
  characterColorMode: 'sampled',
  backgroundColor: "#000000",
  backgroundColorMode: 'fixed',
  invertMode: true,
  fontSize: 32,
  rotationAngle: 0
};

export const createSketch = (options = {}) => {
  const finalDefaultOptions = { ...DEFAULT_BRIGHTNESS_OPTIONS, ...options };
  const finalCustomOptions = { ...CUSTOM_BRIGHTNESS_OPTIONS, ...options };
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
    p.setupAsciify = () => {

      // Fetch the default `P5Asciifier` instance provided by the library
      defaultAsciifier = p5asciify.asciifier();

      // Create a new asciifier instance and apply it to a custom framebuffer
      customFramebuffer = p.createFramebuffer();
      customAsciifier = p5asciify.add(customFramebuffer);

      // Set the font size for both asciifiers
      defaultAsciifier.fontSize(finalDefaultOptions.fontSize);
      customAsciifier.fontSize(finalCustomOptions.fontSize);

      // Update the default asciifiers default 'brightness' renderer with the provided options
      defaultAsciifier.renderers().get("brightness").update({
        enabled: finalDefaultOptions.enabled,
        characters: finalDefaultOptions.characters,
        characterColor: finalDefaultOptions.characterColor,
        characterColorMode: finalDefaultOptions.characterColorMode,
        backgroundColor: finalDefaultOptions.backgroundColor,
        backgroundColorMode: finalDefaultOptions.backgroundColorMode,
        invertMode: finalDefaultOptions.invertMode,
        rotationAngle: finalDefaultOptions.rotationAngle
      });

      // Update the custom asciifiers default 'brightness' renderer with the provided options
      customAsciifier.renderers().get("brightness").update({
        enabled: finalCustomOptions.enabled,
        characters: finalCustomOptions.characters,
        characterColor: finalCustomOptions.characterColor,
        characterColorMode: finalCustomOptions.characterColorMode,
        backgroundColor: finalCustomOptions.backgroundColor,
        backgroundColorMode: finalCustomOptions.backgroundColorMode,
        invertMode: finalCustomOptions.invertMode,
        rotationAngle: finalCustomOptions.rotationAngle
      });

      // Make the background of both asciifiers fully transparent.
      defaultAsciifier.background([0, 0, 0, 0]);
      customAsciifier.background([0, 0, 0, 0]);
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

      p.noStroke();
      p.fill(0);
      p.rect(-p.width / 2, p.height / 2 - p.textAscent() - 4, p.textWidth(fpsText), p.textAscent());

      p.textFont(defaultAsciifier.fontManager.font);
      p.textSize(64);
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