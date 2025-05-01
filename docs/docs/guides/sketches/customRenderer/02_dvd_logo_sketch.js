let asciifier;
let customRenderer;

let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;
let inversionFramebuffer;

let textFramebuffer;
let textColorFramebuffer;
let invertTextFramebuffer;

let glyphColors;

// Variables for the bouncing logo
let logoX;
let logoY;
let logoSpeedX;
let logoSpeedY;
let logoWidth;
let logoHeight;

// Color change variables
let currentLogoColor;
let logoColors = [
  [255, 0, 0],    // Red
  [0, 255, 0],    // Green
  [0, 0, 255],    // Blue
  [255, 255, 0],  // Yellow
  [255, 0, 255],  // Magenta
  [0, 255, 255],  // Cyan
  [255, 165, 0]   // Orange
];

// Variables for the inversion effect
let invertLogoColor = false;

function setup() {
  setAttributes('antialias', false);
  createCanvas(windowWidth, windowHeight, WEBGL);

  currentLogoColor = random(logoColors);
  invertLogoColor = random() > 0.5; // Randomly set inversion effect
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
  inversionFramebuffer = customRenderer.inversionFramebuffer;

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

  invertTextFramebuffer = createFramebuffer({
    width: glyphColors.length,
    height: 1,
    textureFiltering: NEAREST,
    depthFormat: UNSIGNED_INT,
  });

  // Draw glyph colors to the textFramebuffer once
  drawGlyphColorsToFramebuffer();
  updatePropertyFramebuffers();

  // Initialize DVD logo variables
  logoWidth = glyphColors.length;
  logoHeight = 1;

  // Set initial position to center
  logoX = 0;
  logoY = 0;

  logoSpeedX = 0.2;
  logoSpeedY = 0.2;
}

function updatePropertyFramebuffers() {
  textColorFramebuffer.begin();
  background(currentLogoColor[0], currentLogoColor[1], currentLogoColor[2]); // Set background to current logo color
  textColorFramebuffer.end();

  invertTextFramebuffer.begin();
  background(invertLogoColor ? 255 : 0);
  invertTextFramebuffer.end();
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

function draw() {
  // Update logo position
  logoX += logoSpeedX;
  logoY += logoSpeedY;

  // Calculate bounds to check for collisions
  const canvasBoundsX = characterFramebuffer.width / 2 - logoWidth / 2;
  const canvasBoundsY = characterFramebuffer.height / 2 - logoHeight / 2;

  // Check for collisions with edges and bounce
  let collision = false;

  if (logoX > canvasBoundsX || logoX < -canvasBoundsX) {
    logoSpeedX *= -1;
    collision = true;
    // Keep logo within bounds
    logoX = constrain(logoX, -canvasBoundsX, canvasBoundsX);
  }

  if (logoY > canvasBoundsY || logoY < -canvasBoundsY) {
    logoSpeedY *= -1;
    collision = true;
    // Keep logo within bounds
    logoY = constrain(logoY, -canvasBoundsY, canvasBoundsY);
  }

  // Change color on collision
  if (collision) {
    let newColor;
    do {
      newColor = random(logoColors);
    } while (
      newColor[0] === currentLogoColor[0] &&
      newColor[1] === currentLogoColor[1] &&
      newColor[2] === currentLogoColor[2]
    );
    currentLogoColor = newColor;

    invertLogoColor = !invertLogoColor; // Toggle inversion effect

    updatePropertyFramebuffers();
  }

  // Draw character framebuffer
  characterFramebuffer.begin();
  background(7, 0, 0);

  // Draw the logo at current position
  image(textFramebuffer, logoX - logoWidth / 2, logoY - logoHeight / 2);
  characterFramebuffer.end();

  // Set primary color to current logo color
  primaryColorFramebuffer.begin();
  background(32);

  // Draw the logo with the current color
  image(textColorFramebuffer, logoX - logoWidth / 2, logoY - logoHeight / 2);
  primaryColorFramebuffer.end();

  secondaryColorFramebuffer.begin();
  background(0);
  secondaryColorFramebuffer.end();

  inversionFramebuffer.begin();
  background(0);

  image(invertTextFramebuffer, logoX - logoWidth / 2, logoY - logoHeight / 2);
  inversionFramebuffer.end();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}