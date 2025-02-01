import p5 from 'p5';
import { p5asciify, P5Asciifier } from '../../src/lib/index';

export const DEFAULT_OPTIONS = {
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

export const createSketch = (options = {}) => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  let p5Instance = null;

  // While the default asciifier fetches the content from the canvas, the custom asciifier fetches it from a framebuffer
  let framebuffer;
  let customAsciifier;
  let customBrightnessRenderer;

  const sketch = (p) => {
    p5asciify.instance(p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      framebuffer = p.createFramebuffer();

      p.camera(0, 0, 400);
    };

    p.setupAsciify = () => {

      // Set up the default asciifier, provided by `p5.asciify`
      if (finalOptions.fontSize) {
        p5asciify.fontSize(finalOptions.fontSize);
      }

      p5asciify.renderers().get("brightness").update({
        enabled: finalOptions.enabled,
        characters: finalOptions.characters,
        characterColor: finalOptions.characterColor,
        characterColorMode: finalOptions.characterColorMode,
        backgroundColor: finalOptions.backgroundColor,
        backgroundColorMode: finalOptions.backgroundColorMode,
        invertMode: finalOptions.invertMode,
        rotationAngle: finalOptions.rotationAngle
      });

      // Set up a custom asciifier. This one will use a framebuffer as the source of the image.
      customAsciifier = new P5Asciifier(p, framebuffer, p5asciify.fontManager.font, 32);

      // Let's clear all the renderers from the custom asciifier that come by default.
      customAsciifier.renderers().clear();

      // Add a brightness renderer to the custom asciifier
      customBrightnessRenderer = customAsciifier.renderers().add("brightness", "brightness", { invertMode: true });
    };

    p.draw = () => {
      // Draw a scene onto the canvas, which will be asciified by the default `p5asciify` asciifier instance.
      p.push();
      p.clear();
      p.background(0);
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateZ(p.radians(p.frameCount));
      p.directionalLight(255, 255, 255, 0, 0, -1);
      p.box(800, 100, 100);
      p.pop();

      // Draw a different scene onto the framebuffer, which will be asciified by the custom asciifier instance.
      framebuffer.begin();
      p.push();
      p.clear();
      p.background(0);
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateY(p.radians(p.frameCount));
      p.directionalLight(255, 255, 255, 0, 0, -1);
      p.torus(200, 100);
      p.pop();
      framebuffer.end();
    };

    p.drawAsciify = () => {

      p.orbitControl(); // Enable orbit control for the 3d scene. (No idea why it doesn't work in `draw`..)

      // Asciify the framebuffer content. The default `p5asciify` instance does this automatically.
      // Call `asciify` in `drawAsciify`, otherwise `p5asciify` picks up the result.
      customAsciifier.asciify();

      // Set the background, overwriting the otherwise asciified result from the default `p5asciify` instance.
      p.background(100);

      // Draw the two asciifier scenes side by side onto 3d cubes.
      p.push(); // Default `p5asciify` asciifier scene
      p.translate(-p.width / 8, 0, 0);
      p.texture(p5asciify.texture);
      p.box(200, 200, 200);
      p.pop();

      p.push(); // Custom asciifier scene
      p.translate(p.width / 8, 0, 0);
      p.texture(customAsciifier.texture)
      p.box(200, 200, 200);
      p.pop();

    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  // For Storybook usage
  if (options.container) {
    p5Instance = new p5(sketch, options.container);
    return options.container;
  }

  // For standalone example usage
  p5Instance = new p5(sketch);
};