/**
 * @name Accurate-plugin-renderer-example
 * @description Basic example applying the 'accurate' plugin renderer to a p5.js canvas with p5.asciify.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 *
 * This example demonstrates how to apply the 'accurate' plugin renderer to a p5.js canvas.
 * An image (CC0 licensed) is displayed on the canvas and asciified using the 'accurate' renderer.
 *
 * Attribution:
 * - Brutalist high-rise building image by @AliImran on pexels.com:
 *  - https://www.pexels.com/photo/black-and-white-photo-of-a-brutalist-high-rise-building-17209382/
 */

// Global variables
let asciifier;
let img;

// Preload function - loads assets before setup
function preload() {
  img = loadImage("./brutalist-high-rise-building.jpeg");
}

// Setup function - initial canvas setup
function setup() {
  setAttributes("antialias", false);
  createCanvas(windowWidth, windowHeight, WEBGL);
  // Register the plugin renderer

  console.log("window: ", window);

  p5asciify.registerPlugin(window.AccurateRendererPlugin);
}

// Setup the p5.asciify features
function setupAsciify() {
  // Fetch the asciifier instance
  asciifier = p5asciify.asciifier();

  // Disable the brightness renderer
  asciifier.renderers().get("brightness").disable();

  // Add the accurate plugin renderer
  asciifier.renderers().add("accurate", "accurate");

  // Update the accurate renderer settings
  asciifier
    .renderers()
    .get("accurate")
    .update({
      characters: asciifier.fontManager.characters
        .map((charObj) => charObj.character)
        .join(""),
      characterColorMode: "sampled",
      backgroundColorMode: "sampled",
      enabled: true,
    });

  // Display the available renderer types in the console
  console.log(asciifier.renderers().getAvailableRendererTypes());
}

// Draw function - called on every frame
function draw() {
  clear();
  image(img, -windowWidth / 2, -windowHeight / 2);
}

// Draw ASCII display on top of the result
function drawAsciify() {
  const fpsText = "FPS:" + Math.min(Math.ceil(frameRate()), 60);

  noStroke();
  fill(0);
  rect(
    -width / 2,
    height / 2 - textAscent() - 4,
    textWidth(fpsText),
    textAscent()
  );

  textFont(asciifier.fontManager.font);
  textSize(64);
  fill(255, 255, 0);
  text(fpsText, -width / 2, height / 2);
}

// Window resize handler
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
