
let primaryColorSampleFramebuffer;
let secondaryColorSampleFramebuffer;
let asciiCharacterFramebuffer;

let randomManager;
let rectangleManager;

let charset = ".:-=+*#%";

let charsetColorPalette = [];

let colorPaletteManager;

let colorPalette = ["#2b0f54", "#ab1f65", "#ff4f69", "#fff7f8", "#ff8142", "#ffda45", "#3368dc", "#49e7ec"];
let colorPaletteFramebuffer;

let noiseShader;
let shiftShader;
let intermediateShiftShader;
let pushShader;
let gradientShader;

let colorShader;

let noiseFramebuffer;
let shiftFramebuffer;
let intermediateShiftFramebuffer;
let previousPushFramebuffer;
let nextPushFramebuffer;

function preload() {
	// Load the shaders
	noiseShader = loadShader('shaders/shader.vert', 'shaders/noise.frag');
	shiftShader = loadShader('shaders/shader.vert', 'shaders/shift.frag');
	intermediateShiftShader = loadShader('shaders/shader.vert', 'shaders/intermediateShift.frag');
	pushShader = loadShader('shaders/shader.vert', 'shaders/push.frag');
	gradientShader = loadShader('shaders/shader.vert', 'shaders/gradient.frag');
	colorShader = loadShader('shaders/shader.vert', 'shaders/color.frag');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently

	sketchFramebuffer = createFramebuffer({ depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });

	randomManager = new RandomManager("hash");

	colorPaletteFramebuffer = createFramebuffer({ width: colorPalette.length, height: 1, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });

	colorPaletteFramebuffer.loadPixels();
	for (let i = 0; i < colorPalette.length; i++) {
		let c = color(colorPalette[i]);
		colorPaletteFramebuffer.pixels[i * 4] = red(c);
		colorPaletteFramebuffer.pixels[i * 4 + 1] = green(c);
		colorPaletteFramebuffer.pixels[i * 4 + 2] = blue(c);
		colorPaletteFramebuffer.pixels[i * 4 + 3] = alpha(c);
	}
	colorPaletteFramebuffer.updatePixels();

	for (let i = 0; i < charset.length; i++) {
		// Split index into lower and upper bytes
		let lowerByte = i % 256;
		let upperByte = Math.floor(i / 256);

		// Normalize to 0-1 range
		let encodedR = lowerByte / 255;
		let encodedG = upperByte / 255;

		// Create color with R,G channels (B=0)
		charsetColorPalette.push(color(encodedR * 255, encodedG * 255, 0));
	}

	setAsciiOptions({
		// These are the default options, you can change them as needed in preload(), setup() or draw()
		common: {
			fontSize: 16,
		},
		ascii: {
			renderMode: 'custom',
			enabled: true,
			characters: charset,
			characterColor: "#ff0000",
			characterColorMode: 0,
			backgroundColor: "#000000",
			backgroundColorMode: 1,
			invertMode: true,
		},
	});

	setAsciifyPostSetupFunction(setupAsciify);
}

function setupAsciify() {
	primaryColorSampleFramebuffer = p5asciify.customPrimaryColorSampleFramebuffer;
	secondaryColorSampleFramebuffer = p5asciify.customSecondaryColorSampleFramebuffer;
	asciiCharacterFramebuffer = p5asciify.customAsciiCharacterFramebuffer;
	colorPaletteManager = p5asciify.customColorPaletteManager;

	noiseFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	shiftFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	intermediateShiftFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	previousPushFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });
	nextPushFramebuffer = createFramebuffer({ width: p5asciify.grid.cols, height: p5asciify.grid.rows, depthFormat: UNSIGNED_INT, textureFiltering: NEAREST });

	colorPaletteManager.addPalette(charsetColorPalette);

	rectangleManager = new RectangleManager(randomManager, p5asciify.grid.cols, p5asciify.grid.rows, 3, 0, 16);
	rectangleManager.initializeRectangles();

	runNoiseShader(0);
}

function draw() {
	secondaryColorSampleFramebuffer.begin();
	background(0);
	secondaryColorSampleFramebuffer.end();

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
	shader(gradientShader);
	gradientShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
	gradientShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
	gradientShader.setUniform('u_charPaletteTexture', colorPaletteManager.texture);
	gradientShader.setUniform('u_charPaletteSize', [colorPaletteManager.texture.width, colorPaletteManager.texture.height]);
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
	noiseShader.setUniform('u_seed', 1.0);
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

	randomManager.reset();

	rectangleManager.updateGridDimensions(p5asciify.grid.cols, p5asciify.grid.rows);
	rectangleManager.initializeRectangles();

	runNoiseShader(0);
}