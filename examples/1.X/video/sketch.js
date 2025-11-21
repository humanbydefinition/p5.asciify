let video;

let canvasWidth = 800;
let canvasHeight = 800;

let framebuffer;
let paletteShader;
let hexPalette = [
  "#ff8274",
  "#d53c6a",
  "#7c183c",
  "#460e2b",
  "#31051e",
  "#1f0510",
  "#130208",
];

let shaderPalette = hexPalette.map(hexToShaderRGB);

function hexToShaderRGB(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex to RGB (0-255)
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert to 0-1 range
  return [r / 255, g / 255, b / 255];
}

P5Capture.setDefaultOptions({
  format: "webm",
  framerate: 24,
  quality: 1.0,
});

function preload() {
  font = loadFont("./TES-GIGR.ttf");
  paletteShader = loadShader("./shader.vert", "./shader.frag");
}

function setup() {
  setAttributes("antialias", false);
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  pixelDensity(1);

  video = createVideo("./2025-10-31_12-29-29.mp4");
  video.size(canvasWidth, canvasHeight);
  video.volume(0);
  video.loop();
  video.hide();

  framebuffer = createFramebuffer();
}

// After `p5.asciify` is set up in the background after `setup()`,
// we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
function setupAsciify() {
  p5asciifier.fontSize(16);
  p5asciifier.font(font);

  p5asciifier.backgroundMode("fixed"); // or 'sampled'

  // Update the pre-defined `brightness` renderer with the provided options
  p5asciifier.renderer("brightness").update({
    enabled: false,
    characters: " .:-=+*#%@",
    characterColor: "#ffffff",
    characterColorMode: "sampled",
    backgroundColor: "#000000",
    backgroundColorMode: "fixed",
    invert: false,
    rotation: 0,
    flipHorizontally: false,
    flipVertically: false,
    brightnessRange: [0, 255],
  });

  // Update the pre-defined `edge` renderer with the provided options
  p5asciifier.renderer("edge").update({
    enabled: false,
    characters: "-/|\\-/|\\",
    characterColor: "#ffffff",
    characterColorMode: "sampled",
    backgroundColor: "#000000",
    backgroundColorMode: "fixed",
    invert: false,
    sobelThreshold: 0.5,
    sampleThreshold: 16,
    rotation: 0,
    flipHorizontally: false,
    flipVertically: false,
  });
}

// Draw anything on the canvas to be asciified
function draw() {
  clear();

  // Render video to framebuffer
  framebuffer.begin();
  clear();
  image(video, -video.width / 2, -video.height / 2, video.width, video.height);
  framebuffer.end();

  // Apply palette quantization shader
  shader(paletteShader);
  paletteShader.setUniform("u_framebuffer", framebuffer.color);
  paletteShader.setUniform("u_palette", shaderPalette.flat());
  paletteShader.setUniform("u_paletteSize", shaderPalette.length);
  
  // Draw full-screen quad with shader applied
  rect(-width / 2, -height / 2, width, height);
}

// Capture video when spacebar is pressed
function keyPressed() {
  if (key === " ") {
    const capture = P5Capture.getInstance();
    if (capture.state === "idle") {
      // Reset the video to the beginning when spacebar is pressed
      video.time(0);

      capture.start({
        format: "webm",
        framerate: 60,
        quality: 1.0,
        duration: 300, // frames
      });
    }
  }
}