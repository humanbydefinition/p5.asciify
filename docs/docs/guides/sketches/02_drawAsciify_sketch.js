let asciifier;
let brightnessRenderer;
let edgeRenderer;

function setup() {
  setAttributes('antialias', false);
  createCanvas(windowWidth, windowHeight, WEBGL);
}

// Called automatically after p5.js `setup()`
// to set up the rendering pipeline(s)
function setupAsciify() {
  // Fetch relevant objects from the library
  asciifier = p5asciify.asciifier();
  brightnessRenderer = asciifier
    .renderers() // get the renderer manager
    .get("brightness"); // get the "brightness" renderer

  edgeRenderer = asciifier
    .renderers() // get the renderer manager
    .get("edge"); // get the "edge" renderer

  // Update the font size of the rendering pipeline
  asciifier.fontSize(16);

  // Update properties of the brightness renderer
  brightnessRenderer.update({
    enabled: true, // redundant, but for clarity
    characters: " .:-=+*%@#",
    characterColor: "#ffffff",
    characterColorMode: "sampled", // or "fixed"
    backgroundColor: "#000000",
    backgroundColorMode: "fixed", // or "sampled"
    invert: true, // swap char and bg colors
    rotation: 0, // rotation angle in degrees
    flipVertically: false, // flip chars vertically
    flipHorizontally: false, // flip chars horizontally
  });

  // Update properties of the edge renderer
  edgeRenderer.update({
    enabled: true, // redundant, but for clarity
    characters: "-/|\\-/|\\", // should be 8 characters long
    characterColor: "#ffffff",
    characterColorMode: "fixed", // or "sampled"
    backgroundColor: "#000000",
    backgroundColorMode: "fixed", // or "sampled"
    invert: false, // swap char and bg colors
    rotation: 0, // rotation angle in degrees
    flipVertically: false, // flip chars vertically
    flipHorizontally: false, // flip chars horizontally
    sampleThreshhold: 16, // sample threshold for edge detection
    sobelThreshold: 0.5, // sobel threshold for edge detection
  });
}

function draw() {
  background(32);
  fill(255);
  rotateX(radians(frameCount * 3));
  rotateZ(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(400, 100, 100);
}

// called automatically after p5.js `draw()`
function drawAsciify() {
  filter(INVERT); // invert the colors of the canvas
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}