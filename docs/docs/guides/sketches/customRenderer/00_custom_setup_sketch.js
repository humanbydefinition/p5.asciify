let asciifier;
let customRenderer;

let characterFramebuffer;
let primaryColorFramebuffer;
let secondaryColorFramebuffer;
let rotationFramebuffer;
let inversionFramebuffer;
let flipFramebuffer;

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
  inversionFramebuffer = customRenderer.inversionFramebuffer;
  flipFramebuffer = customRenderer.flipFramebuffer;
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
  background(90, 0, 0);
  rotationFramebuffer.end();

  inversionFramebuffer.begin();
  // Set the entire background to black first
  background(0);

  // Draw a white rectangle on the right half of the canvas
  fill(255);    // Set fill to white
  noStroke();   // No outline for the rectangle
  translate(inversionFramebuffer.width / 4, 0, 0); // Move to the right quarter of the canvas
  plane(inversionFramebuffer.width / 2, inversionFramebuffer.height);   // Create a plane that covers the right half
  inversionFramebuffer.end();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}