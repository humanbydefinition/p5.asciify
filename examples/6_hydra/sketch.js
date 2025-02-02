/**
 * Example sketch utilizing p5.js with p5.asciify + hydra
 * 
 * by @flordefuega with minor adjustments by @humanbydefinition
 * YouTube: https://www.youtube.com/@flordefuega
 * Instagram: https://www.instagram.com/flordefuega/
 * 
 * hydra: https://hydra.ojack.xyz/
 * hydra-synth: https://github.com/hydra-synth/hydra-synth
 * 
 * `hydra-synth` is imported globally in the HTML file here.
 * Probably also works with the npm package `hydra-synth with some minor adjustments.
 */

import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

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

  let hydra; // Create a hydra object
  let hydraCanvas; // Create a canvas for hydra to render to
  let pGraphic; // Create a p5.Graphics object to store the hydra canvas (Would be cool if framebuffers work too..)

  const sketch = (p) => {

    p5asciify.instance(p);

    p.setup = () => {
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

    // p5asciify setup
    p.setupAsciify = () => {
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
    };

    p.draw = () => {
      
      pGraphic.clear(); // Draw hydra to pGraphic
      pGraphic.drawingContext.drawImage(hydraCanvas, 0, 0, p.width, p.height);
      
      p.clear(); // Draw pGraphic to the screen for `p5asciify` to process
      p.image(pGraphic, -p.width/2, -p.height/2);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      pGraphic.resizeCanvas(p.width, p.height);

      hydra.setResolution(p.width, p.height);
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