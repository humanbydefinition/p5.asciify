/**
 * @name p5.asciify | Playground
 * @description Playground sketch to experiment with p5.asciify
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 */

let asciifier;
let brightnessRenderer;
let edgeRenderer;

function setup() {
  setAttributes("antialias", false);
  createCanvas(windowWidth, windowHeight, WEBGL);
}

// Set up stuff relevant to p5.asciify here
// This function is called automatically after `setup()`
function setupAsciify() {
  // Fetch the default `P5Asciifier` instance

  console.log("Setting up p5.asciify...");

  asciifier = p5asciify.asciifier();

  // Fetch the pre-defined "brightness" and "edge" renderers
  brightnessRenderer = asciifier.renderers().get("brightness");
  edgeRenderer = asciifier.renderers().get("edge");

  // Update the font size
  asciifier.fontSize(16);

  // Update the pre-defined `brightness` renderer
  brightnessRenderer.update({
    enabled: true,
    characters: " .:-=+*%@#",
    characterColor: "#ffffff",
    characterColorMode: "sampled", // or "fixed"
    backgroundColor: "#000000",
    backgroundColorMode: "fixed", // or "sampled"
    invertMode: true, // swap char and bg colors
    rotationAngle: 0, // rotation angle in degrees
    flipVertically: false,
    flipHorizontally: false,
  });

  edgeRenderer.update({
    enabled: false,
    characters: "-/|\\-/|\\", // should be 8 characters long
    characterColor: "#ffffff",
    characterColorMode: "fixed", // or "sampled"
    backgroundColor: "#000000",
    backgroundColorMode: "fixed", // or "sampled"
    invertMode: false, // swap char and bg colors
    rotationAngle: 0, // rotation angle in degrees
    flipVertically: false,
    flipHorizontally: false,
    sampleThreshhold: 16, // sample threshold for edge detection
    sobelThreshold: 0.5, // sobel threshold for edge detection
  });
}

// Draw anything on the canvas to be asciified
function draw() {
  clear();
  fill(255);
  rotateX(radians(frameCount * 3));
  rotateZ(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(800, 100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
