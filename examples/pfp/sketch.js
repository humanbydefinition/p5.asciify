import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';
import C64ProMonoFont from './C64_Pro_Mono-STYLE.ttf';

export const createSketch = (options = {}) => {
  let p5Instance = null;

  const sketch = (p) => {
    let asciifier;
    let font;
    let jsonData;
    let jsonLoaded = false;

    // Create empty framebuffers to hold the data from JSON
    let characterBuffer;
    let primaryColorBuffer;
    let secondaryColorBuffer;
    let inversionBuffer;
    let rotationBuffer;
    let flipBuffer;

    // References to the p5.asciify framebuffers
    let characterFramebuffer;
    let primaryColorFramebuffer;
    let secondaryColorFramebuffer;
    let inversionFramebuffer;
    let rotationFramebuffer;
    let flipFramebuffer;

    let fontSize = 256; // Default font size

    p.preload = () => {
      // Load the font and JSON data
      font = p.loadFont(C64ProMonoFont);

      // Load the JSON file
      p.loadJSON('pfp_new.json', (data) => {
        jsonData = data;
        jsonLoaded = true;
      });
    }

    p.setup = () => {
      p.setAttributes('antialias', false);
      p.createCanvas(17 * fontSize, 16 * fontSize, p.WEBGL);

      console.log("Canvas dimensions: ", p.width, p.height);
    };

    // Setup our intermediary buffers that will hold data from the JSON
    const setupBuffers = () => {
      if (!jsonData || !jsonData.metadata || !jsonData.cells) {
        console.error("Invalid JSON data format");
        return;
      }

      const { cols, rows } = jsonData.metadata.gridSize;

      // Create our own framebuffers to match the grid size
      characterBuffer = p.createFramebuffer({ width: cols, height: rows });
      primaryColorBuffer = p.createFramebuffer({ width: cols, height: rows });
      secondaryColorBuffer = p.createFramebuffer({ width: cols, height: rows });
      inversionBuffer = p.createFramebuffer({ width: cols, height: rows });
      rotationBuffer = p.createFramebuffer({ width: cols, height: rows });
      flipBuffer = p.createFramebuffer({ width: cols, height: rows });

      // Populate the buffers with data from JSON
      populateBuffersFromJSON();
    };

    // Populate the buffers with data from the JSON file
    const populateBuffersFromJSON = () => {

      // Set pixel mode for direct pixel manipulation
      characterBuffer.loadPixels();
      primaryColorBuffer.loadPixels();
      secondaryColorBuffer.loadPixels();
      inversionBuffer.loadPixels();
      rotationBuffer.loadPixels();
      flipBuffer.loadPixels();

      // Process each cell from JSON data
      jsonData.cells.forEach(cell => {
        const { x, y, character, color, backgroundColor, rotation, inverted, flipHorizontal, flipVertical } = cell;

        // Calculate the pixel index
        const idx = (y * characterBuffer.width + x) * 4;

        const charRgbColor = asciifier.fontManager.glyphColor(character)
        characterBuffer.pixels[idx] = charRgbColor[0];
        characterBuffer.pixels[idx + 1] = charRgbColor[1];
        characterBuffer.pixels[idx + 2] = charRgbColor[2]; 
        characterBuffer.pixels[idx + 3] = 255; // Full alpha

        // Set primary color (foreground)
        setColorFromHex(primaryColorBuffer.pixels, idx, color);

        // Set secondary color (background)
        setColorFromHex(secondaryColorBuffer.pixels, idx, backgroundColor);

        // Set inversion - white (255) means inverted, black (0) means normal
        inversionBuffer.pixels[idx] = inverted ? 255 : 0;
        inversionBuffer.pixels[idx + 1] = inverted ? 255 : 0;
        inversionBuffer.pixels[idx + 2] = inverted ? 255 : 0;
        inversionBuffer.pixels[idx + 3] = 255;

        // Set rotation - split into red and green channels
        const rotationValue = Math.max(0, Math.min(360, rotation));
        rotationBuffer.pixels[idx] = Math.min(255, rotationValue); // Red channel (up to 255)
        rotationBuffer.pixels[idx + 1] = rotationValue > 255 ? Math.min(105, rotationValue - 255) : 0; // Green channel for values > 255
        rotationBuffer.pixels[idx + 2] = 0;
        rotationBuffer.pixels[idx + 3] = 255;

        // Set flip - horizontal and vertical
        flipBuffer.pixels[idx] = flipHorizontal ? 255 : 0; // Red channel for horizontal flip
        flipBuffer.pixels[idx + 1] = flipVertical ? 255 : 0; // Green channel for vertical flip
        flipBuffer.pixels[idx + 2] = 0; // Blue channel (not used)
        flipBuffer.pixels[idx + 3] = 255; // Full alpha
      });

      // Update all buffers
      characterBuffer.updatePixels();
      primaryColorBuffer.updatePixels();
      secondaryColorBuffer.updatePixels();
      inversionBuffer.updatePixels();
      rotationBuffer.updatePixels();
      flipBuffer.updatePixels();
    };

    // Helper function to convert hex color to RGBA values in buffer
    const setColorFromHex = (pixels, idx, hexColor) => {
      // Remove # if present
      const hex = hexColor.replace('#', '');

      // Parse the color components
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const a = hex.length >= 8 ? parseInt(hex.substring(6, 8), 16) : 255;

      // Set the color values
      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = a;
    };

    p.setupAsciify = () => {
      // Fetch the default `P5Asciifier` instance provided by the library
      asciifier = p5asciify.asciifier();

      asciifier.font(font);
      asciifier.fontSize(fontSize);
      asciifier.gridDimensions(13, 15);

      asciifier.background("#ff0000")

      asciifier.renderers().disable();
      asciifier.renderers().get("custom2D").enable();

      // Get references to the p5.asciify framebuffers
      characterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;
      primaryColorFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
      secondaryColorFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
      inversionFramebuffer = asciifier.renderers().get("custom2D").inversionFramebuffer;
      rotationFramebuffer = asciifier.renderers().get("custom2D").rotationFramebuffer;
      flipFramebuffer = asciifier.renderers().get("custom2D").flipFramebuffer;
    };

    p.draw = () => {
      // If data isn't loaded yet, try loading again
      if (!jsonLoaded) {
        return;
      }

      // If buffers aren't created yet, try setting them up
      if (!characterBuffer) {
        setupBuffers();
        return;
      }

      // Draw our buffer data to the p5.asciify framebuffers

      characterFramebuffer.begin();
      p.clear();
      p.image(characterBuffer, -characterFramebuffer.width / 2, -characterFramebuffer.height / 2);
      characterFramebuffer.end();

      primaryColorFramebuffer.begin();
      p.clear();
      p.image(primaryColorBuffer, -primaryColorFramebuffer.width / 2, -primaryColorFramebuffer.height / 2);
      primaryColorFramebuffer.end();

      secondaryColorFramebuffer.begin();
      p.clear();
      p.image(secondaryColorBuffer, -secondaryColorFramebuffer.width / 2, -secondaryColorFramebuffer.height / 2);
      secondaryColorFramebuffer.end();

      inversionFramebuffer.begin();
      p.clear();
      p.image(inversionBuffer, -inversionFramebuffer.width / 2, -inversionFramebuffer.height / 2);
      inversionFramebuffer.end();

      rotationFramebuffer.begin();
      p.clear();
      p.image(rotationBuffer, -rotationFramebuffer.width / 2, -rotationFramebuffer.height / 2);
      rotationFramebuffer.end();

      flipFramebuffer.begin();
      p.clear();
      p.image(flipBuffer, -flipFramebuffer.width / 2, -flipFramebuffer.height / 2);
      flipFramebuffer.end();
    };

    // After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
    p.drawAsciify = () => {
      p.background(255);
      p.image(asciifier.texture, -asciifier.texture.width / 2 + (fontSize / 2), -(asciifier.texture.height / 2) + (fontSize / 2));
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  // For standalone example usage
  p5Instance = new p5(sketch);
};