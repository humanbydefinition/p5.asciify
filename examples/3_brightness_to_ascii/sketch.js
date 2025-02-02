import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

// You can adjust these default options as needed
export const DEFAULT_OPTIONS = {
  enabled: true,
  characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  characterColor: '#ffffff',
  characterColorMode: "fixed",
  backgroundColor: '#000000',
  backgroundColorMode: "fixed",
  invertMode: false,
  fontSize: 32
};

export const createSketch = (options = {}) => {
  // Merge user options with our defaults
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };

  // p5 instance variable
  let p5Instance = null;

  // Define the p5 sketch
  const sketch = (p) => {

    // Initialize p5asciify with this p5 instance
    p5asciify.instance(p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    p.setupAsciify = () => {
      // Set the ASCII font size
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
        invertMode: finalOptions.invertMode
      });
    };

    p.draw = () => {
      // We’ll use the p5Asciify computed grid to lay out brightness squares.
      const startX = -p5asciify.grid.width / 2;
      const startY = -p5asciify.grid.height / 2;

      p.background(0);

      // Fill each cell with a gradient of brightness values
      for (let i = 0; i < finalOptions.characters.length; i++) {
        const gridCol = i % p5asciify.grid.cols;
        const gridRow = Math.floor(i / p5asciify.grid.cols);

        // Calculate a brightness value for each cell
        const brightness = i * (255 / finalOptions.characters.length)
          + (255 / (2 * finalOptions.characters.length));
        p.fill(brightness);
        p.stroke(255, 255, 0);
        p.rect(
          startX + gridCol * p5asciify.grid.cellWidth,
          startY + gridRow * p5asciify.grid.cellHeight,
          p5asciify.grid.cellWidth,
          p5asciify.grid.cellHeight
        );
      }

      // Draw a red rectangle outlining the entire ASCII grid area
      p.noFill();
      p.stroke(255, 0, 0);
      p.rect(startX, startY, p5asciify.grid.width, p5asciify.grid.height);
    };

    // If the window is resized, also resize the p5 canvas
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
