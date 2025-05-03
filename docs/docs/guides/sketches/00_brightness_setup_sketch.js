let asciifier;
let brightnessRenderer;

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
    invertMode: true, // swap char and bg colors
    rotationAngle: 0, // rotation angle in degrees
    flipVertically: false, // flip chars vertically
    flipHorizontally: false, // flip chars horizontally
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}