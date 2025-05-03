
let asciifier;
let customRenderer;

let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;
let rotationFramebuffer;
let transformFramebuffer;

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
  rotationFramebuffer = customRenderer.rotationFramebuffer;
  transformFramebuffer = customRenderer.transformFramebuffer;
}

function draw() {
  characterFramebuffer.begin();
  background(44, 0, 0);
  characterFramebuffer.end();

  primaryColorFramebuffer.begin();
  background(255);
  primaryColorFramebuffer.end();

  secondaryColorFramebuffer.begin();
  background(0);
  secondaryColorFramebuffer.end();

  rotationFramebuffer.begin();
  background("rgb(25%, 0%, 0%)");
  rotationFramebuffer.end();

  transformFramebuffer.begin();
  // Set the entire background to black first
  background(0);

  // Draw a white rectangle on the right half of the canvas
  fill(255);    // Set fill to white
  noStroke();   // No outline for the rectangle
  translate(transformFramebuffer.width / 4, 0, 0); // Move to the right quarter of the canvas
  plane(transformFramebuffer.width / 2, transformFramebuffer.height);   // Create a plane that covers the right half
  transformFramebuffer.end();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}