import p5 from 'p5';
import p5asciify from '../../lib/index';
import '../sketch.css';

export const createSketch = (args = {}) => {
  const container = document.createElement('div');

  const sketch = (p) => {
    let sketchFramebuffer;

    p5asciify.instance(p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      sketchFramebuffer = p.createFramebuffer({ format: p.FLOAT });

      p.setAsciifyPostSetupFunction(() => {
        p5asciify.rendererManager.renderers[0].updateOptions({
          enabled: args.enabled,
          characters: args.characters,
          characterColor: args.characterColor,
          characterColorMode: args.characterColorMode,
          backgroundColor: args.backgroundColor,
          backgroundColorMode: args.backgroundColorMode,
          invertMode: args.invertMode,
          rotationAngle: args.rotationAngle
        });
      });

      p.setAsciifyFontSize(args.fontSize);
    };

    p.draw = () => {
      sketchFramebuffer.begin();
      p.clear();
      p.background(0);
      p.fill(255);
      p.rotateX(p.radians(p.frameCount * 3));
      p.rotateZ(p.radians(p.frameCount));
      p.directionalLight(255, 255, 255, 0, 0, -1);
      p.box(800, 100, 100);
      sketchFramebuffer.end();

      p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new p5(sketch, container);
  return container;
};