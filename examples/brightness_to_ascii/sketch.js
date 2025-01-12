import p5 from 'p5';
import p5asciify from '../../src/lib/index';

// You can adjust these default options as needed
export const DEFAULT_OPTIONS = {
  enabled: true,
  characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  characterColor: '#ffffff',
  characterColorMode: 1,
  backgroundColor: '#000000',
  backgroundColorMode: 1,
  invertMode: false,
  fontSize: 32
};

/**
 * createSketch(options = {})
 * 
 * Creates a brightness-to-ASCII p5 sketch. 
 * 
 * - If `options.container` is provided, the sketch will render inside that container (useful for Storybook).
 * - Otherwise, it creates its own container and returns it (useful for standalone usage).
 */
export const createSketch = (options = {}) => {
  // Merge user options with our defaults
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  
  // p5 instance variable
  let p5Instance = null;

  // Define the p5 sketch
  const sketch = (p) => {
    let sketchFramebuffer;

    // Initialize p5asciify with this p5 instance
    p5asciify.instance(p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

      // Create a framebuffer to draw your brightness test
      sketchFramebuffer = p.createFramebuffer({ format: p.FLOAT });

      // Set the ASCII font size
      if (finalOptions.fontSize) {
        p.setAsciifyFontSize(finalOptions.fontSize);
      }

      // Configure the ASCII renderer after p5Asciify is set up
      p.setAsciifyPostSetupFunction(() => {
        p5asciify.rendererManager.renderers[0].updateOptions({
          enabled: finalOptions.enabled,
          characters: finalOptions.characters,
          characterColor: finalOptions.characterColor,
          characterColorMode: finalOptions.characterColorMode,
          backgroundColor: finalOptions.backgroundColor,
          backgroundColorMode: finalOptions.backgroundColorMode,
          invertMode: finalOptions.invertMode
        });
      });
    };

    p.draw = () => {
      // We’ll use the p5Asciify computed grid to lay out brightness squares.
      const startX = -p5asciify.grid.width / 2;
      const startY = -p5asciify.grid.height / 2;

      // Draw your scene into the framebuffer
      sketchFramebuffer.begin();
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

      // End drawing to framebuffer
      sketchFramebuffer.end();

      // Clear the main canvas, then render the framebuffer to it
      p.clear();
      p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);
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
