/**
 * @author humanbydefinition <hello@humanbydefinition.dev>
 * @version 1.0.0
 * @date Nov 2024
 * 
 * This sketch demonstrates how to use p5.asciify with custom shaders 
 * and the `custom` rendering mode to create fine-grained ascii art animations.
 * 
 * Simplified version of 
 * - ASCIISHIFT8 (https://www.fxhash.xyz/generative/slug/asciishift8)
 * - ASCIILꚘPS (https://objkt.com/collections/KT1FYXgQ4BZZfE7stqkWcRzMHxYkAU7pN97r)
 */

let charset = "╧▓○⌐εæ▒╒╓¬└÷╨▀■≈"; // Define the charset to be used in the ascii renderer

// Define a color palette to be used in the ascii renderer
// If there is a mismatch between the charset length and the color palette length, the colors will be repeated or not used
let colorPalette = [ // PICO-8 Palette
	"#000000", "#1D2B53", "#7E2553", "#008751",
	"#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8",
	"#FF004D", "#FFA300", "#FFEC27", "#00E436",
	"#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"
];

let seed = "p5.asciify"; // Seed for random number generation

// The custom ascii renderer exposes the following framebuffers, whose instances will be assigned to those variables during setup.
let primaryColorSampleFramebuffer;
/* There is also a `secondaryColorSampleFramebuffer` for individual cell background colors, but it is not used in this sketch. */
let asciiCharacterFramebuffer;

let rectangleManager; // This class is used to create a number of non-overlapping rectangles that cover the entire grid.

// p5.asciify creates a texture containing all characters in the whole font, assigning each character a unique color.
// We define an array of colors to represent each character in the charset.
// Accompanying the charset, we also create a 1D framebuffer to store the colors of each character.
let charsetColorPalette = [];
let charsetColorPaletteFramebuffer;

// Like the charset, we create a 1D framebuffer to store the colors of each character in the palette.
let colorPaletteFramebuffer;

let noiseShader; // Generates noise, containing {charset.length} colors, that changes over time
let shiftShader; // Generates a texture based on the given rectangles, defining the direction each pixel should move
let pushShader; // Pushes it's own pixels based on the shiftShader's output. Initialized with noiseShader's output.

let asciiCharacterShader; // Translates the pushShader's pixels into our ascii character colors, so p5.asciify can render them as ascii characters
let asciiColorPaletteShader; // Translates the pushShader's pixels into our color palette, so p5.asciify can render them as colors

let noiseFramebuffer; // Define framebuffers relevant to the sketch, independent of p5.asciify
let shiftFramebuffer;
let previousPushFramebuffer;
let nextPushFramebuffer;

/**
 * The preload function for the sketch.
 * Loads the shaders used in the sketch.
 */
function preload() {
	// Relevant to the sketch, independent of p5.asciify
	noiseShader = loadShader('shaders/shader.vert', 'shaders/sketch/noise.frag');
	shiftShader = loadShader('shaders/shader.vert', 'shaders/sketch/shift.frag');
	pushShader = loadShader('shaders/shader.vert', 'shaders/sketch/push.frag');

	// Relevant to p5.asciify, translating the pushShader's pixels into ascii character colors and color palette colors
	asciiCharacterShader = loadShader('shaders/shader.vert', 'shaders/asciifyTranslation/asciiCharacter.frag');
	asciiColorPaletteShader = loadShader('shaders/shader.vert', 'shaders/asciifyTranslation/asciiColorPalette.frag');
}

/**
 * The setup function for the sketch.
 */
function setup() {
	randomSeed(seed); // For deterministic random numbers
	noiseSeed(seed);

	createCanvas(windowWidth, windowHeight, WEBGL);
	//pixelDensity(1);

	// Initialize and fill the framebuffers with the colors of the charset and color palette
	colorPaletteFramebuffer = createFramebuffer({ width: colorPalette.length, height: 1, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	charsetColorPaletteFramebuffer = createFramebuffer({ width: charset.length, height: 1, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });

	colorPaletteFramebuffer.loadPixels(); // Write the color palette to the framebuffer
	for (let i = 0; i < colorPalette.length; i++) {
		let c = color(colorPalette[i]);
		colorPaletteFramebuffer.pixels[i * 4] = red(c);
		colorPaletteFramebuffer.pixels[i * 4 + 1] = green(c);
		colorPaletteFramebuffer.pixels[i * 4 + 2] = blue(c);
		colorPaletteFramebuffer.pixels[i * 4 + 3] = alpha(c);
	}
	colorPaletteFramebuffer.updatePixels();

	setAsciiOptions({
		common: {
			fontSize: 16,
		},
		ascii: {
			renderMode: 'custom', // Use the custom renderer
			enabled: true,
			characterColor: "#ff0000",
			characterColorMode: 0,
			backgroundColor: "#000000",
			backgroundColorMode: 1,
			invertMode: false,
		},
	});

	// This function is called after the p5.asciify library has been initialized, but before the sketch starts running
	setAsciifyPostSetupFunction(setupAsciify);
}

/**
 * Post-initialization hook for p5.asciify setup.
 * After p5.asciify has been initialized, this function is called to set up stuff that depends on p5.asciify's state.
 */
function setupAsciify() {

	// Assign the custom ascii renderer's framebuffers to the variables
	primaryColorSampleFramebuffer = p5asciify.customPrimaryColorSampleFramebuffer;
	asciiCharacterFramebuffer = p5asciify.customAsciiCharacterFramebuffer;

	// Generate the charset color palette and apply it to the framebuffer
	charsetColorPalette = p5asciify.asciiCharacterSet.getCharsetColorArray(charset);
	charsetColorPaletteFramebuffer.loadPixels();
	for (let i = 0; i < charset.length; i++) {
		let c = charsetColorPalette[i];
		charsetColorPaletteFramebuffer.pixels[i * 4] = red(c);
		charsetColorPaletteFramebuffer.pixels[i * 4 + 1] = green(c);
		charsetColorPaletteFramebuffer.pixels[i * 4 + 2] = blue(c);
		charsetColorPaletteFramebuffer.pixels[i * 4 + 3] = alpha(c);
	}
	charsetColorPaletteFramebuffer.updatePixels();

	// Initialize the framebuffers relevant to the sketch, matching the grid dimensions provided by p5.asciify
	noiseFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	shiftFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	previousPushFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	nextPushFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });

	// Initialize the rectangle manager, which will create a number of non-overlapping rectangles that cover the entire grid
	// The `1` in the constructor defines the spacing between rectangles. 
	// `0` would mean no spacing, which creates more intricate patterns, but causes flickering under certain conditions.
	// I'll leave the solution to pixel flickering at spacing=0 up to you at, as it's a bit more complex than the scope of this example.
	// Hint: An intermediate shader refining the `next` shiftFramebuffer, also checking `previous` shiftFramebuffer and the push framebuffers, could help.
	rectangleManager = new RectangleManager(p5asciify.grid.cols, p5asciify.grid.rows, 3, 1, 16);
	rectangleManager.initializeRectangles();

	runNoiseShader(0); // Run the noise shader to generate the initial noise texture with frame count 0
}

/**
 * The main draw loop for the sketch.
 */
function draw() {

	// Every time frameCount reaches a multiple of the maximum grid dimension, reinitialize the rectangles and run the noise shader
	if (frameCount % (Math.max(p5asciify.grid.cols, p5asciify.grid.rows)) === 0) {
		rectangleManager.initializeRectangles();
		runNoiseShader(frameCount); // Run the noise shader with the current frame count
	}

	shiftFramebuffer.begin(); // Create the texture based on the given rectangles, defining the direction each pixel should move
	clear();
	shader(shiftShader);
	shiftShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
	shiftShader.setUniform('u_frameCount', frameCount);

	// 8 random rectangles have a position and size, the others are passed as [0, 0, 0, 0] to the shader
	// Each rectangle defines a pattern of movement for the pixels in the given area
	rectangleManager.rectangles.forEach((rect, index) => {
		shiftShader.setUniform(`u_rect${index}`, [rect.x, rect.y, rect.width, rect.height]);
	});

	rect(0, 0, width, height);
	shiftFramebuffer.end();

	// Swap the previous and next push framebuffers
	[previousPushFramebuffer, nextPushFramebuffer] = [nextPushFramebuffer, previousPushFramebuffer];

	nextPushFramebuffer.begin(); // Push the pixels based on the shiftFramebuffer's output
	clear();
	shader(pushShader);
	pushShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
	pushShader.setUniform('u_shiftMapTexture', shiftFramebuffer); // Shift map texture is used to determine the direction of the push
	pushShader.setUniform('u_noiseTexture', noiseFramebuffer); // Noise texture is used on the boundary
	pushShader.setUniform('u_previousFrameTexture', previousPushFramebuffer); // Previous frame texture is used on the rest
	rect(0, 0, width, height);
	nextPushFramebuffer.end();

	asciiCharacterFramebuffer.begin(); // Translate the pushShader's pixels into our ascii character colors for p5.asciify to render
	clear();
	shader(asciiCharacterShader);
	asciiCharacterShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
	asciiCharacterShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
	asciiCharacterShader.setUniform('u_charPaletteTexture', charsetColorPaletteFramebuffer);
	asciiCharacterShader.setUniform('u_charPaletteSize', [charsetColorPaletteFramebuffer.width, charsetColorPaletteFramebuffer.height]);
	rect(0, 0, width, height);

	asciiCharacterFramebuffer.end();

	primaryColorSampleFramebuffer.begin(); // Translate the pushShader's pixels into our color palette for p5.asciify to render
	shader(asciiColorPaletteShader);
	asciiColorPaletteShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
	asciiColorPaletteShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
	asciiColorPaletteShader.setUniform('u_colorPaletteTexture', colorPaletteFramebuffer);
	asciiColorPaletteShader.setUniform('u_paletteSize', [colorPalette.length, 1]);
	rect(0, 0, width, height);
	primaryColorSampleFramebuffer.end();

	/* Since we are using the custom renderer, we don't need to draw anything on the canvas. */

	// If we disable the ascii renderer and uncomment the following lines, 
	// you can display any of the framebuffers on the canvas for debugging purposes
	//clear();
	//image(primaryColorSampleFramebuffer, -width / 2, -height / 2, width, height); // Display the shift texture
}

/**
 * Runs the noise shader to generate a noise texture.
 * @param {Number} frameCount 
 */
function runNoiseShader(frameCount) {
	noiseFramebuffer.begin();
	shader(noiseShader);
	noiseShader.setUniform('u_bins', charset.length);
	noiseShader.setUniform('u_dimensions', [p5asciify.grid.cols, p5asciify.grid.rows]);
	noiseShader.setUniform('u_frameCount', frameCount);
	rect(0, 0, width, height);
	noiseFramebuffer.end();
}

/**
 * Function provided by p5.js to handle window resizing.
 * Also initializes the whole sketch to the initial state, resetting the random seeds to ensure deterministic behavior.
 */
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	// Resize our sketch-relevant framebuffers to match the grid dimensions provided by p5.asciify
	// The other framebuffers that reference p5.asciify's framebuffers will be resized automatically
	noiseFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	shiftFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	previousPushFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	nextPushFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);

	randomSeed(seed); // Reset the random seeds to ensure deterministic behavior, since the sketch is reset to the initial state
	noiseSeed(seed);

	// Update the rectangle manager with the new grid dimensions and reinitialize the rectangles
	rectangleManager.updateGridDimensions(p5asciify.grid.cols, p5asciify.grid.rows);
	rectangleManager.initializeRectangles();

	// Re-run the noise shader to generate the initial noise texture with frame count 0
	runNoiseShader(0);
}