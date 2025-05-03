let asciifier;
let brightnessRenderer;
let edgeRenderer;

let brightnessInvertModeState = false;

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
    invertMode: brightnessInvertModeState, // swap char and bg colors
    rotationAngle: 0, // rotation angle in degrees
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
    invertMode: false, // swap char and bg colors
    rotationAngle: 0, // rotation angle in degrees
    flipVertically: false, // flip chars vertically
    flipHorizontally: false, // flip chars horizontally
    sampleThreshhold: 16, // sample threshold for edge detection
    sobelThreshold: 0.5, // sobel threshold for edge detection
  });
}

function draw() {
  // Cycle background color between 0 and 255 using sin
  let bgColor = map(sin(frameCount * 0.05), -1, 1, 0, 255);
  background(bgColor);
  
  fill(255);
  rotateX(radians(frameCount * 3));
  rotateZ(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(400, 100, 100);

  if(frameCount % 60 === 0) {
    // toggle invert mode every 60 frames
    brightnessInvertModeState = !brightnessInvertModeState;
    brightnessRenderer.invert(brightnessInvertModeState); 
  }
}

// called automatically after p5.js `draw()`
function drawAsciify() {
  filter(INVERT); // invert the colors of the canvas
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}