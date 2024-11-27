// The custom ascii renderer exposes the following framebuffers, whose instances will be assigned to those variables during setup.
let primaryColorSampleFramebuffer;
/* There is also a `secondaryColorSampleFramebuffer` for individual cell background colors, but it is not used in this sketch. */
let asciiCharacterFramebuffer;

let rectangleManager; // This class is used to create a number of non-overlapping rectangles that cover the entire grid.

let charset = ".:-=+*#%"; // Define the charset to be used in the ascii renderer

// p5.asciify creates a texture containing all characters in the whole font, assigning each character a unique color.
// We define an array of colors to represent each character in the charset.
// Accompanying the charset, we also create a 1D framebuffer to store the colors of each character.
let charsetColorPalette = [];
let charsetColorPaletteFramebuffer;

// We also define a color palette of equal length and order to the charset, so that each character can be assigned a unique color.
// Like the charset, we create a 1D framebuffer to store the colors of each character in the palette.
let colorPalette = ["#2b0f54", "#ab1f65", "#ff4f69", "#fff7f8", "#ff8142", "#ffda45", "#3368dc", "#49e7ec"];
let colorPaletteFramebuffer;

let noiseShader; // Generates noise, containing {charset.length} colors, that changes over time
let shiftShader; // Generates a texture based on the given rectangles, defining the direction each pixel should move
let intermediateShiftShader; // Generates a refined texture based on the shiftShader's output, attempting to reduce flickering
let pushShader; // Pushes it's own pixels based on the intermediateShiftShader's output. Initialized with noiseShader's output.

let asciiCharacterShader; // Translates the pushShader's pixels into our ascii character colors, so p5.asciify can render them as ascii characters
let colorShader; // Translates the pushShader's pixels into our color palette, so p5.asciify can render them as colors

let noiseFramebuffer; // Define framebuffers relevant to the sketch, independent of p5.asciify
let shiftFramebuffer;
let intermediateShiftFramebuffer;
let previousPushFramebuffer;
let nextPushFramebuffer;

let seed = "p5.asciify"; // Seed for random number generation

function preload() { // Load the shaders

	// Relevant to the sketch, independent of p5.asciify
	noiseShader = loadShader('shaders/shader.vert', 'shaders/noise.frag');
	shiftShader = loadShader('shaders/shader.vert', 'shaders/shift.frag');
	intermediateShiftShader = loadShader('shaders/shader.vert', 'shaders/intermediateShift.frag');
	pushShader = loadShader('shaders/shader.vert', 'shaders/push.frag');

	// Relevant to p5.asciify, translating the pushShader's pixels into ascii character colors and color palette colors
	asciiCharacterShader = loadShader('shaders/shader.vert', 'shaders/asciiCharacter.frag');
	colorShader = loadShader('shaders/shader.vert', 'shaders/color.frag');
}

function setup() {
	randomSeed(seed); // For deterministic random numbers
	noiseSeed(seed);

	createCanvas(windowWidth, windowHeight, WEBGL);

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
	secondaryColorSampleFramebuffer = p5asciify.customSecondaryColorSampleFramebuffer;
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
	intermediateShiftFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	previousPushFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	nextPushFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });

	// Initialize the rectangle manager, which will create a number of non-overlapping rectangles that cover the entire grid
	rectangleManager = new RectangleManager(p5asciify.grid.cols, p5asciify.grid.rows, 3, 0, 16);
	rectangleManager.initializeRectangles();

	runNoiseShader(0); // Run the noise shader to generate the initial noise texture with frame count 0
}

function draw() {

	asciiCharacterFramebuffer.begin();
	if (frameCount % (Math.max(p5asciify.grid.cols, p5asciify.grid.rows) * 2) === 0) {
		rectangleManager.initializeRectangles();
		runNoiseShader(frameCount);
	}

	shiftFramebuffer.begin();
	clear();
	shader(shiftShader);
	shiftShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
	shiftShader.setUniform('u_frameCount', frameCount);

	rectangleManager.rectangles.forEach((rect, index) => {
		shiftShader.setUniform(`u_rect${index}`, [rect.x, rect.y, rect.width, rect.height]);
	});

	rect(0, 0, width, height);
	shiftFramebuffer.end();

	intermediateShiftFramebuffer.begin();
	clear();
	shader(intermediateShiftShader);
	intermediateShiftShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
	intermediateShiftShader.setUniform('u_shiftMapTexture', shiftFramebuffer);
	intermediateShiftShader.setUniform('u_previousFrameTexture', previousPushFramebuffer);
	rect(0, 0, width, height);
	intermediateShiftFramebuffer.end();

	[previousPushFramebuffer, nextPushFramebuffer] = [nextPushFramebuffer, previousPushFramebuffer];
	nextPushFramebuffer.begin();
	clear();
	shader(pushShader);
	pushShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
	pushShader.setUniform('u_frameCount', frameCount);
	pushShader.setUniform('u_shiftMapTexture', intermediateShiftFramebuffer);
	pushShader.setUniform('u_noiseTexture', noiseFramebuffer);
	pushShader.setUniform('u_previousFrameTexture', previousPushFramebuffer);
	rect(0, 0, width, height);
	nextPushFramebuffer.end();

	clear();
	shader(asciiCharacterShader);
	asciiCharacterShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
	asciiCharacterShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
	asciiCharacterShader.setUniform('u_charPaletteTexture', charsetColorPaletteFramebuffer);
	asciiCharacterShader.setUniform('u_charPaletteSize', [charsetColorPaletteFramebuffer.width, charsetColorPaletteFramebuffer.height]);
	rect(0, 0, width, height);

	asciiCharacterFramebuffer.end();

	primaryColorSampleFramebuffer.begin();
	shader(colorShader);
	colorShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
	colorShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
	colorShader.setUniform('u_colorPaletteTexture', colorPaletteFramebuffer);
	colorShader.setUniform('u_paletteSize', colorPalette.length);
	rect(0, 0, width, height);
	primaryColorSampleFramebuffer.end();

	clear();
	image(asciiCharacterFramebuffer, -width / 2, -height / 2);
}

function runNoiseShader(frameCount) {
	noiseFramebuffer.begin();
	shader(noiseShader);
	noiseShader.setUniform('u_scale', 10.0);
	noiseShader.setUniform('u_bins', charset.length);
	noiseShader.setUniform('u_dimensions', [p5asciify.grid.cols, p5asciify.grid.rows]);
	noiseShader.setUniform('u_frameCount', frameCount);
	noiseShader.setUniform('u_greenChannelEnabled', true);
	noiseShader.setUniform('u_blueChannelEnabled', true);
	noiseShader.setUniform('u_blockSize', 2.0);
	rect(0, 0, width, height);
	noiseFramebuffer.end();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	noiseFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	shiftFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	intermediateShiftFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	previousPushFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
	nextPushFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);

	randomSeed(seed);
	noiseSeed(seed);

	rectangleManager.updateGridDimensions(p5asciify.grid.cols, p5asciify.grid.rows);
	rectangleManager.initializeRectangles();

	runNoiseShader(0);
}