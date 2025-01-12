import p5 from 'p5';
import p5asciify from '../../../dist/p5.asciify.esm.js';
import '../sketch.css';

export const createSketch = (args = {}) => {
  const container = document.createElement('div');

  const sketch = (p) => {
    let sketchFramebuffer;

    p5asciify.instance(p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      sketchFramebuffer = p.createFramebuffer({ format: p.FLOAT });

      p.setAsciifyFontSize(args.fontSize);

      p.setAsciifyPostSetupFunction(() => {
        p5asciify.rendererManager.renderers[0].updateOptions({
          enabled: args.enabled,
          characters: args.characters,
          characterColor: args.characterColor,
          characterColorMode: args.characterColorMode,
          backgroundColor: args.backgroundColor,
          backgroundColorMode: args.backgroundColorMode,
          invertMode: args.invertMode
        });
      });
    };

    p.draw = () => {
      const startX = -p5asciify.grid.width / 2;
      const startY = -p5asciify.grid.height / 2;

      sketchFramebuffer.begin();
      p.background(0);

      // Draw brightness test grid
      for (let i = 0; i < args.characters.length; i++) {
        const gridCol = i % p5asciify.grid.cols;
        const gridRow = Math.floor(i / p5asciify.grid.cols);

        // Calculate quantized brightness value for each cell
        const brightness = i * (255 / args.characters.length) + (255 / (2 * args.characters.length));
        p.fill(brightness);
        p.stroke(255, 255, 0);
        p.rect(
          startX + gridCol * p5asciify.grid.cellWidth, 
          startY + gridRow * p5asciify.grid.cellHeight, 
          p5asciify.grid.cellWidth, 
          p5asciify.grid.cellHeight
        );
      }

      p.noFill();
      p.stroke(255, 0, 0);
      p.rect(startX, startY, p5asciify.grid.width, p5asciify.grid.height);
      sketchFramebuffer.end();

      p.clear();
      p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new p5(sketch, container);
  return container;
};