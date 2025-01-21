import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

export const DEFAULT_OPTIONS = {
  enabled: true,
  characters: " .:-=+*#%@",
  characterColor: "#ffffff",
  characterColorMode: 'fixed',
  backgroundColor: "#000000",
  backgroundColorMode: 'fixed',
  invertMode: true,
  fontSize: 16,
  rotationAngle: 0
};

export const createSketch = (options = {}) => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  let p5Instance = null;

  const sketch = (p) => {
    p5asciify.instance(p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

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
      p.clear();
      p.background(0);
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateZ(p.radians(p.frameCount));
      p.directionalLight(255, 255, 255, 0, 0, -1);
      p.box(800, 100, 100);

      if (p.frameCount === 100) {
        p5asciify.renderers().get("brightness").characters("test");
        //p5asciify.renderers().get("brightness").rotation(180);
      }

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