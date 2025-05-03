let asciifier;
let customRenderer;

let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;

let textFramebuffer;
let textColorFramebuffer;

let glyphColors;

function setup() {
  setAttributes('antialias', false);
  createCanvas(windowWidth, windowHeight, WEBGL);
}

// Called automatically after p5.js `setup()`
// to set up the rendering pipeline(s)
function setupAsciify() {
  // Fetch relevant objects from the library
  asciifier = p5asciify.asciifier();
  customRenderer = asciifier
    .renderers() // get the renderer manager
    .get("custom2D"); // get the "custom" renderer

  asciifier
    .renderers() // get the renderer manager
    .get("brightness") // get the brightness renderer
    .disable(); // disable the renderer

  customRenderer.enable(); // enable the custom renderer

  characterFramebuffer = customRenderer.characterFramebuffer;
  primaryColorFramebuffer = customRenderer.primaryColorFramebuffer;
  secondaryColorFramebuffer = customRenderer.secondaryColorFramebuffer;

  // Fetch the glyph colors from the font manager,
  // returning an array of RGB values
  glyphColors = asciifier.fontManager.glyphColors("p5.asciify");

  textFramebuffer = createFramebuffer({
    width: glyphColors.length,
    height: 1,
    textureFiltering: NEAREST,
    depthFormat: UNSIGNED_INT,
  });

  textColorFramebuffer = createFramebuffer({
    width: glyphColors.length,
    height: 1,
    textureFiltering: NEAREST,
    depthFormat: UNSIGNED_INT,
  });

  // Draw glyph colors to the textFramebuffer once
  drawGlyphColorsToFramebuffer();
  updateTextColorFramebuffer();
}


function drawGlyphColorsToFramebuffer() {
  textFramebuffer.begin();
  background(0, 0, 0, 0); // Clear with transparent background

  // Draw each color as a 1x1 rectangle in a single row
  noStroke();
  for (let i = 0; i < glyphColors.length; i++) {
    const colorValues = glyphColors[i];
    fill(colorValues[0], colorValues[1], colorValues[2]);
    rect(-textFramebuffer.width / 2 + i, 0, 1, 1);
  }

  textFramebuffer.end();
}

function updateTextColorFramebuffer() {
  textColorFramebuffer.begin();
  background(255); // White text color
  textColorFramebuffer.end();
}

function draw() {
  
  // Draw character framebuffer - what characters to show
  characterFramebuffer.begin();
  background(7, 0, 0);
  
  // Calculate position to center the text horizontally
  const textPosX = -asciifier.grid.cols / 2 + Math.floor((asciifier.grid.cols - glyphColors.length) / 2);
  
  // Position vertically in the middle of the grid
  const textPosY = Math.floor(-asciifier.grid.rows / 2 + asciifier.grid.rows / 2);
  
  // Draw the text at the centered position
  image(textFramebuffer, textPosX, textPosY);
  characterFramebuffer.end();

  // Draw primary color framebuffer - what color the characters should be
  primaryColorFramebuffer.begin();
  background(32); // Dark gray background
  
  // Draw the text color at the same centered position
  image(textColorFramebuffer, textPosX, textPosY);
  primaryColorFramebuffer.end();

  // Draw secondary color framebuffer - color behind characters
  secondaryColorFramebuffer.begin();
  background(0); // Black background
  secondaryColorFramebuffer.end();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}